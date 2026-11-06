"use client";

import { motion, useReducedMotion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const SOCIAL_COLORS: Record<string, string> = {
    GITHUB: "#ffd23f",
    LINKEDIN: "#7ec8ff",
    INSTAGRAM: "#ff8fb8",
    GOODREADS: "#b6e88a",
};

type ConfettiParticle = {
    id: number;
    x: number;
    y: number;
};

function pinchedPath(width: number, height: number, pressure: number) {
    const radius = height / 2;
    const points: [number, number][] = [];
    const straightSegments = 28;
    const curveSegments = 12;
    const depth = height * 0.3;

    for (let index = 0; index <= straightSegments; index++) {
        points.push([radius + (width - 2 * radius) * index / straightSegments, 0]);
    }
    for (let index = 1; index < curveSegments; index++) {
        const angle = -Math.PI / 2 + Math.PI * index / curveSegments;
        points.push([width - radius + radius * Math.cos(angle), radius + radius * Math.sin(angle)]);
    }
    for (let index = 0; index <= straightSegments; index++) {
        points.push([width - radius - (width - 2 * radius) * index / straightSegments, height]);
    }
    for (let index = 1; index < curveSegments; index++) {
        const angle = Math.PI / 2 + Math.PI * index / curveSegments;
        points.push([radius + radius * Math.cos(angle), radius + radius * Math.sin(angle)]);
    }

    return `polygon(${points.map(([x, y]) => {
        const bell = Math.exp(-(((x - width / 2) / (width * 0.22)) ** 2));
        const pinch = depth * pressure * bell;
        return `${x.toFixed(1)}px ${(y < height / 2 ? y + pinch : y - pinch).toFixed(1)}px`;
    }).join(",")})`;
}

export function MagneticSocialLink({
    link,
    children,
}: {
    link: string
    children: React.ReactNode
}) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [particles, setParticles] = useState<ConfettiParticle[]>([]);
    const prefersReducedMotion = useReducedMotion();
    const label = typeof children === "string" ? children.trim().toUpperCase() : "";
    const color = SOCIAL_COLORS[label] ?? "#ffd23f";

    useEffect(() => {
        const anchor = linkRef.current;
        if (!anchor) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let pressure = 0;
        let velocity = 0;
        let target = 0;
        let frame = 0;

        function draw() {
            if (!anchor) return;
            const width = anchor.offsetWidth;
            const height = anchor.offsetHeight;
            if (!width || !height) return;
            anchor.style.clipPath = pinchedPath(width, height, pressure);
            anchor.style.transform = `scale(${1 + 0.1 * pressure}, ${1 - 0.06 * pressure})`;
        }

        function tick() {
            velocity += (target - pressure) * 0.22;
            velocity *= 0.72;
            pressure += velocity;
            draw();

            if (Math.abs(velocity) > 0.001 || Math.abs(target - pressure) > 0.001) {
                frame = window.requestAnimationFrame(tick);
            } else {
                pressure = target;
                draw();
                frame = 0;
            }
        }

        function squeeze(nextTarget: number) {
            if (reduceMotion) return;
            target = nextTarget;
            if (!frame) frame = window.requestAnimationFrame(tick);
        }

        const onPointerEnter = () => squeeze(1);
        const onPointerLeave = () => squeeze(0);
        const onPointerDown = () => squeeze(1.35);
        const onFocus = () => squeeze(1);
        const onBlur = () => squeeze(0);
        const resizeObserver = new ResizeObserver(draw);

        anchor.addEventListener("pointerenter", onPointerEnter);
        anchor.addEventListener("pointerleave", onPointerLeave);
        anchor.addEventListener("pointerdown", onPointerDown);
        anchor.addEventListener("focus", onFocus);
        anchor.addEventListener("blur", onBlur);
        resizeObserver.observe(anchor);
        draw();

        return () => {
            anchor.removeEventListener("pointerenter", onPointerEnter);
            anchor.removeEventListener("pointerleave", onPointerLeave);
            anchor.removeEventListener("pointerdown", onPointerDown);
            anchor.removeEventListener("focus", onFocus);
            anchor.removeEventListener("blur", onBlur);
            resizeObserver.disconnect();
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        if (!particles.length) return;
        const timeout = window.setTimeout(() => setParticles([]), 700);
        return () => window.clearTimeout(timeout);
    }, [particles]);

    function burst() {
        if (prefersReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        setParticles(Array.from({ length: 14 }, (_, id) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 60;
            return {
                id,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
            };
        }));
    }

    return (
        <span
            className="relative inline-block"
            style={{
                filter: "drop-shadow(2px 0 0 #111) drop-shadow(-2px 0 0 #111) drop-shadow(0 2px 0 #111) drop-shadow(0 -2px 0 #111) drop-shadow(4px 5px 0 #111)",
            }}
        >
            <a
                ref={linkRef}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={burst}
                className="block rounded-full px-[30px] py-[14px] text-[15px] leading-none font-bold tracking-[0.08em] text-[#111] no-underline uppercase [touch-action:manipulation] focus-visible:outline focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-offset-[6px] focus-visible:outline-[#111]"
                style={{ backgroundColor: color, clipPath: "inset(0 round 999px)" }}
            >
                {children}
            </a>
            {particles.map((particle) => (
                <motion.span
                    key={particle.id}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{ x: particle.x, y: particle.y, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.1, 0.8, 0.3, 1] }}
                />
            ))}
        </span>
    )
}