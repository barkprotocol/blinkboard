'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { ArrowDownIcon, RefreshCwIcon } from 'lucide-react'

const tokenOptions = [
  { value: 'BARK', label: 'BARK' },
  { value: 'SOL', label: 'SOL' },
  { value: 'USDC', label: 'USDC' },
]

export default function SwapPage() {
  const [fromToken, setFromToken] = useState('BARK')
  const [toToken, setToToken] = useState('SOL')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSwap = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    console.log(`Swapping ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`)
    
    toast({
      title: "Swap Completed!",
      description: `Successfully swapped ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`,
    })

    setFromAmount('')
    setToAmount('')
  }, [fromAmount, toAmount, fromToken, toToken, toast])

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    // In a real application, you would call an API to get the exchange rate
    // and calculate the toAmount based on the fromAmount
    setToAmount((parseFloat(value) * 1.5).toFixed(2))
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const isFormValid = fromAmount && toAmount && parseFloat(fromAmount) > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Swap Tokens</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="fromAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
              <div className="flex space-x-2">
                <Input
                  id="fromAmount"
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="flex-grow"
                />
                <Select value={fromToken} onValueChange={setFromToken}>
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
            <div className="flex justify-center">
              <Button variant="ghost" size="sm" onClick={switchTokens}>
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <label htmlFor="toAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
              <div className="flex space-x-2">
                <Input
                  id="toAmount"
                  type="number"
                  placeholder="0.00"
                  value={toAmount}
                  readOnly
                  className="flex-grow"
                />
                <Select value={toToken} onValueChange={setToToken}>
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
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={!isFormValid}>
                Preview Swap
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Swap</DialogTitle>
                <DialogDescription>
                  Are you sure you want to perform this swap?
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p><strong>From:</strong> {fromAmount} {fromToken}</p>
                <p><strong>To:</strong> {toAmount} {toToken}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleSwap} disabled={isLoading}>
                  {isLoading ? 'Swapping...' : 'Confirm Swap'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}