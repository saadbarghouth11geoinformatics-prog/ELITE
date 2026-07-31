const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const INDEX_FILE = path.join(DIST_DIR, 'index.html')
const SITE_URL = 'https://xn--mgbg1fxab.store'
const SOCIAL_IMAGE = `${SITE_URL}/images/New/WhatsApp%20Image%202026-07-19%20at%2010.53.46%20PM.jpeg`

const routes = [
  {
    path: '/about',
    title: 'من نحن | إيليت',
    description: 'تعرف على خبرة إيليت في خدمات الإعاشة وتنظيم الحفلات والبوفيهات في جدة ومكة والطائف منذ أكثر من 23 عامًا.',
    heading: 'خبرة إيليت في الحفلات والإعاشة',
  },
  {
    path: '/services',
    title: 'خدماتنا | إيليت للحفلات',
    description: 'خدمات إعاشة وتموين وضيافة متكاملة لحفلات الزفاف والمناسبات والشركات والبوفيهات المفتوحة في جدة ومكة والطائف.',
    heading: 'خدمات إعاشة وتموين الحفلات والمناسبات',
  },
  {
    path: '/menu',
    title: 'قائمة الطعام | إيليت',
    description: 'شاهد صور الأطباق والبوفيهات والمقبلات والحلويات التي تقدمها إيليت للحفلات والإعاشة في جدة ومكة.',
    heading: 'قائمة الطعام وصور البوفيهات',
  },
  {
    path: '/menu-pages',
    title: 'ألبوم المنيو | إيليت',
    description: 'تصفح أحدث منيوهات وباقات بوفيه إيليت للحفلات الخارجية وخيارات الطعام والضيافة للمناسبات.',
    heading: 'منيوهات وباقات بوفيه إيليت',
  },
  {
    path: '/menu-text',
    title: 'المنيو التفصيلي | إيليت',
    description: 'منيو تفصيلي لأصناف الطعام والسلطات والمقبلات والمأكولات الساخنة والحلويات وخيارات البوفيه.',
    heading: 'المنيو التفصيلي للأطعمة والبوفيهات',
  },
  {
    path: '/kitchen',
    title: 'تجهيز البوفيهات | إيليت',
    description: 'صور وفيديوهات تجهيز بوفيهات المناسبات وتنسيق طاولات الضيافة من فريق إيليت للحفلات والإعاشة.',
    heading: 'تجهيز البوفيهات وكواليس الضيافة',
  },
  {
    path: '/booking',
    title: 'احجز الآن | إيليت',
    description: 'اطلب حجز بوفيه أو خدمات إعاشة وضيافة لحفلتك في جدة ومكة والطائف واحصل على عرض يناسب مناسبتك.',
    heading: 'احجز بوفيه وخدمات إعاشة لمناسبتك',
  },
  {
    path: '/contact',
    title: 'تواصل معنا | إيليت',
    description: 'تواصل مع إيليت للحفلات والإعاشة للحجز والاستفسار عن البوفيهات وتموين المناسبات في جدة ومكة والطائف.',
    heading: 'تواصل مع إيليت للحفلات والإعاشة',
  },
]

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const setMeta = (html, attribute, key, value) => {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}="${key}"[^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

const navigation = `
  <nav aria-label="روابط الموقع">
    <a href="/">الرئيسية</a>
    <a href="/services">خدماتنا</a>
    <a href="/menu">قائمة الطعام</a>
    <a href="/menu-pages">ألبوم المنيو</a>
    <a href="/kitchen">داخل المطبخ</a>
    <a href="/booking">احجز الآن</a>
    <a href="/contact">تواصل معنا</a>
  </nav>`

if (!fs.existsSync(INDEX_FILE)) {
  throw new Error('dist/index.html is missing. Run Vite build before generating SEO pages.')
}

const sourceHtml = fs.readFileSync(INDEX_FILE, 'utf8')

for (const route of routes) {
  const canonical = `${SITE_URL}${route.path}`
  let html = sourceHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  html = setMeta(html, 'name', 'description', route.description)
  html = setMeta(html, 'property', 'og:title', route.title)
  html = setMeta(html, 'property', 'og:description', route.description)
  html = setMeta(html, 'property', 'og:url', canonical)
  html = setMeta(html, 'property', 'og:image', SOCIAL_IMAGE)
  html = setMeta(html, 'name', 'twitter:title', route.title)
  html = setMeta(html, 'name', 'twitter:description', route.description)
  html = setMeta(html, 'name', 'twitter:image', SOCIAL_IMAGE)
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`)
  html = html.replaceAll(
    /<link\s+rel="alternate"\s+hreflang="(?:ar-SA|x-default)"[^>]*>/gi,
    ''
  )
  html = html.replace(
    '</head>',
    `    <link rel="alternate" hreflang="ar-SA" href="${canonical}" />\n    <link rel="alternate" hreflang="x-default" href="${canonical}" />\n  </head>`
  )

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: route.title,
        description: route.description,
        inLanguage: 'ar-SA',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: route.heading, item: canonical },
        ],
      },
    ],
  }
  html = html.replace(
    /<script\s+type="application\/ld\+json"\s+data-static-seo>[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" data-static-seo>${JSON.stringify(schema)}</script>`
  )

  const fallback = `<div id="root"><main style="max-width:980px;margin:0 auto;padding:48px 20px;color:#fff;background:#0a0a0a"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.description)}</p>${navigation}</main></div>`
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, fallback)

  const outputFile = path.join(DIST_DIR, `${route.path.slice(1)}.html`)
  fs.writeFileSync(outputFile, html)
}

console.log(`Generated ${routes.length} route-specific SEO pages for ${SITE_URL}.`)
