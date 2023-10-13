import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/global/header'
import Footer from './components/global/footer'
import Home from './page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lcube',
  description: 'Lcube webpage',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <Header />
        <main className="md:p-24 flex min-h-screen flex-col items-center">
          {children}
        </main> 
        <Footer />
      </body>
    </html>
  )
}
