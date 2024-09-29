import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart, Settings, PlusCircle, Users, Home, Gift, ShoppingBag, Repeat, CreditCard, Heart, Image, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { title: "Home", href: "/blinkboard", icon: Home },
  { title: "Analytics", href: "/blinkboard/analytics", icon: BarChart },
  { title: "Create Blink", href: "/blinkboard/create", icon: PlusCircle },
  { title: "Community", href: "/blinkboard/community", icon: Users },
  { title: "NFT", href: "/blinkboard/nft", icon: Image },
  { title: "Commerce", href: "/blinkboard/commerce", icon: ShoppingBag },
  { title: "Swap", href: "/blinkboard/swap", icon: Repeat },
  { title: "Payments", href: "/blinkboard/payments", icon: CreditCard },
  { title: "Donations", href: "/blinkboard/donations", icon: Heart },
  { title: "Gift", href: "/blinkboard/gift", icon: Gift },
  { title: "Settings", href: "/blinkboard/settings", icon: Settings },
]

export function HorizontalNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mr-6">BARK BLINKBOARD</h2>
        <div className="hidden md:flex space-x-2">
          {navItems.slice(0, 5).map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  pathname === item.href && "bg-gray-100 dark:bg-gray-700"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.slice(5).map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}