import { notFound } from "next/navigation";
import { getPortfolioPieces } from "./portfolio";

export const metadata = { title: "Portfolio" };

export default async function Portfolio() {
    const pieces = await getPortfolioPieces();
    const pdf = pieces.find((piece) => piece.isPdf);

    if (!pdf) notFound();

    // Fixed overlay covers the root layout's sidebar so the PDF fills the viewport.
    return (
        <iframe
            src={pdf.imageUrl}
            title={pdf.title}
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                border: 0,
                zIndex: 50,
                background: "#fff",
            }}
        />
    );
}
