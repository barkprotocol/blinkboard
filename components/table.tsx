import { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function UserTable() {
  const startTime = Date.now()
  try {
    const users = await prisma.users.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    })
    const duration = Date.now() - startTime

    if (users.length === 0) {
      return <p className="text-center text-gray-500">No users found.</p>
    }

    return (
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={user.image || '/placeholder.svg'}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo(user.createdAt)}</p>
          </div>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return <p className="text-center text-red-500">Failed to load users. Please try again later.</p>
  }
}

export default function Table() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Recent Users</CardTitle>
        <RefreshButton />
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p className="text-center">Loading users...</p>}>
          <UserTable />
        </Suspense>
      </CardContent>
    </Card>
  )
}