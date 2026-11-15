import './globals.css'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import GLStage from './components/gl/GLStage'
import SiteHeader from './components/ui/SiteHeader'
import Cursor from './components/ui/Cursor'
import Loader from './components/ui/Loader'
import PageCover from './components/ui/PageCover'
import SmoothScroll from './components/ui/SmoothScroll'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata = {
  title: 'Ammad — Developer & Creative Coder',
  description: 'Portfolio of Ammad — interfaces, motion and WebGL.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }} />
      </head>
      <body>
        <GLStage />
        <SmoothScroll />
        <SiteHeader />
        <main className="relative z-10">{children}</main>
        <PageCover />
        <Loader />
        <Cursor />
      </body>
    </html>
  )
}
