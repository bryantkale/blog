'use client'
import { motion } from 'motion/react'
import Link from 'next/link'

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
}

export function Navbar() {
  return (
    <nav className="flex flex-col gap-2" aria-label="Primary">
      {Object.entries(navItems).map(([path, { name }]) => {
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
            >
              {name}
            </Link>
          </motion.div>
        )
      })}
    </nav>
  )
}
