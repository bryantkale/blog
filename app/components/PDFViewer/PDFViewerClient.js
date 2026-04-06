"use client";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewerClient = () => {
    return (
        <div>
            <Document
                file="./Caelin_Bryant_2026.pdf"
                loading={
                    <div style={{ padding: "2rem", textAlign: "center" }}>
                        Loading PDF...
                    </div>
                }
                error={
                    <div
                        style={{
                            padding: "2rem",
                            textAlign: "center",
                            color: "red",
                        }}
                    >
                        Failed to load PDF. Please make sure the file exists in the public
                        folder.
                    </div>
                }
            >
                <Page
                    pageNumber={1}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                />
            </Document>
        </div>
    );
};

export default PDFViewerClient;