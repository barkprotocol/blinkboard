import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Gift, CreditCard, Coins, Image } from 'lucide-react'

interface BlinkCardProps {
  title: string
  description: string
  image?: string
  createdAt: string
  likes: number
  category: string
  isNFT: boolean
  price?: number
  donationGoal?: number
  membershipTier?: string
  assetType?: string
  onDonate: (amount: number) => void
  onPurchase: () => void
  onGift: (recipientEmail: string) => void
}

export function BlinkCard({
  title,
  description,
  image,
  createdAt,
  likes,
  category,
  isNFT,
  price,
  donationGoal,
  membershipTier,
  assetType,
  onDonate,
  onPurchase,
  onGift
}: BlinkCardProps) {
  const [donationAmount, setDonationAmount] = useState('')
  const [giftEmail, setGiftEmail] = useState('')

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          <Badge>{category}</Badge>
          {isNFT && <Badge variant="secondary">NFT</Badge>}
          {membershipTier && <Badge variant="outline">{membershipTier}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {image && <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded" />}
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{createdAt}</span>
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1 text-red-500" />
            <span>{likes}</span>
          </div>
        </div>
        {price && (
          <div className="mt-2">
            <span className="font-bold">Price: ${price.toFixed(2)}</span>
          </div>
        )}
        {donationGoal && (
          <div className="mt-2">
            <span className="font-bold">Donation Goal: ${donationGoal.toFixed(2)}</span>
          </div>
        )}
        {assetType && (
          <div className="mt-2 flex items-center">
            <Image className="h-4 w-4 mr-2" />
            <span>{assetType}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {price && (
          <Button onClick={onPurchase} className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Purchase
          </Button>
        )}
        {donationGoal && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Coins className="mr-2 h-4 w-4" />
                Donate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Donate to {title}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <Button onClick={() => {
                  onDonate(parseFloat(donationAmount))
                  setDonationAmount('')
                }}>
                  Donate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              Gift
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gift {title}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Recipient's email"
                value={giftEmail}
                onChange={(e) => setGiftEmail(e.target.value)}
              />
              <Button onClick={() => {
                onGift(giftEmail)
                setGiftEmail('')
              }}>
                Send Gift
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}