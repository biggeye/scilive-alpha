import { Rubik } from 'next/font/google'
import { Inter, Roboto_Mono } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})



 const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
  });
  
  const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
  });

  export const fonts = {
    rubik, inter, roboto_mono
  }