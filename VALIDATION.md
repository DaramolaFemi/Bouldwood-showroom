# Validation — 8 September 2026 Very important.

- Production build and strict TypeScript checks passed.
- All four Playwright scenarios passed (shopping flow rerun after correcting a test locator's page-transition wait).
- Automated WCAG A/AA checks reported zero violations for home, collection, product, cart and review pages in light/dark themes. These automated checks do not replace a full accessibility audit.
- Chrome visual inspection scrolled the homepage and captured desktop (1440 px), mobile (390 px) and dark-mode screenshots. No page errors in the final inspection; no horizontal overflow on tested mobile routes, including the 404 page.
- Shopping checks cover search/no results, quick view/Escape, mobile filters, quantity constraints, cart persistence, save for later, selection review and tampered browser storage.
- Root and server dependency installation audits reported zero known vulnerabilities after upgrading Vite, React Router, Sharp and Express.
- Production JavaScript: 103.19 kB gzip. CSS: 5.67 kB gzip. Responsive images use AVIF/WebP; the hero is preloaded and other images are lazy loaded.
- Initial local performance sample with 390 px viewport, 4× CPU throttling, 150 ms network latency and 200 kB/s download: LCP 3.728 s, CLS 0.0030. After responsive hero preload: LCP 2.472 s, CLS 0.0030, three observed long tasks, 289 kB reported resource transfer. Local lab samples are not field Core Web Vitals or a guarantee of device/network performance.

## Before accepting real orders, things must be done.

Connect a payment provider and authenticated backend, verify catalogue prices/specifications/photos, and verify HTTPS and actual response security headers on the chosen hosting platform. The current review flow does not collect payment details or create orders. Editorial stock photos are illustrative.
