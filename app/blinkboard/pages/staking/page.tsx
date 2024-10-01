'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Pagination } from "@/components/ui/pagination"

const stakingPools = [
  { id: 1, name: 'BARK Staking', apr: '12%', totalStaked: '1,000,000 BARK', yourStake: '1,000 BARK' },
  { id: 2, name: 'SOL-BARK LP', apr: '20%', totalStaked: '500,000 LP', yourStake: '100 LP' },
  { id: 3, name: 'USDC-BARK LP', apr: '15%', totalStaked: '750,000 LP', yourStake: '50 LP' },
]

export default function StakingPage() {
  const [amount, setAmount] = useState('')
  const [selectedPool, setSelectedPool] = useState(stakingPools[0])
  const [isStaking, setIsStaking] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 3
  const totalPages = Math.ceil(stakingPools.length / itemsPerPage)
  const paginatedPools = stakingPools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleStakeUnstake = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    const action = isStaking ? 'Staked' : 'Unstaked'
    console.log(`${action} ${amount} in ${selectedPool.name}`)
    
    toast({
      title: `${action}!`,
      description: `Successfully ${action.toLowerCase()} ${amount} in ${selectedPool.name}`,
    })

    setAmount('')
  }, [amount, selectedPool, isStaking, toast])

  const isFormValid = amount && parseFloat(amount) > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Staking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isStaking ? 'Stake' : 'Unstake'} Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pool" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Staking Pool</label>
                <select
                  id="pool"
                  value={selectedPool.id}
                  onChange={(e) => setSelectedPool(stakingPools.find(pool => pool.id === parseInt(e.target.value)) || stakingPools[0])}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {stakingPools.map((pool) => (
                    <option key={pool.id} value={pool.id}>{pool.name}</option>
                  ))}
                </select>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setIsStaking(!isStaking)}>
                {isStaking ? 'Switch to Unstake' : 'Switch to Stake'}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={!isFormValid}>
                    {isStaking ? 'Stake' : 'Unstake'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm {isStaking ? 'Stake' : 'Unstake'}</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to {isStaking ? 'stake' : 'unstake'} this amount?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p><strong>Amount:</strong> {amount}</p>
                    <p><strong>Pool:</strong> {selectedPool.name}</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>Cancel</Button>
                    <Button onClick={handleStakeUnstake} disabled={isLoading}>
                      {isLoading ? 'Processing...' : (isStaking ? 'Confirm Stake' : 'Confirm Unstake')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staking Pools</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pool</TableHead>
                  <TableHead>APR</TableHead>
                  <TableHead>Total Staked</TableHead>
                  <TableHead>Your Stake</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPools.map((pool) => (
                  <TableRow key={pool.id}>
                    <TableCell>{pool.name}</TableCell>
                    <TableCell>{pool.apr}</TableCell>
                    <TableCell>{pool.totalStaked}</TableCell>
                    <TableCell>{pool.yourStake}</TableCell>
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
    </div>
  )
}