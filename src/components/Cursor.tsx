import { useEffect, useRef } from 'react'
import { gsap, isDesktopPointer, prefersReducedMotion } from '../lib/motion'

/**
 * Desktop-only custom cursor: a solid dot plus a lagging ring that reacts to
 * hover targets. The elements stay mounted so the GSAP quickTo setters bind to
 * real nodes; visibility is driven by the first pointer move.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return
    if (!isDesktopPointer() || prefersReducedMotion()) return

    document.documentElement.classList.add('has-custom-cursor')

    const xTo = gsap.quickTo(dotEl, 'x', { duration: 0.08, ease: 'power3' })
    const yTo = gsap.quickTo(dotEl, 'y', { duration: 0.08, ease: 'power3' })
    const rxTo = gsap.quickTo(ringEl, 'x', { duration: 0.42, ease: 'power3' })
    const ryTo = gsap.quickTo(ringEl, 'y', { duration: 0.42, ease: 'power3' })

    let shown = false
    const reveal = () => {
      if (shown) return
      shown = true
      gsap.to([dotEl, ringEl], { autoAlpha: 1, duration: 0.25 })
    }

    const move = (e: MouseEvent) => {
      reveal()
      xTo(e.clientX)
      yTo(e.clientY)
      rxTo(e.clientX)
      ryTo(e.clientY)
    }

    const setLabel = (text: string) => {
      if (labelRef.current) labelRef.current.textContent = text
    }

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>('a, button, [data-cursor]')
      if (!t) return
      const text = t.dataset.cursor ?? ''
      setLabel(text)
      gsap.to(ringEl, {
        scale: text ? 1.95 : 1.55,
        backgroundColor: text ? 'rgba(31,79,255,1)' : 'rgba(31,79,255,0.12)',
        borderColor: 'rgba(31,79,255,1)',
        duration: 0.32,
        ease: 'power3.out',
      })
      gsap.to(dotEl, { scale: 0, duration: 0.22 })
    }

    const out = (e: MouseEvent) => {
      if (!(e.target as HTMLElement)?.closest('a, button, [data-cursor]')) return
      setLabel('')
      gsap.to(ringEl, {
        scale: 1,
        backgroundColor: 'rgba(31,79,255,0)',
        borderColor: 'rgba(11,14,20,0.45)',
        duration: 0.32,
        ease: 'power3.out',
      })
      gsap.to(dotEl, { scale: 1, duration: 0.22 })
    }

    const down = () => gsap.to(ringEl, { scale: 0.82, duration: 0.15 })
    const up = () => gsap.to(ringEl, { scale: 1, duration: 0.25 })
    const hide = () => gsap.to([dotEl, ringEl], { autoAlpha: 0, duration: 0.2 })
    const show = () => gsap.to([dotEl, ringEl], { autoAlpha: 1, duration: 0.2 })

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={ring}
        className="invisible absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[rgba(11,14,20,0.45)] opacity-0"
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-white"
        />
      </div>
      <div
        ref={dot}
        className="invisible absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent opacity-0"
      />
    </div>
  )
}
