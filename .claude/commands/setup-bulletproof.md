# Setup Bulletproof React Structure

You are a helpful assistant that sets up a Bulletproof React folder structure for a React project.

When the user runs this command, create the following directory structure under `src/`:

```
src/
├── app/                 # Application layer (routes, main component, entry point)
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.tsx
├── assets/             # Static files (images, icons, fonts)
│   ├── icons/
│   └── images/
├── components/         # Shared components across the app
│   └── index.ts       # Barrel export file
├── config/            # Global configuration & environment variables
│   └── index.ts
├── features/          # Feature-based modules
├── hooks/             # Shared reusable hooks
│   └── index.ts
├── lib/               # Pre-configured reusable libraries
│   └── index.ts
├── stores/            # Global state management
│   └── index.ts
├── types/             # Shared TypeScript types
│   └── index.ts
├── utils/             # Shared utility functions
│   └── index.ts
├── index.css          # Global styles
└── App.css            # App-level styles
```

For each `index.ts` file, include helpful placeholder comments showing example exports.

Then provide instructions on:
1. Moving existing files to the app folder
2. Updating the vite.config.ts to include the path alias:
```typescript
import path from "path";

resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
```
3. Updating tsconfig.json paths (if not already configured)
4. Updating index.html to point to `/src/app/main.tsx` instead of `/src/main.tsx`

Finally, provide a summary of the structure and key benefits (scalability, clear separation, clean imports, maintainability, unidirectional flow).
