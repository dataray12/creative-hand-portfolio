import { ArrowUp } from 'lucide-react'
import { company, nav, office } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-bg px-4 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img
                src="/media/brand/mark-chms.webp"
                alt=""
                width={270}
                height={272}
                loading="lazy"
                className="h-11 w-auto"
              />
              <img
                src="/media/brand/mark-btl.webp"
                alt=""
                width={205}
                height={123}
                loading="lazy"
                className="h-7 w-auto opacity-80"
              />
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-mute">
              {company.name} — {company.sister}. {company.tagline}, from {company.city} since{' '}
              {company.founded}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute/70">
              Navigate
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    className="text-[14px] text-mute transition-colors hover:text-accent focus-ring"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute/70">
              Get in touch
            </p>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li>
                <a
                  href={`mailto:${office.email}`}
                  className="break-all text-mute transition-colors hover:text-accent focus-ring"
                >
                  {office.email}
                </a>
              </li>
              <li>
                <a
                  href={office.telHref}
                  className="text-mute transition-colors hover:text-accent focus-ring"
                >
                  {office.tel}
                </a>
              </li>
              <li className="text-mute">
                {office.lines[1]}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute/70">
            © {year} {company.name}. All rights reserved.
          </p>
          <button
            onClick={() => scrollToId('home')}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mute transition-colors hover:border-accent hover:text-accent focus-ring"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
