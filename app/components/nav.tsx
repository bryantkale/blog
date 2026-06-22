'use client'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'
import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/vinyl': {
    name: 'vinyl',
  },
  '/about': {
    name: 'about',
  },
  '/artwork': {
    name: 'artwork',
  },
  '/tomato-test': {
    name: 'tomato test',
  },
  '/techExperience': {
    name: 'tech experience',
  },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row">
            <AnimatedBackground
              defaultValue={navItems['/'].name}
              className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
              transition={{
                bounce: 0.2,
                duration: 0.3,
              }}
              enableHover
            >
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    style={{ color: '#331B1C' }}
                    key={path}
                    href={path}
                    data-id={path}
                    className="px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {name}
                  </Link>
                )
              })}
            </AnimatedBackground>
          </div>
        </nav>
      </div>
    </aside>
  )
}
