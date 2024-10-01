'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useToast } from "@/components/ui/use-toast"

const mockTokens = [
  { id: 1, name: 'BARK', symbol: 'BARK', balance: 1000, price: 0.1, change: 5.2 },
  { id: 2, name: 'Ethereum', symbol: 'ETH', balance: 2.5, price: 3000, change: -1.5 },
  { id: 3, name: 'USD Coin', symbol: 'USDC', balance: 500, price: 1, change: 0 },
  { id: 4, name: 'Solana', symbol: 'SOL', balance: 50, price: 40, change: 2.8 },
]

const mockTransactions = [
  { id: 1, type: 'Send', token: 'BARK', amount: 100, to: '0x1234...5678', date: '2023-05-01' },
  { id: 2, type: 'Receive', token: 'ETH', amount: 0.5, from: '0x8765...4321', date: '2023-04-30' },
  { id: 3, type: 'Swap', tokenFrom: 'USDC', tokenTo: 'BARK', amountFrom: 50, amountTo: 500, date: '2023-04-29' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function TokensPage() {
  const [selectedToken, setSelectedToken] = useState(mockTokens[0])
  const [transferAmount, setTransferAmount] = useState('')
  const [transferAddress, setTransferAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    console.log(`Transferring ${transferAmount} ${selectedToken.symbol} to ${transferAddress}`)
    
    toast({
      title: "Transfer Completed!",
      description: `Successfully transferred ${transferAmount} ${selectedToken.symbol} to ${transferAddress}`,
    })

    setTransferAmount('')
    setTransferAddress('')
  }

  const totalValue = mockTokens.reduce((sum, token) => sum + token.balance * token.price, 0)
  const chartData = mockTokens.map(token => ({
    name: token.symbol,
    value: token.balance * token.price
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Tokens</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transfer Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <Label htmlFor="token-select">Select Token</Label>
                <Select
                  value={selectedToken.symbol}
                  onValueChange={(value) => setSelectedToken(mockTokens.find(t => t.symbol === value) || mockTokens[0])}
                >
                  <SelectTrigger id="token-select">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTokens.map((token) => (
                      <SelectItem key={token.id} value={token.symbol}>{token.name} ({token.symbol})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transfer-amount">Amount</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label htmlFor="transfer-address">Recipient Address</Label>
                <Input
                  id="transfer-address"
                  type="text"
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  placeholder="Enter recipient address"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="submit" className="w-full">Transfer</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Transfer</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to transfer these tokens?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p><strong>Amount:</strong> {transferAmount} {selectedToken.symbol}</p>
                    <p><strong>To:</strong> {transferAddress}</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>Cancel</Button>
                    <Button onClick={handleTransfer} disabled={isLoading}>
                      {isLoading ? 'Transferring...' : 'Confirm Transfer'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Token Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>{token.name} ({token.symbol})</TableCell>
                  <TableCell>{token.balance.toLocaleString()}</TableCell>
                  <TableCell>${token.price.toLocaleString()}</TableCell>
                  <TableCell>${(token.balance * token.price).toLocaleString()}</TableCell>
                  <TableCell className={token.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {token.change >= 0 ? '+' : ''}{token.change}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>To/From</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.token || `${tx.tokenFrom} → ${tx.tokenTo}`}</TableCell>
                  <TableCell>{tx.amount || `${tx.amountFrom} → ${tx.amountTo}`}</TableCell>
                  <TableCell>{tx.to || tx.from || 'N/A'}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}