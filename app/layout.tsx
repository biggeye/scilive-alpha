import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Navbar from './navbar';

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
  console.log('Rendering children:', children);
  return (
<html lang="en" className={GeistSans.className}>
        <body className="body">
          <Navbar  />
          <main className="flex flex-1 min-h-90 pb-10 bg-gradient-to-r from-light-blue-200 to-gray-300">
              {children}
          </main>
        </body>
    </html>
  )
}
