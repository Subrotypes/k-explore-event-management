# ⚡ PulseEvent — Next-Gen Event Management Platform (TypeScript & GSAP)
> **K Explore – Web Designing Challenge**  
> **Task Title:** Design and Develop a Responsive Event Management Website  
> **Author / Student:** K Explore Participant  
> **Tech Stack:** TypeScript, HTML5, CSS3, Tailwind CSS, GreenSock GSAP 3, ScrollTrigger, Lenis Smooth Scroll, Canvas Confetti, Web Audio API, LocalStorage  

[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Checked-blue?style=for-the-badge&logo=typescript)](tsconfig.json)
[![Animations](https://img.shields.io/badge/Animations-GSAP%203%20%2B%20Lenis-purple?style=for-the-badge)](https://greensock.com)
[![Tests](https://img.shields.io/badge/Tests-55%2F55%20Passing-brightgreen?style=for-the-badge)](tests/ts-test-suite.js)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

---

## 📌 1. Project Overview & Problem Statement

**PulseEvent** is an ultra-modern, fully responsive event management and ticketing platform engineered to deliver an exceptional user experience across mobile phones, tablets, and desktop computers.

Built with **TypeScript** for strict type safety and orchestrated with **GSAP 3, ScrollTrigger, and Lenis Smooth Scroll**, the platform provides:
1. **Interactive Event Discovery**: Handpicked events across Technology, Music, Product Design, Business, Sports, and Hands-on Workshops.
2. **Multi-View Catalog Modes**: Switch seamlessly between **3-Column Card Grid**, **Detailed Horizontal List View**, and an **Interactive Month Calendar Grid**.
3. **Advanced Filtering & Multi-Currency**: Instant search, category pills, date filters, price brackets, and global currency conversion (**USD `$`, EUR `€`, GBP `£`, INR `₹`, CAD `CA$`**).
4. **Rich Event Details & Community Reviews**: Complete agendas, keynote speaker cards, attendee perks, and authentic community reviews with star ratings.
5. **Real-Time Client Form Validation**: Strict validation for attendee name, email, phone number, ticket tier, seat limits, and consent terms.
6. **Digital Boarding Pass Ticket**: Real-time vector QR code generator, RFC 5545 `.ics` iCalendar export, and print/PDF formatting.
7. **Organizer Ticket Scanner & Verification**: Built-in verification tool that parses booking IDs and QR tokens, validates ticket authenticity, and checks in attendees with audio feedback and confetti.
8. **Export Passes**: Attendees and organizers can export registered passes to **JSON** or **CSV** with one click.
9. **Sound Design (Web Audio API)**: Zero-audio-asset procedural audio synthesizer providing subtle micro-clicks, whooshes, and celebratory chimes (with a navbar mute toggle).

---

## 🚀 2. Live Demo & Repository

- **GitHub Repository:** `https://github.com/<your-username>/k-explore-event-management`
- **Live Deployed Website:** 
  - **Vercel:** `https://pulse-event-k-explore.vercel.app`
  - **Netlify:** `https://pulse-event-k-explore.netlify.app`
  - **GitHub Pages:** `https://<your-username>.github.io/k-explore-event-management/`

---

## 🎬 3. Animation Frameworks & Physics

| Framework | Role in Platform |
| :--- | :--- |
| **GreenSock GSAP 3** | High-performance timeline animation engine for hero word-by-word staggered entrance, spotlight card reveals, and dynamic event card entrance animations. |
| **GSAP ScrollTrigger** | Scroll-driven parallax on the hero spotlight image, scroll-triggered section fade-ups, and scroll reading progress bar synchronization. |
| **Lenis Smooth Scroll** | Inertial momentum scrolling providing a fluid 60Hz/120Hz luxury agency feel across all viewports. |
| **Canvas Confetti** | Multi-stage physics particle confetti burst on successful pass booking and ticket verification check-in. |
| **Magnetic Cursor Physics** | Interactive buttons (`.magnetic-btn`) that subtly follow cursor position with elastic return physics. |
| **3D Perspective Card Tilt** | Interactive cursor-following tilt with dynamic radial glare reflections on desktop cards. |

---

## ✨ 4. Key Functional Features

### 📅 A. Interactive Month Calendar View
- Displays a responsive monthly calendar grid.
- Highlights days that have scheduled events with color indicators and event preview pills.
- Clicking any date filters and displays the exact events happening on that day.
- Easy month-to-month navigation with previous/next controls.

### 🌐 B. Multi-Currency Global Converter
- Real-time currency selector in the header (**USD `$`, EUR `€`, GBP `£`, INR `₹`, CAD `CA$`**).
- Dynamically recalculates and formats prices across the hero spotlight, catalog cards, filter results, registration modal, and generated boarding pass.

### 🎟️ C. Digital Boarding Pass Ticket
- Deterministic vector QR code SVG rendered locally without third-party image tracking.
- One-click RFC 5545 iCalendar (`.ics`) file download that syncs to Google Calendar, Apple Calendar, and Outlook.
- Clean printable boarding pass layout formatted for print and PDF export.

### 🔍 D. Organizer Ticket Scanner & Check-in Tool
- Dedicated verification portal accessible directly from the header.
- Enter a booking reference ID (`PLS-XXXXXX`) or paste QR code JSON data.
- Instantly verifies ticket authenticity, marks attendee as **Checked In**, displays attendee identity, and triggers celebratory chime + confetti!
- Prevents duplicate check-ins with clear warning indicators.

### 📁 E. Local Data Management & Export
- LocalStorage persistence for events, registrations, favorites, theme, and audio preferences.
- Cancelling a registration immediately restores available seat capacity.
- Attendees and organizers can export registered passes to **JSON** or **CSV** anytime from the "My Passes" drawer.

### 🔊 F. Web Audio API Sound Design
- Custom synthesized sound effects built with the Web Audio API (zero audio files needed).
- Includes micro-clicks for buttons, smooth whoosh for modal reveals, and a 4-note harmonious chime for completed reservations.
- Accessible mute/unmute toggle in the navbar.

---

## 💻 5. TypeScript Project Architecture

```
k-explore-web-designing/
├── src/                          # TypeScript Source Code
│   ├── types/
│   │   └── index.ts              # Strongly typed interfaces & domain models
│   ├── data/
│   │   └── events.ts             # Curated seed events dataset
│   ├── services/
│   │   ├── storage.ts            # LocalStorage CRUD & export manager
│   │   ├── validation.ts         # Form validation engine
│   │   ├── ticket.ts             # QR Code SVG, iCal & Boarding Pass generator
│   │   ├── currency.ts           # Multi-currency converter
│   │   └── audio.ts              # Web Audio API procedural sound engine
│   ├── animations/
│   │   └── gsap-orchestrator.ts  # GSAP, ScrollTrigger, Lenis & Confetti
│   ├── components/
│   │   ├── calendar.ts           # Interactive month calendar grid component
│   │   └── scanner.ts            # Pass scanner & verification tool
│   └── app.ts                    # Main application orchestrator
├── dist/                         # Compiled JavaScript modules
├── js/
│   └── bundle.js                 # Production self-executing bundle (IIFE)
├── css/
│   └── styles.css                # Plus Jakarta Sans, scroll reveal & tilt styling
├── tests/
│   ├── test-suite.js             # 30 Core automated unit tests
│   └── ts-test-suite.js          # 25 TypeScript advanced feature tests
├── index.html                    # Responsive semantic HTML5 single-page application
├── tsconfig.json                 # Strict TypeScript configuration
├── package.json                  # Scripts, dependencies & project metadata
└── README.md                     # Comprehensive project documentation
```

---

## 🛠️ 6. Getting Started & Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/k-explore-event-management.git
cd k-explore-event-management

# Install dependencies (TypeScript & esbuild)
npm install
```

### Available Scripts
```bash
# Typecheck TypeScript source files
npm run typecheck

# Build and bundle TypeScript to js/bundle.js
npm run build

# Run complete automated test suite (55 tests)
npm test

# Serve locally on port 3000
npm run serve
```

---

## 🧪 7. Automated Test Suite (55 Passing Tests)

The project includes two automated test suites covering data integrity, storage operations, input validation, currency conversion, ticket generation, and scanner check-ins:

```
=== RUNNING PULSEEVENT AUTOMATED TEST SUITE ===
[PASS] Seed events dataset contains at least 12 events
[PASS] At least one event is marked as featured for the spotlight banner
[PASS] Every event has valid ID, title, category, date, venue, capacity, and image
[PASS] StorageManager initializes correctly with seed data
[PASS] StorageManager generates formatted booking reference ID
[PASS] Registration is properly saved and retrievable
[PASS] Event bookedCount increments accurately upon registration
[PASS] StorageManager cancels registration successfully
[PASS] Cancelling registration restores spots back to the event capacity
[PASS] Event is initially not favorited
[PASS] toggleFavorite marks event as favorite
[PASS] toggleFavorite removes event from favorites
[PASS] Valid full name passes
[PASS] Empty name fails
[PASS] Name with <3 chars fails
[PASS] Name with numbers fails
[PASS] Standard email passes
[PASS] Complex email passes
[PASS] Invalid email fails
[PASS] Email without TLD fails
[PASS] 10-digit phone passes
[PASS] Formatted phone passes
[PASS] Short phone fails
[PASS] Valid ticket count passes
[PASS] Exceeding max (5) tickets fails
[PASS] Tickets exceeding available spots fails
[PASS] Checked terms passes
[PASS] Unchecked terms fails
[PASS] QR Code SVG renders valid vector markup
[PASS] Ticket HTML renders booking reference and attendee details

=== RUNNING TYPESCRIPT ADVANCED FEATURES TEST SUITE ===
[PASS] TypeScript source file exists: src/types/index.ts
[PASS] TypeScript source file exists: src/data/events.ts
[PASS] TypeScript source file exists: src/services/storage.ts
[PASS] TypeScript source file exists: src/services/validation.ts
[PASS] TypeScript source file exists: src/services/ticket.ts
[PASS] TypeScript source file exists: src/services/currency.ts
[PASS] TypeScript source file exists: src/services/audio.ts
[PASS] TypeScript source file exists: src/animations/gsap-orchestrator.ts
[PASS] TypeScript source file exists: src/components/calendar.ts
[PASS] TypeScript source file exists: src/components/scanner.ts
[PASS] TypeScript source file exists: src/app.ts
[PASS] Compiled bundle js/bundle.js exists
[PASS] Bundle size is robust (125.9 KB)
[PASS] CurrencyManager formats free event as Free
[PASS] CurrencyManager formats USD default price
[PASS] CurrencyManager converts and formats EUR correctly
[PASS] CurrencyManager converts and formats INR correctly
[PASS] StorageManager loads 12 initial events from TypeScript seed data
[PASS] Booking ID generated with PLS- prefix
[PASS] New booking is initially not checked in
[PASS] Scanner verifies valid booking pass successfully
[PASS] Scanner prevents double check-in of the same pass
[PASS] Scanner rejects non-existent booking ID
[PASS] Successfully added event review to storage
[PASS] Event reviews list updated

========================================
TOTAL: 55 PASSED, 0 FAILED
========================================
```

---

## 📄 8. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
