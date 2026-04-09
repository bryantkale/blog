import Image from 'next/image';
import { BlogPosts } from './components/posts';

export default function Page() {
  return (
    <section>
      <Image
        src={"/Component 5.png"}
        width={1000}
        height={1000}
        alt="An image with blue, yellow, and grey flowers and caelin bryant in the middle" />
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Sometimes I'll post my opinion</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
