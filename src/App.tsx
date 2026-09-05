import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'

export default function App(){
  const location = useLocation()
  const shouldReduce = useReducedMotion()
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper reduceMotion={shouldReduce}><Home/></PageWrapper>} />
            <Route path="/products" element={<PageWrapper reduceMotion={shouldReduce}><Products/></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper reduceMotion={shouldReduce}><ProductPage/></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper reduceMotion={shouldReduce}><CartPage/></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper reduceMotion={shouldReduce}><Checkout/></PageWrapper>} />
            <Route path="*" element={<PageWrapper reduceMotion={shouldReduce}><NotFound/></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </CartProvider>
  )
}

function PageWrapper({children, reduceMotion}:{children:React.ReactNode; reduceMotion?:boolean}){
  const initial = reduceMotion? {opacity:1, y:0} : { opacity: 0, y: 8 }
  const animate = { opacity: 1, y: 0 }
  const exit = reduceMotion? {opacity:1, y:0} : { opacity: 0, y: -8 }
  return (
    <motion.main
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: 0.35 }}
      className="flex-1"
    >
      {children}
    </motion.main>
  )
}
