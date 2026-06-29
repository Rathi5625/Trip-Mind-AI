const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images');
const images = [
  'india_taj_mahal.png',
  'india_luxury_hotel.png',
  'india_kerala_houseboat.png',
  'india_varanasi_ghats.png',
  'india_jaipur_hawa_mahal.png',
  'india_kerala_backwaters.png',
  'india_goa_beach.png',
  'switzerland_chalet.png',
  'rome_street.png',
  'tokyo_shibuya.png',
  'paris_cafe.png',
  'new_york_skyline.png',
  'sydney_opera_house.png'
];

// Copy to hotel_1.png to hotel_25.png
for (let i = 1; i <= 25; i++) {
  const src = images[(i - 1) % images.length];
  fs.copyFileSync(path.join(imgDir, src), path.join(imgDir, `hotel_${i}.png`));
}

// Copy to place_1.png to place_25.png
for (let i = 1; i <= 25; i++) {
  const src = images[(i + 3) % images.length];
  fs.copyFileSync(path.join(imgDir, src), path.join(imgDir, `place_${i}.png`));
}

// Copy to india_1.png to india_15.png
const indiaImages = [
  'india_taj_mahal.png',
  'india_luxury_hotel.png',
  'india_kerala_houseboat.png',
  'india_varanasi_ghats.png',
  'india_jaipur_hawa_mahal.png',
  'india_kerala_backwaters.png',
  'india_goa_beach.png'
];
for (let i = 1; i <= 15; i++) {
  const src = indiaImages[(i - 1) % indiaImages.length];
  fs.copyFileSync(path.join(imgDir, src), path.join(imgDir, `india_${i}.png`));
}

console.log('Successfully generated 65 prototype image assets in public/images!');
