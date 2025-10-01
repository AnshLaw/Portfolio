export const profile = {
  name: "Ansh Raj Suryavanshi",
  title: "Computer Science Graduate & AI Engineering Intern",
  location: "Flint, MI",
  graduationDate: "September 2025",
  aboutShort: "AI/ML Engineer specializing in LLM applications, computer vision, and full-stack development.",
  aboutLong:
    "Passionate Computer Science student at Kettering University with expertise in AI/ML, computer vision, and full-stack development. Currently interning at Hyundai Mobis working on LLM-based reasoning systems and ML-powered automotive applications. Winner of Hack Dearborn 2023 and experienced in developing scalable web applications and AI-powered solutions.",
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
  {
    category: "Programming Languages",
    items: ["C", "C++", "Python", "Java", "SQL", "TypeScript", "JavaScript", "React", "R", "MATLAB"],
  },
  {
    category: "AI/ML & Data Science",
    items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "Numpy", "OpenCV", "Fine-tune LLMs", "LLM Distillation", "Generative AI", "Agno", "LangChain", "LangGraph"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "GCP", "Supabase", "MongoDB", "Jenkins", "Git"],
  },
  {
    category: "Frameworks & Tools",
    items: ["Flask", "Streamlit", "Expo Go", "Weka", "OpenGL", "Vulkan", "Google Gemini API", "ChatGPT API", "DeepSeek API"],
  },
]

export const projects = [
  {
    slug: "llm-reasoning-system",
    title: "Undergraduate Co-op Thesis - LLM based In-Cabin Comfort System",
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
      { src: "/machine-learning-dashboard-with-charts.jpg", alt: "LLM System Dashboard" },
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
      { src: "/modern-chat-interface-dark-theme.jpg", alt: "Entertainment System Interface" },
    ],
    tags: ["ml", "automotive", "hackathon"],
  },
  {
    slug: "rec-it-app",
    title: "REC-IT Recreation Center App",
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
      { src: "/react-components-showcase-grid.jpg", alt: "REC-IT App Interface" },
    ],
    tags: ["web", "full-stack", "productivity"],
  },
  {
    slug: "transcripto-app",
    title: "Transcripto App",
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
    repoUrl: "https://github.com/AnshLaw",
    liveUrl: "https://transcripto.live",
    images: [
      { src: "/component-library-storybook-interface.jpg", alt: "Transcripto Interface" },
    ],
    tags: ["web", "ai", "education"],
  },
  {
    slug: "gigs-for-pi",
    title: "Gigs for Pi - Web3 Freelancing Platform",
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
    repoUrl: "https://github.com/AnshLaw",
    liveUrl: "https://gigsforpi.live",
    images: [
      { src: "/real-time-messaging-dashboard.jpg", alt: "Gigs for Pi Dashboard" },
    ],
    tags: ["web3", "blockchain", "freelancing"],
  },
  {
    slug: "songchat",
    title: "SongChat - Music-Based Social Connection Platform",
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
    liveUrl: "https://songchat.live",
    images: [
      { src: "/real-time-messaging-dashboard.jpg", alt: "SongChat Interface" },
    ],
    tags: ["web", "social", "music", "real-time"],
  }
]

export const experience = [
  {
    company: "Hyundai Mobis",
    role: "Co-op / AI Engineering Intern",
    start: "Oct 2022",
    end: "Jun 2025",
    location: "Plymouth, MI",
    bullets: [
      "Optimized a local LLM with agentic RAG for real-time drowsiness detection warning system, integrated into the Cruden simulator to enable reasoning-based alerts and efficient edge deployment using Agno, LangChain, Ollama, and Hugging Face",
      "Developed an ML-based Hand Gesture Detection Model for Hyundai's in-cabin system that controls fan speed and cabin temperature, showcased at CES 2023 and set for deployment in 5M+ vehicles by 2025",
      "Developed company-wide reusable backend libraries for Math, Vector and Matrix operations, along with OpenCV, OpenGL, and Vulkan-based implementations",
      "Designed CI/CD automation workflow pipeline for streamlining builds and running simulation tests efficiently",
    ],
    logo: "/abstract-tech-logo.png",
  },
  {
    company: "Hack Dearborn 2023",
    role: "Competition Winner - Automotive Track & ZF Challenge",
    start: "Oct 2023",
    end: "Oct 2023",
    location: "Dearborn, MI",
    bullets: [
      "Built an ML-powered in-cabin recommendation system using trip ETA, age detection, and user genres to suggest media with 89% accuracy",
      "Integrated with Google Maps API and hand gesture controls for collaboration tools (whiteboard & online meeting apps) and volume adjustments",
      "Won both Automotive Track and ZF Challenge at Hack Dearborn 2023",
    ],
    logo: "/startup-logo.png",
  },
]

export const awards = [
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
  {
    title: "$10,000 MEDC Michigan Scholar Award",
    issuer: "Michigan Economic Development Corporation",
    date: "2023",
    link: null,
  },
  {
    title: "Gigs for Pi - Featured on Pi Network GitHub",
    issuer: "Pi Network",
    date: "2024",
    link: "https://github.com/pi-network",
  },
]

export const education = [
  {
    school: "Kettering University",
    degree: "Bachelor of Science in Computer Science, Concentration in AI, Minor in Applied Mathematics",
    period: "October 2021 - September 2025",
    details:
      "Relevant Coursework: AI, Machine Learning, Operating Systems, Cloud Computing, Data Structures & Algorithms, Data Science, Theory of Computation, Object Oriented Programming, Statistics and Data Analysis, Information Retrieval & Data Mining, UI/UX, Cryptography, Digital Systems, Microcomputers, Cybersecurity • Activities: Facility Manager at Rec Center, Volleyball Club, VP at International Club • Honors: Dean's List 2021-2025, UPE CS & KME Math Honor Societies, Hack Dearborn 2023 Winner, $10,000 MEDC Michigan Scholar Award",
  },
]

export const blog = [
  // Placeholder for future blog posts
]
