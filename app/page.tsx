import { BlogPosts } from 'app/components/posts'
import Image from 'next/image';
import image from 'public/Component6.png'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        This is my blog!
      </h1>
      <Image
        src={image}
        width={500}
        height={500}
        alt="An image with blue, yellow, and grey flowers and caelin bryant in the middle" />
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Sometimes I'll post my opinion</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
