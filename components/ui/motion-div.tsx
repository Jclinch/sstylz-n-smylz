'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils' // Optional utility for classNames

type MotionDivProps = HTMLMotionProps<'div'> & {
  className?: string
}

export const MotionDiv = ({ className, children, ...props }: MotionDivProps) => {
  return (
    <motion.div className={cn(className)} {...props}>
      {children}
    </motion.div>
  )
}
