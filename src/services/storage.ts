import { EventItem, TicketBooking, EventReview } from "../types";

export class StorageManager {
  private static readonly STORAGE_KEY_EVENTS = "pulse_events_data_v2";
  private static readonly STORAGE_KEY_REGISTRATIONS = "pulse_registrations_v2";
  private static readonly STORAGE_KEY_FAVORITES = "pulse_favorites_v2";
  private static readonly STORAGE_KEY_THEME = "pulse_theme_v2";

  public static init(seedEvents: EventItem[]): void {
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

  public static getEvents(): EventItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_EVENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getEventById(id: string): EventItem | undefined {
    const events = this.getEvents();
    return events.find(e => e.id === id);
  }

  public static addCustomEvent(newEvent: EventItem): EventItem {
    const events = this.getEvents();
    events.unshift(newEvent);
    localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    return newEvent;
  }

  public static addEventReview(eventId: string, review: EventReview): boolean {
    const events = this.getEvents();
    const event = events.find(e => e.id === eventId);
    if (!event) return false;

    if (!event.reviews) event.reviews = [];
    event.reviews.unshift(review);

    // Recalculate average rating
    const total = event.reviews.reduce((acc, r) => acc + r.rating, 0);
    event.rating = parseFloat((total / event.reviews.length).toFixed(1));

    localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    return true;
  }

  public static getRegistrations(): TicketBooking[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_REGISTRATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveRegistration(bookingData: Omit<TicketBooking, "bookingId" | "timestamp">): TicketBooking {
    const bookings = this.getRegistrations();
    const bookingId = "PLS-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking: TicketBooking = {
      ...bookingData,
      bookingId,
      timestamp: Date.now(),
      checkedIn: false
    };

    bookings.unshift(newBooking);
    localStorage.setItem(this.STORAGE_KEY_REGISTRATIONS, JSON.stringify(bookings));

    // Increment bookedCount on the corresponding event
    const events = this.getEvents();
    const targetEvent = events.find(e => e.id === bookingData.eventId);
    if (targetEvent) {
      targetEvent.bookedCount = (targetEvent.bookedCount || 0) + (bookingData.ticketCount || 1);
      localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    }

    return newBooking;
  }

  public static checkInBooking(bookingId: string): { success: boolean; message: string; booking?: TicketBooking } {
    const bookings = this.getRegistrations();
    const booking = bookings.find(b => b.bookingId === bookingId);
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

  public static cancelRegistration(bookingId: string): boolean {
    const bookings = this.getRegistrations();
    const index = bookings.findIndex(b => b.bookingId === bookingId);
    if (index === -1) return false;

    const removed = bookings.splice(index, 1)[0];
    localStorage.setItem(this.STORAGE_KEY_REGISTRATIONS, JSON.stringify(bookings));

    // Decrement bookedCount on the target event
    const events = this.getEvents();
    const targetEvent = events.find(e => e.id === removed.eventId);
    if (targetEvent) {
      targetEvent.bookedCount = Math.max(0, (targetEvent.bookedCount || 0) - (removed.ticketCount || 1));
      localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    }

    return true;
  }

  public static exportBookingsJSON(): void {
    const bookings = this.getRegistrations();
    const blob = new Blob([JSON.stringify(bookings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eventpulse-bookings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  public static exportBookingsCSV(): void {
    const bookings = this.getRegistrations();
    if (bookings.length === 0) return;

    const headers = ["Booking ID", "Event Title", "Name", "Email", "Phone", "Tier", "Seats", "Date"];
    const rows = bookings.map(b => [
      `"${b.bookingId}"`,
      `"${b.eventTitle.replace(/"/g, '""')}"`,
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.email}"`,
      `"${b.phone}"`,
      `"${b.ticketTier}"`,
      b.ticketCount,
      `"${new Date(b.timestamp).toISOString()}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eventpulse-bookings-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  public static getFavorites(): string[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static toggleFavorite(eventId: string): boolean {
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

  public static isFavorite(eventId: string): boolean {
    return this.getFavorites().includes(eventId);
  }

  public static getTheme(): string {
    return localStorage.getItem(this.STORAGE_KEY_THEME) || "dark";
  }

  public static setTheme(theme: string): void {
    localStorage.setItem(this.STORAGE_KEY_THEME, theme);
  }
}
