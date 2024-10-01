import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'sparky@example.com' },
    update: {},
    create: {
      email: 'sparky@example.com',
      username: 'sparky',
      passwordHash: await hash('password123', 10),
      role: 'USER',
      profile: {
        create: {
          bio: 'Solana blockchain enthusiast and BARK lover',
          avatarUrl: 'https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg',
        },
      },
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'ace@example.com' },
    update: {},
    create: {
      email: 'ace@example.com',
      username: 'ace',
      passwordHash: await hash('password456', 10),
      role: 'USER',
      profile: {
        create: {
          bio: 'DeFi developer and BARK contributor',
          avatarUrl: 'https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg',
        },
      },
    },
  })

  // Create tokens
  const barkToken = await prisma.token.create({
    data: {
      symbol: 'BARK',
      name: 'BARK',
      balance: 15000,
      userId: user1.id,
    },
  })

  const ethToken = await prisma.token.create({
    data: {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 5,
      userId: user1.id,
    },
  })

  // Create NFTs
  await prisma.nFT.createMany({
    data: [
      {
        name: 'BARK #001',
        description: 'A rare BARK NFT',
        imageUrl: 'https://ucarecdn.com/29577eb7-f1b2-4f37-925c-07362cf4a890/barkblink.png',
        userId: user1.id,
      },
      {
        name: 'BARK #002',
        description: 'An uncommon BARK NFT',
        imageUrl: 'https://ucarecdn.com/e5a389e1-3b29-4194-8851-38d74357e420/duke.jpeg',
        userId: user2.id,
      },
    ],
  })

  // Create transactions
  await prisma.transaction.createMany({
    data: [
      {
        type: 'TRANSFER',
        amount: 100,
        tokenId: barkToken.id,
        userId: user1.id,
        fromAddress: user1.id,
        toAddress: user2.id,
        status: 'COMPLETED',
      },
      {
        type: 'SWAP',
        amount: 1,
        tokenId: ethToken.id,
        userId: user2.id,
        fromAddress: user2.id,
        toAddress: user1.id,
        status: 'PENDING',
      },
    ],
  })

  // Create a gift
  await prisma.gift.create({
    data: {
      amount: 50000,
      tokenSymbol: 'BARK',
      fromUserId: user1.id,
      toAddress: user2.id,
      message: 'Happy birthday!',
    },
  })

  // Create a payment
  await prisma.payment.create({
    data: {
      amount: 25,
      tokenSymbol: 'BARK',
      fromUserId: user2.id,
      toAddress: user1.id,
      status: 'COMPLETED',
    },
  })

  // Create a swap
  await prisma.swap.create({
    data: {
      fromAmount: 100,
      fromToken: 'BARK',
      toAmount: 0.1,
      toToken: 'ETH',
      userId: user1.id,
      status: 'COMPLETED',
    },
  })

  // Create a stake
  await prisma.stake.create({
    data: {
      amount: 500,
      tokenSymbol: 'BARK',
      userId: user1.id,
      apy: 5.5,
      status: 'ACTIVE',
    },
  })

  // Create a governance proposal
  const proposal = await prisma.proposal.create({
    data: {
      title: 'Increase BARK staking rewards',
      description: 'Proposal to increase the APY for BARK staking from 5% to 7%.',
      creatorId: user2.id,
      status: 'ACTIVE',
    },
  })

  // Create votes for the proposal
  await prisma.vote.createMany({
    data: [
      {
        userId: user1.id,
        proposalId: proposal.id,
        voteType: 'FOR',
      },
      {
        userId: user2.id,
        proposalId: proposal.id,
        voteType: 'AGAINST',
      },
    ],
  })

  // Create an order
  await prisma.order.create({
    data: {
      userId: user1.id,
      totalAmount: 75,
      status: 'PROCESSING',
      items: {
        create: [
          {
            productName: 'BARK T-Shirt',
            quantity: 2,
            price: 25,
          },
          {
            productName: 'BARK Mug',
            quantity: 1,
            price: 25,
          },
        ],
      },
    },
  })

  console.log('Seed data inserted successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })