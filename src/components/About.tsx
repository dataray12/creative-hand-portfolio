import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Quote } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { about, vision, stats } from '../data/content'
import { Section, Eyebrow, Counter, RevealImage } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'

export function About() {
  const root = useRef<HTMLDivElement>(null)

  // Progressive highlight of the story paragraphs as they scroll through.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      const lines = root.current.querySelectorAll('[data-story-p]')
      lines.forEach((el) => {
        gsap.fromTo(
          el,
          { color: '#A4ADBD' },
          {
            color: '#0B0E14',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <Section id="about" label="About the company">
      <div ref={root} className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>About us</Eyebrow>
            <SplitText
              as="h2"
              text={about.eyebrow}
              className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.015em]"
            />

            <Reveal className="mt-10 space-y-5 text-[15px] leading-relaxed" delay={0.1}>
              {about.paragraphs.map((p, i) => (
                <p key={i} data-story-p className="text-mute">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal
              className="mt-10 flex gap-4 rounded-2xl border border-line border-l-[3px] border-l-accent bg-surface p-6"
              delay={0.15}
            >
              <Quote className="h-5 w-5 shrink-0 text-accent" aria-hidden />
              <p className="font-display text-xl leading-snug text-fg">{about.pullQuote}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <RevealImage
                src="/media/work/events-9-1.webp"
                alt="Brand activation stand built and deployed by CHMS inside a Saudi shopping mall"
                width={1000}
                height={743}
                parallax={4}
                className="col-span-2 aspect-[16/10] rounded-2xl"
              />
              <RevealImage
                src="/media/work/shopper-7-2.webp"
                alt="Free-standing shopper display unit merchandised in-store"
                width={541}
                height={819}
                parallax={6}
                className="aspect-[4/5] rounded-2xl"
              />
              <RevealImage
                src="/media/work/outdoor-15-1.webp"
                alt="Large-format outdoor building branding produced by CHMS"
                width={568}
                height={757}
                parallax={-5}
                className="aspect-[4/5] rounded-2xl"
              />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-bg px-5 py-7">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    plain={Boolean((s as { plain?: boolean }).plain)}
                    className="text-gradient font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none"
                  />
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-mute">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & mission */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-32 lg:grid-cols-2">
          <Reveal className="bg-bg p-8 sm:p-12">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-6 text-pretty font-display font-display-md text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug text-fg">
              {vision.vision}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {vision.pillars.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-accent/25 bg-accent/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="bg-bg p-8 sm:p-12" delay={0.1}>
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-6 text-pretty font-display font-display-md text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug text-fg">
              {vision.mission}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
