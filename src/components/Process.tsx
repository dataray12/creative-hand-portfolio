import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  Bot,
  Clapperboard,
  Gamepad2,
  LayoutTemplate,
  Megaphone,
  MonitorSmartphone,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { onboarding, principles, workflows } from '../data/content'
import { Section, Eyebrow } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'

function Timeline() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return
      gsap.fromTo(
        root.current.querySelector('[data-progress]'),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative mt-16 pl-8 sm:pl-12">
      <div className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[7px]">
        <div
          data-progress
          className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-accent via-grape to-ember"
        />
      </div>

      <ol className="space-y-10 sm:space-y-14">
        {onboarding.map((o) => (
          <li key={o.step} className="relative">
            <span className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-accent sm:-left-12 sm:h-[15px] sm:w-[15px] sm:border-4 sm:border-bg" />
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] text-accent">{o.step}</span>
                <h3 className="font-display text-[clamp(1.4rem,2.6vw,2.1rem)] leading-tight text-fg">
                  {o.title}
                </h3>
              </div>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mute">{o.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** One icon per delivery lane, keyed by the lane title in content.ts. */
const laneIcons: Record<string, LucideIcon> = {
  'Digital Marketing': Megaphone,
  'SEO & Content': Search,
  'Social Media Management': Share2,
  'UI/UX & Branding': LayoutTemplate,
  'Video & Animation': Clapperboard,
  'Web Development': MonitorSmartphone,
  'Mobile App Development': Smartphone,
  'E-Commerce': ShoppingCart,
  'Game Development': Gamepad2,
  'AI Automation': Bot,
}

function WorkflowLanes() {
  return (
    <div className="mt-16 space-y-14">
      {workflows.map((wf) => (
        <div key={wf.group}>
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
              <h3 className="font-display text-2xl text-fg sm:text-3xl">{wf.group}</h3>
              <p className="max-w-lg text-[13px] leading-relaxed text-mute">{wf.blurb}</p>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {wf.lanes.map((lane, i) => (
              <Reveal key={lane.title} delay={(i % 5) * 0.06} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-bg p-5 transition-all duration-500 hover:border-[#C9D2E2] hover:shadow-[0_18px_40px_-28px_rgba(11,14,20,0.4)]">
                  <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-fg/70 transition-colors duration-500 group-hover:bg-accent/10 group-hover:text-accent">
                    {(() => {
                      const LaneIcon = laneIcons[lane.title]
                      return LaneIcon ? <LaneIcon className="h-[18px] w-[18px]" aria-hidden /> : null
                    })()}
                  </span>
                  <h4 className="text-[13px] font-semibold leading-snug text-fg">
                    {lane.title}
                  </h4>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-mute">
                    {lane.meta}
                  </p>

                  <ol className="mt-5 flex-1 space-y-2">
                    {lane.steps.map((s) => (
                      <li
                        key={s}
                        className="rounded-lg border border-line bg-surface px-3 py-2 text-center text-[11px] text-mute"
                      >
                        {s}
                      </li>
                    ))}
                  </ol>

                  <p className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-center text-[11px] font-semibold text-white shadow-[0_6px_16px_-8px_rgba(31,79,255,0.9)]">
                    {lane.final}
                    <ArrowRight
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Process() {
  return (
    <Section id="process" label="How we work" className="border-t border-line">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>Client on-boarding</Eyebrow>
            <SplitText
              text="From first call to launch, you always know what is next."
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] leading-[1] tracking-[-0.02em]"
            />
          </div>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="text-pretty text-[15px] leading-relaxed text-mute">
              A clear, repeatable process. One dedicated point of contact from day one,
              so there are no surprises.
            </p>
          </Reveal>
        </div>

        <Timeline />

        {/* Principles */}
        <div className="mt-28">
          <Reveal>
            <Eyebrow>Working with us</Eyebrow>
            <h3 className="mt-6 max-w-[18ch] font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-tight tracking-[-0.015em]">
              Clear communication. Accountable delivery.
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">
              A shared understanding of the brief keeps every stage of the project focused.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={(i % 3) * 0.06} className="bg-bg p-7">
                <span className="font-mono text-[11px] text-accent">{p.n}</span>
                <h4 className="mt-4 text-base font-semibold tracking-tight text-fg">
                  {p.title}
                </h4>
                <p className="mt-2.5 text-[14px] leading-relaxed text-mute">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Workflows */}
        <div className="mt-28">
          <Reveal>
            <Eyebrow>Project workflow</Eyebrow>
            <h3 className="mt-6 max-w-[20ch] font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-tight tracking-[-0.015em]">
              A defined workflow for every service.
            </h3>
          </Reveal>
          <WorkflowLanes />
        </div>
      </div>
    </Section>
  )
}
