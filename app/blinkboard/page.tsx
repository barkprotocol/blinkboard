'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2, Zap, Send, Gift, Coins, ShoppingBag, Landmark, Plus, Search } from 'lucide-react'
import { ConnectWalletButton } from '@/components/ui/connect-wallet-button'
import Link from 'next/link'

interface Blink {
  id: string
  name: string
  description: string
  type: string
}

export default function BlinkboardPage() {
  const { connected, publicKey } = useWallet()
  const [blinks, setBlinks] = useState<Blink[]>([
    { id: '1', name: 'Cosmic Blink', description: 'A mesmerizing cosmic-themed Blink', type: 'NFT' },
    { id: '2', name: 'Nature Blink', description: 'A serene nature-inspired Blink', type: 'Standard' },
    { id: '3', name: 'Tech Blink', description: 'A futuristic tech-themed Blink', type: 'Premium' },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlinks = blinks.filter(blink => 
    blink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blink.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Connect Your Wallet to Access Blinkboard</h1>
        <ConnectWalletButton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome to Your Blinkboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Your Blinks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow mr-4">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  className="pl-8" 
                  placeholder="Search Blinks" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild>
                <Link href="/blinks/create">
                  <Plus className="mr-2 h-4 w-4" /> Create Blink
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBlinks.map((blink) => (
                <Card key={blink.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{blink.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{blink.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Type: {blink.type}</p>
                    <Link href={`/blinks/${blink.id}`} passHref>
                      <Button variant="link" className="mt-2 p-0">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Connected Wallet:</strong></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}</p>
              <p><strong>Total Blinks:</strong> {blinks.length}</p>
              <p><strong>BARK Balance:</strong> 1000 BARK</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create" className="mt-8">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="send">Send</TabsTrigger>
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="stake">Stake</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Blink</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="blinkName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Blink Name</label>
                  <Input id="blinkName" placeholder="Enter Blink name" />
                </div>
                <div>
                  <label htmlFor="blinkDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <Input id="blinkDescription" placeholder="Describe your Blink" />
                </div>
                <Button asChild>
                  <Link href="/blinks/create">Create Blink</Link>
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send a Blink</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient Address</label>
                  <Input id="recipient" placeholder="Enter recipient's Solana address" />
                </div>
                <div>
                  <label htmlFor="blinkToSend" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Blink to Send</label>
                  <select id="blinkToSend" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    {blinks.map((blink) => (
                      <option key={blink.id} value={blink.id}>{blink.name}</option>
                    ))}
                  </select>
                </div>
                <Button>Send Blink</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="swap">
          <Card>
            <CardHeader>
              <CardTitle>Swap Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">Token swapping feature coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stake">
          <Card>
            <CardHeader>
              <CardTitle>Stake BARK Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">Staking feature coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <BarChart2 className="h-12 w-12 text-primary mb-2" />
            <h3 className="font-semibold text-center">Analytics</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Gift className="h-12 w-12 text-primary mb-2" />
            <h3 className="font-semibold text-center">Gifts</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <ShoppingBag className="h-12 w-12 text-primary mb-2" />
            <h3 className="font-semibold text-center">Marketplace</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Landmark className="h-12 w-12 text-primary mb-2" />
            <h3 className="font-semibold text-center">Governance</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}