import './globals.css'
import { Inter } from 'next/font/google'
import { SolanaWalletProvider } from '@/components/providers/solana-wallet-provider'
import { ToastProvider } from '@/components/ui/toast-provider'

export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'BARK BLINK - Blinkboard',
  description: 'Manage your Blinks and interact with the BARK BLINK ecosystem',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SolanaWalletProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}