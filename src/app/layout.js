import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Geolink - Earn Money by Sharing',
  description: 'Social media platform where you can earn money by uploading photos and videos',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Geolink'
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
              <Navbar />
              <main className="pb-16 md:pb-0">
                {children}
              </main>
              <BottomNav />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
