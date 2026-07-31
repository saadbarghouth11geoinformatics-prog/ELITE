import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { 
  Phone, ArrowLeft, Heart, 
  ChefHat, PartyPopper, Building2, Briefcase, Utensils,
  Award, Clock, Sparkles, Flame,
  TrendingUp, Shield, Zap, MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedCounter from '@/components/AnimatedCounter'
import RevealOnScroll from '@/components/RevealOnScroll'
import MagneticButton from '@/components/MagneticButton'
import PageBackground from '@/components/PageBackground'
import LocalServiceContent from '@/components/LocalServiceContent'
import useDesktopHeroVideo from '@/hooks/useDesktopHeroVideo'
import FoodTrayReveal from '@/components/animations/FoodTrayReveal'
import DrinkFloat from '@/components/animations/DrinkFloat'
import StaggerContainer from '@/components/animations/StaggerContainer'
import FloatingCard from '@/components/animations/FloatingCard'
import { homeHeroVideo, menuImageSet, serviceImageSet } from '@/data/publicMedia'
import { serviceAreasText, serviceCoverageText, yearsOfExcellence } from '@/data/companyProfile'

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const aboutPreviewImage = serviceImageSet.openBuffet
const servicesPreviewImages = [
  serviceImageSet.weddings,
  serviceImageSet.privateEvents,
  serviceImageSet.restaurants,
  serviceImageSet.conferences,
  serviceImageSet.openBuffet,
  serviceImageSet.corporateCatering,
]
const rotatingImages = [menuImageSet.kunafa]
const HERO_ROTATE_MS = 8000
const BACKGROUND_ROTATE_MS = 12000
const quickStartCards = [
  {
    title: 'ابدأ بالمنيو',
    description: 'لو حابب تشوف صور الأكلات أولًا ثم تكمل للمنيو التفصيلي.',
    href: '/menu',
    icon: Utensils,
  },
  {
    title: 'احجز في خطوات',
    description: 'حدد المناسبة والعدد والموعد بسهولة.',
    href: '/booking',
    icon: Sparkles,
  },
  {
    title: 'تواصل مباشرة',
    description: 'لو محتاج مساعدة سريعة قبل الاختيار.',
    href: '/contact',
    icon: Phone,
  },
] as const

// Rotation Helpers
const useRotatingIndex = (length: number, intervalMs: number) => {
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion || length <= 1) return
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % length)
    }, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [shouldReduceMotion, length, intervalMs])

  return index
}

// Particle Background Component
function ParticleBackground() {
  const shouldReduceMotion = useReducedMotion()
  const particles = useMemo(
    () =>
      Array.from({ length: shouldReduceMotion ? 12 : 28 }, (_, i) => ({
        id: i,
        right: `${pseudoRandom(i + 1) * 100}%`,
        top: `${pseudoRandom(i + 17) * 100}%`,
        duration: 4 + pseudoRandom(i + 33) * 3,
        delay: pseudoRandom(i + 49) * 3,
      })),
    [shouldReduceMotion]
  )

  return (
    <div className="particle-background absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1.5 h-1.5 bg-gold/30 rounded-full"
          style={{
            right: particle.right,
            top: particle.top,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Hero Section
function HeroSection() {
  const canPlayHeroVideo = useDesktopHeroVideo()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])
  const heroIndex = useRotatingIndex(rotatingImages.length, HERO_ROTATE_MS)
  const heroImage = rotatingImages[heroIndex] ?? ''
  const [isHeroVideoBroken, setIsHeroVideoBroken] = useState(false)
  
  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden sm:min-h-screen">
      {/* Parallax Background */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {isHeroVideoBroken || !canPlayHeroVideo ? (
          <img
            key={heroImage}
            src={heroImage}
            alt="بوفيه فخم وأطباق طازجة"
            loading={heroIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={heroIndex === 0 ? 'high' : 'auto'}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
            onError={() => setIsHeroVideoBroken(true)}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <source src={homeHeroVideo} type="video/mp4" />
          </motion.video>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.52)_42%,rgba(0,0,0,0.84)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/35 via-dark/72 to-dark/90" />
      </motion.div>

      <ParticleBackground />

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container-custom px-4 pt-20 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-12 md:pt-32 lg:px-8"
      >
        <div className="mx-auto mb-8 max-w-5xl rounded-[34px] border border-white/12 bg-black/52 px-4 py-6 shadow-[0_24px_90px_rgba(0,0,0,0.56)] backdrop-blur-md sm:mb-10 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/20 px-3 py-2 backdrop-blur-sm sm:mb-8 sm:px-5 sm:py-2.5"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-gold text-sm font-arabic">{yearsOfExcellence} عاماً من التميز</span>
          <Sparkles className="w-4 h-4 text-gold" />
        </motion.div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] sm:mb-6 sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block font-arabic text-[#f2d36b] drop-shadow-[0_8px_28px_rgba(0,0,0,0.92)]">
            ELITE النخبة
          </span>
          <span className="mt-2 block text-2xl leading-tight text-white font-arabic sm:mt-4 sm:text-5xl md:text-6xl">
            للحفلات والإعاشة
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-3 w-fit max-w-3xl rounded-2xl bg-black/58 px-4 py-3 text-lg text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.92)] font-arabic sm:mb-4 sm:px-6 sm:text-xl md:text-2xl">
          نقدم لكم تجربة طعام فاخرة لجميع مناسباتكم
        </p>

        {/* Description */}
        <p className="mx-auto max-w-xl rounded-2xl bg-black/54 px-4 py-4 text-sm leading-7 text-white/92 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] font-arabicBody sm:max-w-2xl sm:px-6 sm:text-base md:text-lg">
          خدمات إعاشة متكاملة للحفلات والمناسبات والمطاعم في جميع أنحاء المملكة العربية السعودية
          {`، في ${serviceAreasText}`}
        </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.74 }}
          className="mx-auto mb-8 max-w-3xl rounded-[28px] border border-gold/15 bg-black/42 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-md sm:mb-10 sm:p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3 text-right">
            <div>
              <p className="text-sm text-gold font-arabic">ابدأ من هنا</p>
              <p className="text-xs text-white/55 font-arabicBody sm:text-sm">
                اختار أسرع طريق مناسب لك بدون ما تلف كتير.
              </p>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[11px] text-gold font-arabic">
              3 خطوات واضحة
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickStartCards.map((card, index) => (
              <Link
                key={card.title}
                to={card.href}
                className={`rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-right transition-all hover:border-gold/35 hover:bg-gold/10 ${
                  index === quickStartCards.length - 1 ? 'col-span-2' : ''
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <ArrowLeft className="h-4 w-4 text-gold" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/12">
                    <card.icon className="h-5 w-5 text-gold" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white font-arabic sm:text-base">{card.title}</h3>
                <p className="mt-1 text-[11px] leading-5 text-white/60 font-arabicBody sm:text-sm">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <MagneticButton>
            <Button
              asChild
              className="group w-full whitespace-normal bg-gradient-gold px-5 py-4 text-center text-sm leading-snug text-dark transition-all duration-300 hover:shadow-gold-lg font-arabic font-semibold sm:w-auto sm:px-10 sm:py-7 sm:text-lg"
            >
              <Link to="/booking">
                احجز خدماتك الآن
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              asChild
              variant="outline"
              className="w-full whitespace-normal border-gold px-5 py-4 text-center text-sm leading-snug text-gold transition-all duration-300 hover:bg-gold hover:text-dark font-arabic font-semibold sm:w-auto sm:px-10 sm:py-7 sm:text-lg"
            >
              <Link to="/menu">تصفح قائمة الطعام</Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-6"
        >
          <motion.a 
            href="tel:+966548823127"
            whileHover={{ scale: 1.05 }}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-center text-sm text-white/70 transition-colors hover:text-gold sm:w-auto sm:flex-row sm:gap-3 sm:px-5 sm:py-3"
          >
            <Phone className="w-5 h-5 text-gold" />
            <span className="font-arabic">0548823127</span>
          </motion.a>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-center text-sm text-white/70 sm:w-auto sm:flex-row sm:gap-3 sm:px-5 sm:py-3"
          >
            <MapPin className="w-5 h-5 text-gold" />
            <span className="font-arabic">{serviceAreasText}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-sm font-arabic">اسحب للأسفل</span>
          <div className="w-8 h-12 border-2 border-gold/40 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    { icon: ChefHat, title: 'طهاة محترفون', desc: 'فريق من أفضل الطهاة ذوي الخبرة العالية', color: 'from-gold/20 to-gold/5' },
    { icon: Sparkles, title: 'فريق ضيافة راقٍ', desc: 'مضيفون محترفون يضمنون تجربة فاخرة للضيوف', color: 'from-amber-500/20 to-amber-500/5' },
    { icon: Shield, title: 'سلامة وجودة', desc: 'رقابة صارمة للنظافة وسلامة الغذاء في كل خطوة', color: 'from-emerald-500/20 to-emerald-500/5' },
    { icon: Heart, title: 'جودة عالية', desc: 'نختار أفضل المكونات لضمان أعلى جودة', color: 'from-red-500/20 to-red-500/5' },
    { icon: Clock, title: 'الالتزام بالمواعيد', desc: 'نصل في الوقت المحدد دائماً', color: 'from-blue-500/20 to-blue-500/5' },
    { icon: Award, title: `خبرة ${yearsOfExcellence} عاماً`, desc: `${yearsOfExcellence} عاماً من التميز في خدمات الإعاشة`, color: 'from-purple-500/20 to-purple-500/5' },
  ]

  return (
    <section className="relative overflow-hidden bg-black/70 py-16 sm:bg-black/80 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
        <RevealOnScroll>
          <div className="mb-10 text-center sm:mb-16">
            <span className="text-gold text-sm font-arabic mb-4 block">لماذا نحن</span>
            <h2 className="text-2xl font-bold text-white font-arabic sm:text-4xl md:text-5xl">
              ما يميز <span className="text-gradient-gold">النخبة</span>
            </h2>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4" stagger={0.09} direction="up" delay={0.1}>
          {features.map((feature, index) => (
            <FloatingCard
              key={index}
              maxTilt={10}
              className={`group relative overflow-hidden rounded-2xl border border-gold/10 bg-gradient-to-br p-4 transition-all duration-500 hover:border-gold/30 sm:rounded-3xl sm:p-8 ${feature.color}`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/20 transition-colors group-hover:bg-gold/30 sm:mb-6 sm:h-16 sm:w-16"
              >
                <feature.icon className="h-5 w-5 text-gold sm:h-8 sm:w-8" />
              </motion.div>
              
              <h3 className="relative mb-2 text-sm font-bold text-white transition-colors font-arabic group-hover:text-gold sm:mb-3 sm:text-xl">
                {feature.title}
              </h3>
              <p className="relative text-[11px] leading-5 text-white/60 font-arabicBody sm:text-base sm:leading-7">{feature.desc}</p>
            </FloatingCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// About Preview Section
function AboutPreviewSection() {
  const stats = [
    { value: yearsOfExcellence, suffix: '+', label: 'عام من الخبرة' },
    { value: 5000, suffix: '+', label: 'حفلة ناجحة' },
    { value: 50, suffix: '+', label: 'طبق متنوع' },
    { value: 100, suffix: '%', label: 'رضا العملاء' },
  ]

  const highlights = [
    { icon: Flame, text: 'مكونات طازجة يومياً' },
    { icon: Shield, text: 'معايير صحية عالية' },
    { icon: TrendingUp, text: 'أسعار تنافسية' },
    { icon: Zap, text: 'خدمة سريعة' },
  ]

  return (
    <section className="relative overflow-hidden bg-black/70 py-16 sm:bg-black/80 sm:py-28">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
        <div className="grid items-center gap-8 sm:gap-16 lg:grid-cols-2">
          {/* Image */}
          <RevealOnScroll direction="right">
            <div className="relative">
              <motion.div 
                className="relative rounded-3xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={aboutPreviewImage}
                  alt="About Elite"
                  loading="lazy"
                  decoding="async"
                  className="h-[240px] w-full object-cover sm:h-[420px] lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
                className="absolute bottom-4 right-4 rounded-3xl bg-gradient-gold p-4 shadow-gold-lg sm:-bottom-6 sm:-right-6 sm:p-8"
              >
                <div className="text-center">
                  <AnimatedCounter value={yearsOfExcellence} suffix="" className="block text-3xl font-bold text-dark sm:text-5xl" />
                  <span className="text-dark/80 font-arabic">عاماً من الخبرة</span>
                </div>
              </motion.div>

              {/* Decorative Frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-2 left-2 hidden h-24 w-24 rounded-tl-3xl border-t-4 border-l-4 border-gold/30 sm:-top-6 sm:-left-6 sm:block sm:h-32 sm:w-32" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-2 right-2 hidden h-24 w-24 rounded-br-3xl border-r-4 border-b-4 border-gold/30 sm:-right-6 sm:-bottom-6 sm:block sm:h-32 sm:w-32" 
              />
            </div>
          </RevealOnScroll>

          {/* Content */}
          <RevealOnScroll direction="left">
            <div>
              <span className="text-gold text-sm font-arabic mb-4 block">من نحن</span>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-white font-arabic sm:mb-6 sm:text-4xl md:text-5xl">
                <span className="text-gradient-gold">{yearsOfExcellence} عاماً</span> من التميز في خدمات الإعاشة
              </h2>
              
              <div className="space-y-3 text-sm leading-7 text-white/70 font-arabicBody sm:space-y-4 sm:text-lg">
                <p>
                  نقدم في النخبة للحفلات والإعاشة خبرة تمتد لأكثر من {yearsOfExcellence} عاماً في تجهيز الحفلات والمناسبات والولائم بخدمة راقية وتنفيذ منظم.
                </p>
                <p>
                  {serviceCoverageText}، مع فريق متخصص من الطهاة وخبراء الضيافة الذين يعملون بشغف لتقديم تجربة طعام لا تُنسى لعملائنا الكرام.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4">
                {highlights.map((item, i) => (
                  <RevealOnScroll key={i} delay={0.5 + i * 0.1}>
                    <motion.div 
                      whileHover={{ x: 5, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      className="flex items-center gap-2 rounded-xl bg-dark-700/50 p-2.5 transition-colors sm:gap-3 sm:p-4"
                    >
                      <item.icon className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
                      <span className="text-[11px] text-white/80 font-arabic sm:text-sm">{item.text}</span>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </div>

              <RevealOnScroll delay={0.8}>
                <div className="mt-10">
                  <MagneticButton>
                    <Button
                      asChild
                      className="bg-gradient-gold text-dark hover:shadow-gold-lg transition-all duration-300 font-arabic font-semibold px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto whitespace-normal text-center leading-snug"
                    >
                      <Link to="/about">
                        تعرف علينا أكثر
                        <ArrowLeft className="w-5 h-5 mr-2" />
                      </Link>
                    </Button>
                  </MagneticButton>
                </div>
              </RevealOnScroll>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-2 border-t border-gold/10 pt-5 sm:mt-12 sm:grid-cols-4 sm:gap-4 sm:pt-8">
                {stats.map((stat, index) => (
                  <RevealOnScroll key={index} delay={0.3 + index * 0.1}>
                    <div className="rounded-2xl bg-white/[0.03] px-3 py-4 text-center sm:bg-transparent sm:px-0 sm:py-0">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix}
                        className="block text-xl font-bold text-gradient-gold sm:text-2xl md:text-3xl"
                      />
                      <span className="text-[11px] text-white/50 font-arabic sm:text-xs md:text-sm">{stat.label}</span>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

// Services Preview Section
function ServicesPreviewSection() {
  const services = [
    {
      icon: Heart,
      title: 'حفلات الزفاف',
      desc: 'تنظيم بوفيهات فاخرة لحفلات الزفاف مع تشكيلة واسعة من الأطباق',
      image: servicesPreviewImages[0],
      price: 'من 150 ر.س',
    },
    {
      icon: PartyPopper,
      title: 'المناسبات الخاصة',
      desc: 'خدمات إعاشة مخصصة للمناسبات العائلية والاجتماعية',
      image: servicesPreviewImages[1],
      price: 'من 80 ر.س',
    },
    {
      icon: Building2,
      title: 'خدمات المطاعم',
      desc: 'توريد الأطعمة الجاهزة للمطاعم والفنادق بأعلى معايير الجودة',
      image: servicesPreviewImages[2],
      price: 'تواصل معنا',
    },
    {
      icon: Briefcase,
      title: 'الولائم والمؤتمرات',
      desc: 'تنظيم إعاشة للمؤتمرات والاجتماعات والولائم الرسمية',
      image: servicesPreviewImages[3],
      price: 'من 120 ر.س',
    },
    {
      icon: Utensils,
      title: 'البوفيه المفتوح',
      desc: 'تقديم بوفيهات مفتوحة متنوعة تناسب جميع الأذواق',
      image: servicesPreviewImages[4],
      price: 'من 200 ر.س',
    },
    {
      icon: ChefHat,
      title: 'التمويل الغذائي',
      desc: 'خدمات التمويل الغذائي للشركات والمؤسسات',
      image: servicesPreviewImages[5],
      price: 'تواصل معنا',
    },
  ]

  return (
    <section className="relative bg-black/70 py-16 sm:bg-black/80 sm:py-28">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-10 text-center sm:mb-16">
            <span className="text-gold text-sm font-arabic mb-4 block">خدماتنا</span>
            <h2 className="text-2xl font-bold text-white font-arabic sm:text-4xl md:text-5xl">
              خدمات إعاشة <span className="text-gradient-gold">متكاملة</span> لجميع المناسبات
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -15 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-gold/10 bg-dark-700/50 transition-all duration-500 hover:border-gold/40 sm:rounded-3xl"
              >
                {/* Image */}
                <div className="relative h-28 overflow-hidden sm:h-56">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-2 left-2 rounded-full bg-gold px-2 py-1 text-[10px] font-bold text-dark font-arabic sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-sm">
                    {service.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 transition-colors group-hover:bg-gold/20 sm:mb-4 sm:h-14 sm:w-14"
                  >
                    <service.icon className="h-5 w-5 text-gold sm:h-7 sm:w-7" />
                  </motion.div>
                  <h3 className="mb-2 text-sm font-bold text-white transition-colors font-arabic group-hover:text-gold sm:mb-3 sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mb-3 text-[11px] leading-5 text-white/60 font-arabicBody sm:mb-4 sm:text-base sm:leading-relaxed">
                    {service.desc}
                  </p>
                  <Link 
                    to="/services"
                    className="group/link inline-flex items-center gap-1.5 text-xs text-gold transition-colors hover:text-gold-light font-arabic sm:gap-2 sm:text-sm"
                  >
                    اكتشف المزيد
                    <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.5}>
          <div className="text-center mt-12">
            <MagneticButton>
              <Button
                asChild
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-dark transition-all duration-300 font-arabic font-semibold px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto whitespace-normal text-center leading-snug"
              >
                <Link to="/services">
                  عرض جميع الخدمات
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// Menu Preview Section
function MenuPreviewSection() {
  const featuredItems = [
    { name: 'مشويات مشكلة', price: 120, image: menuImageSet.friedChicken, category: 'أطباق رئيسية' },
    { name: 'كنافة نابلسية', price: 45, image: menuImageSet.kunafa, category: 'حلويات' },
    { name: 'برياني دجاج', price: 85, image: menuImageSet.biryani, category: 'أطباق رئيسية' },
    { name: 'حمص بالطحينة', price: 25, image: menuImageSet.hummus, category: 'مقبلات' },
  ]

  return (
    <section className="relative overflow-hidden bg-black/70 py-16 sm:bg-black/80 sm:py-28">
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="mb-10 text-center sm:mb-16">
            <span className="text-gold text-sm font-arabic mb-4 block">قائمة الطعام</span>
            <h2 className="mb-3 text-2xl font-bold text-white font-arabic sm:mb-4 sm:text-4xl md:text-5xl">
              أشهى <span className="text-gradient-gold">الأطباق</span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/60 font-arabicBody sm:text-base">
              اكتشف تشكيلتنا الواسعة من الأطباق العربية والعالمية المعدة بأيدي خبراء
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {featuredItems.map((item, index) => (
            <FoodTrayReveal key={index} delay={index * 0.15} direction="up">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-gold/10 bg-dark-700/50 transition-all duration-500 hover:border-gold/30"
              >
                <DrinkFloat intensity={8} className="relative h-28 overflow-hidden sm:h-48">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                  <div className="absolute top-2 right-2 rounded-lg bg-gold/90 px-2 py-1 text-[10px] font-bold text-dark font-arabic sm:top-3 sm:right-3 sm:text-xs">
                    {item.category}
                  </div>
                </DrinkFloat>
                <div className="p-3 sm:p-4">
                  <h3 className="mb-2 text-sm font-bold text-white transition-colors font-arabic group-hover:text-gold sm:text-lg">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-bold">{item.price} ر.س</span>
                    <Link 
                      to="/menu"
                      className="text-[11px] text-white/50 transition-colors hover:text-gold font-arabic sm:text-sm"
                    >
                      عرض الكل
                    </Link>
                  </div>
                </div>
              </motion.div>
            </FoodTrayReveal>
          ))}
        </div>

        <RevealOnScroll delay={0.4}>
          <div className="text-center mt-12">
            <MagneticButton>
              <Button
                asChild
                className="bg-gradient-gold text-dark hover:shadow-gold-lg transition-all duration-300 font-arabic font-semibold px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto whitespace-normal text-center leading-snug"
              >
                <Link to="/menu">
                  تصفح القائمة الكاملة
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black/70 py-16 sm:bg-black/80 sm:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 sm:mb-8 sm:h-20 sm:w-20"
            >
              <Sparkles className="h-8 w-8 text-gold sm:h-10 sm:w-10" />
            </motion.div>
            
            <h2 className="mb-4 text-2xl font-bold text-white font-arabic sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              جاهز لتحظى <span className="text-gradient-gold">بمناسبة لا تُنسى؟</span>
            </h2>
            <p className="mb-8 text-sm leading-7 text-white/60 font-arabicBody sm:mb-10 sm:text-lg">
              دعنا نساعدك في تنظيم حفلتك القادمة. تواصل معنا الآن واحصل على عرض خاص!
            </p>
            
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <MagneticButton>
              <Button
                asChild
                className="w-full whitespace-normal bg-gradient-gold px-5 py-4 text-center text-sm leading-snug text-dark transition-all duration-300 hover:shadow-gold-lg font-arabic font-semibold sm:w-auto sm:px-10 sm:py-7 sm:text-lg"
              >
                  <Link to="/booking">
                    احجز الآن
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
              <Button
                asChild
                variant="outline"
                className="w-full whitespace-normal border-white/30 px-5 py-4 text-center text-sm leading-snug text-white transition-all duration-300 hover:bg-white/10 font-arabic font-semibold sm:w-auto sm:px-10 sm:py-7 sm:text-lg"
              >
                  <Link to="/contact">تواصل معنا</Link>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// Main Home Page
export default function Home() {
  return (
    <div className="relative overflow-hidden bg-black">
      <PageBackground images={rotatingImages} rotateMs={BACKGROUND_ROTATE_MS} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <HeroSection />
        <FeaturesSection />
        <AboutPreviewSection />
        <ServicesPreviewSection />
        <MenuPreviewSection />
        <LocalServiceContent />
        <CTASection />
      </motion.div>
    </div>
  )
}
