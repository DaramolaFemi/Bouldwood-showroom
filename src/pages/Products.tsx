import React, {useState, useMemo, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { products as all } from '../data/products'
import ProductCard from '../components/ProductCard'
import Modal from '../components/Modal'
import ProductGallery from '../components/ProductGallery'
import FiltersSidebar from '../components/FiltersSidebar'
import SkeletonCard from '../components/SkeletonCard'


export default function Products(){
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [quick, setQuick] = useState<string | null>(null)
  const [filters, setFilters] = useState<{minPrice?:number; maxPrice?:number; materials?:string[]}>({})
  const [searchParams, setSearchParams] = useSearchParams()

  // initialize from URL
  useEffect(()=>{
    const q = searchParams.get('q') || ''
    setQuery(q)
    const min = searchParams.get('min')
    const max = searchParams.get('max')
    const mats = searchParams.get('materials')
    setFilters({ minPrice: min? Number(min): undefined, maxPrice: max? Number(max): undefined, materials: mats? mats.split(',') : [] })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // derive price bounds from data
  const minAvailable = Math.min(...all.map(p=>p.price))
  const maxAvailable = Math.max(...all.map(p=>p.price))

  const list = useMemo(()=> {
    return all.filter(p=> {
      if(query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      if(filters.minPrice !== undefined && p.price < filters.minPrice) return false
      if(filters.maxPrice !== undefined && p.price > filters.maxPrice) return false
      if(filters.materials && filters.materials.length>0){
        const mat = p.material?.toLowerCase() || ''
        const ok = filters.materials.some(m=> mat.includes(m.toLowerCase()))
        if(!ok) return false
      }
      return true
    })
  }, [query, filters])

  const applyFilters = (f:{minPrice?:number; maxPrice?:number; materials?:string[]})=>{
    setFilters(f)
    const params:any = {}
    if(query) params.q = query
    if(f.minPrice !== undefined) params.min = String(f.minPrice)
    if(f.maxPrice !== undefined) params.max = String(f.maxPrice)
    if(f.materials && f.materials.length>0) params.materials = f.materials.join(',')
    setSearchParams(params)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display">Shop</h1>
        <div className="flex items-center gap-4">
          <input aria-label="Search products" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products" className="px-3 py-2 border rounded" />
          <button className="md:hidden px-3 py-2 border" onClick={()=>setFilterOpen(true)}>Filters</button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block">
          <FiltersSidebar
            materials={[...new Set(all.flatMap(p=> p.material? [p.material]: []))]}
            minPrice={minAvailable}
            maxPrice={maxAvailable}
            filters={{ minPrice: filters.minPrice, maxPrice: filters.maxPrice, materials: filters.materials }}
            onFilter={(f)=> applyFilters(f)}
          />
        </div>
        <div className="md:col-span-3">
          {loading? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {Array.from({length:6}).map((_,i)=>(<SkeletonCard key={i} />))}
            </div>
          ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {list.map(p=> <div key={p.id}><ProductCard p={p} onQuickView={(prod)=>setQuick(prod.id)} /></div>)}
            </div>
          )}
        </div>
      </div>

      <Modal open={filterOpen} onClose={()=>setFilterOpen(false)}>
        <FiltersSidebar onFilter={()=>setFilterOpen(false)} />
      </Modal>

      <Modal open={!!quick} onClose={()=>setQuick(null)}>
        {quick && (
          <div className="grid md:grid-cols-2 gap-6">
            <ProductGallery images={(all.find(x=> x.id===quick)!).images} />
            <div>
              <h3 className="text-xl font-display">{all.find(x=> x.id===quick)!.name}</h3>
              <p className="mt-4 text-muted">{all.find(x=> x.id===quick)!.description}</p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-black text-white">Add to cart</button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Mobile filter modal uses same FiltersSidebar and passes bounds */}
      <Modal open={filterOpen} onClose={()=>setFilterOpen(false)}>
        <FiltersSidebar
          materials={[...new Set(all.flatMap(p=> p.material? [p.material]: []))]}
          minPrice={minAvailable}
          maxPrice={maxAvailable}
          filters={{ minPrice: filters.minPrice, maxPrice: filters.maxPrice, materials: filters.materials }}
          onFilter={(f)=>{ setFilters(f); setFilterOpen(false) }}
        />
      </Modal>
    </div>
  )
}
