import ArtworkGallery from './ArtworkGallery';
import { artworkItems } from '../data';
import { resolveArtworkCollection } from '@/utils/supabase/storage';

export default async function Artwork() {
  const items = await resolveArtworkCollection(artworkItems);

  return <ArtworkGallery items={items} />;
}
