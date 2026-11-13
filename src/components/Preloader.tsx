import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { company } from '../data/content'

const WORDS = ['Building Brands', 'Connecting People', 'Since 1978']

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useGSAP(
    () => {
      const finish = () => {
        document.documentElement.classList.remove('is-loading')
        setHidden(true)
        onDone()
      }

      if (prefersReducedMotion()) {
        finish()
        return
      }

      const tl = gsap.timeline({ onComplete: finish })

      tl.to('[data-pl-mark]', { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' })
        .to(
          '[data-pl-bar]',
          { scaleX: 1, duration: 2.1, ease: 'power2.inOut' },
          0.1,
        )
        .to(
          '[data-pl-count]',
          {
            innerText: 100,
            duration: 2.1,
            snap: { innerText: 1 },
            ease: 'power2.inOut',
            onUpdate() {
              const el = this.targets()[0] as HTMLElement
              el.textContent = String(Math.round(Number(el.textContent) || 0)).padStart(3, '0')
            },
          },
          0.1,
        )

      WORDS.forEach((_, i) => {
        tl.to(
          `[data-pl-word="${i}"]`,
          { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
          0.25 + i * 0.55,
        ).to(
          `[data-pl-word="${i}"]`,
          { yPercent: -110, opacity: 0, duration: 0.5, ease: 'expo.in' },
          0.25 + i * 0.55 + 0.5,
        )
      })

      tl.to('[data-pl-inner]', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
        .to(
          '[data-pl-panel]',
          {
            yPercent: -100,
            duration: 1.05,
            ease: 'expo.inOut',
            stagger: 0.07,
          },
          '-=0.1',
        )
    },
    { scope: root },
  )

  if (hidden) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="absolute inset-0 aurora opacity-60" />
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} data-pl-panel className="h-full flex-1 bg-bg" />
        ))}
      </div>

      <div
        data-pl-inner
        className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6"
      >
        <img
          data-pl-mark
          src="/media/brand/mark-chms.webp"
          alt=""
          width={270}
          height={272}
          className="h-16 w-auto scale-90 opacity-0 sm:h-20"
        />

        <div className="relative h-12 w-full max-w-md overflow-hidden text-center">
          {WORDS.map((w, i) => (
            <span
              key={w}
              data-pl-word={i}
              className="absolute inset-x-0 top-1 translate-y-full font-display text-2xl leading-[1.35] text-fg opacity-0 sm:text-3xl"
            >
              {w}
            </span>
          ))}
        </div>

        <div className="flex w-full max-w-md items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-line">
            <div
              data-pl-bar
              className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent via-grape to-ember"
            />
          </div>
          <span data-pl-count className="font-mono text-xs text-mute">
            000
          </span>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute/70">
          {company.short} · {company.sister}
        </span>
      </div>
    </div>
  )
}
