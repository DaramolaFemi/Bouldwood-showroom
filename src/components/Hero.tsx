import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import LottieFetched from './LottieFetched'
import ResponsiveImage from './ResponsiveImage'

export default function Hero(){
  const reduce = useReducedMotion()
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={reduce? undefined: {y:8, opacity:0}} animate={reduce? undefined: {y:0,opacity:1}} transition={{delay:0.05}} className="text-4xl md:text-5xl font-display leading-tight">Furniture crafted for modern living</motion.h1>
          <p className="mt-6 text-muted max-w-xl">Timeless materials, precise proportions, and considered details. Curated collections designed to elevate home interiors.</p>
          <div className="mt-8 flex gap-4">
            <a href="/products" className="px-6 py-3 bg-black text-white text-sm">Shop Collection</a>
            <a href="#story" className="px-6 py-3 border text-sm">Our Story</a>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="rounded-xl overflow-hidden shadow-soft">
            <ResponsiveImage
              src="/assets/products/sora-sofa/1"
              alt="Showroom"
              className="w-full h-96 object-cover"
              variants={[
                { media: '(max-width: 768px)', src: '/assets/products/sora-sofa/1' },
                { media: '(min-width: 769px)', src: '/assets/products/sora-sofa/1' }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
