import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Settings, PlusCircle, Users, Home, Gift, ShoppingBag, Repeat, CreditCard, Heart, ImageIcon } from 'lucide-react'

const navItems = [
  { title: "Home", href: "/blinkboard", icon: Home },
  { title: "Analytics", href: "/blinkboard/analytics", icon: BarChart },
  { title: "Create Blink", href: "/blinkboard/create", icon: PlusCircle },
  { title: "Community", href: "/blinkboard/community", icon: Users },
  { title: "NFT", href: "/blinkboard/nft", icon: ImageIcon },
  { title: "Commerce", href: "/blinkboard/commerce", icon: ShoppingBag },
  { title: "Swap", href: "/blinkboard/swap", icon: Repeat },
  { title: "Payments", href: "/blinkboard/payments", icon: CreditCard },
  { title: "Donations", href: "/blinkboard/donations", icon: Heart },
  { title: "Gift", href: "/blinkboard/gift", icon: Gift },
  { title: "Settings", href: "/blinkboard/settings", icon: Settings },
]

export function VerticalNav() {
  const pathname = usePathname()

  return (
    <nav className="h-full py-6 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="px-6 mb-8 flex items-center">
        <Image
          src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
          alt="BARK BLINK Logo"
          width={40}
          height={40}
          className="mr-3"
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">BLINKBOARD</h2>
      </div>
      <ScrollArea className="flex-grow px-4">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              {item.href === "/blinkboard" ? (
                <div
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "text-[#D0BFB4] bg-[#F4E0C7] dark:bg-[#3D3630]"
                      : "text-gray-700 hover:text-[#D0BFB4] hover:bg-[#F4E0C7] dark:text-gray-300 dark:hover:text-[#D0BFB4] dark:hover:bg-[#3D3630]"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  <span>{item.title}</span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href
                      ? "text-[#D0BFB4] bg-[#F4E0C7] dark:bg-[#3D3630]"
                      : "text-gray-700 hover:text-[#D0BFB4] hover:bg-[#F4E0C7] dark:text-gray-300 dark:hover:text-[#D0BFB4] dark:hover:bg-[#3D3630]"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  <span>{item.title}</span>
                </Button>
              )}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="px-6 mt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 BARK Protocol</p>
      </div>
    </nav>
  )
}