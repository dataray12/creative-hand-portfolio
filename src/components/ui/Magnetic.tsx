import {
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { gsap, cn, isDesktopPointer, prefersReducedMotion } from '../../lib/motion'

type Common = {
  children: ReactNode
  className?: string
  strength?: number
}

function useMagnet(strength: number) {
  const ref = useRef<HTMLElement | null>(null)
  const inner = useRef<HTMLSpanElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || !isDesktopPointer() || prefersReducedMotion()) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    gsap.to(ref.current, { x, y, duration: 0.6, ease: 'power3.out' })
    gsap.to(inner.current, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to([ref.current, inner.current], {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return { ref, inner, onMove, onLeave }
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, inner, onMove, onLeave } = useMagnet(strength)
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative inline-flex will-change-transform focus-ring', className)}
      {...rest}
    >
      <span ref={inner} className="inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}

export function MagneticLink({
  children,
  className,
  strength = 0.3,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref, inner, onMove, onLeave } = useMagnet(strength)
  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative inline-flex will-change-transform focus-ring', className)}
      {...rest}
    >
      <span ref={inner} className="inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  )
}

/** Pill-shaped primary action used across the site. */
export const pillBase =
  'group items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300'
