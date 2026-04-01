import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type PageBackgroundProps = {
  images: string[]
  rotateMs?: number
  overlayClassName?: string
  imageClassName?: string
  tintClassName?: string
  vignetteClassName?: string
}

const DEFAULT_OVERLAY =
  'bg-gradient-to-b from-black/0 via-black/10 to-black/25 sm:via-black/15 sm:to-black/35'
const DEFAULT_IMAGE_CLASS = 'bg-cover bg-center opacity-60 brightness-110 saturate-110'
const DEFAULT_TINT =
  'bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_70%)]'
const DEFAULT_VIGNETTE =
  'bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.12)_60%,rgba(0,0,0,0.3)_100%)]'

const resolveAssetUrl = (src: string) => {
  if (!src) return src
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  if (src.startsWith('/')) return `${normalizedBase}${src.slice(1)}`
  if (src.startsWith('./')) return `${normalizedBase}${src.slice(2)}`
  return src
}

export default function PageBackground({
  images,
  rotateMs = 12000,
  overlayClassName,
  imageClassName,
  tintClassName,
  vignetteClassName,
}: PageBackgroundProps) {
  const shouldReduceMotion = useReducedMotion()
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion || safeImages.length <= 1) return
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeImages.length)
    }, rotateMs)

    return () => window.clearInterval(intervalId)
  }, [shouldReduceMotion, safeImages.length, rotateMs])

  const rawBackgroundImage = safeImages.length > 0 ? safeImages[index % safeImages.length] : ''
  const backgroundImage = resolveAssetUrl(rawBackgroundImage)

  return (
    <div className="absolute inset-0">
      {backgroundImage ? (
        <AnimatePresence initial={false}>
          <motion.div
            key={backgroundImage}
            className={`absolute inset-0 ${imageClassName ?? DEFAULT_IMAGE_CLASS}`}
            style={{ backgroundImage: `url("${backgroundImage}")` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      ) : null}
      <div className={`absolute inset-0 ${tintClassName ?? DEFAULT_TINT}`} />
      <div className={`absolute inset-0 ${vignetteClassName ?? DEFAULT_VIGNETTE}`} />
      <div className={`absolute inset-0 ${overlayClassName ?? DEFAULT_OVERLAY}`} />
    </div>
  )
}
