import axios, { AxiosResponse } from 'axios';
import { Blink, DashboardData, LeaderboardEntry, GovernanceProposal, SwapQuote, StakingInfo, CommerceItem, BarkTransaction, MarketPrices } from '@/types';
import { Connection, PublicKey } from '@solana/web3.js';
import { getRealms } from '@solana/spl-governance';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.bark-dashboard.com';
const GECKOTERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2';
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const geckoTerminalApi = axios.create({
  baseURL: GECKOTERMINAL_API_URL,
  headers: {
    'Accept': 'application/json;version=20230302',
  },
});

async function handleResponse<T>(response: AxiosResponse<T>): Promise<T> {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(response.data as string || 'An error occurred while fetching data');
}

export async function fetchDashboardData(timeRange: string): Promise<DashboardData> {
  const response = await api.get<DashboardData>(`/dashboard?timeRange=${timeRange}`);
  return handleResponse(response);
}

export async function createBlink(blinkData: Partial<Blink>): Promise<Blink> {
  const response = await api.post<Blink>('/blinks', blinkData);
  return handleResponse(response);
}

export async function searchBlinks(searchTerm: string): Promise<Blink[]> {
  const response = await api.get<Blink[]>(`/blinks/search?q=${encodeURIComponent(searchTerm)}`);
  return handleResponse(response);
}

export async function markNotificationsAsRead(): Promise<void> {
  const response = await api.post<void>('/notifications/mark-read');
  return handleResponse(response);
}

export async function fetchBlinkCreationData(timeRange: string): Promise<{ name: string; blinks: number }[]> {
  const response = await api.get<{ name: string; blinks: number }[]>(`/blinks/creation-data?timeRange=${timeRange}`);
  return handleResponse(response);
}

export async function fetchMarketOverviewData(type: string): Promise<{ name: string; value: number }[]> {
  const response = await api.get<{ name: string; value: number }[]>(`/market-overview?type=${type}`);
  return handleResponse(response);
}

export async function fetchBlinkPerformanceData(): Promise<{
  engagement: { category: string; value: number }[];
  revenue: { category: string; value: number }[];
}> {
  const response = await api.get<{
    engagement: { category: string; value: number }[];
    revenue: { category: string; value: number }[];
  }>('/blinks/performance');
  return handleResponse(response);
}

export async function fetchUserEngagementData(): Promise<{
  dailyActiveUsers: number;
  blinkCreationRate: number;
  communityInteraction: number;
}> {
  const response = await api.get<{
    dailyActiveUsers: number;
    blinkCreationRate: number;
    communityInteraction: number;
  }>('/user-engagement');
  return handleResponse(response);
}

export async function fetchGovernanceData(): Promise<GovernanceProposal[]> {
  try {
    const connection = new Connection(SOLANA_RPC_URL);
    const realms = await getRealms(connection);

    const barkRealm = realms.find(realm => realm.account.name === 'BARK');
    if (!barkRealm) {
      throw new Error('BARK realm not found');
    }

    const proposals = await barkRealm.getProposals(connection);

    return proposals.map(proposal => ({
      id: proposal.pubkey.toBase58(),
      title: proposal.account.name,
      description: proposal.account.descriptionLink || '',
      votes: proposal.account.yesVoteCount.toNumber(),
      status: proposal.state,
      link: `https://app.realms.today/dao/BARK%20DAO/proposal/${proposal.pubkey.toBase58()}`,
    }));
  } catch (error) {
    console.error('Error fetching governance data:', error);
    throw new Error('Failed to fetch governance data');
  }
}

export async function fetchLeaderboardData(): Promise<LeaderboardEntry[]> {
  const response = await api.get<LeaderboardEntry[]>('/leaderboard');
  return handleResponse(response);
}

export async function voteBlink(blinkId: string): Promise<{ success: boolean }> {
  const response = await api.post<{ success: boolean }>(`/blinks/${blinkId}/vote`);
  return handleResponse(response);
}

export async function shareBlink(blinkId: string): Promise<{ success: boolean }> {
  const response = await api.post<{ success: boolean }>(`/blinks/${blinkId}/share`);
  return handleResponse(response);
}

export async function fetchUserProfile(): Promise<{
  name: string;
  avatar: string;
  barkBalance: number;
  totalBlinks: number;
  membershipStatus: string;
}> {
  const response = await api.get<{
    name: string;
    avatar: string;
    barkBalance: number;
    totalBlinks: number;
    membershipStatus: string;
  }>('/user/profile');
  return handleResponse(response);
}

export async function getSwapQuote(fromToken: string, toToken: string, amount: string): Promise<SwapQuote> {
  const response = await api.get<SwapQuote>(`/swap/quote?fromToken=${fromToken}&toToken=${toToken}&amount=${amount}`);
  return handleResponse(response);
}

export async function executeSwap(quoteId: string): Promise<BarkTransaction> {
  const response = await api.post<BarkTransaction>('/swap/execute', { quoteId });
  return handleResponse(response);
}

export async function fetchCommerceItems(): Promise<CommerceItem[]> {
  const response = await api.get<CommerceItem[]>('/commerce/items');
  return handleResponse(response);
}

export async function purchaseCommerceItem(itemId: string): Promise<BarkTransaction> {
  const response = await api.post<BarkTransaction>('/commerce/purchase', { itemId });
  return handleResponse(response);
}

export async function fetchStakingInfo(): Promise<StakingInfo> {
  const response = await api.get<StakingInfo>('/staking/info');
  return handleResponse(response);
}

export async function stakeTokens(amount: string): Promise<BarkTransaction> {
  const response = await api.post<BarkTransaction>('/staking/stake', { amount });
  return handleResponse(response);
}

export async function unstakeTokens(amount: string): Promise<BarkTransaction> {
  const response = await api.post<BarkTransaction>('/staking/unstake', { amount });
  return handleResponse(response);
}

export async function claimStakingRewards(): Promise<BarkTransaction> {
  const response = await api.post<BarkTransaction>('/staking/claim-rewards');
  return handleResponse(response);
}

export async function fetchBlinkTemplates(): Promise<Blink[]> {
  const response = await api.get<Blink[]>('/blinks/templates');
  return handleResponse(response);
}

export async function createBlinkFromTemplate(templateId: string, customizations: Partial<Blink>): Promise<Blink> {
  const response = await api.post<Blink>('/blinks/create-from-template', { templateId, customizations });
  return handleResponse(response);
}

export async function fetchBlinkAnalytics(blinkId: string): Promise<{
  views: number;
  likes: number;
  shares: number;
  revenue: number;
}> {
  const response = await api.get<{
    views: number;
    likes: number;
    shares: number;
    revenue: number;
  }>(`/blinks/${blinkId}/analytics`);
  return handleResponse(response);
}

export async function fetchTransactionHistory(): Promise<BarkTransaction[]> {
  const response = await api.get<BarkTransaction[]>('/transactions/history');
  return handleResponse(response);
}

// GeckoTerminal API functions

export async function fetchTokenPrices(network: string, addresses: string[]): Promise<MarketPrices> {
  const addressesString = addresses.join(',');
  const response = await geckoTerminalApi.get<any>(`/simple/networks/${network}/token_price/${addressesString}`);
  const data = handleResponse(response);
  
  const prices: MarketPrices = {};
  for (const address of addresses) {
    prices[address] = data.data[address].price_usd;
  }
  
  return prices;
}

export async function fetchMarketChart(network: string, address: string, timeframe: string = '1d'): Promise<{ date: string; price: number }[]> {
  const response = await geckoTerminalApi.get<any>(`/simple/networks/${network}/token_price/${address}/chart?timeframe=${timeframe}`);
  const data = handleResponse(response);
  
  return data.data.map((item: [number, number]) => ({
    date: new Date(item[0] * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: item[1]
  }));
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
  const response = await geckoTerminalApi.get<any>(`/networks/${network}/tokens/${address}`);
  const data = handleResponse(response);
  const tokenData = data.data.attributes;
  
  return {
    name: tokenData.name,
    symbol: tokenData.symbol,
    current_price: tokenData.price_usd,
    market_cap: tokenData.market_cap_usd,
    total_volume: tokenData.volume_usd,
    high_24h: tokenData.high_24h,
    low_24h: tokenData.low_24h,
    price_change_percentage_24h: tokenData.price_change_percentage_24h
  };
}