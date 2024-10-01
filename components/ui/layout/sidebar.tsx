'use client'

import React, { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Gift, Coins, ShoppingBag, Palette, Layers, Settings, Users, Heart, Repeat, ChevronRight, ChevronLeft, Moon, Sun, LogOut, ChevronDown } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'

interface NavItem {
  name: string
  icon: React.ElementType
  href: string
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  { 
    name: 'Overview', 
    icon: BarChart2, 
    href: '/blinkboard' 
  },
  { 
    name: 'Assets', 
    icon: Palette, 
    href: '/blinkboard/assets',
    subItems: [
      { name: 'NFT', icon: Palette, href: '/blinkboard/assets/nft' },
      { name: 'Tokens', icon: Coins, href: '/blinkboard/assets/tokens' },
    ]
  },
  { name: 'Payments', icon: Coins, href: '/blinkboard/pages/payments' },
  { name: 'Donations', icon: Heart, href: '/blinkboard/pages/donations' },
  { name: 'Commerce', icon: ShoppingBag, href: '/blinkboard/pages/commerce' },
  { name: 'Gift', icon: Gift, href: '/blinkboard/pages/gift' },
  { name: 'Swap', icon: Repeat, href: '/blinkboard/pages/swap' },
  { name: 'Staking', icon: Layers, href: '/blinkboard/pages/staking' },
  { name: 'Governance', icon: Users, href: '/blinkboard/pages/governance' },
  { name: 'Settings', icon: Settings, href: '/blinkboard/pages/settings' },
]

function ErrorFallback({error, resetErrorBoundary}: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <div role="alert" className="p-4 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-md">
      <p>Something went wrong:</p>
      <pre className="text-sm">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openItems, setOpenItems] = useState<string[]>([])
  const { theme, setTheme } = useTheme()

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  const toggleOpenItem = useCallback((itemName: string) => {
    setOpenItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }, [])

  const isItemOpen = useCallback((itemName: string) => openItems.includes(itemName), [openItems])

  const isActiveRoute = useCallback((href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }, [pathname])

  const renderNavItem = useCallback((item: NavItem, depth = 0) => {
    const Icon = item.icon
    const isActive = isActiveRoute(item.href)
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isOpen = isItemOpen(item.name)

    return (
      <div key={item.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Link 
                href={item.href}
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                style={{ paddingLeft: `${(depth + 1) * 0.5}rem` }}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`${isActive ? 'text-primary' : 'text-[#D0BFB4]'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-[#D0BFB4]'}`} aria-hidden="true" />
                </span>
                {!isCollapsed && (
                  <span className={`ml-3 ${isActive ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                    {item.name}
                  </span>
                )}
              </Link>
              {hasSubItems && !isCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => toggleOpenItem(item.name)}
                  aria-expanded={isOpen}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                  />
                </Button>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
        {hasSubItems && (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Collapsible open={isOpen}>
                  <CollapsibleContent>
                    {item.subItems!.map(subItem => renderNavItem(subItem, depth + 1))}
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }, [isCollapsed, isActiveRoute, isItemOpen, toggleOpenItem])

  const renderNavItems = useMemo(() => navItems.map(item => renderNavItem(item)), [renderNavItem])

  const handleLogout = useCallback(() => {
    // Implement logout logic here
    console.log('Logging out...')
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TooltipProvider>
        <motion.aside 
          className={`bg-white dark:bg-gray-800 h-full flex flex-col transition-all duration-300`}
          initial={{ width: isCollapsed ? 80 : 256 }}
          animate={{ width: isCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3 }}
          aria-label="Sidebar"
        >
          <div className="p-4 flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700">
            <img
              src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
              alt="BARK BLINK logo"
              className="w-10 h-10 rounded-full"
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200"
                >
                  BLINKBOARD
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
          <ScrollArea className="flex-grow py-4">
            <nav className="space-y-1 px-3" aria-label="Main">
              {renderNavItems}
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
                {theme === 'dark' ? <Sun className="h-5 w-5 text-[#D0BFB4]" aria-hidden="true" /> : <Moon className="h-5 w-5 text-[#D0BFB4]" aria-hidden="true" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className={`${isCollapsed ? 'mx-auto' : ''} hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                {isCollapsed ? <ChevronRight className="h-5 w-5 text-[#D0BFB4]" aria-hidden="true" /> : <ChevronLeft className="h-5 w-5 text-[#D0BFB4]" aria-hidden="true" />}
              </Button>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-4"
                >
                  <Avatar>
                    <AvatarImage src="https://ucarecdn.com/6fb2af1b-978f-4a8f-bd5c-b68db4458c9d/Barker.png" alt="User avatar" />
                    <AvatarFallback>BP</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Barker</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">info@barkprotocol.net</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-5 w-5 text-[#D0BFB4]" aria-hidden="true" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      </TooltipProvider>
    </ErrorBoundary>
  )
}