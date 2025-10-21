import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const fontVariables = [inter.variable].join(' ');

export const fontClassName = {
  inter: inter.className,
};
