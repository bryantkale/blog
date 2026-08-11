'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'HOME',
  },
  '/portfolio': {
    name: 'PORTFOLIO',
  },
  '/artwork': {
    name: 'ARTWORK',
  },
  '/vinyl': {
    name: 'VINYL',
  },
  '/resume': {
    name: 'RESUME',
  },
  'https://hotdognights.caelin.io/': {
    name: 'Hot Dog Log',
  },

}

export function Navbar() {
  const pathname = usePathname()

  function isActivePath(path: string) {
    if (path === '/') {
      return pathname === '/'
    }

    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <nav className="left-nav flex flex-col gap-2" aria-label="Primary">
      {Object.entries(navItems).map(([path, { name }]) => {
        const isActive = isActivePath(path)

        return (
          <motion.div
            key={path}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 520, damping: 26, mass: 0.45 }}
          >
            <Link
              href={path}
              data-id={path}
              aria-current={isActive ? 'page' : undefined}
              className="inline-flex items-center gap-2"
            >
              <span
                aria-hidden="true"
                className={`text-black dark:text-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
              >
                ★
              </span>
              {name}
            </Link>
          </motion.div>
        )
      })}
    </nav>
  )
}
