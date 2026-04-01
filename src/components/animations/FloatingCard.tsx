import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt angle in degrees */
  maxTilt?: number
  /** Whether to show the gold glow on hover */
  glow?: boolean
  /** Disable 3D tilt (e.g. on mobile) */
  disabled?: boolean
}

export default function FloatingCard({
  children,
  className = '',
  maxTilt = 12,
  glow = true,
  disabled = false,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 30, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={{ scale: 1.03, z: 20 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      className={`relative cursor-default ${className}`}
    >
      {/* Tilt inner content */}
      <div style={{ transform: 'translateZ(0px)' }} className="h-full w-full">
        {children}
      </div>

      {/* Gold glow that follows mouse */}
      {glow && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(212,175,55,0.18) 0%, transparent 60%)`,
          }}
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
}
