"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, ArrowUp, ArrowDown, Minus, Info, Zap, Book, Share2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  blinks: number;
  likes: number;
  rank: number;
  change: 'up' | 'down' | 'same';
  achievements: string[];
}

const mockLeaderboardData: LeaderboardEntry[] = [
  { id: "1", name: "Alice", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Alice", blinks: 150, likes: 2800, rank: 1, change: 'up', achievements: ['Top Creator', 'Trend Setter'] },
  { id: "2", name: "Bob", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Bob", blinks: 142, likes: 2750, rank: 2, change: 'down', achievements: ['Consistent Contributor'] },
  { id: "3", name: "Charlie", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Charlie", blinks: 138, likes: 2600, rank: 3, change: 'up', achievements: ['Rising Star'] },
  { id: "4", name: "David", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=David", blinks: 130, likes: 2450, rank: 4, change: 'same', achievements: ['Community Favorite'] },
  { id: "5", name: "Eva", avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Eva", blinks: 125, likes: 2300, rank: 5, change: 'up', achievements: ['Innovative Creator'] },
];

const barkUseCases = [
  { icon: <Zap className="w-5 h-5" />, title: "Quick Learning", description: "Bite-sized content for rapid knowledge acquisition" },
  { icon: <Book className="w-5 h-5" />, title: "Skill Development", description: "Curated paths for mastering new skills" },
  { icon: <Share2 className="w-5 h-5" />, title: "Knowledge Sharing", description: "Platform for experts to share insights" },
];

export function CommunityLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLeaderboardData(mockLeaderboardData);
      } catch (err) {
        setError('Failed to fetch leaderboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500';
      case 2:
        return 'bg-gray-400';
      case 3:
        return 'bg-amber-600';
      default:
        return 'bg-[#D0BFB4]';
    }
  };

  const getChangeIcon = (change: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'same':
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="flex flex-col space-y-4 bg-gradient-to-r from-[#D0BFB0] to-[#FFFFF] dark:from-[#100000] dark:to-[#D0BFB0] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">BARK Community Leaderboard</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:bg-[#D0BFB4]/20 dark:hover:bg-[#8A7A6D]/20">
                  <Info className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Top performers in the BARK (Bite-sized Accessible Retained Knowledge) community</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-gray-700 dark:text-gray-300">
          BARK: Empowering learners with concise, engaging content for efficient development camp and social good sharing.
        </CardDescription>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {barkUseCases.map((useCase, index) => (
            <div key={index} className="flex items-center space-x-2 bg-[#E5D9D0] dark:bg-[#5C4D40] p-3 rounded-lg">
              {useCase.icon}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{useCase.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-full h-20" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            {error} 
            <Button variant="outline" onClick={() => setLeaderboardData(mockLeaderboardData)}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {leaderboardData.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-[#F5F0ED] dark:bg-[#3C3026] rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedEntry(entry)}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{entry.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Blinks: {entry.blinks}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className={getRankBadgeColor(entry.rank)}>
                      Rank {entry.rank}
                    </Badge>
                    <div>{getChangeIcon(entry.change)}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>

      {selectedEntry && (
        <AnimatePresence>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSelectedEntry(null)}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 z-50 shadow-lg"
            >
              <h3 className="text-lg font-bold">{selectedEntry.name}</h3>
              <Avatar className="mt-4 w-24 h-24 mx-auto">
                <AvatarImage src={selectedEntry.avatar} alt={selectedEntry.name} />
                <AvatarFallback>{selectedEntry.name[0]}</AvatarFallback>
              </Avatar>
              <p className="mt-2">Blinks: {selectedEntry.blinks}</p>
              <p className="mt-1">Likes: {selectedEntry.likes}</p>
              <div className="mt-4">
                <h4 className="font-semibold">Achievements:</h4>
                <ul className="list-disc pl-5">
                  {selectedEntry.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-400">{achievement}</li>
                  ))}
                </ul>
              </div>
              <Button className="mt-4" onClick={() => setSelectedEntry(null)}>Close</Button>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </Card>
  );
}
