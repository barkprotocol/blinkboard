'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts'

// Mock API function - replace with actual API call in production
const fetchBlinkData = async (timeRange: TimeRange): Promise<BlinkData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockData[timeRange]
}

type TimeRange = '1m' | '3m' | '6m' | '1y'

interface BlinkData {
  name: string
  blinks: number
}

const mockData: Record<TimeRange, BlinkData[]> = {
  '1m': [
    { name: 'Week 1', blinks: 12 },
    { name: 'Week 2', blinks: 19 },
    { name: 'Week 3', blinks: 15 },
    { name: 'Week 4', blinks: 22 },
  ],
  '3m': [
    { name: 'Jan', blinks: 45 },
    { name: 'Feb', blinks: 52 },
    { name: 'Mar', blinks: 61 },
  ],
  '6m': [
    { name: 'Jan', blinks: 45 },
    { name: 'Feb', blinks: 52 },
    { name: 'Mar', blinks: 61 },
    { name: 'Apr', blinks: 58 },
    { name: 'May', blinks: 70 },
    { name: 'Jun', blinks: 75 },
  ],
  '1y': [
    { name: 'Q1', blinks: 158 },
    { name: 'Q2', blinks: 203 },
    { name: 'Q3', blinks: 187 },
    { name: 'Q4', blinks: 225 },
  ],
}

export function BlinkCreationOverTime() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1m')
  const [chartData, setChartData] = useState<BlinkData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchBlinkData(timeRange)
      setChartData(data)
    } catch (err) {
      setError('Failed to fetch Blink creation data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const totalBlinks = useMemo(() => chartData.reduce((sum, item) => sum + item.blinks, 0), [chartData])

  const averageBlinksPerPeriod = useMemo(() => {
    return chartData.length > 0 ? Math.round(totalBlinks / chartData.length) : 0
  }, [chartData, totalBlinks])

  const trend = useMemo(() => {
    if (chartData.length < 2) return 'neutral'
    const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2))
    const secondHalf = chartData.slice(Math.floor(chartData.length / 2))
    const firstHalfAvg = firstHalf.reduce((sum, item) => sum + item.blinks, 0) / firstHalf.length
    const secondHalfAvg = secondHalf.reduce((sum, item) => sum + item.blinks, 0) / secondHalf.length
    return secondHalfAvg > firstHalfAvg ? 'up' : 'down'
  }, [chartData])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
          <p className="text-gray-600 dark:text-gray-400">
            Blinks created: <span className="font-bold text-primary">{payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Blink Creation Over Time</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
            <SelectTrigger className="w-[140px] sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This chart shows the number of Blinks created over time.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-[300px]" />
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Blinks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalBlinks}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average per {timeRange === '1m' ? 'week' : timeRange === '1y' ? 'quarter' : 'month'}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{averageBlinksPerPeriod}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Trend</p>
                <div className="flex items-center">
                  {trend === 'up' ? (
                    <TrendingUpIcon className="h-6 w-6 text-green-500" />
                  ) : trend === 'down' ? (
                    <TrendingDownIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <span className="text-yellow-500">−</span>
                  )}
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="blinks" fill="#D0BFB4" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="blinks" position="top" fill="#6B7280" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {trend === 'up' 
                ? "Great job! Your Blink creation is trending upwards. Keep up the momentum!" 
                : trend === 'down'
                ? "Your Blink creation has slowed down recently. Consider setting new creation goals to boost your numbers!"
                : "Your Blink creation rate is steady. Challenge yourself to increase your output!"}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}