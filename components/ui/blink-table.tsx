'use client'

import React, { useState } from 'react'
import { BlinkCard } from './blink-card'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

interface Blink {
  id: string
  name: string
  description: string
  image: string
  createdAt: Date
  likes: number
}

interface BlinkTableProps {
  initialBlinks: Blink[]
  initialSearch: string
}

export default function BlinkTable({ initialBlinks, initialSearch }: BlinkTableProps) {
  const [blinks, setBlinks] = useState<Blink[]>(initialBlinks)
  const [search, setSearch] = useState(initialSearch)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(`/api/blinks?search=${encodeURIComponent(search)}`)
      if (!res.ok) throw new Error('Failed to fetch blinks')
      const data = await res.json()
      setBlinks(data)
      router.push(`?search=${encodeURIComponent(search)}`, { scroll: false })
    } catch (error) {
      console.error('Search failed:', error)
      toast({
        title: "Search failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/blinks')
      if (!res.ok) throw new Error('Failed to fetch blinks')
      const data = await res.json()
      setBlinks(data)
      setSearch('')
      router.push('/', { scroll: false })
    } catch (error) {
      console.error('Refresh failed:', error)
      toast({
        title: "Refresh failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <form onSubmit={handleSearch} className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="search"
              name="search"
              placeholder="Search Blinks" 
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
      {blinks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No Blinks found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blinks.map((blink) => (
            <BlinkCard
              key={blink.id}
              id={blink.id}
              name={blink.name}
              description={blink.description}
              image={blink.image}
              createdAt={blink.createdAt}
              likes={blink.likes}
            />
          ))}
        </div>
      )}
    </div>
  )
}