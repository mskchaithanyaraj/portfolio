/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          0: "var(--clr-primary-a0)",
          10: "var(--clr-primary-a10)",
          20: "var(--clr-primary-a20)",
          30: "var(--clr-primary-a30)",
          40: "var(--clr-primary-a40)",
          50: "var(--clr-primary-a50)",
          DEFAULT: "var(--clr-primary-a0)",
        },
        // Surface colors
        surface: {
          0: "var(--clr-surface-a0)",
          10: "var(--clr-surface-a10)",
          20: "var(--clr-surface-a20)",
          30: "var(--clr-surface-a30)",
          40: "var(--clr-surface-a40)",
          50: "var(--clr-surface-a50)",
          DEFAULT: "var(--clr-surface-a0)",
        },
        // Tonal surface colors
        "surface-tonal": {
          0: "var(--clr-surface-tonal-a0)",
          10: "var(--clr-surface-tonal-a10)",
          20: "var(--clr-surface-tonal-a20)",
          30: "var(--clr-surface-tonal-a30)",
          40: "var(--clr-surface-tonal-a40)",
          50: "var(--clr-surface-tonal-a50)",
          DEFAULT: "var(--clr-surface-tonal-a0)",
        },
        // Status colors
        success: {
          0: "var(--clr-success-a0)",
          10: "var(--clr-success-a10)",
          20: "var(--clr-success-a20)",
          DEFAULT: "var(--clr-success-a0)",
        },
        warning: {
          0: "var(--clr-warning-a0)",
          10: "var(--clr-warning-a10)",
          20: "var(--clr-warning-a20)",
          DEFAULT: "var(--clr-warning-a0)",
        },
        danger: {
          0: "var(--clr-danger-a0)",
          10: "var(--clr-danger-a10)",
          20: "var(--clr-danger-a20)",
          DEFAULT: "var(--clr-danger-a0)",
        },
        info: {
          0: "var(--clr-info-a0)",
          10: "var(--clr-info-a10)",
          20: "var(--clr-info-a20)",
          DEFAULT: "var(--clr-info-a0)",
        },
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        normal: "var(--transition-normal)",
        slow: "var(--transition-slow)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
