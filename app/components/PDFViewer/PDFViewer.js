"use client";

import dynamic from "next/dynamic";

const PDFViewerClient = dynamic(() => import("./PDFViewerClient"), {
    ssr: false,
    loading: () => (
        <div className="py-8 text-center text-zinc-600">Loading PDF viewer...</div>
    ),
});

const PDFViewer = ({ file, maxPages }) => {
    return <PDFViewerClient file={file} maxPages={maxPages} />;
};

export default PDFViewer;
