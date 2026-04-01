import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  /** 'words' splits by space, 'chars' splits by character */
  mode?: 'words' | 'chars'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  once?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)', rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
      mass: 0.8,
    },
  },
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  mode = 'words',
  once = true,
}: Omit<TextRevealProps, 'as'>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-5%' })

  const tokens = mode === 'words' ? text.split(' ') : text.split('')
  const itemVariants = mode === 'words' ? wordVariants : charVariants

  const containerV: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: mode === 'words' ? 0.07 : 0.035, delayChildren: delay } },
  }

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-block ${className}`}
      style={{ perspectiveOrigin: 'center', perspective: '1000px' }}
    >
      <motion.span
        variants={containerV}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-flex flex-wrap gap-x-[0.3em]"
        style={{ perspective: '800px' }}
      >
        {tokens.map((token, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block"
            style={{ transformOrigin: 'bottom center' }}
          >
            {token}
            {mode === 'words' && i < tokens.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  )
}
