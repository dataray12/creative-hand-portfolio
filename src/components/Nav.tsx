import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { nav, company, office } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { cn } from '../lib/motion'
import { MagneticButton } from './ui/Magnetic'

export function Nav() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-6',
            scrolled
              ? 'border border-line bg-bg/85 py-2.5 shadow-[0_8px_30px_-16px_rgba(11,14,20,0.25)] backdrop-blur-xl'
              : 'border border-transparent py-2.5',
          )}
          style={{ width: 'calc(100% - 2rem)' }}
        >
          <button
            onClick={() => go('home')}
            aria-label="Back to top"
            className="flex items-center gap-3 focus-ring"
          >
            <img
              src="/media/brand/mark-chms.webp"
              alt=""
              width={270}
              height={272}
              className="h-8 w-auto"
            />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[13px] font-semibold tracking-tight">
                Creative Hand
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-mute">
                Marketing Services
              </span>
            </span>
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 focus-ring',
                  active === n.id ? 'font-medium text-accent' : 'text-mute hover:text-fg',
                )}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-inset ring-accent/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MagneticButton
              onClick={() => go('contact')}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_18px_-8px_rgba(31,79,255,0.8)] transition-colors hover:bg-[#1741e0] sm:inline-flex"
              strength={0.25}
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg text-fg lg:hidden focus-ring"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((n, i) => (
                  <motion.button
                    key={n.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => go(n.id)}
                    className="flex items-baseline justify-between border-b border-line py-5 text-left"
                  >
                    <span className="font-display text-4xl text-fg">{n.label}</span>
                    <span className="font-mono text-[10px] text-mute">
                      0{i + 1}
                    </span>
                  </motion.button>
                ))}
              </nav>
              <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                <p>{company.city}, {company.country}</p>
                <a href={`mailto:${office.email}`} className="block text-fg">
                  {office.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
