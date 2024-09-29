import './globals.css'
import { Inter } from 'next/font/google'
import { SolanaWalletProvider } from '@/components/providers/solana-wallet-provider'
import { ToastProvider } from '@/components/ui/toast-provider'
import { Metadata } from 'next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bark-blinkboard.vercel.app'),
  title: 'BARK | Blinkboard',
  description: 'Manage your Solana Blinks and interact with the BARK Protocol ecosystem',
  openGraph: {
    title: 'BARK | Blinkboard',
    description: 'Manage your Solana Blinks and interact with the BARK Protocol ecosystem',
    url: 'https://bark-blinkboard.vercel.app',
    siteName: 'BARK Blinkboard',
    images: [
      {
        url: 'https://bark-blinkboard.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BARK | Blinkboard',
    description: 'Manage your Solana Blinks and interact with the BARK Protocol ecosystem',
    images: ['https://bark-blinkboard.vercel.app/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SolanaWalletProvider>
          <ToastProvider>
            <main className="min-h-screen bg-background">
              {children}
            </main>
          </ToastProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}