import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, SortAsc, SortDesc } from 'lucide-react'
import { BlinkCard } from '@/components/ui/blink-card'
import { Progress } from "@/components/ui/progress"
import debounce from 'lodash/debounce'
import { motion, AnimatePresence } from "framer-motion"

const initialBlinks = [
  {
    id: "1",
    name: "The Peaky Barkers",
    description: "A fierce and determined Underdog Blink collection",
    image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/ace.jpeg?height=100&width=100",
    createdAt: new Date(),
    likes: 42,
    shares: 15,
    comments: 8,
    views: 230
  },
  // ... (add the rest of the blinks here)
]

export function BlinkSection({ toast }) {
  const [blinks, setBlinks] = useState(initialBlinks)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleCreateBlink = useCallback(() => {
    const newBlink = {
      id: (blinks.length + 1).toString(),
      name: `New Blink ${blinks.length + 1}`,
      description: "A newly created Blink ready for customization",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/ace.jpeg?height=100&width=100",
      createdAt: new Date(),
      likes: 0,
      shares: 0,
      comments: 0,
      views: 0
    }
    setBlinks(prevBlinks => [newBlink, ...prevBlinks])
    toast({
      title: "Blink Created",
      description: `Your new Blink "${newBlink.name}" has been created! Start customizing it now.`,
    })
  }, [blinks.length, toast])

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const filteredBlinks = initialBlinks.filter(blink => 
        blink.name.toLowerCase().includes(term.toLowerCase()) ||
        blink.description.toLowerCase().includes(term.toLowerCase())
      )
      setBlinks(filteredBlinks)
      setCurrentPage(0)
      toast({
        title: "Search Results",
        description: `Found ${filteredBlinks.length} Blinks matching "${term}"`,
      })
    }, 300),
    [toast]
  )

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedSearch(e.target.value)
  }, [debouncedSearch])

  const sortedBlinks = React.useMemo(() => 
    [...blinks].sort((a, b) => 
      sortOrder === 'asc' ? a.likes - b.likes : b.likes - a.likes
    ),
    [blinks, sortOrder]
  )

  const visibleBlinks = React.useMemo(() => 
    sortedBlinks.slice(currentPage * 3, (currentPage * 3) + 3),
    [sortedBlinks, currentPage]
  )

  const loadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1)
  }, [])

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Your Blinks</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-white">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Create Blink
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Blink</DialogTitle>
              <DialogDescription>
                Fill in the details to create your new Blink. Let your creativity shine!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input id="name" className="col-span-3" placeholder="Enter a catchy name for your Blink" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Description
                </label>
                <Input id="description" className="col-span-3" placeholder="Describe your Blink in a few words" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateBlink}>Create Blink</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <Input 
              type="search"
              placeholder="Search your Blinks" 
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-white"
            aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>
        <Tabs defaultValue="grid" className="mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <AnimatePresence>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {visibleBlinks.map((blink) => (
                  <motion.div
                    key={blink.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BlinkCard
                      id={blink.id}
                      name={blink.name}
                      description={blink.description}
                      image={blink.image}
                      createdAt={blink.createdAt.toLocaleDateString()}
                      likes={blink.likes}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="space-y-4">
              {visibleBlinks.map((blink) => (
                <Card key={blink.id}>
                  <CardHeader>
                    <CardTitle>{blink.name}</CardTitle>
                    <CardDescription>{blink.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Likes</p>
                        <p className="text-2xl font-bold">{blink.likes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Shares</p>
                        <p className="text-2xl font-bold">{blink.shares}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Comments</p>
                        <p className="text-2xl font-bold">{blink.comments}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Views</p>
                        <p className="text-2xl font-bold">{blink.views}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Created on: {blink.createdAt.toLocaleDateString()}</p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Engagement Rate</p>
                      <Progress value={(blink.likes + blink.shares + blink.comments) / blink.views * 100} className="w-full mt-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        {visibleBlinks.length < sortedBlinks.length && (
          <div className="flex justify-center mt-6">
            <Button onClick={loadMore} className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-white">
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}