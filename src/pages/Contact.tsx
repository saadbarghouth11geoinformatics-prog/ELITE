import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
  Star,
  Users,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import PageBackground from '@/components/PageBackground'
import TextReveal from '@/components/animations/TextReveal'
import StaggerContainer from '@/components/animations/StaggerContainer'
import FloatingCard from '@/components/animations/FloatingCard'
import { contactHeroVideo, menuImageSet, pickNonMenuImage } from '@/data/publicMedia'
import { serviceAreasText, yearsOfExcellence } from '@/data/companyProfile'

const WHATSAPP_NUMBER = '966548823127'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

const contactBackgroundImages = [menuImageSet.ummAli]
const contactHeroImage = pickNonMenuImage(1)

const normalizePhone = (value: string) => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return value
    .split('')
    .map((char) => {
      const index = arabicDigits.indexOf(char)
      return index >= 0 ? String(index) : char
    })
    .join('')
    .replace(/\D/g, '')
}

const isValidPhone = (value: string) => normalizePhone(value).length >= 9
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const contactInputClass =
  'h-11 rounded-xl border-gold/20 bg-dark-700 text-sm text-white placeholder:text-white/40 font-arabic focus-visible:border-gold focus-visible:ring-gold/30 sm:h-12 sm:text-base'

const contactTextareaClass =
  'min-h-[150px] rounded-2xl border-gold/20 bg-dark-700 text-sm leading-7 text-white placeholder:text-white/40 font-arabic focus-visible:border-gold focus-visible:ring-gold/30 sm:min-h-[170px] sm:text-base'

const contactInfo = [
  {
    icon: MessageCircle,
    title: 'واتساب',
    content: 'تواصل فوري وسريع',
    link: WHATSAPP_LINK,
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: Phone,
    title: 'الهاتف',
    content: '0548823127 - 0550302606',
    link: 'tel:+966548823127',
    color: 'bg-green-500/10 text-green-500',
    direction: 'ltr' as const,
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    content: 'saadbarghouth11@gmail.com',
    link: 'mailto:saadbarghouth11@gmail.com',
    color: 'bg-blue-500/10 text-blue-500',
    direction: 'ltr' as const,
  },
  {
    icon: MapPin,
    title: 'العنوان',
    content: `السعودية: ${serviceAreasText}`,
    link: '#',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    icon: Clock,
    title: 'ساعات العمل',
    content: 'السبت - الخميس: 8 ص - 10 م (بتوقيت السعودية)',
    link: '#',
    color: 'bg-purple-500/10 text-purple-500',
  },
]

const socialLinks = [
  { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/elite_for_outside_catering_', color: 'hover:bg-pink-500' },
  { icon: Twitter, name: 'Twitter', url: '#', color: 'hover:bg-blue-400' },
  { icon: Facebook, name: 'Facebook', url: '#', color: 'hover:bg-blue-600' },
  { icon: MessageCircle, name: 'WhatsApp', url: WHATSAPP_LINK, color: 'hover:bg-green-500' },
]

const faqs = [
  {
    question: 'كم يحتاج الطلب للتنفيذ؟',
    answer: 'نحتاج على الأقل 48 ساعة للطلبات الصغيرة، وأسبوع للمناسبات الكبيرة.',
  },
  {
    question: 'هل تقدمون خدمة التوصيل؟',
    answer: `نعم، نوفر خدمة التوصيل والتنفيذ داخل ${serviceAreasText}.`,
  },
  {
    question: 'هل يمكن تخصيص القائمة؟',
    answer: 'بالتأكيد، نصمم معك قائمة تناسب المناسبة والميزانية.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل الدفع نقداً، بالبطاقات، أو عبر التحويل البنكي.',
  },
]

function SectionTopLine() {
  return (
    <div className="mb-8 flex justify-center sm:mb-12 lg:mb-14" aria-hidden="true">
      <div className="h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  )
}

function BoxDivider() {
  return (
    <div className="my-5 flex justify-center sm:my-6" aria-hidden="true">
      <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isHeroVideoBroken, setIsHeroVideoBroken] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidPhone(formData.phone)) {
      toast.error('أدخل رقم جوال صحيح')
      return
    }

    if (formData.email && !isValidEmail(formData.email)) {
      toast.error('أدخل بريد إلكتروني صحيح')
      return
    }

    const sentAt = new Date().toLocaleString('ar-SA', {
      timeZone: 'Asia/Riyadh',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const whatsappMessage = [
      '*طلب تواصل جديد*',
      '',
      '*بيانات العميل*',
      `- الاسم: ${formData.name}`,
      `- رقم الجوال: ${normalizePhone(formData.phone)}`,
      `- البريد الإلكتروني: ${formData.email || '-'}`,
      `- الموضوع: ${formData.subject || '-'}`,
      '',
      '*تفاصيل الرسالة*',
      formData.message || '-',
      '',
      '*معلومات الإرسال*',
      `- وقت الإرسال: ${sentAt}`,
      '- التوقيت: السعودية',
      '- المصدر: صفحة تواصل معنا',
    ].join('\n')

    const whatsappUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    toast.success('تم فتح واتساب بالرسالة الجاهزة')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="relative overflow-hidden bg-dark">
      <PageBackground images={contactBackgroundImages} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-dark sm:min-h-[78vh] lg:min-h-screen">
        <div className="absolute inset-0">
          {isHeroVideoBroken ? (
            <img
              src={contactHeroImage}
              alt="Contact"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover opacity-65"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={contactHeroImage}
              onError={() => setIsHeroVideoBroken(true)}
              className="w-full h-full object-cover opacity-65"
            >
              <source src={contactHeroVideo} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/0 via-dark/65 to-dark/85" />
        </div>

        <div className="container-custom relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 block text-xs text-gold font-arabic sm:text-sm">تواصل معنا</span>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-white font-arabic sm:mb-6 sm:text-5xl md:text-6xl">
              <TextReveal text="نحن هنا لمساعدتك" delay={0.2} mode="words" />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mx-auto max-w-2xl text-base leading-8 text-white/70 font-arabicBody sm:text-lg md:text-xl"
            >
              اختر الطريقة المناسبة للتواصل وسنرد عليك في أقرب وقت.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-800 py-10 sm:py-14 lg:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <SectionTopLine />
          <StaggerContainer className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-6" stagger={0.09} direction="up">
            {contactInfo.map((item, index) => (
              <FloatingCard key={index} maxTilt={8} className="group">
                <motion.a
                  href={item.link}
                  whileHover={{ y: -8 }}
                  className="glassmorphism-light flex flex-col items-center min-w-0 overflow-hidden rounded-2xl p-4 text-center sm:p-5 lg:p-6 h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} sm:mb-4 sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
                  >
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="mb-2 text-base font-bold text-white font-arabic sm:text-lg">{item.title}</h3>
                    <p
                      dir={item.direction ?? 'rtl'}
                      className={`w-full text-sm text-white/60 sm:text-base ${
                        item.direction === 'ltr'
                          ? 'break-all text-center leading-6 font-arabicBody sm:leading-7'
                          : 'break-words leading-7 font-arabic'
                      }`}
                    >
                      {item.content}
                    </p>
                  </div>
                </motion.a>
              </FloatingCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-14 sm:py-20 lg:py-28">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          <SectionTopLine />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-4 block text-xs text-gold font-arabic sm:text-sm">أرسل رسالة</span>
              <h2 className="mb-5 text-3xl font-bold text-white font-arabic sm:mb-6 sm:text-4xl">
                دعنا <span className="text-gradient-gold">نتحدث</span>
              </h2>
              <p className="mb-6 text-sm leading-8 text-white/60 font-arabicBody sm:mb-8 sm:text-base">
                اكتب تفاصيل طلبك وسنجهز لك الرد المناسب بسرعة.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <StaggerContainer className="grid gap-4 md:grid-cols-2 md:gap-5" stagger={0.08} direction="up" delay={0.1}>
                  <div>
                    <label className="text-white/80 text-sm font-arabic mb-2 block">الاسم *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={contactInputClass}
                      placeholder="اكتب اسمك"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm font-arabic mb-2 block">البريد الإلكتروني</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={contactInputClass}
                      placeholder="example@email.com"
                    />
                  </div>
                </StaggerContainer>

                <StaggerContainer className="grid gap-4 md:grid-cols-2 md:gap-5" stagger={0.08} direction="up" delay={0.25}>
                  <div>
                    <label className="text-white/80 text-sm font-arabic mb-2 block">رقم الجوال *</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={contactInputClass}
                      placeholder="05XXXXXXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm font-arabic mb-2 block">الموضوع</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={contactInputClass}
                      placeholder="موضوع الرسالة"
                    />
                  </div>
                </StaggerContainer>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-white/80 text-sm font-arabic mb-2 block">الرسالة *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={contactTextareaClass}
                    placeholder="اكتب رسالتك هنا..."
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="h-12 w-full bg-gradient-gold px-6 text-sm font-semibold text-dark transition-all duration-300 hover:shadow-gold-lg font-arabic animate-glow-ring sm:w-auto sm:px-8 sm:text-base"
                  >
                    <MessageCircle className="w-5 h-5 ml-2" />
                    إرسال عبر واتساب
                  </Button>
                </motion.div>
              </form>

              <BoxDivider />

              <div className="mt-10">
                <h4 className="text-white font-bold mb-4 font-arabic">تابعنا</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-dark-700 text-white transition-all duration-300 sm:h-12 sm:w-12 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="relative h-64 overflow-hidden rounded-[26px] bg-dark-700 sm:h-72 lg:h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-5 text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-gold sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
                    <p className="text-base text-white font-arabic sm:text-lg">نخدم السعودية في {serviceAreasText}</p>
                    <a
                      href="https://maps.google.com/?q=Saudi+Arabia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline font-arabic mt-2 inline-block"
                    >
                      عرض على الخريطة
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                </div>
              </div>

              <BoxDivider />

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                <div className="glassmorphism-light rounded-2xl p-4 text-center sm:p-6">
                  <Star className="mx-auto mb-2 h-7 w-7 text-gold sm:h-8 sm:w-8" />
                  <span className="block text-xl font-bold text-white sm:text-2xl">4.9</span>
                  <span className="text-xs text-white/50 font-arabic sm:text-sm">تقييم العملاء</span>
                </div>
                <div className="glassmorphism-light rounded-2xl p-4 text-center sm:p-6">
                  <Users className="mx-auto mb-2 h-7 w-7 text-gold sm:h-8 sm:w-8" />
                  <span className="block text-xl font-bold text-white sm:text-2xl">5000+</span>
                  <span className="text-xs text-white/50 font-arabic sm:text-sm">عميل سعيد</span>
                </div>
                <div className="glassmorphism-light rounded-2xl p-4 text-center sm:p-6">
                  <Award className="mx-auto mb-2 h-7 w-7 text-gold sm:h-8 sm:w-8" />
                  <span className="block text-xl font-bold text-white sm:text-2xl">{yearsOfExcellence}</span>
                  <span className="text-xs text-white/50 font-arabic sm:text-sm">سنة خبرة</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-dark-800 py-14 sm:py-20 lg:py-28">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <SectionTopLine />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center sm:mb-14 lg:mb-16"
          >
            <span className="mb-4 block text-xs text-gold font-arabic sm:text-sm">الأسئلة الشائعة</span>
            <h2 className="text-3xl font-bold text-white font-arabic sm:text-4xl md:text-5xl">
              أسئلة <span className="text-gradient-gold">متكررة</span>
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism-light rounded-2xl p-4 sm:p-5 lg:p-6"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <ChevronLeft className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-bold text-white font-arabic sm:text-lg">{faq.question}</h3>
                    <p className="text-sm leading-7 text-white/60 font-arabicBody sm:text-base">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative">
          <SectionTopLine />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-5 text-3xl font-bold text-white font-arabic sm:mb-6 sm:text-4xl md:text-5xl">
              جاهز لحجز <span className="text-gradient-gold">مناسبتك؟</span>
            </h2>
            <p className="mb-8 text-sm leading-8 text-white/60 font-arabicBody sm:mb-10 sm:text-lg">
              احجز الآن ودعنا نهتم بكل تفاصيل الضيافة من البداية للنهاية.
            </p>
            <Button
              asChild
              className="h-12 bg-gradient-gold px-8 text-base font-semibold text-dark transition-all duration-300 hover:shadow-gold-lg font-arabic sm:h-14 sm:px-10 sm:text-lg"
            >
              <Link to="/booking">
                احجز الآن
                <ChevronLeft className="w-5 h-5 mr-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
    </div>
  )
}

