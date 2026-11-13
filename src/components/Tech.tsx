import { techStack, industries } from '../data/content'
import {
  UtensilsCrossed,
  ShoppingBag,
  Cpu,
  Shirt,
  ConciergeBell,
  Briefcase,
  type LucideIcon,
} from 'lucide-react'
import { Section, Eyebrow, Marquee, SpotlightCard } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'

const tones = [
  'bg-accent/10 text-accent',
  'bg-accent-2/12 text-accent-2',
  'bg-ember/12 text-ember',
  'bg-grape/10 text-grape',
  'bg-sun/15 text-[#B07F00]',
  'bg-accent/10 text-accent',
]

const groupTone = ['text-accent', 'text-accent-2', 'text-ember', 'text-grape', 'text-[#B07F00]']

const industryIcons: Record<string, LucideIcon> = {
  UtensilsCrossed,
  ShoppingBag,
  Cpu,
  Shirt,
  ConciergeBell,
  Briefcase,
}

export function Tech() {
  return (
    <>
      {/* Tech stack */}
      <Section id="stack" label="Tech stack" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Our tech stack</Eyebrow>
              <SplitText
                text="The latest tools behind every project."
                className="mt-6 max-w-[14ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1] tracking-[-0.02em]"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {techStack.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 0.06} className="bg-bg p-6">
                <p
                  className={`font-mono text-[10px] font-medium uppercase tracking-[0.18em] ${groupTone[gi % groupTone.length]}`}
                >
                  {g.group}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {g.tools.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 text-[13px] text-mute transition-colors duration-300 hover:text-fg"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-mute/50" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 border-y border-line py-6">
          <Marquee speed={38}>
            {techStack
              .flatMap((g) => g.tools)
              .map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="mx-5 inline-flex items-center whitespace-nowrap font-display text-2xl text-fg/30 sm:mx-7 sm:text-3xl"
                >
                  {t}
                  <span
                    aria-hidden
                    className="ml-5 h-1.5 w-1.5 rounded-full bg-accent/60 sm:ml-7"
                  />
                </span>
              ))}
          </Marquee>
        </div>
      </Section>

      {/* Industries */}
      <Section id="industries" label="Industries we serve">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>Industries & audiences</Eyebrow>
              <SplitText
                text="Creative thinking. Across categories."
                className="mt-6 max-w-[13ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1] tracking-[-0.02em]"
              />
            </div>
            <Reveal className="md:col-span-5" delay={0.1}>
              <p className="text-pretty text-[15px] leading-relaxed text-mute">
                Campaigns shaped around the product, the audience and the buying moment.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => {
              const Icon = industryIcons[ind.icon]
              return (
                <Reveal key={ind.title} delay={(i % 3) * 0.07}>
                  <SpotlightCard className="h-full p-7">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[i % tones.length]}`}
                    >
                      {Icon && <Icon className="h-5 w-5" aria-hidden />}
                    </span>
                    <h3 className="mt-7 text-lg font-semibold tracking-tight text-fg">
                      {ind.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-mute">{ind.body}</p>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}
