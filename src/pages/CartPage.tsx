import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage(){
  const { items, remove, updateQty, saved, moveToCart, saveForLater } = useCart()
  const subtotal = items.reduce((s,i)=> s + i.product.price * i.qty, 0)
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-display">Your Cart</h1>
      {items.length===0? (
        <div className="mt-6 text-muted">Your cart is empty. <Link to="/products" className="underline">Continue shopping</Link></div>
      ):(
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {items.map(i=> (
              <div key={i.product.id} className="flex items-center gap-4 py-4 border-b">
                <img src={i.product.images[0]} alt={i.product.name} className="w-28 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{i.product.name}</div>
                  <div className="text-sm text-muted">${i.product.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input aria-label={`Quantity for ${i.product.name}`} type="number" min={1} value={i.qty} onChange={(e)=> updateQty(i.product.id, Number(e.target.value))} className="w-20 px-2 py-1 border" />
                  <button onClick={()=>saveForLater(i.product.id)} className="text-sm">Save for later</button>
                  <button onClick={()=>remove(i.product.id)} className="text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="p-6 border rounded">
            <div className="flex justify-between"><div>Subtotal</div><div>${subtotal}</div></div>
            <div className="mt-4">
              <Link to="/checkout" className="block text-center px-4 py-3 bg-black text-white">Checkout</Link>
            </div>
          </aside>
        </div>
      )}

      {saved && saved.length>0 && (
        <section className="mt-12">
          <h2 className="text-lg font-display">Saved for later</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {saved.map(s=> (
              <div key={s.id} className="p-4 border rounded flex items-center gap-4">
                <img src={s.images[0]} alt={s.name} className="w-24 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-muted">${s.price}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>moveToCart(s.id)} className="px-3 py-2 border">Move to cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
