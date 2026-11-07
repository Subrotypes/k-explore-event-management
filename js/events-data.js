/**
 * PulseEvent - Curated Events Seed Data
 * Dates set for upcoming events starting late 2026 onwards
 */

const INITIAL_EVENTS = [
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
      name: "CreativeUX Collective",
      email: "info@creativeux.design",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Kavita Rao", role: "Principal Design Director, Aura Systems", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80" },
      { name: "Julian Blake", role: "Staff Design Engineer, FlowCode", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Opening Address: Spatial & AI-Native Interfaces" },
      { time: "11:30 AM", title: "Micro-Interactions that Delight Users" },
      { time: "01:00 PM", title: "Designers & Engineers Co-Working Lunch" },
      { time: "02:15 PM", title: "Portfolio Review & Rapid Critique Circle" },
      { time: "04:00 PM", title: "Showcase & Closing Keynote" }
    ],
    perks: ["Full Day Interactive Workshop", "Design System Figma Starter Kit", "1-on-1 Portfolio Feedback Session", "Networking Directory Access"]
  },
  {
    id: "evt-04",
    title: "VenturePulse Startup Pitch & Investor Gala",
    category: "Business",
    categoryKey: "business",
    tag: "High Impact",
    featured: false,
    date: "2026-12-18T13:00:00",
    displayDate: "Dec 18, 2026",
    time: "01:00 PM - 07:00 PM",
    venue: "Metropolitan Financial Center, Grand Ballroom",
    city: "New York, NY",
    price: 199,
    isFree: false,
    totalCapacity: 180,
    bookedCount: 140,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Watch 15 vetted seed & Series-A startups pitch live to leading Angel Syndicates and Tier-1 Venture Capitalists.",
    description: "VenturePulse connects game-changing entrepreneurs with forward-thinking investors. Enjoy high-stakes pitch rounds, candid LP panels, valuation clinic breakout rooms, and an evening networking cocktail reception with seasoned founders.",
    organizer: {
      name: "Empire Venture Network",
      email: "pitch@empirevn.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Elena Rostova", role: "Managing Partner, Horizons Capital", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
      { name: "David Sterling", role: "Angel Investor & 3x Exit Founder", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "01:00 PM", title: "Welcome & Investor Market Overview" },
      { time: "02:00 PM", title: "Session I: B2B SaaS & AI Infrastructure Pitches" },
      { time: "04:00 PM", title: "Session II: ClimateTech & Consumer Apps" },
      { time: "05:30 PM", title: "Award Announcements & Executive Cocktail Reception" }
    ],
    perks: ["Access to Pitch Deck Repository", "Investor Networking Directory", "Cocktail & Hors d'oeuvres Reception", "Direct Deal-flow Intro"]
  },
  {
    id: "evt-05",
    title: "Urban Run & High-Intensity Marathon 2026",
    category: "Sports",
    categoryKey: "sports",
    tag: "Active",
    featured: false,
    date: "2026-11-22T06:00:00",
    displayDate: "Nov 22, 2026",
    time: "06:00 AM - 11:30 AM",
    venue: "Central Greenway Park, South Gate",
    city: "Chicago, IL",
    price: 35,
    isFree: false,
    totalCapacity: 600,
    bookedCount: 520,
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Scenic 5K, 10K, and Half Marathon timed run through city skylines and riverbanks. Medals, hydration zones, and post-run festival.",
    description: "Whether you are aiming for a personal record or enjoying an energetic morning stride with friends, the Urban Run unites runners of all levels. Features certified RFID chip timing, isotonic hydration stations every 2km, live DJ cheering zones, and finisher celebrations.",
    organizer: {
      name: "Midwest Athletics Club",
      email: "run@midwestathletics.org",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Coach Tariq Nelson", role: "Olympic Marathon Trainer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "06:00 AM", title: "Bib Pickup & Warm-Up Stretching" },
      { time: "06:45 AM", title: "Half-Marathon Wave Start" },
      { time: "07:15 AM", title: "10K & 5K Wave Starts" },
      { time: "09:30 AM", title: "Podium Ceremony & Recovery Brunch" }
    ],
    perks: ["Official Performance Dry-Fit Running Tee", "RFID Chip Timed Bib & Finisher Medal", "Hydration & Energy Gel Stations", "Recovery Stretch Zone Access"]
  },
  {
    id: "evt-06",
    title: "Full-Stack Web Development Bootcamp & Hackathon",
    category: "Workshops",
    categoryKey: "workshop",
    tag: "Free Entry",
    featured: true,
    date: "2026-12-01T10:00:00",
    displayDate: "Dec 01 - 02, 2026",
    time: "10:00 AM - 06:00 PM",
    venue: "Innovation Hub, Campus Lab 4",
    city: "Online & On-Campus",
    price: 0,
    isFree: true,
    totalCapacity: 150,
    bookedCount: 138,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A hands-on weekend building production-ready web apps with HTML5, CSS3, Modern JS, and API integration. Free for students!",
    description: "Designed specifically for aspiring web developers, this intensive 2-day workshop guides you through modern responsive frontend design, DOM manipulation, asynchronous APIs, state persistence, and deploying apps to Vercel/Netlify. Day 2 includes an exciting 4-hour hack sprint with prize giveaways!",
    organizer: {
      name: "OpenCode Education Initiative",
      email: "community@opencode.dev",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Sameer Verma", role: "Senior Developer Advocate", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Chloe Dupont", role: "Frontend Architect", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Modern HTML5 & Responsive CSS Architecture" },
      { time: "12:00 PM", title: "Mastering Asynchronous JS, Fetch & LocalStorage" },
      { time: "02:00 PM", title: "Project Blueprint & Architecture Setup" },
      { time: "03:30 PM", title: "Team Hackathon Kickoff & Mentoring" },
      { time: "05:30 PM", title: "Live Demos, Code Reviews & Certificates" }
    ],
    perks: ["100% Free Registration", "Verified Digital Certificate", "Mentorship from Senior Engineers", "Hackathon Swag & Cloud Credits"]
  },
  {
    id: "evt-07",
    title: "CyberShield Summit: Zero-Trust & Cloud Defense",
    category: "Technology",
    categoryKey: "tech",
    tag: "Security",
    featured: false,
    date: "2026-12-15T09:30:00",
    displayDate: "Dec 15, 2026",
    time: "09:30 AM - 05:00 PM",
    venue: "SecureData Arena, Cyber Valley",
    city: "Dallas, TX / Hybrid",
    price: 120,
    isFree: false,
    totalCapacity: 250,
    bookedCount: 180,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Understand cutting-edge defensive cyber tactics, AI-driven threat mitigation, ransomware forensics, and zero-trust mesh.",
    description: "CyberShield brings together chief security officers, penetration testers, and security engineers. Explore live war-game simulations, identity governance strategies, and supply chain vulnerability analysis in modern enterprise cloud environments.",
    organizer: {
      name: "Global InfoSec Consortium",
      email: "events@infosecconsortium.org",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Col. Jason Ward", role: "Cyber Defense Consultant", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
      { name: "Maya Lin", role: "Principal Threat Analyst", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "09:30 AM", title: "Keynote: The Threat Landscape in 2027" },
      { time: "11:00 AM", title: "Zero Trust Architecture Deconstructed" },
      { time: "01:30 PM", title: "Live Incident Response & War Gaming" },
      { time: "03:45 PM", title: "Executive Roundtable: Compliance & Security Ops" }
    ],
    perks: ["Conference Pass & Lunch", "CPE Continuing Education Credits", "Zero Trust Whitepaper Bundle", "Security Vendor Expo Access"]
  },
  {
    id: "evt-08",
    title: "International Jazz & Blues Under The Stars",
    category: "Music",
    categoryKey: "music",
    tag: "Cultural",
    featured: false,
    date: "2026-12-04T18:30:00",
    displayDate: "Dec 04, 2026",
    time: "06:30 PM - 10:30 PM",
    venue: "Botanical Conservatory Gardens",
    city: "New Orleans, LA",
    price: 45,
    isFree: false,
    totalCapacity: 300,
    bookedCount: 260,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "An intimate night of acoustic jazz, soul ballads, and blues legends amidst candle-lit garden pathways.",
    description: "Immerse yourself in timeless rhythm and heartfelt melodies as Grammy-nominated saxophonists, pianists, and vocalists gather in a luminous botanical garden. Enjoy vintage wine tastings, artisanal cheese pairings, and soul-stirring improvisations.",
    organizer: {
      name: "Crescent City Arts Council",
      email: "jazz@crescentarts.org",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Miles Sterling Trio", role: "Jazz Ensemble", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { name: "Sarah Vance", role: "Blues Vocalist", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "06:30 PM", title: "Garden Cocktail Reception & Sax Warmup" },
      { time: "07:30 PM", title: "Acoustic Blues Set" },
      { time: "08:45 PM", title: "Intermission & Wine Tasting" },
      { time: "09:15 PM", title: "Grand Jazz All-Stars Jam Session" }
    ],
    perks: ["Reserved garden lawn seating", "Welcome glass of vintage wine or mocktail", "Artisan tasting plate voucher", "Souvenir program booklet"]
  },
  {
    id: "evt-09",
    title: "CleanTech & Green Energy Leadership Congress",
    category: "Business",
    categoryKey: "business",
    tag: "Eco-Summit",
    featured: false,
    date: "2026-12-20T09:00:00",
    displayDate: "Dec 20 - 21, 2026",
    time: "09:00 AM - 05:00 PM",
    venue: "EcoSphere Convention Center",
    city: "Denver, CO",
    price: 95,
    isFree: false,
    totalCapacity: 320,
    bookedCount: 215,
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Pioneering the renewable transition: grid scale batteries, carbon capture, hydrogen mobility, and green financing.",
    description: "Bringing together energy executives, policy leaders, and clean-tech founders to accelerate sustainable decarbonization. Discover practical blueprints for circular manufacturing, ESG reporting transparency, and next-generation battery chemistry.",
    organizer: {
      name: "Global Sustainability Forum",
      email: "contact@cleantechforum.net",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    speakers: [
      { name: "Dr. Arthur Jensen", role: "Chair of Renewable Energy Institute", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
      { name: "Nadia Al-Mansoor", role: "Founder, SolarFlux Systems", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    agenda: [
      { time: "09:00 AM", title: "State of Global Renewable Adoption 2026" },
      { time: "11:00 AM", title: "Breakthroughs in Long-Duration Energy Storage" },
      { time: "01:30 PM", title: "Green Capital & Carbon Offsetting Panel" },
      { time: "03:30 PM", title: "Clean Mobility Case Studies & Pitch Showcase" }
    ],
    perks: ["2-Day Summit Pass & Green Catering", "Digital ESG Implementation Playbook", "CleanTech Startup Showcase Access", "B2B Matchmaking Portal Access"]
  },
  {
    id: "evt-10",
    title: "Mindfulness & Holistic Yoga Retreat",
    category: "Sports",
    categoryKey: "sports",
    tag: "Wellness",
    featured: false,
    date: "2026-11-21T08:00:00",
    displayDate: "Nov 21, 2026",
    time: "08:00 AM - 02:00 PM",
    venue: "Serenity Sanctuary, Highland Pines",
    city: "Boulder, CO",
    price: 40,
    isFree: false,
    totalCapacity: 80,
    bookedCount: 68,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Recharge your mind and body with guided Vinyasa flow, breathwork (Pranayama), sound bath meditation, and plant-based nourishment.",
    description: "Escape the noise of modern life for a rejuvenating half-day sanctuary retreat. Led by certified holistic instructors, this experience fosters deep mental clarity, posture alignment, stress release, and mindfulness techniques you can incorporate into daily living.",
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
