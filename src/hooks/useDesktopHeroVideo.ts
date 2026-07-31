import { useEffect, useState } from 'react'

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
}

export default function useDesktopHeroVideo(delayMs = 5000) {
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    const slowConnection = connection?.saveData || /(^|-)2g|3g/i.test(connection?.effectiveType ?? '')
    const wideScreen = window.matchMedia('(min-width: 1024px)').matches

    if (!wideScreen || slowConnection) return

    const timerId = window.setTimeout(() => setCanPlay(true), delayMs)
    return () => window.clearTimeout(timerId)
  }, [delayMs])

  return canPlay
}
