import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PDFViewer from "../../components/PDFViewer/PDFViewer";
import FolderContainer from "../../components/folderContainer/FolderContainer";
import { getPortfolioPiece, getPortfolioPieces } from "../portfolio";

export async function generateStaticParams() {
    const pieces = await getPortfolioPieces();
    return pieces.map((piece) => ({ slug: piece.slug }));
}

export default async function PortfolioPiecePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const piece = await getPortfolioPiece(slug);

    if (!piece) {
        notFound();
    }

    return (
        <FolderContainer label="Portfolio" className="max-w-none">
            <div>
                <Link
                    href="/portfolio"
                    className="mb-6 inline-block text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                    ← Back to portfolio
                </Link>
                <h1 className="mb-2 text-2xl font-semibold">{piece.title}</h1>
                <p className="mb-1 text-zinc-600 dark:text-zinc-300">
                    {piece.collectionTitle}, {piece.collectionYear}
                </p>
                {piece.description && <p className="mb-8">{piece.description}</p>}
                {piece.isPdf ? (
                    <PDFViewer file={piece.imageUrl} maxPages={10} />
                ) : (
                    <Image
                        src={piece.imageUrl}
                        alt={piece.title || "Portfolio piece"}
                        width={1600}
                        height={1200}
                        className="h-auto w-full object-contain"
                        unoptimized
                    />
                )}
            </div>
        </FolderContainer>
    );
}
