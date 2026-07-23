import PDFViewer from "../components/PDFViewer/PDFViewer";

export default function TechExperience() {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Tech Experience</h1>
            <PDFViewer file="/Caelin_Bryant_2026.pdf" maxPages={2} />
        </div>
    );
}
