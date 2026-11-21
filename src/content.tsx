import type { ReactNode } from 'react'
import { Layers, MousePointer2, Palette, Code, Box, Layout, PenTool, Terminal } from 'lucide-react'

// Tüm site metinleri burada — App.tsx sadece bu veriyi render eder.
// Kaynak: meric-media/profile/facts.md (roller, ürünler, ödüller, framing kuralları).

// --- Media (LinkedIn tarzı küçük görseller) ---

export type Media = {
  /** Full-size image (max 1600px long edge) */
  src: string
  /** ~480px thumbnail */
  thumb: string
  caption: string
}

// public/media/<name>.jpg + public/media/<name>-480.jpg
const m = (name: string, caption: string): Media => ({
  src: `/media/${name}.jpg`,
  thumb: `/media/${name}-480.jpg`,
  caption,
})

const media = {
  istanbulCryptoHouse: m('istanbul-crypto-house-2026', "Crypto House Istanbul '26 · Frankhan, Karaköy"),
  kocaeliCoffeeTalk: m('kocaeli-coffee-talk', 'Avalanche Coffee Talk · Kocaeli'),
  agenticHackathon: m('agentic-hackathon-ankara', 'Agentic Hackathon · Ankara'),
  cryptoHouseSeoul: m('crypto-house-seoul', "Crypto House Seoul '26"),
  kiteAiSeoul: m('kite-ai-seoul', 'Kite AI · Proof of AI, Seoul'),
  sauClubFair: m('sau-club-fair', 'SAÜ Club Fair · Blockchain booth'),
  kimlikdaoBooth: m('kimlikdao-odtu-2024-booth', 'ODTÜ Blockchain Days 2024 · KimlikDAO booth'),
  kimlikdao2: m('kimlikdao-odtu-2024-2', 'ODTÜ Blockchain Days 2024'),
  elevenlabsGrant: m('elevenlabs-grant', 'ElevenLabs Startup Grant'),
  unsnitch: m('unsnitch-og', 'unsnitch · Stop X from snitching on your links'),
  multiclaude: m('multiclaude-og', 'multiclaude · One Claude Code chat, a parallel team'),
  framerSotY: m('framer-site-of-the-year-2024', 'Framer Site of the Year 2024'),
}

// --- Hero / about ---

export const hero = {
  roles: [
    {
      role: 'Product Builder',
      tooltip:
        'Building SOCI4L, an on-chain reputation layer on Avalanche, and StampUI, UI blocks you own as source code.',
    },
    {
      role: 'brand & product design',
      tooltip:
        'Founder & Creative Director of Floyka Design Studio, a Framer Partner studio for brand and product systems.',
    },
  ],
  joiner: 'with roots in',
  tagline: ', shipping products end to end, from system architecture to the interface.',
  orgs: ['Avalanche Team1', 'SOCI4L', 'Floyka'],
}

export const about: ReactNode[] = [
  <>
    I build products end to end, from system architecture to the interface. My background is brand
    and product design, and it shapes how I build: systems first, details that make something feel
    right.
  </>,
  <>
    Right now that's <strong>SOCI4L</strong>, an on-chain reputation layer on Avalanche (web app,
    browser extension, developer SDK), and <strong>StampUI</strong>, UI blocks you own as source
    code. Through <strong>Floyka</strong> I've shipped 9 Framer plugins and brand and web systems for
    teams ranging from developer platforms to IRL conferences.
  </>,
  <>
    I work AI-augmented by default. Agents handle the repetitive parts of design and code, so I can
    spend my time on direction, systems and quality. When a workflow is missing, I build it:
    multiclaude and unsnitch both started that way.
  </>,
  <>
    I'm also Community Lead at Avalanche Team1 Türkiye. Together with the team we've run hundreds of
    events across Türkiye, from city meetups and university tours to hackathons and flagship
    community nights, and we keep going. 🔺
  </>,
  <>
    I study Econometrics at Sakarya University, where I also lead SAÜ Blockchain.
  </>,
]

// --- Experience ---

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  description: ReactNode
  /** Earlier role inside the same company (shown as a promotion sub-line) */
  previous?: { role: string; period: string }
  media?: Media[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Community Lead',
    company: 'Avalanche Team1 Türkiye',
    period: 'Nov 2026 - Present',
    previous: { role: 'Social Media Lead', period: 'Sep 2025 - Nov 2026' },
    description: (
      <>
        Part of the team growing the Avalanche ecosystem across Türkiye. Together we've run hundreds
        of events, and we keep going: city meetups, university tours, hackathons and flagship
        community nights. Now leading community, after leading social media and content for the
        team.
      </>
    ),
    media: [
      media.istanbulCryptoHouse,
      media.kocaeliCoffeeTalk,
      media.agenticHackathon,
      media.cryptoHouseSeoul,
      media.kiteAiSeoul,
    ],
  },
  {
    role: 'Product Lead',
    company: 'SOCI4L',
    period: 'Feb 2026 - Present',
    description: (
      <>
        Leading product on an on-chain reputation layer for Avalanche: attestations, scoring, public
        profiles, social graph and showcase modules, shipped as a web app, a browser extension and a
        developer SDK. Competed in <strong>Avalanche Build Games</strong>, received the{' '}
        <strong>ElevenLabs Startup Grant</strong> and was accepted into Anthropic's{' '}
        <strong>Claude Startups</strong> program.
      </>
    ),
    media: [media.elevenlabsGrant],
  },
  {
    role: 'Founder & Creative Director',
    company: 'Floyka Design Studio',
    period: 'Apr 2023 - Present',
    description: (
      <>
        Founded a Framer Partner studio for digital products, tools and brand systems for web and
        on-chain teams. 9 plugins on the Framer Marketplace. Recent work spans the Rlay Hub brand
        identity and, as Design Sponsor, the full IRL design system of ODTÜ Blockchain Days 2026.
      </>
    ),
  },
  {
    role: 'President',
    company: 'SAÜ Blockchain · Sakarya University',
    period: 'Nov 2026 - Present',
    previous: { role: 'Partnerships Lead', period: 'Feb 2026 - Nov 2026' },
    description:
      'Leading Sakarya University’s blockchain community, after building its partnerships with ecosystem teams.',
    media: [media.sauClubFair],
  },
]

export const earlierExperience: ExperienceEntry[] = [
  {
    role: 'Community Manager & Designer',
    company: 'KimlikDAO',
    period: 'Dec 2023 - Nov 2024',
    description:
      'Community and design for KimlikDAO. Ran the KimlikDAO booth at ODTÜ Blockchain Days 2024 as a partner, introducing TCKT.',
    media: [media.kimlikdaoBooth, media.kimlikdao2],
  },
  {
    role: 'Community Manager',
    company: 'BuildChain',
    period: 'Jan 2021 - Sep 2024',
    description: 'Engaged the developer community and supported Web3 ecosystem growth.',
  },
  {
    role: 'Content Creator',
    company: 'Web3Lib',
    period: 'Mar 2022 - Nov 2023',
    description: 'Produced educational content on blockchain topics.',
  },
  {
    role: 'Content Creator',
    company: 'Technoswap',
    period: 'May 2020 - Jul 2022',
    description: 'Started a Web3 content presence and grew an early audience.',
  },
]

// --- Events & community (team work: never "I organized") ---

export const eventsIntro =
  'With the Avalanche Team1 Türkiye team: city meetups, university tours, hackathons and flagship community nights. Hundreds of events so far, and we keep going.'

export type EventEntry = {
  /** Omit when unknown */
  date?: string
  title: string
  place: string
  note: string
  image: Media
}

// Newest first. Dates marked `?` in events.md are left out.
export const events: EventEntry[] = [
  {
    date: '25 Oct 2026',
    title: 'Avalanche Coffee Talk',
    place: 'Kocaeli',
    note: 'Co-hosted with Team1 Türkiye',
    image: media.kocaeliCoffeeTalk,
  },
  {
    date: '22 Oct 2026',
    title: 'SAÜ Club Fair',
    place: 'Sakarya University',
    note: 'SAÜ Blockchain booth with Team1 Türkiye',
    image: media.sauClubFair,
  },
  {
    date: '17 Oct 2026',
    title: 'Agentic Hackathon',
    place: 'Ankara',
    note: 'OKX TR × Team1 Türkiye · 60+ devs, 30 projects, 16 hours',
    image: media.agenticHackathon,
  },
  {
    title: "Crypto House Seoul '26",
    place: 'Seoul · Korea Blockchain Week',
    note: 'With the Team1 Türkiye delegation',
    image: media.cryptoHouseSeoul,
  },
  {
    title: 'Kite AI · Proof of AI',
    place: 'Seoul · Korea Blockchain Week',
    note: 'With the Team1 Türkiye delegation',
    image: media.kiteAiSeoul,
  },
  {
    title: "Crypto House Istanbul '26",
    place: 'Frankhan, Karaköy, Istanbul',
    note: 'With Team1 Türkiye, Avalanche and Bitget · 300+ attendees',
    image: media.istanbulCryptoHouse,
  },
  {
    date: 'Mar 2024',
    title: 'ODTÜ Blockchain Days 2024',
    place: 'METU, Ankara',
    note: 'KimlikDAO booth, introducing TCKT',
    image: media.kimlikdaoBooth,
  },
]

// --- Speaking (rendered only when non-empty) ---

export type Talk = {
  date: string
  event: string
  title: string
  place: string
  photo?: Media
  link?: string
}

export const talks: Talk[] = []

// --- Products ---

export type Product = {
  title: string
  type: string
  link: string
  description: string
  /** Extra links shown as small chips (e.g. Framer + Figma) */
  links?: { label: string; href: string }[]
  media?: Media[]
}

export const products: Product[] = [
  {
    title: 'SOCI4L',
    type: 'Product',
    link: 'https://soci4l.net',
    description: 'On-chain reputation layer on Avalanche. Web app, browser extension and developer SDK',
  },
  {
    title: 'StampUI',
    type: 'Product · Upcoming',
    link: 'https://github.com/StampUI',
    description: 'React/Next.js UI blocks you own as source code, with a CLI and an MCP server for AI coding tools',
  },
  {
    title: 'AsciiMotion',
    type: 'Framer Plugin',
    link: 'https://www.framer.com/marketplace/plugins/asciimotion/',
    description: 'Animated ASCII generator, used by 140+ creators on Framer',
  },
  {
    title: 'Avalanche Brand Assets',
    type: 'Framer & Figma Plugin',
    link: 'https://www.framer.com/marketplace/plugins/avalanche-brand-assets/',
    description: 'Official ecosystem design kit, on Framer and Figma',
    links: [
      { label: 'Framer', href: 'https://www.framer.com/marketplace/plugins/avalanche-brand-assets/' },
      { label: 'Figma', href: 'https://www.figma.com/community/plugin/1575475392792712992/avalanche-brand-assets' },
    ],
  },
  {
    title: 'ColorSense AI',
    type: 'Figma Plugin',
    link: 'https://www.figma.com/community/plugin/1502812839016494184/colorsense-ai',
    description: 'AI color palettes from plain words',
  },
]

export const openSource: Product[] = [
  {
    title: 'unsnitch',
    type: 'Open Source · MIT',
    link: 'https://github.com/xBrokkr/unsnitch',
    description:
      'Strips share-tracking params from X links. Zero deps, no network requests. Chrome · Firefox · iOS · Android. Launched on Product Hunt in Oct 2026, now growing with community PRs',
    media: [media.unsnitch],
  },
  {
    title: 'multiclaude',
    type: 'Open Source · MIT',
    link: 'https://github.com/Team1-Turkiye/multiclaude',
    description:
      'Python CLI + Claude Code skill that splits one task across multiple Claude accounts and models, and resumes on another account at usage limits. Published under Team1 Türkiye',
    media: [media.multiclaude],
  },
]

// Floyka üzerinden yayınlanmış müşteri işleri (floyka.space/work'te canlı case study'ler)
export const clientWork: { label: string; href?: string }[] = [
  {
    label: 'ODTÜ Blockchain Days 2026',
    href: 'https://floyka.space/work/odtu-blockchain-days-2026',
  },
  { label: 'Rlay Hub' },
  {
    label: 'Istanbul Blockchain Week',
    href: 'https://floyka.space/work/istanbul-blockchain-week',
  },
  {
    label: 'Fork',
    href: 'https://floyka.space/work/fork',
  },
  {
    label: 'CipherHouse',
    href: 'https://floyka.space/work/cipherhouse',
  },
  {
    label: 'WebV',
    href: 'https://floyka.space/work/webv',
  },
]

// Kartı olmayan diğer Framer eklentileri (framer.com/@floyka profilinde listelenenler)
export const alsoLinks: { label: string; href: string }[] = [
  {
    label: 'SEO Boost',
    href: 'https://www.framer.com/community/marketplace/plugins/seo-boost/',
  },
  {
    label: 'Style Transfer',
    href: 'https://www.framer.com/community/marketplace/plugins/style-transfer/',
  },
  {
    label: 'Pattern Duplication Finder',
    href: 'https://www.framer.com/community/marketplace/plugins/pattern-duplication-finder/',
  },
  {
    label: 'ChangeEverything',
    href: 'https://www.framer.com/community/marketplace/plugins/changeeverything/',
  },
  {
    label: 'Component Usage Analyzer',
    href: 'https://www.framer.com/community/marketplace/plugins/component-usage-analyzer/',
  },
  {
    label: 'Complexity Inspector',
    href: 'https://www.framer.com/community/marketplace/plugins/complexity-inspector/',
  },
  {
    label: 'CanvasNotes',
    href: 'https://www.framer.com/community/marketplace/plugins/canvasnotes/',
  },
]

export const marketplaceProfile = {
  label: 'All plugins · @floyka on Framer',
  href: 'https://www.framer.com/@floyka/?tab=marketplace',
  stat: '9 Framer plugins · 2 Figma plugins',
}

// --- Selected work ---

export type WorkEntry = {
  title: string
  year: string
  link: string
  description: ReactNode
  badges: string[]
  media?: Media[]
}

export const selectedWork: WorkEntry[] = [
  {
    title: 'SOCI4L',
    year: 'Present',
    link: 'https://soci4l.net',
    description: (
      <>
        An on-chain reputation layer for Avalanche: attestations, scoring, public profiles and a
        social graph that turn real activity into verifiable reputation. Shipped as a web app, a
        browser extension and a developer SDK. Competed in Avalanche Build Games, received the{' '}
        <strong>ElevenLabs Startup Grant</strong> and was accepted into{' '}
        <strong>Claude Startups</strong> by Anthropic.
      </>
    ),
    badges: ['Reputation', 'On-chain UX', 'Product', 'SDK'],
  },
  {
    title: 'Floyka',
    year: 'Since 2023',
    link: 'https://floyka.space',
    description: (
      <>
        The studio I founded: digital tools, plugins and brand systems across web and on-chain
        contexts. A Framer Partner studio with 9 plugins on the Framer Marketplace. Recent work
        includes the Rlay Hub brand identity and the IRL design system of ODTÜ Blockchain Days 2026.
      </>
    ),
    badges: ['Founder', 'Brand Systems', 'Tools', 'Design-Tech'],
  },
]

// --- Awards ---

export type Award = {
  year: string
  title: string
  organization: string
  description: string
  link?: string
  media?: Media
}

export const awards: Award[] = [
  {
    year: '2026',
    title: 'ElevenLabs Startup Grant',
    organization: 'ElevenLabs · SOCI4L',
    description: 'SOCI4L received the ElevenLabs Startup Grant.',
    link: 'https://x.com/0xBrokkr/status/2120422120941334837',
    media: media.elevenlabsGrant,
  },
  {
    year: '2026',
    title: 'Claude Startups',
    organization: 'Anthropic · SOCI4L',
    description: "SOCI4L was accepted into Anthropic's Claude Startups program.",
    link: 'https://claude.com/programs/startups',
  },
  {
    year: '2024',
    title: 'Site of the Year',
    organization: 'Framer',
    description: 'Framer Site of the Year at the Framer Awards 2024, for excellence in web design and interactivity.',
    link: 'https://x.com/0xBrokkr/status/1859966897896440000',
    media: media.framerSotY,
  },
]

// --- Writing & research ---

export const writing: { date: string; title: string; kind: string; href: string; description: string }[] = [
  {
    date: 'Oct 2026',
    title: 'Avalanche (blockchain platform)',
    kind: 'Wikipedia',
    href: 'https://en.wikipedia.org/wiki/Avalanche_(blockchain_platform)',
    description:
      'Expanded the English article: X/P/C-Chains, consensus vs BFT and Nakamoto, the Helicon upgrade and staking.',
  },
  {
    date: 'Sep 2026',
    title: 'One Equation, Not Two Questions',
    kind: 'Research · Blog',
    href: '/blog/avalanche-research-convergence/',
    description:
      "Reclustering the Avalanche Foundation's Call for Research proposals around a single equation.",
  },
]

// --- Testimonials ---

export type Testimonial = { quote: string; author: string; role: string }

export const testimonials: Testimonial[] = [
  {
    quote:
      'Beyond his technical and product skills, Meric is simply someone you can trust to take responsibility and deliver meaningful work.',
    author: 'Hürsel Çay',
    role: 'Türkiye Country Lead, Avalanche Team1',
  },
  {
    quote:
      "After starting to work with Meriç, one thing became very clear to me: despite his young age, his vision, discipline, and productivity are ahead of many others. He doesn't approach projects only from a design or technical perspective; he first tries to truly understand the brand and its needs. This directly reflects on the quality of the final outcome. He's easy to communicate with, quick at finding solutions, and very clear when it comes to taking responsibility. In most of the projects we've done together, the results went beyond our expectations. I genuinely believe the energy and leadership behind Floyka bring real value to the brands they work with.",
    author: 'Melih Can Maviş',
    role: 'CEO @ Fork.com.tr',
  },
]

// --- Skills, tools, education ---

export const partnerBadges = ['Framer Partner', 'Avalanche Team1']

export const skills = [
  'Product & System Architecture',
  'End-to-end Product Development',
  'Brand & Product Design',
  'Agentic AI Workflows',
  'On-chain Product Thinking',
  'Community Building',
  'Interface & Interaction',
]

export const tools = [
  { name: 'Design Systems', icon: Layers },
  { name: 'Interaction Design', icon: MousePointer2 },
  { name: 'Visual Prototyping', icon: Palette },
  { name: 'Creative Coding', icon: Code },
  { name: 'React & Next.js', icon: Code },
  { name: 'Claude Code', icon: Terminal },
  { name: 'AI Agents', icon: Box },
  { name: 'Framer', icon: Layout },
  { name: 'Figma', icon: PenTool },
  { name: 'Illustrator', icon: PenTool },
  { name: 'Photoshop', icon: Palette },
  { name: 'Affinity', icon: Palette },
]

export const education = [
  { school: 'Sakarya University', detail: 'Econometrics', period: '2024 - Present' },
]

export const location = 'Kocaeli, Türkiye'

// --- Contact ---

export const contact = {
  email: 'merickalkan@icloud.com',
  x: 'https://x.com/0xBrokkr',
  xHandle: '@0xBrokkr',
  linkedin: 'https://linkedin.com/in/brokkr',
  github: 'https://github.com/xBrokkr',
  cvFile: '/merickalkan_cv.pdf',
}
