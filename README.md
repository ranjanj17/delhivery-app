# Delhivery App Clone

A premium, highly-animated, pixel-perfect clone of the Delhivery mobile application built with React Native and Expo. This project pushes the boundaries of UI/UX engineering by employing complex custom animations, fluid gestures, and organic vector graphics to create a world-class user experience.

## ✨ Features

- **World-Class Animated Backgrounds**: 
  - A dynamic sky gradient simulating a beautiful sunrise/sunset.
  - Organic, soft-filled clouds built by dynamically merging SVGs.
  - A classic delivery plane soaring continuously across the prime visual area (navbar) with pulsating smoke and speed trails.
  - Twinkling, randomly placed stars using Reanimated opacity loops.
- **True Infinite Auto-Playing Carousel**: 
  - A custom-built horizontal scroll view that infinitely loops through promotional assets (like the Rakhi GIF) and static banners without jarring backward rewinds.
- **Fluid Bottom Tab Bar**: 
  - Animated layout transitions and active indicators using React Native Reanimated.
- **Pixel-Perfect Styling**: 
  - Strictly follows the Delhivery brand guidelines (Red `#EA2C3E`, soft yellows, and crisp typography).

## 🛠️ Technology Stack

This project is built using bleeding-edge mobile technologies:

- **Core Framework**: [React Native 0.81](https://reactnative.dev/) & [React 19.1](https://react.dev/)
- **Build & Routing**: [Expo SDK 54](https://expo.dev/) & [Expo Router](https://docs.expo.dev/router/introduction/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety.
- **Animations & Gestures**: 
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) (for 60FPS fluid UI threads)
  - [Moti](https://moti.fyi/)
  - [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- **Vector Graphics & Icons**: 
  - [react-native-svg](https://github.com/software-mansion/react-native-svg)
  - [lucide-react-native](https://lucide.dev/)
- **State Management**: Redux Toolkit & Zustand
- **Local Storage**: react-native-mmkv
- **UI Components**: @gorhom/bottom-sheet, @shopify/flash-list

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm, yarn, or bun
- Expo CLI
- Expo Go app on your physical device or an iOS/Android emulator.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ranjanj17/delhivery-app.git
   cd delhivery-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   *Note: Use `npm run --clear` if you encounter cache issues.*

4. Press `i` to open in iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app.

## 🏗️ Architecture & How It Works

- **`src/screens/`**: Contains the main screen views (e.g., `HomeScreen.tsx`). The Home Screen employs a transparent content layer to allow the dynamic background to shine through seamlessly.
- **`src/components/`**: Modular, reusable UI pieces. 
  - `HomeAnimatedBackground.tsx`: Houses the core animation engine using `useSharedValue` and `withRepeat` to drive the plane, clouds, and stars entirely on the UI thread for zero frame drops.
  - `HomeBannerCarousel.tsx`: Implements the true infinite loop by rendering cloned slides at the start and end boundaries and resetting the `contentOffset` instantly when a boundary is hit.
- **`src/theme/`**: Centralized design tokens (colors, spacing, radii) mapping precisely to the brand identity.

## 🤝 Contributing

This is a demonstration project built with a focus on UI engineering excellence. Feel free to fork, explore the animations, and adapt them into your own world-class applications!
