import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ClipboardList, PhoneCall, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PageBackground from '@/components/PageBackground'
import { Button } from '@/components/ui/button'
import { menuImageSet } from '@/data/publicMedia'

const menuBackgrounds = [menuImageSet.weddingCake, menuImageSet.biryani]
const ORDER_DRAFT_KEY = 'elite_order_draft'

type MenuSection = {
  title: string
  items: string[]
  columns?: 1 | 2 | 3
}

type MenuBoard = {
  id: string
  title: string
  badge?: string
  description?: string
  sections: MenuSection[]
  notes?: string[]
  footer?: string
}

const menuBoards: MenuBoard[] = [
  {
    id: 'breakfast-menu',
    badge: 'فطور',
    title: 'منيو الفطور',
    description:
      'خيارات صباحية جاهزة للاجتماعات وضيافة المناسبات مع إمكانية تعديل التشكيلة حسب الطلب.',
    sections: [
      {
        title: 'الميني ساندوتش',
        items: [
          'تونة',
          'جبنة بيضاء',
          'جبنة شيدر',
          'مرتديلا دجاج',
          'ميني كلوب دجاج',
          'ديك رومي مدخن',
          'ميني ساندوتش برجر',
          'ميني ساندوتش دجاج',
        ],
      },
      {
        title: 'الكرواسون والمعجنات',
        items: [
          'كرواسون جبنة',
          'كرواسون زعتر',
          'كرواسون شوكليت',
          'كرواسون سادة',
          'ميني كرواسون',
          'ميني بيتزا',
          'تشكيلة من المخبوزات',
        ],
      },
      {
        title: 'الحلويات والفواكه',
        items: [
          'فواكه مقطعة',
          'تارت سوارية',
          'بيتي فور',
          'تمرية',
          'إنجليش كيك',
          'ميني بانكيك مشكل',
          'تشيز كيك كاسات',
          'بقلاوة',
        ],
      },
      {
        title: 'المشروبات الساخنة',
        items: ['شاي', 'نسكافيه'],
      },
      {
        title: 'المشروبات الباردة',
        items: ['عصير طبيعي (مانجو، أفوكادو، كوكتيل)', 'مياه معدنية'],
      },
    ],
    footer: 'مع إمكانية تغيير الأصناف',
  },
  {
    id: 'elite-outdoor',
    title: 'قائمة طعام إليت للحفلات الخارجية',
    description:
      'تقدم لكم شركة إليت مجموعة من الخيارات المتعددة من الأكل البوفيهات التي تناسب احتياجاتكم في جميع المناسبات.',
    sections: [
      {
        title: 'المقبلات والسلطات',
        columns: 2,
        items: [
          'سلطة بطاطس بالمايونيز',
          'سلطة بابا غنوج',
          'سلطة يونانية',
          'سلطة سيزر',
          'سلطة شمندر',
          'سلطة ذرة',
          'سلطة ورق عنب',
          'سلطة تونة',
          'سلطة حمص بالطحينة',
          'سلطة متبل باذنجان',
          'سلطة فتوش',
          'سلطة تبولة',
          'سلطة خضراء',
          'سلطة روسية',
          'سلطة مخللات مشكلة',
          'سلطة لبنة بالخيار',
        ],
      },
      {
        title: 'الأصناف الساخنة',
        columns: 2,
        items: [
          'مشويات مشكلة',
          'سمك وجمبري مقلي',
          'برياني لحم',
          'دجاج مغربي بالسمسم',
          'ستيك لحم بالخضار',
          'دجاج مع البطاطس بالفرن',
          'خضار مشكل مع اوصال لحم',
          'مكرونة بشاميل',
          'ازربياني دجاج',
          'داوود باشا',
          'كروكيت البطاطس',
          'دجاج محمر بالفرن',
          'لازانيا ايطالية',
          'مكرونة فتشيني',
          'محاشي مشكلة',
          'معجنات مشكلة',
          'خضار بالزبدة',
          'سمكة حارة بيروتية',
          'دجاج ماسالا هندي',
          'دجاج مسحب مع البطاطس',
        ],
      },
      {
        title: 'الحلويات',
        columns: 2,
        items: [
          'حلويات فرنسية',
          'كيك سواريه مشكل',
          'تارت تفاح',
          'ميني تارت',
          'تورته بلاك فورست',
          'عيش السرايا',
          'أم علي',
          'بسبوسة بالمكسرات',
          'كنافة بالقشطة',
          'تورته شيكولاتة',
          'كريم كراميل',
          'تورته الفواكه',
          'مهلبية بالمكسرات',
          'تورته الفراولة',
          'كيك اللوتس',
        ],
      },
    ],
    notes: [
      'تشكيلة من الفواكه الموسمية',
      'المشروبات الغازية + المياه المعدنية',
      'تشكيلة من الخبز العربي والفرنسي',
      'كيك العروسة 3 أدوار',
    ],
    footer: 'مع إمكانية تغير الأصناف',
  },
  {
    id: 'buffet-20',
    badge: 'عدد 20 شخص',
    title: 'بوفيه مفتوح',
    sections: [
      {
        title: 'المقبلات والسلطات',
        items: ['حمص بالطحينة', 'تبولة', 'فتوش', 'ورق عنب'],
      },
      {
        title: 'المأكولات الساخنة',
        items: [
          'مشويات مشكلة',
          'أرز برياني دجاج',
          'مكرونة بشاميل',
          'مكرونة فتشيني',
          'استيك لحم',
          'دجاج صيني',
        ],
      },
      {
        title: 'الحلويات',
        items: ['حلويات شرقية', 'كنافة قشطة', 'كيك فرنسي', 'شيز كيك'],
      },
      {
        title: 'المشروبات',
        items: ['مشروبات غازية 20', 'موية 20', 'هرم فواكه', 'عاملة نسائية'],
      },
    ],
    footer: 'مع إمكانية تغير الأصناف',
  },
  {
    id: 'buffet-50',
    badge: 'عدد 50 شخص',
    title: 'بوفيه مفتوح',
    sections: [
      {
        title: 'المقبلات والسلطات',
        items: ['حمص بالطحينة', 'تبولة', 'فتوش', 'سلطة خضراء', 'سلطة سيزر', 'ورق عنب'],
      },
      {
        title: 'المأكولات الساخنة',
        items: [
          'مشويات مشكلة',
          'سمك وجمبري',
          'أرز برياني دجاج',
          'مكرونة بشاميل',
          'ايدام داوود باشا',
          'محاشي مشكل',
        ],
      },
      {
        title: 'الحلويات',
        items: ['أم علي', 'كنافة قشطة', 'كيك فرنسي', 'شيز كيك', 'تورته شيكولاته'],
      },
      {
        title: 'المشروبات',
        items: ['مشروبات غازية 50', 'موية 50', 'هرم فواكه', 'عاملة نسائية'],
      },
    ],
    footer: 'مع إمكانية تغير الأصناف',
  },
  {
    id: 'buffet-70',
    badge: 'عدد 70 شخص',
    title: 'بوفيه مفتوح',
    sections: [
      {
        title: 'المقبلات والسلطات',
        items: [
          'حمص بالطحينة',
          'تبولة',
          'فتوش',
          'متبل باذنجان',
          'سلطة خضراء',
          'سلطة سيزر',
          'سلطة تونة',
          'ورق عنب',
        ],
      },
      {
        title: 'المأكولات الساخنة',
        items: [
          'مشويات مشكلة',
          'أرز ولحم زربيان',
          'أرز برياني دجاج',
          'مكرونة بشاميل',
          'ايدام داوود باشا',
          'محاشي مشكل',
          'دجاج صيني',
          'مكرونة فتشيني',
        ],
      },
      {
        title: 'الحلويات',
        items: [
          'أم علي',
          'كنافة قشطة',
          'كيك فرنسي',
          'شيز كيك',
          'تورته شيكولاته',
          'بسبوسة بالمكسرات',
          'حلويات شرقية',
        ],
      },
      {
        title: 'المشروبات',
        items: ['مشروبات غازية 70', 'موية 70', 'تورتة عروسة 3 دور', 'هرم فواكه', 'عاملة نسائية'],
      },
    ],
    footer: 'مع إمكانية تغير الأصناف',
  },
  {
    id: 'buffet-100',
    badge: 'عدد 100 شخص',
    title: 'بوفيه مفتوح',
    sections: [
      {
        title: 'المقبلات والسلطات',
        columns: 2,
        items: [
          'حمص بالطحينة',
          'تبولة',
          'فتوش',
          'متبل باذنجان',
          'سلطة خضراء',
          'سلطة سيزر',
          'سلطة تونة',
          'ورق عنب',
          'سلطة ذرة',
          'سلطة يونانية',
          'سلطة روسية',
        ],
      },
      {
        title: 'المأكولات الساخنة',
        columns: 2,
        items: [
          'مشويات مشكلة',
          'أرز ولحم زربيان',
          'أرز برياني دجاج',
          'مكرونة بشاميل',
          'ايدام داوود باشا',
          'محاشي مشكل',
          'دجاج صيني',
          'مكرونة فتشيني',
          'أرز صيني بالجمبري',
          'استيك لحم بالخضار',
          'مكرونة لازانيا',
          'معجنات مشكلة',
        ],
      },
      {
        title: 'الحلويات',
        columns: 2,
        items: [
          'أم علي',
          'كنافة قشطة',
          'كيك فرنسي',
          'شيز كيك',
          'تورته شيكولاته',
          'بسبوسة بالمكسرات',
          'حلويات شرقية',
          'كيك فراولة',
          'مهلبية',
          'تورته فواكه',
        ],
      },
      {
        title: 'المشروبات',
        items: ['مشروبات غازية 100', 'موية 100', 'تورتة عروسة 3 دور', 'هرم فواكه', 'عاملة نسائية'],
      },
    ],
    footer: 'مع إمكانية تغير الأصناف',
  },
  {
    id: 'gold-menu',
    title: 'القائمة الذهبية',
    sections: [
      {
        title: 'المقبلات والسلطات',
        columns: 2,
        items: [
          'بابا غنوج',
          'لبن بالخيار',
          'مخللات زيتون',
          'فتوش',
          'متبل',
          'حمص',
          'تبولة',
          'ورق عنب',
          'سلطة روسية',
          'سلطة ذرة',
          'سلطة فاصوليا',
          'سلطة يونانية',
          'سلطة تونة',
          'سلطة نيسواز',
        ],
      },
      {
        title: 'المأكولات الساخنة',
        columns: 2,
        items: [
          'مشويات مشكلة',
          'برياني دجاج',
          'سمك وجمبري',
          'لازانيا أورلي',
          'داوود باشا',
          'محاشي مشكل',
          'أرز صيني بالجمبري',
          'مكرونة بشاميل',
          'أرز صيادية',
          'قطع السمك',
          'سمك هامور مشوي',
          'دجاج صيني مع الخضار',
          'دجاج مشوي على الفحم',
          'خضار مشكل مع اوصال لحم',
          'أرز شرقي',
          'دجاج بالكريمة',
        ],
      },
      {
        title: 'الحلويات',
        columns: 2,
        items: [
          'كريم كراميل',
          'جاتوهات فرنسية',
          'فطيرة تفاح',
          'كيك فراولة',
          'كيك شوكولاته',
          'شيز كيك',
          'بلاك فورست',
          'بيتي فور',
          'ميني تارت',
          'كنافة بالقشطة',
          'حلويات شرقية',
          'بسبوسة بالمكسرات',
          'مهلبية',
          'جيلي',
          'موس',
          'تورتة الفواكه',
        ],
      },
      {
        title: 'المشروبات',
        items: ['مياه معدنية', 'مشروبات غازية'],
      },
      {
        title: 'الفواكه',
        items: ['هرم من فواكه الموسم'],
      },
      {
        title: 'الخدمة',
        items: ['صحون صيني', 'ملاعق', 'شوك', 'مناديل', 'سكاكين', 'خدمة نسائية مدربة'],
      },
      {
        title: 'هدية',
        items: ['تورتة عروسين 3 أدوار حسب الاختيار'],
      },
    ],
  },
  {
    id: 'silver-menu',
    title: 'القائمة الفضية',
    sections: [
      {
        title: 'المقبلات والسلطات',
        columns: 2,
        items: [
          'حمص',
          'تبولة',
          'متبل',
          'فتوش',
          'بابا غنوج',
          'تشكيلة ترشي مع الزيتون',
          'سلطة دجاج',
          'سلطة روسية',
          'سلطة ذرة',
          'سلطة خضراء',
          'سلطة الزيتون بالجبن',
          'سلطة كول سلو',
          'ورق عنب',
        ],
      },
      {
        title: 'المأكولات الساخنة',
        columns: 2,
        items: [
          'مشويات مشكلة',
          'برياني دجاج',
          'أرز صيادية بقطع السمك',
          'محاشي مشكلة',
          'داوود باشا',
          'أرز صيني بالجمبري',
          'لازانيا ايطالي',
          'خضار مشكل مع اوصال لحم',
          'دجاج محمر بالفرن',
          'معجنات مشكلة',
          'مكرونة بشاميل',
        ],
      },
      {
        title: 'الحلويات',
        columns: 2,
        items: [
          'تورته شوكولاته',
          'تورته فواكه',
          'بلاك فورست',
          'جاتوه سواريه مشكل',
          'كنافة بالقشطة',
          'بسبوسة بالمكسرات',
          'بقلاوة مشكلة',
          'كريم كراميل',
          'مهلبية',
          'أم علي',
        ],
      },
      {
        title: 'المشروبات',
        items: ['مياه معدنية', 'مشروبات غازية'],
      },
      {
        title: 'الفواكه',
        items: ['هرم من فواكه الموسم'],
      },
      {
        title: 'الخدمة',
        items: ['صحون صيني', 'ملاعق', 'شوك', 'مناديل', 'سكاكين', 'خدمة نسائية مدربة'],
      },
      {
        title: 'هدية',
        items: ['تورتة عروسين 3 أدوار حسب الاختيار'],
      },
    ],
  },
  {
    id: 'diamond-menu',
    title: 'القائمة الماسية 3',
    sections: [
      {
        title: 'المقبلات والسلطات',
        columns: 2,
        items: [
          'فتوش',
          'متبل',
          'حمص',
          'تبولة',
          'لبن بالخيار',
          'لبنة بالثوم',
          'ورق عنب',
          'سلطة جمبري',
          'سلطة تونة',
          'سلطة روسية',
          'سلطة نيسواز',
          'سلطة يونانية',
          'سلطة جزر ملفوف',
          'سلطة ذرة',
          'سلطة باذنجان',
          'سلطة خرشوف',
          'سلطة بطاطس بالمايونيز',
          'سلطة جبنة',
        ],
      },
      {
        title: 'المأكولات الساخنة',
        columns: 2,
        items: [
          'جمبري مقلي',
          'سمك هامور مقلي',
          'مشويات مشكلة',
          'برياني دجاج',
          'أرز ولحم زربيان',
          'مكرونة بشاميل',
          'سمك طحينة',
          'دجاج مغربي',
          'صيادية مع قطع السمك',
          'فخد خروف مع بطاطس بالفرن',
          'لازانيا ايطالي',
          'اسكالوب بانيه',
          'محاشي مشكلة',
          'دجاج بالكريمة',
          'مشبر لحم',
          'استيك لحم بالخضار',
          'دجاج مشوي على الفحم',
          'مكرونة فتشيني',
        ],
      },
      {
        title: 'الحلويات',
        columns: 2,
        items: [
          'كريم كراميل',
          'شيز كيك',
          'تراميسو',
          'كيك فراولة',
          'كيك شوكولاته',
          'حلويات فرنسية',
          'كنافة بالمكسرات',
          'بسبوسة بالمكسرات',
          'بلاك فورست',
          'جاتوه سواريه مشكل',
          'تورتة برنسيس',
          'ميني تارت',
          'حلويات عربية',
          'موس شوكولاتة',
          'عيش السرايا',
          'تورتة فواكه',
        ],
      },
    ],
  },
  {
    id: 'hotel-buffet',
    title: 'تجهيز بوفيه فندقي راقي',
    sections: [
      {
        title: 'يتضمن',
        items: ['مشويات', 'محاشي', 'مكرونات', 'معجنات', 'أكل صيني', 'مأكولات بحرية'],
      },
      {
        title: 'الإضافات',
        items: ['سلطات', 'مقبلات', 'الحلويات', 'الفواكه', 'مشروبات غازية', 'المياه'],
      },
    ],
  },
]

const getColumnClass = (columns: MenuSection['columns'] = 1) => {
  if (columns === 3) return 'columns-1 md:columns-2 xl:columns-3'
  if (columns === 2) return 'columns-1 md:columns-2'
  return 'columns-1'
}

const buildItemKey = (boardId: string, sectionTitle: string, item: string) =>
  `${boardId}::${sectionTitle}::${item}`

const MOBILE_BOARD_SCROLL_OFFSET = 112

export default function MenuText() {
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<Record<string, boolean>>({})
  const [activeBoardId, setActiveBoardId] = useState(menuBoards[0]?.id ?? '')
  const [shouldScrollToBoard, setShouldScrollToBoard] = useState(false)
  const activeBoardRef = useRef<HTMLDivElement | null>(null)

  const orderedItems = useMemo(
    () =>
      menuBoards.flatMap((board) =>
        board.sections.flatMap((section) =>
          section.items.map((item) => ({
            key: buildItemKey(board.id, section.title, item),
            label: item,
            boardTitle: board.title,
            sectionTitle: section.title,
          }))
        )
      ),
    []
  )

  const selectedItems = useMemo(
    () => orderedItems.filter((item) => selectedKeys[item.key]),
    [orderedItems, selectedKeys]
  )
  const selectedItemsPreview = useMemo(() => selectedItems.slice(0, 4), [selectedItems])
  const remainingSelectedCount = selectedItems.length - selectedItemsPreview.length

  const toggleSelection = (key: string) => {
    setSelectedKeys((prev) => {
      const next = { ...prev }
      if (next[key]) {
        delete next[key]
      } else {
        next[key] = true
      }
      return next
    })
  }

  const clearSelection = () => setSelectedKeys({})

  const activeBoard = menuBoards.find((board) => board.id === activeBoardId) ?? menuBoards[0]
  const activeBoardKeys = useMemo(
    () =>
      activeBoard
        ? activeBoard.sections.flatMap((section) =>
            section.items.map((item) => buildItemKey(activeBoard.id, section.title, item))
          )
        : [],
    [activeBoard]
  )
  const activeBoardSelectedCount = useMemo(
    () => activeBoardKeys.filter((key) => selectedKeys[key]).length,
    [activeBoardKeys, selectedKeys]
  )
  const allActiveBoardSelected = activeBoardSelectedCount === activeBoardKeys.length && activeBoardKeys.length > 0

  const isMobileMenuViewport = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches

  const scrollToActiveBoard = (behavior: ScrollBehavior = 'smooth') => {
    if (typeof window === 'undefined' || !activeBoardRef.current) {
      return
    }

    const top = activeBoardRef.current.getBoundingClientRect().top + window.scrollY - MOBILE_BOARD_SCROLL_OFFSET
    window.scrollTo({
      top: Math.max(top, 0),
      behavior,
    })
  }

  const handleBoardSelect = (boardId: string) => {
    const isSameBoard = boardId === activeBoardId
    setActiveBoardId(boardId)

    if (!isMobileMenuViewport()) {
      return
    }

    if (isSameBoard) {
      scrollToActiveBoard()
      return
    }

    setShouldScrollToBoard(true)
  }

  useEffect(() => {
    if (!shouldScrollToBoard || !isMobileMenuViewport()) {
      return
    }

    let nestedFrameId = 0
    const frameId = window.requestAnimationFrame(() => {
      nestedFrameId = window.requestAnimationFrame(() => {
        scrollToActiveBoard()
        setShouldScrollToBoard(false)
      })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      if (nestedFrameId) {
        window.cancelAnimationFrame(nestedFrameId)
      }
    }
  }, [activeBoardId, shouldScrollToBoard])

  const handleBookNow = () => {
    if (selectedItems.length === 0) {
      toast.error('اختر أصنافك أولاً')
      return
    }

    const items = selectedItems.map((item) => ({
      name: item.label,
      quantity: 1,
      price: 0,
    }))

    const draft = {
      items,
      total: 0,
      createdAt: Date.now(),
    }

    localStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(draft))
    toast.success('تم تجهيز طلبك من المنيو التفصيلي')
    navigate('/booking')
  }

  return (
    <div dir="rtl" className="relative min-h-screen bg-dark text-white">
      <PageBackground images={menuBackgrounds} />

      <section className="relative z-10 pt-14 pb-4 sm:pt-20 sm:pb-6">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[28px] border border-gold/30 bg-black/85 px-4 py-5 shadow-[0_18px_48px_rgba(0,0,0,0.6)] backdrop-blur-md sm:px-6 sm:py-8 md:px-10 md:py-12"
          >
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-[13px] text-gold font-arabic tracking-wide sm:px-4 sm:text-sm">
                <Sparkles className="h-4 w-4" />
                المنيو التفصيلي الرسمي
              </span>
              <h1 className="mt-4 text-[2rem] font-bold font-arabic leading-tight sm:text-4xl md:text-5xl">
                اختار أصنافك بسهولة
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90 font-arabicBody sm:text-base md:text-lg">
                اختار القائمة المناسبة، بعدها اختار الأصناف بالترتيب واحجز مباشرة. الأسعار حسب الاتفاق.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {menuBoards.map((board) => (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => handleBoardSelect(board.id)}
                  className={`flex min-h-[72px] w-full items-center justify-center rounded-[22px] border px-3 py-3 text-center text-[13px] leading-5 font-arabic transition sm:min-h-[78px] sm:px-4 sm:text-sm sm:leading-6 md:text-base ${
                    activeBoardId === board.id
                      ? 'border-gold bg-gold text-dark'
                      : 'border-gold/25 bg-dark-800/70 text-white/85 hover:border-gold/60 hover:text-gold'
                  }`}
                >
                  <span>{board.badge ? `${board.title} - ${board.badge}` : board.title}</span>
                </button>
              ))}
            </div>

            {activeBoard && (
              <motion.div
                key={`preview-${activeBoard.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-4 rounded-[22px] border border-gold/20 bg-[linear-gradient(145deg,rgba(212,175,55,0.1),rgba(16,16,16,0.94))] px-4 py-3 lg:hidden"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 text-right">
                    <p className="text-[11px] text-white/50 font-arabic">القائمة المختارة الآن</p>
                    <p className="mt-1 text-sm font-semibold text-white font-arabic leading-relaxed">
                      {activeBoard.badge ? `${activeBoard.title} - ${activeBoard.badge}` : activeBoard.title}
                    </p>
                    {activeBoard.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-6 text-white/60 font-arabicBody">
                        {activeBoard.description}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 border-gold/35 px-3 text-gold hover:bg-gold/10 font-arabic text-sm"
                    onClick={() => scrollToActiveBoard()}
                  >
                    عرض التفاصيل
                  </Button>
                </div>
              </motion.div>
            )}
            <p className="mt-3 text-center text-xs leading-6 text-white/65 font-arabicBody lg:hidden">
              بمجرد اختيار أي قائمة ستظهر تفاصيلها مباشرة بالأسفل، ويمكنك أيضًا استخدام زر عرض التفاصيل للوصول السريع.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 pb-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-[1500px]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="space-y-8">
              {activeBoard ? (
                (() => {
                const board = activeBoard
                const allBoardSelected = allActiveBoardSelected

                return (
                  <motion.div
                    key={board.id}
                    id={board.id}
                    ref={activeBoardRef}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-[24px] border border-gold/20 bg-dark-900/95 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                  >
                    <div className="px-6 py-8 md:px-10 md:py-10">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          {board.badge && (
                            <span className="inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-base font-arabic font-semibold text-dark">
                              {board.badge}
                            </span>
                          )}
                          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold font-arabic text-white">
                            {board.title}
                          </h2>
                          {board.description && (
                            <p className="mt-2 text-base md:text-lg text-white/85 font-arabicBody max-w-3xl leading-relaxed">
                              {board.description}
                            </p>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          className="border-gold/40 text-gold hover:bg-gold/10 font-arabic text-sm md:text-base"
                          onClick={() => {
                            setSelectedKeys((prev) => {
                              const next = { ...prev }
                              if (allActiveBoardSelected) {
                                activeBoardKeys.forEach((key) => {
                                  delete next[key]
                                })
                              } else {
                                activeBoardKeys.forEach((key) => {
                                  next[key] = true
                                })
                              }
                              return next
                            })
                          }}
                        >
                          {allBoardSelected ? 'إلغاء تحديد القائمة' : 'تحديد كل الأصناف'}
                        </Button>
                      </div>

                      <div className="mt-6 grid gap-6">
                        {board.sections.map((section) => (
                          <div key={`${board.id}-${section.title}`} className="rounded-2xl border border-gold/25 bg-dark-800/85 p-6 md:p-7">
                            <div className="inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-base font-arabic font-semibold text-dark">
                              {section.title}
                            </div>
                            <div className={`mt-5 ${getColumnClass(section.columns)} gap-5`}>
                              {section.items.map((item, index) => {
                                const key = buildItemKey(board.id, section.title, item)
                                const isSelected = !!selectedKeys[key]
                                return (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => toggleSelection(key)}
                                    className={`mb-3 flex w-full break-inside-avoid items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-right transition ${
                                      isSelected
                                        ? 'border-gold bg-gold/15 text-white shadow-[0_0_0_1px_rgba(212,175,55,0.25)]'
                                        : 'border-white/10 bg-dark-700/80 text-white hover:border-gold/50 hover:bg-dark-700/90'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-xs font-bold text-gold">
                                        {index + 1}
                                      </span>
                                      <span className="text-[15px] sm:text-base md:text-lg font-arabicBody leading-relaxed">{item}</span>
                                    </div>
                                    <span
                                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                                        isSelected ? 'border-gold bg-gold text-dark' : 'border-white/30 text-white/60'
                                      }`}
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                    </span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {board.notes && (
                        <div className="mt-6 rounded-2xl border border-gold/20 bg-dark-800/85 p-6 md:p-7">
                          <h3 className="text-gold font-arabic font-semibold">الإضافات</h3>
                          <div className="mt-3 grid gap-2 text-white/90 font-arabicBody text-sm sm:text-base">
                            {board.notes.map((note) => (
                              <div key={note}>* {note}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {board.footer && (
                        <div className="mt-6 text-center text-gold font-arabic font-semibold text-base md:text-lg">
                          {board.footer}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })()
              ) : null}
            </div>

            <aside className="h-fit rounded-[24px] border border-gold/30 bg-black/90 p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.55)] lg:sticky lg:top-24">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <ClipboardList className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white font-arabic">ملخص الاختيار</h3>
                  <p className="text-sm text-white/70 font-arabicBody">الأسعار حسب الاتفاق</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gold/20 bg-dark-800/85 p-5">
                <div className="flex items-center justify-between text-base font-arabic">
                  <span className="text-white/80">عدد الأصناف المختارة</span>
                  <span className="text-gold font-bold">{selectedItems.length}</span>
                </div>
                <div className="mt-4 max-h-[40vh] space-y-3 overflow-auto lg:max-h-[48vh]">
                  {selectedItems.length === 0 ? (
                    <div className="text-center text-white/60 font-arabicBody">لم يتم اختيار أصناف بعد</div>
                  ) : (
                    <>
                      <div className="space-y-3 lg:hidden">
                        {selectedItemsPreview.map((item, index) => (
                          <div key={item.key} className="rounded-xl border border-gold/15 bg-dark-700/70 p-3">
                            <div className="flex items-center gap-2 text-gold text-xs font-arabic">
                              <span>#{index + 1}</span>
                              <span className="text-white/70">{item.sectionTitle}</span>
                            </div>
                            <div className="mt-1 text-white font-arabicBody text-sm leading-relaxed">{item.label}</div>
                            <div className="mt-1 text-[11px] text-white/50 font-arabic">{item.boardTitle}</div>
                          </div>
                        ))}
                        {remainingSelectedCount > 0 && (
                          <div className="text-center text-xs text-white/70 font-arabicBody">
                            +{remainingSelectedCount} عنصر إضافي
                          </div>
                        )}
                      </div>
                      <div className="hidden space-y-3 lg:block">
                        {selectedItems.map((item, index) => (
                          <div key={item.key} className="rounded-xl border border-gold/15 bg-dark-700/70 p-3">
                            <div className="flex items-center gap-2 text-gold text-xs font-arabic">
                              <span>#{index + 1}</span>
                              <span className="text-white/70">{item.sectionTitle}</span>
                            </div>
                            <div className="mt-1 text-white font-arabicBody text-sm leading-relaxed">{item.label}</div>
                            <div className="mt-1 text-[11px] text-white/50 font-arabic">{item.boardTitle}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <Button
                  className="w-full bg-gradient-gold text-dark hover:shadow-gold-lg font-arabic"
                  onClick={handleBookNow}
                >
                  احجز الآن
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gold/40 text-gold hover:bg-gold/10 font-arabic"
                  onClick={clearSelection}
                >
                  تفريغ الاختيارات
                </Button>
                <a
                  href="tel:+966548823127"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-dark-800/80 px-4 py-2.5 text-base text-white/80 transition hover:border-gold/40 hover:text-gold font-arabic"
                >
                  <PhoneCall className="h-4 w-4" />
                  0548823127
                </a>
                <a
                  href="tel:+966550302606"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-dark-800/80 px-4 py-2.5 text-base text-white/80 transition hover:border-gold/40 hover:text-gold font-arabic"
                >
                  <PhoneCall className="h-4 w-4" />
                  0550302606
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
