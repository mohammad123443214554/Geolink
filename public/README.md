# 📁 Geolink Public Folder

Ye folder **root level** pe rahega - `Geolink/public/`

## 📂 Folder Structure:

```
public/
├── logo.png                  ← Dark mode logo (tera triangle wala)
├── logo-white.png            ← Light mode logo  
├── favicon.ico               ← Browser tab icon (32x32)
├── manifest.json             ← PWA config file
├── sw.js                     ← Service Worker (offline support)
├── robots.txt                ← SEO file
│
├── images/                   ← Default images
│   ├── default-avatar.png    ← User icon (400x400)
│   ├── default-cover.jpg     ← Cover photo (1200x400)
│   └── placeholder.png       ← Video loading (800x600)
│
└── icons/                    ← Navigation icons
    ├── home.svg              ← Home icon
    ├── search.svg            ← Search icon
    ├── upload.svg            ← Upload icon
    ├── profile.svg           ← Profile icon
    ├── icon-192x192.png      ← PWA icon small
    └── icon-512x512.png      ← PWA icon large
```

## 🚀 Kaise Use Karein:

### Code mein images use karna:
```jsx
// Logo
<img src="/logo.png" alt="Geolink" />

// Default avatar
<img src="/images/default-avatar.png" alt="User" />

// Icons (SVG)
<img src="/icons/home.svg" alt="Home" />
```

### PWA Files:
- **manifest.json** → Automatically load hoga
- **sw.js** → Service worker register hoga
- **favicon.ico** → Browser tab mein dikhega

## ✅ Features:

- ✅ Dark/Light mode logos ready
- ✅ PWA icons (192x192 & 512x512)
- ✅ Default images for users
- ✅ Navigation SVG icons
- ✅ Offline support ready
- ✅ SEO optimized (robots.txt)

**Created by:** Claude + Mohammad Khan  
**Platform:** Geolink  
**Date:** April 2026
