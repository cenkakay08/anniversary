# Forever Together | Our Anniversary 💖

A premium, interactive digital celebration experience dedicated to my one and only love. This project counts every precious moment of our journey and showcases our most beautiful memories with high-end animations and interactive elements.

> "As time flows with you, every second becomes even more precious..."

## ✨ Premium Features

- **Interactive Love Engine**: A physics-based draggable heart with a spring connection that follows your every move.
- **Neon Flower Bouquet**: A stunning, hand-crafted SVG bouquet with realistic neon drawing animations and glowing effects.
- **Dome Gallery**: An immersive 3D-like memory gallery featuring our most cherished photos with smooth touch and zoom interactions.
- **Couple Portraits**: Dynamic portraits flanked by a beating heart and orbiting particles, celebrating the two of us.
- **Live Duration Tracker**: Real-time counter calculating every Year, Month, Day, Hour, Minute, and Second since our journey began (January 23, 2025).
- **Staggered Entrance**: A buttery smooth opening sequence with unified visibility transitions and subtle slide-up effects.
- **Ambient Atmosphere**: Full-screen fireworks background and custom SEO-optimized branding.

## 🚀 Technologies

- **Core**: [Next.js](https://nextjs.org/) (React) & [TypeScript](https://www.typescriptlang.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for physics and transitions.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS for complex neon effects.
- **Effects**: [fireworks-js](https://fireworks.js.org/) for the celebration background.

## 🛠️ Development

To start the local development experience:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 🖼️ Image Optimization

The project uses a custom multi-resolution image optimization system to ensure fast loading on all devices.

To process new images:

1. Place your target images in `public/images/`.
2. Run the optimization script:

```bash
npm run optimize-images
```

This will generate optimized versions (320px to 1200px) in `public/images/optimized/`. The application uses a custom Next.js loader to dynamically serve the best resolution for the user's screen.

## 📁 Project Structure

- `pages/index.tsx`: The heart of the application, orchestrating the interactive journey.
- `components/`:
  - `NeonFlowerBouquet`: Hand-coded SVG art with neon animations.
  - `MemoryGallery`: The 3D-like image showcase (DomeGallery).
  - `CouplePortrait`: Portraits and celebratory heart animations.
  - `InteractiveHeart`: Physics-driven drag interactions.
  - `Duration`: The core time tracking logic.
- `styles/globals.css`: Custom design tokens, neon keyframes, and global animations.

## 📜 License

Created with ❤️ specifically for our anniversary. Personal and private use only.
