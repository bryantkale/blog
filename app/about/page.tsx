"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "motion/react"
import { EMAIL, FULL_NAME, SOCIAL_LINKS } from '../data'
import { MagneticSocialLink } from '../components/MagneticSocialLink/MagneticSocialLink'

export default function About() {
    return (
        <motion.main animate="visible">
            <Image
                src={'/images/here.gif'}
                width={500}
                height={500}
                alt="Gif of the author"
                unoptimized
            />
            <section>
                <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Who Am I?</h1>
                <p className="mb-4">
                    {`Hey there! I’m ${FULL_NAME} — a light-hearted ambivert who enjoys making life easier with code.`}
                </p>
                <p className="mb-4">
                    {`My first exposure to programming was watching my older cousin write Java at his job. It looked like the kind of nonsense code you see in The Matrix and made me wonder: could I learn to write code that actually made sense?`}
                </p>
                <p className="mb-4">
                    {`Years later I tried studying computer science at Grinnell College. My first class, taught by Sam Rebelsky, used Scheme. After a month I dropped the class because it felt too hard and I wanted to pursue art instead.`}

                </p>
                <p className="mb-4">
                    {`With encouragement from my advisor, I gave CS another try. In a course with Charlie Curtsinger, I discovered how much computer science and art overlap — we used recursion to make snowflakes and created pixel art by manipulating code.`}
                </p>
                <p className="mb-4">
                    {`Since then I’ve kept learning new languages and tools. I currently work at Capital One (previously Discover), building customer service tools that help agents support customers more efficiently. I’m looking for a full-time role where I can help a company reach its goals.`}
                </p>
            </section>
            <p className="mb-5 text-zinc-600 dark:text-zinc-400">
                You can contact me at{' '}
                <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                </a>
            </p>
            <motion.section>
                <div className="flex items-center justify-start space-x-3">
                    {SOCIAL_LINKS.map((link) => (
                        <MagneticSocialLink key={link.label} link={link.url}>
                            {link.label}
                        </MagneticSocialLink>
                    ))}
                </div>
            </motion.section>
        </motion.main>
    )
}
