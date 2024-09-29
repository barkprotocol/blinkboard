'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export function ConnectWalletButton() {
  const { connected, connecting, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

  const handleClick = () => {
    if (connected) {
      disconnect()
    } else {
      setVisible(true)
    }
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={connecting}
      className="bg-[#D0BFB4] hover:bg-[#A18E83] text-white font-bold py-2 px-4 rounded"
    >
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting
        </>
      ) : connected ? (
        'Disconnect'
      ) : (
        'Connect Wallet'
      )}
    </Button>
  )
}