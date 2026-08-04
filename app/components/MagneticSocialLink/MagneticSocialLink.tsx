import { motion } from "motion/react";
import React from "react";

export function MagneticSocialLink({
    link,
    children,
}: {
    link: string
    children: React.ReactNode
}) {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.98 }}
        // transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.8 }}
        // className="inline-flex items-center rounded-md border border-zinc-300 bg-zinc-50 px-5 py-3 text-base font-medium text-zinc-950 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-zinc-600 hover:bg-zinc-200 hover:shadow-[0_10px_24px_rgba(24,24,27,0.18)] dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:shadow-[0_10px_24px_rgba(255,255,255,0.12)]"
        >
            {children}
        </motion.a>
    )
}