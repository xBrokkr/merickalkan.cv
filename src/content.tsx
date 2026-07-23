import type { ReactNode } from 'react'
import { Layers, MousePointer2, Palette, Code, Box, Layout, PenTool } from 'lucide-react'

// Tüm site metinleri burada — App.tsx sadece bu veriyi render eder.

// --- Experience ---

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  description: ReactNode
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Product Lead',
    company: 'SOCI4L',
    period: 'Feb 2026 - Present',
    description: (
      <>
        Leading product on an on-chain reputation layer for Avalanche: attestations, reputation
        scoring, and public profiles that turn a wallet's real activity into verifiable reputation.
        Product vision, positioning, and UX architecture. Competed in{' '}
        <strong>Avalanche Build Games</strong>.
      </>
    ),
  },
  {
    role: 'Social Media Lead, Team1 Türkiye',
    company: 'Avalanche',
    period: 'Sep 2025 - Present',
    description:
      'Leading social media and content for Team1 Türkiye: content strategy, ecosystem storytelling, and community projects that grow Avalanche’s presence and builder community across Türkiye.',
  },
  {
    role: 'Creative Director',
    company: 'Floyka Design Studio',
    period: 'Apr 2023 - Present',
    description: (
      <>
        Designing digital products, tools, and brand systems for web and on-chain teams. Recent work
        spans the Rlay Hub brand identity and the full IRL experience of ODTÜ Blockchain Days 2026.
        Leads <strong>Floyka Labs</strong>, an experimental design research initiative.
      </>
    ),
  },
  {
    role: 'Corporate Relations',
    company: 'SAÜ Blockchain Student Society',
    period: 'Feb 2026 - Present',
    description:
      'Building partnerships between Sakarya University’s blockchain community and ecosystem teams.',
  },
]

export const earlierExperience: ExperienceEntry[] = [
  {
    role: 'Community Manager',
    company: 'Buildchain',
    period: '2021 - 2024',
    description: 'Engaged developer community and supported Web3 ecosystem growth.',
  },
  {
    role: 'Designer & Community Moderator',
    company: 'KimlikDAO',
    period: 'Dec 2023 - Nov 2024',
    description: 'Created digital assets and moderated community channels.',
  },
  {
    role: 'Content Creator',
    company: 'Web3LibTR',
    period: '2022 - 2023',
    description: 'Produced educational content on blockchain topics.',
  },
  {
    role: 'Content Creator',
    company: 'Technoswap',
    period: '2020 - 2022',
    description: 'Started Web3 content presence and grew early audience.',
  },
]

// --- Products ---

export type Product = { title: string; type: string; link: string; description: string }

export const products: Product[] = [
  {
    title: 'SOCI4L',
    type: 'Product',
    link: 'https://soci4l.net',
    description: 'On-chain reputation layer on Avalanche',
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
  },
  {
    title: 'ColorSense AI',
    type: 'Figma Plugin',
    link: 'https://www.figma.com/community/plugin/1502812839016494184/colorsense-ai',
    description: 'AI color palettes from plain words',
  },
  {
    title: 'StampUI',
    type: 'Product · Upcoming',
    link: 'https://github.com/StampUI',
    description: 'React/Next.js UI block system: components, blocks, and full-page templates in one dark design language',
  },
]

// Floyka üzerinden yayınlanmış müşteri işleri (floyka.space/work'te canlı case study'ler)
export const clientWork: { label: string; href: string }[] = [
  {
    label: 'ODTÜ Blockchain Days 2026',
    href: 'https://floyka.space/work/odtu-blockchain-days-2026',
  },
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

// Kartı olmayan diğer tüm eklentiler (Framer marketplace + Figma)
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
    label: 'LayerLift',
    href: 'https://www.framer.com/community/marketplace/plugins/layerlift/',
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
  {
    label: 'Avalanche Brand Assets (Figma)',
    href: 'https://www.figma.com/community/plugin/1575475392792712992/avalanche-brand-assets',
  },
]

export const marketplaceProfile = {
  label: 'All plugins · @floyka on Framer',
  href: 'https://www.framer.com/@floyka/?tab=marketplace',
  stat: '10 Framer plugins · 2 Figma plugins',
}

// --- Selected work ---

export type WorkEntry = {
  title: string
  year: string
  link: string
  description: ReactNode
  badges: string[]
}

export const selectedWork: WorkEntry[] = [
  {
    title: 'SOCI4L',
    year: 'Present',
    link: 'https://soci4l.net',
    description:
      'An on-chain reputation layer for Avalanche: attestations, reputation scoring, and public profiles that turn real activity into verifiable reputation. Product, UX architecture, and identity system design. Competed in Avalanche Build Games.',
    badges: ['Reputation', 'On-chain UX', 'Product'],
  },
  {
    title: 'Floyka',
    year: 'Present',
    link: 'https://floyka.space',
    description: (
      <>
        A studio for digital tools, plugins, and design-driven systems across web and on-chain
        contexts. Recent work includes the Rlay Hub brand identity and the IRL experience design of
        ODTÜ Blockchain Days 2026. Home of <strong>Floyka Labs</strong>, an experimental initiative
        exploring emerging design systems, interactions, and tooling.
      </>
    ),
    badges: ['Tools', 'Systems', 'Design-Tech', 'Research'],
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
  'Product & System Design',
  'Digital Product Development',
  'Agentic AI Workflows',
  'On-chain Product Thinking',
  'Creative Engineering',
  'Interface & Interaction',
]

export const tools = [
  { name: 'Design Systems', icon: Layers },
  { name: 'Interaction Design', icon: MousePointer2 },
  { name: 'Visual Prototyping', icon: Palette },
  { name: 'Creative Coding', icon: Code },
  { name: 'AI Agents', icon: Box },
  { name: 'Framer', icon: Layout },
  { name: 'Figma', icon: PenTool },
  { name: 'Illustrator', icon: PenTool },
  { name: 'Photoshop', icon: Palette },
  { name: 'Affinity', icon: Palette },
]

export const education = [
  { school: 'Sakarya University', detail: 'Econometrics', period: '2024 - Present' },
  { school: 'High School', detail: '', period: '2019 - 2023' },
]

export const location = 'İzmit, Kocaeli / Türkiye'

// --- Contact ---

export const contact = {
  email: 'merickalkan@icloud.com',
  x: 'https://x.com/0xBrokkr',
  xHandle: '@0xBrokkr',
  linkedin: 'https://linkedin.com/in/brokkr',
  github: 'https://github.com/xBrokkr',
  cvFile: '/merickalkan_cv.pdf',
}
