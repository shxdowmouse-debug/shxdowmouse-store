## Packages
framer-motion | Essential for the modern, smooth feel and entrance animations requested
react-hook-form | For the order form handling
@hookform/resolvers | For Zod validation in the form

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["Space Grotesk", "sans-serif"],
  body: ["Inter", "sans-serif"],
}

Integration:
- Main landing page assumes Product ID 1 exists (seeded by backend).
- Images are handled via standard img tags, assuming assets folder or public URL.
- "Buy Now" opens a modal with the order form.
