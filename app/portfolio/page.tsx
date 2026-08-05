import { getPortfolioPieces } from "./portfolio";
import PortfolioFolderCarousel from "./PortfolioFolderCarousel";

export default async function Portfolio() {
    const pieces = await getPortfolioPieces();

    const sectionsByKey = new Map<string, {
        title: string;
        year: string;
        description: string;
        pieces: typeof pieces;
    }>();

    pieces.forEach((piece) => {
        const sectionKey = `${piece.collectionTitle}::${piece.collectionYear}`;
        const existing = sectionsByKey.get(sectionKey);

        if (existing) {
            existing.pieces.push(piece);
            return;
        }

        sectionsByKey.set(sectionKey, {
            title: piece.collectionTitle,
            year: piece.collectionYear,
            description: piece.collectionDescription,
            pieces: [piece],
        });
    });

    return <PortfolioFolderCarousel sections={Array.from(sectionsByKey.values())} />;
}
