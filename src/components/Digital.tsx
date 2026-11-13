import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  TrendingUp,
  Palette,
  Code2,
  Gamepad2,
  Bot,
  Plus,
  type LucideIcon,
} from 'lucide-react'
import { digitalServices } from '../data/content'
import { Section, Eyebrow } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'
import { cn } from '../lib/motion'

const icons: Record<string, LucideIcon> = { TrendingUp, Palette, Code2, Gamepad2, Bot }

export function Digital() {
  const [open, setOpen] = useState<string | null>(digitalServices[0].id)

  return (
    <Section id="digital" label="Digital services" className="border-t border-line">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Digital services overview</Eyebrow>
            <SplitText
              text="The modern half of the business."
              className="mt-6 max-w-[14ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1] tracking-[-0.02em]"
            />
          </div>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="text-pretty text-[15px] leading-relaxed text-mute">
              Digital marketing, design, software, games and AI automation — built by the
              same team that handles the physical side of your brand.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line">
          {digitalServices.map((s) => {
            const Icon = icons[s.icon]
            const isOpen = open === s.id
            return (
              <div key={s.id} className="border-b border-line">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-7 text-left focus-ring sm:gap-8 sm:py-9"
                  >
                    <span className="font-mono text-[11px] text-mute">{s.index}</span>

                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500',
                        isOpen
                          ? 'border-accent bg-accent text-white shadow-[0_8px_20px_-10px_rgba(31,79,255,0.9)]'
                          : 'border-line bg-surface text-mute group-hover:border-accent/40 group-hover:text-accent',
                      )}
                    >
                      {Icon && <Icon className="h-5 w-5" aria-hidden />}
                    </span>

                    <span className="flex-1">
                      <span
                        className={cn(
                          'block font-display text-[clamp(1.35rem,3vw,2.5rem)] leading-tight transition-colors duration-500',
                          isOpen ? 'text-fg' : 'text-fg/45 group-hover:text-fg',
                        )}
                      >
                        {s.title}
                      </span>
                    </span>

                    <Plus
                      className={cn(
                        'h-5 w-5 shrink-0 text-mute transition-transform duration-500',
                        isOpen && 'rotate-45 text-fg',
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 sm:grid-cols-12 sm:pl-[6.5rem]">
                        <p className="text-pretty text-[15px] leading-relaxed text-fg sm:col-span-5">
                          {s.line}
                        </p>
                        <ul className="flex flex-wrap content-start gap-2 sm:col-span-7">
                          {s.items.map((it) => (
                            <li
                              key={it}
                              className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mute"
                            >
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
