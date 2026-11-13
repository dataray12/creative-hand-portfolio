import { clients } from '../data/content'
import { Marquee } from './ui/Bits'

function Row({ items, reverse }: { items: typeof clients; reverse?: boolean }) {
  return (
    <Marquee speed={reverse ? 52 : 44} reverse={reverse}>
      {items.map((c) => (
        <div
          key={c.name}
          title={c.name}
          className="group mx-3 flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-line bg-bg px-6 transition-shadow duration-500 hover:shadow-[0_12px_28px_-18px_rgba(11,14,20,0.4)] sm:mx-4 sm:w-52"
        >
          <img
            src={c.src}
            alt={c.name}
            loading="lazy"
            decoding="async"
            width={200}
            height={80}
            className="max-h-11 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ))}
    </Marquee>
  )
}

export function Clients() {
  const half = Math.ceil(clients.length / 2)
  return (
    <section
      aria-label="Brands we have worked with"
      className="relative overflow-hidden border-y border-line bg-surface py-16 md:py-20"
    >
      <div className="mx-auto mb-10 max-w-[1400px] px-4 sm:px-8">
        <p className="inline-flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-accent to-accent/0" />
          Success partners · brands we build for
        </p>
      </div>

      <div className="space-y-4">
        <Row items={clients.slice(0, half)} />
        <Row items={clients.slice(half)} reverse />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent sm:w-32" />
    </section>
  )
}
