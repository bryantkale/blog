"use client"
import { motion } from "motion/react"
import { EMAIL, FIRST_NAME, SOCIAL_LINKS } from './data'
import { MagneticSocialLink } from './components/MagneticSocialLink/MagneticSocialLink'

export default function Page() {
  return (
    <motion.main animate="visible">
      <section>
        <p className="mb-4">
          {`I’m ${FIRST_NAME}/Carl and I'm a NY-based creative technologist.`}
        </p>
        <p className="mb-4">
          {`I have my 200 hours certification in yoga and I frequent baby cobra in Bushwick.`}
        </p>
        <p className="mb-4">
          {`This summer, you can find me taking graphic design courses at Pratt.`}
        </p>
      </section>
      <p className="mb-5 text-zinc-600 dark:text-zinc-400">
        You can contact me at{' '}
        <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </p>
      <div className="flex items-center justify-start space-x-3">
        {SOCIAL_LINKS.map((link) => (
          <MagneticSocialLink key={link.label} link={link.url}>
            {link.label}
          </MagneticSocialLink>
        ))}
      </div>
    </motion.main>
  )
}
