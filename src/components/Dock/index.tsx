import { useEffect, useState } from 'react'
import './Dock.css'

type Item = { id: string; label: string }

const items: Item[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Dock() {
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.2 }
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="dock" aria-label="Section navigation">
      {items.map((it) => (
        <button
          key={it.id}
          className={`dock__item ${active === it.id ? 'is-active' : ''}`}
          onClick={() => go(it.id)}
        >
          {it.label}
        </button>
      ))}
    </nav>
  )
}
