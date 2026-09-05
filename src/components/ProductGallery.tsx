import React, {useState} from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ResponsiveImage from './ResponsiveImage'

export default function ProductGallery({images}:{images:string[]}){
  const [active, setActive] = useState(0)
  const base = images[active]
  const altBase = images[(active+1) % images.length] ?? base

  const reduce = useReducedMotion()

  return (
    <div>
      <motion.div className="rounded overflow-hidden">
        <motion.div initial={reduce? undefined: {opacity:0}} animate={reduce? undefined: {opacity:1}} transition={{duration:0.4}}>
          <ResponsiveImage
            src={base}
            alt="Product image"
            className="w-full h-[520px] object-cover"
            variants={[{media:'(max-width:768px)', src: base},{media:'(min-width:769px)', src: altBase}]}
            darkSrc={altBase}
          />
        </motion.div>
      </motion.div>
      <div className="mt-4 flex gap-3">
        {images.map((src, idx)=> (
          <button key={idx} onClick={()=>setActive(idx)} aria-pressed={idx===active} className={`w-20 h-14 overflow-hidden rounded ${idx===active? 'ring-2 ring-accent':'ring-1 ring-transparent'}`}>
            <img src={`${src}-360.jpg`} alt={`Product thumbnail ${idx+1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
