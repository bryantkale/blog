'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { VinylRecord } from './getVinylCollection';

const ALBUMS_PER_SHELF = 8;
type SortMode = 'artist' | 'album';

function normalizeValue(value: string) {
  return value.toLowerCase().trim();
}

function sortRecords(records: VinylRecord[], sortMode: SortMode) {
  return [...records].sort((a, b) => {
    const primaryA = sortMode === 'artist' ? a.artist : a.album;
    const primaryB = sortMode === 'artist' ? b.artist : b.album;
    const secondaryA = sortMode === 'artist' ? a.album : a.artist;
    const secondaryB = sortMode === 'artist' ? b.album : b.artist;

    return (
      primaryA.localeCompare(primaryB, undefined, { sensitivity: 'base' }) ||
      secondaryA.localeCompare(secondaryB, undefined, { sensitivity: 'base' })
    );
  });
}

function filterRecords(records: VinylRecord[], searchValue: string) {
  const normalizedSearch = normalizeValue(searchValue);

  if (!normalizedSearch) {
    return records;
  }

  return records.filter((record) => {
    const album = normalizeValue(record.album);
    const artist = normalizeValue(record.artist);

    return album.includes(normalizedSearch) || artist.includes(normalizedSearch);
  });
}

function chunkRecords(records: VinylRecord[]) {
  return Array.from(
    { length: Math.ceil(records.length / ALBUMS_PER_SHELF) },
    (_, index) =>
      records.slice(index * ALBUMS_PER_SHELF, (index + 1) * ALBUMS_PER_SHELF)
  );
}

function AlbumCover({ record }: { record: VinylRecord }) {
  if (record.artworkUrl) {
    return (
      <img
        src={record.artworkUrl}
        alt={`${record.album} cover`}
        className="h-24 w-24 rounded-[6px] bg-white object-contain shadow-md"
      />
    );
  }

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-[6px] bg-[#331B1C] p-2 text-center text-xs leading-tight text-[#FFE9E9] shadow-md">
      {record.album}
    </div>
  );
}

function VinylDetails({
  record,
  onClose,
}: {
  record: VinylRecord;
  onClose: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#331B1C]/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-w-sm rounded-[12px] bg-[#FFE9E9] p-5 text-[#331B1C] shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <AlbumCover record={record} />
        </div>
        <h2 className="text-xl font-semibold">{record.album}</h2>
        <p className="mt-1 text-sm">{record.artist}</p>
        {record.musicbrainzReleaseId ? (
          <a
            className="mt-4 inline-block underline"
            href={`https://musicbrainz.org/release/${record.musicbrainzReleaseId}`}
            target="_blank"
            rel="noreferrer"
          >
            Open MusicBrainz release
          </a>
        ) : null}
        <button
          className="mt-5 block rounded-full border border-[#331B1C] px-4 py-1 text-sm"
          type="button"
          onClick={onClose}
        >
          close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function VinylFloaters({ records }: { records: VinylRecord[] }) {
  const [selectedRecord, setSelectedRecord] = useState<VinylRecord | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('artist');
  const visibleRecords = sortRecords(filterRecords(records, searchValue), sortMode);
  const shelves = chunkRecords(visibleRecords);

  return (
    <div className="relative left-1/2 h-[82vh] w-[95vw] max-w-6xl -translate-x-1/2 overflow-y-auto overflow-x-hidden rounded-[12px] border border-[#331B1C]/20 bg-[#FFE9E9] px-6 py-8">
      <div className="sticky top-0 z-20 -mx-6 -mt-8 mb-8 border-b border-[#331B1C]/15 bg-[#FFE9E9]/95 px-6 py-5 backdrop-blur">
        <div className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-[#331B1C]/60">
          search the shelves
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="text-[#331B1C]/70">Album or artist</span>
            <input
              className="rounded-full border border-[#331B1C]/30 bg-white/70 px-4 py-2 text-[#331B1C] outline-none focus:border-[#331B1C]"
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search albums or artists"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm md:w-56">
            <span className="text-[#331B1C]/70">Sort shelves by</span>
            <select
              className="rounded-full border border-[#331B1C]/30 bg-white/70 px-4 py-2 text-[#331B1C] outline-none focus:border-[#331B1C]"
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
            >
              <option value="artist">Artist A-Z</option>
              <option value="album">Album A-Z</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-center text-xs text-[#331B1C]/60">
          Showing {visibleRecords.length} of {records.length} records
        </p>
      </div>

      <div className="space-y-12">
        {shelves.length ? shelves.map((shelfRecords, shelfIndex) => (
          <div
            key={shelfIndex}
            className="relative pb-8"
          >
            <div className="grid grid-cols-8 gap-x-5 gap-y-6">
              {shelfRecords.map((record) => (
                <button
                  key={record.id}
                  type="button"
                  className="flex min-w-0 flex-col items-center gap-2 rounded-[10px] bg-white/75 p-2 text-center text-[#331B1C] shadow-md backdrop-blur transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#331B1C]"
                  onClick={() => setSelectedRecord(record)}
                >
                  <AlbumCover record={record} />
                  <span className="line-clamp-3 min-h-[3.75rem] text-xs font-semibold leading-tight">
                    {record.album}
                  </span>
                </button>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-3 rounded-full bg-[#331B1C]/55 shadow-[0_8px_0_rgba(51,27,28,0.16)]" />
          </div>
        )) : (
          <div className="py-20 text-center text-[#331B1C]/70">
            No records found for “{searchValue}”.
          </div>
        )}
      </div>

      {selectedRecord ? (
        <VinylDetails
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      ) : null}
    </div>
  );
}
