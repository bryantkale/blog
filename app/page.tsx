import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        This is my blog!
      </h1>
      <p className="mb-4">
        This is my blog!
      </p>
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Sometimes I'll post my opinion</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
