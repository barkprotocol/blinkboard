'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trophy, ArrowUp, ArrowDown, Minus, Crown, Info } from "lucide-react"

interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  blinks: number
  likes: number
  rank: number
  change: 'up' | 'down' | 'same'
}

const mockLeaderboardData: LeaderboardEntry[] = [
  { id: "1", name: "Alice", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Alice", blinks: 150, likes: 2800, rank: 1, change: 'up' },
  { id: "2", name: "Bob", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Bob", blinks: 142, likes: 2750, rank: 2, change: 'down' },
  { id: "3", name: "Charlie", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Charlie", blinks: 138, likes: 2600, rank: 3, change: 'up' },
  { id: "4", name: "David", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=David", blinks: 130, likes: 2450, rank: 4, change: 'same' },
  { id: "5", name: "Eva", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Eva", blinks: 125, likes: 2300, rank: 5, change: 'up' },
]

export function CommunityLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLeaderboardData(mockLeaderboardData)
      } catch (err) {
        setError('Failed to fetch leaderboard data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500'
      case 2:
        return 'bg-gray-400'
      case 3:
        return 'bg-amber-600'
      default:
        return 'bg-primary'
    }
  }

  const getChangeIcon = (change: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />
      case 'same':
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary to-primary-foreground p-6">
        <div className="flex items-center space-x-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <CardTitle className="text-2xl font-bold text-white">Community Leaderboard</CardTitle>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-primary-foreground/20">
                <Info className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Top performers based on Blinks created and likes received</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-full h-20" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-100 dark:bg-red-900 rounded-lg">{error}</div>
        ) : (
          <div className="space-y-4">
            {leaderboardData.map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Badge className={`${getRankBadgeColor(entry.rank)} text-white w-8 h-8 rounded-full flex items-center justify-center absolute -top-2 -left-2 z-10`}>
                      {entry.rank}
                    </Badge>
                    {entry.rank === 1 && (
                      <Crown className="w-6 h-6 text-yellow-400 absolute -top-3 -right-3 z-20" />
                    )}
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{entry.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{entry.blinks} Blinks</span>
                      <span>•</span>
                      <span>{entry.likes} Likes</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-1 rounded-full bg-gray-200 dark:bg-gray-600">
                          {getChangeIcon(entry.change)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{entry.change === 'up' ? 'Moved up' : entry.change === 'down' ? 'Moved down' : 'No change'} in rank</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex">View Profile</Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Button variant="default" className="bg-primary text-white hover:bg-primary-foreground">View Full Leaderboard</Button>
        </div>
      </CardContent>
    </Card>
  )
}