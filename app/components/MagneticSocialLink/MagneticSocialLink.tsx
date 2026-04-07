import { Magnetic } from "@/components/motion-primitives/magnetic";
import React from "react";

export function MagneticSocialLink({
    link,
    children,
}: {
    link: string
    children: React.ReactNode
}) {
    return (
        <Magnetic>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <button type="button" className="inline-flex items-center rounded-md border border-zinc-100 bg-transparent px-4 py-2 text-sm text-zinc-950 transition-all duration-300 hover:bg-zinc-100 dark:border-zinc-900 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-600">
                    {children}
                </button>
            </a>
        </Magnetic>
    )
}