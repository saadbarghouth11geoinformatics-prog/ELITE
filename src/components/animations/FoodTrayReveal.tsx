import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface FoodTrayRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
}

export default function FoodTrayReveal({ 
  children, 
  delay = 0,
  direction = 'up',
  className = ''
}: FoodTrayRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -100, y: 0, rotate: -15, scale: 0.8 }
      case 'right': return { x: 100, y: 0, rotate: 15, scale: 0.8 }
      case 'down': return { x: 0, y: -100, rotate: -5, scale: 0.8 }
      case 'up': 
      default: return { x: 0, y: 100, rotate: 5, scale: 0.8 }
    }
  }

  const variants: Variants = {
    hidden: { ...getInitialPosition(), opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
        mass: 1.5,
        delay,
        duration: 0.8
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.05, 
        y: -10, 
        rotate: direction === 'left' ? 3 : direction === 'right' ? -3 : 2,
        boxShadow: "0px 20px 40px rgba(212, 175, 55, 0.2)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
