import sharp from 'sharp';
import fs from 'fs';

async function makeTransparent() {
  const inputPath = 'public/image.png';
  const outputPath = 'public/tju-logo-transparent.png';

  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4: r, g, b, a

  // Find bounding box of non-black content as well to crop extra empty space
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Black background detection (pure black or near black compression artifacts)
      const maxVal = Math.max(r, g, b);
      if (maxVal < 25) {
        // Fully transparent
        data[idx + 3] = 0;
      } else if (maxVal < 45) {
        // Soft feathering on the edges for smooth anti-aliasing
        data[idx + 3] = Math.round(((maxVal - 25) / 20) * 255);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Padding
  const pad = 10;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, maxX - minX + pad * 2);
  const cropH = Math.min(height - cropY, maxY - minY + pad * 2);

  const transparentBuffer = await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toBuffer();

  fs.writeFileSync(outputPath, transparentBuffer);
  fs.writeFileSync('src/assets/tju-logo-transparent.png', transparentBuffer);
  console.log('Transparent logo created successfully! Size:', cropW, 'x', cropH);
}

makeTransparent().catch(console.error);
