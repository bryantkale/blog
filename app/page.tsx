import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello
      </h1>
      <p className="mb-4">
        This is my blog!
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
