import { createClient } from '@supabase/supabase-js';

const MUSICBRAINZ_BASE_URL = 'https://musicbrainz.org/ws/2';
const COVER_ART_BASE_URL = 'https://coverartarchive.org/release';
const USER_AGENT = 'CaelinBryantBlog/1.0 (https://caelinbryant.com)';

export type VinylCoverLookup = {
  id: string;
  album: string;
  artist: string;
};

export type VinylCoverMatch = {
  id: string;
  musicbrainzReleaseId: string;
  artworkUrl: string;
};

type MusicBrainzRelease = {
  id: string;
  title?: string;
  score?: number;
  'artist-credit'?: Array<{
    name?: string;
    artist?: {
      name?: string;
    };
  }>;
};

type MusicBrainzSearchResponse = {
  releases?: MusicBrainzRelease[];
};

type CoverArtArchiveResponse = {
  images?: Array<{
    front?: boolean;
    image?: string;
    thumbnails?: {
      small?: string;
      large?: string;
      '250'?: string;
      '500'?: string;
    };
  }>;
};

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function escapeMusicBrainzQuery(value: string) {
  return value.replace(/(["\\])/g, '\\$1');
}

function artistNameForRelease(release: MusicBrainzRelease) {
  return (
    release['artist-credit']
      ?.map((credit) => credit.artist?.name ?? credit.name)
      .filter(Boolean)
      .join(' ') ?? ''
  );
}

function scoreRelease(release: MusicBrainzRelease, album: string, artist: string) {
  const releaseTitle = normalizeSearchValue(release.title ?? '');
  const releaseArtist = normalizeSearchValue(artistNameForRelease(release));
  const targetAlbum = normalizeSearchValue(album);
  const targetArtist = normalizeSearchValue(artist);
  let score = release.score ?? 0;

  if (releaseTitle === targetAlbum) {
    score += 50;
  } else if (releaseTitle.includes(targetAlbum) || targetAlbum.includes(releaseTitle)) {
    score += 20;
  }

  if (releaseArtist === targetArtist) {
    score += 50;
  } else if (releaseArtist.includes(targetArtist) || targetArtist.includes(releaseArtist)) {
    score += 20;
  }

  return score;
}

async function getCoverArtUrl(releaseId: string) {
  const response = await fetch(`${COVER_ART_BASE_URL}/${releaseId}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Cover Art Archive lookup failed for release ${releaseId}: ${response.status}`
    );
  }

  const result = (await response.json()) as CoverArtArchiveResponse;
  const frontCover = result.images?.find((image) => image.front);

  return (
    frontCover?.thumbnails?.['250'] ??
    frontCover?.thumbnails?.small ??
    frontCover?.image ??
    null
  );
}

export async function findMusicBrainzCover(
  album: string,
  artist: string
): Promise<Omit<VinylCoverMatch, 'id'> | null> {
  const query = [
    `release:"${escapeMusicBrainzQuery(album)}"`,
    `artist:"${escapeMusicBrainzQuery(artist)}"`,
  ].join(' AND ');
  const url = `${MUSICBRAINZ_BASE_URL}/release?query=${encodeURIComponent(
    query
  )}&fmt=json&limit=10`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(
      `MusicBrainz lookup failed for "${artist} - ${album}": ${response.status}`
    );
  }

  const result = (await response.json()) as MusicBrainzSearchResponse;
  const likelyMatches = (result.releases ?? [])
    .filter((release) => release.id)
    .sort((a, b) => scoreRelease(b, album, artist) - scoreRelease(a, album, artist))
    .slice(0, 5);

  for (const release of likelyMatches) {
    const artworkUrl = await getCoverArtUrl(release.id);

    if (artworkUrl) {
      return {
        musicbrainzReleaseId: release.id,
        artworkUrl,
      };
    }
  }

  return null;
}

function createSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for database updates.'
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function updateVinylCoverInSupabase(match: VinylCoverMatch) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('VinylCollection')
    .update({
      musicbrainz_release_id: match.musicbrainzReleaseId,
      artwork_url: match.artworkUrl,
    })
    .eq('id', match.id);

  if (error) {
    throw error;
  }
}

export async function enrichVinylCover(record: VinylCoverLookup) {
  const cover = await findMusicBrainzCover(record.album, record.artist);

  if (!cover) {
    return null;
  }

  return {
    id: record.id,
    ...cover,
  };
}
