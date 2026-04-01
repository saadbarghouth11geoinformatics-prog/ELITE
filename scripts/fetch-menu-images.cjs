const fs = require('fs')
const path = require('path')
const https = require('https')
const crypto = require('crypto')

const ROOT_DIR = path.resolve(__dirname, '..')
const MENU_FILE = path.join(ROOT_DIR, 'src', 'pages', 'Menu.tsx')
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'images', 'menu')

const USER_AGENT = 'EliteCateringImages/1.0 (local build)'
const DOWNLOAD_DELAY_MS = 350

const dishImageQueryRules = [
  { pattern: /حمص/, query: 'hummus' },
  { pattern: /تبول/, query: 'tabbouleh' },
  { pattern: /ورق عنب/, query: 'stuffed grape leaves dolma' },
  { pattern: /متبل|بابا غنوج/, query: 'baba ganoush' },
  { pattern: /لبنة|لبنه|لبن/, query: 'labneh dip' },
  { pattern: /فتوش/, query: 'fattoush salad' },
  { pattern: /سلطة سيزر|سيزر/, query: 'caesar salad' },
  { pattern: /سلطة يونانية|يوناني/, query: 'greek salad' },
  { pattern: /سلطة روسية/, query: 'russian salad' },
  { pattern: /سلطة نيسواز/, query: 'nicoise salad' },
  { pattern: /سلطة شمندر/, query: 'beet salad' },
  { pattern: /سلطة كول سلو/, query: 'coleslaw' },
  { pattern: /سلطة بطاطس/, query: 'potato salad' },
  { pattern: /سلطة تونة/, query: 'tuna salad' },
  { pattern: /سلطة جمبري/, query: 'shrimp salad' },
  { pattern: /سلطة فواكه|هرم فواكه|فواكه موسمية/, query: 'fruit platter' },
  { pattern: /سلطة/, query: 'fresh salad' },
  { pattern: /مشويات|كباب|كفتة|شيش/, query: 'mixed grill kebab' },
  { pattern: /سمك وجمبري/, query: 'seafood platter' },
  { pattern: /جمبري|روبيان/, query: 'shrimp dish' },
  { pattern: /سمك/, query: 'grilled fish' },
  { pattern: /برياني|زربيان/, query: 'biryani rice' },
  { pattern: /كبسة/, query: 'kabsa rice' },
  { pattern: /مندي/, query: 'mandi rice' },
  { pattern: /صيادية/, query: 'sayadieh fish rice' },
  { pattern: /ارز|أرز/, query: 'arabic rice' },
  { pattern: /بشاميل|باشاميل/, query: 'baked pasta bechamel' },
  { pattern: /لازانيا/, query: 'lasagna' },
  { pattern: /مكرونة|باستا|اسباجتي|سباجتي|فتشيني/, query: 'pasta dish' },
  { pattern: /اسكالوب/, query: 'chicken escalope' },
  { pattern: /استيك/, query: 'beef steak' },
  { pattern: /فخد خروف|خروف/, query: 'roast lamb' },
  { pattern: /داوود باشا/, query: 'meatballs tomato sauce' },
  { pattern: /محاشي/, query: 'stuffed vegetables' },
  { pattern: /معجنات/, query: 'savory pastries' },
  { pattern: /فتة/, query: 'fatteh' },
  { pattern: /كروت البطاطس|كروكيت/, query: 'potato croquettes' },
  { pattern: /اوصال لحم/, query: 'beef strips' },
  { pattern: /ايدام/, query: 'chicken stew' },
  { pattern: /خضار/, query: 'mixed vegetables' },
  { pattern: /دجاج صيني/, query: 'chinese chicken' },
  { pattern: /دجاج مشوي/, query: 'grilled chicken' },
  { pattern: /دجاج مقلي|مقرمش|اصابع دجاج|مسحب/, query: 'fried chicken' },
  { pattern: /دجاج/, query: 'chicken dish' },
  { pattern: /كاري|ماسالا/, query: 'chicken curry' },
  { pattern: /كنافة/, query: 'kunafa dessert' },
  { pattern: /بقلاوة/, query: 'baklava' },
  { pattern: /ام علي|أم علي/, query: 'umm ali dessert' },
  { pattern: /مهلبية/, query: 'muhallabia dessert' },
  { pattern: /كريم كراميل/, query: 'creme caramel' },
  { pattern: /بسبوسة/, query: 'basbousa' },
  { pattern: /تشيز/, query: 'cheesecake' },
  { pattern: /تيراميسو/, query: 'tiramisu' },
  { pattern: /موس/, query: 'chocolate mousse' },
  { pattern: /سويسرول/, query: 'swiss roll cake' },
  { pattern: /كيك|تورتة|جاتوه|بلاك فورست|وايت فروست/, query: 'cake dessert' },
  { pattern: /حلويات/, query: 'arabic sweets' },
  { pattern: /تارت/, query: 'fruit tart' },
  { pattern: /جيلي/, query: 'jelly dessert' },
  { pattern: /مشروبات غازية/, query: 'soft drink' },
  { pattern: /موهيتو/, query: 'mojito' },
  { pattern: /مياه/, query: 'mineral water bottle' },
  { pattern: /فواكه/, query: 'fruit platter' },
]

const normalizeArabicText = (value) =>
  value
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim()

const getDishImageQuery = (name) => {
  const normalizedName = normalizeArabicText(name)
  const rule = dishImageQueryRules.find(
    (entry) => entry.pattern.test(normalizedName) || entry.pattern.test(name)
  )
  const base = rule?.query ?? 'arabic food'
  if (/\bfood\b|\bdish\b|\bdessert\b|\bdrink\b|\bsalad\b/i.test(base)) {
    return base
  }
  return `${base} food`
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const downloadBuffer = (url, attempt = 1) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadBuffer(res.headers.location, attempt).then(resolve).catch(reject)
          return
        }
        if (res.statusCode === 429 && attempt < 3) {
          const retryDelay = 800 * attempt
          setTimeout(() => {
            downloadBuffer(url, attempt + 1).then(resolve).catch(reject)
          }, retryDelay)
          return
        }
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Image download failed ${res.statusCode}: ${url}`))
          return
        }
        const chunks = []
        res.on('data', (chunk) => chunks.push(chunk))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      })
      .on('error', reject)
  })

const hashBuffer = (buffer) => crypto.createHash('sha1').update(buffer).digest('hex')

const buildFlickrTags = (name) => {
  const query = getDishImageQuery(name)
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join(',')
}

const buildFlickrUrl = (name, lock) =>
  `https://loremflickr.com/1200/900/${buildFlickrTags(name)}?lock=${lock}`

const getMenuBlock = (content) => {
  const start = content.indexOf('const menuItems')
  const end = content.indexOf('const allMenuItems', start)
  if (start === -1 || end === -1) {
    throw new Error('menuItems block not found')
  }
  return { start, end, block: content.slice(start, end) }
}

const parseMenuItems = (block) => {
  const items = []
  const itemRegex = /{[\s\S]*?id:\s*(\d+)[\s\S]*?name:\s*'([^']+)'[\s\S]*?}/g
  let match = null
  while ((match = itemRegex.exec(block))) {
    items.push({ id: Number(match[1]), name: match[2] })
  }
  return items
}

const loadExistingImages = () => {
  const mapping = new Map()
  if (!fs.existsSync(OUTPUT_DIR)) {
    return mapping
  }
  const files = fs.readdirSync(OUTPUT_DIR)
  files.forEach((file) => {
    const match = /^menu-(\d+)\.(jpg|jpeg|png|webp)$/i.exec(file)
    if (!match) return
    const id = Number(match[1])
    mapping.set(id, `/images/menu/${file}`)
  })
  return mapping
}

const main = async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const content = fs.readFileSync(MENU_FILE, 'utf8')
  const { start, end, block } = getMenuBlock(content)
  const menuItems = parseMenuItems(block)

  if (menuItems.length === 0) {
    throw new Error('No menu items found')
  }

  const force = process.argv.includes('--force')
  const imageMap = loadExistingImages()
  const usedHashes = new Set()

  imageMap.forEach((value) => {
    const filePath = path.join(ROOT_DIR, value.replace('/images/', 'public/images/'))
    if (fs.existsSync(filePath)) {
      usedHashes.add(hashBuffer(fs.readFileSync(filePath)))
    }
  })

  for (const item of menuItems) {
    if (!force && imageMap.has(item.id)) {
      continue
    }

    let saved = false
    for (let attempt = 0; attempt < 6; attempt += 1) {
      try {
        const buffer = await downloadBuffer(buildFlickrUrl(item.name, item.id + attempt * 137))
        const hash = hashBuffer(buffer)
        if (usedHashes.has(hash)) {
          await wait(DOWNLOAD_DELAY_MS)
          continue
        }

        const filename = `menu-${item.id}.jpg`
        const outputPath = path.join(OUTPUT_DIR, filename)
        fs.writeFileSync(outputPath, buffer)

        imageMap.set(item.id, `/images/menu/${filename}`)
        usedHashes.add(hash)
        saved = true
        console.log(`Saved menu-${item.id} for "${item.name}"`)
        await wait(DOWNLOAD_DELAY_MS)
        break
      } catch (error) {
        console.warn(`Failed candidate for ${item.name}: ${error.message}`)
        await wait(DOWNLOAD_DELAY_MS)
      }
    }

    if (!saved) {
      console.warn(`No unique image found for "${item.name}" (id ${item.id})`)
    }
  }

  const updatedBlock = block.replace(
    /(id:\s*(\d+)[\s\S]*?image:\s*)([^,\n}]+)/g,
    (match, prefix, idRaw) => {
      const id = Number(idRaw)
      const imagePath = imageMap.get(id)
      if (!imagePath) return match
      return `${prefix}'${imagePath}'`
    }
  )

  const nextContent = `${content.slice(0, start)}${updatedBlock}${content.slice(end)}`
  fs.writeFileSync(MENU_FILE, nextContent)
  console.log('Menu image paths updated.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
