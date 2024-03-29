import './globals.css';
import React from 'react';
import { fonts } from './fonts';
import ClientLayout from './ClientLayout';
import { Analytics } from '@vercel/analytics/react';
export const metadata = {
  title: 'SciLive',
  description: 'powered by SciFiction.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={fonts.roboto_mono.variable}>
      <link rel="manifest" href="https://scilive.cloud/manifest.json" />
      <meta name="theme-color" content="#f0f0f0" />
      <body className="body">
         <ClientLayout>
          {children}
          <Analytics />
        </ClientLayout>
      </body>
    </html>
  )
}