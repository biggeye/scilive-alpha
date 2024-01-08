
import './globals.css';
import { fonts } from './fonts';
import { ClientLayout } from './ClientLayout';
import Head from 'next/head';

export const metadata = {
  title: 'SciLive',
  description: 'powered by SciFiction.com',
  favicon: 'sciLive.png'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang='en' className={fonts.roboto_mono.variable}>

      <link rel="manifest" href="http://localhost:3000/manifest.json" />
           <meta name="theme-color" content="#f0f0f0"/>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
       
      </body>
    </html>
  )
}
