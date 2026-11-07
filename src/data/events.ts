import { EventItem } from "../types";

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-01",
    title: "Global AI & Next-Gen Web Summit 2026",
    category: "Technology",
    categoryKey: "tech",
    tag: "Spotlight",
    featured: true,
    date: "2026-12-10T09:00:00",
    displayDate: "Dec 10 - 12, 2026",
    time: "09:00 AM - 05:30 PM",
    venue: "Silicon Convention Center, Tech Park",
    city: "San Francisco / Hybrid",
    price: 149,
    isFree: false,
    totalCapacity: 350,
    bookedCount: 288,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Explore cutting-edge advancements in Autonomous AI Agents, Modern Web Frameworks, and Cloud Architectures with global visionaries.",
    description: "The Global AI & Next-Gen Web Summit brings together 2,500+ developers, tech leaders, and researchers. Dive deep into agentic workflows, real-time web engines, distributed systems, and modern interface design. Features live coding battles, executive roundtables, and VIP mentor mixers.",
    organizer: {
      name: "FutureTech Alliance",
      email: "summit@futuretechalliance.org",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Dr. Evelyn Vance", role: "VP of AI Research, DeepMatrix", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
      { name: "Marcus Thorne", role: "Principal Architect, NovaCloud", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Aria Patel", role: "Founder & Lead Dev, Veloce.io", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "09:00 AM", title: "Registration, Breakfast & Keynote Opening" },
      { time: "10:30 AM", title: "Building Autonomous Agentic Systems at Scale" },
      { time: "01:00 PM", title: "Gourmet Networking Lunch & Innovation Expo" },
      { time: "02:30 PM", title: "Hands-on Masterclass: Ultra-fast Modern Web Apps" },
      { time: "04:30 PM", title: "Fireside Chat: Ethics & The Future of Software" }
    ],
    perks: ["Full Summit Access & Workshops", "Official Certificate of Attendance", "Gourmet Lunch & Coffee", "Recorded Sessions Vault", "Exclusive VIP Swag Kit"]
  },
  {
    id: "evt-02",
    title: "EchoSound Indie & Electronic Festival",
    category: "Music",
    categoryKey: "music",
    tag: "Trending",
    featured: true,
    date: "2026-11-28T16:00:00",
    displayDate: "Nov 28 - 29, 2026",
    time: "04:00 PM - 11:30 PM",
    venue: "Sunset Amphitheatre, Waterfront Bay",
    city: "Austin, TX",
    price: 89,
    isFree: false,
    totalCapacity: 500,
    bookedCount: 442,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Two electrifying evenings of live indie rock, ambient synthesizers, and immersive holographic stage installations under open skies.",
    description: "EchoSound is the pinnacle gathering for music enthusiasts, combining international headliners with breakthrough independent producers. Experience 3 dynamic acoustic stages, bespoke visual projections, artisan food pop-ups, and an open-air listening grove.",
    organizer: {
      name: "SoundScape Productions",
      email: "hello@soundscapepresents.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Solaris Dream", role: "Headliner / Electronic Artist", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
      { name: "Luna & The Waves", role: "Indie Pop Collective", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "04:00 PM", title: "Gates Open & Ambient Lounge DJ Sets" },
      { time: "06:00 PM", title: "Sunset Acoustic Stage Performance" },
      { time: "08:15 PM", title: "Holographic Visuals & Indie Headliner" },
      { time: "10:30 PM", title: "Grand Finale Electronic Laser Show" }
    ],
    perks: ["Entry to all 3 live performance stages", "Commemorative festival wristband", "Access to food truck courtyard", "Interactive art installation tours"]
  },
  {
    id: "evt-03",
    title: "DesignCraft UX/UI & Product Innovation Forum",
    category: "Design",
    categoryKey: "design",
    tag: "Popular",
    featured: true,
    date: "2026-12-05T10:00:00",
    displayDate: "Dec 05, 2026",
    time: "10:00 AM - 04:30 PM",
    venue: "Design Guild Hall, Innovation District",
    city: "Seattle, WA / Online",
    price: 65,
    isFree: false,
    totalCapacity: 200,
    bookedCount: 165,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Elevate your craft in modern design systems, micro-interactions, spatial UI, and AI-accelerated product prototyping.",
    description: "DesignCraft is crafted for digital designers, design engineers, and product strategists. Learn practical workflows for complex scalable design tokens, accessibility auditing, motion design in code, and collaborative user research methodologies.",
    organizer: {
      name: "Pixel & Grid Society",
      email: "info@designcraftforum.org",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Elena Rostova", role: "Head of Design Systems, Monolith", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
      { name: "Tobias Kester", role: "Interaction Designer & Creative Technologist", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Keynote: Next-Gen Interfaces & Spatial Computing" },
      { time: "11:30 AM", title: "Workshop: Building Bulletproof Multi-Brand Design Tokens" },
      { time: "01:00 PM", title: "Networking Lunch & Portfolio Review Lounge" },
      { time: "02:30 PM", title: "Figma to Code: Bridging Dev & Design in 2026" },
      { time: "04:00 PM", title: "Interactive Design Jam & Awards" }
    ],
    perks: ["Figma UI Kit & Token Library Downloads", "Hands-on Workshop Access", "Catered Lunch & Coffee Bar", "Live Portfolio Critique by Experts"]
  },
  {
    id: "evt-04",
    title: "Founders & Venture Capital Growth Summit",
    category: "Business",
    categoryKey: "business",
    tag: "High Impact",
    featured: false,
    date: "2026-11-20T08:30:00",
    displayDate: "Nov 20, 2026",
    time: "08:30 AM - 06:00 PM",
    venue: "Metropolitan Financial Center, Grand Ballroom",
    city: "New York, NY",
    price: 199,
    isFree: false,
    totalCapacity: 300,
    bookedCount: 290,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Connect with Tier-1 angel investors, venture partners, and high-growth startup founders sharing battle-tested scale strategies.",
    description: "The Founders & Venture Capital Growth Summit is the ultimate deal-making and learning hub for entrepreneurs seeking Seed to Series B investment. Featuring 1-on-1 pitch sessions, unit economic breakdown workshops, and candid founder failure post-mortems.",
    organizer: {
      name: "Apex Ventures & Capital",
      email: "ventures@apexcap.co",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Victoria Sterling", role: "General Partner, Apex Ventures", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
      { name: "Kenji Sato", role: "3x Founder (Exited $240M), Angel Syndicate", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "08:30 AM", title: "Breakfast Mixer & VIP Check-In" },
      { time: "10:00 AM", title: "Navigating Seed to Series A in the New Market" },
      { time: "12:00 PM", title: "Curated 1-on-1 Pitch Tables with VCs" },
      { time: "02:30 PM", title: "Masterclass: Enterprise Go-To-Market Mechanics" },
      { time: "04:30 PM", title: "Cocktail Reception & Deal Room Access" }
    ],
    perks: ["Direct access to 40+ accredited investors", "Pitch deck review workbook", "Executive breakfast & networking cocktail hour", "Private deal room lounge access"]
  },
  {
    id: "evt-05",
    title: "Urban Endurance Marathon & City Run 2026",
    category: "Sports",
    categoryKey: "sports",
    tag: "Athletics",
    featured: false,
    date: "2026-12-15T06:30:00",
    displayDate: "Dec 15, 2026",
    time: "06:30 AM - 01:00 PM",
    venue: "Millennium Park Boulevard",
    city: "Chicago, IL",
    price: 45,
    isFree: false,
    totalCapacity: 1200,
    bookedCount: 980,
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Experience the city's scenic skyline course across 10K, Half-Marathon, and Full 42K certified race categories with live music cheering zones.",
    description: "Join over a thousand runners in the annual Urban Endurance Marathon. Certified Boston Qualifier course offering flat, fast roadways, professional chip-timing, energetic spectator hydration tunnels, and an electric post-race finish festival.",
    organizer: {
      name: "City Athletics Commission",
      email: "run@urbanendurance.org",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Coach Tariq Vance", role: "Olympic Marathon Coach", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "06:00 AM", title: "Bag Drop & Athlete Warmup" },
      { time: "06:30 AM", title: "Wave 1: Elite & Full Marathon Start" },
      { time: "07:15 AM", title: "Wave 2: Half Marathon & 10K Start" },
      { time: "10:30 AM", title: "Finish Line Festival & Medal Ceremony" }
    ],
    perks: ["Official dri-fit runner tee", "Finisher commemorative medal", "Electronic chip timing & live tracker link", "Hydration & nutrition recovery stations"]
  },
  {
    id: "evt-06",
    title: "TypeScript & Web Performance Deep Dive",
    category: "Workshops",
    categoryKey: "workshop",
    tag: "Hands-on",
    featured: false,
    date: "2026-11-22T13:00:00",
    displayDate: "Nov 22, 2026",
    time: "01:00 PM - 05:30 PM",
    venue: "DevSpace Tech Incubator, Lab 3",
    city: "Boston, MA / Remote",
    price: 0,
    isFree: true,
    totalCapacity: 250,
    bookedCount: 228,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Comprehensive hands-on workshop mastering advanced generic types, bundle tree-shaking, and micro-optimizations in high-traffic web apps.",
    description: "Take your TypeScript and web engineering skills to the senior level. We will dissect conditional type gymnastics, AST transforms, React/Vite memory profile debugging, Core Web Vitals optimizations, and reducing main-thread latency.",
    organizer: {
      name: "Modern Code Guild",
      email: "workshops@moderncode.dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Dmitri Volkov", role: "Staff Engineer & OSS Author", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "01:00 PM", title: "Mastering Advanced Generics & Mapped Types" },
      { time: "02:30 PM", title: "Profiling Memory Leaks & Layout Thrashing" },
      { time: "03:45 PM", title: "V8 Compiler Inlines & DOM Batch Optimization" },
      { time: "05:00 PM", title: "Live Code Review & Architecture Q&A" }
    ],
    perks: ["Free admission for registered developers", "Interactive GitHub starter repo & solutions", "Certificate of Workshop Completion", "Discord study group invite"]
  },
  {
    id: "evt-07",
    title: "Autonomous Robotics & Cybernetics Expo 2026",
    category: "Technology",
    categoryKey: "tech",
    tag: "Future Tech",
    featured: false,
    date: "2026-12-18T09:30:00",
    displayDate: "Dec 18 - 19, 2026",
    time: "09:30 AM - 05:00 PM",
    venue: "Exhibition Center Hall 4, Innovation Park",
    city: "San Jose, CA",
    price: 120,
    isFree: false,
    totalCapacity: 400,
    bookedCount: 310,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Experience live demonstrations of humanoid robots, quadruped couriers, swarm intelligence drones, and neural motor interfaces.",
    description: "The Cybernetics Expo is where cutting-edge hardware meets artificial intelligence. Witness 30+ interactive robot arenas, touch real-time haptic teleoperation controls, and hear engineering leads from pioneering autonomous labs reveal the roadmap for robotics.",
    organizer: {
      name: "RoboFrontiers Foundation",
      email: "contact@robofrontiers.org",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Dr. Hiroshi Tanaka", role: "Chief Roboticist, NeuralMotion Labs", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Sarah Chen", role: "Director of Autonomous Systems, AeroPulse", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "09:30 AM", title: "Expo Floor Opening & Live Quadruped Demo" },
      { time: "11:00 AM", title: "Keynote: Foundation Models for Physical World Action" },
      { time: "01:30 PM", title: "Autonomous Drone Obstacle Course Racing" },
      { time: "03:30 PM", title: "Humanoid Robot Dexterity Showdown" }
    ],
    perks: ["Full 2-day pass with arena front-row access", "Expo commemorative tech badge", "Access to interactive hardware test stations", "Exclusive robotics whitepaper digest"]
  },
  {
    id: "evt-08",
    title: "Neon Horizon Synthwave & Cyberpunk Night",
    category: "Music",
    categoryKey: "music",
    tag: "Nightlife",
    featured: false,
    date: "2026-12-12T20:00:00",
    displayDate: "Dec 12, 2026",
    time: "08:00 PM - 02:30 AM",
    venue: "The Cyber Club, Warehouse 9",
    city: "Brooklyn, NY",
    price: 40,
    isFree: false,
    totalCapacity: 350,
    bookedCount: 320,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A retro-futuristic audio-visual journey driven by retro analog synths, heavy basslines, and 360-degree holographic laser projection mapping.",
    description: "Immerse yourself into Neon Horizon: a cyberpunk synthwave odyssey featuring international electronic producers, vintage arcade machines on free-play, themed craft mocktails, and interactive audio-reactive light displays.",
    organizer: {
      name: "RetroWave Collective",
      email: "neon@retrowave.nyc",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Kavinsky Waves", role: "Synthwave Producer & DJ", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "08:00 PM", title: "Doors Open, Arcade Freeplay & Chillwave Warmup" },
      { time: "09:30 PM", title: "Mid-Tempo Cyberpunk Live Bass Set" },
      { time: "11:30 PM", title: "Headliner Neon Horizon Audiovisual Odyssey" },
      { time: "01:00 AM", title: "Late Night Darksynth After-Hours Session" }
    ],
    perks: ["Admission to 6-hour live audio-visual show", "Free arcade game access all night", "LED holographic wristband", "High-res festival poster download"]
  },
  {
    id: "evt-09",
    title: "E-Commerce Strategy & Global Brand Summit",
    category: "Business",
    categoryKey: "business",
    tag: "Commerce",
    featured: false,
    date: "2026-11-30T09:00:00",
    displayDate: "Nov 30, 2026",
    time: "09:00 AM - 05:00 PM",
    venue: "Grand Hyatt Business Center",
    city: "Miami, FL / Hybrid",
    price: 110,
    isFree: false,
    totalCapacity: 250,
    bookedCount: 198,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Discover the latest consumer retention funnels, headless commerce architectures, omnichannel logistics, and AI conversion optimization.",
    description: "Learn how top direct-to-consumer and multinational brands scale international customer acquisition. This 1-day summit breaks down real-world data case studies from 8-figure brand operators, conversion rate engineers, and supply chain innovators.",
    organizer: {
      name: "CommerceX Growth Group",
      email: "events@commercex.global",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Samantha Wright", role: "VP of Growth, Omnichannel Retail", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "09:00 AM", title: "Breakfast Networking & Keynote" },
      { time: "10:30 AM", title: "Headless Commerce Architecture & Checkout Speed" },
      { time: "01:00 PM", title: "Buffet Lunch & Partner Showcase" },
      { time: "02:30 PM", title: "AI-Powered Personalization & Email Retention" }
    ],
    perks: ["Executive event workbook & benchmark reports", "Full luncheon & coffee break catering", "Access to vendor discount perks", "Post-event video recordings"]
  },
  {
    id: "evt-10",
    title: "Mindfulness, Yoga & Sound Healing Retreat",
    category: "Sports",
    categoryKey: "sports",
    tag: "Wellness",
    featured: false,
    date: "2026-12-06T08:00:00",
    displayDate: "Dec 06, 2026",
    time: "08:00 AM - 02:00 PM",
    venue: "Zenith Botanical Gardens Pavilion",
    city: "Boulder, CO",
    price: 50,
    isFree: false,
    totalCapacity: 100,
    bookedCount: 88,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Recharge your mind and body with guided vinyasa flows, pranayama breathwork, sound bath bowls, and farm-to-table organic brunch.",
    description: "Step away from screens and urban noise into a tranquil half-day restorative sanctuary. Guided by experienced somatic practitioners, experience deep nervous system regulation, gentle mobility, tension release, and mindfulness techniques.",
    organizer: {
      name: "Prana Wellness Collective",
      email: "breathe@pranawellness.org",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Ananya Deshmukh", role: "Master Yoga & Breathwork Guide", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "08:00 AM", title: "Gentle Morning Warmup & Herbal Tea" },
      { time: "09:00 AM", title: "Vinyasa Flow for Mobility & Balance" },
      { time: "11:00 AM", title: "Breathwork & Tibetan Singing Bowl Sound Bath" },
      { time: "12:30 PM", title: "Farm-to-Table Organic Lunch & Mindful Journaling" }
    ],
    perks: ["Premium Cork Yoga Mat (yours to keep)", "Organic Vegan Lunch & Cold Pressed Juices", "Guided Meditation Audio Download", "Wellness Journal & Herbal Blend"]
  },
  {
    id: "evt-11",
    title: "Motion Graphics & 3D Blender Masterclass",
    category: "Design",
    categoryKey: "design",
    tag: "Creative",
    featured: false,
    date: "2026-12-08T14:00:00",
    displayDate: "Dec 08, 2026",
    time: "02:00 PM - 07:00 PM",
    venue: "Digital Arts Media Lab, Suite 400",
    city: "Online & In-Studio",
    price: 55,
    isFree: false,
    totalCapacity: 120,
    bookedCount: 96,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Master procedural textures, geometric nodes, lighting schemes, and cinematic camera animations in Blender 4.x.",
    description: "An intensive live masterclass focused on commercial 3D motion design. From product reveals to abstract brand animations, you'll learn how to light, texture, simulate physics, and render photorealistic sequences with high-speed Cycles and EEVEE Next pipelines.",
    organizer: {
      name: "PixelForge Studios",
      email: "learn@pixelforge.tv",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Lucas Vance", role: "3D Motion Director, Studio Kinetic", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "02:00 PM", title: "Geometry Nodes & Procedural Modeling Basics" },
      { time: "03:30 PM", title: "Cinematic Lighting, Shaders & Glass Materials" },
      { time: "05:00 PM", title: "Camera Rigging & Keyframe Dynamics" },
      { time: "06:15 PM", title: "Compositing, Color Grading & Project Export" }
    ],
    perks: ["Project .blend source files included", "Commercial Royalty-Free Shader Pack (30+ materials)", "HD Stream Recording Access for 1 Year", "Community Discord VIP Channel"]
  },
  {
    id: "evt-12",
    title: "Community Open Source Workshop: Git, GitHub & CI/CD",
    category: "Workshops",
    categoryKey: "workshop",
    tag: "Free Entry",
    featured: false,
    date: "2026-11-25T17:00:00",
    displayDate: "Nov 25, 2026",
    time: "05:00 PM - 08:30 PM",
    venue: "Community Tech Center, Hall B",
    city: "Virtual Live Stream",
    price: 0,
    isFree: true,
    totalCapacity: 500,
    bookedCount: 412,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Master collaborative Git branching, Pull Request workflows, GitHub Actions pipelines, and making your first open source contribution.",
    description: "Learn essential version control skills that industry teams look for. We'll demystify merge conflicts, interactive rebasing, automated testing with GitHub Actions, and best practices for creating stunning README files and open-source documentation.",
    organizer: {
      name: "OpenSource Hub",
      email: "hello@opensourcehub.community",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Devon Reed", role: "DevOps Engineer & OSS Maintainer", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
      { name: "Priya Sundaram", role: "Open Source Advocate", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "05:00 PM", title: "Git Fundamentals & Git Under the Hood" },
      { time: "06:00 PM", title: "Branching Strategies, PRs & Resolving Conflicts" },
      { time: "07:00 PM", title: "Automating Tests & Deployments with GitHub Actions" },
      { time: "08:00 PM", title: "Live Contribution Sprint & Q&A" }
    ],
    perks: ["Free Lifetime Workshop Access", "GitHub Cheat Sheet PDF & Sample Workflows", "Contributor Badge on OpenSource Hub", "Live Mentorship in breakout rooms"]
  }
];
