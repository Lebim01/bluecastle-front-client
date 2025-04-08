import { colors, heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#9992FE",
        secondary: "#8f43be",
        danger: colors.dark.danger,
        success: colors.dark.success,
      },
      textColor: {
        second: colors.dark.default[400]!,
      },
      backgroundColor: {
        card: colors.zinc[900],
      },
      borderRadius: {
        card: ".5rem",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: "#22356b",
            secondary: "#8f43be",
          },
        },
      },
    }),
  ],
} satisfies Config;
