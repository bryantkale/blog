'use client';

import Image from 'next/image';
import Link from 'next/link';
import PDFViewer from '../components/PDFViewer/PDFViewer';
import FolderContainer from '../components/folderContainer/FolderContainer';
import type { PortfolioPiece } from './portfolio';

type PortfolioSection = {
    title: string;
    year: string;
    description: string;
    pieces: PortfolioPiece[];
};

const PORTFOLIO_FOLDER_VARIANTS = ['blush', 'periwinkle', 'plum', 'mint', 'coral'] as const;

export default function PortfolioFolderCarousel({
    sections,
}: {
    sections: PortfolioSection[];
}) {
    return (
        <div className="space-y-0">
            {sections.map((section, index) => (
                <PortfolioFolderSection
                    key={`${section.title}-${section.year}-${index}`}
                    section={section}
                    index={index}
                />
            ))}
        </div>
    );
}

function PortfolioFolderSection({
    section,
    index,
}: {
    section: PortfolioSection;
    index: number;
}) {
    const totalPieces = section.pieces.length;

    return (
        <div className="-mt-5 first:mt-0">
            <FolderContainer
                label={section.title}
                subLabel={`${totalPieces} piece${totalPieces === 1 ? '' : 's'}`}
                variant={PORTFOLIO_FOLDER_VARIANTS[index % PORTFOLIO_FOLDER_VARIANTS.length]}
                className="max-w-none"
            >
                {totalPieces ? (
                    <div className="space-y-4">
                        {section.pieces.map((piece) => (
                            <div
                                key={piece.slug}
                                className="rounded-[10px] border border-[#331B1C]/15 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5"
                            >
                                <Link
                                    href={`/portfolio/${piece.slug}`}
                                    className="group block mx-auto w-full overflow-hidden rounded-[6px] bg-zinc-100 md:w-1/2"
                                >
                                    {piece.isPdf ? (
                                        <PDFViewer file={piece.imageUrl} maxPages={1} />
                                    ) : (
                                        <Image
                                            src={piece.imageUrl}
                                            alt={piece.description || piece.title}
                                            width={1200}
                                            height={900}
                                            className="h-auto w-full object-cover transition-opacity group-hover:opacity-95"
                                            unoptimized
                                        />
                                    )}
                                </Link>

                                <div className="mt-3">
                                    <Link
                                        href={`/portfolio/${piece.slug}`}
                                        className="text-sm font-semibold underline decoration-transparent transition-colors hover:decoration-current"
                                    >
                                        {piece.title}
                                    </Link>
                                    {piece.description ? (
                                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{piece.description}</p>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">No portfolio images found for this section.</p>
                )}
            </FolderContainer>
        </div>
    );
}
