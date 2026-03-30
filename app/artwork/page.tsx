import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Artwork',
  description: 'My Artwork.',
}

export default function Artwork() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Artwork</h1>
      <p className="mb-4">
        This is my artwork.
      </p>
    </section>
  )
}
