import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed-variant": "#304671",
        "tertiary-fixed": "#ffdcc6",
        "inverse-surface": "#263143",
        "on-tertiary-fixed-variant": "#723600",
        "outline": "#727785",
        "surface-container-low": "#f0f3ff",
        "on-error": "#ffffff",
        "on-background": "#111c2d",
        "on-primary-fixed-variant": "#004395",
        "on-primary": "#ffffff",
        "surface-bright": "#f9f9ff",
        "tertiary-fixed-dim": "#ffb786",
        "surface-container-high": "#dee8ff",
        "on-tertiary-fixed": "#311400",
        "tertiary-container": "#b75b00",
        "secondary": "#495e8a",
        "on-secondary-container": "#405682",
        "error-container": "#ffdad6",
        "surface-container-highest": "#d8e3fb",
        "primary-container": "#2170e4",
        "on-primary-fixed": "#001a42",
        "secondary-container": "#b6ccff",
        "surface-tint": "#005ac2",
        "primary": "#0058be",
        "secondary-fixed-dim": "#b1c6f9",
        "background": "#f9f9ff",
        "inverse-on-surface": "#ecf1ff",
        "surface-container": "#e7eeff",
        "tertiary": "#924700",
        "primary-fixed-dim": "#adc6ff",
        "on-tertiary-container": "#fffbff",
        "on-surface-variant": "#424754",
        "primary-fixed": "#d8e2ff",
        "on-secondary": "#ffffff",
        "on-primary-container": "#fefcff",
        "surface-variant": "#d8e3fb",
        "secondary-fixed": "#d8e2ff",
        "surface-dim": "#cfdaf2",
        "on-tertiary": "#ffffff",
        "on-surface": "#111c2d",
        "surface-container-lowest": "#ffffff",
        "on-secondary-fixed": "#001a42",
        "outline-variant": "#c2c6d6",
        "inverse-primary": "#adc6ff",
        "surface": "#f9f9ff",
        "error": "#ba1a1a",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
}
