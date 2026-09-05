import React, {useEffect, useState} from 'react'

type Variant = { src: string; media?: string }
type Props = {
  src: string // base image URL (Unsplash or similar)
  alt?: string
  sizes?: string
  className?: string
  variants?: Variant[] // art-direction variants for different media queries
  darkSrc?: string
}

const widths = [360, 640, 960, 1280, 1600]

// Cache for URL existence checks to avoid repeated network probes
const existenceCache: Map<string, boolean> = new Map()

async function urlExists(url:string){
  if(existenceCache.has(url)) return existenceCache.get(url)
  try{
    const res = await fetch(url, { method: 'HEAD' })
    const ok = res.ok
    existenceCache.set(url, ok)
    return ok
  }catch(_){
    // try a small GET as fallback
    try{
      const res2 = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-0' } })
      const ok2 = res2.ok
      existenceCache.set(url, ok2)
      return ok2
    }catch(err){
      existenceCache.set(url, false)
      return false
    }
  }
}

function makeUrl(base:string, w:number, fmt?: 'avif' | 'webp' | 'jpg'){
  // If base is a local asset (starts with '/') we assume pre-generated
  // files named like `${base}-${w}.avif|webp|jpg` (no extension on `base`).
  if (base.startsWith('/')){
    const ext = fmt === 'avif' ? 'avif' : fmt === 'webp' ? 'webp' : 'jpg'
    return `${base}-${w}.${ext}`
  }

  const sep = base.includes('?') ? '&' : '?'
  const fm = fmt && fmt !== 'jpg' ? `&fm=${fmt}` : ''
  return `${base}${sep}w=${w}&q=80&fit=crop${fm}`
}

export default function ResponsiveImage({src, alt='', sizes='(max-width: 768px) 100vw, 50vw', className='', variants, darkSrc}:Props){
  const makeSrcSet = (base:string, fmt?: 'avif'|'webp'|'jpg')=> widths.map(w=> `${makeUrl(base,w,fmt)} ${w}w`).join(', ')
  const fallback = makeUrl(src, widths[2], 'jpg')
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  const [preferDark, setPreferDark] = useState(false)

  useEffect(()=>{
    if(!isDark) return
    // Determine candidate bases to probe: variants or the single src
    const bases = variants && variants.length>0 ? variants.map(v=> v.src) : [src]
    let mounted = true
    ;(async ()=>{
      for(const b of bases){
        if(!b || !b.startsWith('/')) continue
        const darkBase = `${b}-dark`
        const testUrl = makeUrl(darkBase, widths[0], 'avif')
        try{
          const ok = await urlExists(testUrl)
          if(ok && mounted){ setPreferDark(true); break }
        }catch(_){}
      }
    })()
    return ()=>{ mounted = false }
  },[isDark, src, variants])

  // Helper to render source group for a base src
  const renderSourceGroup = (base:string, media?:string)=> {
    // If this is a local asset and dark mode is active and dark files are available, prefer generated `-dark` files.
    const resolvedBase = (isDark && preferDark && base.startsWith('/')) ? `${base}-dark` : base
    return (
      <>
        <source type="image/avif" srcSet={makeSrcSet(resolvedBase,'avif')} sizes={sizes} media={media} />
        <source type="image/webp" srcSet={makeSrcSet(resolvedBase,'webp')} sizes={sizes} media={media} />
        <source type="image/jpeg" srcSet={makeSrcSet(resolvedBase,'jpg')} sizes={sizes} media={media} />
      </>
    )
  }

  return (
    <picture>
      {variants && variants.length>0 ? (
        // Render art-direction variants first (desktop, mobile, etc.)
        variants.map((v, idx)=> {
          const base = isDark && darkSrc ? darkSrc : v.src
          return <React.Fragment key={idx}>{renderSourceGroup(base, v.media)}</React.Fragment>
        })
      ) : (
        renderSourceGroup(isDark && darkSrc ? darkSrc : src)
      )}

      <img src={fallback} alt={alt} className={className} loading="lazy" decoding="async" />
    </picture>
  )
}

function srcDarkFallback(){
  try{
    // naive: if module scope has document and a global 'dark' class, consumers can pass `darkSrc` prop in future
    return undefined
  }catch{ return undefined }
}
