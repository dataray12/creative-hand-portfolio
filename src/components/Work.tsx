import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X, Plus, Minus } from 'lucide-react'
import { ScrollTrigger, cn } from '../lib/motion'
import { workItems, workCategories, type WorkItem } from '../data/content'
import { Eyebrow } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'

const INITIAL_COUNT = 9

const catLabel = (id: string) => workCategories.find((c) => c.id === id)?.label ?? id
const catNote = (id: string) => workCategories.find((c) => c.id === id)?.note ?? ''

function Card({
  item,
  index,
  onOpen,
}: {
  item: WorkItem
  index: number
  onOpen: () => void
}) {
  return (
    <button
      onClick={onOpen}
      data-cursor="Open"
      aria-label={`View ${catLabel(item.cat)} project ${index + 1}`}
      className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[0_1px_2px_rgba(11,14,20,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(11,14,20,0.35)] focus-ring"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.src}
          alt={`${catLabel(item.cat)} — ${catNote(item.cat)}, executed by Creative Hand Marketing Services`}
          width={item.w}
          height={item.h}
          loading="lazy"
          decoding="async"
          className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="photo-scrim absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-fg shadow-sm backdrop-blur-md">
          {catLabel(item.cat)}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="font-display text-base leading-tight text-white">
            {catNote(item.cat)}
          </p>
          <span className="shrink-0 rounded-full bg-white/95 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fg">
            View
          </span>
        </div>
      </div>
    </button>
  )
}

export function Work() {
  const [filter, setFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<number | null>(null)

  const items = useMemo(
    () => (filter === 'all' ? workItems : workItems.filter((w) => w.cat === filter)),
    [filter],
  )
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT)
  const hidden = items.length - visible.length

  // Layout changes as cards are added or filtered — keep scroll triggers honest.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 420)
    return () => window.clearTimeout(id)
  }, [expanded, filter])

  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % items.length))
      if (e.key === 'ArrowLeft')
        setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, items.length, close])

  return (
    <>
      <section id="work" data-section aria-label="Selected work" className="relative">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 md:py-32">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Our work</Eyebrow>
              <SplitText
                text="Executed on the ground, across the Kingdom."
                className="mt-6 max-w-[15ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1.02]"
              />
            </div>
            <Reveal className="md:col-span-5" delay={0.1}>
              <p className="text-pretty text-[15px] leading-relaxed text-mute">
                Shopper enhancements, speciality displays, activations and signage —
                simulated, produced and deployed in live retail environments.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center gap-2" delay={0.1}>
            {[{ id: 'all', label: 'All work' }, ...workCategories].map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setFilter(c.id)
                  setExpanded(false)
                }}
                aria-pressed={filter === c.id}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 focus-ring',
                  filter === c.id
                    ? 'border-accent bg-accent text-white shadow-[0_6px_18px_-8px_rgba(31,79,255,0.8)]'
                    : 'border-line bg-bg text-mute hover:border-fg/25 hover:text-fg',
                )}
              >
                {c.label}
              </button>
            ))}
            <span className="mt-1 w-full font-mono text-[10px] uppercase tracking-[0.14em] text-mute sm:ml-auto sm:mt-0 sm:w-auto sm:text-right">
              {items.length} projects
            </span>
          </Reveal>

          {/* Masonry keeps every photo at its own proportions without cropping. */}
          <div className="mt-10 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {visible.map((item, i) => (
              <Card key={item.src} item={item} index={i} onOpen={() => setOpen(i)} />
            ))}
          </div>

          {(hidden > 0 || expanded) && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-bg px-7 py-3.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent focus-ring"
              >
                {expanded ? (
                  <>
                    <Minus className="h-4 w-4" aria-hidden />
                    Show fewer
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" aria-hidden />
                    Show all {items.length} projects
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0B0E14]/85 p-4 backdrop-blur-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Project preview"
            onClick={close}
          >
            <motion.figure
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl"
            >
              <img
                src={items[open].src}
                alt={`${catLabel(items[open].cat)} — ${catNote(items[open].cat)}`}
                width={items[open].w}
                height={items[open].h}
                className="max-h-[70svh] w-full object-contain"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-fg">{catLabel(items[open].cat)}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                    {catNote(items[open].cat)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length))
                    }
                    aria-label="Previous project"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent focus-ring"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-[10px] text-mute">
                    {open + 1} / {items.length}
                  </span>
                  <button
                    onClick={() => setOpen((i) => (i === null ? i : (i + 1) % items.length))}
                    aria-label="Next project"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent focus-ring"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </figcaption>

              <button
                onClick={close}
                aria-label="Close preview"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg/90 text-fg shadow-sm backdrop-blur-md transition-colors hover:border-fg/30 focus-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
