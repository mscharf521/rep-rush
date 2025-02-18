import sharp from 'sharp';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceUrl = 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f4aa.png';
const iconDir = path.join(__dirname, 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// Download the image first
https.get(sourceUrl, (response) => {
  const chunks = [];
  
  response.on('data', (chunk) => {
    chunks.push(chunk);
  });

  response.on('end', async () => {
    const imageBuffer = Buffer.concat(chunks);
    
    // Generate icons for each size
    for (const size of sizes) {
      try {
        await sharp(imageBuffer)
          .resize(size, size)
          .toFile(path.join(iconDir, `icon-${size}x${size}.png`));
        console.log(`Generated ${size}x${size} icon`);
      } catch (error) {
        console.error(`Error generating ${size}x${size} icon:`, error);
      }
    }
  });
}).on('error', (error) => {
  console.error('Error downloading image:', error);
}); 