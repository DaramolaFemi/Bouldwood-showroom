# Bouldwood Showroom

A responsive furniture showroom built with React, TypeScript, Vite and Motion for a portfolio-grade ecommerce demo.

## Development

Use Node 22.12+ or Node 24. Run `npm install`, then `npm run dev`.

- `npm run build` - production build in `dist`
- `npm run typecheck` - TypeScript validation
- `npm test` - Chrome shopping, accessibility, responsive and storage regression checks. Start the dev server first; default test URL is `http://127.0.0.1:5174`. Override with `TEST_URL`.
- `node scripts/inspect.cjs` - scroll through and capture desktop, dark and mobile screenshots in `tmp` with accessibility diagnostics.
- `node scripts/optimize-editorial.cjs` - regenerate responsive AVIF/WebP/JPEG editorial assets.

## Behaviour and scope

Cart and theme preferences are stored only in the visitor's browser. Cart data is validated against the bundled catalogue; quantities are constrained to 1-99. The unsafe legacy shared cart sync endpoint returns 410 and the optional server binds only to localhost. Remote persistence needs authenticated sessions and per-user authorization before it can be enabled.

Checkout is a selection review, with no card collection or order submission. Real orders require a payment provider, server-side price validation, fulfilment, and a confirmed product catalogue. The editorial photographs are illustrative stock images, not verified photographs of the named products. Existing catalogue descriptions/prices remain demo data.

Motion is limited to transforms and short transitions; reduced-motion preferences are respected. Images are local and responsive, with eager loading for the hero and lazy loading below the fold. No smooth-scroll interception, WebGL render loop or redundant animation frameworks.

## Deployment

Deploy `dist` to a static host. Vercel can build this app with `npm run build` and output directory `dist`.

`public/_headers` and `_redirects` supply security headers and SPA routing on hosts that support that format. Vercel uses its project configuration for equivalent headers and fallback routing, so verify those headers and HTTPS on the deployed site. A local dependency audit is not a production security certification.

Fonts currently load from Google Fonts with system fallbacks. Logo artwork comes from the supplied `imgs` directory; CSS isolates the black logo from its brand board and suppresses the baked checkerboard in the white logo.

## Photography

Unsplash editorial references: living room `photo-1600210492486-724fe5c67fb0`, sofa `photo-1555041469-a586c61ea9bc`, chair `photo-1567538096630-e0c55bd6374c`, dining room `photo-1770988962875-1a9f50e56eb6`. Replace illustrative imagery with verified catalogue photography before enabling purchases.
