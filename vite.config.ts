import { defineConfig } from 'vite'

// Dynamically import ESM-only plugin to avoid require/ESM interop issues
export default (async ()=>{
  const mod = await import('@vitejs/plugin-react')
  const react = (mod as any).default || mod
  return defineConfig({
    plugins: [react()],
    server: { 
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5174',
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p
        }
      }
    }
  })
})()
