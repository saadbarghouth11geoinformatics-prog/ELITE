import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  once?: boolean
}

const getItemVariant = (direction: StaggerContainerProps['direction']): Variants => {
  const initial: Record<string, number | string> = { opacity: 0 }
  const animate: Record<string, number | string> = { opacity: 1 }

  if (direction === 'up')    { initial.y = 50; animate.y = 0 }
  if (direction === 'down')  { initial.y = -50; animate.y = 0 }
  if (direction === 'left')  { initial.x = -60; animate.x = 0 }
  if (direction === 'right') { initial.x = 60; animate.x = 0 }
  if (direction === 'scale') { initial.scale = 0.8; animate.scale = 1 }
  if (direction === 'fade')  {}

  return {
    hidden: initial as Variants['hidden'],
    visible: {
      ...animate,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 16,
        mass: 0.9,
      },
    },
  }
}

export default function StaggerContainer({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  direction = 'up',
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-8%' })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = getItemVariant(direction)

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}
