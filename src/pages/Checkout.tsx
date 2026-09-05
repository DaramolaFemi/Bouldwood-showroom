import React from 'react'

export default function Checkout(){
  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-2xl font-display">Checkout</h1>
      <form className="mt-6 grid gap-4">
        <label className="sr-only">Email</label>
        <input aria-label="Email" placeholder="Email" className="px-3 py-2 border" />
        <label className="sr-only">Full name</label>
        <input aria-label="Full name" placeholder="Full name" className="px-3 py-2 border" />
        <label className="sr-only">Address</label>
        <input aria-label="Address" placeholder="Address" className="px-3 py-2 border" />
        <div className="flex gap-4">
          <label className="sr-only">City</label>
          <input aria-label="City" placeholder="City" className="px-3 py-2 border flex-1" />
          <label className="sr-only">Zip</label>
          <input aria-label="Zip" placeholder="Zip" className="px-3 py-2 border w-28" />
        </div>
        <div className="mt-4">
          <div className="text-sm text-muted">Payment details (demo only)</div>
          <label className="sr-only">Card number</label>
          <input aria-label="Card number" placeholder="Card number" className="mt-2 px-3 py-2 border w-full" />
        </div>
        <button className="mt-6 px-4 py-3 bg-black text-white">Place Order</button>
      </form>
    </div>
  )
}
