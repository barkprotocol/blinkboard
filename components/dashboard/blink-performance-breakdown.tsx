'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Button } from "@/components/ui/button"
import { Download, Share2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

const COLORS = ['#D2B48C', '#E6CCB2', '#DEB887', '#C2B280', '#E0CDA9']

const TIME_RANGES = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
]

const METRICS = [
  { value: 'engagement', label: 'Engagement' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'growth', label: 'Growth' },
]

interface PerformanceData {
  category: string
  value: number
}

interface BlinkPerformanceBreakdownProps {
  data: {
    engagement: PerformanceData[]
    revenue: PerformanceData[]
    growth: PerformanceData[]
  }
}

export function BlinkPerformanceBreakdown({ data }: BlinkPerformanceBreakdownProps) {
  const [timeRange, setTimeRange] = useState('7d')
  const [metric, setMetric] = useState('engagement')

  const chartData = useMemo(() => {
    return data[metric as keyof typeof data] || []
  }, [data, metric])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180
    const radius = 25 + innerRadius + (outerRadius - innerRadius)
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '4px' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconSize={10}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  )

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="space-y-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Blink Performance</CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 text-sm">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs value={metric} onValueChange={setMetric} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            {METRICS.map((m) => (
              <TabsTrigger 
                key={m.value} 
                value={m.value} 
                className="text-xs py-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                {m.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4">
        {chartData.length > 0 ? renderPieChart() : (
          <div className="flex justify-center items-center h-[400px] text-gray-500 dark:text-gray-400">
            No data available for the selected metric.
          </div>
        )}
        <Separator className="my-6 bg-gray-200 dark:bg-gray-600" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          This breakdown shows how your Blinks are performing in terms of {metric}. Use this information to optimize your content strategy.
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" className="h-10 px-4 py-2 text-gray-800 bg-transparent hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600">
            Export Data
          </Button>
          <Button className="h-10 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900">
            View Detailed Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}