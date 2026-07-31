import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildUrl, getSiteUrl, routeSeo, siteConfig } from '@/data/seo'
import { latestEventImages, latestPublicVideos } from '@/data/publicMedia'

const routeLabels: Record<string, string> = {
  '/about': 'من نحن',
  '/services': 'خدماتنا',
  '/menu': 'قائمة الطعام',
  '/menu-pages': 'ألبوم المنيو',
  '/menu-text': 'المنيو التفصيلي',
  '/kitchen': 'داخل المطبخ',
  '/booking': 'احجز الآن',
  '/contact': 'تواصل معنا',
}

const latestVideoNames = [
  'تجهيز بوفيه بألوان وردية',
  'طاولة بوفيه ممتدة للمناسبات',
  'تنسيق بوفيه باللون الكحلي',
  'تجهيز بوفيه قاعة بلمسات حمراء',
  'ترتيب أدوات ومائدة البوفيه',
]

const latestVideoDates = ['2026-07-19', '2026-07-19', '2026-07-24', '2026-07-24', '2026-07-24']

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = routeSeo[pathname] ?? routeSeo['/']
    const title = meta?.title ?? siteConfig.name
    const description = meta?.description ?? siteConfig.description
    const keywords = meta?.keywords ?? siteConfig.keywords
    const canonical = buildUrl(pathname)
    const imagePath = meta?.image ?? siteConfig.defaultImage
    const siteUrl = getSiteUrl()
    const imageUrl = buildUrl(imagePath)

    const setMetaTag = (attr: 'name' | 'property', key: string, value?: string) => {
      if (!value) return
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, key)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }

    const setLinkTag = (rel: string, href?: string) => {
      if (!href) return
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!element) {
        element = document.createElement('link')
        element.rel = rel
        document.head.appendChild(element)
      }
      element.href = href
    }

    const setJsonLd = (data: Record<string, unknown>) => {
      let element = document.head.querySelector<HTMLScriptElement>(
        'script[data-seo="schema"], script[data-static-seo]'
      )
      if (!element) {
        element = document.createElement('script')
        element.type = 'application/ld+json'
        element.dataset.seo = 'schema'
        document.head.appendChild(element)
      }
      element.textContent = JSON.stringify(data)
    }

    document.documentElement.lang = siteConfig.lang
    document.documentElement.dir = 'rtl'
    document.title = title

    const robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', keywords)
    setMetaTag('name', 'robots', robots)
    setMetaTag('name', 'googlebot', robots)
    setMetaTag('name', 'theme-color', siteConfig.themeColor)
    setMetaTag('name', 'author', siteConfig.name)

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', siteConfig.name)
    setMetaTag('property', 'og:locale', siteConfig.locale)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonical)
    setMetaTag('property', 'og:image', imageUrl)
    setMetaTag('property', 'og:image:alt', siteConfig.name)

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', imageUrl)

    setLinkTag('canonical', canonical)
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove())
    ;['ar-SA', 'x-default'].forEach((language) => {
      const alternate = document.createElement('link')
      alternate.rel = 'alternate'
      alternate.hreflang = language
      alternate.href = canonical
      document.head.appendChild(alternate)
    })

    const graph: Array<Record<string, unknown>> = [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: siteConfig.name,
        inLanguage: 'ar-SA',
      },
      {
        '@type': 'Caterer',
        '@id': `${siteUrl}/#business`,
        name: siteConfig.name,
        alternateName: ['إيليت للحفلات', 'النخبة للحفلات', 'ELITE Catering'],
        description: siteConfig.description,
        url: `${siteUrl}/`,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        image: imageUrl,
        priceRange: '$$',
        menu: buildUrl('/menu'),
        servesCuisine: ['المطبخ السعودي', 'المطبخ العربي', 'بوفيه مناسبات'],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '22:00',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          contactType: 'reservations',
          areaServed: 'SA',
          availableLanguage: ['ar'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'خدمات إيليت للحفلات والإعاشة',
          itemListElement: [
            'بوفيهات وإعاشة للمناسبات',
            'تجهيز وضيافة القاعات',
            'تموين حفلات الزفاف والشركات',
          ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
        },
        areaServed: siteConfig.areaServed,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.addressLocality,
          addressRegion: 'منطقة مكة المكرمة',
          addressCountry: siteConfig.addressCountry,
        },
        sameAs: [siteConfig.instagram],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'ar-SA',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#business` },
        primaryImageOfPage: imageUrl ? { '@type': 'ImageObject', url: imageUrl } : undefined,
      },
    ]

    if (pathname !== '/') {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${siteUrl}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: routeLabels[pathname] ?? title,
            item: canonical,
          },
        ],
      })
    }

    if (pathname === '/') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'هل توفر إيليت قاعة حفلات؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'تقدم إيليت تجهيز الطعام والبوفيه والضيافة داخل القاعة أو موقع المناسبة الذي يحدده العميل.',
            },
          },
          {
            '@type': 'Question',
            name: 'كيف أطلب عرض سعر؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'أرسل المدينة والتاريخ وعدد الضيوف ونوع المناسبة من صفحة الحجز أو عبر واتساب.',
            },
          },
          {
            '@type': 'Question',
            name: 'ما المدن التي تغطيها الخدمة؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'تشمل التغطية جدة ومكة والطائف وأضم والمخواة وغميقة، ويمكن الاستفسار عن المواقع المجاورة قبل الحجز.',
            },
          },
        ],
      })
    }

    if (pathname === '/kitchen') {
      latestPublicVideos.forEach((video, index) => {
        graph.push({
          '@type': 'VideoObject',
          name: latestVideoNames[index] ?? `فيديو تجهيز بوفيه ${index + 1}`,
          description: 'فيديو من تجهيزات بوفيهات وضيافة إيليت للحفلات والإعاشة.',
          uploadDate: latestVideoDates[index] ?? '2026-07-31',
          contentUrl: buildUrl(video),
          thumbnailUrl: buildUrl(
            latestEventImages[index % Math.max(latestEventImages.length, 1)] ?? imagePath
          ),
        })
      })
    }

    setJsonLd({ '@context': 'https://schema.org', '@graph': graph })
  }, [pathname])

  return null
}
