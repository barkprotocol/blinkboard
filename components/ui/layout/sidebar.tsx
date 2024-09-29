'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Gift, Coins, ShoppingBag, Palette, Layers, Settings, Users, Heart, Repeat, ChevronRight, ChevronLeft, Moon, Sun, LogOut } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from 'next-themes'

const navItems = [
  { 
    name: 'Overview', 
    icon: <BarChart2 className="w-5 h-5" />, 
    href: '/blinkboard' 
  },
  { 
    name: 'Assets', 
    icon: <Palette className="w-5 h-5" />, 
    href: '/blinkboard/assets',
    subItems: [
      { name: 'NFT', icon: <Palette className="w-4 h-4" />, href: '/blinkboard/assets/nft' },
      { name: 'Tokens', icon: <Coins className="w-4 h-4" />, href: '/blinkboard/assets/tokens' },
    ]
  },
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
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <TooltipProvider>
      <div 
        className={`bg-white dark:bg-gray-800 h-full flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
        role="navigation"
      >
        <div className="p-4 flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700">
          <img
            src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
            alt="BARK BLINK logo"
            className="w-10 h-10 rounded-full"
          />
          {!isCollapsed && <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">Blinkboard</h1>}
        </div>
        <ScrollArea className="flex-grow py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${pathname.startsWith(item.href) ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                            <span className={`${pathname.startsWith(item.href) ? 'text-primary' : 'text-[#D0BFB4]'}`}>
                              {React.cloneElement(item.icon, { className: `w-5 h-5 ${pathname.startsWith(item.href) ? 'text-primary' : 'text-[#D0BFB4]'}` })}
                            </span>
                            {!isCollapsed && (
                              <>
                                <span className={`ml-3 ${pathname.startsWith(item.href) ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}>{item.name}</span>
                                <ChevronRight className="ml-auto w-4 h-4 text-[#D0BFB4]" />
                              </>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.subItems.map((subItem) => (
                        <Tooltip key={subItem.name}>
                          <TooltipTrigger asChild>
                            <Link 
                              href={subItem.href} 
                              className={`flex items-center p-2 pl-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${pathname === subItem.href ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                            >
                              <span className={`${pathname === subItem.href ? 'text-primary' : 'text-[#D0BFB4]'}`}>
                                {React.cloneElement(subItem.icon, { className: `w-4 h-4 ${pathname === subItem.href ? 'text-primary' : 'text-[#D0BFB4]'}` })}
                              </span>
                              {!isCollapsed && <span className={`ml-3 ${pathname === subItem.href ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}>{subItem.name}</span>}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{subItem.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={item.href} 
                        className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                      >
                        <span className={`${pathname === item.href ? 'text-primary' : 'text-[#D0BFB4]'}`}>
                          {React.cloneElement(item.icon, { className: `w-5 h-5 ${pathname === item.href ? 'text-primary' : 'text-[#D0BFB4]'}` })}
                        </span>
                        {!isCollapsed && <span className={`ml-3 ${pathname === item.href ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}>{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className={`${isCollapsed ? 'mx-auto' : ''} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-[#D0BFB4]" /> : <Moon className="h-5 w-5 text-[#D0BFB4]" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              onKeyDown={handleKeyDown}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={`${isCollapsed ? 'mx-auto' : ''} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5 text-[#D0BFB4]" /> : <ChevronLeft className="h-5 w-5 text-[#D0BFB4]" />}
            </Button>
          </div>
          {!isCollapsed && (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://ucarecdn.com/6fb2af1b-978f-4a8f-bd5c-b68db4458c9d/Barker.png" alt="User avatar" />
                <AvatarFallback>BP</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Barker</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">support@barkprotocol.net</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Logout"
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="h-5 w-5 text-[#D0BFB4]" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}