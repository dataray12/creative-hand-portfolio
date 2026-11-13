import { useRef, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  start?: string
  once?: boolean
}

/** Fades + lifts an element into view on scroll. */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 28,
  start = 'top 88%',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start, once: true },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

type SplitTextProps = {
  text: string
  className?: string
  wordClassName?: string
  as?: ElementType
  delay?: number
  stagger?: number
  start?: string
  trigger?: boolean
}

/** Word-by-word masked reveal. Plays on scroll, or immediately when trigger=false. */
export function SplitText({
  text,
  className,
  wordClassName,
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.045,
  start = 'top 85%',
  trigger = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const words = text.split(' ')

  useGSAP(
    () => {
      if (!ref.current) return
      const targets = ref.current.querySelectorAll('[data-word]')
      if (prefersReducedMotion()) {
        gsap.set(targets, { yPercent: 0, opacity: 1 })
        return
      }
      gsap.fromTo(
        targets,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: trigger
            ? { trigger: ref.current, start, once: true }
            : undefined,
        },
      )
    },
    { scope: ref, dependencies: [text] },
  )

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]"
        >
          <span data-word className={`inline-block will-change-transform ${wordClassName ?? ''}`}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
