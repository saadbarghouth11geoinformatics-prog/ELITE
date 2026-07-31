import { menuImageSet } from '@/data/publicMedia'
import { serviceAreas, serviceAreasText, yearsOfExcellence } from '@/data/companyProfile'

export const siteConfig = {
  siteUrl: 'https://xn--mgbg1fxab.store',
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
    title: 'إيليت | النخبة للحفلات والإعاشة',
    description:
      `خدمات إعاشة وضيافة فاخرة للحفلات والمناسبات في السعودية داخل ${serviceAreasText}. بوفيهات مفتوحة، قوائم طعام متنوعة، وتنظيم احترافي.`,
  },
  '/about': {
    title: 'من نحن | إيليت',
    description: `تعرف على خبرة النخبة في تنظيم الحفلات وخدمات الإعاشة لأكثر من ${yearsOfExcellence} عامًا.`,
  },
  '/services': {
    title: 'خدماتنا | إيليت للحفلات',
    description:
      'خدمات إعاشة متكاملة لحفلات الزفاف والمناسبات الخاصة والشركات والبوفيه المفتوح.',
  },
  '/menu': {
    title: 'قائمة الطعام | إيليت',
    description:
      'معرض صور من قائمة الطعام للتصفح السريع، بينما اختيار الأصناف والحجز يتم من المنيو التفصيلي.',
  },
  '/menu-pages': {
    title: 'ألبوم المنيو | إيليت',
    description: 'تصفح أحدث منيوهات وباقات بوفيه إيليت للحفلات الخارجية وخيارات الطعام والضيافة للمناسبات.',
  },
  '/menu-text': {
    title: 'المنيو التفصيلي | إيليت',
    description: 'قائمة تفصيلية سريعة لخيارات الطعام المناسبة لحفلتك القادمة.',
  },
  '/kitchen': {
    title: 'تجهيز البوفيهات | إيليت',
    description: 'صور وفيديوهات تجهيز بوفيهات المناسبات وتنسيق طاولات الضيافة من فريق إيليت للحفلات والإعاشة.',
  },
  '/booking': {
    title: 'احجز الآن | إيليت',
    description: 'اطلب حجز بوفيه أو خدمات إعاشة وضيافة لحفلتك في جدة ومكة والطائف واحصل على عرض يناسب مناسبتك.',
  },
  '/contact': {
    title: 'تواصل معنا | إيليت',
    description: `تواصل معنا للحجز والاستفسارات وخدمات الإعاشة في السعودية داخل ${serviceAreasText}.`,
  },
}

export const getSiteUrl = () => {
  const envUrl = import.meta.env.VITE_SITE_URL
  if (envUrl) return envUrl.replace(/\/+$/, '')
  return siteConfig.siteUrl
}

export const buildUrl = (path: string) => {
  const base = getSiteUrl()
  if (!path) return base
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalizedPath}` : normalizedPath
}
