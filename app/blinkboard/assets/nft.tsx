'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Pagination } from "@/components/ui/pagination"

const mockNFTs = [
  { id: 1, name: "BARK #001", image: "/placeholder.svg?height=200&width=200", description: "A rare BARK NFT" },
  { id: 2, name: "BARK #002", image: "/placeholder.svg?height=200&width=200", description: "An uncommon BARK NFT" },
  { id: 3, name: "BARK #003", image: "/placeholder.svg?height=200&width=200", description: "A common BARK NFT" },
  { id: 4, name: "BARK #004", image: "/placeholder.svg?height=200&width=200", description: "A legendary BARK NFT" },
  { id: 5, name: "BARK #005", image: "/placeholder.svg?height=200&width=200", description: "An epic BARK NFT" },
]

export default function NFTPage() {
  const [nftName, setNftName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNFT, setSelectedNFT] = useState<typeof mockNFTs[0] | null>(null)
  const { toast } = useToast()

  const itemsPerPage = 4
  const totalPages = Math.ceil(mockNFTs.length / itemsPerPage)
  const paginatedNFTs = mockNFTs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleMintNFT = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    
    console.log(`Minting NFT: ${nftName}`)
    
    toast({
      title: "NFT Minted!",
      description: `Successfully minted ${nftName}`,
    })

    setNftName('')
    setNftDescription('')
  }, [nftName, nftDescription, toast])

  const isFormValid = nftName.trim() !== '' && nftDescription.trim() !== ''

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My NFTs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mint New NFT</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="nftName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NFT Name</label>
                <Input
                  id="nftName"
                  type="text"
                  placeholder="Enter NFT name"
                  value={nftName}
                  onChange={(e) => setNftName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="nftDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NFT Description</label>
                <Input
                  id="nftDescription"
                  type="text"
                  placeholder="Enter NFT description"
                  value={nftDescription}
                  onChange={(e) => setNftDescription(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!isFormValid}>
                  Mint NFT
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm NFT Minting</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to mint this NFT?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p><strong>Name:</strong> {nftName}</p>
                  <p><strong>Description:</strong> {nftDescription}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={handleMintNFT} disabled={isLoading}>
                    {isLoading ? 'Minting...' : 'Confirm Minting'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your NFT Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {paginatedNFTs.map((nft) => (
                <div key={nft.id} className="cursor-pointer" onClick={() => setSelectedNFT(nft)}>
                  <img src={nft.image} alt={nft.name} className="w-full h-auto rounded-lg" />
                  <p className="mt-2 text-sm font-medium text-center">{nft.name}</p>
                </div>
              ))}
            </div>
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

      <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNFT?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <img src={selectedNFT?.image} alt={selectedNFT?.name} className="w-full h-auto rounded-lg mb-4" />
            <p><strong>Description:</strong> {selectedNFT?.description}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedNFT(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}