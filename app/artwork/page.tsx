import ArtworkGallery from './ArtworkGallery';
import { artworkItems } from '../data';
import { resolveArtworkCollection } from '@/utils/supabase/storage';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|pdf)$/i;

export default async function Artwork() {
  const items = await resolveArtworkCollection(artworkItems, IMAGE_EXTENSIONS);
  return <ArtworkGallery items={items} />;
}
