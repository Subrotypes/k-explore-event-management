const fs = require('fs');
const vm = require('vm');

// Mock browser localStorage and window environment for Node.js test execution
global.localStorage = {
  _store: {},
  getItem(key) { return this._store[key] || null; },
  setItem(key, val) { this._store[key] = String(val); },
  removeItem(key) { delete this._store[key]; },
  clear() { this._store = {}; }
};
global.window = {
  matchMedia: () => ({ matches: true })
};

// Load modules into global context
vm.runInThisContext(fs.readFileSync('./js/events-data.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/storage.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/validation.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('./js/ticket.js', 'utf8'));

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

console.log("=== RUNNING PULSEEVENT AUTOMATED TEST SUITE ===");

// 1. Dataset Verification
assert(Array.isArray(INITIAL_EVENTS) && INITIAL_EVENTS.length >= 12, "Seed events dataset contains at least 12 events");
const featured = INITIAL_EVENTS.filter(e => e.featured);
assert(featured.length >= 1, "At least one event is marked as featured for the spotlight banner");

// Verify all events have required fields
const allValidFields = INITIAL_EVENTS.every(e => 
  e.id && e.title && e.category && e.date && e.venue && e.totalCapacity > 0 && e.image
);
assert(allValidFields, "Every event has valid ID, title, category, date, venue, capacity, and image");

// 2. Storage Manager Verification
const loadedEvents = StorageManager.getEvents();
assert(loadedEvents.length === INITIAL_EVENTS.length, "StorageManager initializes correctly with seed data");

// Test Registration flow in storage
const testReg = StorageManager.saveRegistration({
  eventId: "evt-01",
  eventTitle: "Global AI & Next-Gen Web Summit 2026",
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  ticketCount: 2,
  ticketTier: "General Admission"
});
assert(testReg.bookingId && testReg.bookingId.startsWith("EP-"), "StorageManager generates formatted booking reference ID");

const regList = StorageManager.getRegistrations();
assert(regList.length === 1 && regList[0].bookingId === testReg.bookingId, "Registration is properly saved and retrievable");

// Verify spots adjustment
const evtAfter = StorageManager.getEventById("evt-01");
assert(evtAfter.bookedCount === INITIAL_EVENTS[0].bookedCount + 2, "Event bookedCount increments accurately upon registration");

// Test Cancel registration
const cancelSuccess = StorageManager.cancelRegistration(testReg.bookingId);
assert(cancelSuccess === true, "StorageManager cancels registration successfully");
const evtAfterCancel = StorageManager.getEventById("evt-01");
assert(evtAfterCancel.bookedCount === INITIAL_EVENTS[0].bookedCount, "Cancelling registration restores spots back to the event capacity");

// Test Favorites
assert(StorageManager.isFavorite("evt-02") === false, "Event is initially not favorited");
StorageManager.toggleFavorite("evt-02");
assert(StorageManager.isFavorite("evt-02") === true, "toggleFavorite marks event as favorite");
StorageManager.toggleFavorite("evt-02");
assert(StorageManager.isFavorite("evt-02") === false, "toggleFavorite removes event from favorites");

// 3. Form Validation Verification
// Name validation
assert(FormValidator.validateName("John Doe").valid === true, "Valid full name passes");
assert(FormValidator.validateName("").valid === false, "Empty name fails");
assert(FormValidator.validateName("Jo").valid === false, "Name with <3 chars fails");
assert(FormValidator.validateName("John123").valid === false, "Name with numbers fails");

// Email validation
assert(FormValidator.validateEmail("alex@domain.com").valid === true, "Standard email passes");
assert(FormValidator.validateEmail("user.name+tag@sub.example.co.uk").valid === true, "Complex email passes");
assert(FormValidator.validateEmail("invalid-email").valid === false, "Invalid email fails");
assert(FormValidator.validateEmail("missing@domain").valid === false, "Email without TLD fails");

// Phone validation
assert(FormValidator.validatePhone("9876543210").valid === true, "10-digit phone passes");
assert(FormValidator.validatePhone("(555) 234-5678").valid === true, "Formatted phone passes");
assert(FormValidator.validatePhone("123").valid === false, "Short phone fails");

// Ticket validation
assert(FormValidator.validateTickets(2, 50).valid === true, "Valid ticket count passes");
assert(FormValidator.validateTickets(6, 50).valid === false, "Exceeding max (5) tickets fails");
assert(FormValidator.validateTickets(3, 2).valid === false, "Tickets exceeding available spots fails");

// Terms validation
assert(FormValidator.validateTerms(true).valid === true, "Checked terms passes");
assert(FormValidator.validateTerms(false).valid === false, "Unchecked terms fails");

// 4. Ticket Manager Verification
const qrSvg = TicketManager.generateQRCodeSVG("EP-VERIFY:TEST:123", 160);
assert(qrSvg.includes("<svg") && qrSvg.includes("<rect"), "QR Code SVG renders valid vector markup");

const ticketHTML = TicketManager.renderTicketHTML(
  { bookingId: "EP-999999", name: "Jane Smith", email: "jane@test.com", phone: "9876543210", ticketCount: 2, ticketTier: "VIP", timestamp: new Date().toISOString() },
  INITIAL_EVENTS[0]
);
assert(ticketHTML.includes("EP-999999") && ticketHTML.includes("Jane Smith"), "Ticket HTML renders booking reference and attendee details");

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
}
