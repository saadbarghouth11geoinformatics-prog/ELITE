import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Apple,
  ArrowLeft,
  BookOpen,
  ChefHat,
  Coffee,
  GlassWater,
  Heart,
  PhoneCall,
  Utensils,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  breakfastGalleryMedia,
  latestEventImages,
  menuImageSet,
  type GalleryMediaItem,
} from '@/data/publicMedia'

type GalleryCategory = 'all' | 'breakfast' | 'appetizers' | 'hot' | 'desserts' | 'beverages' | 'fruits'
type FilterCategory = Exclude<GalleryCategory, 'all'>

const imagePath = (path: string) => encodeURI(path)
const imageMedia = (path: string): GalleryMediaItem => ({ type: 'image', src: imagePath(path) })
const imageMediaGroup = (paths: string[]) => paths.map((path) => imageMedia(path))
const dedupeMedia = (items: GalleryMediaItem[]) =>
  Array.from(new Map(items.map((item) => [`${item.type}:${item.src}`, item])).values())

const galleryPools: Record<FilterCategory, GalleryMediaItem[]> = {
  breakfast: breakfastGalleryMedia,
  appetizers: imageMediaGroup([
    ...latestEventImages.filter((_, index) => [0, 1, 4].includes(index)),
    '/images/menu-hummus.jpg',
    '/images/menu-tabbouleh.jpg',
    '/images/menu-warak.jpg',
    '/images/menu-photo-01.jpg',
    '/images/menu-photo-03.jpg',
    '/images/menu-photo-09.jpg',
    '/images/menu-photo-15.jpg',
    '/images/menu-photo-18.jpg',
    '/images/menu-photo-21.jpg',
  ]),
  hot: imageMediaGroup([
    '/images/menu-biryani.jpg',
    '/images/menu-mixed-grill.jpg',
    '/images/menu-photo-10.jpg',
    '/images/menu-photo-14.jpg',
    '/images/menu-photo-16.jpg',
    '/images/menu-photo-22.jpg',
    '/images/menu-photo-24.jpg',
    '/images/menu-photo-25.jpg',
    '/images/menu-photo-27.jpg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.22 PM.jpeg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.24 PM.jpeg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.39 PM.jpeg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.39 PM (1).jpeg',
  ]),
  desserts: imageMediaGroup([
    ...latestEventImages.filter((_, index) => [2, 3].includes(index)),
    '/images/menu-kunafa.jpg',
    '/images/menu-baklava.jpg',
    '/images/menu-ummali.jpg',
    '/images/menu-photo-05.jpg',
    '/images/menu-photo-08.jpg',
    '/images/menu-photo-11.jpg',
    '/images/menu-photo-12.jpg',
    '/images/menu-photo-20.jpg',
    '/images/menu-photo-23.jpg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.23 PM (2).jpeg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.23 PM (3).jpeg',
  ]),
  beverages: imageMediaGroup([
    '/images/menu-coffee.jpg',
    '/images/menu-juices.jpg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.38 PM (1).jpeg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.38 PM.jpeg',
  ]),
  fruits: imageMediaGroup([
    '/images/menu-photo-04.jpg',
    '/images/menu-photo-06.jpg',
    '/images/menu-photo-07.jpg',
    '/images/menu-photo-13.jpg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.38 PM (1).jpeg',
    '/images/New images/WhatsApp Image 2026-03-17 at 10.48.38 PM.jpeg',
  ]),
}

const categoryFilters: Array<{
  id: GalleryCategory
  label: string
  icon: typeof Utensils
}> = [
  { id: 'all', label: 'الكل', icon: Utensils },
  { id: 'hot', label: 'المأكولات الساخنة', icon: ChefHat },
  { id: 'breakfast', label: 'الفطور', icon: Coffee },
  { id: 'appetizers', label: 'المقبلات', icon: Utensils },
  { id: 'desserts', label: 'الحلويات', icon: Heart },
  { id: 'beverages', label: 'المشروبات', icon: GlassWater },
  { id: 'fruits', label: 'الفواكه', icon: Apple },
]

const allGalleryMedia = dedupeMedia([
  ...galleryPools.hot,
  ...galleryPools.breakfast,
  ...galleryPools.appetizers,
  ...galleryPools.desserts,
  ...galleryPools.beverages,
  ...galleryPools.fruits,
])

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaItem | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)

  const visibleMedia = useMemo(() => {
    if (activeCategory === 'all') {
      return allGalleryMedia
    }

    return galleryPools[activeCategory]
  }, [activeCategory])
  const renderedMedia = visibleMedia.slice(0, visibleCount)

  const selectCategory = (category: GalleryCategory) => {
    setActiveCategory(category)
    setVisibleCount(8)
  }

  return (
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#090909_0%,#11100c_48%,#090909_100%)] text-white">
      <section className="relative flex min-h-[46vh] items-center overflow-hidden py-16 sm:min-h-[56vh] sm:py-20 md:min-h-[82vh] md:py-24">
        <div className="absolute inset-0">
          <img
            src={menuImageSet.biryani}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/10 via-dark/65 to-dark/90" />
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 18% 24%, rgba(245,197,66,0.18), transparent 24%), radial-gradient(circle at 80% 62%, rgba(255,255,255,0.08), transparent 30%)',
              }}
            />
          </div>
        </div>

        <div className="container-custom relative px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-black/55 px-4 py-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md sm:rounded-[32px] sm:px-10 sm:py-10"
          >
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-arabic text-gold">
              معرض بصري متجدد
            </span>
            <h1 className="mt-4 text-[2rem] font-bold font-arabic leading-tight sm:text-4xl md:text-6xl">
              تصفح الأكلات <span className="text-gradient-gold">بأسلوب أنعم وأوضح</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-sm leading-7 text-white/85 font-arabicBody sm:text-base md:text-lg">
              استعرض الصور بهدوء، ثم انتقل إلى المنيو التفصيلي لإتمام اختيار الأصناف وطلب الحجز بصورة أوضح.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="bg-gradient-gold px-6 py-3 text-base font-arabic text-dark hover:shadow-gold-lg"
              >
                <Link to="/menu-text">
                  انتقل إلى المنيو التفصيلي
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gold/40 px-6 py-3 text-base font-arabic text-gold hover:bg-gold/10"
              >
                <Link to="/menu-pages">
                  صفحات المنيو
                  <BookOpen className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 pb-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-[24px] border border-gold/20 bg-dark-900/70 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:mb-8 sm:rounded-[28px] sm:p-5">
            <div className="flex flex-col gap-3 text-center sm:text-right">
              <h2 className="text-xl font-bold font-arabic text-white sm:text-3xl">استعرض الصور</h2>
              <p className="text-sm leading-7 text-white/70 font-arabicBody sm:text-base">
                هذه المساحة مخصصة للمعاينة البصرية، أما اختيار الأصناف وتأكيد الحجز فستجدهما بشكل أكثر ترتيبًا داخل المنيو التفصيلي.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryFilters.map((category) => (
                <motion.button
                  key={category.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectCategory(category.id)}
                  className={`flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-[22px] border px-3 py-3 text-center font-arabic transition-all sm:min-h-[78px] sm:px-4 ${
                    activeCategory === category.id
                      ? 'border-gold/60 bg-gradient-gold text-dark'
                      : 'border-white/10 bg-dark-800 text-white/80 hover:border-gold/35 hover:text-white'
                  }`}
                >
                  <category.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="line-clamp-2 text-[13px] leading-5 sm:text-sm sm:leading-6">
                    {category.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {renderedMedia.map((item, index) => (
              <div
                key={`${activeCategory}-${item.type}-${item.src}-${index}`}
                className={`${index % 7 === 0 ? 'xl:col-span-2' : ''}`}
                style={{ contentVisibility: 'auto', containIntrinsicSize: '360px 450px' }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedMedia(item)}
                  className="group relative w-full overflow-hidden rounded-[24px] border border-gold/15 bg-dark-800/80 text-right shadow-[0_18px_40px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:-translate-y-1 hover:border-gold/35"
                >
                  <div className={`relative overflow-hidden w-full ${
                    index % 7 === 0
                      ? 'aspect-[4/4.8] xl:aspect-[2.2/1.35]'
                      : index % 3 === 0
                        ? 'aspect-[4/4.9] sm:aspect-[4/5.2]'
                        : 'aspect-[4/4.8] sm:aspect-[4/5]'
                  }`}
                >
                  {item.type === 'video' ? (
                    <img
                      src={item.poster}
                      alt={`معاينة فيديو من قائمة الطعام ${index + 1}`}
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`صورة من قائمة الطعام ${index + 1}`}
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100" />
                  {item.type === 'video' ? (
                    <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-arabic text-white/90 backdrop-blur-sm sm:left-4 sm:top-4">
                      فيديو
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 flex justify-end p-3 sm:p-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition group-hover:border-gold/45 group-hover:bg-gold/90 group-hover:text-dark">
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {visibleCount < visibleMedia.length ? (
            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setVisibleCount((count) => count + 8)}
                className="border-gold/40 px-8 py-3 font-arabic text-gold hover:bg-gold/10"
              >
                عرض المزيد
              </Button>
            </div>
          ) : null}

          <div className="mt-10 rounded-[30px] border border-gold/25 bg-[linear-gradient(135deg,rgba(245,197,66,0.16),rgba(12,12,12,0.92))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl text-center md:text-right">
                <h3 className="text-2xl font-bold font-arabic text-white">لإتمام الحجز</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 font-arabicBody sm:text-base">
                  انتقل إلى المنيو التفصيلي لتحديد الأصناف ومراجعة الخيارات ثم إكمال طلب الحجز بطريقة مرتبة وواضحة.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="bg-dark px-6 py-3 text-base font-arabic text-white hover:bg-dark-900"
                >
                  <Link to="/menu-text">أكمل من المنيو التفصيلي</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 px-6 py-3 text-base font-arabic text-white hover:bg-white/10"
                >
                  <a href="tel:+966548823127">
                    اتصال سريع
                    <PhoneCall className="mr-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-4 bottom-24 z-30 md:hidden">
        <Button
          asChild
          className="w-full rounded-full bg-gradient-gold px-5 py-3 text-base font-arabic text-dark shadow-[0_18px_40px_rgba(0,0,0,0.28)] hover:shadow-gold-lg"
        >
          <Link to="/menu-text">
            أكمل من المنيو التفصيلي
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Dialog open={Boolean(selectedMedia)} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="w-[min(1100px,96vw)] max-h-[92vh] border border-gold/30 bg-dark-900/95 p-0">
          <div className="flex max-h-[92vh] flex-col">
            <DialogHeader className="border-b border-white/10 px-5 py-4">
              <DialogTitle className="text-right font-arabic text-lg text-white sm:text-xl">
                عرض الصورة
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 sm:p-6">
              <div className="max-h-[72vh] overflow-auto rounded-2xl border border-white/10 bg-black/50">
                {selectedMedia?.type === 'video' ? (
                  <video
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={selectedMedia.poster}
                    className="h-auto max-h-[72vh] w-full object-contain"
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                  </video>
                ) : selectedMedia ? (
                  <img
                    src={selectedMedia.src}
                    alt="معاينة صورة من قائمة الطعام"
                    className="h-auto w-full object-contain"
                    />
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
