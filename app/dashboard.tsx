'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Wallet, Send, ShoppingBag, Users, Plus, Search, ArrowUpRight, ArrowDownRight, Crown, Dog, ChevronLeft, ChevronRight, SortAsc, SortDesc, Bell, Zap, Trophy, PieChart, LineChart, Activity, Sparkles, TrendingUp, ThumbsUp, VoteIcon } from 'lucide-react'
import { BlinkCard } from '@/components/ui/blink-card'
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import debounce from 'lodash/debounce'
import { Sidebar } from '@/components/ui/layout/sidebar'
import { Header } from '@/components/ui/layout/header'
import { StatCard } from '@/components/dashboard/stat-card'
import { BlinkCreationChart } from '@/components/dashboard/blink-creation-chart'
import { BarkMarketOverview } from '@/components/dashboard/bark-market-overview'
import { BlinkPerformanceBreakdown } from '@/components/dashboard/blink-performance-breakdown'
import { UserEngagementGovernance } from '@/components/dashboard/user-engagement-governance'
import { CommunityLeaderboard } from '@/components/dashboard/community-leaderboard'
import { BlinkCollection } from '@/components/dashboard/blink-collection'
import { fetchDashboardData, createBlink, searchBlinks } from '@/lib/api'
import { useDebounce } from '@/hooks/use-debounce'

export default function Dashboard() {
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState('6m')
  const [marketOverviewType, setMarketOverviewType] = useState('blinks')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchDashboardData(timeRange)
      setDashboardData(data)
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchBlinks(debouncedSearchTerm).then(results => {
        // Update the blinks in dashboardData with search results
        setDashboardData(prevData => ({
          ...prevData,
          blinks: results
        }))
      }).catch(err => {
        toast({
          title: "Search Error",
          description: "Failed to search blinks. Please try again.",
          variant: "destructive"
        })
      })
    }
  }, [debouncedSearchTerm, toast])

  const handleCreateBlink = useCallback(async (blinkData) => {
    try {
      const newBlink = await createBlink(blinkData)
      setDashboardData(prevData => ({
        ...prevData,
        blinks: [newBlink, ...prevData.blinks]
      }))
      toast({
        title: "Blink Created",
        description: `Your new Blink "${newBlink.name}" has been created! Start customizing it now.`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create Blink. Please try again.",
        variant: "destructive"
      })
    }
  }, [toast])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    // Implement the logic to mark all notifications as read
    // This would typically involve an API call
    toast({
      title: "Notifications",
      description: "All notifications marked as read.",
    })
  }, [toast])

  if (isLoading) {
    return <div>Loading...</div> // Consider using a more elaborate loading screen
  }

  if (error) {
    return <div>Error: {error}</div> // Consider using an error boundary
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header 
          onMenuClick={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          notifications={dashboardData.notifications}
          onMarkAllRead={markAllNotificationsAsRead}
          onCreateBlink={handleCreateBlink}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Blinks" 
                value={dashboardData.totalBlinks} 
                change={20} 
                icon={BarChart}
              />
              <StatCard 
                title="Balance" 
                value={`${dashboardData.balance} BARK`} 
                change={5} 
                icon={Wallet}
              />
              <StatCard 
                title="Membership" 
                value="Active" 
                subtext="Premium benefits unlocked" 
                icon={Crown}
              />
              <StatCard 
                title="BARK NFT Mascot" 
                value="1 CNFT" 
                subtext="Exclusive mascot owned" 
                icon={Dog}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BlinkCreationChart 
                data={dashboardData.blinkCreationData} 
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
              <MarketOverview 
                data={dashboardData.marketOverviewData}
                type={marketOverviewType}
                onTypeChange={setMarketOverviewType}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BlinkPerformanceBreakdown data={dashboardData.blinkPerformanceData} />
              <UserEngagementGovernance 
                engagementData={dashboardData.userEngagementData}
                governanceData={dashboardData.governanceData}
              />
            </div>

            <CommunityLeaderboard data={dashboardData.leaderboardData} />

            <BlinkCollection 
              blinks={dashboardData.blinks}
              onSearch={setSearchTerm}
              onCreateBlink={handleCreateBlink}
            />
          </div>
        </main>
      </div>
    </div>
  )
}