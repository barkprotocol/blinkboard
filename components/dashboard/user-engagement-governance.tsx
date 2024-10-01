'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VoteIcon } from "lucide-react"

interface EngagementData {
  dailyActiveUsers: number
  blinkCreationRate: number
  communityInteraction: number
}

interface GovernanceProposal {
  id: number
  title: string
  votes: number
  status: 'Active' | 'Ended'
}

interface UserEngagementGovernanceProps {
  engagementData: EngagementData
  governanceData: GovernanceProposal[]
}

export function UserEngagementGovernance({ engagementData, governanceData }: UserEngagementGovernanceProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">User Engagement & Governance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Active Users</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{engagementData.dailyActiveUsers}%</span>
            </div>
            <Progress value={engagementData.dailyActiveUsers} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Blink Creation Rate</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{engagementData.blinkCreationRate}%</span>
            </div>
            <Progress value={engagementData.blinkCreationRate} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Community Interaction</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{engagementData.communityInteraction}%</span>
            </div>
            <Progress value={engagementData.communityInteraction} className="w-full" />
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Governance Overview</h4>
          <ul className="space-y-2">
            {governanceData.map((proposal) => (
              <li key={proposal.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{proposal.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{proposal.votes} votes • {proposal.status}</p>
                </div>
                <Button variant="outline" size="sm">
                  <VoteIcon className="h-4 w-4 mr-1" />
                  Vote
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Great job on community interaction! Consider ways to increase the Blink creation rate and participate in governance to boost overall engagement.
        </p>
      </CardContent>
    </Card>
  )
}