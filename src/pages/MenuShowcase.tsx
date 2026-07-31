import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { menuImageSet } from '@/data/publicMedia'
import { menuShowcasePages } from '@/data/menuShowcasePages'

export default function MenuShowcase() {
  const [selectedPage, setSelectedPage] = useState<(typeof menuShowcasePages)[number] | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)
  const visiblePages = menuShowcasePages.slice(0, visibleCount)

  return (
    <div dir="rtl" className="relative min-h-screen bg-[linear-gradient(180deg,#090909_0%,#11100c_48%,#090909_100%)] text-white">
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center overflow-hidden py-24">
        <div className="absolute inset-0">
          <img
            src={menuImageSet.weddingCake}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/0 via-dark/65 to-dark/85" />
        </div>
        <div className="container-custom px-4 sm:px-6 lg:px-8 relative pt-28 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto rounded-3xl border border-white/10 bg-black/55 px-6 py-8 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:px-10 sm:py-10"
          >
            <span className="text-gold text-base font-arabic mb-3 block">المنيو</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-arabic leading-tight">
              صفحات المنيو بالتقسيم الكامل
            </h1>
            <p className="mt-4 text-white/80 font-arabicBody text-sm sm:text-base leading-relaxed">
              استعرض الصفحات الأصلية بالكامل قبل الانتقال لقائمة الأكلات، مع تقسيم واضح لكل نوع.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="bg-gradient-gold text-dark hover:shadow-gold-lg font-arabic font-semibold px-6 py-3"
              >
                <Link to="/menu">عرض قائمة الأكلات</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/10 font-arabic px-6 py-3"
              >
                <Link to="/menu-text">المنيو التفصيلي</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center md:text-right md:items-end mb-8">
            <span className="text-gold text-sm font-arabic">كل الصفحات</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-arabic">صفحات المنيو كلها جنب بعض</h2>
            <div className="h-1 w-24 rounded-full bg-gradient-gold" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visiblePages.map((page) => (
              <button
                key={page.src}
                type="button"
                onClick={() => setSelectedPage(page)}
                className="group rounded-2xl border border-gold/20 bg-dark-800/70 p-3 text-right shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:border-gold/40"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '320px 430px' }}
              >
                <div className="relative overflow-hidden rounded-xl bg-dark-900/60 aspect-[3/4]">
                  <img
                    src={page.src}
                    alt={page.label}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="text-sm text-white font-arabic line-clamp-2">{page.label}</div>
                    {page.group && <div className="mt-1 text-xs text-gold">{page.group}</div>}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {visibleCount < menuShowcasePages.length ? (
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
        </div>
      </section>

      <AnimatePresence>
        {selectedPage && (
          <Dialog open={Boolean(selectedPage)} onOpenChange={(open) => !open && setSelectedPage(null)}>
            <DialogContent className="w-[min(1200px,96vw)] max-h-[92vh] bg-dark-900/95 border border-gold/30 p-0">
              <div className="flex flex-col max-h-[92vh]">
                <DialogHeader className="px-4 sm:px-6 py-4 border-b border-white/10">
                  <DialogTitle className="text-right font-arabic text-white text-lg sm:text-xl">
                    {selectedPage.label}
                  </DialogTitle>
                  <p className="text-white/60 text-sm font-arabicBody">يمكنك التكبير والسحب داخل الصورة.</p>
                </DialogHeader>
                <div className="p-4 sm:p-6">
                  <div className="max-h-[72vh] overflow-auto rounded-2xl bg-black/60 border border-white/10">
                    <img
                      src={selectedPage.src}
                      alt={selectedPage.label}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
