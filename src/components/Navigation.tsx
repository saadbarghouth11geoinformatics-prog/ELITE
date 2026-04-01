import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  ChefHat,
  Menu,
  MessageCircle,
  Phone,
  Utensils,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const WHATSAPP_LINK = 'https://wa.me/966548823127'

const navLinks = [
  { name: 'الرئيسية', href: '/', description: 'ارجع للبداية وشوف أهم الأقسام بسرعة.' },
  { name: 'من نحن', href: '/about', description: 'تعرف على خبرتنا وطريقة شغلنا.' },
  { name: 'خدماتنا', href: '/services', description: 'شوف أنواع الإعاشة والمناسبات المتاحة.' },
  { name: 'قائمة الطعام', href: '/menu', description: 'معرض صور للأكلات فقط، والحجز من المنيو التفصيلي.' },
  { name: 'ألبوم المنيو', href: '/menu-pages', description: 'تصفح صور وصفحات المنيو بالكامل.' },
  { name: 'المنيو التفصيلي', href: '/menu-text', description: 'نسخة نصية مرتبة لو عايز تقرأ بسرعة.' },
  { name: 'داخل المطبخ', href: '/kitchen', description: 'لقطات وتجهيزات من المطبخ.' },
  { name: 'احجز الآن', href: '/booking', description: 'أكمل طلبك في خطوات بسيطة وواضحة.' },
  { name: 'تواصل معنا', href: '/contact', description: 'كل وسائل التواصل والمساعدة المباشرة.' },
] as const

const mobilePrimaryLinks = [
  {
    name: 'ابدأ بالمنيو',
    href: '/menu',
    description: 'لو عايز تشوف الصور أولًا قبل ما تكمل للمنيو التفصيلي',
    icon: Utensils,
  },
  {
    name: 'احجز الآن',
    href: '/booking',
    description: 'لو جاهز تحدد الموعد وعدد الضيوف',
    icon: Calendar,
  },
  {
    name: 'كلمنا مباشرة',
    href: '/contact',
    description: 'لو محتاج حد يساعدك تختار',
    icon: MessageCircle,
  },
] as const

const mobileDockLinks = [
  { name: 'المنيو', href: '/menu', icon: Utensils, external: false },
  { name: 'احجز', href: '/booking', icon: Calendar, external: false },
  { name: 'واتساب', href: WHATSAPP_LINK, icon: MessageCircle, external: true },
] as const

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-none bg-transparent px-2 py-3 shadow-none backdrop-blur-sm transition-all duration-500 nav-contrast sm:px-0"
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="group flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold sm:h-12 sm:w-12"
              >
                <ChefHat className="h-5 w-5 text-dark sm:h-7 sm:w-7" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient-gold font-arabic sm:text-xl">ELITE</span>
                <span className="hidden text-[10px] text-gold/80 font-arabic sm:block sm:text-xs">
                  النخبة للحفلات
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className={`group relative px-3 py-2 text-sm font-semibold transition-colors duration-300 font-arabic drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] lg:px-4 ${
                      location.pathname === link.href ? 'text-gold' : 'text-white hover:text-gold'
                    }`}
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-0 right-0 h-0.5 bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: location.pathname === link.href ? '100%' : 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <motion.a
                href="tel:+966548823127"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gold transition-colors hover:text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-arabic">0548823127</span>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-gold px-4 py-2 text-sm font-semibold text-dark transition-all duration-300 hover:shadow-gold-lg font-arabic lg:px-6"
                >
                  <Link to="/booking">احجز الآن</Link>
                </Button>
              </motion.div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="xl:hidden rounded-2xl border border-white/10 bg-black/20 p-2 text-white transition-colors hover:text-gold"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[88vw] overflow-auto border-l border-gold/20 bg-black/90 backdrop-blur-xl"
            >
              <div className="p-5 pt-24">
                <div className="mb-6 border-b border-gold/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold">
                      <ChefHat className="h-7 w-7 text-dark" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-gradient-gold font-arabic">ELITE</span>
                      <span className="block text-xs text-gold/80 font-arabic">النخبة للحفلات</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/65 font-arabicBody">
                    لو أول مرة تدخل الموقع، ابدأ من الاختيارات السريعة دي.
                  </p>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-sm text-gold font-arabic">الأكثر استخدامًا</p>
                  <div className="space-y-3">
                    {mobilePrimaryLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-start gap-3 rounded-2xl border p-4 text-right transition-all ${
                            location.pathname === link.href
                              ? 'border-gold/40 bg-gold/15'
                              : 'border-white/8 bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                            <link.icon className="h-5 w-5 text-gold" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <ArrowLeft className="h-4 w-4 text-gold" />
                              <span className="text-sm font-bold text-white font-arabic">{link.name}</span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-white/55 font-arabicBody">
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gold/10 pt-5">
                  <p className="mb-3 text-sm text-gold font-arabic">كل الصفحات</p>
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.04 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block rounded-xl p-3 text-right transition-all ${
                            location.pathname === link.href
                              ? 'bg-gold/20 text-gold'
                              : 'text-white hover:bg-white/5 hover:text-gold'
                          }`}
                        >
                          <span className="block text-sm font-semibold font-arabic">{link.name}</span>
                          <span className="mt-1 block text-[11px] leading-5 text-white/45 font-arabicBody">
                            {link.description}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gold/10 pt-5">
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    href="tel:+966548823127"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gold/10 p-3 text-gold"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-arabic">اتصال</span>
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.56 }}
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-white/[0.05] p-3 text-white/85"
                  >
                    <MessageCircle className="h-4 w-4 text-gold" />
                    <span className="text-sm font-arabic">واتساب</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobileMenuOpen && (
        <div className="fixed inset-x-3 bottom-3 z-40 xl:hidden">
          <div className="safe-area-bottom rounded-[24px] border border-gold/15 bg-black/85 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-2">
              {mobileDockLinks.map((link) => {
                const baseClassName = `flex flex-col items-center justify-center gap-1 rounded-[18px] px-3 py-3 text-center transition-all ${
                  !link.external && location.pathname === link.href
                    ? 'bg-gold/18 text-gold'
                    : 'bg-white/[0.03] text-white/80 hover:bg-white/[0.07] hover:text-gold'
                }`

                if (link.external) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClassName}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="text-[11px] font-arabic">{link.name}</span>
                    </a>
                  )
                }

                return (
                  <Link key={link.name} to={link.href} className={baseClassName}>
                    <link.icon className="h-5 w-5" />
                    <span className="text-[11px] font-arabic">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
