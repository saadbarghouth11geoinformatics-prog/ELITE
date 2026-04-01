import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Award,
  Users,
  Clock,
  Star,
  Target,
  Heart,
  Lightbulb,
  TrendingUp,
  Shield,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import RevealOnScroll from '@/components/RevealOnScroll'
import PageBackground from '@/components/PageBackground'
import FloatingCard from '@/components/animations/FloatingCard'
import StaggerContainer from '@/components/animations/StaggerContainer'
import { aboutHeroVideo, menuImageSet, pickNonMenuImage } from '@/data/publicMedia'
import { foundedYear, serviceAreasText, yearsOfExcellence } from '@/data/companyProfile'

const stats = [
  { value: yearsOfExcellence, suffix: '+', label: 'عام من الخبرة', icon: Clock },
  { value: 5000, suffix: '+', label: 'حفلة ناجحة', icon: Award },
  { value: 50, suffix: '+', label: 'طبق متنوع', icon: Star },
  { value: 100, suffix: '%', label: 'رضا العملاء', icon: Heart },
]

const values = [
  {
    icon: Heart,
    title: 'الجودة أولاً',
    description: 'نستخدم فقط أفضل المكونات الطازجة لضمان أعلى معايير الجودة في كل طبق نقدمه.',
  },
  {
    icon: Users,
    title: 'العملاء في المقام الأول',
    description: 'نسعى دائماً لتجاوز توقعات عملائنا وتقديم تجربة استثنائية في كل مناسبة.',
  },
  {
    icon: Target,
    title: 'الالتزام بالمواعيد',
    description: 'ندرك أهمية الوقت في المناسبات، لذلك نلتزم دائماً بالمواعيد المحددة.',
  },
  {
    icon: Lightbulb,
    title: 'الابتكار المستمر',
    description: 'نطور باستمرار قائمتنا وخدماتنا لتلبية احتياجات عملائنا المتغيرة.',
  },
]

const timeline = [
  {
    year: `${foundedYear}`,
    title: 'التأسيس',
    description:
      'انطلقت النخبة للحفلات والإعاشة لتقديم خدمات ضيافة وإعاشة بجودة عالية ولمسة احترافية.',
  },
  {
    year: '2008',
    title: 'التوسع الأول',
    description: 'افتتاح أول مطبخ مركزي وتوظيف فريق من الطهاة المحترفين.',
  },
  {
    year: '2014',
    title: 'الاعتراف الإقليمي',
    description:
      'رسخنا حضورنا في قطاع الحفلات والإعاشة عبر تنفيذ مناسبات متنوعة بثقة عملائنا.',
  },
  {
    year: '2019',
    title: 'التوسع الوطني',
    description: `بدأنا في توسيع نطاق الخدمة داخل السعودية ليشمل ${serviceAreasText}.`,
  },
  {
    year: '2023',
    title: 'التحول الرقمي',
    description: 'إطلاق منصة الحجز الإلكتروني وتطبيق خدمة العملاء المتقدمة.',
  },
  {
    year: '2026',
    title: `${yearsOfExcellence} عاماً من التميز`,
    description: `نواصل مسيرتنا بخبرة تمتد إلى ${yearsOfExcellence} عاماً في خدمة الحفلات والمناسبات داخل السعودية.`,
  },
]

const aboutBackgroundImages = [menuImageSet.cakeSlices]
const aboutHeroImage = pickNonMenuImage(5)

const aboutCollageImages = [
  'https://marn.com/blog/wp-content/uploads/360_F_627853212_bIw6wBo8qXXZvrj7wVXNew9fovoVSEoJ.jpg',
  'https://tse1.mm.bing.net/th/id/OIP.5Qlq8YIilvUFKQd1aWDhqgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://5.imimg.com/data5/SELLER/Default/2023/5/305477495/JU/UM/OU/78207714/107-kitchen-setup3-1000x1000.jpg',
  'https://drmgrihmindia.com/wp-content/uploads/2023/05/DSC03267.jpg',
]

function SectionTopLine() {
  return (
    <div className="mb-14 flex justify-center" aria-hidden="true">
      <div className="h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const [isHeroVideoBroken, setIsHeroVideoBroken] = useState(false)
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' })

  return (
    <div className="relative overflow-hidden bg-dark">
      <PageBackground images={aboutBackgroundImages} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <section className="relative min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28">
          <div className="absolute inset-0">
            {isHeroVideoBroken ? (
              <img
                src={aboutHeroImage}
                alt="حول النخبة للحفلات"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover opacity-70"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={aboutHeroImage}
                onError={() => setIsHeroVideoBroken(true)}
                className="h-full w-full object-cover opacity-70"
              >
                <source src={aboutHeroVideo} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.6)_34%,rgba(0,0,0,0.82)_100%)]" />
          </div>

          <div className="container-custom relative px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-black/42 px-6 py-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.38)] backdrop-blur-sm sm:px-10 sm:py-12">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                  className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/25 bg-gold/16 shadow-[0_0_0_10px_rgba(212,175,55,0.06)]"
                >
                  <Sparkles className="h-10 w-10 text-gold" />
                </motion.div>

                <div className="mb-4 text-sm font-arabic tracking-[0.12em] text-white/72">
                  خبرة وضيافة وتنفيذ يليق باسم النخبة
                </div>
                <span className="mb-4 block text-sm font-arabic text-gold">من نحن</span>

                <h1 className="mb-6 font-arabic text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">قصة النخبة</span>
                  <span className="mt-2 block text-2xl text-gradient-gold sm:text-3xl md:text-4xl">
                    للضيافة والإعاشة
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="mx-auto max-w-3xl text-base leading-8 text-white/84 font-arabicBody sm:text-lg md:text-xl"
                >
                  خبرة تمتد إلى {yearsOfExcellence} عاماً في خدمات الإعاشة والضيافة داخل السعودية
                </motion.p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <span className="rounded-full border border-gold/25 bg-white/8 px-4 py-2 text-sm text-white/88 font-arabic">
                    {yearsOfExcellence}+ سنة خبرة
                  </span>
                  <span className="rounded-full border border-gold/25 bg-white/8 px-4 py-2 text-sm text-white/88 font-arabic">
                    تغطية داخل {serviceAreasText}
                  </span>
                  <span className="rounded-full border border-gold/25 bg-white/8 px-4 py-2 text-sm text-white/88 font-arabic">
                    جودة تقديم وتنفيذ موثوق
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section ref={statsRef} className="relative bg-black/70 py-20">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div className="container-custom relative px-4 sm:px-6 lg:px-8">
            <SectionTopLine />
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="rounded-3xl border border-gold/10 bg-dark-700/50 p-8 text-center transition-all hover:border-gold/30"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10"
                  >
                    <stat.icon className="h-8 w-8 text-gold" />
                  </motion.div>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="mb-2 block text-4xl font-bold text-gradient-gold md:text-5xl"
                  />
                  <span className="font-arabic text-white/60">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black/70 py-28">
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

          <div className="container-custom relative px-4 sm:px-6 lg:px-8">
            <SectionTopLine />
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <RevealOnScroll direction="right">
                <div>
                  <span className="mb-4 block text-sm font-arabic text-gold">قصتنا</span>
                  <h2 className="mb-6 font-arabic text-4xl font-bold text-white md:text-5xl">
                    منذ <span className="text-gradient-gold">{foundedYear}</span> ونحن نبني التميز
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-white/70 font-arabicBody">
                    <p>
                      بدأت قصتنا في عام {foundedYear} برؤية واضحة: تقديم ضيافة راقية وإعاشة موثوقة
                      تليق بالمناسبات الخاصة والعائلية والرسمية.
                    </p>
                    <p>
                      مع مرور السنين، توسعنا تدريجياً من خلال بناء سمعة قوية قائمة على الجودة
                      والموثوقية، واليوم نخدم عملاءنا في السعودية داخل {serviceAreasText}.
                    </p>
                    <p>
                      وعلى مدار {yearsOfExcellence} عاماً، قدمنا خدماتنا لآلاف الحفلات والمناسبات،
                      من حفلات الزفاف الحميمة إلى المؤتمرات الكبرى، مع التزام دائم بتقديم تجربة لا
                      تُنسى.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { icon: TrendingUp, text: 'جودة عالية' },
                      { icon: Shield, text: 'خدمة ممتازة' },
                      { icon: Star, text: 'أسعار تنافسية' },
                      { icon: Users, text: 'فريق محترف' },
                    ].map((item, i) => (
                      <RevealOnScroll key={i} delay={0.5 + i * 0.1}>
                        <motion.div
                          whileHover={{ x: 5, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                          className="flex items-center gap-3 rounded-xl bg-gold/10 p-4 transition-colors"
                        >
                          <item.icon className="h-5 w-5 text-gold" />
                          <span className="font-arabic text-white/80">{item.text}</span>
                        </motion.div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="left">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.img
                      src={aboutCollageImages[0]}
                      alt="Kitchen"
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-full rounded-2xl object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img
                      src={aboutCollageImages[1]}
                      alt="Food"
                      loading="lazy"
                      decoding="async"
                      className="mt-8 h-64 w-full rounded-2xl object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img
                      src={aboutCollageImages[2]}
                      alt="Grill"
                      loading="lazy"
                      decoding="async"
                      className="-mt-8 h-64 w-full rounded-2xl object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img
                      src={aboutCollageImages[3]}
                      alt="Event"
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-full rounded-2xl object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="bg-black/70 py-28">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <SectionTopLine />
            <RevealOnScroll>
              <div className="mb-16 text-center">
                <span className="mb-4 block text-sm font-arabic text-gold">قيمنا</span>
                <h2 className="font-arabic text-4xl font-bold text-white md:text-5xl">
                  المبادئ التي <span className="text-gradient-gold">نؤمن بها</span>
                </h2>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="grid gap-8 md:grid-cols-2" stagger={0.12} direction="scale">
              {values.map((value, index) => (
                <FloatingCard
                  key={index}
                  maxTilt={8}
                  className="flex gap-6 rounded-3xl border border-gold/10 bg-dark-700/50 p-8 transition-all hover:border-gold/30"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10"
                  >
                    <value.icon className="h-8 w-8 text-gold" />
                  </motion.div>
                  <div>
                    <h3 className="mb-3 font-arabic text-xl font-bold text-white">{value.title}</h3>
                    <p className="leading-relaxed text-white/60 font-arabicBody">{value.description}</p>
                  </div>
                </FloatingCard>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="relative bg-black/70 py-28">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <SectionTopLine />
            <RevealOnScroll>
              <div className="mb-16 text-center">
                <span className="mb-4 block text-sm font-arabic text-gold">رحلتنا</span>
                <h2 className="font-arabic text-4xl font-bold text-white md:text-5xl">
                  محطات في <span className="text-gradient-gold">تاريخنا</span>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="relative mx-auto max-w-4xl">
              <motion.div
                className="absolute bottom-0 right-8 top-0 hidden w-0.5 origin-top bg-gradient-to-b from-gold via-gold/50 to-transparent md:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
              />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <RevealOnScroll key={index} delay={index * 0.1} direction="left">
                    <motion.div
                      whileHover={{ x: 10, backgroundColor: 'rgba(212,175,55,0.03)' }}
                      className="relative md:pr-20"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                        className="absolute right-4 top-0 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-dark bg-gold md:flex"
                      >
                        <div className="h-2 w-2 rounded-full bg-dark" />
                      </motion.div>

                      <div className="glassmorphism-light rounded-2xl p-6 transition-colors hover:border-gold/30">
                        <motion.span
                          className="mb-2 block text-2xl font-bold text-gold"
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.year}
                        </motion.span>
                        <h3 className="mb-2 font-arabic text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-white/60 font-arabicBody">{item.description}</p>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black/70 py-28">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="container-custom relative px-4 sm:px-6 lg:px-8">
            <SectionTopLine />
            <RevealOnScroll>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-6 font-arabic text-4xl font-bold text-white md:text-5xl">
                  هل تريد <span className="text-gradient-gold">معرفة المزيد؟</span>
                </h2>
                <p className="mb-10 text-lg text-white/60 font-arabicBody">
                  فريقنا جاهز للإجابة على جميع استفساراتك
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="tel:+966548823127"
                    className="flex items-center gap-3 rounded-xl bg-gold/10 px-6 py-4 font-arabic text-gold transition-colors hover:bg-gold/20"
                  >
                    <Phone className="h-5 w-5" />
                    0548823127
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:saadbarghouth11@gmail.com"
                    className="flex items-center gap-3 rounded-xl bg-gold/10 px-6 py-4 font-arabic text-gold transition-colors hover:bg-gold/20"
                  >
                    <Mail className="h-5 w-5" />
                    saadbarghouth11@gmail.com
                  </motion.a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
