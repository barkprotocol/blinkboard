import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Settings, PlusCircle, Users, Home, Gift, ShoppingBag, Repeat, CreditCard, Heart, Image } from 'lucide-react'

const navItems = [
  {
    title: "Home",
    href: "/blinkboard",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/blinkboard/analytics",
    icon: BarChart,
  },
  {
    title: "Create Blink",
    href: "/blinkboard/create",
    icon: PlusCircle,
  },
  {
    title: "Community",
    href: "/blinkboard/community",
    icon: Users,
  },
  {
    title: "NFT",
    href: "/blinkboard/nft",
    icon: Image,
  },
  {
    title: "Commerce",
    href: "/blinkboard/commerce",
    icon: ShoppingBag,
  },
  {
    title: "Swap",
    href: "/blinkboard/swap",
    icon: Repeat,
  },
  {
    title: "Payments",
    href: "/blinkboard/payments",
    icon: CreditCard,
  },
  {
    title: "Donations",
    href: "/blinkboard/donations",
    icon: Heart,
  },
  {
    title: "Gift",
    href: "/blinkboard/gift",
    icon: Gift,
  },
  {
    title: "Settings",
    href: "/blinkboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="h-full py-6 flex flex-col bg-gray-100 dark:bg-gray-800">
      <div className="px-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dashboard</h2>
      </div>
      <ScrollArea className="flex-grow px-2">
        <div className="grid gap-2">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-muted hover:bg-muted"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="px-4 mt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 BARK Protocol</p>
      </div>
    </nav>
  )
}