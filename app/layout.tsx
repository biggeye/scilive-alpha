import './globals.css';
import { fonts } from './fonts';
import { ClientLayout } from './ClientLayout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
      <link rel="manifest" href="https://scilive.cloud/manifest.json" />
      <meta name="theme-color" content="#f0f0f0" />
      <body className="body">
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0&appId=931582205309826" nonce="o0frsHRt"></script>
        <ClientLayout>
          {children}
          <Analytics />
        </ClientLayout>
      </body>
    </html>
  )
}