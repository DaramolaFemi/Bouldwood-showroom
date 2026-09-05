import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Modal({open,onClose,children}:{open:boolean; onClose:()=>void; children:React.ReactNode}){
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={reduce? undefined: {opacity:0}} animate={reduce? undefined: {opacity:1}} exit={reduce? undefined: {opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div onClick={onClose} className="absolute inset-0 bg-black/40" aria-hidden />
          <motion.div initial={reduce? undefined: {y:10, opacity:0}} animate={reduce? undefined: {y:0, opacity:1}} exit={reduce? undefined: {y:10, opacity:0}} className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 z-10">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4">✕</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
