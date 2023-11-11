import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import SessionProvider from './SessionProvider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Word Memorizer',
  description: 'Word Memorizer web app which is for english learners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='shortcut icon' href='SubLingoLogo.png'></link>
      </head>
      <body className={roboto.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
