"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageManager = void 0;
class StorageManager {
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
        }
        catch {
            return [];
        }
    }
    static getEventById(id) {
        const events = this.getEvents();
        return events.find(e => e.id === id);
    }
    static addCustomEvent(newEvent) {
        const events = this.getEvents();
        events.unshift(newEvent);
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
        return newEvent;
    }
    static addEventReview(eventId, review) {
        const events = this.getEvents();
        const event = events.find(e => e.id === eventId);
        if (!event)
            return false;
        if (!event.reviews)
            event.reviews = [];
        event.reviews.unshift(review);
        // Recalculate average rating
        const total = event.reviews.reduce((acc, r) => acc + r.rating, 0);
        event.rating = parseFloat((total / event.reviews.length).toFixed(1));
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
        return true;
    }
    static getRegistrations() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_REGISTRATIONS);
            return data ? JSON.parse(data) : [];
        }
        catch {
            return [];
        }
    }
    static saveRegistration(bookingData) {
        const bookings = this.getRegistrations();
        const bookingId = "PLS-" + Math.floor(100000 + Math.random() * 900000);
        const newBooking = {
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
    static checkInBooking(bookingId) {
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
    static cancelRegistration(bookingId) {
        const bookings = this.getRegistrations();
        const index = bookings.findIndex(b => b.bookingId === bookingId);
        if (index === -1)
            return false;
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
        if (bookings.length === 0)
            return;
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
    static getFavorites() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_FAVORITES);
            return data ? JSON.parse(data) : [];
        }
        catch {
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
        }
        else {
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
}
exports.StorageManager = StorageManager;
