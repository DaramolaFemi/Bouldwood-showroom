module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f1724',
        accent: '#b08968',
        muted: '#6b7280'
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Source Serif 4', 'serif']
      },
      fontSize: {
        xs: ['0.8rem', {lineHeight: '1rem'}],
        sm: ['0.95rem',{lineHeight:'1.25rem'}],
        base: ['1rem',{lineHeight:'1.5rem'}],
        lg: ['1.125rem',{lineHeight:'1.75rem'}],
        xl: ['1.25rem',{lineHeight:'1.75rem'}],
        '2xl': ['1.5rem',{lineHeight:'2rem'}]
      },
      boxShadow: {
        soft: '0 6px 20px rgba(15,23,36,0.08)'
      }
    }
  },
  plugins: []
}
