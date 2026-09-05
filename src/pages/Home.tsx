import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Hero from '../components/Hero'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import LottieFetched from '../components/LottieFetched'
import ResponsiveImage from '../components/ResponsiveImage'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

export default function Home(){
  const reduce = useReducedMotion()
  return (
    <div>
      <Hero />
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display">Featured</h2>
          <a href="/products" className="text-sm opacity-80">View all</a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p, i)=> <ProductCard key={p.id} p={p} imageIndex={i % (p.images.length || 1)} />)}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <motion.div className="grid md:grid-cols-2 gap-8 items-center" initial={reduce? undefined : "hidden"} whileInView={reduce? undefined : "visible"} viewport={{once:true, amount:0.2}}>
            <div>
              <motion.h3 className="text-xl font-display" variants={{hidden:{opacity:0,y:12}, visible:{opacity:1,y:0, transition:{duration:0.6}}}}>{/* animated heading */}Craft & Materials</motion.h3>
              <motion.p className="mt-4 text-muted" variants={{hidden:{opacity:0,y:8}, visible:{opacity:1,y:0, transition:{duration:0.6, delay:0.1}}}}>{/* animated paragraph */}Each piece is crafted with attention to proportion and longevity. We source responsibly and finish pieces by hand.</motion.p>
            </div>
            <motion.div className="relative" variants={{hidden:{opacity:0, scale:0.98}, visible:{opacity:1, scale:1, transition:{duration:0.8, delay:0.15}}}} aria-hidden={reduce}>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-50 via-white to-emerald-50 opacity-60 pointer-events-none" />
              <div className="relative z-10 grid gap-4">
                <LottieFetched url="/animations/brand-craft.json" style={{height:300}} />
                {/* editorial image using existing product assets for reliable local delivery */}
                <ResponsiveImage
                  src={products[0].images[0]}
                  alt="Artisan finishing a woven upholstery detail"
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                  variants={[{media: '(max-width: 768px)', src: products[0].images[0]}, {media: '(min-width: 769px)', src: products[0].images[1]}]}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Testimonials />
      <Newsletter />
    </div>
  )
}
