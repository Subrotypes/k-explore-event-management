/**
 * TypeScript Architecture & Features Automated Test Suite
 * Tests Currency Conversion, Ticket Scanner Check-in, Reviews, and Storage
 */

const fs = require('fs');

// Mock localStorage and window
global.localStorage = {
  _store: {},
  getItem(key) { return this._store[key] || null; },
  setItem(key, val) { this._store[key] = String(val); },
  removeItem(key) { delete this._store[key]; },
  clear() { this._store = {}; }
};
global.window = {
  matchMedia: () => ({ matches: false }),
  print: () => {},
  URL: { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} }
};
global.document = {
  createElement: () => ({ setAttribute: () => {}, click: () => {} }),
  body: { appendChild: () => {}, removeChild: () => {} }
};

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

console.log("=== RUNNING TYPESCRIPT ADVANCED FEATURES TEST SUITE ===");

// 1. Verify TypeScript files exist and have valid structure
const tsFiles = [
  'src/types/index.ts',
  'src/data/events.ts',
  'src/services/storage.ts',
  'src/services/validation.ts',
  'src/services/ticket.ts',
  'src/services/currency.ts',
  'src/services/audio.ts',
  'src/animations/gsap-orchestrator.ts',
  'src/components/calendar.ts',
  'src/components/scanner.ts',
  'src/app.ts'
];

tsFiles.forEach(file => {
  assert(fs.existsSync(file), `TypeScript source file exists: ${file}`);
});

// 2. Check bundle exists and is populated
assert(fs.existsSync('js/bundle.js'), 'Compiled bundle js/bundle.js exists');
const bundleStat = fs.statSync('js/bundle.js');
assert(bundleStat.size > 50000, `Bundle size is robust (${(bundleStat.size / 1024).toFixed(1)} KB)`);

// 3. Test compiled services from dist/
const { CurrencyManager, CURRENCIES } = require('../dist/services/currency.js');
assert(CurrencyManager.formatPrice(0, true) === "Free", "CurrencyManager formats free event as Free");
assert(CurrencyManager.formatPrice(100).includes("$100"), "CurrencyManager formats USD default price");

CurrencyManager.setCurrency("EUR");
assert(CurrencyManager.formatPrice(100).includes("€"), "CurrencyManager converts and formats EUR correctly");

CurrencyManager.setCurrency("INR");
assert(CurrencyManager.formatPrice(100).includes("₹"), "CurrencyManager converts and formats INR correctly");

CurrencyManager.setCurrency("USD"); // Reset

// 4. Test StorageManager from dist/
const { StorageManager } = require('../dist/services/storage.js');
const { INITIAL_EVENTS } = require('../dist/data/events.js');
StorageManager.init(INITIAL_EVENTS);

const events = StorageManager.getEvents();
assert(events.length === 12, "StorageManager loads 12 initial events from TypeScript seed data");

// Test Booking & Check-in Scanner
const booking = StorageManager.saveRegistration({
  eventId: "evt-01",
  eventTitle: "Global AI Summit",
  name: "Marcus Aurelius",
  email: "marcus@rome.com",
  phone: "1234567890",
  ticketCount: 2,
  ticketTier: "VIP All-Access"
});

assert(booking.bookingId.startsWith("PLS-"), "Booking ID generated with PLS- prefix");
assert(booking.checkedIn === false, "New booking is initially not checked in");

// Test Ticket Scanner
const { TicketScannerComponent } = require('../dist/components/scanner.js');
const verifyRes = TicketScannerComponent.verifyPass(booking.bookingId);
assert(verifyRes.success === true, "Scanner verifies valid booking pass successfully");

const secondCheckRes = TicketScannerComponent.verifyPass(booking.bookingId);
assert(secondCheckRes.success === false && secondCheckRes.message.includes("already checked in"), "Scanner prevents double check-in of the same pass");

const invalidCheckRes = TicketScannerComponent.verifyPass("PLS-99999999");
assert(invalidCheckRes.success === false, "Scanner rejects non-existent booking ID");

// 5. Test Review system
const reviewSuccess = StorageManager.addEventReview("evt-01", {
  id: "test-rev-1",
  author: "Leonardo da Vinci",
  avatar: "https://example.com/leo.jpg",
  rating: 5,
  comment: "Masterful symposium on creative engineering.",
  date: "Today"
});
assert(reviewSuccess === true, "Successfully added event review to storage");
const updatedEvent = StorageManager.getEventById("evt-01");
assert(updatedEvent.reviews.length > 0, "Event reviews list updated");

console.log(`\n========================================`);
console.log(`TS TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
}
