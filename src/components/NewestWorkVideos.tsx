import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, Clapperboard, Play } from 'lucide-react'
import { newestWorkVideos } from '@/data/publicMedia'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

type Props = { compact?: boolean; showCta?: boolean }

type WorkVideo = (typeof newestWorkVideos)[number]
const octoberDates = ['2 أكتوبر', '3 أكتوبر', '4 أكتوبر', '5 أكتوبر', '6 أكتوبر', '7 أكتوبر']

function InlineVideoPreview({ video, index, onSelect }: { video: WorkVideo; index: number; onSelect: (video: WorkVideo) => void }) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [canAutoplay] = useState(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ?? false
    return !saveData && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: '240px 0px', threshold: 0.08 })
    const card = cardRef.current
    if (card) observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const player = videoRef.current
    if (!player || !nearViewport || !canAutoplay) { player?.pause(); return }
    void player.play().catch(() => undefined)
  }, [nearViewport, canAutoplay])

  const attachSource = nearViewport && canAutoplay
  return (
    <motion.button ref={cardRef} type="button" onClick={() => onSelect(video)} aria-label={`تشغيل فيديو ${video.title}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: Math.min(index * .06, .3) }} className="group relative aspect-video overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,#211b0d,#080808_62%)] text-right shadow-[0_22px_60px_rgba(0,0,0,.4)] transition hover:-translate-y-1 hover:border-gold/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
      {attachSource ? <video ref={videoRef} src={video.src} muted loop playsInline preload="metadata" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:opacity-90" /> : null}
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_25%_20%,rgba(229,199,107,.28),transparent_27%),linear-gradient(115deg,transparent_45%,rgba(255,255,255,.05)_46%,transparent_47%)]" />
      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs text-white/70 font-arabic"><CalendarDays className="h-3.5 w-3.5 text-gold" /> {octoberDates[index] ?? '7 أكتوبر'}</span>
      <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/45 bg-gold/15 text-gold backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-gold group-hover:text-black"><Play className="h-7 w-7 fill-current" /></span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-14"><span className="mb-1 block text-[11px] tracking-[.18em] text-gold/75">ELITE · NEW REEL</span><h3 className="text-lg text-white font-arabic">{video.title}</h3></div>
    </motion.button>
  )
}

export default function NewestWorkVideos({ compact = false, showCta = true }: Props) {
  const [activeVideo, setActiveVideo] = useState<(typeof newestWorkVideos)[number] | null>(null)

  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-[#080704] py-16 sm:py-24" aria-labelledby="newest-work-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,.14),transparent_33%),radial-gradient(circle_at_85%_80%,rgba(212,175,55,.08),transparent_30%)]" />
      <div className="container-custom relative px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-3 flex items-center gap-2 text-sm text-gold font-arabic"><Clapperboard className="h-4 w-4" /> عرض جديد · أكتوبر 2026</span>
            <h2 id="newest-work-title" className="text-4xl font-bold text-white font-arabic sm:text-5xl">أحدث <span className="text-gradient-gold">أعمالنا</span></h2>
            <p className="mt-4 text-base leading-8 text-white/65 font-arabicBody sm:text-lg">لقطات مختارة من تجهيزاتنا الأخيرة للبوفيهات والمناسبات. اضغط على أي لقطة لتشغيلها.</p>
          </div>
          {showCta ? <Link to="/kitchen" className="inline-flex items-center gap-2 self-start border-b border-gold/50 pb-2 text-gold font-arabic transition-colors hover:text-gold-light md:self-auto">شاهد المعرض الكامل <ArrowLeft className="h-4 w-4" /></Link> : null}
        </div>

        <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
          {newestWorkVideos.map((video, index) => <InlineVideoPreview key={video.src} video={video} index={index} onSelect={setActiveVideo} />) /*
            <motion.button key={video.src} type="button" onClick={() => setActiveVideo(video)} aria-label={`تشغيل فيديو ${video.title}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: Math.min(index * .06, .3) }} className="group relative aspect-video overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,#211b0d,#080808_62%)] text-right shadow-[0_22px_60px_rgba(0,0,0,.4)] transition hover:-translate-y-1 hover:border-gold/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_25%_20%,rgba(229,199,107,.28),transparent_27%),linear-gradient(115deg,transparent_45%,rgba(255,255,255,.05)_46%,transparent_47%)]" />
              <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs text-white/70 font-arabic"><CalendarDays className="h-3.5 w-3.5 text-gold" /> 7 أكتوبر</span>
              <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/45 bg-gold/15 text-gold backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-gold group-hover:text-black"><Play className="h-7 w-7 fill-current" /></span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-14">
                <span className="mb-1 block text-[11px] tracking-[.18em] text-gold/75">ELITE · NEW REEL</span>
                <h3 className="text-lg text-white font-arabic">{video.title}</h3>
              </div>
            </motion.button>
          */}
        </div>
      </div>

      <Dialog open={activeVideo !== null} onOpenChange={(open) => !open && setActiveVideo(null)}>
        {activeVideo ? (
          <DialogContent className="w-[calc(100%-2rem)] max-w-5xl gap-0 border-gold/25 bg-[#080704] p-2 shadow-[0_30px_120px_rgba(0,0,0,.9)] sm:max-w-5xl sm:p-3 [&_[data-slot=dialog-close]]:left-4 [&_[data-slot=dialog-close]]:right-auto [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:z-10 [&_[data-slot=dialog-close]]:bg-black/75 [&_[data-slot=dialog-close]]:p-2 [&_[data-slot=dialog-close]]:text-white">
            <DialogTitle className="sr-only">{activeVideo.title}</DialogTitle>
            <DialogDescription className="sr-only">فيديو من أحدث أعمال إيليت للحفلات والإعاشة. اضغط زر الهروب أو زر الإغلاق للعودة.</DialogDescription>
            <video src={activeVideo.src} controls autoPlay playsInline preload="metadata" className="aspect-video w-full rounded-xl bg-black shadow-2xl" aria-label={activeVideo.title} />
            <p className="px-4 py-4 text-center text-lg text-white font-arabic">{activeVideo.title}</p>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  )
}
