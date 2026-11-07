"use strict";
(() => {
  // src/data/events.ts
  var INITIAL_EVENTS = [
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

  // src/services/storage.ts
  var StorageManager = class {
    static STORAGE_KEY_EVENTS = "pulse_events_data_v2";
    static STORAGE_KEY_REGISTRATIONS = "pulse_registrations_v2";
    static STORAGE_KEY_FAVORITES = "pulse_favorites_v2";
    static STORAGE_KEY_THEME = "pulse_theme_v2";
    static init(seedEvents) {
      if (!localStorage.getItem(this.STORAGE_KEY_EVENTS)) {
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(seedEvents));
      }
      if (!localStorage.getItem(this.STORAGE_KEY_REGISTRATIONS)) {
        localStorage.setItem(this.STORAGE_KEY_REGISTRATIONS, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.STORAGE_KEY_FAVORITES)) {
        localStorage.setItem(this.STORAGE_KEY_FAVORITES, JSON.stringify([]));
      }
    }
    static getEvents() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY_EVENTS);
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    }
    static getEventById(id) {
      const events = this.getEvents();
      return events.find((e) => e.id === id);
    }
    static addCustomEvent(newEvent) {
      const events = this.getEvents();
      events.unshift(newEvent);
      localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
      return newEvent;
    }
    static addEventReview(eventId, review) {
      const events = this.getEvents();
      const event = events.find((e) => e.id === eventId);
      if (!event) return false;
      if (!event.reviews) event.reviews = [];
      event.reviews.unshift(review);
      const total = event.reviews.reduce((acc, r) => acc + r.rating, 0);
      event.rating = parseFloat((total / event.reviews.length).toFixed(1));
      localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
      return true;
    }
    static getRegistrations() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY_REGISTRATIONS);
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    }
    static saveRegistration(bookingData) {
      const bookings = this.getRegistrations();
      const bookingId = "PLS-" + Math.floor(1e5 + Math.random() * 9e5);
      const newBooking = {
        ...bookingData,
        bookingId,
        timestamp: Date.now(),
        checkedIn: false
      };
      bookings.unshift(newBooking);
      localStorage.setItem(this.STORAGE_KEY_REGISTRATIONS, JSON.stringify(bookings));
      const events = this.getEvents();
      const targetEvent = events.find((e) => e.id === bookingData.eventId);
      if (targetEvent) {
        targetEvent.bookedCount = (targetEvent.bookedCount || 0) + (bookingData.ticketCount || 1);
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
      }
      return newBooking;
    }
    static checkInBooking(bookingId) {
      const bookings = this.getRegistrations();
      const booking = bookings.find((b) => b.bookingId === bookingId);
      if (!booking) {
        return { success: false, message: "Invalid pass: Booking ID not found." };
      }
      if (booking.checkedIn) {
        return { success: false, message: "Pass already checked in previously.", booking };
      }
      booking.checkedIn = true;
      localStorage.setItem(this.STORAGE_KEY_REGISTRATIONS, JSON.stringify(bookings));
      return { success: true, message: "Pass verified successfully! Attendee checked in.", booking };
    }
    static cancelRegistration(bookingId) {
      const bookings = this.getRegistrations();
      const index = bookings.findIndex((b) => b.bookingId === bookingId);
      if (index === -1) return false;
      const removed = bookings.splice(index, 1)[0];
      localStorage.setItem(this.STORAGE_KEY_REGISTRATIONS, JSON.stringify(bookings));
      const events = this.getEvents();
      const targetEvent = events.find((e) => e.id === removed.eventId);
      if (targetEvent) {
        targetEvent.bookedCount = Math.max(0, (targetEvent.bookedCount || 0) - (removed.ticketCount || 1));
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
      }
      return true;
    }
    static exportBookingsJSON() {
      const bookings = this.getRegistrations();
      const blob = new Blob([JSON.stringify(bookings, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eventpulse-bookings-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    static exportBookingsCSV() {
      const bookings = this.getRegistrations();
      if (bookings.length === 0) return;
      const headers = ["Booking ID", "Event Title", "Name", "Email", "Phone", "Tier", "Seats", "Date"];
      const rows = bookings.map((b) => [
        `"${b.bookingId}"`,
        `"${b.eventTitle.replace(/"/g, '""')}"`,
        `"${b.name.replace(/"/g, '""')}"`,
        `"${b.email}"`,
        `"${b.phone}"`,
        `"${b.ticketTier}"`,
        b.ticketCount,
        `"${new Date(b.timestamp).toISOString()}"`
      ]);
      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eventpulse-bookings-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    static getFavorites() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY_FAVORITES);
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    }
    static toggleFavorite(eventId) {
      const favs = this.getFavorites();
      const index = favs.indexOf(eventId);
      let isFav = false;
      if (index === -1) {
        favs.push(eventId);
        isFav = true;
      } else {
        favs.splice(index, 1);
        isFav = false;
      }
      localStorage.setItem(this.STORAGE_KEY_FAVORITES, JSON.stringify(favs));
      return isFav;
    }
    static isFavorite(eventId) {
      return this.getFavorites().includes(eventId);
    }
    static getTheme() {
      return localStorage.getItem(this.STORAGE_KEY_THEME) || "dark";
    }
    static setTheme(theme) {
      localStorage.setItem(this.STORAGE_KEY_THEME, theme);
    }
  };

  // src/services/validation.ts
  var FormValidator = class {
    static validateName(name) {
      const trimmed = (name || "").trim();
      if (!trimmed) {
        return { valid: false, message: "Full name is required." };
      }
      if (trimmed.length < 3) {
        return { valid: false, message: "Name must be at least 3 characters." };
      }
      const nameRegex = /^[a-zA-Z\s.'-]+$/;
      if (!nameRegex.test(trimmed)) {
        return { valid: false, message: "Name can only contain letters, spaces, and hyphens." };
      }
      return { valid: true, message: "" };
    }
    static validateEmail(email) {
      const trimmed = (email || "").trim();
      if (!trimmed) {
        return { valid: false, message: "Email address is required." };
      }
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      if (!emailRegex.test(trimmed)) {
        return { valid: false, message: "Please enter a valid email address (e.g., name@domain.com)." };
      }
      return { valid: true, message: "" };
    }
    static validatePhone(phone) {
      const trimmed = (phone || "").trim();
      if (!trimmed) {
        return { valid: false, message: "Phone number is required." };
      }
      const digitsOnly = trimmed.replace(/\D/g, "");
      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        return { valid: false, message: "Phone number must contain between 10 and 15 digits." };
      }
      return { valid: true, message: "" };
    }
    static validateTicketCount(count, spotsAvailable) {
      const num = Number(count);
      if (isNaN(num) || num < 1) {
        return { valid: false, message: "Please select at least 1 ticket." };
      }
      if (num > 5) {
        return { valid: false, message: "Maximum 5 tickets allowed per reservation." };
      }
      if (num > spotsAvailable) {
        return { valid: false, message: `Only ${spotsAvailable} spot(s) remaining for this event.` };
      }
      return { valid: true, message: "" };
    }
    static validateTerms(checked) {
      if (!checked) {
        return { valid: false, message: "You must agree to the Terms of Service & Privacy Policy." };
      }
      return { valid: true, message: "" };
    }
    static validateAll(formData, spotsAvailable) {
      const errors = {};
      const nameRes = this.validateName(formData.name);
      if (!nameRes.valid) errors.name = nameRes.message;
      const emailRes = this.validateEmail(formData.email);
      if (!emailRes.valid) errors.email = emailRes.message;
      const phoneRes = this.validatePhone(formData.phone);
      if (!phoneRes.valid) errors.phone = phoneRes.message;
      const countRes = this.validateTicketCount(formData.ticketCount, spotsAvailable);
      if (!countRes.valid) errors.ticketCount = countRes.message;
      const termsRes = this.validateTerms(formData.terms);
      if (!termsRes.valid) errors.terms = termsRes.message;
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
    static setFieldStatus(inputEl, errorEl, result) {
      if (result.valid) {
        inputEl.classList.remove("border-red-500", "focus:ring-red-500");
        inputEl.classList.add("border-zinc-200", "dark:border-zinc-700");
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.classList.add("hidden");
        }
      } else {
        inputEl.classList.add("border-red-500", "focus:ring-red-500");
        inputEl.classList.remove("border-zinc-200", "dark:border-zinc-700");
        if (errorEl) {
          errorEl.textContent = result.message;
          errorEl.classList.remove("hidden");
        }
      }
    }
    static resetFieldStatus(inputEl, errorEl) {
      inputEl.classList.remove("border-red-500", "focus:ring-red-500");
      inputEl.classList.add("border-zinc-200", "dark:border-zinc-700");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.add("hidden");
      }
    }
  };

  // src/services/currency.ts
  var CURRENCIES = {
    USD: { code: "USD", symbol: "$", rate: 1 },
    EUR: { code: "EUR", symbol: "\u20AC", rate: 0.92 },
    GBP: { code: "GBP", symbol: "\xA3", rate: 0.79 },
    INR: { code: "INR", symbol: "\u20B9", rate: 83.5 },
    CAD: { code: "CAD", symbol: "CA$", rate: 1.36 }
  };
  var CurrencyManager = class {
    static currentCode = "USD";
    static init() {
      const saved = localStorage.getItem("pulse_currency");
      if (saved && CURRENCIES[saved]) {
        this.currentCode = saved;
      }
      return this.currentCode;
    }
    static getCurrency() {
      return CURRENCIES[this.currentCode] || CURRENCIES.USD;
    }
    static setCurrency(code) {
      if (CURRENCIES[code]) {
        this.currentCode = code;
        localStorage.setItem("pulse_currency", code);
      }
      return this.getCurrency();
    }
    static formatPrice(baseUsdPrice, isFree) {
      if (isFree || baseUsdPrice === 0) {
        return "Free";
      }
      const curr = this.getCurrency();
      const converted = Math.round(baseUsdPrice * curr.rate);
      return `${curr.symbol}${converted.toLocaleString()}`;
    }
    static convertPrice(baseUsdPrice) {
      const curr = this.getCurrency();
      return Math.round(baseUsdPrice * curr.rate);
    }
  };

  // src/services/ticket.ts
  var TicketManager = class {
    /**
     * Deterministic Vector QR Code SVG Generator
     */
    static generateQRCodeSVG(payload, size = 180) {
      let hash = 0;
      for (let i = 0; i < payload.length; i++) {
        hash = (hash << 5) - hash + payload.charCodeAt(i);
        hash |= 0;
      }
      const gridSize = 21;
      const cellSize = size / gridSize;
      let paths = "";
      function isFinder(r, c) {
        if (r < 7 && c < 7) return true;
        if (r < 7 && c >= gridSize - 7) return true;
        if (r >= gridSize - 7 && c < 7) return true;
        return false;
      }
      function isFinderDark(r, c) {
        const inBox1 = r < 7 && c < 7;
        const inBox2 = r < 7 && c >= gridSize - 7;
        const inBox3 = r >= gridSize - 7 && c < 7;
        let lr = r;
        let lc = c;
        if (inBox2) lc = c - (gridSize - 7);
        if (inBox3) lr = r - (gridSize - 7);
        if (inBox1 || inBox2 || inBox3) {
          if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
          if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) return true;
          return false;
        }
        return false;
      }
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          let isDark = false;
          if (isFinder(r, c)) {
            isDark = isFinderDark(r, c);
          } else {
            const pseudoBit = ((hash ^ r * 31 + c * 17) & 1 << (r + c) % 16) !== 0;
            isDark = pseudoBit;
          }
          if (isDark) {
            const x = (c * cellSize).toFixed(2);
            const y = (r * cellSize).toFixed(2);
            const w = cellSize.toFixed(2);
            paths += `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="currentColor" rx="1.5"/>`;
          }
        }
      }
      return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="w-full h-full text-zinc-950 dark:text-zinc-50">
        ${paths}
      </svg>
    `;
    }
    /**
     * RFC 5545 iCalendar (.ics) standard download
     */
    static downloadCalendarICS(booking, event) {
      const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };
      const start = formatDate(event.date);
      const end = formatDate(new Date(new Date(event.date).getTime() + 3 * 60 * 60 * 1e3).toISOString());
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//EventPulse//Event Pass//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${booking.bookingId}@pulseevent.io`,
        `DTSTAMP:${formatDate((/* @__PURE__ */ new Date()).toISOString())}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.shortDesc} \\nPass Ref: ${booking.bookingId} \\nTier: ${booking.ticketTier}`,
        `LOCATION:${event.venue}, ${event.city}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");
      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `pulse-pass-${booking.bookingId}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    /**
     * Print Ticket Formatting
     */
    static printTicket() {
      window.print();
    }
    /**
     * Render Digital Boarding Pass HTML
     */
    static renderTicketHTML(booking, event) {
      const qrPayload = JSON.stringify({
        id: booking.bookingId,
        event: event.title,
        name: booking.name,
        seats: booking.ticketCount,
        tier: booking.ticketTier
      });
      const qrSvg = this.generateQRCodeSVG(qrPayload, 170);
      const formattedPrice = CurrencyManager.formatPrice(event.isFree ? 0 : event.price * booking.ticketCount, event.isFree);
      return `
      <div class="ticket-boarding-pass max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
        <div class="p-6 sm:p-8 border-b border-dashed border-zinc-200 dark:border-zinc-800 relative bg-zinc-50/60 dark:bg-zinc-850/60">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">
                P
              </span>
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block leading-tight">Official Boarding Pass</span>
                <span class="text-base font-bold text-zinc-900 dark:text-zinc-100">EventPulse</span>
              </div>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ${booking.checkedIn ? "Checked In" : "Confirmed"}
            </span>
          </div>

          <div class="mt-6">
            <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              ${event.category} \u2022 ${booking.ticketTier || "Standard"}
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">
              ${event.title}
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
              <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              <span>${event.venue}, ${event.city}</span>
            </p>
          </div>
        </div>

        <div class="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div class="sm:col-span-2 grid grid-cols-2 gap-4 text-left">
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Attendee</span>
              <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">${booking.name}</p>
              <p class="text-[11px] font-mono text-zinc-400 truncate">${booking.email}</p>
            </div>
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Date & Time</span>
              <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">${event.displayDate}</p>
              <p class="text-[11px] font-mono text-zinc-400">${event.time}</p>
            </div>
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Pass Ref</span>
              <p class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">#${booking.bookingId}</p>
            </div>
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Reserved</span>
              <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100">${booking.ticketCount} Pass (${formattedPrice})</p>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800">
            <div class="w-28 h-28 p-1 bg-white rounded-xl flex items-center justify-center shadow-inner">
              ${qrSvg}
            </div>
            <span class="text-[9px] font-mono text-zinc-400 mt-2 uppercase tracking-wider">Scan to Check-in</span>
          </div>
        </div>
      </div>
    `;
    }
  };

  // src/services/audio.ts
  var AudioManager = class {
    static audioCtx = null;
    static isMuted = false;
    static init() {
      const saved = localStorage.getItem("pulse_audio_muted");
      this.isMuted = saved === "true";
      return !this.isMuted;
    }
    static toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem("pulse_audio_muted", String(this.isMuted));
      return !this.isMuted;
    }
    static getIsMuted() {
      return this.isMuted;
    }
    static getContext() {
      if (this.isMuted) return null;
      try {
        if (!this.audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx.state === "suspended") {
          this.audioCtx.resume();
        }
        return this.audioCtx;
      } catch {
        return null;
      }
    }
    /**
     * Crisp micro-click on button taps and filters
     */
    static playClick() {
      const ctx = this.getContext();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.045);
      } catch {
      }
    }
    /**
     * Smooth whoosh on modal popup open
     */
    static playWhoosh() {
      const ctx = this.getContext();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(1e-3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.13);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } catch {
      }
    }
    /**
     * Harmonious 4-note celebration chime on pass reservation
     */
    static playSuccess() {
      const ctx = this.getContext();
      if (!ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
          gain.gain.setValueAtTime(1e-3, ctx.currentTime + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + i * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + i * 0.07 + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.07);
          osc.stop(ctx.currentTime + i * 0.07 + 0.4);
        });
      } catch {
      }
    }
  };

  // src/animations/gsap-orchestrator.ts
  var AnimationOrchestrator = class _AnimationOrchestrator {
    static lenis = null;
    static isGsapReady = false;
    static init() {
      this.initLenis();
      this.initGSAP();
      this.initMagneticButtons();
      this.initHeroParallax();
    }
    /**
     * Smooth Momentum Inertial Scrolling via Lenis
     */
    static initLenis() {
      if (typeof Lenis === "undefined") return;
      try {
        let raf2 = function(time) {
          _AnimationOrchestrator.lenis?.raf(time);
          requestAnimationFrame(raf2);
        };
        var raf = raf2;
        this.lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2
        });
        requestAnimationFrame(raf2);
        if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
          this.lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => {
            this.lenis?.raf(time * 1e3);
          });
          gsap.ticker.lagSmoothing(0);
        }
      } catch (e) {
        console.warn("Lenis smooth scroll fallback", e);
      }
    }
    /**
     * GSAP ScrollTrigger Global Setup
     */
    static initGSAP() {
      if (typeof gsap === "undefined") return;
      try {
        if (typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
        }
        this.isGsapReady = true;
        gsap.from(".hero-headline-word", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.15
        });
        gsap.from("#spotlight-card", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.3
        });
        if (typeof ScrollTrigger !== "undefined") {
          gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
            gsap.from(el, {
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
              },
              y: 50,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out"
            });
          });
        }
      } catch (e) {
        console.warn("GSAP initialization note", e);
      }
    }
    /**
     * Hero Spotlight Subtle Parallax on Scroll
     */
    static initHeroParallax() {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
      const img = document.getElementById("spotlight-img");
      if (!img) return;
      gsap.to(img, {
        scrollTrigger: {
          trigger: "#featured-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        },
        yPercent: 12,
        scale: 1.05,
        ease: "none"
      });
    }
    /**
     * Magnetic Button Cursor Physics
     */
    static initMagneticButtons() {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      document.querySelectorAll(".magnetic-btn").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          if (typeof gsap !== "undefined") {
            gsap.to(btn, {
              x: x * 0.28,
              y: y * 0.28,
              rotation: x * 0.04,
              duration: 0.3,
              ease: "power2.out"
            });
          } else {
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
          }
        });
        btn.addEventListener("mouseleave", () => {
          if (typeof gsap !== "undefined") {
            gsap.to(btn, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)"
            });
          } else {
            btn.style.transform = "translate(0px, 0px)";
          }
        });
      });
    }
    /**
     * Dynamic Event Cards GSAP Entrance Animation
     */
    static animateCards(container) {
      if (typeof gsap === "undefined") return;
      const cards = container.querySelectorAll(".tilt-card-wrapper");
      if (cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    }
    /**
     * Celebratory Canvas Confetti Blast
     */
    static triggerConfetti() {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#4f46e5", "#10b981", "#6366f1", "#f59e0b", "#3b82f6"]
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#4f46e5", "#10b981", "#3b82f6"]
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#4f46e5", "#10b981", "#3b82f6"]
          });
        }, 200);
      }
    }
  };

  // src/components/calendar.ts
  var CalendarViewComponent = class {
    static currentMonth = (/* @__PURE__ */ new Date()).getMonth();
    static currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    static selectedDateStr = null;
    static onSelectDateCallback = null;
    static init(onSelectDate) {
      this.onSelectDateCallback = onSelectDate;
    }
    static nextMonth() {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    }
    static prevMonth() {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
    }
    static render(events) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const eventDateMap = {};
      events.forEach((ev) => {
        const d = ev.date.split("T")[0];
        if (!eventDateMap[d]) eventDateMap[d] = [];
        eventDateMap[d].push(ev);
      });
      let daysHtml = "";
      for (let i = 0; i < firstDay; i++) {
        daysHtml += `<div class="h-24 sm:h-28 p-2 rounded-xl border border-transparent bg-zinc-50/40 dark:bg-zinc-900/30 opacity-40"></div>`;
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const dayEvents = eventDateMap[dateStr] || [];
        const isSelected = this.selectedDateStr === dateStr;
        const hasEvents = dayEvents.length > 0;
        const eventsPills = dayEvents.slice(0, 2).map((ev) => `
        <div class="truncate text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/40 mt-1" title="${ev.title}">
          ${ev.title}
        </div>
      `).join("");
        const moreCount = dayEvents.length > 2 ? `<span class="text-[9px] font-bold text-zinc-400 block mt-0.5">+${dayEvents.length - 2} more</span>` : "";
        daysHtml += `
        <button 
          class="calendar-day-cell h-24 sm:h-28 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all ${isSelected ? "ring-2 ring-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-500" : hasEvents ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-indigo-400" : "bg-white/60 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50"}" 
          data-date="${dateStr}"
        >
          <div class="flex items-center justify-between w-full">
            <span class="text-xs sm:text-sm font-bold ${hasEvents ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}">${day}</span>
            ${hasEvents ? `<span class="w-2 h-2 rounded-full bg-indigo-600"></span>` : ""}
          </div>
          <div class="w-full min-w-0 mt-1 flex-1 overflow-hidden">
            ${eventsPills}
            ${moreCount}
          </div>
        </button>
      `;
      }
      return `
      <div class="calendar-container bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl">
        <!-- Calendar Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              ${monthNames[this.currentMonth]} ${this.currentYear}
            </h3>
            <p class="text-xs text-zinc-400 mt-0.5">Click any day to filter events scheduled on that date</p>
          </div>
          <div class="flex items-center gap-2">
            ${this.selectedDateStr ? `
              <button id="cal-clear-date-btn" class="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 transition-colors mr-2">
                Clear Selection
              </button>
            ` : ""}
            <button id="cal-prev-btn" class="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Previous Month">
              <svg class="w-4 h-4 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button id="cal-next-btn" class="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Next Month">
              <svg class="w-4 h-4 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        <!-- Days of Week Header -->
        <div class="grid grid-cols-7 gap-2 sm:gap-3 text-center py-3 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-2 sm:gap-3">
          ${daysHtml}
        </div>
      </div>
    `;
    }
    static bindEvents(renderCallback) {
      const prevBtn = document.getElementById("cal-prev-btn");
      const nextBtn = document.getElementById("cal-next-btn");
      const clearBtn = document.getElementById("cal-clear-date-btn");
      if (prevBtn) {
        prevBtn.onclick = () => {
          this.prevMonth();
          renderCallback();
        };
      }
      if (nextBtn) {
        nextBtn.onclick = () => {
          this.nextMonth();
          renderCallback();
        };
      }
      if (clearBtn) {
        clearBtn.onclick = () => {
          this.selectedDateStr = null;
          if (this.onSelectDateCallback) this.onSelectDateCallback(null);
          renderCallback();
        };
      }
      document.querySelectorAll(".calendar-day-cell").forEach((cell) => {
        cell.onclick = () => {
          const d = cell.dataset.date || null;
          this.selectedDateStr = this.selectedDateStr === d ? null : d;
          if (this.onSelectDateCallback) this.onSelectDateCallback(this.selectedDateStr);
          renderCallback();
        };
      });
    }
  };

  // src/components/scanner.ts
  var TicketScannerComponent = class {
    static verifyPass(codeOrId) {
      let bookingId = codeOrId.trim();
      if (bookingId.startsWith("{") && bookingId.endsWith("}")) {
        try {
          const parsed = JSON.parse(bookingId);
          if (parsed.id) bookingId = parsed.id;
        } catch {
        }
      }
      if (bookingId.startsWith("#")) {
        bookingId = bookingId.substring(1);
      }
      const res = StorageManager.checkInBooking(bookingId);
      if (res.success && res.booking) {
        AudioManager.playSuccess();
        AnimationOrchestrator.triggerConfetti();
        const detailsHtml = `
        <div class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 text-left">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">#${res.booking.bookingId}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">CHECKED IN</span>
          </div>
          <div>
            <h4 class="text-base font-bold text-zinc-900 dark:text-zinc-100">${res.booking.name}</h4>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 font-mono">${res.booking.email} \u2022 ${res.booking.phone}</p>
          </div>
          <div class="text-xs text-zinc-600 dark:text-zinc-300 border-t border-emerald-200/60 dark:border-emerald-800/60 pt-2 font-medium">
            <p><strong>Event:</strong> ${res.booking.eventTitle}</p>
            <p><strong>Tier:</strong> ${res.booking.ticketTier} (${res.booking.ticketCount} seat${res.booking.ticketCount > 1 ? "s" : ""})</p>
          </div>
        </div>
      `;
        return {
          success: true,
          message: "Pass verified successfully!",
          detailsHtml
        };
      } else {
        return {
          success: false,
          message: res.message
        };
      }
    }
  };

  // src/app.ts
  document.addEventListener("DOMContentLoaded", () => {
    const AppState = {
      events: [],
      filteredEvents: [],
      filters: {
        category: "all",
        search: "",
        dateFilter: "all",
        priceFilter: "all",
        sortBy: "date-asc",
        selectedDate: null
      },
      viewMode: "grid",
      selectedEvent: null,
      currentTicketBooking: null,
      countdownInterval: null
    };
    const DOM = {
      html: document.documentElement,
      themeToggleBtn: document.getElementById("theme-toggle-btn"),
      themeIconLight: document.getElementById("theme-icon-light"),
      themeIconDark: document.getElementById("theme-icon-dark"),
      audioToggleBtn: document.getElementById("audio-toggle-btn"),
      currencySelect: document.getElementById("currency-select"),
      // Navigation & Badges
      myBookingsBtn: document.getElementById("my-bookings-btn"),
      bookingsBadge: document.getElementById("bookings-count-badge"),
      mobileMenuBtn: document.getElementById("mobile-menu-btn"),
      mobileMenuDrawer: document.getElementById("mobile-menu-drawer"),
      hostEventBtn: document.getElementById("host-event-btn"),
      heroHostBtn: document.getElementById("hero-host-btn"),
      heroExploreBtn: document.getElementById("hero-explore-btn"),
      scannerModalBtn: document.getElementById("scanner-modal-btn"),
      // Hero Spotlight & Countdown
      spotlightTitle: document.getElementById("spotlight-title"),
      spotlightCategory: document.getElementById("spotlight-category"),
      spotlightDate: document.getElementById("spotlight-date"),
      spotlightVenue: document.getElementById("spotlight-venue"),
      spotlightPrice: document.getElementById("spotlight-price"),
      spotlightRegisterBtn: document.getElementById("spotlight-register-btn"),
      spotlightDetailsBtn: document.getElementById("spotlight-details-btn"),
      spotlightImg: document.getElementById("spotlight-img"),
      cdDays: document.getElementById("cd-days"),
      cdHours: document.getElementById("cd-hours"),
      cdMinutes: document.getElementById("cd-minutes"),
      cdSeconds: document.getElementById("cd-seconds"),
      // Search & Filter Controls
      searchInput: document.getElementById("search-input"),
      searchClearBtn: document.getElementById("search-clear-btn"),
      categoryPillsContainer: document.getElementById("category-pills"),
      dateFilterSelect: document.getElementById("date-filter"),
      priceFilterSelect: document.getElementById("price-filter"),
      sortSelect: document.getElementById("sort-select"),
      resetFiltersBtn: document.getElementById("reset-filters-btn"),
      viewGridBtn: document.getElementById("view-grid-btn"),
      viewListBtn: document.getElementById("view-list-btn"),
      viewCalendarBtn: document.getElementById("view-calendar-btn"),
      resultsCountText: document.getElementById("results-count-text"),
      eventsContainer: document.getElementById("events-container"),
      noResultsState: document.getElementById("no-results-state"),
      // Modals
      eventDetailsModal: document.getElementById("event-details-modal"),
      eventDetailsContent: document.getElementById("event-details-content"),
      closeDetailsBtn: document.getElementById("close-details-btn"),
      registrationModal: document.getElementById("registration-modal"),
      registrationForm: document.getElementById("registration-form"),
      closeRegBtn: document.getElementById("close-reg-btn"),
      regEventSummary: document.getElementById("reg-event-summary"),
      regSubmitBtn: document.getElementById("reg-submit-btn"),
      regTicketTier: document.getElementById("reg-ticket-tier"),
      regTicketCount: document.getElementById("reg-ticket-count"),
      regPriceTotal: document.getElementById("reg-price-total"),
      ticketModal: document.getElementById("ticket-modal"),
      ticketContainer: document.getElementById("ticket-container"),
      closeTicketBtn: document.getElementById("close-ticket-btn"),
      printTicketBtn: document.getElementById("print-ticket-btn"),
      downloadIcsBtn: document.getElementById("download-ics-btn"),
      viewBookingsFromTicketBtn: document.getElementById("view-bookings-from-ticket-btn"),
      bookingsDrawer: document.getElementById("bookings-drawer"),
      bookingsList: document.getElementById("bookings-list"),
      closeBookingsBtn: document.getElementById("close-bookings-btn"),
      emptyBookingsNotice: document.getElementById("empty-bookings-notice"),
      exportJsonBtn: document.getElementById("export-bookings-json-btn"),
      exportCsvBtn: document.getElementById("export-bookings-csv-btn"),
      hostEventModal: document.getElementById("host-event-modal"),
      hostEventForm: document.getElementById("host-event-form"),
      closeHostBtn: document.getElementById("close-host-btn"),
      scannerModal: document.getElementById("scanner-modal"),
      scannerForm: document.getElementById("scanner-form"),
      scannerInput: document.getElementById("scanner-input"),
      scannerResultContainer: document.getElementById("scanner-result-container"),
      closeScannerBtn: document.getElementById("close-scanner-btn"),
      toastContainer: document.getElementById("toast-container")
    };
    function showToast(message, type = "success", duration = 3200) {
      if (!DOM.toastContainer) return;
      const toast = document.createElement("div");
      toast.className = `toast-animate-in flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold border pointer-events-auto transition-all backdrop-blur-2xl ${type === "success" ? "bg-zinc-900/95 text-zinc-100 border-zinc-700 dark:bg-zinc-100/95 dark:text-zinc-900 dark:border-zinc-300 shadow-indigo-500/10" : type === "error" ? "bg-rose-950/95 text-rose-100 border-rose-800" : "bg-zinc-900/95 text-zinc-100 border-zinc-700 dark:bg-zinc-850 dark:text-zinc-100 dark:border-zinc-600"}`;
      const iconSvg = type === "success" ? `<svg class="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>` : type === "error" ? `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>` : `<svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
      toast.innerHTML = `
      ${iconSvg}
      <span class="flex-1">${message}</span>
      <button class="text-zinc-400 hover:text-white dark:hover:text-zinc-900 p-1 rounded-full ml-1" aria-label="Dismiss">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    `;
      const dismissBtn = toast.querySelector("button");
      if (dismissBtn) dismissBtn.onclick = () => toast.remove();
      DOM.toastContainer.appendChild(toast);
      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.opacity = "0";
          toast.style.transform = "translateY(10px) scale(0.95)";
          setTimeout(() => toast.remove(), 250);
        }
      }, duration);
    }
    function initTheme() {
      const savedTheme = StorageManager.getTheme();
      applyTheme(savedTheme);
      DOM.themeToggleBtn.addEventListener("click", () => {
        AudioManager.playClick();
        const isDark = DOM.html.classList.contains("dark");
        const nextTheme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        StorageManager.setTheme(nextTheme);
        showToast(`${nextTheme === "dark" ? "Dark mode active \u{1F319}" : "Light mode active \u2600\uFE0F"}`, "info", 1800);
      });
    }
    function applyTheme(theme) {
      if (theme === "dark") {
        DOM.html.classList.add("dark");
        DOM.themeIconLight.classList.remove("hidden");
        DOM.themeIconDark.classList.add("hidden");
      } else {
        DOM.html.classList.remove("dark");
        DOM.themeIconLight.classList.add("hidden");
        DOM.themeIconDark.classList.remove("hidden");
      }
    }
    function initAudioToggle() {
      AudioManager.init();
      if (!DOM.audioToggleBtn) return;
      const updateAudioIcon = () => {
        const isMuted = AudioManager.getIsMuted();
        DOM.audioToggleBtn.innerHTML = isMuted ? `<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>` : `<svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`;
      };
      updateAudioIcon();
      DOM.audioToggleBtn.onclick = () => {
        const unmuted = AudioManager.toggleMute();
        updateAudioIcon();
        if (unmuted) AudioManager.playClick();
        showToast(unmuted ? "Audio effects active \u{1F50A}" : "Audio muted \u{1F507}", "info", 1500);
      };
    }
    function initCurrency() {
      const currentCode = CurrencyManager.init();
      if (DOM.currencySelect) {
        DOM.currencySelect.value = currentCode;
        DOM.currencySelect.onchange = (e) => {
          AudioManager.playClick();
          const code = e.target.value;
          CurrencyManager.setCurrency(code);
          setupSpotlightEvent();
          filterAndRenderEvents();
          updateRegistrationTotal();
          showToast(`Currency set to ${code}`, "info", 1500);
        };
      }
    }
    function updateBookingsCount() {
      const bookings = StorageManager.getRegistrations();
      if (DOM.bookingsBadge) {
        DOM.bookingsBadge.textContent = String(bookings.length);
        if (bookings.length > 0) {
          DOM.bookingsBadge.classList.remove("opacity-0", "scale-75");
          DOM.bookingsBadge.classList.add("opacity-100", "scale-100");
        } else {
          DOM.bookingsBadge.classList.add("opacity-0", "scale-75");
        }
      }
    }
    function setupSpotlightEvent() {
      const featured = AppState.events.find((ev) => ev.featured) || AppState.events[0];
      if (!featured) return;
      if (DOM.spotlightTitle) DOM.spotlightTitle.textContent = featured.title;
      if (DOM.spotlightCategory) DOM.spotlightCategory.textContent = featured.category;
      if (DOM.spotlightDate) DOM.spotlightDate.textContent = featured.displayDate;
      if (DOM.spotlightVenue) DOM.spotlightVenue.textContent = `${featured.venue}, ${featured.city}`;
      if (DOM.spotlightPrice) DOM.spotlightPrice.textContent = CurrencyManager.formatPrice(featured.price, featured.isFree);
      if (DOM.spotlightImg) DOM.spotlightImg.src = featured.image;
      if (DOM.spotlightRegisterBtn) {
        DOM.spotlightRegisterBtn.onclick = () => {
          AudioManager.playClick();
          openRegistrationModal(featured.id);
        };
      }
      if (DOM.spotlightDetailsBtn) {
        DOM.spotlightDetailsBtn.onclick = () => {
          AudioManager.playClick();
          openEventDetailsModal(featured.id);
        };
      }
      startSpotlightCountdown(featured.date);
    }
    function startSpotlightCountdown(targetDateStr) {
      if (AppState.countdownInterval) {
        clearInterval(AppState.countdownInterval);
      }
      const targetTime = new Date(targetDateStr).getTime();
      function update() {
        const now = Date.now();
        const diff = Math.max(0, targetTime - now);
        const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
        const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
        const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
        if (DOM.cdDays) DOM.cdDays.textContent = String(days).padStart(2, "0");
        if (DOM.cdHours) DOM.cdHours.textContent = String(hours).padStart(2, "0");
        if (DOM.cdMinutes) DOM.cdMinutes.textContent = String(minutes).padStart(2, "0");
        if (DOM.cdSeconds) DOM.cdSeconds.textContent = String(seconds).padStart(2, "0");
      }
      update();
      AppState.countdownInterval = setInterval(update, 1e3);
    }
    function filterAndRenderEvents() {
      let result = [...AppState.events];
      if (AppState.filters.category !== "all") {
        result = result.filter(
          (ev) => ev.categoryKey && ev.categoryKey.toLowerCase() === AppState.filters.category.toLowerCase() || ev.category && ev.category.toLowerCase().includes(AppState.filters.category.toLowerCase())
        );
      }
      if (AppState.filters.search) {
        const q = AppState.filters.search.toLowerCase().trim();
        result = result.filter(
          (ev) => ev.title.toLowerCase().includes(q) || ev.shortDesc.toLowerCase().includes(q) || ev.venue.toLowerCase().includes(q) || ev.city.toLowerCase().includes(q) || ev.category.toLowerCase().includes(q)
        );
      }
      if (AppState.filters.priceFilter === "free") {
        result = result.filter((ev) => ev.isFree);
      } else if (AppState.filters.priceFilter === "under50") {
        result = result.filter((ev) => ev.isFree || ev.price <= 50);
      } else if (AppState.filters.priceFilter === "50plus") {
        result = result.filter((ev) => !ev.isFree && ev.price > 50);
      }
      const now = /* @__PURE__ */ new Date();
      if (AppState.filters.dateFilter === "week") {
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3);
        result = result.filter((ev) => {
          const d = new Date(ev.date);
          return d >= now && d <= nextWeek;
        });
      } else if (AppState.filters.dateFilter === "month") {
        const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1e3);
        result = result.filter((ev) => {
          const d = new Date(ev.date);
          return d >= now && d <= nextMonth;
        });
      }
      if (AppState.filters.selectedDate) {
        result = result.filter((ev) => ev.date.startsWith(AppState.filters.selectedDate));
      }
      result.sort((a, b) => {
        if (AppState.filters.sortBy === "date-asc") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (AppState.filters.sortBy === "price-asc") {
          return (a.isFree ? 0 : a.price) - (b.isFree ? 0 : b.price);
        } else if (AppState.filters.sortBy === "price-desc") {
          return (b.isFree ? 0 : b.price) - (a.isFree ? 0 : a.price);
        } else if (AppState.filters.sortBy === "popular") {
          return (b.bookedCount || 0) - (a.bookedCount || 0);
        }
        return 0;
      });
      AppState.filteredEvents = result;
      renderEventsList();
    }
    function renderEventsList() {
      DOM.resultsCountText.textContent = `Showing ${AppState.filteredEvents.length} of ${AppState.events.length} events`;
      if (AppState.filteredEvents.length === 0) {
        DOM.eventsContainer.innerHTML = "";
        DOM.noResultsState.classList.remove("hidden");
        return;
      }
      DOM.noResultsState.classList.add("hidden");
      if (AppState.viewMode === "calendar") {
        DOM.eventsContainer.className = "w-full";
        DOM.eventsContainer.innerHTML = CalendarViewComponent.render(AppState.events);
        CalendarViewComponent.bindEvents(() => renderEventsList());
        return;
      }
      if (AppState.viewMode === "grid") {
        DOM.eventsContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      } else {
        DOM.eventsContainer.className = "flex flex-col gap-6";
      }
      DOM.eventsContainer.innerHTML = AppState.filteredEvents.map((ev, index) => createEventCardHTML(ev, AppState.viewMode, index)).join("");
      attachCardListeners();
      attachTiltEffects();
      AnimationOrchestrator.animateCards(DOM.eventsContainer);
    }
    function createEventCardHTML(ev, viewMode, index = 0) {
      const isFav = StorageManager.isFavorite(ev.id);
      const spotsLeft = Math.max(0, ev.totalCapacity - (ev.bookedCount || 0));
      const isSoldOut = spotsLeft <= 0;
      const percentFilled = Math.min(100, Math.round((ev.bookedCount || 0) / ev.totalCapacity * 100));
      const badgeCategoryClass = `cat-pill cat-pill-${ev.categoryKey || "tech"}`;
      const priceDisplay = CurrencyManager.formatPrice(ev.price, ev.isFree);
      const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
      if (viewMode === "list") {
        return `
        <div class="tilt-card-wrapper scroll-reveal stagger-${index % 6 + 1}">
          <article class="tilt-card group relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 p-6 flex flex-col md:flex-row gap-6 items-stretch shadow-md hover:shadow-xl transition-all">
            <div class="tilt-glare"></div>

            <!-- Thumbnail -->
            <div class="relative w-full md:w-72 h-52 md:h-auto rounded-2xl overflow-hidden shrink-0">
              <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
              <span class="absolute top-3.5 left-3.5 ${badgeCategoryClass} shadow-md">
                ${ev.category}
              </span>
              <button class="favorite-toggle-btn absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors shadow-md z-20" data-id="${ev.id}" aria-label="Favorite">
                <svg class="w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : "fill-none"}" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-2 font-mono font-medium">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>${ev.displayDate} \u2022 ${ev.time}</span>
                  </div>
                  <span class="text-xl font-bold text-zinc-900 dark:text-zinc-100">${priceDisplay}</span>
                </div>

                <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  ${ev.title}
                </h3>

                <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 flex items-center gap-1.5 font-medium">
                  <svg class="w-4 h-4 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  <span class="truncate">${ev.venue}, ${ev.city}</span>
                </p>

                <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-3 line-clamp-2 leading-relaxed">
                  ${ev.shortDesc}
                </p>
              </div>

              <!-- Footer & Actions -->
              <div class="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div class="w-full sm:w-52">
                  <div class="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-mono font-medium">
                    <span>${isSoldOut ? "Sold Out" : `${spotsLeft} spots left`}</span>
                    <span>${percentFilled}%</span>
                  </div>
                  <div class="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-300 ${percentFilled > 85 ? "bg-rose-500" : "bg-indigo-600 dark:bg-indigo-400"}" style="width: ${percentFilled}%"></div>
                  </div>
                </div>

                <div class="flex items-center gap-3 w-full sm:w-auto z-20">
                  <button class="view-details-btn px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors" data-id="${ev.id}">
                    Details
                  </button>
                  <button class="quick-register-btn px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed" data-id="${ev.id}" ${isSoldOut ? "disabled" : ""}>
                    ${isSoldOut ? "Sold Out" : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      `;
      }
      return `
      <div class="tilt-card-wrapper scroll-reveal stagger-${index % 6 + 1}">
        <article class="tilt-card group relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
          <div class="tilt-glare"></div>

          <div>
            <!-- Thumbnail & Badges -->
            <div class="relative h-60 w-full overflow-hidden">
              <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>

              <span class="absolute top-4 left-4 ${badgeCategoryClass} shadow-md z-10">
                ${ev.category}
              </span>

              <div class="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                <span class="text-xs font-mono font-medium bg-zinc-900/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-sm">
                  <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  ${formattedDate}
                </span>
                <span class="text-sm font-bold bg-indigo-600/95 backdrop-blur-md px-3.5 py-1 rounded-xl border border-indigo-400/40 shadow-sm">
                  ${priceDisplay}
                </span>
              </div>

              <button class="favorite-toggle-btn absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors shadow-md z-20" data-id="${ev.id}" aria-label="Favorite">
                <svg class="w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : "fill-none"}" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>

            <!-- Card Content -->
            <div class="p-6">
              <p class="text-xs text-zinc-400 flex items-center gap-1.5 font-medium truncate mb-2">
                <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                <span class="truncate">${ev.venue}, ${ev.city}</span>
              </p>

              <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1">
                ${ev.title}
              </h3>

              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                ${ev.shortDesc}
              </p>

              <!-- Progress Bar -->
              <div class="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div class="flex justify-between text-xs text-zinc-400 font-mono font-medium mb-1.5">
                  <span>${isSoldOut ? "Sold Out" : `${spotsLeft} spots remaining`}</span>
                  <span>${percentFilled}%</span>
                </div>
                <div class="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-300 ${percentFilled > 85 ? "bg-rose-500" : "bg-indigo-600 dark:bg-indigo-400"}" style="width: ${percentFilled}%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card Action Footer -->
          <div class="px-6 pb-6 pt-0 flex items-center gap-3 z-20">
            <button class="view-details-btn flex-1 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors" data-id="${ev.id}">
              View Details
            </button>
            <button class="quick-register-btn flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed" data-id="${ev.id}" ${isSoldOut ? "disabled" : ""}>
              ${isSoldOut ? "Sold Out" : "Register"}
            </button>
          </div>
        </article>
      </div>
    `;
    }
    function attachTiltEffects() {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      document.querySelectorAll(".tilt-card").forEach((card) => {
        const glare = card.querySelector(".tilt-glare");
        card.onmousemove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -6;
          const rotateY = (x - centerX) / centerX * 6;
          card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
          if (glare) {
            glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2), transparent 60%)`;
          }
        };
        card.onmouseleave = () => {
          card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
          if (glare) glare.style.background = "transparent";
        };
      });
    }
    function attachCardListeners() {
      document.querySelectorAll(".view-details-btn").forEach((btn) => {
        btn.onclick = () => {
          AudioManager.playClick();
          openEventDetailsModal(btn.dataset.id);
        };
      });
      document.querySelectorAll(".quick-register-btn").forEach((btn) => {
        btn.onclick = () => {
          AudioManager.playClick();
          openRegistrationModal(btn.dataset.id);
        };
      });
      document.querySelectorAll(".favorite-toggle-btn").forEach((btn) => {
        btn.onclick = (e) => {
          e.stopPropagation();
          AudioManager.playClick();
          const id = btn.dataset.id;
          const isFav = StorageManager.toggleFavorite(id);
          const svg = btn.querySelector("svg");
          if (svg) {
            if (isFav) {
              svg.classList.add("fill-rose-500", "text-rose-500");
              svg.classList.remove("fill-none");
              showToast("Added to saved favorites \u2764\uFE0F", "success", 2e3);
            } else {
              svg.classList.remove("fill-rose-500", "text-rose-500");
              svg.classList.add("fill-none");
              showToast("Removed from saved", "info", 2e3);
            }
          }
        };
      });
    }
    function openEventDetailsModal(eventId) {
      const event = StorageManager.getEventById(eventId);
      if (!event) return;
      AppState.selectedEvent = event;
      const spotsLeft = Math.max(0, event.totalCapacity - (event.bookedCount || 0));
      const isSoldOut = spotsLeft <= 0;
      const badgeCategoryClass = `cat-pill cat-pill-${event.categoryKey || "tech"}`;
      const formattedPrice = CurrencyManager.formatPrice(event.price, event.isFree);
      const speakersHTML = (event.speakers || []).map((sp) => `
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
        <img src="${sp.avatar}" alt="${sp.name}" class="w-14 h-14 rounded-2xl object-cover shrink-0" />
        <div>
          <h5 class="text-base font-bold text-zinc-900 dark:text-zinc-100">${sp.name}</h5>
          <p class="text-xs text-zinc-400 font-medium">${sp.role}</p>
        </div>
      </div>
    `).join("");
      const agendaHTML = (event.agenda || []).map((item) => `
      <div class="flex gap-4 items-start relative pl-6 pb-6 last:pb-0 border-l-2 border-indigo-500/40 ml-2">
        <span class="absolute -left-2 top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white dark:border-zinc-900"></span>
        <div>
          <span class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">${item.time}</span>
          <h5 class="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">${item.title}</h5>
        </div>
      </div>
    `).join("");
      const perksHTML = (event.perks || []).map((perk) => `
      <li class="flex items-center gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-semibold">
        <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
        <span>${perk}</span>
      </li>
    `).join("");
      const reviews = event.reviews || [
        { id: "rev-1", author: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", rating: 5, comment: "Incredible lineup and seamless check-in last year. Definitely attending again!", date: "2 weeks ago" },
        { id: "rev-2", author: "Dr. Evelyn Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", rating: 5, comment: "Top-tier keynotes and valuable networking with industry peers.", date: "1 month ago" }
      ];
      const reviewsHTML = reviews.map((r) => `
      <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="${r.avatar}" alt="${r.author}" class="w-8 h-8 rounded-full object-cover" />
            <div>
              <h6 class="text-xs font-bold text-zinc-900 dark:text-zinc-100">${r.author}</h6>
              <span class="text-[10px] text-zinc-400">${r.date}</span>
            </div>
          </div>
          <div class="flex text-amber-400 text-xs">
            ${"\u2605".repeat(r.rating)}${"\u2606".repeat(5 - r.rating)}
          </div>
        </div>
        <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${r.comment}</p>
      </div>
    `).join("");
      DOM.eventDetailsContent.innerHTML = `
      <div class="relative h-72 sm:h-96 w-full overflow-hidden">
        <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

        <span class="absolute top-6 left-6 ${badgeCategoryClass} shadow-xl">
          ${event.category}
        </span>

        <div class="absolute bottom-6 left-6 right-6 text-white">
          <div class="flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-300 mb-2 font-bold">
            <span>${event.displayDate}</span>
            <span>\u2022</span>
            <span>${event.time}</span>
          </div>
          <h2 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            ${event.title}
          </h2>
        </div>
      </div>

      <div class="p-6 sm:p-10 space-y-8">
        <!-- Key Meta Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm">
          <div>
            <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Pass Price</span>
            <p class="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">${formattedPrice}</p>
          </div>
          <div>
            <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Venue</span>
            <p class="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">${event.venue}</p>
          </div>
          <div>
            <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Location</span>
            <p class="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">${event.city}</p>
          </div>
          <div>
            <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Availability</span>
            <p class="font-bold font-mono ${isSoldOut ? "text-rose-500" : "text-emerald-500"} mt-0.5">
              ${isSoldOut ? "Sold Out" : `${spotsLeft} spots available`}
            </p>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-2">Event Overview</h4>
          <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            ${event.description}
          </p>
        </div>

        ${event.speakers && event.speakers.length > 0 ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-4">Distinguished Speakers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${speakersHTML}
            </div>
          </div>
        ` : ""}

        ${event.agenda && event.agenda.length > 0 ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-4">Event Schedule</h4>
            <div>${agendaHTML}</div>
          </div>
        ` : ""}

        ${event.perks && event.perks.length > 0 ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-3">Included with Your Pass</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${perksHTML}
            </ul>
          </div>
        ` : ""}

        <!-- Community Reviews -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">Attendee Feedback & Reviews</h4>
            <span class="text-xs font-bold text-amber-500 flex items-center gap-1">
              \u2605 4.9 <span class="text-zinc-400 font-normal">(${reviews.length} reviews)</span>
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${reviewsHTML}
          </div>
        </div>

        <!-- Organizer -->
        <div class="flex items-center justify-between p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
          <div class="flex items-center gap-3.5">
            <img src="${event.organizer.avatar}" alt="${event.organizer.name}" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Host & Organizer</span>
              <p class="text-base font-bold text-zinc-900 dark:text-zinc-100">${event.organizer.name}</p>
            </div>
          </div>
          <a href="mailto:${event.organizer.email}" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact Host \u2192
          </a>
        </div>
      </div>

      <!-- Sticky Footer CTA -->
      <div class="sticky bottom-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-6 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Admission Pass</span>
          <span class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${formattedPrice}</span>
        </div>
        <button id="modal-register-cta-btn" class="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-40" ${isSoldOut ? "disabled" : ""}>
          ${isSoldOut ? "Sold Out" : "Register Now \u2192"}
        </button>
      </div>
    `;
      const registerCta = document.getElementById("modal-register-cta-btn");
      if (registerCta) {
        registerCta.onclick = () => {
          AudioManager.playClick();
          closeModal(DOM.eventDetailsModal);
          openRegistrationModal(event.id);
        };
      }
      AudioManager.playWhoosh();
      openModal(DOM.eventDetailsModal);
    }
    function openRegistrationModal(eventId) {
      const event = StorageManager.getEventById(eventId);
      if (!event) return;
      AppState.selectedEvent = event;
      const spotsLeft = Math.max(0, event.totalCapacity - (event.bookedCount || 0));
      if (spotsLeft <= 0) {
        showToast("This event has sold out.", "error");
        return;
      }
      DOM.regEventSummary.innerHTML = `
      <div class="flex items-center gap-3.5 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/50">
        <img src="${event.image}" alt="${event.title}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${event.category}</span>
          <h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">${event.title}</h4>
          <p class="text-xs text-zinc-400 mt-0.5 truncate">${event.displayDate} \u2022 ${event.venue}</p>
        </div>
      </div>
    `;
      DOM.registrationForm.reset();
      document.querySelectorAll(".form-error").forEach((el) => el.classList.add("hidden"));
      document.querySelectorAll("#registration-form input").forEach((input) => {
        FormValidator.resetFieldStatus(input);
      });
      updateRegistrationTotal();
      AudioManager.playWhoosh();
      openModal(DOM.registrationModal);
    }
    function updateRegistrationTotal() {
      if (!AppState.selectedEvent) return;
      const count = parseInt(DOM.regTicketCount.value, 10) || 1;
      const tier = DOM.regTicketTier.value;
      let multiplier = 1;
      if (tier === "vip") multiplier = 1.6;
      if (tier === "student") multiplier = 0.7;
      const baseUsdPrice = AppState.selectedEvent.isFree ? 0 : AppState.selectedEvent.price;
      const finalUsdTotal = Math.round(baseUsdPrice * count * multiplier);
      DOM.regPriceTotal.textContent = CurrencyManager.formatPrice(finalUsdTotal, AppState.selectedEvent.isFree);
    }
    DOM.regTicketCount.addEventListener("change", updateRegistrationTotal);
    DOM.regTicketTier.addEventListener("change", updateRegistrationTotal);
    function setupLiveFormValidation() {
      const nameInput = document.getElementById("reg-name");
      const nameError = document.getElementById("reg-name-error");
      const emailInput = document.getElementById("reg-email");
      const emailError = document.getElementById("reg-email-error");
      const phoneInput = document.getElementById("reg-phone");
      const phoneError = document.getElementById("reg-phone-error");
      const termsInput = document.getElementById("reg-terms");
      const termsError = document.getElementById("reg-terms-error");
      nameInput.addEventListener("blur", () => {
        const res = FormValidator.validateName(nameInput.value);
        FormValidator.setFieldStatus(nameInput, nameError, res);
      });
      emailInput.addEventListener("blur", () => {
        const res = FormValidator.validateEmail(emailInput.value);
        FormValidator.setFieldStatus(emailInput, emailError, res);
      });
      phoneInput.addEventListener("blur", () => {
        const res = FormValidator.validatePhone(phoneInput.value);
        FormValidator.setFieldStatus(phoneInput, phoneError, res);
      });
      termsInput.addEventListener("change", () => {
        const res = FormValidator.validateTerms(termsInput.checked);
        if (termsError) {
          if (res.valid) termsError.classList.add("hidden");
          else {
            termsError.textContent = res.message;
            termsError.classList.remove("hidden");
          }
        }
      });
      DOM.registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!AppState.selectedEvent) return;
        const spotsLeft = Math.max(0, AppState.selectedEvent.totalCapacity - (AppState.selectedEvent.bookedCount || 0));
        const formData = {
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          ticketCount: parseInt(DOM.regTicketCount.value, 10),
          ticketTier: DOM.regTicketTier.value,
          terms: termsInput.checked,
          notes: document.getElementById("reg-notes")?.value || ""
        };
        const validation = FormValidator.validateAll(formData, spotsLeft);
        FormValidator.setFieldStatus(nameInput, nameError, FormValidator.validateName(formData.name));
        FormValidator.setFieldStatus(emailInput, emailError, FormValidator.validateEmail(formData.email));
        FormValidator.setFieldStatus(phoneInput, phoneError, FormValidator.validatePhone(formData.phone));
        if (!formData.terms && termsError) {
          termsError.textContent = "Please accept the terms to complete registration.";
          termsError.classList.remove("hidden");
        }
        if (!validation.isValid) {
          showToast("Please check the form for errors.", "error");
          return;
        }
        DOM.regSubmitBtn.disabled = true;
        const originalText = DOM.regSubmitBtn.innerHTML;
        DOM.regSubmitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
          Securing Your Spot...
        </span>
      `;
        setTimeout(() => {
          const tierName = formData.ticketTier === "vip" ? "VIP All-Access" : formData.ticketTier === "student" ? "Student Pass" : "Standard Pass";
          const newBooking = StorageManager.saveRegistration({
            eventId: AppState.selectedEvent.id,
            eventTitle: AppState.selectedEvent.title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            ticketCount: formData.ticketCount,
            ticketTier: tierName,
            notes: formData.notes
          });
          AudioManager.playSuccess();
          AnimationOrchestrator.triggerConfetti();
          AppState.events = StorageManager.getEvents();
          AppState.selectedEvent = StorageManager.getEventById(AppState.selectedEvent.id);
          filterAndRenderEvents();
          updateBookingsCount();
          setupSpotlightEvent();
          DOM.regSubmitBtn.disabled = false;
          DOM.regSubmitBtn.innerHTML = originalText;
          closeModal(DOM.registrationModal);
          openTicketModal(newBooking, AppState.selectedEvent);
          showToast("\u{1F389} Pass confirmed! Boarding pass generated.", "success", 3500);
        }, 650);
      });
    }
    function openTicketModal(booking, event) {
      AppState.currentTicketBooking = { booking, event };
      DOM.ticketContainer.innerHTML = TicketManager.renderTicketHTML(booking, event);
      AudioManager.playWhoosh();
      openModal(DOM.ticketModal);
    }
    DOM.printTicketBtn.onclick = () => {
      AudioManager.playClick();
      TicketManager.printTicket();
    };
    DOM.downloadIcsBtn.onclick = () => {
      if (AppState.currentTicketBooking) {
        AudioManager.playClick();
        const { booking, event } = AppState.currentTicketBooking;
        TicketManager.downloadCalendarICS(booking, event);
        showToast("\u{1F4C5} Calendar pass downloaded (.ics)!", "success");
      }
    };
    DOM.viewBookingsFromTicketBtn.onclick = () => {
      AudioManager.playClick();
      closeModal(DOM.ticketModal);
      openBookingsDrawer();
    };
    function openBookingsDrawer() {
      AudioManager.playClick();
      renderBookingsList();
      DOM.bookingsDrawer.classList.remove("translate-x-full");
      document.body.classList.add("overflow-hidden");
    }
    function closeBookingsDrawer() {
      AudioManager.playClick();
      DOM.bookingsDrawer.classList.add("translate-x-full");
      document.body.classList.remove("overflow-hidden");
    }
    function renderBookingsList() {
      const registrations = StorageManager.getRegistrations();
      updateBookingsCount();
      if (registrations.length === 0) {
        DOM.bookingsList.innerHTML = "";
        DOM.emptyBookingsNotice.classList.remove("hidden");
        return;
      }
      DOM.emptyBookingsNotice.classList.add("hidden");
      DOM.bookingsList.innerHTML = registrations.map((reg) => {
        const ev = StorageManager.getEventById(reg.eventId) || {
          title: reg.eventTitle || "Event",
          displayDate: "Upcoming",
          venue: "Venue",
          city: "",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
        };
        const dateBookedStr = new Date(reg.timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        return `
        <div class="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3.5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                #${reg.bookingId}
              </span>
              <h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">${ev.title}</h4>
              <p class="text-xs text-zinc-400 mt-0.5">${ev.displayDate} \u2022 ${ev.venue}</p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${reg.checkedIn ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"} shrink-0">
              ${reg.checkedIn ? "Checked In" : "Confirmed"}
            </span>
          </div>

          <div class="text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-2.5 font-mono">
            <span>${reg.ticketTier} \u2022 ${reg.ticketCount} seat${reg.ticketCount > 1 ? "s" : ""}</span>
            <span>${dateBookedStr}</span>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <button class="view-single-ticket-btn flex-1 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold transition-colors" data-booking="${reg.bookingId}">
              View Pass
            </button>
            <button class="cancel-booking-btn py-2 px-3.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-colors" data-booking="${reg.bookingId}">
              Cancel
            </button>
          </div>
        </div>
      `;
      }).join("");
      DOM.bookingsList.querySelectorAll(".view-single-ticket-btn").forEach((btn) => {
        btn.onclick = () => {
          AudioManager.playClick();
          const bookingId = btn.dataset.booking;
          const booking = StorageManager.getRegistrations().find((b) => b.bookingId === bookingId);
          if (booking) {
            const event = StorageManager.getEventById(booking.eventId);
            if (event) {
              closeBookingsDrawer();
              openTicketModal(booking, event);
            }
          }
        };
      });
      DOM.bookingsList.querySelectorAll(".cancel-booking-btn").forEach((btn) => {
        btn.onclick = () => {
          AudioManager.playClick();
          const bookingId = btn.dataset.booking;
          if (confirm("Cancel this registration? Your reserved spot will be released.")) {
            StorageManager.cancelRegistration(bookingId);
            AppState.events = StorageManager.getEvents();
            filterAndRenderEvents();
            renderBookingsList();
            setupSpotlightEvent();
            showToast("Registration cancelled and spot released.", "info");
          }
        };
      });
    }
    DOM.myBookingsBtn.onclick = openBookingsDrawer;
    DOM.closeBookingsBtn.onclick = closeBookingsDrawer;
    if (DOM.exportJsonBtn) {
      DOM.exportJsonBtn.onclick = () => {
        AudioManager.playClick();
        StorageManager.exportBookingsJSON();
        showToast("Exported passes to JSON file \u{1F4C1}", "success");
      };
    }
    if (DOM.exportCsvBtn) {
      DOM.exportCsvBtn.onclick = () => {
        AudioManager.playClick();
        StorageManager.exportBookingsCSV();
        showToast("Exported passes to CSV file \u{1F4CA}", "success");
      };
    }
    function setupScannerModal() {
      if (!DOM.scannerModalBtn || !DOM.scannerModal || !DOM.scannerForm) return;
      DOM.scannerModalBtn.onclick = () => {
        AudioManager.playClick();
        if (DOM.scannerResultContainer) DOM.scannerResultContainer.innerHTML = "";
        if (DOM.scannerInput) DOM.scannerInput.value = "";
        openModal(DOM.scannerModal);
      };
      if (DOM.closeScannerBtn) {
        DOM.closeScannerBtn.onclick = () => closeModal(DOM.scannerModal);
      }
      DOM.scannerForm.onsubmit = (e) => {
        e.preventDefault();
        if (!DOM.scannerInput || !DOM.scannerResultContainer) return;
        const code = DOM.scannerInput.value.trim();
        if (!code) {
          showToast("Please enter a booking reference or QR code payload.", "error");
          return;
        }
        const res = TicketScannerComponent.verifyPass(code);
        if (res.success && res.detailsHtml) {
          DOM.scannerResultContainer.innerHTML = res.detailsHtml;
          showToast("\u2713 Pass verified and attendee checked in!", "success");
          AppState.events = StorageManager.getEvents();
          updateBookingsCount();
        } else {
          DOM.scannerResultContainer.innerHTML = `
          <div class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs font-semibold">
            ${res.message}
          </div>
        `;
          showToast(res.message, "error");
        }
      };
    }
    function setupHostEventWorkflow() {
      const openHostModal = () => {
        AudioManager.playClick();
        openModal(DOM.hostEventModal);
      };
      if (DOM.hostEventBtn) DOM.hostEventBtn.onclick = openHostModal;
      if (DOM.heroHostBtn) DOM.heroHostBtn.onclick = openHostModal;
      DOM.hostEventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("host-title").value.trim();
        const category = document.getElementById("host-category").value;
        const dateVal = document.getElementById("host-date").value;
        const timeVal = document.getElementById("host-time").value.trim();
        const venue = document.getElementById("host-venue").value.trim();
        const city = document.getElementById("host-city").value.trim();
        const price = parseFloat(document.getElementById("host-price").value) || 0;
        const capacity = parseInt(document.getElementById("host-capacity").value, 10) || 100;
        const image = document.getElementById("host-image")?.value.trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";
        const shortDesc = document.getElementById("host-short-desc").value.trim();
        if (!title || !dateVal || !timeVal || !venue || !shortDesc) {
          showToast("Please fill in required fields.", "error");
          return;
        }
        const catKeyMap = {
          Technology: "tech",
          Music: "music",
          Design: "design",
          Business: "business",
          Sports: "sports",
          Workshops: "workshop"
        };
        const eventDateObj = new Date(dateVal);
        const displayDate = eventDateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        const newEvent = {
          id: "evt-custom-" + Date.now(),
          title,
          category,
          categoryKey: catKeyMap[category] || "tech",
          tag: "Community",
          featured: false,
          date: dateVal + "T" + (timeVal.includes(":") ? timeVal : "09:00:00"),
          displayDate,
          time: timeVal,
          venue,
          city: city || "Global / Hybrid",
          price,
          isFree: price === 0,
          totalCapacity: capacity,
          bookedCount: 0,
          image,
          shortDesc,
          description: shortDesc,
          organizer: {
            name: "Community Organizer",
            email: "host@pulseevent.io",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
          },
          speakers: [
            { name: "Event Host", role: "Organizer & Facilitator", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
          ],
          agenda: [
            { time: "Start", title: "Keynote & Overview" },
            { time: "Session", title: "Main Interactive Workshop" }
          ],
          perks: ["Admission pass", "Resource toolkit"]
        };
        StorageManager.addCustomEvent(newEvent);
        AppState.events = StorageManager.getEvents();
        filterAndRenderEvents();
        DOM.hostEventForm.reset();
        closeModal(DOM.hostEventModal);
        AudioManager.playSuccess();
        AnimationOrchestrator.triggerConfetti();
        showToast("\u{1F680} Event published to platform!", "success");
      });
    }
    function openModal(modalEl) {
      if (!modalEl) return;
      modalEl.classList.remove("hidden");
      modalEl.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }
    function closeModal(modalEl) {
      if (!modalEl) return;
      modalEl.classList.add("hidden");
      modalEl.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }
    [
      { btn: DOM.closeDetailsBtn, modal: DOM.eventDetailsModal },
      { btn: DOM.closeRegBtn, modal: DOM.registrationModal },
      { btn: DOM.closeTicketBtn, modal: DOM.ticketModal },
      { btn: DOM.closeHostBtn, modal: DOM.hostEventModal },
      { btn: DOM.closeScannerBtn, modal: DOM.scannerModal }
    ].forEach(({ btn, modal }) => {
      if (btn && modal) {
        btn.onclick = () => {
          AudioManager.playClick();
          closeModal(modal);
        };
      }
    });
    [DOM.eventDetailsModal, DOM.registrationModal, DOM.ticketModal, DOM.hostEventModal, DOM.scannerModal].forEach((modal) => {
      if (modal) {
        modal.onclick = (e) => {
          if (e.target === modal) {
            AudioManager.playClick();
            closeModal(modal);
          }
        };
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(DOM.eventDetailsModal);
        closeModal(DOM.registrationModal);
        closeModal(DOM.ticketModal);
        closeModal(DOM.hostEventModal);
        closeModal(DOM.scannerModal);
        closeBookingsDrawer();
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        DOM.searchInput.focus();
        DOM.searchInput.select();
      }
    });
    function setupSearchAndFilters() {
      let searchDebounceTimer;
      DOM.searchInput.addEventListener("input", (e) => {
        clearTimeout(searchDebounceTimer);
        const val = e.target.value;
        if (val.trim()) {
          DOM.searchClearBtn.classList.remove("hidden");
        } else {
          DOM.searchClearBtn.classList.add("hidden");
        }
        searchDebounceTimer = setTimeout(() => {
          AppState.filters.search = val;
          filterAndRenderEvents();
        }, 150);
      });
      DOM.searchClearBtn.onclick = () => {
        AudioManager.playClick();
        DOM.searchInput.value = "";
        DOM.searchClearBtn.classList.add("hidden");
        AppState.filters.search = "";
        filterAndRenderEvents();
        DOM.searchInput.focus();
      };
      const pills = DOM.categoryPillsContainer.querySelectorAll("button");
      pills.forEach((pill) => {
        pill.onclick = () => {
          AudioManager.playClick();
          pills.forEach((p) => {
            p.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");
            p.classList.add("text-zinc-500", "dark:text-zinc-400");
          });
          pill.classList.remove("text-zinc-500", "dark:text-zinc-400");
          pill.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");
          AppState.filters.category = pill.dataset.category || "all";
          filterAndRenderEvents();
        };
      });
      document.querySelectorAll(".quick-cat-card").forEach((card) => {
        card.onclick = () => {
          AudioManager.playClick();
          const cat = card.dataset.category;
          const targetPill = Array.from(pills).find((p) => p.dataset.category === cat);
          if (targetPill) targetPill.click();
          const exploreSection = document.getElementById("explore-section");
          if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
        };
      });
      DOM.dateFilterSelect.onchange = (e) => {
        AudioManager.playClick();
        AppState.filters.dateFilter = e.target.value;
        filterAndRenderEvents();
      };
      DOM.priceFilterSelect.onchange = (e) => {
        AudioManager.playClick();
        AppState.filters.priceFilter = e.target.value;
        filterAndRenderEvents();
      };
      DOM.sortSelect.onchange = (e) => {
        AudioManager.playClick();
        AppState.filters.sortBy = e.target.value;
        filterAndRenderEvents();
      };
      DOM.resetFiltersBtn.onclick = () => {
        AudioManager.playClick();
        AppState.filters = {
          category: "all",
          search: "",
          dateFilter: "all",
          priceFilter: "all",
          sortBy: "date-asc",
          selectedDate: null
        };
        DOM.searchInput.value = "";
        DOM.searchClearBtn.classList.add("hidden");
        DOM.dateFilterSelect.value = "all";
        DOM.priceFilterSelect.value = "all";
        DOM.sortSelect.value = "date-asc";
        pills.forEach((p) => {
          if (p.dataset.category === "all") {
            p.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");
            p.classList.remove("text-zinc-500", "dark:text-zinc-400");
          } else {
            p.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");
            p.classList.add("text-zinc-500", "dark:text-zinc-400");
          }
        });
        filterAndRenderEvents();
        showToast("Filters reset", "info", 1500);
      };
      const updateViewButtons = (mode) => {
        [DOM.viewGridBtn, DOM.viewListBtn, DOM.viewCalendarBtn].forEach((btn) => {
          if (!btn) return;
          btn.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
          btn.classList.add("text-zinc-400");
        });
        if (mode === "grid" && DOM.viewGridBtn) {
          DOM.viewGridBtn.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
          DOM.viewGridBtn.classList.remove("text-zinc-400");
        } else if (mode === "list" && DOM.viewListBtn) {
          DOM.viewListBtn.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
          DOM.viewListBtn.classList.remove("text-zinc-400");
        } else if (mode === "calendar" && DOM.viewCalendarBtn) {
          DOM.viewCalendarBtn.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
          DOM.viewCalendarBtn.classList.remove("text-zinc-400");
        }
      };
      DOM.viewGridBtn.onclick = () => {
        AudioManager.playClick();
        AppState.viewMode = "grid";
        updateViewButtons("grid");
        renderEventsList();
      };
      DOM.viewListBtn.onclick = () => {
        AudioManager.playClick();
        AppState.viewMode = "list";
        updateViewButtons("list");
        renderEventsList();
      };
      if (DOM.viewCalendarBtn) {
        DOM.viewCalendarBtn.onclick = () => {
          AudioManager.playClick();
          AppState.viewMode = "calendar";
          updateViewButtons("calendar");
          renderEventsList();
        };
      }
      CalendarViewComponent.init((selectedDateStr) => {
        AppState.filters.selectedDate = selectedDateStr;
        if (selectedDateStr) {
          showToast(`Filtered events for ${selectedDateStr}`, "info", 2e3);
        }
      });
      if (DOM.heroExploreBtn) {
        DOM.heroExploreBtn.onclick = () => {
          AudioManager.playClick();
          const exploreSection = document.getElementById("explore-section");
          if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
        };
      }
      if (DOM.mobileMenuBtn && DOM.mobileMenuDrawer) {
        DOM.mobileMenuBtn.onclick = () => {
          AudioManager.playClick();
          DOM.mobileMenuDrawer.classList.toggle("hidden");
        };
        DOM.mobileMenuDrawer.querySelectorAll("a, button").forEach((item) => {
          item.onclick = () => DOM.mobileMenuDrawer.classList.add("hidden");
        });
      }
      const newsletterForm = document.getElementById("newsletter-form");
      if (newsletterForm) {
        newsletterForm.onsubmit = (e) => {
          e.preventDefault();
          const input = document.getElementById("newsletter-email");
          if (input && FormValidator.validateEmail(input.value).valid) {
            AudioManager.playSuccess();
            AnimationOrchestrator.triggerConfetti();
            showToast("\u{1F389} Subscribed to EventPulse community digest!", "success");
            input.value = "";
          } else {
            showToast("Please enter a valid email address.", "error");
          }
        };
      }
    }
    function init() {
      StorageManager.init(INITIAL_EVENTS);
      initTheme();
      initAudioToggle();
      initCurrency();
      AnimationOrchestrator.init();
      AppState.events = StorageManager.getEvents();
      setupSpotlightEvent();
      setupSearchAndFilters();
      setupLiveFormValidation();
      setupHostEventWorkflow();
      setupScannerModal();
      filterAndRenderEvents();
      updateBookingsCount();
    }
    init();
  });
})();
