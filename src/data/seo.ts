import { menuImageSet } from '@/data/publicMedia'
import { serviceAreas, serviceAreasText, yearsOfExcellence } from '@/data/companyProfile'

export const siteConfig = {
  name: 'ELITE النخبة للحفلات والإعاشة',
  shortName: 'ELITE',
  description:
    `خدمات إعاشة وضيافة فاخرة للحفلات والمناسبات في السعودية داخل ${serviceAreasText}. بوفيهات مفتوحة وقوائم طعام متنوعة وتنظيم احترافي.`,
  keywords:
    `إعاشة, حفلات, مناسبات, بوفيه, ضيافة, السعودية, جدة, مكة, الطائف, أضم, المخواة, غميقة, تموين, كاترينج, قاعات`,
  lang: 'ar',
  locale: 'ar_SA',
  themeColor: '#0a0a0a',
  phone: '+966548823127',
  email: 'saadbarghouth11@gmail.com',
  addressLocality: 'جدة',
  addressCountry: 'SA',
  areaServed: ['المملكة العربية السعودية', ...serviceAreas],
  instagram: 'https://instagram.com/elite_for_outside_catering_',
  defaultImage: menuImageSet.weddingCake,
} as const

export type SeoRoute = {
  title: string
  description: string
  image?: string
  keywords?: string
}

export const routeSeo: Record<string, SeoRoute> = {
  '/': {
    title: 'ELITE النخبة للحفلات والإعاشة | ضيافة فاخرة في السعودية',
    description:
      `خدمات إعاشة وضيافة فاخرة للحفلات والمناسبات في السعودية داخل ${serviceAreasText}. بوفيهات مفتوحة، قوائم طعام متنوعة، وتنظيم احترافي.`,
  },
  '/about': {
    title: 'من نحن | ELITE النخبة للحفلات والإعاشة',
    description: `تعرف على خبرة النخبة في تنظيم الحفلات وخدمات الإعاشة لأكثر من ${yearsOfExcellence} عامًا.`,
  },
  '/services': {
    title: 'خدماتنا | ELITE النخبة للحفلات والإعاشة',
    description:
      'خدمات إعاشة متكاملة لحفلات الزفاف والمناسبات الخاصة والشركات والبوفيه المفتوح.',
  },
  '/menu': {
    title: 'قائمة الطعام | ELITE النخبة للحفلات والإعاشة',
    description:
      'معرض صور من قائمة الطعام للتصفح السريع، بينما اختيار الأصناف والحجز يتم من المنيو التفصيلي.',
  },
  '/menu-pages': {
    title: 'ألبوم المنيو | ELITE النخبة للحفلات والإعاشة',
    description: 'استعرض ألبوم صفحات المنيو الأصلية بالتقسيم الكامل قبل تصفح القائمة.',
  },
  '/menu-text': {
    title: 'المنيو التفصيلي | ELITE النخبة للحفلات والإعاشة',
    description: 'قائمة تفصيلية سريعة لخيارات الطعام المناسبة لحفلتك القادمة.',
  },
  '/kitchen': {
    title: 'داخل المطبخ | ELITE النخبة للحفلات والإعاشة',
    description: 'كواليس تجهيز الضيافة وفيديوهات من داخل المطبخ ومعرض لحظات العمل.',
  },
  '/booking': {
    title: 'احجز الآن | ELITE النخبة للحفلات والإعاشة',
    description: 'احجز خدمات الإعاشة بسهولة واحصل على عرض سريع يناسب مناسبتك.',
  },
  '/contact': {
    title: 'تواصل معنا | ELITE النخبة للحفلات والإعاشة',
    description: `تواصل معنا للحجز والاستفسارات وخدمات الإعاشة في السعودية داخل ${serviceAreasText}.`,
  },
}

export const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL
  if (envUrl) return envUrl.replace(/\/+$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

export const buildUrl = (path: string) => {
  const base = getSiteUrl()
  if (!path) return base
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalizedPath}` : normalizedPath
}
