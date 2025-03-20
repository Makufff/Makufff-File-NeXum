/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
      "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "oklch(0.922 0 0)",
          input: "oklch(0.922 0 0)",
          ring: "oklch(0.708 0 0)",
          background: "oklch(0 0% 0%)",
          foreground: "oklch(1 0 0)",
          primary: {
            DEFAULT: "oklch(0.646 0.222 160)",
            foreground: "oklch(0 0% 0%)",
          },
          secondary: {
            DEFAULT: "oklch(0.269 0 0)",
            foreground: "oklch(1 0 0)",
          },
          destructive: {
            DEFAULT: "oklch(0.577 0.245 27.325)",
            foreground: "oklch(1 0 0)",
          },
          muted: {
            DEFAULT: "oklch(0.269 0 0)",
            foreground: "oklch(0.708 0 0)",
          },
          accent: {
            DEFAULT: "oklch(0.646 0.222 160)",
            foreground: "oklch(0 0% 0%)",
          },
          popover: {
            DEFAULT: "oklch(0 0% 4%)",
            foreground: "oklch(1 0 0)",
          },
          card: {
            DEFAULT: "oklch(0 0% 4%)",
            foreground: "oklch(1 0 0)",
          },
          neon: "oklch(0.646 0.222 160)",
        },
        borderRadius: {
          lg: "0.5rem",
          md: "calc(0.5rem - 2px)",
          sm: "calc(0.5rem - 4px)",
        },
        fontFamily: {
          mono: ["var(--font-mono)", "monospace"],
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }