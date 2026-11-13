import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, cn, prefersReducedMotion, isDesktopPointer } from '../../lib/motion'

/* ------------------------------------------------------------------ */
/* Section shell + heading                                             */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  children,
  className,
  label,
}: {
  id: string
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <section
      id={id}
      aria-label={label}
      data-section
      className={cn('relative w-full px-4 py-24 sm:px-8 md:py-32', className)}
    >
      {children}
    </section>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent',
        className,
      )}
    >
      <span className="h-px w-8 bg-gradient-to-r from-accent to-accent/0" />
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Counter                                                             */
/* ------------------------------------------------------------------ */

export function Counter({
  value,
  suffix = '',
  plain = false,
  className,
}: {
  value: number
  suffix?: string
  plain?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (prefersReducedMotion()) {
        el.textContent = plain ? String(value) : value.toLocaleString('en-US')
        return
      }
      const obj = { n: 0 }
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          const n = Math.round(obj.n)
          el.textContent = plain ? String(n) : n.toLocaleString('en-US')
        },
      })
    },
    { scope: ref },
  )

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  return (
    <div
      ref={wrap}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className="marquee-track"
        style={
          {
            animation: `marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
            animationPlayState: paused ? 'paused' : 'running',
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translate3d(0,0,0);} to { transform: translate3d(-50%,0,0);} }`}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tilt card                                                           */
/* ------------------------------------------------------------------ */

export function Tilt({
  children,
  className,
  max = 8,
  glare = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || !isDesktopPointer() || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: -(py - 0.5) * max * 2,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    })
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.14,
        background: `radial-gradient(260px circle at ${px * 100}% ${py * 100}%, #fff, transparent 70%)`,
        duration: 0.4,
      })
    }
  }

  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' })
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.5 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative will-change-transform [transform-style:preserve-3d]', className)}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Lazy image with reveal + parallax                                   */
/* ------------------------------------------------------------------ */

export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  parallax = 0,
  priority = false,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  parallax?: number
  priority?: boolean
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useGSAP(
    () => {
      const el = wrap.current
      if (!el || prefersReducedMotion()) return
      const img = el.querySelector('img')
      gsap.fromTo(
        el,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        },
      )
      gsap.fromTo(
        img,
        { scale: 1.18 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        },
      )
      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }
    },
    { scope: wrap },
  )

  return (
    <div ref={wrap} className={cn('relative overflow-hidden bg-surface-2', className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Spotlight border card                                               */
/* ------------------------------------------------------------------ */

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !isDesktopPointer()) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-line bg-bg transition-all duration-500 hover:border-[#C9D2E2] hover:shadow-[0_18px_40px_-28px_rgba(11,14,20,0.45)]',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), rgba(31,79,255,0.07), transparent 60%)',
        }}
      />
      {children}
    </div>
  )
}
