import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/app/providers/NextAuth'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from '@/components/theme';
import HeaderLink from '@/components/headerLink'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Shelf',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp" className='main'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <NextAuthProvider>
            <header>
              <HeaderLink />
            </header>
            {children}
          </NextAuthProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
