import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../data/products'
import { motion, useReducedMotion } from 'framer-motion'
import ResponsiveImage from './ResponsiveImage'

export default function ProductCard({p, onQuickView, imageIndex=0}:{p:Product; onQuickView?: (p:Product)=>void; imageIndex?: number}){
  const reduce = useReducedMotion()
  return (
    <motion.article whileHover={reduce? undefined: { y: -6 }} className="group bg-white">
      <div className="relative">
        <Link to={`/product/${p.id}`} className="block overflow-hidden rounded-md">
          <ResponsiveImage
            src={p.images[imageIndex] ?? p.images[0]}
            alt={p.name}
            className="w-full h-56 object-cover"
            variants={[
              { media: '(max-width: 768px)', src: p.images[0] },
              { media: '(min-width: 769px)', src: p.images[1] ?? p.images[0] }
            ]}
            darkSrc={p.images[1] ?? p.images[0]}
          />
        </Link>
        <button onClick={(e)=>{ e.stopPropagation(); onQuickView?.(p) }} aria-label="Quick view" className="absolute right-3 top-3 bg-white/90 px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100">Quick view</button>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium">{p.name}</h3>
          <div className="text-sm font-semibold">${p.price}</div>
        </div>
        <div className="text-xs text-muted mt-2">{p.material}</div>
      </div>
    </motion.article>
  )
}
