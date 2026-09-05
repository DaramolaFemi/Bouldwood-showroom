import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Toast({open, message}:{open:boolean; message:string}){
  const reduce = useReducedMotion()
  return (
    <div aria-live="polite" className="fixed right-6 bottom-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div initial={reduce? undefined: {y:20, opacity:0}} animate={reduce? undefined: {y:0, opacity:1}} exit={reduce? undefined: {y:20, opacity:0}} className="bg-black text-white px-4 py-2 rounded shadow">{message}</motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
