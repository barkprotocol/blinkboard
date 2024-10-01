'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Pagination } from "@/components/ui/pagination"

const tokenOptions = [
  { value: 'BARK', label: 'BARK' },
  { value: 'SOL', label: 'SOL' },
  { value: 'USDC', label: 'USDC' },
]

const recentPayments = [
  { id: 1, recipient: '0x1234...5678', amount: 100, token: 'BARK', date: '2023-05-01', status: 'Completed' },
  { id: 2, recipient: '0x8765...4321', amount: 2, token: 'SOL', date: '2023-04-30', status: 'Pending' },
  { id: 3, recipient: '0x2468...1357', amount: 50, token: 'USDC', date: '2023-04-29', status: 'Completed' },
  { id: 4, recipient: '0x1357...2468', amount: 75, token: 'BARK', date: '2023-04-28', status: 'Completed' },
  { id: 5, recipient: '0x3691...2580', amount: 1.5, token: 'SOL', date: '2023-04-27', status: 'Failed' },
]

export default function PaymentsPage() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('BARK')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 3
  const totalPages = Math.ceil(recentPayments.length / itemsPerPage)
  const paginatedPayments = recentPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePayment = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    console.log(`Sending payment of ${amount} ${token} to ${recipient}`)
    
    toast({
      title: "Payment Sent!",
      description: `Successfully sent ${amount} ${token} to ${recipient}`,
    })

    setRecipient('')
    setAmount('')
  }, [amount, token, recipient, toast])

  const isFormValid = recipient && amount && parseFloat(amount) > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Make a Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Send Payment</CardTitle>
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
            </form>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!isFormValid}>
                  Preview Payment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Payment</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to send this payment?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p><strong>Recipient:</strong> {recipient}</p>
                  <p><strong>Amount:</strong> {amount} {token}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={handlePayment} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Payment'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.map((payment) =>
                  <TableRow key={payment.id}>
                    <TableCell>{payment.recipient}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.token}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                  </TableRow>
                )}
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
    </div>
  )
}