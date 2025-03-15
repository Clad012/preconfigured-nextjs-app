# Minimalist Next.js Example

A clean, minimal Next.js 14 example using the Pages Router. This project is designed to be simple, well-documented, and easy to understand.

## Project Structure

```
.
├── components        # Reusable React components
│   ├── Layout.tsx    # Main page layout wrapper
│   └── ui            # UI components
│       └── button.tsx# Button component
├── lib               # Utility functions
│   └── utils.ts      # Common utilities
├── pages             # Next.js pages
│   ├── _app.tsx      # Custom App component
│   ├── _document.tsx # Custom Document component
│   ├── api           # API routes
│   │   └── hello.ts  # Simple API endpoint
│   └── index.tsx     # Home page
├── public            # Static assets
└── styles            # Global styles
    └── globals.css   # Global CSS styles
```

## Features

- **Minimalist Design**: Clean, simple code structure
- **Fully TypeScript**: Type-safe with TsDoc comments
- **Pages Router**: Uses Next.js pages directory structure
- **API Example**: Simple example of Next.js API routes
- **Shadcn-inspired UI**: Clean, minimal UI components

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the development server:

   ```bash
   pnpm dev
   ```

3. Build for production:

   ```bash
   pnpm build
   ```

4. Run linting:
   ```bash
   pnpm lint
   ```

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React
