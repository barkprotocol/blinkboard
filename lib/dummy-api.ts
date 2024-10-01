import { Blink, DashboardData, LeaderboardEntry, GovernanceProposal, SwapQuote, StakingInfo, CommerceItem, BarkTransaction, MarketPrices } from '@/types';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockBlinks: Blink[] = [
  { id: '1', name: 'First Blink', description: 'This is the first blink', createdAt: new Date().toISOString(), likes: 10, shares: 5, views: 100 },
  { id: '2', name: 'Second Blink', description: 'This is the second blink', createdAt: new Date().toISOString(), likes: 20, shares: 8, views: 150 },
  { id: '3', name: 'Third Blink', description: 'This is the third blink', createdAt: new Date().toISOString(), likes: 15, shares: 3, views: 80 },
];

const mockDashboardData: DashboardData = {
  totalBlinks: 100,
  balance: 1000,
  blinkCreationData: [
    { name: 'Jan', blinks: 10 },
    { name: 'Feb', blinks: 15 },
    { name: 'Mar', blinks: 20 },
  ],
  marketOverviewData: [
    { name: 'BARK', value: 0.5 },
    { name: 'SOL', value: 50 },
    { name: 'USDC', value: 1 },
  ],
  blinkPerformanceData: {
    engagement: [
      { category: 'Likes', value: 500 },
      { category: 'Shares', value: 200 },
      { category: 'Views', value: 1000 },
    ],
    revenue: [
      { category: 'Ad Revenue', value: 100 },
      { category: 'Tips', value: 50 },
      { category: 'Sponsorships', value: 200 },
    ],
  },
  userEngagementData: {
    dailyActiveUsers: 1000,
    blinkCreationRate: 50,
    communityInteraction: 75,
  },
  governanceData: [
    { id: '1', title: 'Proposal 1', votes: 100, status: 'Active' },
    { id: '2', title: 'Proposal 2', votes: 75, status: 'Ended' },
  ],
  leaderboardData: [
    { id: '1', name: 'User 1', blinks: 50, likes: 1000, rank: 1 },
    { id: '2', name: 'User 2', blinks: 45, likes: 900, rank: 2 },
    { id: '3', name: 'User 3', blinks: 40, likes: 800, rank: 3 },
  ],
  blinks: mockBlinks,
  notifications: [
    { id: '1', message: 'New follower', read: false },
    { id: '2', message: 'Your blink was liked', read: true },
  ],
};

// API functions
export async function fetchDashboardData(timeRange: string): Promise<DashboardData> {
  await delay(500);
  return mockDashboardData;
}

export async function createBlink(blinkData: Partial<Blink>): Promise<Blink> {
  await delay(500);
  const newBlink: Blink = {
    id: (mockBlinks.length + 1).toString(),
    name: blinkData.name || 'New Blink',
    description: blinkData.description || 'New Blink Description',
    createdAt: new Date().toISOString(),
    likes: 0,
    shares: 0,
    views: 0,
  };
  mockBlinks.push(newBlink);
  return newBlink;
}

export async function searchBlinks(searchTerm: string): Promise<Blink[]> {
  await delay(500);
  return mockBlinks.filter(blink => 
    blink.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blink.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export async function markNotificationsAsRead(): Promise<void> {
  await delay(500);
  mockDashboardData.notifications = mockDashboardData.notifications.map(n => ({ ...n, read: true }));
}

export async function fetchBlinkCreationData(timeRange: string): Promise<{ name: string; blinks: number }[]> {
  await delay(500);
  return mockDashboardData.blinkCreationData;
}

export async function fetchMarketOverviewData(type: string): Promise<{ name: string; value: number }[]> {
  await delay(500);
  return mockDashboardData.marketOverviewData;
}

export async function fetchBlinkPerformanceData(): Promise<{
  engagement: { category: string; value: number }[];
  revenue: { category: string; value: number }[];
}> {
  await delay(500);
  return mockDashboardData.blinkPerformanceData;
}

export async function fetchUserEngagementData(): Promise<{
  dailyActiveUsers: number;
  blinkCreationRate: number;
  communityInteraction: number;
}> {
  await delay(500);
  return mockDashboardData.userEngagementData;
}

export async function fetchGovernanceData(): Promise<GovernanceProposal[]> {
  await delay(500);
  return mockDashboardData.governanceData;
}

export async function fetchLeaderboardData(): Promise<LeaderboardEntry[]> {
  await delay(500);
  return mockDashboardData.leaderboardData;
}

export async function voteBlink(blinkId: string): Promise<{ success: boolean }> {
  await delay(500);
  return { success: true };
}

export async function shareBlink(blinkId: string): Promise<{ success: boolean }> {
  await delay(500);
  return { success: true };
}

export async function fetchUserProfile(): Promise<{
  name: string;
  avatar: string;
  barkBalance: number;
  totalBlinks: number;
  membershipStatus: string;
}> {
  await delay(500);
  return {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    barkBalance: 1000,
    totalBlinks: 50,
    membershipStatus: 'Premium',
  };
}

export async function getSwapQuote(fromToken: string, toToken: string, amount: string): Promise<SwapQuote> {
  await delay(500);
  return {
    fromToken,
    toToken,
    fromAmount: amount,
    toAmount: (parseFloat(amount) * 1.5).toString(),
    exchangeRate: 1.5,
    expiresAt: new Date(Date.now() + 60000).toISOString(),
  };
}

export async function executeSwap(quoteId: string): Promise<BarkTransaction> {
  await delay(500);
  return {
    id: '1',
    type: 'swap',
    amount: '100',
    status: 'completed',
    timestamp: new Date().toISOString(),
  };
}

export async function fetchCommerceItems(): Promise<CommerceItem[]> {
  await delay(500);
  return [
    { id: '1', name: 'BARK T-Shirt', price: 20, description: 'Cool BARK T-Shirt' },
    { id: '2', name: 'BARK Mug', price: 10, description: 'BARK Coffee Mug' },
  ];
}

export async function purchaseCommerceItem(itemId: string): Promise<BarkTransaction> {
  await delay(500);
  return {
    id: '2',
    type: 'purchase',
    amount: '20',
    status: 'completed',
    timestamp: new Date().toISOString(),
  };
}

export async function fetchStakingInfo(): Promise<StakingInfo> {
  await delay(500);
  return {
    totalStaked: 10000,
    apr: 5,
    userStaked: 100,
    rewards: 5,
  };
}

export async function stakeTokens(amount: string): Promise<BarkTransaction> {
  await delay(500);
  return {
    id: '3',
    type: 'stake',
    amount,
    status: 'completed',
    timestamp: new Date().toISOString(),
  };
}

export async function unstakeTokens(amount: string): Promise<BarkTransaction> {
  await delay(500);
  return {
    id: '4',
    type: 'unstake',
    amount,
    status: 'completed',
    timestamp: new Date().toISOString(),
  };
}

export async function claimStakingRewards(): Promise<BarkTransaction> {
  await delay(500);
  return {
    id: '5',
    type: 'claim',
    amount: '5',
    status: 'completed',
    timestamp: new Date().toISOString(),
  };
}

export async function fetchBlinkTemplates(): Promise<Blink[]> {
  await delay(500);
  return [
    { id: 'template1', name: 'Template 1', description: 'First template', createdAt: new Date().toISOString(), likes: 0, shares: 0, views: 0 },
    { id: 'template2', name: 'Template 2', description: 'Second template', createdAt: new Date().toISOString(), likes: 0, shares: 0, views: 0 },
  ];
}

export async function createBlinkFromTemplate(templateId: string, customizations: Partial<Blink>): Promise<Blink> {
  await delay(500);
  return {
    id: (mockBlinks.length + 1).toString(),
    name: customizations.name || 'New Blink from Template',
    description: customizations.description || 'Description of new blink from template',
    createdAt: new Date().toISOString(),
    likes: 0,
    shares: 0,
    views: 0,
  };
}

export async function fetchBlinkAnalytics(blinkId: string): Promise<{
  views: number;
  likes: number;
  shares: number;
  revenue: number;
}> {
  await delay(500);
  return {
    views: 1000,
    likes: 100,
    shares: 50,
    revenue: 25,
  };
}

export async function fetchTransactionHistory(): Promise<BarkTransaction[]> {
  await delay(500);
  return [
    { id: '1', type: 'swap', amount: '100', status: 'completed', timestamp: new Date().toISOString() },
    { id: '2', type: 'purchase', amount: '20', status: 'completed', timestamp: new Date().toISOString() },
    { id: '3', type: 'stake', amount: '50', status: 'completed', timestamp: new Date().toISOString() },
  ];
}

export async function fetchTokenPrices(network: string, addresses: string[]): Promise<MarketPrices> {
  await delay(500);
  const prices: MarketPrices = {};
  addresses.forEach((address, index) => {
    prices[address] = 1 + (index * 0.1); // Mock prices
  });
  return prices;
}

export async function fetchMarketChart(network: string, address: string, timeframe: string = '1d'): Promise<{ date: string; price: number }[]> {
  await delay(500);
  const chart = [];
  const now = Date.now();
  for (let i = 0; i < 24; i++) {
    chart.push({
      date: new Date(now - i * 3600000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: 1 + Math.random() * 0.2,
    });
  }
  return chart;
}

export async function fetchTokenInfo(network: string, address: string): Promise<{
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
}> {
  await delay(500);
  return {
    name: 'BARK Token',
    symbol: 'BARK',
    current_price: 1.05,
    market_cap: 1000000,
    total_volume: 500000,
    high_24h: 1.1,
    low_24h: 1.0,
    price_change_percentage_24h: 5,
  };
}