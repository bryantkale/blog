'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PDFViewer from '../components/PDFViewer/PDFViewer';
import FolderContainer from '../components/folderContainer/FolderContainer';
import type { ArtworkImage } from '@/utils/supabase/storage';

type ArtworkGalleryItem = {
  mainTitle: string;
  year: string;
  description: string;
  images: ArtworkImage[];
};

const ARTWORK_FOLDER_VARIANTS = ['blush', 'periwinkle', 'plum', 'mint', 'coral'] as const;

export default function ArtworkGallery({
  items,
}: {
  items: ArtworkGalleryItem[];
}) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <ArtworkFolderSection key={`${item.mainTitle}-${index}`} item={item} index={index} />
      ))}
    </div>
  );
}

function isPdf(url: string) {
  return /\.pdf($|\?)/i.test(url);
}

function ArtworkFolderSection({
  item,
  index,
}: {
  item: ArtworkGalleryItem;
  index: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = item.images.length;
  const activeImage = item.images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + totalImages) % totalImages);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % totalImages);
  }

  return (
    <div className="-mt-5 first:mt-0">
      <FolderContainer
        label={`${item.mainTitle} (${item.year})`}
        subLabel={`${totalImages} image${totalImages === 1 ? '' : 's'}`}
        variant={ARTWORK_FOLDER_VARIANTS[index % ARTWORK_FOLDER_VARIANTS.length]}
        className="max-w-none"
      >
        <p className="mt-2 mb-6 text-sm">{item.description}</p>

        {activeImage ? (
          <div className="relative rounded-[10px] border border-[#331B1C]/15 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            {totalImages > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-[#331B1C] shadow-md transition-colors hover:bg-zinc-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-[#331B1C] shadow-md transition-colors hover:bg-zinc-100"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : null}

            <div className="mx-auto w-full overflow-hidden rounded-[6px] bg-zinc-100 [perspective:1200px] md:w-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeImage.imageUrl}-${activeIndex}`}
                  initial={{ opacity: 0, rotateY: index % 2 === 0 ? -75 : 75, x: index % 2 === 0 ? -24 : 24 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: index % 2 === 0 ? 75 : -75, x: index % 2 === 0 ? 24 : -24 }}
                  transition={{ duration: 0.42, ease: 'easeInOut' }}
                >
                  {isPdf(activeImage.imageUrl) ? (
                    <PDFViewer file={activeImage.imageUrl} maxPages={1} />
                  ) : (
                    <Image
                      src={activeImage.imageUrl}
                      alt={activeImage.description || activeImage.title}
                      width={1200}
                      height={900}
                      className="h-auto w-full object-cover"
                      unoptimized
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-600 dark:text-zinc-300">No images found for this section.</p>
        )}
      </FolderContainer>
    </div>
  );
}
