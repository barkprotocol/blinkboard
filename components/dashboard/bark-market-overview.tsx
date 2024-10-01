'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { ArrowUpIcon, ArrowDownIcon, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts'

type CurrencyType = 'usd' | 'sol' | 'usdc' | 'bark'

const COIN_IDS = {
  usd: 'usd',
  sol: 'solana',
  usdc: 'usd-coin',
  bark: 'bark'
}

const OVERVIEW_TYPES = [
  { value: 'blinks', label: 'Blinks' },
  { value: 'tokens', label: 'Tokens' },
  { value: 'marketPrices', label: 'Market Prices' },
]

const CURRENCIES = [
  { value: 'usd', label: 'USD' },
  { value: 'sol', label: 'SOL' },
  { value: 'usdc', label: 'USDC' },
  { value: 'bark', label: 'BARK' },
]

interface BARKMarketOverviewProps {
  initialType?: string;
  onTypeChange?: (type: string) => void;
}

export function BARKMarketOverview({ initialType = 'blinks', onTypeChange }: BARKMarketOverviewProps) {
  const [marketOverviewType, setMarketOverviewType] = useState(initialType)
  const [currency, setCurrency] = useState<CurrencyType>('usd')
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${COIN_IDS[currency]}/market_chart?vs_currency=usd&days=30&interval=daily`)
        const data = await response.json()
        const formattedData = data.prices.map(([timestamp, price]: [number, number]) => ({
          date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: price
        }))
        setChartData(formattedData)
      } catch (err) {
        setError('Failed to fetch market data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarketData()
  }, [currency])

  const handleTypeChange = (value: string) => {
    setMarketOverviewType(value)
    if (onTypeChange) {
      onTypeChange(value)
    }
  }

  const getTitle = useMemo(() => {
    switch (marketOverviewType) {
      case 'blinks':
        return 'Blinks Value Overview'
      case 'tokens':
        return 'BARK Token Value Overview'
      case 'marketPrices':
        return `${currency.toUpperCase()} Market Price Overview`
      default:
        return 'BARK Market Overview'
    }
  }, [marketOverviewType, currency])

  const getDescription = useMemo(() => {
    switch (marketOverviewType) {
      case 'blinks':
        return "Track the value of your Blink collection over time."
      case 'tokens':
        return "Monitor BARK token performance and market trends."
      case 'marketPrices':
        return `View ${currency.toUpperCase()} price trends over the last 30 days.`
      default:
        return "Select an overview type to see more details."
    }
  }, [marketOverviewType, currency])

  const formatCurrency = (value: number) => {
    switch (currency) {
      case 'usd':
      case 'usdc':
        return `$${value.toFixed(2)}`
      case 'sol':
        return `${value.toFixed(4)} SOL`
      case 'bark':
        return `${value.toFixed(2)} BARK`
    }
  }

  const getPercentageChange = useMemo(() => {
    if (chartData.length < 2) return '0.00'
    const firstValue = chartData[0].price
    const lastValue = chartData[chartData.length - 1].price
    const percentageChange = ((lastValue - firstValue) / firstValue) * 100
    return percentageChange.toFixed(2)
  }, [chartData])

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="space-y-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{getTitle}</CardTitle>
            <Select value={marketOverviewType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 text-sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {OVERVIEW_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs defaultValue="usd" className="w-full" onValueChange={(value) => setCurrency(value as CurrencyType)}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
            {CURRENCIES.map((curr) => (
              <TabsTrigger 
                key={curr.value} 
                value={curr.value} 
                className="text-xs py-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                {curr.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]" />
        ) : error ? (
          <div className="text-red-500 text-center text-sm">{error}</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(chartData[chartData.length - 1]?.price || 0)}
              </div>
              <Badge variant={parseFloat(getPercentageChange) >= 0 ? "success" : "destructive"} className="text-xs px-2 py-0.5">
                {parseFloat(getPercentageChange) >= 0 ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                {Math.abs(parseFloat(getPercentageChange))}%
              </Badge>
            </div>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    tickMargin={5}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tickFormatter={(value) => formatCurrency(value)}
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    width={60}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px', fontSize: '12px' }}
                    formatter={(value: number) => [formatCurrency(value), currency.toUpperCase()]}
                    labelStyle={{ color: '#D1D5DB' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#D0BFB4" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{getDescription}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
