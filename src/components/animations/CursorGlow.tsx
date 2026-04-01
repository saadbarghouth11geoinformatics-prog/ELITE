import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  // Slower trail
  const trailConfig = { stiffness: 60, damping: 20, mass: 1.2 }
  const trailX = useSpring(cursorX, trailConfig)
  const trailY = useSpring(cursorY, trailConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Enlarge over clickable elements
      setIsHovering(
        target.closest('a, button, [role="button"], input, textarea, select') !== null
      )
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Trail glow (slow) */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
          filter: 'blur(4px)',
        }}
      />
      {/* Sharp cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: isHovering ? 14 : 8,
          height: isHovering ? 14 : 8,
          backgroundColor: 'rgba(212,175,55,0.85)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
          boxShadow: '0 0 12px rgba(212,175,55,0.7)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}
