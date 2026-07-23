"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const PDFViewerClient = ({ file, maxPages }) => {
    const containerRef = useRef(null);
    const [numPages, setNumPages] = useState(null);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateWidth = () => setWidth(container.clientWidth);
        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    const pagesToRender = maxPages
        ? Math.min(numPages ?? maxPages, maxPages)
        : numPages;

    return (
        <div ref={containerRef} className="w-full">
            <Document
                file={file}
                loading={
                    <div className="py-8 text-center text-zinc-600">
                        Loading PDF...
                    </div>
                }
                error={
                    <div className="py-8 text-center text-red-600">
                        Failed to load PDF.
                    </div>
                }
                onLoadSuccess={({ numPages: totalPages }) =>
                    setNumPages(totalPages)
                }
            >
                {width &&
                    pagesToRender &&
                    Array.from({ length: pagesToRender }, (_, index) => (
                        <Page
                            key={`page-${index + 1}`}
                            pageNumber={index + 1}
                            width={width}
                            renderTextLayer
                            renderAnnotationLayer
                            className="mb-4 shadow-sm"
                        />
                    ))}
            </Document>
        </div>
    );
};

export default PDFViewerClient;
