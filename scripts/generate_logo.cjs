const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Generate SVG for "Vòng Xoay Duyên Khởi"
// Using viewBox 0 0 512 512
// Center cx = 256, cy = 256
// Outer ring radius = 230, inner disk radius = 195

function generateSvg() {
  const cx = 256;
  const cy = 256;
  const R = 195; // Radius of the inner Yin-Yang disk
  const R_outer = 235; // Outer dark ring radius

  // Let's create the Taiji S-curve path.
  // The disk is centered at (cx, cy).
  // In classic Taiji rotated slightly:
  // Red shape:
  // - Top semicircle / arc along the perimeter: from left point P_left to right point P_right.
  // - On the right side, a smooth bulbous curve downwards into the center (cx, cy).
  // - From the center (cx, cy), a smooth concave curve curving back to P_left.
  
  // Let angle offset be around -12 degrees (rotated counter-clockwise slightly)
  // Let angle = -14 * Math.PI / 180;
  // Let's parameterize with high precision cubic beziers:
  
  // Left perimeter point: angle 180 - 15 = 165 deg
  // Right perimeter point: angle 0 - 15 = -15 deg (or 345 deg)
  
  // Alternatively, let's look at the standard Taiji formula:
  // A circle of radius R.
  // Upper boundary: Arc from (-R, 0) to (R, 0) of radius R (perimeter).
  // Right lobe: Arc from (R, 0) to (0, 0) of radius R/2 curving downwards/right.
  // Left lobe: Arc from (0, 0) to (-R, 0) of radius R/2 curving downwards/left (concave to the upper shape).
  // When rotated by angle alpha, this creates the exact Yin-Yang flow!
  
  // In our image:
  // Look at the divider line:
  // At the center (cx, cy), the line goes horizontally, with red on top, gold on bottom.
  // As it goes right: red expands downwards, forming a rounded lobe at (cx + R/2, cy + ~15..20).
  // As it goes left: gold expands upwards, forming a rounded lobe at (cx - R/2, cy - ~15..20).
  // This means the two lobe centers are:
  // Right lobe: (cx + R/2 * cos(theta), cy + R/2 * sin(theta)) with theta around 15° to 20° (downwards).
  // Left lobe: (cx - R/2 * cos(theta), cy - R/2 * sin(theta)) with theta around 15° to 20° (upwards).
  
  const theta = 18 * Math.PI / 180; // 18 degrees tilt
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  
  // Perimeter points:
  // P1 (Right-ish): cx + R * cosT, cy + R * sinT
  // P2 (Left-ish): cx - R * cosT, cy - R * sinT
  const p1x = (cx + R * cosT).toFixed(2);
  const p1y = (cy + R * sinT).toFixed(2);
  const p2x = (cx - R * cosT).toFixed(2);
  const p2y = (cy - R * sinT).toFixed(2);
  
  const rLobe = (R / 2).toFixed(2);

  // Red path:
  // Start at P2 (left rim)
  // Arc along top perimeter (large-arc 0, sweep 1) to P1 (right rim)
  // Arc from P1 to center (cx, cy) with radius rLobe, sweep 1 (bulging downwards into right quadrant)
  // Arc from center to P2 with radius rLobe, sweep 0 (concave, accommodating the left lobe of gold)
  const redPath = `M ${p2x} ${p2y} A ${R} ${R} 0 0 1 ${p1x} ${p1y} A ${rLobe} ${rLobe} 0 0 1 ${cx} ${cy} A ${rLobe} ${rLobe} 0 0 0 ${p2x} ${p2y} Z`;

  // Gold path:
  // Start at P1 (right rim)
  // Arc along bottom perimeter (large-arc 0, sweep 1) to P2 (left rim)
  // Arc from P2 to center (cx, cy) with radius rLobe, sweep 1 (bulging upwards into left quadrant)
  // Arc from center to P1 with radius rLobe, sweep 0 (concave, accommodating the right lobe of red)
  const goldPath = `M ${p1x} ${p1y} A ${R} ${R} 0 0 1 ${p2x} ${p2y} A ${rLobe} ${rLobe} 0 0 1 ${cx} ${cy} A ${rLobe} ${rLobe} 0 0 0 ${p1x} ${p1y} Z`;

  // Center Star (Dấu ấn Tứ Trụ):
  // 4 points pointing North, South, East, West.
  // Center is (cx, cy).
  // Flare length: 36px.
  // Core width: 9px.
  // Beautiful hypocycloid / 4-pointed curved star:
  const starRadius = 40;
  const innerRadius = 8;
  
  // Star path using 4 symmetric cubic beziers:
  // (cx, cy - starRadius) -> (cx + starRadius, cy) -> (cx, cy + starRadius) -> (cx - starRadius, cy) -> close
  const starPath = `
    M ${cx} ${cy - starRadius}
    Q ${cx + innerRadius} ${cy - innerRadius} ${cx + starRadius} ${cy}
    Q ${cx + innerRadius} ${cy + innerRadius} ${cx} ${cy + starRadius}
    Q ${cx - innerRadius} ${cy + innerRadius} ${cx - starRadius} ${cy}
    Q ${cx - innerRadius} ${cy - innerRadius} ${cx} ${cy - starRadius}
    Z
  `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Outer Ring Color -->
    <!-- Red Ribbon Gradient: Deep Crimson Ruby to Rich Scarlet -->
    <radialGradient id="redRibbonGrad" cx="42%" cy="30%" r="68%" fx="38%" fy="25%">
      <stop offset="0%" stop-color="#c52828"/>
      <stop offset="40%" stop-color="#a81c1c"/>
      <stop offset="85%" stop-color="#831212"/>
      <stop offset="100%" stop-color="#690a0a"/>
    </radialGradient>

    <!-- Golden-Peach Ribbon Gradient: Warm Amber Gold to Radiant Peach Coral -->
    <radialGradient id="goldRibbonGrad" cx="35%" cy="65%" r="70%" fx="30%" fy="60%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="35%" stop-color="#e28b3b"/>
      <stop offset="70%" stop-color="#e89278"/>
      <stop offset="100%" stop-color="#e29b82"/>
    </radialGradient>

    <!-- Star Glow & Shimmer -->
    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#fef08a" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#f59e0b" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="starCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fef9c3"/>
      <stop offset="80%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </radialGradient>

    <!-- Subtle Drop Shadow for depth -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- 1. Outer Dark Midnight Indigo Ring -->
  <circle cx="${cx}" cy="${cy}" r="${R_outer}" fill="#19182b"/>

  <!-- 2. Inner Disc: Hai Dải Lụa / Sợi Chỉ Hồng Quấn Quýt (Âm Dương Duyên Khởi) -->
  <g>
    <!-- Sợi Chỉ Đỏ / Dải Lụa Đỏ (Dương / Hỷ Khí / Chu Sa) -->
    <path d="${redPath}" fill="url(#redRibbonGrad)"/>

    <!-- Dải Lụa Vàng Cam / Hổ Phách Đào Hồng (Âm / Phúc Trạch / Hoàng Kim) -->
    <path d="${goldPath}" fill="url(#goldRibbonGrad)"/>
  </g>

  <!-- 3. Tâm Điểm: Ngôi Sao / Dấu Ấn Tứ Trụ (Giao Thoa Thời Gian & Nhân Duyên) -->
  <!-- Outer Aura Halo -->
  <circle cx="${cx}" cy="${cy}" r="45" fill="url(#starGlow)"/>

  <!-- 4-Pointed Star -->
  <path d="${starPath.trim()}" fill="url(#starCore)" filter="url(#softGlow)"/>

  <!-- Center Pure White Pearl / Pivot of Destiny -->
  <circle cx="${cx}" cy="${cy}" r="11.5" fill="#ffffff"/>
  <circle cx="${cx}" cy="${cy}" r="14" stroke="#fef08a" stroke-width="1.5" fill="none" opacity="0.6"/>
</svg>`;

  return svg;
}

const svgContent = generateSvg();
fs.writeFileSync(path.join(__dirname, '../public/logo.svg'), svgContent, 'utf8');
console.log('Saved public/logo.svg');

// Also render PNGs
async function renderPngs() {
  const svgBuffer = Buffer.from(svgContent);

  // logo.png (512x512)
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(__dirname, '../public/logo.png'));
  console.log('Saved public/logo.png (512x512)');

  // logo.jpg (1024x1024) - Replace old legacy logo.jpg so no scraper or mode gets the old image
  await sharp(svgBuffer)
    .resize(1024, 1024)
    .flatten({ background: '#19182b' })
    .jpeg({ quality: 95 })
    .toFile(path.join(__dirname, '../public/logo.jpg'));
  console.log('Saved public/logo.jpg (1024x1024)');

  // Also replace old src/assets/images/app_logo_1788426698375.jpg
  const oldSrcLogoPath = path.join(__dirname, '../src/assets/images/app_logo_1788426698375.jpg');
  if (fs.existsSync(path.dirname(oldSrcLogoPath))) {
    await sharp(svgBuffer)
      .resize(1024, 1024)
      .flatten({ background: '#19182b' })
      .jpeg({ quality: 95 })
      .toFile(oldSrcLogoPath);
    console.log('Saved src/assets/images/app_logo_1788426698375.jpg');
  }

  // icon-512.png
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(__dirname, '../public/icon-512.png'));

  // icon-192.png
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon-192.png'));

  // favicon.png (64x64)
  await sharp(svgBuffer).resize(64, 64).png().toFile(path.join(__dirname, '../public/favicon.png'));

  // favicon.ico (32x32 PNG-in-ICO format supported by all modern browsers/scrapers)
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));
  console.log('Saved public/favicon.ico (32x32)');

  // apple-touch-icon.png (180x180)
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // og-image.png (1200x630 banner with logo centered on elegant background)
  const logoBanner = await sharp(svgBuffer).resize(420, 420).png().toBuffer();
  
  // SVG background for OG image - Slogan: Vòng Xoay Duyên Khởi (bỏ chữ Triết lý thiết kế)
  const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ogBg" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#2a2238"/>
        <stop offset="60%" stop-color="#181524"/>
        <stop offset="100%" stop-color="#0f0d18"/>
      </radialGradient>
      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="50%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#ogBg)"/>
    <circle cx="280" cy="315" r="220" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,6" opacity="0.4"/>
    <text x="560" y="270" font-family="'Cinzel', serif, Arial" font-size="52" font-weight="bold" fill="url(#goldText)">LỊCH ÂM DƯƠNG</text>
    <text x="560" y="335" font-family="'Cinzel', serif, Arial" font-size="44" font-weight="bold" fill="#ffffff">&amp; BÁT TỰ TỨ TRỤ</text>
    <rect x="555" y="365" width="410" height="44" rx="8" fill="rgba(245, 158, 11, 0.16)" stroke="#f59e0b" stroke-width="1.8"/>
    <text x="760" y="396" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#fef08a" letter-spacing="1.5">VÒNG XOAY DUYÊN KHỞI</text>
    <text x="560" y="445" font-family="Arial, sans-serif" font-size="20" fill="#e5e7eb">Giao Thoa Thời Gian &amp; Nhân Duyên • Bát Tự &amp; Hôn Nhân Cát Tường</text>
  </svg>`;
  
  const ogBgBuffer = Buffer.from(ogSvg);
  await sharp(ogBgBuffer)
    .composite([{ input: logoBanner, left: 70, top: 105 }])
    .png()
    .toFile(path.join(__dirname, '../public/og-image.png'));
  console.log('Saved public/og-image.png');
}

renderPngs().catch(console.error);
