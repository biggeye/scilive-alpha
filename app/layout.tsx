import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ClientLayout } from './ClientLayout';

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
    <html lang="en">

      <body className="body">

        <Navbar />
        <ClientLayout>
          {children}
        </ClientLayout>
        <script src="https://tikapi.io/assets/js/popup.js"></script>

      </body>

    </html>
  )
}
