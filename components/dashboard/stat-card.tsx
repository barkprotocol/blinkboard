import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: number
  subtext?: string
  className?: string
}

export function StatCard({ title, value, icon: Icon, change, subtext, className }: StatCardProps) {
  return (
    <Card className={cn("bg-white dark:bg-gray-800 shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
        {(change !== undefined || subtext) && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {change !== undefined && (
              <span className={cn(
                "font-medium",
                change > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {change > 0 ? "+" : ""}{change}%
              </span>
            )}
            {change !== undefined && subtext && " · "}
            {subtext}
          </p>
        )}
      </CardContent>
    </Card>
  )
}