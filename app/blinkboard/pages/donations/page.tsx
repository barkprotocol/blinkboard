'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function DonationsPage() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState('BARK')
  const [message, setMessage] = useState('')

  const handleDonation = () => {
    // Implement donation logic here
    console.log(`Donating ${amount} ${token} to ${recipient} with message: ${message}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Make a Donation</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Donate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                    <SelectItem value="BARK">BARK</SelectItem>
                    <SelectItem value="SOL">SOL</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message (optional)</label>
              <Textarea
                id="message"
                placeholder="Enter a message for the recipient"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleDonation}>
              Make Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}