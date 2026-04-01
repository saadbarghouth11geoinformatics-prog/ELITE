import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

interface DrinkFloatProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

function DrinkFloat({ children, className = '', intensity = 15 }: DrinkFloatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for buttery interaction
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 })

  const rotateX = useMotionTemplate`${mouseYSpring}deg`
  const rotateY = useMotionTemplate`${mouseXSpring}deg`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate distance from center, normalized to [-1, 1]
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    
    // Reverse y for intuitive rotation
    x.set(xPct * intensity)
    y.set(-yPct * intensity)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
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
      }}
      // Idle float animation
      animate={{
        y: [0, -10, 0],
        rotateZ: [0, 1, -1, 0]
      }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      whileHover={{ scale: 1.1 }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Dynamic light reflection (glare) based on mouse position could be added here */}
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  )
}

export default DrinkFloat
