'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function resolveInitialTheme(): Theme {
    if (typeof window === 'undefined') {
        return 'light'
    }

    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const nextTheme = resolveInitialTheme()
        setTheme(nextTheme)
        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    }, [])

    function toggleTheme() {
        const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
        window.localStorage.setItem('theme', nextTheme)
    }

    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors"
            style={{
                borderColor: 'var(--surface-strong)',
                backgroundColor: 'var(--surface)',
                color: 'var(--fg)',
            }}
            aria-label="Toggle light and dark theme"
            aria-pressed={isDark}
        >
            <span aria-hidden="true">{isDark ? 'Moon' : 'Sun'}</span>
            <span>{isDark ? 'Dark' : 'Light'}</span>
        </button>
    )
}
