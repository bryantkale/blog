'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Star } from 'lucide-react';

type FolderContainerProps = {
    label?: string;
    subLabel?: string;
    variant?: 'pink' | 'tan' | 'blush' | 'periwinkle' | 'plum' | 'mint' | 'coral';
    className?: string;
    children: React.ReactNode;
};

type StickerConfig = {
    id: string;
    icon: 'heart' | 'star';
    className: string;
    rotate: number;
    color: string;
    size: number;
};

const STICKER_SLOTS = [
    'absolute -right-3 -top-3',
    'absolute right-5 top-5',
    'absolute -left-2 top-1/2 -translate-y-1/2',
    'absolute -right-2 top-1/2 -translate-y-1/2',
];

const STICKER_COLORS = [
    '#FF7FB0',
    '#FFD56A',
    '#7DC7FF',
    '#9BE38B',
    '#FF9E7A',
    '#C5A3FF',
];

function createRandomStickers(): StickerConfig[] {
    return STICKER_SLOTS.map((slot, index) => ({
        id: `sticker-${index}`,
        icon: Math.random() > 0.5 ? 'heart' : 'star',
        className: slot,
        rotate: Math.floor(Math.random() * 41) - 20,
        color: STICKER_COLORS[Math.floor(Math.random() * STICKER_COLORS.length)],
        size: index === 0 ? 20 : 12,
    }));
}

const VARIANT_STYLES = {
    pink: {
        outer: 'border-[#331B1C]/25 bg-[#FFEAF4] dark:border-white/20 dark:bg-[#251A24]',
        tab: 'border-[#331B1C]/25 bg-[#FFD9EA] text-[#331B1C] dark:border-white/20 dark:bg-[#372634] dark:text-[#FFF2F8]',
        divider: 'bg-[#331B1C]/15 dark:bg-white/15',
        inner: 'border-[#331B1C]/15 bg-[#FFF7FB] dark:border-white/10 dark:bg-[#1F1620]',
    },
    tan: {
        outer: 'border-[#6E4F31]/30 bg-[#E7D4B4] dark:border-[#C7AC83]/30 dark:bg-[#2D241A]',
        tab: 'border-[#6E4F31]/35 bg-[#D9BD92] text-[#3F2C1A] dark:border-[#C7AC83]/35 dark:bg-[#4B3A27] dark:text-[#F6E9D6]',
        divider: 'bg-[#6E4F31]/20 dark:bg-[#C7AC83]/25',
        inner: 'border-[#6E4F31]/20 bg-[#F5EAD8] dark:border-[#C7AC83]/20 dark:bg-[#3A2E21]',
    },
    blush: {
        outer: 'border-[#8B4E72]/30 bg-[#F9C8E7] dark:border-[#F9C8E7]/30 dark:bg-[#45213A]',
        tab: 'border-[#8B4E72]/35 bg-[#F8B5DE] text-[#3B0729] dark:border-[#F9C8E7]/35 dark:bg-[#5A2D4A] dark:text-[#FCE3F2]',
        divider: 'bg-[#8B4E72]/20 dark:bg-[#F9C8E7]/25',
        inner: 'border-[#8B4E72]/20 bg-[#FDE8F5] dark:border-[#F9C8E7]/20 dark:bg-[#3B1C30]',
    },
    periwinkle: {
        outer: 'border-[#3E4E97]/30 bg-[#707DCD] dark:border-[#9BA6E8]/30 dark:bg-[#232A4D]',
        tab: 'border-[#3E4E97]/35 bg-[#8590DB] text-[#F7F8FF] dark:border-[#9BA6E8]/35 dark:bg-[#2F3966] dark:text-[#EFF2FF]',
        divider: 'bg-[#3E4E97]/25 dark:bg-[#9BA6E8]/25',
        inner: 'border-[#3E4E97]/20 bg-[#DDE2FF] dark:border-[#9BA6E8]/20 dark:bg-[#1C2342]',
    },
    plum: {
        outer: 'border-[#3B0729]/35 bg-[#5C173F] dark:border-[#B56A95]/30 dark:bg-[#250818]',
        tab: 'border-[#3B0729]/35 bg-[#6C1F4C] text-[#FCEFF6] dark:border-[#B56A95]/35 dark:bg-[#3B102A] dark:text-[#FCEFF6]',
        divider: 'bg-[#F1D3E5]/25 dark:bg-[#B56A95]/25',
        inner: 'border-[#3B0729]/20 bg-[#F7E3EF] dark:border-[#B56A95]/20 dark:bg-[#2B0D1F]',
    },
    mint: {
        outer: 'border-[#2F7B4E]/30 bg-[#4EB171] dark:border-[#87D39F]/30 dark:bg-[#1A3524]',
        tab: 'border-[#2F7B4E]/35 bg-[#68C287] text-[#0F2E1D] dark:border-[#87D39F]/35 dark:bg-[#255136] dark:text-[#E9F9EE]',
        divider: 'bg-[#2F7B4E]/25 dark:bg-[#87D39F]/25',
        inner: 'border-[#2F7B4E]/20 bg-[#E4F6EA] dark:border-[#87D39F]/20 dark:bg-[#173122]',
    },
    coral: {
        outer: 'border-[#9D2F41]/30 bg-[#DD4B60] dark:border-[#F094A3]/30 dark:bg-[#3F141C]',
        tab: 'border-[#9D2F41]/35 bg-[#E7687A] text-[#3B0729] dark:border-[#F094A3]/35 dark:bg-[#5B1C29] dark:text-[#FDEEF1]',
        divider: 'bg-[#9D2F41]/25 dark:bg-[#F094A3]/25',
        inner: 'border-[#9D2F41]/20 bg-[#FCE4E8] dark:border-[#F094A3]/20 dark:bg-[#311019]',
    },
}

export default function FolderContainer({
    label = 'My Folder',
    subLabel,
    variant = 'pink',
    className,
    children,
}: FolderContainerProps) {
    const [stickers, setStickers] = useState<StickerConfig[]>([]);
    const styles = VARIANT_STYLES[variant];

    useEffect(() => {
        setStickers(createRandomStickers());
    }, []);

    return (
        <div className={`mx-auto w-full max-w-3xl ${className ?? ''}`}>
            <div className={`relative rounded-2xl border p-6 shadow-[0_14px_30px_rgba(51,27,28,0.2)] ${styles.outer}`}>
                {stickers.map((sticker) => {
                    const Icon = sticker.icon === 'heart' ? Heart : Star;

                    return (
                        <span
                            key={sticker.id}
                            className={`${sticker.className} pointer-events-none z-20 drop-shadow-[0_1px_1px_rgba(51,27,28,0.35)]`}
                            style={{ transform: `rotate(${sticker.rotate}deg)` }}
                            aria-hidden="true"
                        >
                            <Icon
                                size={sticker.size}
                                color={sticker.color}
                                fill={sticker.color}
                                strokeWidth={1.6}
                            />
                        </span>
                    );
                })}

                <div className={`absolute -top-6 left-6 z-20 rounded-t-2xl border border-b-0 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${styles.tab}`}>
                    {label}
                </div>

                {subLabel ? (
                    <div className={`absolute top-4 left-10 z-10 rounded-t-xl border border-b-0 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-sm ${styles.tab}`}>
                        {subLabel}
                    </div>
                ) : null}

                <div className={`pointer-events-none absolute inset-x-6 top-6 h-px ${styles.divider}`} />

                <div className={`relative mt-2 rounded-xl border p-5 text-[color:var(--fg)] ${styles.inner}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
