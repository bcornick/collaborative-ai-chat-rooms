import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers, ThemeProvider } from './components/Providers';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VSD AI Chat Rooms',
  description:
    'Multiplayer chat rooms with AI participants for Venture Science Doctorate students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <Providers>
            <div
              className="flex flex-col justify-between relative dark:bg-gray-800"
              style={{ minHeight: '100dvh' }}>
              <Header />
              <div className="flex-grow p-4 sm:p-6">
                <div className="max-w-7xl m-auto w-full flex flex-col justify-start items-start">
                  {children}
                </div>
              </div>
              <Footer />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
