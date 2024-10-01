'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, TrendingUp, TrendingDown } from "lucide-react"
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

interface BlinkData {
  name: string
  blinks: number
}

interface BlinkCreationChartProps {
  data: BlinkData[]
  timeRange: string
  onTimeRangeChange: (value: string) => void
}

export function BlinkCreationChart({ data, timeRange, onTimeRangeChange }: BlinkCreationChartProps) {
  const [isLoading, setIsLoading] = useState(false)

  const totalBlinks = data.reduce((sum, item) => sum + item.blinks, 0)
  const averageBlinksPerPeriod = data.length > 0 ? Math.round(totalBlinks / data.length) : 0

  const trend = data.length > 1 ? (data[data.length - 1].blinks - data[0].blinks) / data[0].blinks * 100 : 0

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

  const handleTimeRangeChange = (value: string) => {
    setIsLoading(true)
    onTimeRangeChange(value)
    // Simulate API call delay
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Blink Creation Over Time</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
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
                  <span className="sr-only">Chart information</span>
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
              {trend > 0 ? (
                <TrendingUp className="text-green-500 mr-1" />
              ) : (
                <TrendingDown className="text-red-500 mr-1" />
              )}
              <p className={`text-lg font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(trend).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Track your Blink creation progress over time. Keep up the great work!
        </p>
      </CardContent>
    </Card>
  )
}