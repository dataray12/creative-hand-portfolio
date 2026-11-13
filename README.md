# Creative Hand Marketing Services — Portfolio Site

A premium, light-themed single-page site for **Creative Hand Marketing Services (CHMS) / BTL Masters**, Jeddah.

All copy, imagery, client logos and contact details are taken from the supplied company profile PDF
(`Creative Hand Marketing (BTL Masters).pdf`). Nothing was invented — no fake projects, links,
testimonials or statistics.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm run lint
```

## Stack

| Concern | Library |
| --- | --- |
| Framework / build | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, theme tokens in `src/index.css`) |
| Type | Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (labels) |
| Scroll-driven animation | GSAP + ScrollTrigger, `@gsap/react` |
| Smooth scrolling | Lenis, wired into the GSAP ticker |
| Component animation | Motion (`motion/react`) |
| 3D | three.js, React Three Fiber, Drei (lazy-loaded) |
| Icons | lucide-react |

## Structure

```
src/
  data/content.ts        All site copy, extracted from the PDF. Single source of truth.
  lib/motion.ts          GSAP registration, cn(), reduced-motion + pointer helpers.
  hooks/useSmoothScroll  Lenis ↔ GSAP ticker ↔ ScrollTrigger integration, scrollToId().
  components/
    Preloader            Cinematic intro: counter, rotating taglines, panel wipe.
    Cursor               Desktop-only dot + lagging ring with hover states.
    Nav                  Sticky pill nav, IntersectionObserver active indicator, mobile overlay.
    Hero / HeroScene     Masked headline reveal; lazy R3F puzzle cluster + particles.
    About                Scroll-scrubbed story text, parallax image grid, animated counters.
    Clients              Dual-direction logo marquees (18 real client logos).
    Services             Six BTL / operational capabilities.
    Work                 Masonry gallery (31 photos), category filter, show-all, lightbox.
    Digital              Accordion of the five digital service lines.
    Tech                 Tech-stack matrix + marquee, industries grid.
    Process              Scrubbed onboarding timeline, principles, workflow lanes.
    Contact / Footer     Real phone, email, address, map link.
    ui/                  Reveal, SplitText, Magnetic, Tilt, Marquee, Counter, RevealImage, SpotlightCard.
public/media/            WebP assets extracted and optimised from the PDF (~2 MB total).
```

## Performance & accessibility notes

- The three.js bundle is a separate chunk, imported only after the intro finishes and skipped on
  reduced-motion, low-memory and sub-1024px devices.
- All imagery is WebP with explicit `width`/`height` to avoid layout shift; everything below the
  fold is `loading="lazy"`.
- Every animation checks `prefers-reduced-motion`; with it on, the preloader, pinning, parallax,
  custom cursor and scrubbed reveals are all bypassed and content renders statically.
- Keyboard: skip link, visible focus rings, `aria-current` on the active nav item, Escape and
  arrow-key support in the project lightbox.
- SEO: descriptive title/description, Open Graph and Twitter tags, canonical URL and
  `Organization` JSON-LD in `index.html`.

## Design system

Light surfaces (`--color-bg` white, `--color-surface`, `--color-surface-2`) with near-black type
(`--color-fg`) and a vibrant accent set taken from the CHMS puzzle mark: `--color-accent` blue,
`--color-accent-2` green, `--color-ember` orange, `--color-sun` yellow and `--color-grape` violet.
Accents cycle across service and industry cards; `.text-gradient` and `.aurora` carry the colour
into headlines and section backgrounds. All tokens live in `src/index.css` — change them there and
the whole site follows.

## Updating content

Edit `src/data/content.ts` — every section reads from it. To change or add imagery, drop WebP files
into `public/media/work/` and add an entry (with intrinsic `w`/`h`) to `workItems`.
