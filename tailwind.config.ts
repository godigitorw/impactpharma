import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1BA7D4',
          50: '#E5F6FB',
          100: '#CCF0F7',
          200: '#99E0EF',
          300: '#66D1E7',
          400: '#33C1DF',
          500: '#1BA7D4',
          600: '#1686AA',
          700: '#10647F',
          800: '#0B4355',
          900: '#05212A',
        },
      },
    },
  },
  plugins: [],
};
export default config;
