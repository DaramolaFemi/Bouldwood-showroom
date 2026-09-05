import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NavBar(){
  const { items } = useCart()
  const [theme, setTheme] = useState<'light'|'dark'>(()=>{
    try{ const v = localStorage.getItem('bw_theme'); return (v === 'dark')? 'dark':'light' }catch{ return 'light' }
  })

  useEffect(()=>{
    const root = document.documentElement
    if(theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try{ localStorage.setItem('bw_theme', theme) }catch{}
  },[theme])
  const reduce = useReducedMotion()

  return (
    <header className="border-b py-4 bg-white">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-display tracking-tight">Bouldwood</Link>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <NavLink to="/products" className={({isActive})=>isActive? 'font-semibold':'opacity-80'}>Shop</NavLink>
          <a href="#collections" className="opacity-80">Collections</a>
          <a href="#story" className="opacity-80">Craft</a>
          <input placeholder="Search" aria-label="Search" className="ml-6 px-3 py-2 border rounded-md text-sm" />
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Toggle theme" onClick={()=> setTheme(t=> t==='dark'?'light':'dark') } className="px-2 py-1 rounded text-sm">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button aria-label="Wishlist" className="opacity-80">♡</button>
          <Link to="/cart" className="flex items-center gap-2">
            <motion.span animate={reduce? {scale:1} : { scale: items.length? 1.05:1 }} className="text-sm">Cart</motion.span>
            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">{items.length}</div>
          </Link>
        </div>
      </div>
    </header>
  )
}
