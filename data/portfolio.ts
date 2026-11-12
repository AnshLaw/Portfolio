export const profile = {
  name: "Ansh Raj Suryavanshi",
  title: "Software Engineer / AI Engineer",
  location: "Grand Blanc, MI",
  graduationDate: "September 2025",
  aboutShort: "Software Engineer at General Motors. Building applied AI, real-time systems, and products people use.",
  aboutLong:
    "Software Engineer at General Motors, deploying computer vision across manufacturing operations. Previously an AI/ML Engineer at Hyundai Mobis, building agentic RAG, edge AI, and in-cabin gesture recognition systems. I graduated from Kettering University with a B.S. in Computer Science, an AI concentration, an Applied Mathematics minor, and a 3.94 GPA. Outside work, I build and run five Discord Activities, including Taboo Party, and compete at hackathons, including wins at Hack Dearborn in 2023 and 2025.",
  email: "anshraj65@gmail.com",
  resumeUrl: "/Ansh_Raj_Suryavanshi_Software_Engineer_Resume.pdf",
  avatarUrl: "/ansh.jpg",
}

export const socials = [
  { name: "GitHub", url: "https://github.com/AnshLaw", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/anshsuryavanshi", icon: "Linkedin" },
  { name: "Twitter", url: "https://twitter.com/ansh_law", icon: "Twitter" },
  { name: "Email", url: "mailto:anshraj65@gmail.com", icon: "Mail" },
]

export const skills = [
  { category: "Programming Languages", items: ["C", "C++", "Python", "Java", "SQL", "TypeScript", "JavaScript", "R", "MATLAB"] },
  { category: "Machine Learning & AI", items: ["Machine Learning", "Computer Vision", "LLMs", "Agentic AI", "RAG", "Model Fine-Tuning", "LLM Distillation", "PyTorch", "TensorFlow", "Scikit-Learn", "Agent Orchestration", "Multimodal AI", "AI-Assisted Development"] },
  { category: "Systems & Backend", items: ["Flask", "REST APIs", "CI/CD", "Jenkins", "Git", "GitHub", "Distributed Systems", "Edge AI", "Agile", "SDLC", "Jira"] },
  { category: "Data & Databases", items: ["PostgreSQL", "MongoDB", "ChromaDB", "FAISS", "Supabase", "Pandas", "NumPy"] },
  { category: "Cloud & Platforms", items: ["AWS (S3, Lambda, Amplify)", "Google Cloud (GCP)", "Docker", "Oracle", "Google Firebase"] },
  { category: "Tools & Frameworks", items: ["React", "Next.js", "Socket.IO", "LangChain", "LangGraph", "Agno", "OpenCV", "OpenGL", "Vulkan", "Streamlit"] },
]

export type Project = {
  slug: string; title: string; summary: string; problem: string; solution: string;
  impact: string; tech: string[]; highlights: string[]; repoUrl: string | null;
  liveUrl: string | null; images: { src: string; alt: string }[]; tags: string[];
  links?: { label: string; url: string }[]; period?: string; sourceLabel?: string;
  liveLabel?: string;
}

export const projects: Project[] = [
{
  "slug": "taboo-party",
  "title": "Taboo Party",
  "summary": "A real-time team word game in the browser and as an official Discord Activity. 71,000+ site visits and 4,700+ games tracked since Oct 2026.",
  "problem": "Playing a word game remotely should feel as immediate and social as being in the same room.",
  "solution": "Built and deployed a multiplayer game with Next.js, React, TypeScript, and Socket.IO, integrated as an official Discord Activity. Players join rooms, form teams, and play timed rounds together.",
  "impact": "71,000+ site visits, plus 4,700+ games and 370+ players tracked since Oct 2026. Installed in 16 Discord servers, with a 100+ member community server.",
  "tech": [
    "Next.js",
    "TypeScript",
    "React",
    "Socket.IO",
    "Express",
    "Supabase",
    "Stripe",
    "Discord Activities"
  ],
  "highlights": [
    "71,000+ site visits",
    "4,700+ games tracked since Oct 2026",
    "Discord in-app purchases and Stripe billing",
    "Self-serve ad marketplace with image moderation",
    "Official Discord Activity",
    "100+ community members"
  ],
  "repoUrl": null,
  "liveUrl": "https://tabooparty.online",
  "images": [
    {
      "src": "/projects/taboo-party.jpg",
      "alt": "Taboo Party cover art with word cards and team scores"
    }
  ],
  "tags": [
    "web",
    "real-time",
    "games",
    "discord"
  ],
  "period": "Dec 2025 - Present",
  "sourceLabel": "Private source",
  "links": [
    {
      "label": "Play on Discord",
      "url": "https://discord.com/discovery/applications/1468756639938252891"
    },
    {
      "label": "Join the community",
      "url": "https://discord.com/invite/hemVkeHYmM"
    }
  ]
},
{
  "slug": "givvy",
  "title": "Givvy",
  "summary": "AES-encrypted NFC e-ink gift cards, with web and point-of-sale apps. A Hack Dearborn 2025 winner.",
  "problem": "Physical gift cards need a secure digital experience for both the person receiving them and the merchant accepting them.",
  "solution": "Built an AES-encrypted NFC e-ink gift card platform using TypeScript and Supabase, with companion web and point-of-sale applications.",
  "impact": "Won at Hack Dearborn 2025 among 240+ participants in Amazon's Financial Firewall track.",
  "tech": [
    "TypeScript",
    "Supabase",
    "AES Encryption",
    "NFC",
    "E-ink"
  ],
  "highlights": [
    "Hack Dearborn 2025 winner",
    "240+ participants",
    "Encrypted NFC gift cards",
    "Web and POS applications"
  ],
  "repoUrl": "https://github.com/AnshLaw/Givvy",
  "liveUrl": null,
  "images": [
    {
      "src": "/projects/givvy.jpg",
      "alt": "Givvy encrypted NFC gift card concept illustration"
    }
  ],
  "tags": [
    "web",
    "security",
    "hackathon"
  ],
  "period": "Oct 2025"
},
  {
    slug: "llm-reasoning-system",
    title: "In-Cabin AI Comfort System",
    period: "Apr 2025 - Present",
    summary:
      "Scalable local LLM-based reasoning system for real-time in-cabin comfort prediction and entertainment suggestions using multi-modal sensor data.",
    problem:
      "Traditional automotive systems lacked intelligent, context-aware recommendations for passenger comfort and entertainment.",
    solution:
      "Designed and integrated agentic Retrieval-Augmented Generation (RAG) techniques to enable on-device inference and generate actionable, context-aware recommendations using Python and Ollama.",
    impact: "Deployed on Cruden Simulator with context-aware memory and vector databases for scalable backend performance",
    tech: ["Python", "Ollama", "RAG", "Vector Databases", "Multi-modal Sensors", "Agno", "LangChain", "Hugging Face"],
    highlights: [
      "Real-time comfort prediction using multi-modal sensor data",
      "Agentic RAG for on-device inference",
      "Scalable backend with context-aware memory",
      "Deployed on Cruden Simulator",
    ],
    repoUrl: null,
    liveUrl: null,
    images: [
      {"src": "/projects/llm-reasoning-system.jpg", "alt": "In-cabin AI: multimodal sensors and local reasoning concept"},
    ],
    tags: ["ai", "automotive", "ml", "llm"],
  },
  {
    slug: "road-entertainment-system",
    title: "Road Entertainment System - Hack Dearborn Winner",
    summary: "ML-powered in-cabin recommendation system with 89% accuracy, winner of Hack Dearborn 2023 Automotive Track & ZF Challenge.",
    problem:
      "In-car entertainment systems lacked personalized, intelligent recommendations based on trip context and user preferences.",
    solution:
      "Built ML-powered system using trip ETA, age detection, and user genres to suggest media, integrated with Google Maps API and hand gesture controls.",
    impact: "89% recommendation accuracy with gesture controls for collaboration tools and volume adjustments",
    tech: ["Machine Learning", "Google Maps API", "Gesture Recognition", "Python"],
    highlights: [
      "89% recommendation accuracy",
      "Winner of Hack Dearborn 2023",
      "Integrated with Google Maps API",
      "Hand gesture controls for collaboration",
    ],
    repoUrl: "https://github.com/AnshLaw/RoadEntertainment",
    liveUrl: null,
    images: [
      {"src": "/projects/road-entertainment-system.jpg", "alt": "Road Entertainment: route-aware media recommendations concept"},
    ],
    tags: ["ml", "automotive", "hackathon"],
    period: "Oct 2023",
  },
  {
    slug: "rec-it-app",
    title: "REC-IT Recreation Center App",
    period: "Jul 2025 - Sep 2025",
    summary: "Full-stack web app for Kettering University's Rec Center with in-app check-in, equipment checkouts, and events scheduling.",
    problem:
      "Manual Google Sheets workflows for recreation center management were inefficient and error-prone.",
    solution:
      "Built REC-IT using TypeScript/React and Supabase/Firebase, replacing manual workflows with automated digital solutions.",
    impact: "Streamlined recreation center operations with digital check-in and equipment management",
    tech: ["TypeScript", "React", "Supabase", "Firebase"],
    highlights: [
      "In-app check-in system",
      "Swipe-card equipment checkouts",
      "Events scheduling functionality",
      "Replaced manual Google Sheets workflows",
    ],
    repoUrl: "https://github.com/AnshLaw/REC-IT",
    liveUrl: "https://kurecit.netlify.app/signin",
    images: [
      {"src": "/projects/rec-it-app.jpg", "alt": "REC-IT recreation center application sign-in"},
    ],
    tags: ["web", "full-stack", "productivity"],
  },
  {
    slug: "transcripto-app",
    title: "Transcripto App",
    period: "Aug 2025 - Sep 2025",
    summary: "Cloud-based React application for AI-powered transcriptions and automatic study resource generation.",
    problem:
      "Students lacked efficient tools to transcribe audio/video content and generate study materials automatically.",
    solution:
      "Developed Transcripto with Firebase authentication and AWS S3/Amplify integration for file uploads, AI transcriptions, and automatic creation of summaries, quizzes, and flashcards.",
    impact: "Enables users to upload audio/video files and generate comprehensive study resources automatically",
    tech: ["React", "Firebase", "AWS S3", "AWS Amplify", "AI Transcription"],
    highlights: [
      "AI-powered transcriptions",
      "Automatic study resource generation",
      "Firebase authentication",
      "AWS S3/Amplify integration",
    ],
    repoUrl: null,
    liveUrl: "https://transcripto.live",
    liveLabel: "Website (may be unavailable)",
    sourceLabel: "Private source",
    images: [
      {"src": "/projects/transcripto-app.jpg", "alt": "Transcripto: audio to study resources concept"},
    ],
    tags: ["web", "ai", "education"],
  },
  {
    slug: "gigs-for-pi",
    title: "Gigs for Pi - Web3 Freelancing Platform",
    period: "Jun 2024 - Dec 2024",
    summary: "Web3 freelancing platform powered by Pi cryptocurrency with 20,000+ likes and 4.78/5 star rating.",
    problem:
      "Traditional freelancing platforms lacked decentralized, secure payment systems using cryptocurrency.",
    solution:
      "Developed Web3 platform using TypeScript and Supabase, enabling secure decentralized transactions where clients post gigs and freelancers submit bids.",
    impact: "20,000+ likes, 4.78/5 star rating, 37,000+ rating reviews, featured on official Pi Network GitHub",
    tech: ["TypeScript", "Supabase", "Web3", "Pi Network"],
    highlights: [
      "20,000+ likes on platform",
      "4.78/5 star rating",
      "37,000+ rating reviews",
      "Featured on Pi Network GitHub",
      "Secure decentralized transactions",
    ],
    repoUrl: null,
    liveUrl: "https://gigsforpilive.netlify.app",
    images: [
      {"src": "/projects/gigs-for-pi.jpg", "alt": "Gigs for Pi freelancing platform homepage"},
    ],
    tags: ["web3", "blockchain", "freelancing"],
  },
  {
    slug: "songchat",
    title: "SongChat - Music-Based Social Connection Platform",
    period: "Apr 2025 - May 2025",
    summary: "Real-time chat platform that connects music lovers listening to the same song, creating ephemeral conversations tied to shared musical moments.",
    problem:
      "Music streaming platforms lack social features that connect listeners in real-time based on what they're currently playing, missing opportunities for serendipitous connections.",
    solution:
      "Built SongChat using React, Socket.io, and Spotify API integration to create temporary chat rooms that form when two or more users are listening to the same song simultaneously.",
    impact: "Created meaningful connections between 500+ users through shared musical experiences, with average chat sessions lasting 4.2 minutes during song playback",
    tech: ["React", "Node.js", "Socket.io", "Spotify Web API", "Express", "MongoDB", "WebRTC"],
    highlights: [
      "Real-time song synchronization using Spotify API",
      "Ephemeral chat rooms that dissolve when songs change",
      "500+ active users with 4.2 minute average chat duration",
      "Privacy-focused design with anonymous connections",
      "Cross-platform compatibility (web/mobile)",
    ],
    repoUrl: null,
    liveUrl: "https://songchat.online",
    images: [
      {"src": "/projects/songchat.jpg", "alt": "SongChat music-based social platform homepage"},
    ],
    tags: ["web", "social", "music", "real-time"],
  },
  {
    slug: "thoughtmatch",
    title: "ThoughtMatch - Party Word Game",
    period: "Oct 2026 - Present",
    summary: "An online party word game for 3-12 players in the browser and as a Discord Activity: think the same word as your friends before the Dener stops you.",
    problem: "Guessing games like Contact fall apart online: secret words leak, timing windows feel unfair, and one dropped connection ends the round.",
    solution: "Built a TypeScript monorepo with a pure game engine, a Socket.IO server, and a React client. The server owns all state and sends each player only what they are allowed to see.",
    impact: "Live on the web and in Discord, with paid word packs through Discord SKUs and Stripe.",
    tech: ["TypeScript", "React", "Vite", "Socket.IO", "Node.js", "zod", "Stripe", "Discord Activities"],
    highlights: [
      "Server-authoritative engine with per-player views that hide secret words",
      "Room state snapshotted to disk and restored across restarts",
      "Per-IP and per-socket rate limits",
      "Paid word packs through Discord SKUs and Stripe",
    ],
    repoUrl: null,
    liveUrl: "https://thoughtmatch.online",
    sourceLabel: "Private source",
    images: [{ src: "/projects/thoughtmatch.jpg", alt: "ThoughtMatch cover art with a game table and clue cards" }],
    tags: ["games", "real-time", "discord", "web"],
  },
  {
    slug: "guess-the-district",
    title: "Guess the District (ZILA?)",
    period: "Oct 2026 - Present",
    summary: "A bilingual English and Hindi geography game: read sourced clues about one of India's 784 districts, then name it by search or on the map.",
    problem: "Geography quizzes are easy to cheat when the answer ships to the browser, and a daily puzzle is spoiled if anyone can predict it.",
    solution: "Built a static Next.js PWA with MapLibre and a Hono API on Node. The client never sees the answer or unrevealed clues; daily picks come from a keyed HMAC.",
    impact: "1,600+ games and 1,200+ players since Nov 2026, with a daily mystery, practice, and friend battles on the web, as a PWA, and in Discord.",
    tech: ["Next.js", "TypeScript", "MapLibre GL", "Hono", "Redis", "PostgreSQL", "Supabase", "Playwright"],
    highlights: [
      "784 districts with sourced clues in English and Hindi",
      "Atomic Redis compare-and-set per guess, results written in one Postgres transaction",
      "HMAC-keyed daily picks that can't be predicted from public code",
      "Content linter that blocks clues leaking the answer",
    ],
    repoUrl: null,
    liveUrl: "https://guessthedistrict.in",
    sourceLabel: "Private source",
    images: [{ src: "/projects/guess-the-district.jpg", alt: "Guess the District round with a clue card and a district map of India" }],
    tags: ["games", "discord", "web", "education"],
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe - Discord Activity",
    period: "Nov 2026 - Present",
    summary: "Tic-tac-toe inside Discord voice calls: 1v1 games side by side, spectating, knockout tournaments, and a computer opponent on three levels.",
    problem: "A voice call full of people needs more than one board: friends want to play at the same time, watch, and settle it in a bracket.",
    solution: "Built a React and Socket.IO Activity with shared rules in one package, rooms scoped to each Discord instance, and a minimax opponent.",
    impact: "1,000+ games across 23 Discord servers in its first week.",
    tech: ["TypeScript", "React", "Vite", "Socket.IO", "zod", "Discord Embedded App SDK"],
    highlights: [
      "Minimax AI on Easy, Medium, and Hard",
      "Knockout tournament brackets and best-of series",
      "Rooms scoped per Discord instance with rate and IP limits",
      "Health-checked deploys with automatic rollback",
    ],
    repoUrl: null,
    liveUrl: null,
    sourceLabel: "Private source",
    links: [{ label: "Add to Discord", url: "https://discord.com/oauth2/authorize?client_id=1270915316787970069" }],
    images: [{ src: "/projects/tic-tac-toe.jpg", alt: "Tic Tac Toe board with a winning diagonal" }],
    tags: ["games", "real-time", "discord"],
  },
  {
    slug: "cosmix",
    title: "Cosmix - Astrology Matching Activity",
    period: "Nov 2026 - Present",
    summary: "A Discord Activity hosted by Zodie the star: build a birth-chart profile, Blend with people in your voice channel, and run Room shows.",
    problem: "Astrology apps are solo experiences; the fun is comparing charts with friends, live, in the same call.",
    solution: "Built a deterministic astrology engine on astronomy-engine, a Fastify and Socket.IO server on Postgres, and LLM-written readings through a fallback chain of providers.",
    impact: "Launched in November 2026 as a free Discord Activity.",
    tech: ["TypeScript", "React", "Fastify", "Socket.IO", "PostgreSQL", "astronomy-engine", "LLMs"],
    highlights: [
      "LLM fallback chain (Groq, Cloudflare AI, Gemini, local Gemma) with a quota ledger",
      "Prompt anonymization and output leak scanning",
      "Field-level envelope encryption with key rotation",
      "Age gate, consent, and entitlements built in",
    ],
    repoUrl: null,
    liveUrl: null,
    sourceLabel: "Private source",
    links: [{ label: "Add to Discord", url: "https://discord.com/oauth2/authorize?client_id=1570242472401961101" }],
    images: [{ src: "/projects/cosmix.jpg", alt: "Cosmix cover art with Zodie the star and Blend bubbles" }],
    tags: ["games", "discord", "ai", "llm"],
  }
]

export const experience = [
  {
    company: "General Motors", role: "Software Engineer", start: "Mar 2026", end: "Present", location: "Flint, MI",
    bullets: [
      "Leading deployment of 72 AI cameras across 38 conveyors in the GM Flint plant, enabling real-time computer vision monitoring at scale.",
      "Developed an end-to-end automation pipeline for camera configuration, covering onboarding, pilot, and production, reducing setup time from 5-6 weeks to 2-3 days for TPMs across 7 GM plants.",
      "Maintained and updated technical documentation and tools for the camera onboarding process, ensuring accuracy across pipeline changes.",
    ], logo: null,
  },
  {
    company: "Hyundai Mobis",
    role: "AI/ML Engineer (Rotational Co-op, 12 months FTE)",
    start: "Oct 2022",
    end: "Jun 2025",
    location: "Plymouth, MI",
    bullets: [
      "Optimized a local LLM with agentic RAG for in-vehicle edge deployment, reducing inference latency by 35% and enabling a real-time voice-based driver alertness system, improving engagement by 20%.",
      "Developed an ML-based hand gesture recognition system for in-cabin controls; showcased at CES 2023 and planned for deployment across 5M+ vehicles by 2025.",
      "Built reusable backend libraries for math, vector, and matrix operations, eliminating 30% of redundant code; added OpenCV, OpenGL, and Vulkan-based frameworks and automated CI/CD pipelines, cutting manual setup by 40%.",
    ],
    logo: "/abstract-tech-logo.png",
  },
]

export type MilestoneKind = "work" | "study" | "project" | "win"
export type Milestone = {
  id: string; kind: MilestoneKind; label: string; title: string; org: string
  start: string; end: string; location?: string; summary?: string; bullets?: string[]; href?: string
}

/** Everything on the experience timeline, newest start first. */
export const milestones: Milestone[] = [
  {
    id: "tic-tac-toe", kind: "project", label: "Side project · Discord Activity", title: "Tic Tac Toe", org: "Discord", start: "Nov 2026", end: "Present",
    summary: "1v1 games, spectating, tournaments, and a minimax opponent inside Discord voice calls.", href: "/projects/tic-tac-toe/",
  },
  {
    id: "cosmix", kind: "project", label: "Side project · Discord Activity", title: "Cosmix", org: "Discord", start: "Nov 2026", end: "Present",
    summary: "Astrology matching for voice channels, with a deterministic chart engine and LLM-written readings.", href: "/projects/cosmix/",
  },
  {
    id: "guess-the-district", kind: "project", label: "Side project", title: "Guess the District", org: "guessthedistrict.in", start: "Oct 2026", end: "Present",
    summary: "Bilingual geography game over India's 784 districts, on the web and in Discord.", href: "/projects/guess-the-district/",
  },
  {
    id: "thoughtmatch", kind: "project", label: "Side project", title: "ThoughtMatch", org: "thoughtmatch.online", start: "Oct 2026", end: "Present",
    summary: "Party word game for 3-12 players with a server-authoritative engine, on the web and in Discord.", href: "/projects/thoughtmatch/",
  },
  {
    id: "gm", kind: "work", label: "Role", title: "Software Engineer", org: "General Motors", start: "Mar 2026", end: "Present", location: "Flint, MI",
    bullets: experience[0].bullets,
  },
  {
    id: "taboo", kind: "project", label: "Side project · Founder", title: "Taboo Party", org: "tabooparty.online", start: "Dec 2025", end: "Present",
    summary: "A real-time multiplayer word game in the browser and as an official Discord Activity. Next.js, TypeScript, and Socket.IO. 4,700+ games tracked since Oct 2026 and a 100+ member community server.",
    href: "/projects/taboo-party/",
  },
  {
    id: "givvy", kind: "win", label: "Hackathon win", title: "1st place, Hack Dearborn 4 with Givvy", org: "University of Michigan–Dearborn", start: "Oct 2025", end: "Oct 2025", location: "Dearborn, MI",
    summary: "24 hours, team of three with Andrew Ricard and Melvin Cloud. A battery-free NFC gift card with an e-ink display, AES-encrypted and tokenized, plus web and point-of-sale apps. Won the Amazon Financial Firewall (FinTech) track among 240+ participants.",
    href: "/projects/givvy/",
  },
  {
    id: "graduation", kind: "study", label: "Graduated", title: "B.S. Computer Science, GPA 3.94", org: "Kettering University", start: "Sep 2025", end: "Sep 2025", location: "Flint, MI",
    bullets: [
      "Concentration in AI, minor in Applied Mathematics.",
      "Dean’s List 2021–2025. Member of the UPE Computer Science and KME Mathematics honor societies.",
      "Facility Manager at the Recreation Center, VP of the International Club, and a Volleyball Club member.",
    ],
  },
  {
    id: "transcripto", kind: "project", label: "Side project", title: "Transcripto", org: "React · AWS · Firebase", start: "Aug 2025", end: "Sep 2025",
    summary: "Upload a lecture’s audio or video and get back a transcript plus study resources generated from it. React on AWS Amplify and S3, with Firebase.",
    href: "/projects/transcripto-app/",
  },
  {
    id: "michiganders-summer-2025", kind: "win", label: "Scholarship", title: "$5,000 Michiganders Scholarship", org: "Michigan Economic Development Corporation (MEDC)", start: "Summer 2025", end: "Summer 2025",
  },
  {
    id: "rec-it", kind: "project", label: "Side project", title: "REC-IT", org: "Kettering Recreation Center", start: "Jul 2025", end: "Sep 2025",
    summary: "A full-stack React and TypeScript app on Supabase and Firebase that replaced the Rec Center’s manual workflows — built for the place I was already managing shifts at.",
    href: "/projects/rec-it-app/",
  },
  {
    id: "thesis", kind: "study", label: "Undergraduate thesis", title: "LLM reasoning for in-cabin comfort", org: "Kettering University & Hyundai Mobis", start: "Apr 2025", end: "Present",
    summary: "A local LLM reasoning system using agentic RAG and multi-modal sensor data for low-latency, on-device comfort and entertainment recommendations, tested on a Cruden driving simulator.",
    href: "/projects/llm-reasoning-system/",
  },
  {
    id: "songchat", kind: "project", label: "Side project", title: "SongChat", org: "songchat.online", start: "Apr 2025", end: "May 2025",
    summary: "A chat room for everyone listening to the same song right now, gone when the song ends. React, Node, Socket.IO, and the Spotify Web API; 500+ users.",
    href: "/projects/songchat/",
  },
  {
    id: "michiganders-fall-2024", kind: "win", label: "Scholarship", title: "$5,000 Michiganders Scholarship", org: "Michigan Economic Development Corporation (MEDC)", start: "Fall 2024", end: "Fall 2024",
  },
  {
    id: "gigs-for-pi", kind: "project", label: "Side project", title: "Gigs for Pi", org: "Pi Network", start: "Jun 2024", end: "Dec 2024",
    summary: "A Web3 freelancing platform in TypeScript and Supabase. 20,000+ likes, a 4.78/5 rating across 37,000+ reviews, and a feature on the official Pi Network GitHub.",
    href: "/projects/gigs-for-pi/",
  },
  {
    id: "hack-dearborn-2023", kind: "win", label: "Hackathon win · first hackathon", title: "Automotive track + ZF challenge, Hack Dearborn", org: "Hack Dearborn: Disrupt Reality", start: "Oct 2023", end: "Oct 2023", location: "Dearborn, MI",
    summary: "My first hackathon: nearly 200 students, 24 hours. I built the age and hand-gesture detection behind an in-car media recommender that matched content to trip length with 89% accuracy. Took both the Automotive track and ZF’s problem statement.",
    href: "/projects/road-entertainment-system/",
  },
  {
    id: "ces", kind: "win", label: "Showcase", title: "Gesture controls on stage at CES 2023", org: "Hyundai Mobis", start: "Jan 2023", end: "Jan 2023", location: "Las Vegas, NV",
    summary: "The in-cabin hand-gesture recognition I worked on was demoed at CES 2023, with deployment planned across 5M+ vehicles.",
  },
  {
    id: "hyundai", kind: "work", label: "Role · rotational co-op", title: "AI/ML Engineer", org: "Hyundai Mobis", start: "Oct 2022", end: "Jun 2025", location: "Plymouth, MI",
    bullets: experience[1].bullets,
  },
  {
    id: "kettering", kind: "study", label: "Education", title: "Started Computer Science", org: "Kettering University", start: "Oct 2021", end: "Sep 2025", location: "Flint, MI",
    summary: "B.S. in Computer Science with a concentration in AI and a minor in Applied Mathematics.",
  },
]

export const awards = [
  { title: "Winner - Hack Dearborn 2025 (Amazon Financial Firewall Track)", issuer: "Hack Dearborn", date: "Oct 2025", link: "https://github.com/AnshLaw/Givvy" },
  {
    title: "Winner - Hack Dearborn 2023 (Automotive Track & ZF Challenge)",
    issuer: "Hack Dearborn",
    date: "Oct 2023",
    link: "https://hackdearborn.com",
  },
  {
    title: "Dean's List",
    issuer: "Kettering University",
    date: "2021-2025",
    link: null,
  },
  {
    title: "UPE Computer Science Honor Society",
    issuer: "Kettering University",
    date: "2021-2025",
    link: null,
  },
  {
    title: "KME Math Honor Society",
    issuer: "Kettering University",
    date: "2021-2025",
    link: null,
  },
  { title: "Michiganders Scholarship ($5,000, twice)", issuer: "Michigan Economic Development Corporation", date: "Fall 2024 & Summer 2025", link: null },
  {
    title: "Gigs for Pi - Featured on Pi Network GitHub",
    issuer: "Pi Network",
    date: "2024",
    link: "https://github.com/pi-apps/PiOS/blob/main/list.md",
  },
]

export const activities = [
  { icon: "Code", title: "Shipped four new Discord Activities", description: "ThoughtMatch, Guess the District, Tic Tac Toe, and Cosmix, on one self-hosted server with a live stats service.", date: "Nov 2026", type: "contribution" },
  { icon: "Briefcase", title: "Software Engineer at General Motors", description: "Deploying 72 AI cameras across 38 conveyors and accelerating camera onboarding across 7 plants.", date: "Mar 2026", type: "experience" },
  { icon: "Code", title: "Launched Taboo Party", description: "Real-time multiplayer in the browser and Discord. 4,700+ games tracked since Oct 2026.", date: "Dec 2025", type: "contribution" },
  { icon: "Trophy", title: "Won Hack Dearborn 2025 with Givvy", description: "AES-encrypted NFC e-ink gift cards with web and point-of-sale apps.", date: "Oct 2025", type: "achievement" },
  {
    icon: "Trophy",
    title: "Winner - Hack Dearborn 2023 (Automotive Track & ZF Challenge)",
    description: "Automotive Track Winner for developing an ML-powered in-cabin entertainment and recommendation system",
    date: "Oct 2023",
    type: "achievement",
  },
  {
    icon: "SiGithub",
    title: "Gigs for Pi - Featured on Pi Network GitHub",
    description: "Gigs for Pi platform achieved 20,000+ likes and was featured on the official Pi Network GitHub",
    date: "2024",
    type: "contribution",
  },
  {
    icon: "BookOpen",
    title: "Undergraduate Co-op Thesis - LLM based In-Cabin Comfort System",
    description: "Thesis work on LLM-based in-cabin comfort prediction and agentic RAG techniques in collaboration with Hyundai Mobis",
    date: "Apr 2025",
    type: "writing",
  },
  {
    icon: "Briefcase",
    title: "Completed AI/ML Engineering Co-op at Hyundai Mobis",
    description: "Worked on LLMs, computer vision, and deployable automotive AI systems",
    date: "Jun 2025",
    type: "experience",
  },
]

export const education = [
  {
    school: "Kettering University",
    degree: "Bachelor of Science in Computer Science, Concentration in AI, Minor in Applied Mathematics",
    period: "October 2021 - September 2025",
    gpa: "3.94",
    details:
      "Relevant Coursework: AI, Machine Learning, Operating Systems, Cloud Computing, Data Structures & Algorithms, Data Science, Theory of Computation, Object Oriented Programming, Statistics and Data Analysis, Information Retrieval & Data Mining, UI/UX, Cryptography, Digital Systems, Microcomputers, Cybersecurity • Activities: Facility Manager at Rec Center, Volleyball Club, VP at International Club • Honors: Dean's List 2021-2025, UPE CS & KME Math Honor Societies, Hack Dearborn 2023/2025 Winner, Michiganders Scholarship from MEDC ($5,000 in Fall 2024 and Summer 2025)",
  },
]
