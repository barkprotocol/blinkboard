// Define the Blink type
export interface Blink {
    id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    likes: number;
    cnftUrl: string;
    solPrice: number;
    creator: string;
    creatorAvatar: string;
    edition: number;
    totalEditions: number;
    attributes: {
      rarity: string;
      gangAffiliation?: string;
      personality?: string;
      skill?: string;
      temperament?: string;
      role?: string;
      intelligence?: string;
      specialAbility: string;
      socialMedia: string;
    };
    backstory: string;
    level: number;
    experience: number;
  }
  
  // Array of Blink characters
  export const blinks: Blink[] = [
    {
      id: "1",
      title: "BARK",
      description: "The fearless leader of the BARK membership, symbolizing loyalty and courage. BARK is a true protector of the community.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/bark.jpeg",
      createdAt: "2024-01-15T12:00:00Z",
      likes: 1250,
      cnftUrl: "https://magiceden.io/item-details/BARK",
      solPrice: 2.5,
      creator: "BARKTeam",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=BARKTeam",
      edition: 1,
      totalEditions: 100,
      attributes: {
        rarity: "Legendary",
        gangAffiliation: "BARK Club",
        personality: "Loyal",
        specialAbility: "Inspire Loyalty",
        socialMedia: "https://twitter.com/BARK"
      },
      backstory: "BARK emerged from the shadows of the city, uniting the pack with bravery and vision, fighting for the rights of the community.",
      level: 1,
      experience: 0
    },
    {
      id: "2",
      title: "Bullet",
      description: "Quick and sharp, Bullet embodies speed and precision. A key member of the crew known for taking action.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/bullet.jpeg",
      createdAt: "2024-01-20T15:30:00Z",
      likes: 980,
      cnftUrl: "https://magiceden.io/item-details/Bullet",
      solPrice: 1.8,
      creator: "StreetArtist",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=StreetArtist",
      edition: 1,
      totalEditions: 50,
      attributes: {
        rarity: "Epic",
        skill: "Marksmanship",
        temperament: "Fearless",
        specialAbility: "Rapid Fire",
        socialMedia: "https://twitter.com/Bullet"
      },
      backstory: "Once a lone wolf, Bullet joined the BARK crew to protect his newfound family, armed with unmatched reflexes and instincts.",
      level: 1,
      experience: 0
    },
    {
      id: "3",
      title: "Ace",
      description: "The strategist of the group, Ace is known for making the best decisions in critical situations.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/ace.jpeg",
      createdAt: "2024-01-25T09:45:00Z",
      likes: 750,
      cnftUrl: "https://magiceden.io/item-details/Ace",
      solPrice: 1.2,
      creator: "Tactician",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Tactician",
      edition: 2,
      totalEditions: 200,
      attributes: {
        rarity: "Rare",
        role: "Strategist",
        intelligence: "High",
        specialAbility: "Master Planner",
        socialMedia: "https://twitter.com/Ace"
      },
      backstory: "Ace's analytical mind has saved the crew more times than anyone can count, always three steps ahead of danger.",
      level: 1,
      experience: 0
    },
    {
      id: "4",
      title: "Trixie",
      description: "The charm and wit of the crew, Trixie uses her charisma to gather intel and diffuse tense situations.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/trixie.jpeg",
      createdAt: "2024-02-01T11:20:00Z",
      likes: 650,
      cnftUrl: "https://magiceden.io/item-details/Trixie",
      solPrice: 1.5,
      creator: "CharmingArtist",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=CharmingArtist",
      edition: 1,
      totalEditions: 75,
      attributes: {
        rarity: "Rare",
        skill: "Charm",
        temperament: "Cunning",
        specialAbility: "Charm Offensive",
        socialMedia: "https://twitter.com/Trixie"
      },
      backstory: "Trixie's quick thinking and charisma have often saved the crew from tricky situations, making her a vital asset.",
      level: 1,
      experience: 0
    },
    {
      id: "5",
      title: "Max",
      description: "The muscle of the crew, Max is known for his strength and loyalty to the pack.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/max.jpeg",
      createdAt: "2024-02-10T14:10:00Z",
      likes: 800,
      cnftUrl: "https://magiceden.io/item-details/Max",
      solPrice: 2.0,
      creator: "StrengthArtist",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=StrengthArtist",
      edition: 1,
      totalEditions: 60,
      attributes: {
        rarity: "Epic",
        skill: "Strength",
        temperament: "Brave",
        specialAbility: "Intimidation",
        socialMedia: "https://twitter.com/Max"
      },
      backstory: "Max's unwavering loyalty and strength have earned him a place of respect in the BARK crew, always ready to defend his friends.",
      level: 1,
      experience: 0
    },
    {
      id: "6",
      title: "Bruno",
      description: "The tech-savvy member of the crew, Bruno is the go-to for gadgets and intel.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/bruno.jpeg",
      createdAt: "2024-02-15T17:00:00Z",
      likes: 720,
      cnftUrl: "https://magiceden.io/item-details/Bruno",
      solPrice: 1.7,
      creator: "TechArtist",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=TechArtist",
      edition: 1,
      totalEditions: 90,
      attributes: {
        rarity: "Rare",
        skill: "Tech Wizardry",
        temperament: "Inventive",
        specialAbility: "Gadgeteer",
        socialMedia: "https://twitter.com/Bruno"
      },
      backstory: "Bruno's love for technology and innovation makes him the brain behind many successful missions, always ready with the latest gadgets.",
      level: 1,
      experience: 0
    },
    {
      id: "7",
      title: "Dash",
      description: "The swift scout of the crew, Dash excels in reconnaissance and gathering crucial information.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/dash.jpeg",
      createdAt: "2024-02-20T19:30:00Z",
      likes: 580,
      cnftUrl: "https://magiceden.io/item-details/Dash",
      solPrice: 1.0,
      creator: "ScoutArtist",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=ScoutArtist",
      edition: 1,
      totalEditions: 80,
      attributes: {
        rarity: "Epic",
        skill: "Speed",
        temperament: "Alert",
        specialAbility: "Eagle Eye",
        socialMedia: "https://twitter.com/Dash"
      },
      backstory: "Dash's keen instincts and speed make him an invaluable scout, always returning with vital information for the crew.",
      level: 1,
      experience: 0
    },
    {
      id: "8",
      title: "Sparky",
      description: "The energetic one in the crew, Sparky is known for his positivity and creativity.",
      image: "https://ucarecdn.com/0e15b9d9-1166-495a-8343-227ad749f004/sparky.jpeg",
      createdAt: "2024-02-25T16:40:00Z",
      likes: 950,
      cnftUrl: "https://magiceden.io/item-details/Sparky",
      solPrice: 1.3,
      creator: "CreativeArtist",
      creatorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=CreativeArtist",
      edition: 1,
      totalEditions: 120,
      attributes: {
        rarity: "Rare",
        skill: "Creativity",
        temperament: "Energetic",
        specialAbility: "Inspiration",
        socialMedia: "https://twitter.com/Sparky"
      },
      backstory: "Sparky's vibrant personality and creativity inspire the crew to think outside the box, often leading to innovative solutions.",
      level: 1,
      experience: 0
    },
  ];
  
  // Export the Blinks array for use in other parts of the application
  export default blinks;
  