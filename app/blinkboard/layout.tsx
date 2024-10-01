'use client'

import React from 'react'
import { Sidebar } from '@/components/ui/layout/sidebar'

export default function BlinkboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="md:hidden">
        <Sidebar />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}