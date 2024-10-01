import React from 'react'
import { motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface CreateABlinkProps {
  onCreateBlink: () => void
}

export function CreateABlink({ onCreateBlink }: CreateABlinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onCreateBlink}
      className="cursor-pointer"
    >
      <Card className="flex flex-col items-center justify-center p-6 h-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
        <CardHeader className="flex flex-col items-center">
          <PlusCircle className="h-16 w-16 text-gray-400 dark:text-gray-500" />
          <CardTitle className="mt-4 text-lg font-semibold">Create a Blink</CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  )
}