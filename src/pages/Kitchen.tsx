import { useMemo, useState, type MouseEvent, type SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Camera,
  ChefHat,
  Clapperboard,
  Eye,
  Filter,
  Heart,
  Instagram,
  PartyPopper,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import RevealOnScroll from '@/components/RevealOnScroll'
import PageBackground from '@/components/PageBackground'
import { allPublicVideos, kitchenHeroVideo, menuImageSet, pickPublicImage, publicImages } from '@/data/publicMedia'

type KitchenVideo = {
  title: string
  src: string
}

type GalleryCategory = 'events' | 'food' | 'buffet' | 'behind'
type GalleryFilter = 'all' | GalleryCategory

type GalleryItem = {
  id: number
  category: GalleryCategory
  src: string
  title: string
  likes: number
}

type GalleryDisplayItem = GalleryItem & {
  rank: number
}


const FALLBACK_IMAGE = pickPublicImage(0)
const kitchenBackgroundImages = [menuImageSet.fruitSalad]

const featuredKitchenTitles = [
  'كواليس التحضير',
  'تجهيزات المطبخ',
  'لمسات التقديم',
  'مشهد خدمة',
  'تفاصيل التنفيذ',
  'تحضير يومي',
  'حركة الفريق',
  'مشهد ضيافة',
] as const

const kitchenVideos: KitchenVideo[] = allPublicVideos.map((src, index) => ({
  src,
  title: featuredKitchenTitles[index % featuredKitchenTitles.length],
}))

const kitchenVideoStats = [
  {
    label: 'طريقة العرض',
    value: 'تشغيل تلقائي',
    icon: Clapperboard,
    tone: 'from-gold/20 via-gold/10 to-transparent',
    accent: 'text-gold',
  },
  {
    label: 'التنقل',
    value: 'اختيار سريع',
    icon: Camera,
    tone: 'from-sky-500/20 via-sky-500/10 to-transparent',
    accent: 'text-sky-200',
  },
  {
    label: 'وضع التشغيل',
    value: 'صامت ومستمر',
    icon: Sparkles,
    tone: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    accent: 'text-emerald-200',
  },
] as const

const EMPTY_KITCHEN_VIDEO: KitchenVideo = {
  title: '',
  src: '',
}

const categories: { id: GalleryFilter; name: string }[] = [
  { id: 'all', name: 'الكل' },
  { id: 'events', name: 'المناسبات' },
  { id: 'buffet', name: 'البوفيه' },
  { id: 'food', name: 'الأطعمة' },
  { id: 'behind', name: 'خلف الكواليس' },
]

const rawGalleryItems: GalleryItem[] = [
  { id: 1, category: 'events', src: '/images/gallery-1.jpg', title: 'استقبال فاخر للمناسبات الرسمية', likes: 562 },
  { id: 2, category: 'events', src: '/images/gallery-2.jpg', title: 'ضيافة مؤتمرات واجتماعات الشركات', likes: 537 },
  { id: 3, category: 'buffet', src: '/images/about-image.jpg', title: 'بوفيه رئيسي بخيارات متنوعة', likes: 518 },
  { id: 4, category: 'buffet', src: '/images/gallery-4.jpg', title: 'ركن حلويات وضيافة راقٍ', likes: 491 },
  { id: 5, category: 'behind', src: '/images/gallery-5.jpg', title: 'داخل المطبخ أثناء وقت التجهيز', likes: 472 },
  { id: 6, category: 'events', src: '/images/gallery-6.jpg', title: 'بوفيه خارجي في الأجواء المفتوحة', likes: 556 },
  { id: 7, category: 'food', src: '/images/menu-mixed-grill.jpg', title: 'مشويات مشكلة طازجة', likes: 483 },
  { id: 8, category: 'food', src: '/images/menu-biryani.jpg', title: 'برياني دجاج محضّر بعناية', likes: 468 },
  { id: 9, category: 'food', src: '/images/menu-kunafa.jpg', title: 'كنافة نابلسية ساخنة', likes: 452 },
  { id: 10, category: 'food', src: '/images/menu-warak.jpg', title: 'ورق عنب للتقديمات الخاصة', likes: 439 },
  { id: 11, category: 'food', src: '/images/menu-juices.jpg', title: 'محطة العصائر الباردة', likes: 421 },
  { id: 12, category: 'food', src: '/images/menu-coffee.jpg', title: 'ركن القهوة العربية', likes: 405 },
  { id: 13, category: 'food', src: '/images/menu-tabbouleh.jpg', title: 'تبولة وسلطات طازجة', likes: 398 },
  { id: 14, category: 'food', src: '/images/menu-baklava.jpg', title: 'بقلاوة مشكلة للحلويات', likes: 387 },
  { id: 15, category: 'food', src: '/images/menu-ummali.jpg', title: 'أم علي بطابع شرقي', likes: 372 },
  { id: 16, category: 'food', src: '/images/menu-hummus.jpg', title: 'حمص بالطحينة للتقديمات', likes: 365 },
  { id: 17, category: 'buffet', src: '/images/gallery-moment-buffet-01.jpg', title: 'بوفيه ضيافة بتنسيق فاخر', likes: 578 },
  { id: 18, category: 'buffet', src: '/images/gallery-moment-buffet-02.jpg', title: 'طاولة حلويات للمناسبات الخاصة', likes: 544 },
  { id: 19, category: 'buffet', src: '/images/gallery-moment-buffet-03.jpg', title: 'تفاصيل سويتات وتارت للتقديم', likes: 517 },
  { id: 20, category: 'events', src: '/images/gallery-moment-event-01.jpg', title: 'تنسيق طاولات الاستقبال', likes: 496 },
  { id: 21, category: 'events', src: '/images/gallery-moment-event-02.jpg', title: 'قاعة ضيافة جاهزة لاستقبال الضيوف', likes: 472 },
  { id: 22, category: 'events', src: '/images/gallery-moment-event-03.jpg', title: 'تجهيزات أنيقة قبل بدء المناسبة', likes: 459 },
  { id: 23, category: 'behind', src: '/images/gallery-moment-behind-01.jpg', title: 'اللمسات الأخيرة قبل التقديم', likes: 434 },
  { id: 24, category: 'behind', src: '/images/gallery-moment-behind-02.jpg', title: 'تنسيق الأطباق داخل المطبخ', likes: 427 },
  { id: 25, category: 'behind', src: '/images/gallery-moment-behind-03.jpg', title: 'تحضير الأطباق بعناية عالية', likes: 418 },
  { id: 26, category: 'behind', src: '/images/gallery-moment-behind-04.jpg', title: 'فريقنا أثناء تجهيز الضيافة', likes: 446 },
  { id: 27, category: 'events', src: '/images/gallery-net-event-04.jpg', title: 'قاعة حفلات بإضاءة كلاسيكية', likes: 512 },
  { id: 28, category: 'events', src: '/images/gallery-net-event-05.jpg', title: 'أمسية خارجية مع جلسات ضيافة', likes: 547 },
  { id: 29, category: 'events', src: '/images/gallery-net-event-06.jpg', title: 'طاولات زفاف بلمسات وردية', likes: 523 },
  { id: 30, category: 'events', src: '/images/gallery-net-event-07.jpg', title: 'مساحة مناسبات بتنسيق دائري', likes: 506 },
  { id: 31, category: 'events', src: '/images/gallery-net-event-08.jpg', title: 'تنسيق خارجي أبيض للمناسبات النهارية', likes: 498 },
  { id: 32, category: 'buffet', src: '/images/gallery-net-buffet-04.jpg', title: 'محطة فواكه ومشروبات للضيافة', likes: 466 },
  { id: 33, category: 'buffet', src: '/images/gallery-net-buffet-05.jpg', title: 'بوفيه مقبلات خفيف للفعاليات', likes: 451 },
  { id: 34, category: 'buffet', src: '/images/gallery-net-buffet-06.jpg', title: 'تنسيق بوفيه عملي ومتكامل', likes: 479 },
  { id: 35, category: 'buffet', src: '/images/gallery-net-buffet-07.jpg', title: 'ركن دونات وحلويات للضيافة', likes: 438 },
  { id: 36, category: 'behind', src: '/images/gallery-net-behind-05.jpg', title: 'الشيف أثناء تجهيز طبق التقديم', likes: 421 },
  { id: 37, category: 'behind', src: '/images/gallery-net-behind-06.jpg', title: 'حركة الفريق داخل المطبخ', likes: 433 },
  { id: 38, category: 'behind', src: '/images/gallery-net-behind-07.jpg', title: 'تحضير الأصناف داخل محطة العمل', likes: 417 },
  { id: 39, category: 'behind', src: '/images/gallery-net-behind-08.jpg', title: 'لقطة بخار المطبخ أثناء الخدمة', likes: 409 },
  { id: 40, category: 'food', src: '/images/gallery-net-food-01.jpg', title: 'طبق مشاوي بتقديم فاخر', likes: 462 },
  { id: 41, category: 'food', src: '/images/gallery-net-food-02.jpg', title: 'تقديم مشويات مع خضار مشوية', likes: 474 },
]

const categoryOrder: GalleryCategory[] = ['events', 'buffet', 'food', 'behind']
const categoryMeta: Record<
  GalleryCategory,
  { label: string; icon: LucideIcon; tone: string; accent: string; summary: string }
> = {
  events: {
    label: 'المناسبات',
    icon: PartyPopper,
    tone: 'from-amber-500/20 via-gold/10 to-transparent',
    accent: 'text-amber-300',
    summary: 'تنسيق استقبال وضيافة بطابع أنيق.',
  },
  buffet: {
    label: 'البوفيه',
    icon: UtensilsCrossed,
    tone: 'from-sky-500/20 via-sky-500/10 to-transparent',
    accent: 'text-sky-200',
    summary: 'بوفيهات مرتبة ومحطات متنوعة.',
  },
  food: {
    label: 'الأطعمة',
    icon: ChefHat,
    tone: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    accent: 'text-emerald-200',
    summary: 'أطباق طازجة بتقديم فاخر.',
  },
  behind: {
    label: 'خلف الكواليس',
    icon: Clapperboard,
    tone: 'from-purple-500/20 via-purple-500/10 to-transparent',
    accent: 'text-purple-200',
    summary: 'كواليس التحضير والتنفيذ بدقة.',
  },
}

const orderedGalleryItems: GalleryDisplayItem[] = rawGalleryItems
  .slice()
  .sort((a, b) => {
    const orderA = categoryOrder.indexOf(a.category)
    const orderB = categoryOrder.indexOf(b.category)
    if (orderA !== orderB) return orderA - orderB
    return b.likes - a.likes
  })
  .map((item, index) => ({ ...item, rank: index + 1 }))

const galleryHighlights = [
  `${orderedGalleryItems.length} لقطة مرتبة`,
  'تصنيف ذكي حسب النوع',
  'بوفيهات ومناسبات راقية',
  'تفاصيل التحضير والتنفيذ',
  'عرض بصري سريع بالصور',
]

/*
const kitchenVideos: KitchenVideo[] = [
  {
    title: 'تحضير المكونات في مطبخ احترافي',
    src: 'https://player.vimeo.com/external/483985086.sd.mp4?s=e3442024a599de477e05ef4d4e77893769583f0c&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-preparing-ingredients-in-modern-professional-kitchen/b8f318dfd595e585d26e595c399fcbdb/',
  },
  {
    title: 'تجهيز الطبق النهائي داخل المطبخ',
    src: 'https://player.vimeo.com/external/483986161.sd.mp4?s=cd07ac44e92d97c335e68e42923666647467cf6e&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-preparing-dish-in-modern-professional-kitchen/1a894c486eaa7d493f7290474fd9d846/',
  },
  {
    title: 'تقطيع وتجهيز المكونات على لوح خشبي',
    src: 'https://player.vimeo.com/external/483984880.sd.mp4?s=11b0b691208ddcf4f13473750fe7e80cd920a7ea&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-preparing-ingredients-on-wooden-board-in-professional-kitchen/0ed6e88e03f8b684ff75ba872c8fc829/',
  },
  {
    title: 'تجهيز الشيف قبل بدء الخدمة',
    src: 'https://player.vimeo.com/external/483984453.sd.mp4?s=afd95b8e70ff5434bfe444dad6a08f93b55cde0c&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-preparing-for-work-in-professional-kitchen/50b321a4e9843db5b49126ac2514c2e7/',
  },
  {
    title: 'شيف تحضر طبقًا داخل مطبخ احترافي',
    src: 'https://player.vimeo.com/external/483985746.sd.mp4?s=6bc42aeec9c4587e272b422457bbda5c4f35e586&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/female-chef-preparing-cuisine-in-professional-kitchen/f27226723ab6ec7c04e501615a4e254b/',
  },
  {
    title: 'تعاون فريق الطهاة داخل مطبخ المطعم',
    src: 'https://player.vimeo.com/external/442836530.sd.mp4?s=7d8deb166f29469b5d1b3b4cd8e44038eacf7213&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/professional-chefs-collaborating-in-modern-restaurant-kitchen/383c1bb61cfc85ce52a3e33c7f38edd4/',
  },
  {
    title: 'خط إنتاج فعلي داخل مطبخ تجاري',
    src: 'https://player.vimeo.com/external/515487469.sd.mp4?s=b9a288a5149499610e40ec64770f0d7c9b34f4a3&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/professional-chef-cooking-vegetables-in-industrial-kitchen/d19448c740c9a829b6aedffc339201bb/',
  },
  {
    title: 'تحضير اللحم باحتراف في محطة الطهي',
    src: 'https://player.vimeo.com/external/437502592.sd.mp4?s=c43d961e8e362351207d3b9102e337df2a21cbfe&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-skillfully-preparing-meat-in-professional-kitchen/2ef03dcd3f418510c42a917fcdfff965/',
  },
  {
    title: 'تزيين طبق اللحم بالأعشاب',
    src: 'https://player.vimeo.com/external/388080475.sd.mp4?s=ff4c286949acac9bc0e64d2c25554c22e9f16e7d&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-garnishing-meat-dish-with-fresh-herbs-in-restaurant-kitchen/1196ed9c02f651bb1e7b5a5f2a0714f9/',
  },
  {
    title: 'شيف يضع اللحم على الشواية',
    src: 'https://player.vimeo.com/external/388079717.sd.mp4?s=b8bd0f3e030a48091b0ed340881d635ff7299d14&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-placing-bacon-strip-on-grill-in-busy-restaurant-kitchen/3117b4919a049a0707afe843ed4e4df7/',
  },
  {
    title: 'تحضير منزلي منظم داخل المطبخ',
    src: 'https://player.vimeo.com/external/372465205.sd.mp4?s=cc83244bfc085154791a4332ff3eaa422ad78052&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/family-enjoying-cooking-together-in-modern-kitchen/60da490ffd4c56e91aeba81ca758fa2d/',
  },
  {
    title: 'تشغيل فريق داخل مطبخ تجاري',
    src: 'https://player.vimeo.com/progressive_redirect/playback/869436127/rendition/240p/file.mp4?loc=external&oauth2_token_id=1223210874&signature=23b8e7ec58b0f9b2e5d7e7a0f6842278295e3680626dad1c589dd0b9eb77036f',
    source: 'https://pikwizard.com/video/professional-chefs-working-in-commercial-kitchen-atmosphere/af5367c9f24b858122899f9f24de0099/',
  },
  {
    title: 'تقطيع الخضار أثناء التحضير',
    src: 'https://player.vimeo.com/progressive_redirect/playback/1126398700/rendition/240p/file.mp4?loc=external&oauth2_token_id=1223210874&signature=4ed479a59dd0b3b3e26a8d3875a4ba0ac30068a07e9149ea269ed8aba5cfabe8',
    source: 'https://pikwizard.com/video/chef-slicing-vegetables-with-digital-overlay-in-modern-kitchen/2d6352c70095f7abc4bbe2e9425a0444/',
  },
  {
    title: 'عرض أطباق جاهزة بعد التحضير',
    src: 'https://player.vimeo.com/progressive_redirect/playback/1128493918/rendition/240p/file.mp4?loc=external&oauth2_token_id=1223210874&signature=320bc80a756b0c636a47aae59d4c913d5eebe6c14e9091d47ab506cb1252b06a',
    source: 'https://pikwizard.com/video/chef-displaying-delicious-culinary-creations-in-rustic-kitchen/83c0e29b8380519e77c3dcd4994b56fc/',
  },
  {
    title: 'لقطة كاترينج وطهي مباشر',
    src: 'https://player.vimeo.com/progressive_redirect/playback/1158698042/rendition/240p/file.mp4%20%28240p%29.mp4?loc=external&oauth2_token_id=1223210874&signature=8995ca8533419e947a426ea29032d542699b13e416ee4c7c621a4577b94ca387',
    source: 'https://pikwizard.com/video/chef-cooking-on-backyard-griddle-smoke-rising-outdoor-catering-footage/cedcfd176c4fdd8cd01cf8093b7edf5b/',
  },
  {
    title: 'شيف يقلب الخضار داخل مطبخ منزلي',
    src: 'https://player.vimeo.com/external/345210575.sd.mp4?s=d8451280c5a5e3b858bfcc0a8bec8daa80e649d7&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-cooking-in-home-kitchen-with-vegetable-tossing/aaae6482d59f99768f65f4f1a6818cb3/',
  },
  {
    title: 'قلي سريع داخل ووك في المطبخ',
    src: 'https://player.vimeo.com/external/345222139.sd.mp4?s=7df48238dc22148c6783e806b194c7176ada4d23&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/cook-frying-food-in-wok-in-home-kitchen/ed7d9086f5885b8dc87f9ff090523d47/',
  },
  {
    title: 'تنسيق وتقديم الأطباق من مطبخ المطعم',
    src: 'https://player.vimeo.com/external/437501934.sd.mp4?s=6c117391137bd595db364360d11ac0ea78cb8611&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chefs-and-waitress-serving-dishes-in-restaurant-kitchen/ed07f9dbf4f58478f84e7860f8578d79/',
  },
  {
    title: 'شيف يطهو باستخدام أدوات مطبخ حديثة',
    src: 'https://player.vimeo.com/progressive_redirect/playback/1167781395/rendition/240p/file.mp4%20%28240p%29.mp4?loc=external&oauth2_token_id=1223210874&signature=7ca858da327aeaea645e5a293adb3ea2b7d6e073e1de09852c0bb30c76b2c423',
    source: 'https://pikwizard.com/video/chef-cooking-with-smart-glasses-in-restaurant-kitchen/2f8b1521ff43b9e3b8f0cb00a29eb45e/',
  },
  {
    title: 'استعراض مهارة الشيف أثناء القلي',
    src: 'https://player.vimeo.com/external/345210594.sd.mp4?s=9afe54d2e0ddf1a3f38acc7c2c7e5ce70ae0010f&profile_id=139&oauth2_token_id=1223210874',
    source: 'https://pikwizard.com/video/chef-frying-food-in-wok-and-throwing-ingredients/68f9b7ef53afde666e6a2fd84842d144/',
  },
]
*/

/*
const localImageNames = [
  'gallery-1.jpg',
  'gallery-2.jpg',
  'gallery-3.jpg',
  'gallery-4.jpg',
  'gallery-5.jpg',
  'gallery-6.jpg',
  'about-image.jpg',
  'WhatsApp Image 2026-03-06 at 11.47.07 PM (1).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.07 PM.jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.08 PM (1).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.08 PM (2).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.08 PM (3).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.08 PM.jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.09 PM (1).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.09 PM (2).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.09 PM (3).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.09 PM.jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.10 PM (1).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.10 PM (2).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.10 PM (3).jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.10 PM.jpeg',
  'WhatsApp Image 2026-03-06 at 11.47.11 PM.jpeg',
]

const kitchenImages = Array.from(new Set(localImageNames.map((name) => encodeURI(`/images/${name}`))))
*/

const kitchenImages =
  orderedGalleryItems.length > 0
    ? orderedGalleryItems.map((item) => item.src)
    : publicImages.length
      ? publicImages
      : [pickPublicImage(0)]
const stripItems = orderedGalleryItems.slice(0, 10)
const stripLoopItems = [...stripItems, ...stripItems.slice(4), ...stripItems.slice(0, 4)]
const STRIP_TRAVEL = stripItems.length * 304

export default function Kitchen() {
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState<GalleryFilter>('all')
  const [activeVideoSrc, setActiveVideoSrc] = useState(kitchenVideos[0]?.src ?? '')
  const [likedItems, setLikedItems] = useState<number[]>([])

  const filteredItems = useMemo(
    () =>
      activeCategory === 'all'
        ? orderedGalleryItems
        : orderedGalleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  const activeVideo = useMemo(
    () => kitchenVideos.find((video) => video.src === activeVideoSrc) ?? kitchenVideos[0] ?? null,
    [activeVideoSrc]
  )

  const toggleLike = (id: number, event?: MouseEvent) => {
    event?.stopPropagation()
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleVideoError = (src: string) => {
    setFailedVideos((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    if (target.dataset.fallbackApplied === '1') return
    target.dataset.fallbackApplied = '1'
    target.src = FALLBACK_IMAGE
  }

  const fallbackHeroSrc = kitchenHeroVideo
  const heroVideo =
    kitchenVideos[0] ??
    (fallbackHeroSrc
      ? {
          ...EMPTY_KITCHEN_VIDEO,
          src: fallbackHeroSrc,
          title: 'لقطة افتتاحية من داخل المطبخ',
        }
      : EMPTY_KITCHEN_VIDEO)
  const heroPoster = kitchenImages[0] ?? FALLBACK_IMAGE
  const activeVideoIndex = activeVideo ? kitchenVideos.findIndex((video) => video.src === activeVideo.src) : -1
  const activePoster =
    activeVideoIndex >= 0 && kitchenImages.length > 0
      ? kitchenImages[activeVideoIndex % kitchenImages.length] ?? heroPoster
      : heroPoster
  const isHeroBroken = !heroVideo.src || !!failedVideos[heroVideo.src]
  const isActiveVideoBroken = !activeVideo?.src || !!failedVideos[activeVideo.src]

  return (
    <div className="relative overflow-hidden bg-dark">
      <PageBackground images={kitchenBackgroundImages} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {isHeroBroken ? (
          <img
            src={heroPoster}
            alt="داخل المطبخ"
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
            onError={() => handleVideoError(heroVideo.src)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/85 via-dark/75 to-dark" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 text-gold text-sm font-arabic mb-5 bg-gold/10 border border-gold/30 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              كواليس تجهيزات النخبة
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-arabic leading-tight">
              فيديوهات وصور <span className="text-gradient-gold">داخل المطبخ</span>
            </h1>
            <p className="text-xl text-white/70 font-arabicBody mb-10">
              لقطات حقيقية توضح دقة التحضير وتنظيم الفريق من البداية حتى التقديم.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-gradient-gold text-dark hover:shadow-gold-lg font-arabic">
                <a href="#kitchen-videos">شاهد الفيديوهات</a>
              </Button>
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-dark font-arabic">
                <Link to="/booking">احجز مناسبتك</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id="kitchen-videos" className="py-20 bg-dark-800">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <span className="text-gold text-sm font-arabic mb-4 block">كل فيديوهات المطبخ من ملفات المشروع</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-arabic">
                عرض منظم لكل المقاطع <span className="text-gradient-gold">داخل المطبخ</span>
              </h2>
              <p className="mt-4 text-lg text-white/70 font-arabicBody leading-relaxed">
                جمعنا هنا كل الفيديوهات داخل معاينة رئيسية كبيرة وبطاقات سريعة، بحيث تقدر تفتح
                أي مقطع فورًا بدون مغادرة الصفحة.
              </p>
            </div>
          </RevealOnScroll>

          {kitchenVideos.length > 0 ? (
            <>
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_320px] xl:items-start">
                <RevealOnScroll>
                  <motion.article
                    layout
                    className="overflow-hidden rounded-[32px] border border-gold/20 bg-black/40 shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
                  >
                    <div className="relative aspect-video bg-black">
                      {isActiveVideoBroken ? (
                        <img
                          src={activePoster}
                          alt={activeVideo?.title ?? 'فيديو من داخل المطبخ'}
                          onError={handleImageError}
                          className="h-full w-full object-cover"
                        />
                        ) : (
                          <video
                            key={activeVideo?.src ?? 'featured-kitchen-video'}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={activePoster}
                            onError={() => activeVideo?.src && handleVideoError(activeVideo.src)}
                            className="h-full w-full object-cover"
                        >
                          {activeVideo?.src ? <source src={activeVideo.src} type="video/mp4" /> : null}
                        </video>
                      )}
                    </div>

                    <div className="p-5 sm:p-7">
                      <h3 className="text-2xl md:text-3xl font-bold text-white font-arabic">
                        {activeVideo?.title || 'فيديو من داخل المطبخ'}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm md:text-base text-white/70 font-arabicBody">
                        اختر أي بطاقة من المقاطع بالأسفل لتبديل المعاينة الرئيسية وتشغيل الفيديو مباشرة.
                      </p>
                    </div>
                  </motion.article>
                </RevealOnScroll>

                <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                  {kitchenVideoStats.map((stat, index) => {
                    const Icon = stat.icon

                    return (
                      <RevealOnScroll key={stat.label} delay={index * 0.05}>
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-dark-700/70 p-5">
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.tone} opacity-70`} />
                          <div className="relative flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-dark-900/70">
                              <Icon className={`h-6 w-6 ${stat.accent}`} />
                            </div>
                            <div>
                              <div className="text-sm text-white/60 font-arabic">{stat.label}</div>
                              <div className="mt-1 text-xl font-bold text-white font-arabic">{stat.value}</div>
                            </div>
                          </div>
                        </div>
                      </RevealOnScroll>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-gold/15 bg-white/5 px-5 py-4">
                <div className="text-sm text-white/70 font-arabicBody">
                  اختر أي بطاقة بالأسفل وسيتم تبديل المعاينة الرئيسية مباشرة.
                </div>
                <div className="rounded-full bg-gold/10 px-4 py-2 text-sm text-gold font-arabic">
                  تشغيل تلقائي بدون صوت
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {kitchenVideos.map((video, index) => {
                  const posterSrc =
                    kitchenImages.length > 0 ? kitchenImages[index % kitchenImages.length] : FALLBACK_IMAGE
                  const isBroken = !!failedVideos[video.src]
                  const isActive = activeVideo?.src === video.src

                  return (
                    <RevealOnScroll key={video.src} delay={Math.min(index * 0.03, 0.24)}>
                      <motion.button
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`شغل ${video.title}`}
                        onClick={() => setActiveVideoSrc(video.src)}
                        whileHover={{ y: -6 }}
                        whileTap={{ scale: 0.99 }}
                        className={`group overflow-hidden rounded-[28px] border text-right transition-all duration-300 ${
                          isActive
                            ? 'border-gold bg-gold/10 shadow-[0_24px_60px_rgba(212,175,55,0.16)]'
                            : 'border-white/10 bg-dark-700/55 hover:border-gold/40 hover:bg-dark-700/80'
                        }`}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-dark-900">
                          {isBroken ? (
                            <img
                              src={posterSrc}
                              alt={video.title}
                              onError={handleImageError}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              poster={posterSrc}
                              onError={() => handleVideoError(video.src)}
                              className={`h-full w-full object-cover transition-transform duration-500 ${
                                isActive ? 'scale-[1.02]' : 'group-hover:scale-105'
                              }`}
                            >
                                <source src={video.src} type="video/mp4" />
                              </video>
                            )}
                        </div>

                        <div className="p-4 sm:p-5">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-base sm:text-lg text-white font-arabic leading-snug">
                              {video.title}
                            </h3>
                            {isActive ? (
                              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-200 font-arabic">
                                يعرض الآن
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </motion.button>
                    </RevealOnScroll>
                  )
                })}
              </div>
            </>
          ) : (
            <RevealOnScroll>
              <div className="rounded-3xl border border-white/10 bg-dark-700/60 p-8 text-center text-white/70 font-arabicBody">
                لا توجد فيديوهات حاليًا.
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <section className="py-12 bg-dark overflow-hidden border-y border-gold/10">
        <div className="container-custom px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center justify-center gap-2 text-gold font-arabic">
            <Camera className="w-5 h-5" />
            لمحات سريعة من داخل المطبخ
          </div>
        </div>

        <motion.div
          className="flex gap-4 w-max px-4"
          animate={{ x: [0, -STRIP_TRAVEL] }}
          transition={{ duration: 42, ease: 'linear', repeat: Infinity }}
        >
          {stripLoopItems.map((item, index) => {
            const meta = categoryMeta[item.category]
            const Icon = meta.icon

            return (
              <div
                key={`${item.id}-${index}`}
                className="relative w-72 h-44 rounded-2xl overflow-hidden border border-gold/20 bg-dark-700/70 p-4"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  onError={handleImageError}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.tone} opacity-60`} />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-dark-900/70 border border-white/10 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${meta.accent}`} />
                    </div>
                    <span className="text-xs text-white/60 font-arabic">{meta.label}</span>
                  </div>
                  <div className="text-sm text-white font-arabic leading-snug">{item.title}</div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-gold/70" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.likes + 320}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </section>

      <section id="kitchen-gallery" className="py-20 bg-black/70">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <span className="text-gold text-sm font-arabic mb-4 block">عرض التجارب</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">
              لحظات من <span className="text-gradient-gold">تجاربنا</span>
            </h2>
            <p className="text-lg text-white/70 font-arabicBody leading-relaxed">
              من تنسيق القاعات والبوفيهات الراقية إلى تفاصيل التحضير داخل المطبخ، رتبنا المحتوى
              في بطاقات بصرية وصور حقيقية مرتبة حسب النوع لتشوف التفاصيل بسهولة ووضوح.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {galleryHighlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-gold/20 bg-white/5 px-4 py-2 text-sm text-white/75 font-arabic backdrop-blur-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-center gap-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-white/5 px-4 py-2 text-sm text-white/70 font-arabic backdrop-blur-sm">
              <Filter className="w-4 h-4 text-gold" />
              اختر الفئة التي تريد استعراضها
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-6 py-2 font-arabic transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-gold text-dark'
                      : 'bg-dark-700 text-white/70 hover:bg-dark-600 hover:text-white'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filteredItems.map((item, index) => {
                const meta = categoryMeta[item.category]
                const Icon = meta.icon
                const isLiked = likedItems.includes(item.id)
                const displayLikes = item.likes + (isLiked ? 1 : 0)

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ duration: 0.35, delay: index * 0.02 }}
                    className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-dark-800/70 shadow-[0_18px_35px_rgba(0,0,0,0.35)]"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        onError={handleImageError}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/35 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${meta.tone} opacity-60`} />
                      <div className="absolute top-3 right-3 text-xs text-gold/80 font-arabic">#{item.rank}</div>
                      <span className="absolute bottom-3 right-3 rounded-full bg-dark/70 px-3 py-1 text-xs text-white/80 font-arabic">
                        {meta.label}
                      </span>
                    </div>

                    <div className="relative p-5 sm:p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-dark-900/70 border border-white/10 flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${meta.accent}`} />
                        </div>
                        <h3 className="text-base sm:text-lg text-white font-arabic leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm text-white/60 font-arabicBody leading-relaxed">
                        {meta.summary}
                      </p>

                      <div className="mt-5 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                      <div className="mt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(event) => toggleLike(item.id, event)}
                          aria-pressed={isLiked}
                          className="flex items-center gap-1 text-white/70 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="text-sm">{displayLikes}</span>
                        </button>
                        <span className="flex items-center gap-1 text-white/60">
                          <Eye className="w-5 h-5" />
                          <span className="text-sm">{item.likes + 320}</span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a
              href="https://instagram.com/elite_for_outside_catering_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-arabic hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-6 h-6" />
              تابعنا على إنستقرام
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-dark-800 border-t border-gold/10">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <Clapperboard className="w-10 h-10 text-gold mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">
                هل لديك فيديوهات مطبخ <span className="text-gradient-gold">إضافية</span>؟
              </h2>
              <p className="text-white/65 text-lg font-arabicBody mb-8">
                أرسل الروابط وسنضيفها مباشرة في الصفحة.
              </p>
              <Button asChild className="bg-gradient-gold text-dark hover:shadow-gold-lg font-arabic font-semibold px-8 py-6">
                <Link to="/contact">أرسل الروابط</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

    </motion.div>
    </div>
  )
}

