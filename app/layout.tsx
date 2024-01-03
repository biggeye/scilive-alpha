
import './globals.css';
import { fonts } from './fonts';
import Navbar from '@/components/Navbar';
import { ClientLayout } from './ClientLayout';


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
      <body className="body">
  <ClientLayout>
        <Navbar />
      
          {children}
        </ClientLayout>
        <script src="https://tikapi.io/assets/js/popup.js"></script>

      </body>

    </html>
  )
}
