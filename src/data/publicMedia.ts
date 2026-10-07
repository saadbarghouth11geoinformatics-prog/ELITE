import {
  allPublicVideoPaths,
  breakfastImagePaths as generatedBreakfastImagePaths,
  breakfastVideoPaths as generatedBreakfastVideoPaths,
  latestImagePaths as generatedLatestImagePaths,
  latestVideoPaths as generatedLatestVideoPaths,
  newestVideoPaths as generatedNewestVideoPaths,
} from './generated/publicMediaManifest'

const newestWorkTitles = [
  'تجهيز الضيافة بأناقة',
  'تفاصيل بوفيه المناسبات',
  'لمسات التقديم الأخيرة',
  'تنسيق طاولة البوفيه',
  'كواليس التجهيز الاحترافي',
  'جاهزية المكان لاستقبال الضيوف',
] as const

export const newestWorkVideos = generatedNewestVideoPaths.map((src, index) => ({
  src,
  title: newestWorkTitles[index] ?? `من أحدث أعمال إيليت ${index + 1}`,
  uploadDate: '2026-10-07',
}))

const newMediaImageNames = [
  'WhatsApp Image 2026-03-17 at 10.47.27 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.16 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.16 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.16 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.22 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.23 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.23 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.23 PM (3).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.23 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.24 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.24 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.24 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.37 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.37 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.37 PM (3).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.37 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM (3).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM (4).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.39 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.39 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.39 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 11.16.03 PM.jpeg',
] as const

const newMediaVideoNames = [
  'WhatsApp Video 2026-03-17 at 10.40.27 PM.mp4',
  'WhatsApp Video 2026-03-17 at 10.40.41 PM.mp4',
  'WhatsApp Video 2026-03-17 at 10.48.39 PM.mp4',
  'WhatsApp Video 2026-03-17 at 11.02.42 PM.mp4',
  'WhatsApp Video 2026-03-17 at 11.12.05 PM.mp4',
  'WhatsApp Video 2026-03-17 at 11.12.16 PM.mp4',
  'WhatsApp Video 2026-03-17 at 11.12.27 PM.mp4',
] as const

const legacyHeroVideoNames = [
  'WhatsApp Video 2026-03-15 at 3.43.13 AM.mp4',
  'WhatsApp Video 2026-03-15 at 3.47.50 AM.mp4',
  'WhatsApp Video 2026-03-15 at 4.05.55 AM.mp4',
  'WhatsApp Video 2026-03-15 at 5.00.45 PM.mp4',
  'WhatsApp Video 2026-03-15 at 5.04.25 PM.mp4',
  'WhatsApp Video 2026-03-15 at 5.04.23 PM.mp4',
  'WhatsApp Video 2026-03-15 at 5.04.21 PM.mp4',
  'WhatsApp Video 2026-03-15 at 5.04.20 PM.mp4',
] as const

const legacyBreakfastImageNames = [
  'WhatsApp Image 2026-03-17 at 10.48.16 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.16 PM (2).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.16 PM.jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.23 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM (1).jpeg',
  'WhatsApp Image 2026-03-17 at 10.48.38 PM.jpeg',
] as const

export type GalleryMediaItem =
  | {
      type: 'image'
      src: string
    }
  | {
      type: 'video'
      src: string
      poster: string
    }

const toNewMediaPath = (name: string) => encodeURI(`/images/New images/${name}`)
const toLatestMediaPath = (name: string) => encodeURI(`/images/New/${name}`)
const toPublicImagePath = (name: string) => encodeURI(`/images/${name}`)

export const latestMenuImageSet = {
  buffet15: toLatestMediaPath('WhatsApp Image 2026-07-19 at 10.51.02 PM.jpeg'),
  buffet15Alternative: toLatestMediaPath('WhatsApp Image 2026-07-19 at 10.51.03 PM (1).jpeg'),
  externalCatering: toLatestMediaPath('WhatsApp Image 2026-07-19 at 10.51.03 PM.jpeg'),
  buffet80: toLatestMediaPath('WhatsApp Image 2026-07-19 at 11.14.59 PM.jpeg'),
  buffet70: toLatestMediaPath('WhatsApp Image 2026-07-19 at 11.15.00 PM.jpeg'),
} as const

const nonPublicLatestImages = new Set<string>([
  toLatestMediaPath('WhatsApp Image 2026-07-19 at 11.15.00 PM (1).jpeg'),
])
const latestMenuImagePaths = new Set<string>(Object.values(latestMenuImageSet))
export const latestEventImages = generatedLatestImagePaths.filter(
  (src) => !latestMenuImagePaths.has(src) && !nonPublicLatestImages.has(src)
)
export const latestPublicVideos = [...generatedLatestVideoPaths]
const newestVideoSet = new Set<string>(generatedNewestVideoPaths)

const legacyPublicImages = newMediaImageNames.map((name) => toNewMediaPath(name))
export const publicImages = [...latestEventImages, ...legacyPublicImages]
export const publicVideos = newMediaVideoNames.map((name) => toNewMediaPath(name))
const latestVideoSet = new Set<string>(latestPublicVideos)
export const allPublicVideos = [
  ...latestPublicVideos,
  ...allPublicVideoPaths.filter((src) => !latestVideoSet.has(src) && !newestVideoSet.has(src)),
]
export const legacyBreakfastImages = legacyBreakfastImageNames.map((name) => toNewMediaPath(name))
export const breakfastGalleryImages = [...legacyBreakfastImages, ...generatedBreakfastImagePaths]
export const breakfastGalleryVideos = [...generatedBreakfastVideoPaths]
const breakfastPosterPool = breakfastGalleryImages.length > 0 ? breakfastGalleryImages : publicImages
export const breakfastGalleryMedia: GalleryMediaItem[] = [
  ...breakfastGalleryImages.map((src) => ({ type: 'image' as const, src })),
  ...breakfastGalleryVideos.map((src, index) => ({
    type: 'video' as const,
    src,
    poster:
      breakfastPosterPool.length === 0 ? '' : breakfastPosterPool[index % breakfastPosterPool.length],
  })),
]
const legacyHeroVideos = legacyHeroVideoNames.map((name) => toPublicImagePath(name))
export const heroVideoSet = {
  home: toNewMediaPath('WhatsApp Video 2026-03-17 at 11.02.42 PM.mp4'),
  menu: toNewMediaPath('WhatsApp Video 2026-03-17 at 11.12.05 PM.mp4'),
  menuShowcase: toNewMediaPath('WhatsApp Video 2026-03-17 at 10.48.39 PM.mp4'),
  contact: toNewMediaPath('WhatsApp Video 2026-03-17 at 10.40.41 PM.mp4'),
  booking: toNewMediaPath('WhatsApp Video 2026-03-17 at 11.12.27 PM.mp4'),
  about: toNewMediaPath('WhatsApp Video 2026-03-17 at 11.12.16 PM.mp4'),
  services: toNewMediaPath('WhatsApp Video 2026-03-17 at 11.12.16 PM.mp4'),
  kitchen: legacyHeroVideos[1],
} as const
export const heroVideos = Object.values(heroVideoSet)
export const homeHeroVideo = heroVideoSet.home
export const menuHeroVideo = heroVideoSet.menu
export const menuShowcaseHeroVideo = heroVideoSet.menuShowcase
export const contactHeroVideo = heroVideoSet.contact
export const bookingHeroVideo = heroVideoSet.booking
export const aboutHeroVideo = heroVideoSet.about
export const servicesHeroVideo = heroVideoSet.services
export const kitchenHeroVideo = heroVideoSet.kitchen
export const breakfastMenuPreview = toNewMediaPath('breakfast-menu-preview.png')

export const pickPublicImage = (index: number) =>
  publicImages.length === 0 ? '' : publicImages[index % publicImages.length]

export const getRotatingBackgroundImages = () =>
  foodBackgroundImages.length > 0
    ? foodBackgroundImages
    : publicImages.length > 0
      ? publicImages
      : [pickPublicImage(0)]

export const getPublicImageSlice = (start: number, count: number) => {
  if (publicImages.length === 0 || count <= 0) return []
  return Array.from({ length: count }, (_, i) => publicImages[(start + i) % publicImages.length])
}

export const pickPublicVideo = (index: number) =>
  publicVideos.length === 0 ? '' : publicVideos[index % publicVideos.length]

export const pickHeroVideo = (index: number) =>
  heroVideos.length === 0 ? pickPublicVideo(index) : heroVideos[index % heroVideos.length]

export const menuImageSet = {
  hummus: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.23 PM (1).jpeg'),
  tabbouleh: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.37 PM (2).jpeg'),
  salad: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.37 PM (3).jpeg'),
  saladGreen: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.24 PM (1).jpeg'),
  grapeLeaves: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.39 PM.jpeg'),
  biryani: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.39 PM (1).jpeg'),
  friedChicken: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.22 PM.jpeg'),
  curry: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.24 PM.jpeg'),
  bechamel: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.24 PM (2).jpeg'),
  ummAli: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.23 PM (2).jpeg'),
  kunafa: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.16 PM.jpeg'),
  cakeSlices: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.23 PM (3).jpeg'),
  weddingCake: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.16 PM.jpeg'),
  fruitSalad: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.38 PM (1).jpeg'),
  fruitSaladAlt: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.38 PM.jpeg'),
} as const

export const serviceImageSet = {
  weddings: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.16 PM.jpeg'),
  privateEvents: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.23 PM (2).jpeg'),
  restaurants: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.23 PM (1).jpeg'),
  conferences: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.38 PM (4).jpeg'),
  openBuffet: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.39 PM.jpeg'),
  corporateCatering: toNewMediaPath('WhatsApp Image 2026-03-17 at 10.48.22 PM.jpeg'),
} as const

export const nonMenuImages = publicImages.filter(
  (image) => !Object.values(menuImageSet).includes(image)
)

export const pickNonMenuImage = (index: number) =>
  nonMenuImages.length === 0 ? pickPublicImage(index) : nonMenuImages[index % nonMenuImages.length]

export const foodBackgroundImages = nonMenuImages

export const pickFoodBackgroundImage = (index: number) =>
  foodBackgroundImages.length === 0
    ? pickPublicImage(index)
    : foodBackgroundImages[index % foodBackgroundImages.length]
