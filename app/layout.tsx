
import './globals.css';
import { fonts } from './fonts';
import { ClientLayout } from './ClientLayout';
import Head from 'next/head';

export const metadata = {
  title: 'SciLive',
  description: 'powered by SciFiction.com',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang='en' className={fonts.roboto_mono.variable}>
<Head>
      <link rel="manifest" href="http://localhost:3000/manifest.json" />
      <script src="https://tikapi.io/assets/js/popup.js" />
      <meta name="theme-color" content="#f0f0f0"/>
      </Head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
       
      </body>
    </html>
  )
}
