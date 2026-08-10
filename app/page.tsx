"use client"
import { motion } from "motion/react"
import { EMAIL, FIRST_NAME, SOCIAL_LINKS } from './data'
import { MagneticSocialLink } from './components/MagneticSocialLink/MagneticSocialLink'
import FolderContainer from './components/folderContainer/FolderContainer'

const LIKES = [
  'Cortados',
  'Watching the clouds',
  'Yoga',
  'Fashion',
  'Good Design',
  'Eggs',
  'Dogs',
]

const DISLIKES = [
  'The hot',
  'The cold',
  'Awkward Silence',
  'Tourists',
  'Yankees',
]

export default function Page() {
  return (
    <motion.main animate="visible">
      <FolderContainer label="Home">
        <section>
          <p className="mb-4">
            {`I’m ${FIRST_NAME}/Carl and I've bounced around the US a bit, but I'm currently a NY-based creative technologist.`}
          </p>
          <p className="mb-4">
            {`I have my 200 hour YTT certification in yoga and I frequent yoga studios across Brooklyn!`}
          </p>
          <p className="mb-4">
            {`This summer, you can find me taking graphic design courses at Pratt & studying Judaism.`}
          </p>
        </section>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          You can contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide">Likes</p>
            <ul className="space-y-1 text-sm">
              {LIKES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span>🙂</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide">Dislikes</p>
            <ul className="space-y-1 text-sm">
              {DISLIKES.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span>🙁</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.url}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </FolderContainer>
    </motion.main>
  )
}
