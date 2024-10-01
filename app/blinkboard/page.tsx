'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { BarChart, Wallet, TrendingUp, Users, Activity, Vote } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Sidebar } from '@/components/ui/layout/sidebar'
import { Header } from '@/components/ui/layout/header'
import { StatCard } from '@/components/dashboard/stat-card'
import { BlinkCreationChart } from '@/components/dashboard/blink-creation-chart'
import { BARKMarketOverview } from '@/components/dashboard/bark-market-overview'
import { BlinkPerformanceBreakdown } from '@/components/dashboard/blink-performance-breakdown'
import { UserEngagementGovernance } from '@/components/dashboard/user-engagement-governance'
import { CommunityLeaderboard } from '@/components/dashboard/community-leaderboard'
import { BlinkCollection } from '@/components/dashboard/blink-collection'
import { useDebounce } from '@/hooks/use-debounce'
import { ErrorDisplay } from '@/components/error-display'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

interface MarketPrices {
  SOL: number;
  USDC: number;
  BARK: number;
}

interface DashboardData {
  totalBlinks: number;
  balance: number;
  blinkCreationData: { name: string; blinks: number }[];
  marketOverviewData: { name: string; value: number }[];
  blinkPerformanceData: {
    engagement: { category: string; value: number }[];
    revenue: { category: string; value: number }[];
  };
  userEngagementData: {
    dailyActiveUsers: number;
    blinkCreationRate: number;
    communityInteraction: number;
  };
  governanceData: { id: string; title: string; votes: number; status: string }[];
  leaderboardData: { id: string; name: string; blinks: number; likes: number; rank: number }[];
  blinks: any[]; // Replace 'any' with the actual Blink type when available
  notifications: { id: string; message: string; read: boolean }[];
}

// Data
const mockDashboardData: DashboardData = {
  totalBlinks: 1234,
  balance: 5000,
  blinkCreationData: [
    { name: 'Jan', blinks: 100 },
    { name: 'Feb', blinks: 150 },
    { name: 'Mar', blinks: 200 },
    { name: 'Apr', blinks: 180 },
    { name: 'May', blinks: 220 },
    { name: 'Jun', blinks: 250 },
  ],
  marketOverviewData: [
    { name: 'Price', value: 0.15 },
    { name: 'Market Cap', value: 15000000 },
    { name: 'Volume', value: 1000000 },
    { name: '24h Change', value: 5.2 },
  ],
  blinkPerformanceData: {
    engagement: [
      { category: 'Likes', value: 5000 },
      { category: 'Shares', value: 2000 },
      { category: 'Comments', value: 1500 },
    ],
    revenue: [
      { category: 'Ad Revenue', value: 10000 },
      { category: 'Tips', value: 5000 },
      { category: 'Sponsorships', value: 15000 },
    ],
  },
  userEngagementData: {
    dailyActiveUsers: 10000,
    blinkCreationRate: 500,
    communityInteraction: 75,
  },
  governanceData: [
    { id: '1', title: 'Proposal 1', votes: 1000, status: 'Active' },
    { id: '2', title: 'Proposal 2', votes: 800, status: 'Ended' },
    { id: '3', title: 'Proposal 3', votes: 1200, status: 'Active' },
  ],
  leaderboardData: [
    { id: '1', name: 'User 1', blinks: 100, likes: 5000, rank: 1 },
    { id: '2', name: 'User 2', blinks: 90, likes: 4500, rank: 2 },
    { id: '3', name: 'User 3', blinks: 80, likes: 4000, rank: 3 },
  ],
  blinks: [
    { id: '1', title: 'Blink 1', description: 'Description 1', likes: 100, shares: 50 },
    { id: '2', title: 'Blink 2', description: 'Description 2', likes: 200, shares: 75 },
    { id: '3', title: 'Blink 3', description: 'Description 3', likes: 150, shares: 60 },
  ],
  notifications: [
    { id: '1', message: 'New follower', read: false },
    { id: '2', message: 'Your blink was liked', read: true },
    { id: '3', message: 'New comment on your blink', read: false },
  ],
}

const mockMarketPrices: MarketPrices = {
  SOL: 20.5,
  USDC: 1,
  BARK: 0.15,
}

export default function Dashboard() {
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [marketPrices, setMarketPrices] = useState<MarketPrices | null>(null)
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDashboardData(mockDashboardData)
      setMarketPrices(mockMarketPrices)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to fetch dashboard data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (debouncedSearchTerm && dashboardData) {
      // Simulate blink search
      const filteredBlinks = mockDashboardData.blinks.filter(blink => 
        blink.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        blink.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      setDashboardData(prevData => ({
        ...prevData!,
        blinks: filteredBlinks
      }))
    } else if (dashboardData) {
      // Reset to original blinks when search term is cleared
      setDashboardData(prevData => ({
        ...prevData!,
        blinks: mockDashboardData.blinks
      }))
    }
  }, [debouncedSearchTerm, dashboardData])

  const handleCreateBlink = useCallback(async (blinkData: any) => {
    try {
      // Simulate creating a new blink
      const newBlink = {
        id: String(mockDashboardData.blinks.length + 1),
        title: blinkData.title || 'New Blink',
        description: blinkData.description || 'New Blink Description',
        likes: 0,
        shares: 0,
      }
      setDashboardData(prevData => prevData ? ({
        ...prevData,
        blinks: [newBlink, ...prevData.blinks],
        totalBlinks: prevData.totalBlinks + 1
      }) : null)
      toast({
        title: "Blink Created",
        description: `Your new Blink "${newBlink.title}" has been created! Start customizing it now.`,
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

  const markAllNotificationsAsRead = useCallback(async () => {
    try {
      // Simulate marking notifications as read
      setDashboardData(prevData => prevData ? ({
        ...prevData,
        notifications: prevData.notifications.map(n => ({ ...n, read: true }))
      }) : null)
      toast({
        title: "Notifications",
        description: "All notifications marked as read.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read. Please try again.",
        variant: "destructive"
      })
    }
  }, [toast])

  const memoizedDashboardContent = useMemo(() => {
    if (!dashboardData || !marketPrices) return null

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
          <Button onClick={fetchData} variant="outline" size="sm" className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Blinks" 
            value={dashboardData.totalBlinks} 
            change={20} 
            icon={BarChart}
          />
          <StatCard 
            title="BARK Balance" 
            value={`${dashboardData.balance} BARK`} 
            change={5} 
            icon={Wallet}
          />
          <StatCard 
            title="SOL Price" 
            value={`$${marketPrices.SOL.toFixed(2)}`} 
            icon={TrendingUp}
          />
          <StatCard 
            title="USDC Price" 
            value={`$${marketPrices.USDC.toFixed(2)}`} 
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BlinkCreationChart 
            data={dashboardData.blinkCreationData} 
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
          <BARKMarketOverview 
            data={dashboardData.marketOverviewData}
            initialType={marketOverviewType}
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
      </>
    )
  }, [dashboardData, marketPrices, timeRange, marketOverviewType, setTimeRange, setMarketOverviewType, setSearchTerm, handleCreateBlink, fetchData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-4 w-[200px] ml-4" />
      </div>
    )
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchData} />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'md:ml-50' : 'md:ml-20'}`}>
        <Header 
          onMenuClick={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          notifications={dashboardData?.notifications || []}
          onMarkAllRead={markAllNotificationsAsRead}
          onCreateBlink={handleCreateBlink}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {memoizedDashboardContent}
          </div>
        </main>
      </div>
    </div>
  )
}