import ArtworkGallery from './ArtworkGallery';
import LoadingBoundary from '../components/LoadingBoundary';
import { artworkItems } from '../data';
import { resolveArtworkCollection } from '@/utils/supabase/storage';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|pdf)$/i;

export default function Artwork() {
  return (
    <LoadingBoundary label="artwork">
      <ArtworkContent />
    </LoadingBoundary>
  );
}

async function ArtworkContent() {
  const items = await resolveArtworkCollection(artworkItems, IMAGE_EXTENSIONS);
  return <ArtworkGallery items={items} />;
}
