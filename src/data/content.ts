/**
 * Single source of truth for all site copy.
 * Every value here is taken from the Creative Hand Marketing Services
 * (BTL Masters) company profile PDF. Nothing is invented.
 */

export const company = {
  name: 'Creative Hand Marketing Services',
  short: 'CHMS',
  sister: 'BTL Masters',
  tagline: 'Building Brands, Connecting People',
  kicker: 'FMCG & Marketing are passion — and we are here to shape that passion with care.',
  founded: 1978,
  city: 'Jeddah',
  country: 'Saudi Arabia',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'digital', label: 'Digital' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  eyebrow: 'A Legacy of Creativity Since 1978',
  paragraphs: [
    'Creative Hand Marketing Services is built on a rich legacy of artistry and innovation, founded by the visionary Al Waheedy brothers — Syed Hussein Fareed Al Waheedy and the late Syed Fouad Fareed Al Waheedy — who began their journey hand-painting signs and artworks in their neighbourhood.',
    'Their craft soon caught the eye of merchants across Jeddah, including the iconic Zagzoog family and later Unilever, who entrusted them with Lipton’s branding across the Kingdom.',
    'Today, under the leadership of Syed Ammar Fouad Al Waheedy — who returned from the University of Wollongong, Dubai — the company has evolved into a modern, customer-centric business unit offering 360° marketing and operational solutions.',
  ],
  pullQuote: 'We invite you to put your hands in ours and feel the care.',
}

export const vision = {
  vision:
    'To be the leading catalyst for brand growth and transformation across Saudi Arabia. We empower businesses through 360-degree marketing solutions, immersive event experiences and dynamic digital engagement — building lasting partnerships and shaping success stories that redefine industry standards.',
  mission:
    'We deliver creative, integrated marketing, event and digital solutions that elevate brands, drive engagement and achieve measurable success. Through innovation, collaboration and a commitment to excellence, we empower our clients to lead and grow in a dynamic market.',
  pillars: [
    '360-degree marketing solutions',
    'Immersive event experiences',
    'Dynamic digital engagement',
  ],
}

export const stats = [
  { value: 1978, label: 'Founded in Jeddah', suffix: '', plain: true },
  { value: 47, label: 'Years of craft', suffix: '+' },
  { value: 18, label: 'Brands on our shelf', suffix: '' },
  { value: 360, label: 'Degrees of coverage', suffix: '°' },
]

export type Service = {
  id: string
  title: string
  summary: string
  items: string[]
  icon: string
}

export const coreServices: Service[] = [
  {
    id: 'btl',
    title: 'BTL Marketing & Advertising',
    summary:
      'Shopper marketing materials designed and produced in-house, then deployed where the buying decision is actually made.',
    items: [
      'FSU stands',
      'Displays',
      'Shelves branding',
      'End gondolas branding',
      'Simulation & deployment',
    ],
    icon: 'Megaphone',
  },
  {
    id: 'signs',
    title: 'Signs & Visibility',
    summary:
      'The craft the company was founded on — brand presence that holds up indoors, outdoors and on the road.',
    items: ['Indoor branding', 'Signboards', 'Vehicles branding'],
    icon: 'SignpostBig',
  },
  {
    id: 'events',
    title: 'Events Management',
    summary:
      'Immersive brand experiences, activations and sampling campaigns, from concept through on-ground execution.',
    items: ['Brand activations', 'Sampling campaigns', 'Mall & retail events'],
    icon: 'PartyPopper',
  },
  {
    id: 'rtm',
    title: 'Route-to-Market Strategy',
    summary:
      'Commercial structure for FMCG brands entering or scaling in the Saudi market.',
    items: [
      'Value chain analysis',
      'DTR (Direct to Retail) strategies',
      'Consolidation consultation',
      'F&B SFDA compliance & registration',
    ],
    icon: 'Route',
  },
  {
    id: 'distribution',
    title: 'FMCG Distribution',
    summary:
      'Product moved and stored at the right temperature, reliably, across the Kingdom.',
    items: ['Frozen distribution', 'Ambient distribution'],
    icon: 'Truck',
  },
  {
    id: 'turnkey',
    title: 'Turn-Key Projects',
    summary:
      'Build-out capability that closes the gap between a retail concept and a finished space.',
    items: ['Joinery works', 'HVAC and MEP works'],
    icon: 'Hammer',
  },
]

export type DigitalService = {
  id: string
  index: string
  title: string
  line: string
  items: string[]
  icon: string
}

export const digitalServices: DigitalService[] = [
  {
    id: 'marketing',
    index: '01',
    title: 'Digital Marketing, SEO & Content',
    line: 'Campaigns across search and social, reported in revenue and leads, not impressions.',
    items: ['Paid search & social', 'SEO', 'Content', 'Analytics & reporting'],
    icon: 'TrendingUp',
  },
  {
    id: 'design',
    index: '02',
    title: 'Design, Branding & Media Production',
    line: 'Identity, packaging and content that hold up next to the biggest names on the shelf.',
    items: ['Brand identity', 'Packaging', 'UI/UX', 'Video & animation'],
    icon: 'Palette',
  },
  {
    id: 'software',
    index: '03',
    title: 'Software Development & E-Commerce',
    line: 'Websites, apps and stores that load fast, scale cleanly and are easy to maintain.',
    items: ['Web platforms', 'Mobile apps', 'E-commerce', 'Integrations'],
    icon: 'Code2',
  },
  {
    id: 'games',
    index: '04',
    title: 'Game Design & Development',
    line: 'From concept to store listing, with monetisation and analytics built in from day one.',
    items: [
      'Unity 2D game development',
      'Unity 3D game development',
      'Cross-platform game development',
      'AR applications & games',
      'VR experiences & games',
      'Multiplayer game development',
      'Game backend development',
      'API integration & cloud services',
      'Game UI/UX design',
      '2D game art & animation',
      'Game optimisation & performance tuning',
      'Ads integration',
      'Game testing & quality assurance',
      'Prototype & MVP development',
    ],
    icon: 'Gamepad2',
  },
  {
    id: 'ai',
    index: '05',
    title: 'AI Automation & Agents',
    line: 'Agents and automations that connect the tools you already pay for and remove manual steps.',
    items: ['Workflow automation', 'Custom AI agents', 'Tool integrations'],
    icon: 'Bot',
  },
]

export const workCategories = [
  { id: 'shopper', label: 'Shopper Enhancements', note: 'Simulation & deployment' },
  { id: 'displays', label: 'Speciality Displays', note: 'Custom fabrication' },
  { id: 'events', label: 'Events & Campaigns', note: 'On-ground activation' },
  { id: 'sampling', label: 'Sampling & Activations', note: 'Face-to-face with shoppers' },
  { id: 'shelf', label: 'Shelf Branding', note: 'In-store visibility' },
  { id: 'outdoor', label: 'Outdoor & Signs', note: 'Facades, signage, vehicles' },
] as const

export type WorkCategoryId = (typeof workCategories)[number]['id']

export type WorkItem = { src: string; cat: WorkCategoryId; w: number; h: number }

export const workItems: WorkItem[] = [
  { src: '/media/work/shopper-6-1.webp', cat: 'shopper', w: 449, h: 819 },
  { src: '/media/work/shopper-6-2.webp', cat: 'shopper', w: 378, h: 533 },
  { src: '/media/work/shopper-6-3.webp', cat: 'shopper', w: 505, h: 674 },
  { src: '/media/work/shopper-6-4.webp', cat: 'shopper', w: 422, h: 701 },
  { src: '/media/work/shopper-7-1.webp', cat: 'shopper', w: 471, h: 819 },
  { src: '/media/work/shopper-7-2.webp', cat: 'shopper', w: 541, h: 819 },
  { src: '/media/work/shopper-7-3.webp', cat: 'shopper', w: 458, h: 698 },
  { src: '/media/work/shopper-7-4.webp', cat: 'shopper', w: 552, h: 819 },
  { src: '/media/work/displays-8-1.webp', cat: 'displays', w: 585, h: 435 },
  { src: '/media/work/displays-8-2.webp', cat: 'displays', w: 706, h: 526 },
  { src: '/media/work/events-9-1.webp', cat: 'events', w: 1000, h: 743 },
  { src: '/media/work/events-9-2.webp', cat: 'events', w: 1000, h: 744 },
  { src: '/media/work/events-10-1.webp', cat: 'events', w: 637, h: 850 },
  { src: '/media/work/events-10-2.webp', cat: 'events', w: 637, h: 850 },
  { src: '/media/work/events-10-3.webp', cat: 'events', w: 637, h: 850 },
  { src: '/media/work/events-11-1.webp', cat: 'events', w: 1000, h: 750 },
  { src: '/media/work/events-11-2.webp', cat: 'events', w: 919, h: 689 },
  { src: '/media/work/sampling-12-1.webp', cat: 'sampling', w: 544, h: 725 },
  { src: '/media/work/sampling-12-2.webp', cat: 'sampling', w: 263, h: 578 },
  { src: '/media/work/sampling-12-3.webp', cat: 'sampling', w: 218, h: 578 },
  { src: '/media/work/sampling-12-4.webp', cat: 'sampling', w: 568, h: 798 },
  { src: '/media/work/shelf-13-1.webp', cat: 'shelf', w: 536, h: 769 },
  { src: '/media/work/shelf-13-2.webp', cat: 'shelf', w: 499, h: 769 },
  { src: '/media/work/shelf-13-3.webp', cat: 'shelf', w: 590, h: 764 },
  { src: '/media/work/shelf-13-4.webp', cat: 'shelf', w: 245, h: 525 },
  { src: '/media/work/shelf-14-1.webp', cat: 'shelf', w: 436, h: 399 },
  { src: '/media/work/shelf-14-2.webp', cat: 'shelf', w: 607, h: 781 },
  { src: '/media/work/shelf-14-3.webp', cat: 'shelf', w: 550, h: 709 },
  { src: '/media/work/outdoor-15-1.webp', cat: 'outdoor', w: 568, h: 757 },
  { src: '/media/work/outdoor-15-2.webp', cat: 'outdoor', w: 637, h: 478 },
  { src: '/media/work/outdoor-15-3.webp', cat: 'outdoor', w: 566, h: 755 },
]

export const clients = [
  { name: 'Sunbulah Food Services', src: '/media/clients/client-1.webp' },
  { name: 'Abdul Latif Jameel', src: '/media/clients/client-2.webp' },
  { name: 'Michelin', src: '/media/clients/client-3.webp' },
  { name: 'Gento', src: '/media/clients/client-4.webp' },
  { name: 'Castrol', src: '/media/clients/client-5.webp' },
  { name: 'Abbott', src: '/media/clients/client-6.webp' },
  { name: 'Moulinex', src: '/media/clients/client-7.webp' },
  { name: 'Shell', src: '/media/clients/client-8.webp' },
  { name: 'Noor', src: '/media/clients/client-9.webp' },
  { name: 'Afia', src: '/media/clients/client-10.webp' },
  { name: 'Pampers', src: '/media/clients/client-11.webp' },
  { name: 'Herbal Essences', src: '/media/clients/client-12.webp' },
  { name: 'Britannia', src: '/media/clients/client-13.webp' },
  { name: 'Kiri', src: '/media/clients/client-14.webp' },
  { name: 'Continental', src: '/media/clients/client-15.webp' },
  { name: 'Le Damas', src: '/media/clients/client-16.webp' },
  { name: 'Mayar', src: '/media/clients/client-17.webp' },
  { name: 'Mazola', src: '/media/clients/client-18.webp' },
]

export const techStack: { group: string; tools: string[] }[] = [
  {
    group: 'AI & Automation',
    tools: ['OpenAI', 'Claude', 'Gemini', 'n8n', 'Zapier', 'Make', 'LangChain', 'Hugging Face'],
  },
  {
    group: 'Marketing',
    tools: ['Meta Ads', 'Google Ads', 'TikTok', 'GA4', 'Semrush', 'Search Console', 'HubSpot', 'Mailchimp'],
  },
  {
    group: 'Design & Media',
    tools: ['Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Canva', 'Cinema 4D', 'InDesign'],
  },
  {
    group: 'Software & Web',
    tools: ['React', 'Next.js', 'Node.js', 'Flutter', 'Laravel', 'Shopify', 'WooCommerce', 'AWS'],
  },
  {
    group: 'Game Dev',
    tools: ['Unity', 'Unreal Engine', 'Godot', 'Blender', 'Epic Games', 'Steam', 'GDevelop', 'GitHub'],
  },
]

export const industries = [
  {
    title: 'Food & Beverage',
    body: 'Product stories, appetising visuals and campaigns built around everyday occasions.',
    icon: 'UtensilsCrossed',
  },
  {
    title: 'Retail & E-Commerce',
    body: 'Brand content that connects discovery, product interest and the path to purchase.',
    icon: 'ShoppingBag',
  },
  {
    title: 'Consumer Electronics',
    body: 'Clear product benefits, feature storytelling and launch communication.',
    icon: 'Cpu',
  },
  {
    title: 'Fashion & Lifestyle',
    body: 'Campaign imagery, visual identity and social content with a consistent brand voice.',
    icon: 'Shirt',
  },
  {
    title: 'Hospitality',
    body: 'Place, experience and atmosphere translated into engaging content.',
    icon: 'ConciergeBell',
  },
  {
    title: 'Business & Services',
    body: 'Clear positioning and communication that help customers understand your value.',
    icon: 'Briefcase',
  },
]

export const onboarding = [
  {
    step: '01',
    title: 'Discovery Call',
    body: 'We learn your goals, scope and budget, and figure out what is right for you.',
  },
  {
    step: '02',
    title: 'Proposal & Agreement',
    body: 'A clear scope, honest timeline and fixed pricing. You approve before we start.',
  },
  {
    step: '03',
    title: 'Kickoff & Access',
    body: 'A dedicated manager, a shared workspace and one channel for everything.',
  },
  {
    step: '04',
    title: 'Build in Sprints',
    body: 'Weekly updates and milestones you sign off on, so there are no surprises.',
  },
  {
    step: '05',
    title: 'Launch & Grow',
    body: 'We go live, then measure, report and scale what works. The relationship continues.',
  },
]

export const principles = [
  { n: '01', title: 'Agreed Scope', body: 'Deliverables, channels, responsibilities and timelines are defined before work begins.' },
  { n: '02', title: 'Brand Consistency', body: 'Creative work follows the agreed brand direction, audience and campaign message.' },
  { n: '03', title: 'Visible Progress', body: 'Review points and project updates keep the work moving in the right direction.' },
  { n: '04', title: 'Quality Control', body: 'Content, layouts and final exports are checked before delivery or publication.' },
  { n: '05', title: 'Clear Approvals', body: 'Client feedback and sign-off are built into the workflow at the relevant stages.' },
  { n: '06', title: 'Useful Reporting', body: 'Campaign reviews connect results to the agreed goals and the next actions.' },
]

export type Workflow = { title: string; meta: string; steps: string[]; final: string }

export const workflows: { group: string; blurb: string; lanes: Workflow[] }[] = [
  {
    group: 'Marketing & Creatives',
    blurb: 'A defined workflow for every service. Timelines flex with scope, never with clarity.',
    lanes: [
      { title: 'Digital Marketing', meta: '6 steps · ongoing', steps: ['Audit', 'Strategy', 'Setup', 'Launch', 'Optimize'], final: 'Report' },
      { title: 'SEO & Content', meta: '6 steps · ongoing', steps: ['Audit', 'Keywords', 'Content', 'On Page', 'Link Building'], final: 'Rank' },
      { title: 'Social Media Management', meta: '6 steps · ongoing', steps: ['Audit', 'Plan', 'Create', 'Schedule', 'Engage'], final: 'Report' },
      { title: 'UI/UX & Branding', meta: '5 steps · 2–4 weeks', steps: ['Research', 'Wireframe', 'UI Design', 'Prototype'], final: 'Handoff' },
      { title: 'Video & Animation', meta: '6 steps · 1–4 weeks', steps: ['Script', 'Storyboard', 'Production', 'Edit', 'VFX'], final: 'Deliver' },
    ],
  },
  {
    group: 'Build & Engineering',
    blurb: 'Technical delivery with visible milestones, clean handoffs and launch-ready quality checks.',
    lanes: [
      { title: 'Web Development', meta: '6 steps · 3–6 weeks', steps: ['Brief', 'Wireframe', 'Design', 'Develop', 'QA'], final: 'Launch' },
      { title: 'Mobile App Development', meta: '6 steps · 8–16 weeks', steps: ['Discovery', 'UX Flows', 'UI Design', 'Build', 'Test'], final: 'Store Launch' },
      { title: 'E-Commerce', meta: '6 steps · 4–8 weeks', steps: ['Plan', 'Design', 'Build Store', 'Integrate', 'Test'], final: 'Launch' },
      { title: 'Game Development', meta: '6 steps · 12–24 weeks', steps: ['Concept', 'Prototype', 'Art & Build', 'Playtest', 'Launch'], final: 'LiveOps' },
      { title: 'AI Automation', meta: '6 steps · 2–6 weeks', steps: ['Discover', 'Map Flows', 'Build', 'Integrate', 'Test'], final: 'Deploy' },
    ],
  },
]

export const contacts = [
  {
    name: 'Ammar Fouad',
    role: 'A humble member of the wonderful team',
    phone: '+966 56 820 7850',
    phoneHref: 'tel:+966568207850',
    email: 'ammar@creativehand.biz',
  },
  {
    name: 'Muaz Al Waheedy',
    role: 'Turning ideas into reality',
    phone: '+966 56 902 9316',
    phoneHref: 'tel:+966569029316',
    email: 'mail@btl-masters.com',
  },
]

export const office = {
  lines: [
    '7th floor, Al Murjana Tower',
    'Al Rawdah District, Jeddah',
    'Saudi Arabia',
    'PO Box 11078, Jeddah 22241',
  ],
  tel: '+966 12 601 7687',
  telHref: 'tel:+966126017687',
  email: 'mail@creativehand.biz',
  mapQuery: 'Al Murjana Tower, Al Rawdah, Jeddah, Saudi Arabia',
}

export const cta = {
  heading: 'Let us build your next brand story.',
  body: 'Bring us your brief. We will shape the strategy, creative direction and delivery plan.',
}
