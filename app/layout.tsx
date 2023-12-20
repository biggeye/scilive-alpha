import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Navbar from '@/components/Navbar';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'SciLive (alpha)',
  description: 'powered by SciFiction.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
          <body className="body bg-slate-100">
          <Navbar />
          <main className="main">
              {children}
            </main>
          </body>
  
    </html>
  )
}
