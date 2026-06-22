import { supabase } from '../../utils/supabase/supabaseClient';

export type VinylRecord = {
  id: string;
  album: string;
  artist: string;
  artworkUrl: string | null;
  musicbrainzReleaseId: string | null;
};

type VinylCollectionRow = {
  id: string;
  Album: string | null;
  Artist: string | null;
  artwork_url: string | null;
  musicbrainz_release_id: string | null;
};

export async function getVinylCollection(): Promise<VinylRecord[]> {
  const { data, error } = await supabase
    .from('VinylCollection')
    .select('id, Album, Artist, artwork_url, musicbrainz_release_id')
    .order('Artist', { ascending: true })
    .order('Album', { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as VinylCollectionRow[]).map((record) => ({
    id: record.id,
    album: record.Album ?? 'Untitled album',
    artist: record.Artist ?? 'Unknown artist',
    artworkUrl: record.artwork_url,
    musicbrainzReleaseId: record.musicbrainz_release_id,
  }));
}
