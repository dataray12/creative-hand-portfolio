import {
  Megaphone,
  SignpostBig,
  PartyPopper,
  Route,
  Truck,
  Hammer,
  type LucideIcon,
} from 'lucide-react'
import { coreServices } from '../data/content'
import { Section, Eyebrow, SpotlightCard } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'

/** Vibrant accent cycled across the service cards. */
const tones = [
  { chip: 'bg-accent/10 text-accent', bar: 'bg-accent' },
  { chip: 'bg-accent-2/12 text-accent-2', bar: 'bg-accent-2' },
  { chip: 'bg-ember/12 text-ember', bar: 'bg-ember' },
  { chip: 'bg-grape/10 text-grape', bar: 'bg-grape' },
  { chip: 'bg-sun/15 text-[#B07F00]', bar: 'bg-sun' },
  { chip: 'bg-accent/10 text-accent', bar: 'bg-accent' },
]

const icons: Record<string, LucideIcon> = {
  Megaphone,
  SignpostBig,
  PartyPopper,
  Route,
  Truck,
  Hammer,
}

export function Services() {
  return (
    <Section id="services" label="Services">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Our services</Eyebrow>
            <SplitText
              text="Everything between the brief and the shelf."
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1] tracking-[-0.02em]"
            />
          </div>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="text-pretty text-[15px] leading-relaxed text-mute">
              Six capabilities under one roof — strategy, production, activation and
              logistics — so a campaign never stalls between suppliers.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s, i) => {
            const Icon = icons[s.icon]
            const tone = tones[i % tones.length]
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.08} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-7">
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${tone.bar}`}
                  />
                  <div className="flex items-start justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.chip}`}>
                      {Icon && <Icon className="h-5 w-5" aria-hidden />}
                    </span>
                    <span className="font-mono text-[10px] text-mute/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-semibold leading-snug tracking-tight text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-mute">{s.summary}</p>

                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-1.5">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mute transition-colors duration-300 group-hover:text-fg"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
