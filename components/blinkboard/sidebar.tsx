'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Gift, Coins, ShoppingBag, Palette, Layers, Settings, Users, Heart, Repeat } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { name: 'Overview', icon: <BarChart2 className="w-5 h-5" />, href: '/blinkboard' },
  { name: 'NFT', icon: <Palette className="w-5 h-5" />, href: '/blinkboard/nft' },
  { name: 'Payments', icon: <Coins className="w-5 h-5" />, href: '/blinkboard/payments' },
  { name: 'Donations', icon: <Heart className="w-5 h-5" />, href: '/blinkboard/donations' },
  { name: 'Commerce', icon: <ShoppingBag className="w-5 h-5" />, href: '/blinkboard/commerce' },
  { name: 'Gift', icon: <Gift className="w-5 h-5" />, href: '/blinkboard/gift' },
  { name: 'Swap', icon: <Repeat className="w-5 h-5" />, href: '/blinkboard/swap' },
  { name: 'Staking', icon: <Layers className="w-5 h-5" />, href: '/blinkboard/staking' },
  { name: 'DAO', icon: <Users className="w-5 h-5" />, href: '/blinkboard/dao' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/blinkboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <div className="w-64 bg-white dark:bg-gray-800 h-full flex flex-col">
        <div className="p-4 flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
            alt="BARK BLINK logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">Blinkboard</h1>
        </div>
        <ScrollArea className="flex-grow py-4">
          <nav className="space-y-2 px-4">
            {navItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link 
                    href={item.href} 
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  >
                    <span className={`${pathname === item.href ? 'text-primary' : 'text-[#D0BFB4]'}`}>
                      {React.cloneElement(item.icon, { className: `w-5 h-5 ${pathname === item.href ? 'text-primary' : 'text-[#D0BFB4]'}` })}
                    </span>
                    <span className={`ml-3 ${pathname === item.href ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}>{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {/* Handle back to main page */}}
          >
            Back to Main Page
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}