import Image from "next/image";
import Link from "next/link";
import PDFViewer from "../components/PDFViewer/PDFViewer";
import { getPortfolioPieces } from "./portfolio";

export default async function Portfolio() {
    const pieces = await getPortfolioPieces();
    const collection = pieces[0];

    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Portfolio</h1>
            {collection && (
                <section className="mb-10">
                    <h2 className="text-xl underline decoration-double">
                        {collection.collectionTitle}, {collection.collectionYear}
                    </h2>
                    <p className="mt-2">{collection.collectionDescription}</p>
                </section>
            )}
            <div className="grid gap-8 sm:grid-cols-2">
                {pieces.map((piece) => (
                    <Link
                        key={piece.slug}
                        href={`/portfolio/${piece.slug}`}
                        className="group block rounded-[4px] transition-opacity hover:opacity-90"
                    >
                        <div className="overflow-hidden rounded-[4px] bg-zinc-100">
                            {piece.isPdf ? (
                                <PDFViewer file={piece.imageUrl} maxPages={1} />
                            ) : (
                                <Image
                                    src={piece.imageUrl}
                                    alt={piece.title || "Portfolio piece"}
                                    width={800}
                                    height={600}
                                    className="h-auto w-full object-cover"
                                    unoptimized
                                />
                            )}
                        </div>
                        <h3 className="mt-3 font-medium group-hover:underline">
                            {piece.title}
                        </h3>
                        {piece.description && (
                            <p className="mt-1 text-sm text-zinc-600">{piece.description}</p>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
