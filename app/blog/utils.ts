import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

export type BlogPost = {
  title: string
  publishedAt: string
  summary: string
  url: string
  source: 'local' | 'pckt'
}

const PCKT_BLOG_FEED_URL = 'https://pckt.blog/b/caelin/feed'

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir) {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

function stripCdata(value: string) {
  return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function readXmlTag(block: string, tagName: string) {
  let match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`))

  if (!match) {
    return ''
  }

  return decodeXmlEntities(stripCdata(match[1]).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function getLocalBlogPosts(): BlogPost[] {
  return getBlogPosts().map((post) => ({
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    url: `/blog/${post.slug}`,
    source: 'local',
  }))
}

function parsePcktFeed(feedXml: string): BlogPost[] {
  let items = feedXml.match(/<item>([\s\S]*?)<\/item>/g) ?? []

  return items
    .map((item) => ({
      title: readXmlTag(item, 'title') || 'Untitled post',
      publishedAt: readXmlTag(item, 'pubDate'),
      summary: readXmlTag(item, 'description'),
      url: readXmlTag(item, 'link'),
      source: 'pckt' as const,
    }))
    .filter((post) => post.url)
}

export async function getPcktBlogPosts() {
  try {
    let response = await fetch(PCKT_BLOG_FEED_URL, {
      next: { revalidate: 900 },
    })

    if (!response.ok) {
      return []
    }

    let feedXml = await response.text()
    return parsePcktFeed(feedXml)
  } catch {
    return []
  }
}

export async function getAllBlogPosts() {
  let [pcktPosts] = await Promise.all([getPcktBlogPosts()])

  return [...pcktPosts, ...getLocalBlogPosts()].sort((firstPost, secondPost) => {
    return new Date(secondPost.publishedAt).getTime() - new Date(firstPost.publishedAt).getTime()
  })
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
