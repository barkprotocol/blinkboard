'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GovernancePage() {
  const [proposalTitle, setProposalTitle] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')

  const handleCreateProposal = () => {
    // Implement proposal creation logic here
    console.log(`Creating proposal: ${proposalTitle}`)
  }

  const mockProposals = [
    { id: 1, title: "Increase BARK staking rewards", votes: 1500, status: "Active" },
    { id: 2, title: "Add new NFT collection", votes: 1200, status: "Passed" },
    { id: 3, title: "Modify governance voting period", votes: 800, status: "Failed" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BARK Governance (DAO)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="proposalTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proposal Title</label>
                <Input
                  id="proposalTitle"
                  type="text"
                  placeholder="Enter proposal title"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="proposalDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proposal Description</label>
                <Textarea
                  id="proposalDescription"
                  placeholder="Enter proposal description"
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <Button className="w-full" onClick={handleCreateProposal}>
                Submit Proposal
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Votes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProposals.map((proposal) => (
                  <TableRow key={proposal.id}>
                    <TableCell>{proposal.title}</TableCell>
                    <TableCell>{proposal.votes}</TableCell>
                    <TableCell>{proposal.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}