import PDFViewer from "../components/PDFViewer/PDFViewer";

export default function Resume() {
    return (
        <div>
            <PDFViewer file="/Caelin_Bryant_2026.pdf" maxPages={2} />
        </div>
    );
}
