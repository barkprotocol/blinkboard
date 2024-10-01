'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, Gift, DollarSign, Heart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const solToUsd = (sol: number, solPrice: number) => (sol * solPrice).toFixed(2)

const SOL_PRICE_IN_USD = 20

interface Blink {
  id: string
  title: string
  description: string
  image?: string
  createdAt: string
  likes: number
  cnftUrl?: string
  solPrice: number
  creator: string
  creatorAvatar: string
}

interface BlinkCollectionProps {
  blinks: Blink[]
  onSearch: (term: string) => void
}

const cnftImages = [
  'https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/ace.jpeg',
  'https://ucarecdn.com/a4dbaa68-abd5-403d-8691-790fc9bde7c0/max.jpeg',
  'https://ucarecdn.com/c73af325-0138-43fc-91a8-8dca93bf901d/dash.jpeg',
  'https://ucarecdn.com/07fe8d83-bc51-405c-94b8-d0e66c6f3f62/bark.jpeg',
  'https://ucarecdn.com/bf22c7bc-db76-4cfb-b888-75315ba46d50/bruno.jpeg',
]

export function BlinkCollection({ blinks, onSearch }: BlinkCollectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBlinks, setFilteredBlinks] = useState(blinks)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (searchTerm) {
      setFilteredBlinks(blinks.filter(blink =>
        blink.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blink.description.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    } else {
      setFilteredBlinks(blinks)
    }
  }, [searchTerm, blinks])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString()
  }

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="space-y-8 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Blinks</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search blinks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button type="submit" variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      <Card className="overflow-hidden bg-gray-100 dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {cnftImages.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <img src={image} alt={`CNFT ${index + 1}`} className="w-full h-80 object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlinks.map((blink) => (
          <motion.div
            key={blink.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <img src={blink.image || 'https://ucarecdn.com/4bc61874-018e-481b-bc07-c3f93956f7bd/tchest.png/300x200'} alt={blink.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{blink.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {blink.description.length > 100 ? `${blink.description.substring(0, 100)}...` : blink.description}
                </CardDescription>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={blink.creatorAvatar} alt={blink.creator} />
                      <AvatarFallback>{blink.creator ? blink.creator[0] : '?'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{blink.creator || 'Unknown Creator'}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center space-x-1 cursor-help">
                          <Heart className="h-4 w-4" />
                          <span>{blink.likes}</span>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{blink.likes} likes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">{blink.solPrice} SOL</span>
                  <span className="text-gray-600 dark:text-gray-400">~${solToUsd(blink.solPrice, SOL_PRICE_IN_USD)} USD</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="default" className="w-full mr-2 bg-gray-900 text-white hover:bg-gray-800">
                  <Gift className="h-4 w-4 mr-2" />
                  Send as Gift
                </Button>
                <Button variant="default" className="w-full ml-2 bg-gray-900 text-white hover:bg-gray-800">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Sell NFT
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}