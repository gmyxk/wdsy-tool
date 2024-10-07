import { nextui } from '@nextui-org/react';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-section-title': 'linear-gradient(91deg, hsl(var(--nextui-foreground)) 32.88%, hsla(0, 0%, 100%, .4) 99.12%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [nextui(), typography],
};

export default config;
