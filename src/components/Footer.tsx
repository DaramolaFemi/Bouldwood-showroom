import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t mt-12 py-10 bg-white">
      <div className="container mx-auto px-6 text-sm text-muted flex flex-col md:flex-row justify-between">
        <div>
          <div className="font-semibold">Bouldwood</div>
          <div className="opacity-80 mt-2">Handcrafted furniture. Thoughtful design.</div>
        </div>
        <div className="mt-6 md:mt-0">© {new Date().getFullYear()} Bouldwood. All rights reserved.</div>
      </div>
    </footer>
  )
}
