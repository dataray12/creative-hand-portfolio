import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { company, office } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { MagneticButton } from './ui/Magnetic'

const HeroScene = lazy(() => import('./HeroScene'))

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const [show3D, setShow3D] = useState(false)

  // Mount the 3D canvas only after the intro has finished, on capable devices.
  useEffect(() => {
    if (!ready) return
    if (prefersReducedMotion()) return
    // Desktop only: on phones the scene would sit behind the copy and cost battery.
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    if (typeof navigator !== 'undefined' && (navigator as Navigator & { deviceMemory?: number }).deviceMemory) {
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
      if (mem && mem < 4) return
    }
    const id = window.setTimeout(() => setShow3D(true), 250)
    return () => window.clearTimeout(id)
  }, [ready])

  useGSAP(
    () => {
      if (!ready || !root.current) return
      const reduce = prefersReducedMotion()
      const q = gsap.utils.selector(root)

      if (reduce) {
        gsap.set([q('[data-h-line] > span'), q('[data-h-fade]')], { yPercent: 0, opacity: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(q('[data-h-eyebrow]'), { opacity: 0, y: 16, duration: 0.9 })
        .from(
          q('[data-h-line] > span'),
          { yPercent: 115, duration: 1.25, stagger: 0.1 },
          '-=0.6',
        )
        .from(q('[data-h-fade]'), { opacity: 0, y: 22, duration: 1, stagger: 0.12 }, '-=0.8')
        .from(q('[data-h-canvas]'), { opacity: 0, duration: 1.6 }, 0.2)

      // Parallax on scroll
      gsap.to(q('[data-h-copy]'), {
        yPercent: 22,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(q('[data-h-canvas]'), {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section
      id="home"
      ref={root}
      data-section
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-4 pb-10 pt-32 sm:px-8"
    >
      {/* 3D / ambient background */}
      <div data-h-canvas className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora opacity-80" />
        <div className="absolute left-[12%] top-[18%] h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl glow-accent" />
        <div className="absolute bottom-[8%] right-[10%] h-[22rem] w-[22rem] rounded-full opacity-25 blur-3xl glow-warm" />
        {show3D && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-bg" />
      </div>

      <div data-h-copy className="mx-auto w-full max-w-[1400px]">
        <p
          data-h-eyebrow
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/80 px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-mute shadow-[0_1px_2px_rgba(11,14,20,0.04)] backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
          Est. {company.founded} · {company.short} × {company.sister}
        </p>

        <h1 className="max-w-[17ch] font-display text-[clamp(2.6rem,8.4vw,7.75rem)] leading-[0.95]">
          <span data-h-line className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span className="block">Building</span>
          </span>
          <span data-h-line className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span className="block text-gradient">Brands</span>
          </span>
          <span data-h-line className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span className="block">Connecting People</span>
          </span>
        </h1>
      </div>

      <div className="mx-auto mt-14 w-full max-w-[1400px]">
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-12 md:items-end">
          <p
            data-h-fade
            className="max-w-xl text-pretty text-[15px] leading-relaxed text-mute md:col-span-5"
          >
            {company.kicker} A Jeddah marketing house delivering 360° strategy, BTL
            activation, events, distribution and digital engineering across the Kingdom.
          </p>

          <div data-h-fade className="flex flex-wrap items-center gap-3 md:col-span-4">
            <MagneticButton
              onClick={() => scrollToId('work')}
              data-cursor="View"
              className="items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(31,79,255,0.7)] transition-colors hover:bg-[#1741e0]"
            >
              See our work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToId('services')}
              className="items-center gap-2 rounded-full border border-line bg-bg/70 px-7 py-3.5 text-sm font-medium text-fg transition-colors hover:border-fg/30 hover:bg-bg"
            >
              What we do
            </MagneticButton>
          </div>

          <div
            data-h-fade
            className="flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-mute md:col-span-3 md:justify-end"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {office.lines[1]}
            </span>
            <button
              onClick={() => scrollToId('about')}
              aria-label="Scroll to about section"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-fg transition-colors hover:border-fg/30 focus-ring"
            >
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
