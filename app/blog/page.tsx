import Link from 'next/link'
import type { Metadata } from 'next'
import FolderContainer from '@/app/components/folderContainer/FolderContainer'
import { formatDate, getAllBlogPosts } from './utils'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Writing pulled in from pckt.blog.',
}

export default async function BlogPage() {
    const posts = await getAllBlogPosts()

    return (
        <FolderContainer label="Blog" subLabel="Live from pckt.blog" variant="blush">
            <section className="space-y-6">
                <div className="space-y-3">
                    <p>
                        New posts are pulled from pckt.blog automatically, so this page updates after I publish.
                    </p>
                    <p>
                        <Link className="underline" href="https://pckt.blog/b/caelin" target="_blank" rel="noreferrer">
                            Follow the full pckt.blog archive
                        </Link>
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="text-sm opacity-75">No posts are available right now.</p>
                ) : (
                    <ul className="space-y-5">
                        {posts.map((post) => {
                            const sourceLabel = post.source === 'pckt' ? 'pckt.blog' : 'local'

                            return (
                                <li key={post.url} className="rounded-xl border border-black/10 bg-white/30 p-4 dark:border-white/10 dark:bg-black/10">
                                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] opacity-75">
                                        <span>{sourceLabel}</span>
                                        <span aria-hidden="true">•</span>
                                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, true)}</time>
                                    </div>
                                    <h2 className="text-lg font-semibold uppercase tracking-[0.08em]">
                                        <Link className="underline-offset-4 hover:underline" href={post.url} target={post.source === 'pckt' ? '_blank' : undefined} rel={post.source === 'pckt' ? 'noreferrer' : undefined}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    {post.summary ? (
                                        <p className="mt-2 text-sm leading-6 opacity-85">{post.summary}</p>
                                    ) : null}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>
        </FolderContainer>
    )
}