import { resolveArtworkCollection } from "@/utils/supabase/storage";
import { portfolioWork } from "../data";

const PORTFOLIO_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif|pdf)$/i;

export type PortfolioPiece = {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    isPdf: boolean;
    collectionTitle: string;
    collectionYear: string;
    collectionDescription: string;
    toolsUsed?: string;
};

export function isPdf(url: string) {
    return /\.pdf($|\?)/i.test(url);
}

export function slugFromImageUrl(url: string) {
    const filename = decodeURIComponent(url.split("/").pop()?.split("?")[0] ?? "");
    return filename.replace(/\.[^.]+$/, "").replace(/[_\s]+/g, "-");
}

export async function getPortfolioPieces(): Promise<PortfolioPiece[]> {
    const items = await resolveArtworkCollection(portfolioWork, PORTFOLIO_EXTENSIONS);

    return items.flatMap((item) =>
        item.images.map((image) => ({
            slug: slugFromImageUrl(image.imageUrl),
            title: image.title,
            description: image.description,
            imageUrl: image.imageUrl,
            isPdf: isPdf(image.imageUrl),
            collectionTitle: item.mainTitle,
            collectionYear: item.year,
            collectionDescription: item.description,
            toolsUsed: image.toolsUsed || '',
        }))
    );
}

export async function getPortfolioPiece(slug: string) {
    const pieces = await getPortfolioPieces();
    return pieces.find((piece) => piece.slug === slug);
}
