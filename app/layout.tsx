import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import Home from './page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lcube',
  description: 'Lcube webpage',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body className={inter.className} >
        <Header />
        <main className="test">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
