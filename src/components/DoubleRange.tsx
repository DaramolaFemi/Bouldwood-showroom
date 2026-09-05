import React from 'react'

type Props = {
  min: number
  max: number
  low: number
  high: number
  onChange: (low:number, high:number)=>void
}

export default function DoubleRange({min, max, low, high, onChange}:Props){
  const [l, setL] = React.useState(low)
  const [h, setH] = React.useState(high)

  React.useEffect(()=>{
    setL(low); setH(high)
  },[low,high])

  const clamp = (v:number) => Math.min(max, Math.max(min, v))
  const step = Math.max(1, Math.round((max - min) / 100))

  const handleLow = (v:number)=>{
    const next = clamp(Math.min(v, h))
    setL(next)
    onChange(next, h)
  }
  const handleHigh = (v:number)=>{
    const next = clamp(Math.max(v, l))
    setH(next)
    onChange(l, next)
  }

  const pct = (v:number)=> ((v - min) / (max - min)) * 100

  const handleThumbKey = (which:'low'|'high') => (e: React.KeyboardEvent)=>{
    let delta = 0
    if(e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step
    if(e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step
    if(e.key === 'PageDown') delta = -step*10
    if(e.key === 'PageUp') delta = step*10
    if(e.key === 'Home'){
      e.preventDefault()
      which === 'low' ? handleLow(min) : handleHigh(min)
      return
    }
    if(e.key === 'End'){
      e.preventDefault()
      which === 'low' ? handleLow(max) : handleHigh(max)
      return
    }
    if(delta !== 0){
      e.preventDefault()
      if(which === 'low') handleLow(clamp(l + delta))
      else handleHigh(clamp(h + delta))
    }
  }

  return (
    <div className="relative w-full">
      <div className="h-2 bg-gray-200 rounded relative">
        <div className="absolute h-2 bg-accent rounded" style={{left: `${pct(l)}%`, right: `${100 - pct(h)}%`}} />
      </div>

      {/* Native range inputs remain for pointer dragging; visually transparent but capture pointer */}
      <input aria-hidden type="range" min={min} max={max} value={l} onChange={(e)=> handleLow(Number(e.target.value))} className="absolute left-0 top-0 w-full appearance-none bg-transparent" />
      <input aria-hidden type="range" min={min} max={max} value={h} onChange={(e)=> handleHigh(Number(e.target.value))} className="absolute left-0 top-0 w-full appearance-none bg-transparent" />

      {/* Custom thumbs for visual polish and keyboard access */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Minimum price"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={l}
        onKeyDown={handleThumbKey('low')}
        className="absolute -top-3 w-6 h-6 rounded-full bg-white border shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent" 
        style={{ left: `calc(${pct(l)}% - 12px)` }}
      >
        <div className="w-2 h-2 bg-accent rounded-full" />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Maximum price"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={h}
        onKeyDown={handleThumbKey('high')}
        className="absolute -top-3 w-6 h-6 rounded-full bg-white border shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent" 
        style={{ left: `calc(${pct(h)}% - 12px)` }}
      >
        <div className="w-2 h-2 bg-accent rounded-full" />
      </div>

      <div className="mt-6 flex justify-between text-sm">
        <div className="text-sm">${l}</div>
        <div className="text-sm">${h}</div>
      </div>
    </div>
  )
}
