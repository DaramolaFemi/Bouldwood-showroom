const sharp = require("sharp");
const fs = require("fs");
(async () => {
  for (const name of ["living", "sofa", "chair", "table"]) {
    for (const width of [360, 640, 960, 1280, 1600]) {
      await sharp(`public/assets/editorial/${name}.jpg`)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(`public/assets/editorial/${name}-${width}.webp`);
      await sharp(`public/assets/editorial/${name}.jpg`)
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: 55 })
        .toFile(`public/assets/editorial/${name}-${width}.avif`);
      await sharp(`public/assets/editorial/${name}.jpg`)
        .resize(width, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(`public/assets/editorial/${name}-${width}.jpg`);
    }
  }
})();
