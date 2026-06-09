import Image from 'next/image';
import { BlogPosts } from './components/posts';

export default function Page() {
  return (
    <section>
      <Image
        src={"/Component 5.png"}
        width={1000}
        height={1000}
        loading='eager'
        alt="An image with blue, yellow, and grey flowers and caelin bryant in the middle" />

    </section>
  )
}
