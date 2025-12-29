## Packages
framer-motion | For smooth page transitions, entry animations, and hover effects
lucide-react | For beautiful, consistent icons throughout the interface
react-hook-form | For efficient, validated forms (support, newsletter)
@hookform/resolvers | For Zod integration with react-hook-form
zod | For schema validation (already in base, but listing for clarity)
clsx | For conditional class names
tailwind-merge | For merging tailwind classes

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
  mono: ["var(--font-mono)"],
}

Images:
- Logo: import logo from "@assets/image-removebg-preview_(2)_1766952979287.png"
- Product: import productImg from "@assets/image_1766953081773.png"
