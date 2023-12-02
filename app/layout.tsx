import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Navbar from './navbar';


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="en" className={GeistSans.className}>
      <script src="https://accounts.google.com/gsi/client" async></script>

        <body className="body">

          <Navbar />
          <main className="flex flex-1 min-h-90 pb-10 bg-gradient-to-r from-light-blue-200 to-gray-300">
            <div className="flex-1 border-r border-gray-400 rounded-tl-lg rounded-bl-lg">
              {children}
            </div>
          </main>

        </body>

    </html>
  )
}
