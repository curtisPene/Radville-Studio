# Radaville Studio

A modern, animated portfolio website for Radaville Studio - a multidisciplinary design studio. Features immersive animations, interactive carousel, SVG morphing effects, and smooth page transitions.

## Features

- **Immersive Intro Animation** - Custom SVG morphing effects with GSAP animations
- **3D Carousel** - Interactive carousel showcasing portfolio work with 3D perspective transforms
- **Smooth Transitions** - Page transitions and animations powered by GSAP
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Dynamic Scaling** - Intelligent scaling calculations for full-screen animations
- **State Management** - Redux for global state management

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **GSAP** - Advanced animations and timelines
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd radaville-studio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # App-level components and routing
├── components/             # Reusable components
│   ├── IntroAnimation.tsx  # Intro animation with morphing effects
│   ├── Pipe.tsx           # Pipe component for intro
│   └── WindowListener.tsx  # Window event handling
├── features/
│   └── carousel/          # Carousel feature
│       ├── components/    # Carousel-specific components
│       ├── hooks/         # Custom carousel hooks
│       └── pages/         # Carousel page
├── stores/                # Redux slices and store
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── index.css             # Global styles
```

## Key Components

### IntroAnimation
Wraps the intro sequence with GSAP animations including:
- Sequential animations for pipes and text
- Button hover/click interactions
- SVG morphing on button click with dynamic scaling
- Fade out and unmount functionality via forwardRef

### CarouselPage
Interactive 3D carousel featuring:
- Perspective transforms for 3D depth effect
- Smooth slide transitions
- Dynamic scaling and positioning
- Responsive layout

## Architecture Highlights

- **ForwardRef Pattern** - IntroAnimation exposes container ref for parent-controlled animations
- **GSAP Scoping** - Animations scoped using class selectors for efficient DOM manipulation
- **Redux State** - Navigation state controls animation triggers
- **Dynamic Calculations** - Scale values calculated based on viewport for responsive animations

## Contributing

When making changes:
1. Create a feature branch
2. Make your changes
3. Commit with clear, descriptive messages
4. Push and create a pull request

## License

All rights reserved - Radaville Studio
