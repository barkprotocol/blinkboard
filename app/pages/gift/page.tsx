'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Gift } from 'lucide-react'
import { Pagination } from "@/components/ui/pagination"

const tokenOptions = [
  { value: 'BARK', label: 'BARK' },
  { value: 'SOL', label: 'SOL' },
  { value: 'USDC', label: 'USDC' },
]

const recentGifts = [
  { id: 1, recipient: '0x1234...5678', amount: 50, token: 'BARK', date: '2023-05-01' },
  { id: 2, recipient: '0x8765...4321', amount: 1, token: 'SOL', date: '2023-04-30' },
  { id: 3, recipient: '0x2468...1357', amount: 100, token: 'USDC', date: '2023-04-29' },
  { id: 4, recipient: '0x1357...2468', amount: 25, token: 'BARK', date: '2023-04-28' },
  { id: 5, recipient: '0x3691...2580', amount: 0.5, token: 'SOL', date: '2023-04-27' },
]

export default function GiftPage() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('BARK')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 3
  const totalPages = Math.ceil(recentGifts.length / itemsPerPage)
  const paginatedGifts = recentGifts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleGift = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    console.log(`Gifting ${amount} ${token} to ${recipient} with message: ${message}`)
    
    toast({
      title: "Gift Sent!",
      description: `Successfully sent ${amount} ${token} to ${recipient}`,
    })

    setRecipient('')
    setAmount('')
    setMessage('')
  }, [amount, token, recipient, message, toast])

  const isFormValid = recipient && amount && parseFloat(amount) > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Send a Gift</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gift Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipient Address</label>
                <Input
                  id="recipient"
                  type="text"
                  placeholder="Enter recipient's address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <div className="flex space-x-2">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-grow"
                  />
                  <Select value={token} onValueChange={setToken}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Token" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokenOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gift Message (optional)</label>
                <Textarea
                  id="message"
                  placeholder="Enter a message for the gift recipient"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!isFormValid}>
                  Preview Gift
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Gift</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to send this gift?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p><strong>Recipient:</strong> {recipient}</p>
                  <p><strong>Amount:</strong> {amount} {token}</p>
                  <p><strong>Message:</strong> {message || 'No message'}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={handleGift} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Gift'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedGifts.map((gift) => (
                  <TableRow key={gift.id}>
                    <TableCell>{gift.recipient}</TableCell>
                    <TableCell>{gift.amount}</TableCell>
                    <TableCell>{gift.token}</TableCell>
                    <TableCell>{gift.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </CardFooter>
        </Card>
      </div>

      <Alert variant="default" className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Sending a gift is a great way to introduce friends to the BARK ecosystem. Consider including a personalized message to make your gift more meaningful.
        </AlertDescription>
      </Alert>
    </div>
  )
}