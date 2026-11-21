import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail, MousePointer2, Code, MapPin, Palette, Moon, Sun, Download, X as CloseIcon, ChevronLeft, ChevronRight, CornerDownRight } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Matter from 'matter-js'
import React from 'react'
import { hero, about, experience, earlierExperience, events, eventsIntro, talks, products, openSource, alsoLinks, clientWork, marketplaceProfile, selectedWork, awards, writing, testimonials, partnerBadges, skills, tools, education, location, contact } from './content'
import type { Media, Product, Talk, ExperienceEntry } from './content'

type BodyExt = Matter.Body & { label?: string; customType?: string; textColor?: string; tooltip?: string }

// --- Icons ---
const XLogo = ({ size = 16, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// --- Media: thumbnails + lightbox ---

const Lightbox = ({ items, index, onClose, onIndex }: { items: Media[], index: number, onClose: () => void, onIndex: (i: number) => void }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const item = items[index]
  const many = items.length > 1
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (many && e.key === 'ArrowRight') go(1)
      else if (many && e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, go, many])

  // Keep Tab focus inside the dialog
  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const focusables = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button'))
    if (focusables.length === 0) return
    const first = focusables[0], last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onKeyDown={trapFocus}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-md p-4 md:p-10 font-outfit"
    >
      <figure className="relative max-w-5xl w-full flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <img
          key={item.src}
          src={item.src}
          alt={item.caption}
          className="max-h-[78vh] w-auto max-w-full rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 object-contain bg-neutral-100 dark:bg-neutral-900"
        />
        <figcaption className="text-[13px] font-medium text-neutral-600 dark:text-neutral-300 text-center px-10">
          {item.caption}
          {many && <span className="ml-2 font-mono text-[11px] text-neutral-400">{index + 1}/{items.length}</span>}
        </figcaption>
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white focus-visible:outline-2 focus-visible:outline-neutral-500">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white focus-visible:outline-2 focus-visible:outline-neutral-500">
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </figure>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-neutral-800 focus-visible:outline-2 focus-visible:outline-neutral-500"
      >
        <CloseIcon size={16} />
      </button>
    </motion.div>,
    document.body
  )
}

const useLightbox = (items: Media[]) => {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const node = (
    <AnimatePresence>
      {open !== null && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}
    </AnimatePresence>
  )
  return { openAt: setOpen, node }
}

const MediaRow = ({ items, className = '' }: { items: Media[], className?: string }) => {
  const { openAt, node } = useLightbox(items)
  return (
    <>
      <ul className={`flex flex-wrap gap-2 ${className}`}>
        {items.map((it, i) => (
          <li key={it.src}>
            <button
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Open image: ${it.caption}`}
              title={it.caption}
              className="relative z-10 block w-[104px] md:w-[120px] aspect-[16/10] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:opacity-85 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 cursor-zoom-in"
            >
              <img src={it.thumb} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
      {node}
    </>
  )
}

const EventsGrid = () => {
  const items = events.map(e => e.image)
  const { openAt, node } = useLightbox(items.map((img, i) => ({
    ...img,
    caption: [events[i].title, events[i].date, events[i].place, events[i].note].filter(Boolean).join(' · '),
  })))
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((e, i) => (
          <li key={e.image.src} className={i === 0 ? 'sm:col-span-2' : ''}>
            <button
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Open photo: ${e.title}`}
              className="group block w-full text-left rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 cursor-zoom-in"
            >
              <div className={`${i === 0 ? 'aspect-[16/8]' : 'aspect-[16/10]'} overflow-hidden bg-neutral-100 dark:bg-neutral-900`}>
                <img
                  src={i === 0 ? e.image.src : e.image.thumb}
                  alt={e.image.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[14px] font-bold text-black dark:text-white">{e.title}</h3>
                  {e.date && <span className="text-[11px] font-mono text-neutral-400 shrink-0">{e.date}</span>}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">{e.place}</div>
                <p className="text-[12px] text-neutral-500 mt-1.5 leading-snug">{e.note}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {node}
    </>
  )
}

const TalkItem = ({ talk }: { talk: Talk }) => {
  const body = (
    <>
      <div className="flex justify-between items-baseline gap-3">
        <h4 className="text-[15px] font-bold text-black dark:text-white">{talk.title}</h4>
        <span className="text-[11px] font-mono text-neutral-400 shrink-0">{talk.date}</span>
      </div>
      <div className="text-[12px] font-bold uppercase tracking-wider text-neutral-500 mt-1">{talk.event} · {talk.place}</div>
    </>
  )
  return (
    <div className="py-5 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      {talk.link
        ? <a href={talk.link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">{body}</a>
        : body}
      {talk.photo && <MediaRow items={[talk.photo]} className="mt-3" />}
    </div>
  )
}

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

const SocialLink = ({ href, icon: Icon, label, tooltip, className = "text-neutral-500 dark:text-neutral-400" }: { href: string, icon: React.ElementType, label?: string, tooltip: string, className?: string }) => (
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

// Cards use a "stretched link": the title link covers the whole card via ::after,
// while thumbnails and secondary links sit above it (relative z-10) so they stay clickable.
const stretched = "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"

const WorkItem = ({ title, role, year, link, description, badges, media }: { title: string, role?: string, year: string, link: string, description: string | React.ReactNode, badges?: string[], media?: Media[] }) => (
  <motion.div
    initial="initial"
    whileHover="hover"
    className="group block py-8 border-b border-neutral-100 dark:border-neutral-800 last:border-0 relative overflow-hidden has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-neutral-400 rounded-sm"
  >
    <motion.div
      variants={{ hover: { opacity: 1 } }}
      initial={{ opacity: 0 }}
      className="absolute inset-0 bg-neutral-50/50 dark:bg-white/5 -z-10 transition-opacity duration-300"
    />
    <div className="flex items-baseline justify-between mb-3 px-4 group-hover:px-6 transition-all duration-300">
      <div className="flex items-center gap-3">
        <h3 className="text-[18px] font-bold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300">
          <a href={link} target="_blank" rel="noopener noreferrer" className={stretched}>{title}</a>
        </h3>
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
      {media && media.length > 0 && <MediaRow items={media} className="mt-3" />}
    </div>
  </motion.div>
)

const ProductItemMinimal = ({ title, type, link, description, links, media }: Product) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="relative flex items-start justify-between gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-black dark:hover:border-neutral-600 has-[a:focus-visible]:border-black dark:has-[a:focus-visible]:border-neutral-400 transition-all duration-300 group cursor-pointer"
  >
    <div className="min-w-0">
      <h3 className="text-[14px] font-bold text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
        <a href={link} target="_blank" rel="noopener noreferrer" className={stretched}>{title}</a>
      </h3>
      <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{type}</span>
      {description && <p className="mt-1.5 text-[12px] text-neutral-500 leading-snug">{description}</p>}
      {links && links.length > 0 && (
        <div className="relative z-10 mt-2.5 flex flex-wrap gap-1.5">
          {links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-neutral-500">
              {l.label} <ArrowUpRight size={10} />
            </a>
          ))}
        </div>
      )}
      {media && media.length > 0 && <MediaRow items={media} className="mt-3" />}
    </div>
    <div className="w-8 h-8 shrink-0 rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight size={14} />
    </div>
  </motion.div>
)

const AwardItem = ({ year, title, organization, description, link, media }: { year: string, title: string, organization: string, description: string, link?: string, media?: Media }) => (
  <motion.div
    whileHover={link ? { x: 5 } : undefined}
    className={`relative flex gap-4 md:gap-6 py-6 border-b border-neutral-100 dark:border-neutral-800 last:border-0 group ${link ? 'cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-white/5 -mx-4 px-4 transition-colors rounded-xl' : ''}`}
  >
    <div className="w-12 md:w-16 pt-1 shrink-0">
      <span className="text-[12px] font-mono font-bold text-neutral-300 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors">{year}</span>
    </div>
    <div className="flex-grow min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="text-[15px] font-bold text-black dark:text-white mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          {link ? <a href={link} target="_blank" rel="noopener noreferrer" className={stretched}>{title}</a> : title}
        </h4>
        {link && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />}
      </div>
      <div className="text-[12px] font-bold uppercase tracking-wider text-neutral-500 mb-2">{organization}</div>
      <p className="text-[13px] text-neutral-400 leading-relaxed max-w-md">{description}</p>
    </div>
    {media && <MediaRow items={[media]} className="shrink-0 self-center" />}
  </motion.div>
)

const ExperienceItem = ({ role, company, period, description, previous, media, muted }: ExperienceEntry & { muted?: boolean }) => {
  const isPresent = !muted && (period.toLowerCase().includes('present') || period.toLowerCase().includes('devam'))
  return (
    <div className={`py-6 pl-6 ml-2 relative group ${muted ? 'border-l border-neutral-200 dark:border-neutral-700' : 'border-l-2 border-neutral-100 dark:border-neutral-800'}`}>
      <div className={`absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black transition-all duration-300 z-10 ${muted ? 'bg-neutral-300 dark:bg-neutral-600' : isPresent ? 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' : 'bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400'}`} />
      <div className="flex justify-between items-baseline gap-3 mb-1">
        <h4 className={`text-[15px] font-bold transition-colors ${muted ? 'text-neutral-600 dark:text-neutral-400' : 'text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300'}`}>{role}</h4>
        <span className="text-[11px] font-mono text-neutral-400 shrink-0">{period}</span>
      </div>
      <div className={`text-[13px] font-bold mb-2 uppercase tracking-wide ${muted ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-400'}`}>{company}</div>
      {previous && (
        <div className="flex justify-between items-baseline gap-3 mb-2 text-[12px] text-neutral-400 dark:text-neutral-500">
          <span className="inline-flex items-center gap-1.5"><CornerDownRight size={12} className="shrink-0" />Promoted from {previous.role}</span>
          <span className="text-[11px] font-mono shrink-0">{previous.period}</span>
        </div>
      )}
      <p className={`text-[13px] leading-relaxed ${muted ? 'text-neutral-500 dark:text-neutral-500' : 'text-neutral-500'}`}>{description}</p>
      {media && media.length > 0 && <MediaRow items={media} className="mt-4" />}
    </div>
  )
}

const TestimonialItem = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
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

const UseItem = ({ name, category, icon: Icon }: { name: string, category?: string, icon: React.ElementType }) => (
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
          width: isExpanded ? 440 : 120,
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
              <span className="text-[11px] text-white/50 font-medium">Product Builder</span>
            </div>
          </div>

          <div className="flex gap-5 text-[13px] font-medium text-white/70 whitespace-nowrap shrink-0">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#experience" className="hover:text-white transition-colors">Exp.</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="/blog/" className="hover:text-white transition-colors">Blog</a>
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
      createTextBody(width / 1.5, 50, 'Reputation', 'text', bubbleText, bubbleBg),
      createTextBody(width / 5, 150, 'On-chain', 'text', bubbleBg, bubbleText),
      createTextBody(width / 1.2, 150, 'Systems', 'text', bubbleText, bubbleBg),
      createTextBody(width / 2.5, 200, 'Tools', 'text', bubbleText, bubbleBg),
      createTextBody(width / 1.8, 200, 'Interaction', 'text', bubbleBg, bubbleText),
      createTextBody(width / 4, 100, 'Protocol', 'text', bubbleText, bubbleBg),
      createTextBody(width / 1.3, 120, 'UI', 'text', bubbleBg, bubbleText),
      createTextBody(width / 1.6, 80, 'Agents', 'text', bubbleText, bubbleBg),
      createTextBody(width / 3, 220, 'Motion', 'text', bubbleBg, bubbleText),
      // Product names (with hover tooltips)
      createTextBody(width / 2, 80, 'SOCI4L', 'text', bubbleText, bubbleBg, 'On-chain reputation, now with a grant or two'),
      createTextBody(width / 1.25, 260, 'StampUI', 'text', bubbleBg, bubbleText, 'UI blocks you actually own'),
      createTextBody(width / 1.1, 200, 'ColorSense', 'text', bubbleText, bubbleBg, 'Palettes from plain words'),
      createTextBody(width / 2.2, 300, 'Team1', 'text', bubbleBg, bubbleText, 'Hundreds of events and counting 🔺'),
      createTextBody(width / 3.5, 90, 'Floyka', 'text', bubbleText, bubbleBg, 'The studio where it started'),
      createTextBody(width / 1.4, 280, 'unsnitch', 'text', bubbleText, bubbleBg, 'Stops X from snitching on your links'),
      createTextBody(width / 6, 300, 'multiclaude', 'text', bubbleBg, bubbleText, 'One Claude Code chat, a parallel team'),
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
                <RoleTooltip role={hero.roles[0].role} content={hero.roles[0].tooltip} icon={Code} />
              </motion.div>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {hero.joiner}
              </motion.span>{' '}
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RoleTooltip role={hero.roles[1].role} content={hero.roles[1].tooltip} icon={Palette} />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {hero.tagline}
              </motion.span>
            </h1>

            <div className="flex flex-wrap gap-6 mb-12 items-center text-[11px] font-bold uppercase tracking-widest text-neutral-400">
              <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {hero.orgs[0]}
              </div>
              <div className="flex items-center gap-2 text-black/80 dark:text-neutral-200">
                <span className="w-1.5 h-1.5 rounded-full bg-black/80 dark:bg-white" />
                {hero.orgs[1]}
              </div>
              <div className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                {hero.orgs[2]}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <SocialLink href={contact.x} icon={XLogo} label="X" tooltip={contact.xHandle} />
              <SocialLink href={contact.linkedin} icon={Linkedin} label="LinkedIn" tooltip="Connect" />
              <SocialLink href={contact.github} icon={Github} label="GitHub" tooltip="Code" />
              <SocialLink href={`mailto:${contact.email}`} icon={Mail} label="Email" tooltip="Contact Me" />
            </div>
          </motion.div>
        </section>

        {/* Bio & Skills */}
        <section id="about" className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionTitle>About Me</SectionTitle>
            {about.map((p, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-neutral-500 font-medium mb-6 [&_strong]:text-neutral-700 dark:[&_strong]:text-neutral-300">
                {p}
              </p>
            ))}
          </div>
          <div>
            <SectionTitle>Skills & Stack</SectionTitle>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {partnerBadges.map(b => (
                <span key={b} className="px-2.5 py-1 bg-neutral-200/80 dark:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300 rounded-md text-[10px] font-semibold uppercase tracking-wider">{b}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map(s => (
                <span key={s} className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-lg text-[11px] font-bold uppercase tracking-wider">{s}</span>
              ))}
            </div>

            <SectionTitle>Education</SectionTitle>
            <ul className="space-y-4">
              {education.map(e => (
                <li key={e.school} className="flex justify-between items-baseline border-b border-neutral-100 dark:border-neutral-800 pb-2">
                  <span className="font-bold text-[13px] text-black dark:text-white">{e.school}</span>
                  <span className="text-[11px] text-neutral-400 text-right">{e.detail ? <>{e.detail}<br /></> : null}{e.period}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-neutral-950 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 text-white rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                <MapPin size={12} /> Location
              </div>
              <div className="font-medium text-[14px]">{location}</div>
            </div>
          </div>
        </section>

        {/* Tools I Create With */}
        <section id="stack" className="mb-40">
          <SectionTitle>Tools I Create With</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr gap-4">
            {tools.map(t => (
              <UseItem key={t.name} name={t.name} icon={t.icon} />
            ))}
          </div>
        </section>

        {/* Experience — Primary / Earlier hiyerarşik */}
        <section id="experience" className="mb-40">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-2">
            {experience.map(e => (
              <ExperienceItem key={`${e.role}-${e.company}`} {...e} />
            ))}

            {/* Earlier — always visible, same in light/dark (no collapse) */}
            <div className="pt-8 mt-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1 pl-6 ml-2">Earlier · Community & Media</div>
              <div className="space-y-2">
                {earlierExperience.map(e => (
                  <ExperienceItem key={`${e.role}-${e.company}`} muted {...e} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events & Community — team work (Team1 Türkiye) */}
        <section id="events" className="mb-40">
          <SectionTitle>Events & Community</SectionTitle>
          <p className="text-[14px] leading-relaxed text-neutral-500 font-medium mb-8 max-w-xl">
            {eventsIntro} <span aria-hidden="true">🔺</span>
          </p>
          <EventsGrid />
        </section>

        {/* Speaking — rendered only when there are talks */}
        {talks.length > 0 && (
          <section id="speaking" className="mb-40">
            <SectionTitle>Speaking</SectionTitle>
            <div>
              {talks.map(t => (
                <TalkItem key={`${t.date}-${t.title}`} talk={t} />
              ))}
            </div>
          </section>
        )}

        {/* Products — ana ürün → core tools → kits */}
        <section id="products" className="mb-40">
          <SectionTitle>Products</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(p => (
              <ProductItemMinimal key={p.title} {...p} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{marketplaceProfile.stat}</span>
            <a href={marketplaceProfile.href} target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1">
              {marketplaceProfile.label} <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Open Source</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openSource.map(p => (
                <ProductItemMinimal key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Selected Products — ürün odaklı showcase */}
        <section id="work" className="mb-40">
          <SectionTitle>Selected Products</SectionTitle>
          <div className="space-y-4">
            {selectedWork.map(w => (
              <WorkItem key={w.title} title={w.title} year={w.year} description={w.description} link={w.link} badges={w.badges} media={w.media} />
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">Client Work · via Floyka</div>
            <div className="flex flex-wrap gap-3">
              {clientWork.map((l, i) => (
                <React.Fragment key={l.label}>
                  {i > 0 && <span className="text-neutral-300 dark:text-neutral-600">·</span>}
                  {l.href
                    ? <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 hover:text-black dark:hover:text-white transition-colors">{l.label}</a>
                    : <span className="text-[13px] text-neutral-500">{l.label}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">More Plugins</div>
            <div className="flex flex-wrap gap-3">
              {alsoLinks.map((l, i) => (
                <React.Fragment key={l.label}>
                  {i > 0 && <span className="text-neutral-300 dark:text-neutral-600">·</span>}
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 hover:text-black dark:hover:text-white transition-colors">{l.label}</a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials — sitede görünür, CV/PDF'te yok */}
        <section id="testimonials" className="print:hidden mb-40">
          <SectionTitle>References</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(t => (
              <TestimonialItem key={t.author} quote={t.quote} author={t.author} role={t.role} />
            ))}
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="mb-40">
          <SectionTitle>Awards & Recognition</SectionTitle>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-100 dark:border-neutral-800">
            {awards.map(a => (
              <AwardItem key={a.title} {...a} />
            ))}
          </div>
        </section>

        {/* Writing & Research */}
        <section id="writing" className="mb-40">
          <SectionTitle>Writing & Research</SectionTitle>
          <div>
            {writing.map(w => {
              const external = w.href.startsWith('http')
              return (
                <a
                  key={w.href}
                  href={w.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex gap-4 md:gap-6 py-5 border-b border-neutral-100 dark:border-neutral-800 last:border-0 hover:bg-neutral-50/50 dark:hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors"
                >
                  <span className="w-16 shrink-0 pt-0.5 text-[11px] font-mono text-neutral-400">{w.date}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">{w.title}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 shrink-0" />
                    </span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-1">{w.kind}</span>
                    <span className="block text-[13px] text-neutral-400 leading-relaxed mt-1.5">{w.description}</span>
                  </span>
                </a>
              )
            })}
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
              <a href={contact.x} className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                <XLogo size={12} />
              </a>
              <a href={contact.linkedin} className="hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest text-neutral-400">LinkedIn</a>
              <a href={contact.github} className="hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest text-neutral-400">GitHub</a>
              <a href={`mailto:${contact.email}`} className="hover:text-black dark:hover:text-white transition-colors text-[11px] font-bold uppercase tracking-widest text-neutral-400">Email</a>
              <a
                href={contact.cvFile}
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
