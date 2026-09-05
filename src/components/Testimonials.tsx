import React from 'react'

export default function Testimonials(){
  const items = [
    {text: 'Exceptional craftsmanship and attention to detail.', author:'— L. Gardner'},
    {text: 'Beautiful pieces that anchor our living room.', author:'— A. Rivera'}
  ]
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h3 className="text-xl font-display">What customers say</h3>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {items.map((it,idx)=>(
            <blockquote key={idx} className="p-6 border rounded bg-white">
              <p className="text-muted">{it.text}</p>
              <div className="mt-4 text-sm font-medium">{it.author}</div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
