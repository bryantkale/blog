import { hasSupabaseConfig, supabase } from './supabaseClient';

const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|pdf)$/i;

export const ARTWORK_BUCKET =
  process.env.SUPABASE_ARTWORK_BUCKET?.replace(/^["']|["']$/g, '') ??
  'album-art';

export type BucketImage = {
  name: string;
  path: string;
  url: string;
};

export function getPublicImageUrl(
  path: string,
  bucket: string = ARTWORK_BUCKET
): string {
  const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;

  if (!hasSupabaseConfig || !supabase) {
    if (!supabaseBaseUrl) {
      return '';
    }

    const encodedPath = path
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    return `${supabaseBaseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodedPath}`;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function listBucketImages(
  folder = '',
  bucket: string = ARTWORK_BUCKET,
  imageExtensions: RegExp = IMAGE_EXTENSIONS
): Promise<BucketImage[]> {
  if (!hasSupabaseConfig || !supabase) {
    return [];
  }

  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    throw error;
  }

  return (data ?? [])
    .filter((file) => file.id && imageExtensions.test(file.name))
    .map((file) => {
      const path = folder ? `${folder}/${file.name}` : file.name;

      return {
        name: file.name,
        path,
        url: getPublicImageUrl(path, bucket),
      };
    });
}

export type ArtworkImage = {
  title: string;
  description: string;
  imageUrl: string;
};

export type Artwork = {
  mainTitle: string;
  year: string;
  description: string;
  folder?: string;
  images: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    bucketPath?: string;
  }>;
};

function titleFromFilename(filename: string, imageExtensions: RegExp): string {
  return filename
    .replace(imageExtensions, '')
    .replace(/[_-]+/g, ' ')
    .trim();
}

export async function resolveArtworkImages(
  artwork: Artwork,
  imageExtensions: RegExp
): Promise<ArtworkImage[]> {
  if (artwork.folder) {
    const bucketImages = await listBucketImages(artwork.folder, ARTWORK_BUCKET, imageExtensions);
    return bucketImages.map((image, index) => {
      const metadata = artwork.images[index];

      return {
        title: metadata?.title ?? titleFromFilename(image.name, imageExtensions),
        description: metadata?.description ?? '',
        imageUrl: image.url,
      };
    });
  }

  return artwork.images.map((image) => ({
    title: image.title,
    description: image.description,
    imageUrl: image.bucketPath
      ? getPublicImageUrl(image.bucketPath)
      : (image.imageUrl ?? ''),
  }));
}

export async function resolveArtworkCollection(
  artworkItems: Artwork[],
  imageExtensions: RegExp
): Promise<Array<Artwork & { images: ArtworkImage[] }>> {
  return Promise.all(
    artworkItems.map(async (item) => ({
      ...item,
      images: await resolveArtworkImages(item, imageExtensions),
    }))
  );
}
