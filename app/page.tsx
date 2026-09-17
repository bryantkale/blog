import Link from 'next/link'
import { EMAIL, FIRST_NAME, SOCIAL_LINKS } from './data'
import { MagneticSocialLink } from './components/MagneticSocialLink/MagneticSocialLink'
import FolderContainer from './components/folderContainer/FolderContainer'
import { formatDate, getAllBlogPosts } from './blog/utils'

const LIKES = [
  'Cortados',
  'Watching the clouds',
  'Yoga',
  'Fashion',
  'Good Design',
  'Eggs',
  'Dogs',
]

const DISLIKES = [
  'The hot',
  'The cold',
  'Awkward Silence',
  'Tourists',
  'Yankees',
]

export default async function Page() {
  const [latestPost] = await getAllBlogPosts()

  return (
    <main>
      <FolderContainer label="Home">
        <section>
          <p className="mb-4">
            {`I’m ${FIRST_NAME}/Carl and I've bounced around the US a bit, but I'm currently a NY-based creative technologist.`}
          </p>
          <p className="mb-4">
            {`I have my 200 hour YTT certification in yoga and I frequent yoga studios across Brooklyn!`}
          </p>
          <p className="mb-4">
            {`This summer, you can find me taking graphic design courses at Pratt & studying Judaism.`}
          </p>
        </section>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          You can contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <h1>Blog Posts</h1>
        <section className="mb-6 rounded-xl border border-black/10 bg-white/30 p-4 dark:border-white/10 dark:bg-black/10">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-sm font-medium uppercase tracking-wide">Latest Writing</p>
            <Link className="text-xs uppercase tracking-[0.14em] underline-offset-4 hover:underline" href="/blog">
              View all
            </Link>
          </div>
          {latestPost ? (
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] opacity-75">
                <span>{latestPost.source === 'pckt' ? 'pckt.blog' : 'local'}</span>
                <span aria-hidden="true">•</span>
                <time dateTime={latestPost.publishedAt}>{formatDate(latestPost.publishedAt, true)}</time>
              </div>
              <h2 className="text-base font-semibold uppercase tracking-[0.08em]">
                <Link
                  className="underline-offset-4 hover:underline"
                  href={latestPost.url}
                  target={latestPost.source === 'pckt' ? '_blank' : undefined}
                  rel={latestPost.source === 'pckt' ? 'noreferrer' : undefined}
                >
                  {latestPost.title}
                </Link>
              </h2>
              {latestPost.summary ? (
                <p className="mt-2 text-sm leading-6 opacity-85">{latestPost.summary}</p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm opacity-75">No writing is available right now.</p>
          )}
        </section>
        <div className="flex flex-wrap items-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.url}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </FolderContainer>
    </main>
  )
}
