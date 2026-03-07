import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, MousePointer2, Mic, Layout, PenTool, Code, Layers, Box, MapPin, Palette, Moon, Sun, Download } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Matter from 'matter-js'
import React from 'react'

type BodyExt = Matter.Body & { label?: string; customType?: string; textColor?: string; tooltip?: string }

// --- Icons ---
const XLogo = ({ size = 16, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// --- Components ---

const Tooltip = ({ content, children }: { content: string, children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-black/90 dark:bg-neutral-800 backdrop-blur text-white px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-lg whitespace-nowrap z-50 pointer-events-none shadow-xl border border-transparent dark:border-white/10"
          >
            {content}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-black/90 dark:border-t-neutral-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SocialLink = ({ href, icon: Icon, label, tooltip, className = "text-neutral-500 dark:text-neutral-400" }: { href: string, icon: any, label?: string, tooltip: string, className?: string }) => (
  <Tooltip content={tooltip}>
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.8)" }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60 hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group backdrop-blur-sm ${className}`}
    >
      <Icon size={16} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300" />
      {label && <span className="text-[12px] font-bold uppercase tracking-wider">{label}</span>}
      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  </Tooltip>
)

const WorkItem = ({ title, role, year, link, description, badges }: { title: string, role?: string, year: string, link: string, description: string | React.ReactNode, badges?: string[] }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial="initial"
    whileHover="hover"
    whileTap={{ scale: 0.995 }}
    className="group block py-8 border-b border-neutral-100 dark:border-neutral-800 last:border-0 relative overflow-hidden"
  >
    <motion.div
      variants={{ hover: { opacity: 1 } }}
      initial={{ opacity: 0 }}
      className="absolute inset-0 bg-neutral-50/50 dark:bg-white/5 -z-10 transition-opacity duration-300"
    />
    <div className="flex items-baseline justify-between mb-3 px-4 group-hover:px-6 transition-all duration-300">
      <div className="flex items-center gap-3">
        <h3 className="text-[18px] font-bold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300">{title}</h3>
        <motion.span
          variants={{ initial: { opacity: 0, x: -10 }, hover: { opacity: 1, x: 0 } }}
          className="text-neutral-500"
        >
          <ArrowUpRight size={14} strokeWidth={3} />
        </motion.span>
      </div>
      <span className="text-[11px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{year}</span>
    </div>
    <div className="flex flex-col gap-2 px-4 group-hover:px-6 transition-all duration-300">
      {role && (
        <div className='flex items-center gap-4 text-[13px] text-neutral-500 font-medium'>
          <span>{role}</span>
        </div>
      )}
      <span className="text-[13px] text-neutral-400 leading-relaxed max-w-[90%]">{description}</span>
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {badges.map(b => (
            <span key={b} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded">{b}</span>
          ))}
        </div>
      )}
    </div>
  </motion.a>
)

const ProductItemMinimal = ({ title, type, link, description }: { title: string, type: string, link: string, description?: string }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-start justify-between gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-black dark:hover:border-neutral-600 transition-all duration-300 group cursor-pointer"
  >
    <div className="min-w-0">
      <h3 className="text-[14px] font-bold text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">{title}</h3>
      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{type}</span>
      {description && <p className="mt-1.5 text-[12px] text-neutral-500 leading-snug">{description}</p>}
    </div>
    <div className="w-8 h-8 shrink-0 rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight size={14} />
    </div>
  </motion.a>
)

const AwardItem = ({ year, title, organization, description, link }: { year: string, title: string, organization: string, description: string, link?: string }) => {
  const Container = link ? motion.a : 'div' as any
  const props = link ? { href: link, target: "_blank", rel: "noopener noreferrer", whileHover: { x: 5 } } : {}

  return (
    <Container {...props} className={`flex gap-6 py-6 border-b border-neutral-100 dark:border-neutral-800 last:border-0 group ${link ? 'cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-white/5 -mx-4 px-4 transition-colors rounded-xl' : ''}`}>
      <div className="w-16 pt-1">
        <span className="text-[12px] font-mono font-bold text-neutral-300 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">{year}</span>
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <h4 className="text-[15px] font-bold text-black dark:text-white mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">{title}</h4>
          {link && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />}
        </div>
        <div className="text-[12px] font-bold uppercase tracking-wider text-neutral-500 mb-2">{organization}</div>
        <p className="text-[13px] text-neutral-400 leading-relaxed max-w-md">{description}</p>
      </div>
    </Container>
  )
}

const ExperienceItem = ({ role, company, period, description, muted }: { role: string, company: string, period: string, description: string | React.ReactNode, muted?: boolean }) => {
  const isPresent = !muted && (period.toLowerCase().includes('present') || period.toLowerCase().includes('devam'))
  return (
    <div className={`py-6 pl-6 ml-2 relative group ${muted ? 'border-l border-neutral-200 dark:border-neutral-700' : 'border-l-2 border-neutral-100 dark:border-neutral-800'}`}>
      <div className={`absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black transition-all duration-300 z-10 ${muted ? 'bg-neutral-300 dark:bg-neutral-600' : isPresent ? 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' : 'bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400'}`} />
      <div className="flex justify-between items-baseline mb-1">
        <h4 className={`text-[15px] font-bold transition-colors ${muted ? 'text-neutral-600 dark:text-neutral-400' : 'text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300'}`}>{role}</h4>
        <span className="text-[11px] font-mono text-neutral-400">{period}</span>
      </div>
      <div className={`text-[13px] font-bold mb-2 uppercase tracking-wide ${muted ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-400'}`}>{company}</div>
      <p className={`text-[13px] leading-relaxed ${muted ? 'text-neutral-500 dark:text-neutral-500' : 'text-neutral-500'}`}>{description}</p>
    </div>
  )
}

const MediaItem = ({ title, platform, type, link, icon: Icon }: { title: string, platform: string, type: string, link: string, icon: any }) => (
  <motion.a
    href={link}
    target="_blank"
    whileHover={{ x: 10 }}
    className="flex items-center gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0 group cursor-pointer"
  >
    <div className="w-12 h-12 rounded-full bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
      <Icon size={20} />
    </div>
    <div className="flex-grow">
      <h4 className="text-[14px] font-bold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">{title}</h4>
      <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-400">
        <span className="uppercase tracking-wider">{platform}</span>
        <span className="w-1 h-1 rounded-full bg-neutral-300" />
        <span>{type}</span>
      </div>
    </div>
    <ArrowUpRight size={14} className="text-neutral-300 group-hover:text-black transition-colors opacity-0 group-hover:opacity-100" />
  </motion.a>
)

const TestimonialItem = ({ quote, author, role }: { quote: string | React.ReactNode, author: string, role: string | React.ReactNode }) => (
  <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 relative h-full flex flex-col justify-between hover:shadow-lg hover:shadow-neutral-100 dark:hover:shadow-none transition-all duration-300">
    <div>
      <span className="text-6xl font-serif text-neutral-200 dark:text-neutral-800 block mb-[-20px] leading-none select-none">"</span>
      <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-medium mb-6 relative z-10 italic">
        {quote}
      </p>
    </div>
    <div>
      <div className="text-[12px] font-bold text-black dark:text-white uppercase tracking-wider">{author}</div>
      <div className="text-[10px] text-neutral-400 font-semibold">{role}</div>
    </div>
  </div>
)

const UseItem = ({ name, category, icon: Icon }: { name: string, category?: string, icon: any }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors group">
    <div className="text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
      <Icon size={16} />
    </div>
    <div>
      <div className="text-[12px] font-bold text-black dark:text-white">{name}</div>
      {category ? <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{category}</div> : null}
    </div>
  </div>
)

const RoleTooltip = ({ role, content }: { role: string, content: string, icon?: unknown }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative inline-block cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-20 text-black dark:text-white border-b border-neutral-300 dark:border-white/30 group-hover:border-black dark:group-hover:border-white transition-colors duration-300 pb-0.5">{role}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black text-white dark:bg-white dark:text-black px-5 py-4 rounded-xl shadow-xl w-64 z-50 pointer-events-none origin-bottom text-center border border-transparent dark:border-white/10"
          >
            <div className="text-[13px] font-medium leading-relaxed text-white/90 dark:text-black/90 tracking-wide">
              {content}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black dark:border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// --- Dynamic Island Navbar ---

const DynamicIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className="print:hidden fixed top-6 left-0 right-0 z-50 flex justify-center font-outfit tracking-normal">
      <motion.div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        animate={{
          width: isExpanded ? 380 : 120,
          height: isExpanded ? 64 : 36,
          backgroundColor: "rgba(0,0,0,0.90)",
          backdropFilter: "blur(20px)",
        }}
        className="bg-black rounded-full flex items-center justify-between px-2 overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
      >
        {/* Collapsed State Content */}
        <motion.div
          animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.9 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-between px-3 w-full pointer-events-none"
          style={{ opacity: isExpanded ? 0 : 1 }}
        >
          <div className="w-5 h-5 rounded-full overflow-hidden bg-white border border-white/20 flex items-center justify-center">
            <img src="/logo.png" alt="MK" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-1.5 items-center">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
        </motion.div>

        {/* Expanded State Content */}
        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : 10,
            transition: {
              delay: isExpanded ? 0.2 : 0,
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          className="w-full h-full flex justify-between items-center px-4 pointer-events-none"
          style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-lg bg-white shrink-0">
              <img src="/logo.png" alt="MK" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden">
              <span className="text-[13px] font-semibold text-white leading-tight">Meriç Kalkan</span>
              <span className="text-[11px] text-white/50 font-medium">Creative Director</span>
            </div>
          </div>

          <div className="flex gap-5 text-[13px] font-medium text-white/70 whitespace-nowrap shrink-0">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#experience" className="hover:text-white transition-colors">Exp.</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
        </motion.div>
      </motion.div>
    </nav>
  )
}

// --- Physics Playground ---

const PhysicsPlayground = ({ isDark }: { isDark: boolean }) => {
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const engineRef = useRef<Matter.Engine | null>(null)

  useEffect(() => {
    if (!sceneRef.current) return

    // Physics Engine Setup
    const Engine = Matter.Engine,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Composite = Matter.Composite,
      Query = Matter.Query

    const engine = Engine.create()
    engineRef.current = engine

    // Canvas Dimensions
    const width = sceneRef.current.clientWidth
    const height = 400

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    sceneRef.current.innerHTML = ''
    sceneRef.current.appendChild(canvas)

    const tooltipEl = document.createElement('div')
    tooltipEl.className = 'absolute z-20 pointer-events-none px-2 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 bg-white/95 dark:bg-neutral-800/95 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-lg opacity-0 transition-opacity duration-150 max-w-[180px]'
    sceneRef.current.appendChild(tooltipEl)

    const ctx = canvas.getContext('2d')
    if (!ctx) return;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 60, width, 120, { isStatic: true, render: { visible: false } })
    const ceiling = Bodies.rectangle(width / 2, -60, width, 120, { isStatic: true, render: { visible: false } })
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, render: { visible: false } })
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, render: { visible: false } })

    // Theme Colors
    const textColorStart = isDark ? '#fff' : '#000'
    const bubbleBg = isDark ? '#000' : '#fff'
    const bubbleText = isDark ? '#fff' : '#000'
    const strokeColor = isDark ? '#333' : '#e5e5e5'

    // Objects Generator (optional tooltip for hover)
    const createTextBody = (x: number, y: number, text: string, type = 'text', color = textColorStart, bgColor = 'transparent', tooltip = '') => {
      const isEmoji = type === 'emoji'

      let w, h, radius

      if (isEmoji) {
        w = 60
        h = 60
        radius = 30
      } else {
        w = Math.max(90, (text.length * 15) + 50)
        h = 50
        radius = 25
      }

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: radius },
        restitution: 0.8,
        friction: 0.005,
        density: 0.04,
        render: {
          fillStyle: bgColor,
          strokeStyle: bgColor === 'transparent' && !isEmoji ? strokeColor : 'transparent',
          lineWidth: 1
        }
      })

      const b = body as BodyExt
      b.label = text
      b.customType = type
      b.textColor = color
      b.tooltip = tooltip
      return body
    }

    const createShape = (x: number, y: number, type: string, color: string) => {
      if (type === 'circle') {
        return Bodies.circle(x, y, 20 + Math.random() * 20, {
          render: { fillStyle: color, strokeStyle: 'transparent' },
          restitution: 0.9,
          friction: 0.005,
          density: 0.04
        })
      } else {
        const size = 30 + Math.random() * 30
        return Bodies.rectangle(x, y, size, size, {
          chamfer: { radius: 8 },
          render: { fillStyle: color, strokeStyle: 'transparent' },
          restitution: 0.9,
          friction: 0.005,
          density: 0.04
        })
      }
    }
    const createLogoBody = (x: number, y: number) => {
      // Reduced radius from 40 to 36 (10% smaller)
      const body = Bodies.circle(x, y, 36, {
        render: {
          fillStyle: isDark ? '#fff' : '#000',
          strokeStyle: 'transparent',
        },
        restitution: 0.8,
        friction: 0.005,
        density: 0.04
      })
      const b = body as BodyExt
      b.label = "MK."
      b.customType = "logo"
      b.textColor = isDark ? '#000' : '#fff'
      return body
    }

    const objects = [
      createLogoBody(width / 2, 80),
      // Experiment themes
      createTextBody(width / 3, 50, 'Identity', 'text', bubbleText, bubbleBg),
      createTextBody(width / 1.5, 50, 'Profiles', 'text', bubbleText, bubbleBg),
      createTextBody(width / 5, 150, 'On-chain', 'text', bubbleBg, bubbleText),
      createTextBody(width / 1.2, 150, 'Systems', 'text', bubbleText, bubbleBg),
      createTextBody(width / 2.5, 200, 'Tools', 'text', bubbleText, bubbleBg),
      createTextBody(width / 1.8, 200, 'Interaction', 'text', bubbleBg, bubbleText),
      createTextBody(width / 4, 100, 'Protocol', 'text', bubbleText, bubbleBg),
      createTextBody(width / 1.3, 120, 'UI', 'text', bubbleBg, bubbleText),
      createTextBody(width / 1.6, 80, 'Data', 'text', bubbleText, bubbleBg),
      createTextBody(width / 3, 220, 'Motion', 'text', bubbleBg, bubbleText),
      // Product names (with hover tooltips)
      createTextBody(width / 2, 80, 'SOCI4L', 'text', bubbleText, bubbleBg, 'Wallet identity system'),
      createTextBody(width / 1.1, 200, 'ColorSense', 'text', bubbleText, bubbleBg, 'AI color tool'),
      createTextBody(width / 2.2, 300, 'ImageTools', 'text', bubbleBg, bubbleText, 'Framer image pipeline'),
      createTextBody(width / 3.5, 90, 'Floyka', 'text', bubbleText, bubbleBg, 'Digital product studio'),
      createTextBody(width / 1.4, 280, 'Labs', 'text', bubbleBg, bubbleText, 'Experimental design research'),
      // Emojis
      createTextBody(width / 6, 180, '🎨', 'emoji'),
      createTextBody(width / 1.15, 70, '⚡', 'emoji'),
      createTextBody(width / 2.8, 250, '🚀', 'emoji'),
      // Shapes
      createShape(width / 6, 250, 'circle', '#34d399'),
      createShape(width / 1.1, 50, 'rect', '#f472b6'),
      createShape(width / 2.2, 340, 'circle', '#a78bfa'),
      createShape(width / 3.5, 140, 'rect', '#fbbf24'),
      createShape(width / 1.4, 320, 'rect', '#60a5fa'),
      createShape(width / 5, 40, 'circle', '#ef4444'),
      createShape(width / 1.05, 250, 'rect', '#22c55e'),
    ]

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, ...objects])

    // Mouse Control
    const mouse = Mouse.create(canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })
    Composite.add(engine.world, mouseConstraint)

    const handleMouseLeave = () => {
      mouseConstraint.mouse.button = -1
      tooltipEl.style.opacity = '0'
    }
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY
      const bodiesAtPoint = Query.point(Composite.allBodies(engine.world), { x, y })
      const withTooltip = bodiesAtPoint.find((b): b is BodyExt => !!(b as BodyExt).tooltip)
      const container = sceneRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      if (withTooltip) {
        tooltipEl.textContent = (withTooltip as BodyExt).tooltip ?? null
        tooltipEl.style.left = (e.clientX - containerRect.left + 14) + 'px'
        tooltipEl.style.top = (e.clientY - containerRect.top + 14) + 'px'
        tooltipEl.style.opacity = '1'
      } else {
        tooltipEl.style.opacity = '0'
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Scroll fixing for mouse
    const m = mouse as Matter.Mouse & { mousewheel?: (e: Event) => void }
    if (m.mousewheel) {
      mouse.element.removeEventListener("mousewheel", m.mousewheel)
      mouse.element.removeEventListener("DOMMouseScroll", m.mousewheel)
    }

    // Custom Render Loop
    let animationFrameId: number | undefined
    const renderLoop = () => {
      Engine.update(engine, 1000 / 60)

      ctx.clearRect(0, 0, width, height)

      // Draw Bodies
      Composite.allBodies(engine.world).forEach(body => {
        if (body.render.visible === false) return
        const ext = body as BodyExt
        const fillStyle = body.render.fillStyle ?? 'transparent'
        const strokeStyle = body.render.strokeStyle ?? 'transparent'
        const lineWidth = body.render.lineWidth ?? 0

        ctx.beginPath()
        const vertices = body.vertices
        ctx.moveTo(vertices[0].x, vertices[0].y)
        for (let j = 1; j < vertices.length; j += 1) {
          ctx.lineTo(vertices[j].x, vertices[j].y)
        }
        ctx.lineTo(vertices[0].x, vertices[0].y)
        ctx.closePath()

        ctx.fillStyle = fillStyle
        ctx.strokeStyle = lineWidth ? strokeStyle : 'transparent'
        ctx.lineWidth = lineWidth
        if (fillStyle !== 'transparent') ctx.fill()
        if (lineWidth > 0) ctx.stroke()

        // Text Rendering
        if (ext.customType) {
          ctx.save()
          ctx.translate(body.position.x, body.position.y)
          ctx.rotate(body.angle)
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          if (ext.customType === 'emoji') {
            ctx.font = '32px serif'
            ctx.fillText(ext.label ?? '', 0, 4)
          } else if (ext.customType === 'text') {
            ctx.fillStyle = ext.textColor ?? '#000'
            ctx.font = 'bold 12px sans-serif'
            ctx.fillText((ext.label ?? '').toUpperCase(), 0, 1)
          } else if (ext.customType === 'logo') {
            ctx.fillStyle = ext.textColor ?? '#000'
            ctx.font = 'bold 24px sans-serif'
            ctx.fillText(ext.label ?? '', 0, 4)
          }
          ctx.restore()
        }
      })

      animationFrameId = requestAnimationFrame(renderLoop)
    }

    renderLoop()

    return () => {
      if (animationFrameId != null) cancelAnimationFrame(animationFrameId)
      Engine.clear(engine)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDark]) // Re-run on theme change

  return (
    <div
      ref={sceneRef}
      className="w-full h-[400px] bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl overflow-hidden relative border border-neutral-100 dark:border-neutral-800 shadow-inner cursor-grab active:cursor-grabbing transition-colors duration-300"
    >
      <div className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400 flex items-center gap-2 pointer-events-none z-10 select-none">
        <MousePointer2 size={12} />
        Play & Throw
      </div>
    </div>
  )
}


const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="text-[11px] font-black text-neutral-300 dark:text-neutral-700 uppercase tracking-[0.3em] mb-10 flex items-center gap-3"
  >
    <span className="w-6 h-[1px] bg-neutral-200 dark:bg-neutral-800" />
    {children}
  </motion.h2>
)

// --- Theme Toggle ---
const ThemeToggle = ({ isDark, toggle }: { isDark: boolean, toggle: () => void }) => (
  <button
    onClick={toggle}
    className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
    aria-label="Toggle Dark Mode"
  >
    {isDark ? <Sun size={14} className="text-white bg-transparent" /> : <Moon size={14} className="text-neutral-500 bg-transparent" />}
  </button>
)

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  // Background gradient movement
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 1000], [0, 300])

  return (
    <div className={`min-h-screen font-outfit selection:bg-neutral-900 selection:text-white relative transition-colors duration-300 ${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,rgba(255,255,255,0)_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_50%)]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply dark:mix-blend-overlay" />
      </div>

      {/* Top Navigation */}
      <DynamicIsland />

      <main className="max-w-[800px] mx-auto px-6 pt-48 pb-20 relative z-10">

        {/* Header / Intro */}
        <section className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Available for projects</span>
            </div>

            <h1 className="text-[36px] md:text-[40px] font-medium leading-[1.2] tracking-tight mb-10 text-neutral-900 dark:text-neutral-100 max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Meriç Kalkan is a
              </motion.span>{' '}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <RoleTooltip
                  role="Creative Director"
                  content="Correcting brand vision, visual identity, and strategic design operations at Floyka.space."
                  icon={Palette}
                />
              </motion.div>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                &
              </motion.span>{' '}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RoleTooltip
                  role="Frontend Architect"
                  content="Building scalable component libraries, design systems, and high-performance interactive interfaces."
                  icon={Code}
                />
              </motion.div>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                who designs brands and experiences, then builds them into working products.
              </motion.span>
            </h1>

            <div className="flex flex-wrap gap-6 mb-12 items-center text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              <div className="flex items-center gap-2 text-black/80 dark:text-neutral-200">
                <span className="w-1.5 h-1.5 rounded-full bg-black/80 dark:bg-white" />
                Floyka Studio
              </div>
              <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Avalanche Team1
              </div>
              <div className="flex items-center gap-2 hover:text-black transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                SOCI4L
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <SocialLink href="https://x.com/0xBrokkr" icon={XLogo} label="X" tooltip="@0xBrokkr" />
              <SocialLink href="https://linkedin.com/in/brokkr" icon={Linkedin} label="LinkedIn" tooltip="Connect" />
              <SocialLink href="https://github.com/xBrokkr" icon={Github} label="GitHub" tooltip="Code" />
              <SocialLink href="mailto:merickalkan@icloud.com" icon={Mail} label="Email" tooltip="Contact Me" />
            </div>

            <div className="mt-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Support my work</div>
              <iframe src="https://soci4l.net/embed/donate/0xbrokkr" width="350" height="80" frameBorder="0" style={{ border: 'none', overflow: 'hidden' }} scrolling="no"></iframe>
            </div>
          </motion.div>
        </section>

        {/* Bio & Skills */}
        <section id="about" className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionTitle>About Me</SectionTitle>
            <p className="text-[14px] leading-relaxed text-neutral-500 font-medium mb-6">
              For me, creating always started with computers and tools.
              I progressed by building systems and experiences, driven by a curiosity that spanned from games to software, and from visuals to products.
            </p>
            <p className="text-[14px] leading-relaxed text-neutral-500 font-medium mb-6">
              Now I work on transforming new ideas into tangible and usable structures.
              The fields may change, but my approach remains the same: think, build, run, share.
            </p>
          </div>
          <div>
            <SectionTitle>Skills & Stack</SectionTitle>
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="px-2.5 py-1 bg-neutral-200/80 dark:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300 rounded-md text-[10px] font-semibold uppercase tracking-wider">Framer Partner</span>
              <span className="px-2.5 py-1 bg-neutral-200/80 dark:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300 rounded-md text-[10px] font-semibold uppercase tracking-wider">Avalanche Builder</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Product & System Design', 'Digital Product Development', 'On-chain Product Thinking', 'Creative Engineering', 'Interface & Interaction'].map(s => (
                <span key={s} className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-lg text-[11px] font-bold uppercase tracking-wider">{s}</span>
              ))}
            </div>

            <SectionTitle>Education</SectionTitle>
            <ul className="space-y-4">
              <li className="flex justify-between items-baseline border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <span className="font-bold text-[13px] text-black dark:text-white">Sakarya University</span>
                <span className="text-[11px] text-neutral-400 text-right">Econometrics<br />2024 — Present</span>
              </li>
              <li className="flex justify-between items-baseline border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <span className="font-bold text-[13px] text-black dark:text-white">High School</span>
                <span className="text-[11px] text-neutral-400">2019 — 2023</span>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-neutral-950 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                <MapPin size={12} /> Location
              </div>
              <div className="font-medium text-[14px]">Kocaeli, Izmit / Turkey</div>
            </div>
          </div>
        </section>

        {/* Tools I Create With — design-driven, no dev-stack labels */}
        <section id="stack" className="mb-40">
          <SectionTitle>Tools I Create With</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UseItem name="Design Systems" icon={Layers} />
            <UseItem name="Project Branding" icon={Layers} />
            <UseItem name="Interaction Design" icon={MousePointer2} />
            <UseItem name="Visual Prototyping" icon={Palette} />
            <UseItem name="Creative Coding" icon={Code} />
            <UseItem name="Vibecoding" icon={Box} />
            <UseItem name="Framer" icon={Layout} />
            <UseItem name="Figma" icon={PenTool} />
            <UseItem name="Illustrator" icon={PenTool} />
            <UseItem name="Photoshop" icon={Palette} />
            <UseItem name="Affinity" icon={Palette} />
          </div>
        </section>

        {/* Experience — Primary / Earlier hiyerarşik */}
        <section id="experience" className="mb-40">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-2">
            <ExperienceItem
              role="Product Lead"
              company="SOCI4L"
              period="Feb 2026 — Present"
              description="Building a wallet-native identity and profile system. Product architecture, UX, and on-chain integration."
            />
            <ExperienceItem
              role="Creative Director"
              company="Floyka Design Studio"
              period="Apr 2023 — Present"
              description={<>Designing and developing digital products, tools, and brand systems across web and on-chain contexts. Leads <strong>Floyka Labs</strong>, an experimental design research initiative testing and sharing new interaction and visual concepts.</>}
            />
            <ExperienceItem
              role="Team1 Member"
              company="Avalanche"
              period="Sep 2025 — Present"
              description="Supporting builder adoption and product initiatives in Türkiye."
            />

            {/* Earlier — always visible, same in light/dark (no collapse) */}
            <div className="pt-8 mt-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1 pl-6 ml-2">Earlier — Community & Media</div>
              <div className="space-y-2">
                <ExperienceItem
                  muted
                  role="Community Manager"
                  company="Buildchain"
                  period="2021 — 2024"
                  description="Engaged developer community and supported Web3 ecosystem growth."
                />
                <ExperienceItem
                  muted
                  role="Designer & Community Moderator"
                  company="KimlikDAO"
                  period="Dec 2023 — Nov 2024"
                  description="Created digital assets and moderated community channels."
                />
                <ExperienceItem
                  muted
                  role="Content Creator"
                  company="Web3LibTR"
                  period="2022 — 2023"
                  description="Produced educational content on blockchain topics."
                />
                <ExperienceItem
                  muted
                  role="Content Creator"
                  company="Technoswap"
                  period="2020 — 2022"
                  description="Publishing technology news and grew its initial audience."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products — ana ürün → core tools → kits */}
        <section id="products" className="mb-40">
          <SectionTitle>Products</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductItemMinimal
              title="SOCI4L"
              type="Product"
              link="https://soci4l.net"
              description="Wallet-native identity & profile system"
            />
            <ProductItemMinimal
              title="AsciiMotion"
              type="Tool"
              link="https://www.framer.com/marketplace/plugins/asciimotion/"
              description="ASCII & motion generator for Framer"
            />
            <ProductItemMinimal
              title="Avalanche Brand Assets"
              type="Plugin"
              link="https://www.framer.com/marketplace/plugins/avalanche-brand-assets/"
              description="Official ecosystem design kit (Framer)"
            />
            <ProductItemMinimal
              title="Avalanche Brand Assets"
              type="Plugin"
              link="https://www.figma.com/community/plugin/1575475392792712992/avalanche-brand-assets"
              description="Official ecosystem design kit (Figma)"
            />
            <ProductItemMinimal
              title="ColorSense AI"
              type="Plugin"
              link="https://www.figma.com/community/plugin/1502812839016494184/colorsense-ai"
              description="AI-assisted color system plugin"
            />
            <ProductItemMinimal
              title="ImageTools"
              type="Tool"
              link="https://www.framer.com/marketplace"
              description="Framer-native image pipeline tool"
            />
          </div>
        </section>

        {/* Selected Products — ürün odaklı showcase */}
        <section id="work" className="mb-40">
          <SectionTitle>Selected Products</SectionTitle>
          <div className="space-y-4">
            <WorkItem
              title="SOCI4L"
              year="Present"
              description="Turning wallets into human-readable, expressive profiles. Product, UX architecture, and identity system design."
              link="https://soci4l.net"
              badges={["Identity", "On-chain UX", "Product"]}
            />

            {/* SOCI4L Donate Embeds */}
            <div className="flex flex-col sm:flex-row gap-6 pt-2 pb-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Support my work (C-Chain)</span>
                <iframe
                  src="https://soci4l.net/embed/donate/0xbrokkr"
                  width="350"
                  height="80"
                  frameBorder="0"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Support my work (Fuji testnet for Build Games)</span>
                <iframe
                  src="https://testnet.soci4l.net/embed/donate/0xbrokkr"
                  width="350"
                  height="80"
                  frameBorder="0"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                />
              </div>
            </div>

            <WorkItem
              title="Floyka"
              year="Present"
              description={<>Floyka is a studio for building digital tools, plugins, and design-driven systems across web and on-chain contexts. It includes <strong>Floyka Labs</strong>, an experimental initiative exploring emerging design systems, interactions, and tooling.</>}
              link="https://floyka.space"
              badges={["Tools", "Systems", "Design-Tech", "Research"]}
            />
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">Also</div>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.figma.com/community/plugin/1502812839016494184/colorsense-ai" target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 hover:text-black dark:hover:text-white transition-colors">ColorSense AI</a>
              <span className="text-neutral-300 dark:text-neutral-600">·</span>
              <a href="https://www.framer.com/marketplace" target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 hover:text-black dark:hover:text-white transition-colors">ImageTools</a>
              <span className="text-neutral-300 dark:text-neutral-600">·</span>
              <a href="https://www.framer.com/marketplace/plugins/asciimotion/" target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 hover:text-black dark:hover:text-white transition-colors">AsciiMotion</a>
            </div>
          </div>
        </section>

        {/* Media & Speaking */}
        <section id="media" className="mb-40">
          <SectionTitle>Media & Speaking</SectionTitle>
          <div className="space-y-2">
            <MediaItem
              title="Web3 Conversations"
              platform="SPOTIFY"
              type="Experimental Podcast"
              link="https://open.spotify.com/show/6WnDymJ6li5h15GmaIZOPr"
              icon={Mic}
            />
          </div>
        </section>

        {/* Testimonials — sitede görünür, CV/PDF'te yok */}
        <section id="testimonials" className="print:hidden mb-40">
          <SectionTitle>References</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialItem
              quote="After starting to work with Meriç, one thing became very clear to me: despite his young age, his vision, discipline, and productivity are ahead of many others. He doesn’t approach projects only from a design or technical perspective; he first tries to truly understand the brand and its needs. This directly reflects on the quality of the final outcome. He’s easy to communicate with, quick at finding solutions, and very clear when it comes to taking responsibility. In most of the projects we’ve done together, the results went beyond our expectations. I genuinely believe the energy and leadership behind Floyka bring real value to the brands they work with."
              author="Melih Can Maviş"
              role={
                <span>
                  CEO @{" "}
                  <a
                    href="https://fork.com.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors underline underline-offset-2"
                  >
                    Fork.com.tr
                  </a>
                </span>
              }
            />
            <TestimonialItem
              quote="Beyond his technical and product skills, Meric is simply someone you can trust to take responsibility and deliver meaningful work."
              author="Hürsel Çay"
              role="Avalanche Team1 Turkiye Operations Lead "
            />
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="mb-40">
          <SectionTitle>Awards & Recognition</SectionTitle>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
            <AwardItem
              year="2024"
              title="Site of the Year"
              organization="Framer"
              link="https://x.com/0xBrokkr/status/1859966897896440000?s=20"
              description="Awarded for excellence in web design and interactivity. Recipient of the official Framer Site of the Year pin."
            />

          </div>
        </section>

        {/* Experiments — ideas / prototypes / maker (hidden in print/PDF) */}
        <section id="playground" className="print:hidden mb-40">
          <SectionTitle>Experiments</SectionTitle>
          <PhysicsPlayground isDark={isDarkMode} />
        </section>


        {/* Footer */}
        <section id="contact" className="py-20 border-t border-dashed border-neutral-200/60 dark:border-neutral-800/60 transition-opacity duration-500">
          <div className="max-w-[800px] mx-auto px-6 flex justify-between items-center">

            <div className="flex flex-wrap gap-6 items-center">
              <a href="https://x.com/0xBrokkr" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                <XLogo size={12} />
              </a>
              <a href="https://linkedin.com/in/brokkr" className="hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest text-neutral-400">LinkedIn</a>
              <a href="https://github.com/xBrokkr" className="hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest text-neutral-400">GitHub</a>
              <a href="mailto:merickalkan@icloud.com" className="hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest text-neutral-400">Email</a>
              <a
                href="/merickalkan_cv.pdf"
                download="merickalkan_cv.pdf"
                className="print:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest"
              >
                <Download size={12} />
                CV / PDF
              </a>
            </div>

            <div className="flex items-center gap-6 print:hidden">
              <ThemeToggle isDark={isDarkMode} toggle={toggleTheme} />
              <p className="text-[11px] font-medium text-neutral-300 dark:text-neutral-600">
                © 2026 Meriç Kalkan
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
