# Bouldwood Shopify port

This branch is the Shopify-theme implementation of Bouldwood. The React/Vite storefront on `main` remains the protected visual reference.

## Architecture

Shopify is the commerce source of truth:
- Products, prices, variants and inventory come from Shopify Admin.
- Product material and dimensions can use `custom.material` and `custom.dimensions` metafields.
- Cart uses Shopify's native cart.
- Checkout uses Shopify checkout.
- No mock checkout or localStorage cart is used by the theme.

## Migration status

Phase 1 creates a valid Online Store 2.0 skeleton plus native product, collection and cart foundations. The existing Bouldwood homepage and detailed editorial styling should be ported section-by-section rather than rewritten wholesale.

## Safety

Do not merge this branch into `main` until the Shopify storefront has reached visual parity and has been tested in a Shopify development store.
