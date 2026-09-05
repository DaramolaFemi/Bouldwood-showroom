import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '../data/products'

type CartItem = { product: Product; qty: number }

type CartState = {
  items: CartItem[]
  saved: Product[]
  add: (p: Product, qty?: number)=>void
  remove: (id: string)=>void
  updateQty: (id: string, qty:number)=>void
  clear: ()=>void
  saveForLater: (id: string)=>void
  moveToCart: (id: string, qty?: number)=>void
}

const CartContext = createContext<CartState | undefined>(undefined)

export const CartProvider = ({children}:{children:React.ReactNode})=>{
  const [items, setItems] = useState<CartItem[]>(()=>{
    try{
      const raw = localStorage.getItem('bw_cart')
      return raw? JSON.parse(raw) : []
    }catch{ return [] }
  })
  const [saved, setSaved] = useState<Product[]>(()=>{
    try{ const raw = localStorage.getItem('bw_saved'); return raw? JSON.parse(raw): [] }catch{return []}
  })
  const [syncEnabled, setSyncEnabled] = useState(true)
  const userId = 'demo-user'
  const add = (product: Product, qty=1)=>{
    setItems(prev=>{
      const found = prev.find(i=>i.product.id===product.id)
      if(found) return prev.map(i=> i.product.id===product.id? {...i, qty: i.qty+qty}:i)
      return [...prev, {product, qty}]
    })
  }
  const remove = (id:string)=> setItems(prev=> prev.filter(i=> i.product.id !== id))
  const updateQty = (id:string, qty:number)=> setItems(prev=> prev.map(i=> i.product.id===id? {...i, qty}:i))
  const saveForLater = (id:string)=>{
    setItems(prev=>{
      const found = prev.find(i=> i.product.id===id)
      if(!found) return prev
      setSaved(s=> [found.product, ...s.filter(p=> p.id !== id)])
      return prev.filter(i=> i.product.id !== id)
    })
  }
  const moveToCart = (id:string, qty=1)=>{
    const product = saved.find(p=> p.id===id)
    if(!product) return
    setSaved(prev=> prev.filter(p=> p.id !== id))
    setItems(prev=>{
      const found = prev.find(i=> i.product.id===id)
      if(found) return prev.map(i=> i.product.id===id? {...i, qty: i.qty+qty}:i)
      return [...prev, {product, qty}]
    })
  }
  const clear = ()=> setItems([])

  useEffect(()=>{
    try{ localStorage.setItem('bw_cart', JSON.stringify(items)) }catch{}
  },[items])
  useEffect(()=>{
    try{ localStorage.setItem('bw_saved', JSON.stringify(saved)) }catch{}
  },[saved])

  // Attempt to sync cart to server when items change
  useEffect(()=>{
    if(!syncEnabled) return
    const url = `/api/cart/${userId}`
    fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ items }) })
      .catch(()=>{
        // ignore errors and continue; server is optional
      })
  },[items, syncEnabled])

  // On mount, try to fetch server cart and merge
  useEffect(()=>{
    if(!syncEnabled) return
    const url = `/api/cart/${userId}`
    fetch(url).then(r=> r.ok ? r.json() : null).then(data=>{
      if(!data) return
      try{
        const serverItems = data.items || []
        if(serverItems.length>0){
          // merge server items with local, preferring higher qty
          setItems(prev=>{
            const map = new Map(prev.map(i=> [i.product.id, i.qty]))
            serverItems.forEach(si=>{
              const existing = map.get(si.product.id) || 0
              map.set(si.product.id, Math.max(existing, si.qty))
            })
            // reconstruct items using local product references where possible
            const merged = Array.from(map.entries()).map(([id, qty])=>{
              const local = prev.find(p=> p.product.id===id)
              return local? { product: local.product, qty } : si
            })
            return merged
          })
        }
      }catch{}
    }).catch(()=>{})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <CartContext.Provider value={{items, saved, add, remove, updateQty, clear, saveForLater, moveToCart}}>{children}</CartContext.Provider>
}

export const useCart = ()=>{
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
