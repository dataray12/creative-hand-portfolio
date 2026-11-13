import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { contacts, office, cta, company } from '../data/content'
import { Section, Eyebrow, Marquee } from './ui/Bits'
import { Reveal, SplitText } from './ui/Reveal'
import { MagneticLink } from './ui/Magnetic'

export function Contact() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return
      gsap.to(root.current.querySelector('[data-glow]'), {
        scale: 1.25,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    office.mapQuery,
  )}`

  return (
    <Section id="contact" label="Contact" className="relative overflow-hidden border-t border-line bg-surface">
      <div ref={root} className="mx-auto max-w-[1400px]">
        <div
          data-glow
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl glow-accent"
        />

        <Eyebrow>Let us talk</Eyebrow>
        <SplitText
          text={cta.heading}
          className="mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.025em]"
        />
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-mute">
            {cta.body}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.15}>
          <MagneticLink
            href={`mailto:${office.email}?subject=${encodeURIComponent('Project brief — Creative Hand Marketing Services')}`}
            data-cursor="Email"
            className="items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(31,79,255,0.8)] transition-colors hover:bg-[#1741e0]"
          >
            {office.email}
            <ArrowUpRight className="h-4 w-4" />
          </MagneticLink>
          <MagneticLink
            href={office.telHref}
            className="items-center gap-2 rounded-full border border-line bg-bg px-7 py-3.5 text-sm font-medium text-fg transition-colors hover:border-fg/30"
          >
            <Phone className="h-4 w-4" />
            {office.tel}
          </MagneticLink>
        </Reveal>

        {/* People */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-3">
          {contacts.map((c) => (
            <Reveal key={c.email} className="bg-bg p-8">
              <p className="font-display text-2xl text-fg">{c.name}</p>
              <p className="mt-1.5 text-[13px] italic text-mute">{c.role}</p>
              <div className="mt-7 space-y-3">
                <a
                  href={c.phoneHref}
                  className="flex items-center gap-3 text-[14px] text-mute transition-colors hover:text-fg focus-ring"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {c.phone}
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-3 break-all text-[14px] text-mute transition-colors hover:text-fg focus-ring"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {c.email}
                </a>
              </div>
            </Reveal>
          ))}

          <Reveal className="bg-bg p-8" delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Head office
            </p>
            <address className="mt-5 space-y-1 text-[14px] not-italic leading-relaxed text-mute">
              {office.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </address>
            <div className="mt-6 space-y-3">
              <a
                href={office.telHref}
                className="flex items-center gap-3 text-[14px] text-mute transition-colors hover:text-fg focus-ring"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {office.tel}
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 text-[14px] text-mute transition-colors hover:text-fg focus-ring"
              >
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                View on map
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 border-y border-line py-7">
        <Marquee speed={30} pauseOnHover={false}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 whitespace-nowrap font-display text-[clamp(2rem,6vw,4.5rem)] leading-none text-fg sm:mx-10"
            >
              {company.tagline}
              <span
                aria-hidden
                className="mx-6 inline-block h-2.5 w-2.5 translate-y-[-0.28em] rounded-full bg-accent sm:mx-10"
              />
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
