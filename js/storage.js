/**
 * PulseEvent - Local Storage Data Manager
 * Handles persistent state for events, user registrations, bookmarks, and theme
 */

const STORAGE_KEYS = {
  EVENTS: "pulse_events_v1",
  REGISTRATIONS: "pulse_registrations_v1",
  FAVORITES: "pulse_favorites_v1",
  THEME: "pulse_theme_pref"
};

const StorageManager = {
  /**
   * Initialize and return all events (seed + user-created)
   */
  getEvents() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (stored) {
        return JSON.parse(stored);
      }
      // First-time load: populate with seed data
      this.saveEvents(INITIAL_EVENTS);
      return INITIAL_EVENTS;
    } catch (e) {
      console.error("StorageManager.getEvents error:", e);
      return INITIAL_EVENTS;
    }
  },

  /**
   * Save events array to localStorage
   */
  saveEvents(events) {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error("StorageManager.saveEvents error:", e);
    }
  },

  /**
   * Fetch single event by ID
   */
  getEventById(id) {
    const events = this.getEvents();
    return events.find(ev => ev.id === id) || null;
  },

  /**
   * Add a new user-hosted event
   */
  addCustomEvent(newEvent) {
    const events = this.getEvents();
    events.unshift(newEvent); // put at front
    this.saveEvents(events);
    return events;
  },

  /**
   * Update booked count when a registration occurs
   */
  adjustEventSpots(eventId, delta) {
    const events = this.getEvents();
    const event = events.find(ev => ev.id === eventId);
    if (event) {
      event.bookedCount = Math.max(0, Math.min(event.totalCapacity, (event.bookedCount || 0) + delta));
      this.saveEvents(events);
      return event;
    }
    return null;
  },

  /**
   * Get all user registrations
   */
  getRegistrations() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("StorageManager.getRegistrations error:", e);
      return [];
    }
  },

  /**
   * Save a new registration with unique booking ID & timestamp
   */
  saveRegistration(regDetails) {
    const registrations = this.getRegistrations();
    const bookingId = "EP-" + Math.floor(100000 + Math.random() * 900000);
    const newReg = {
      bookingId,
      timestamp: new Date().toISOString(),
      status: "Confirmed",
      ...regDetails
    };
    registrations.unshift(newReg);
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error("StorageManager.saveRegistration error:", e);
    }
    // Automatically update the event booked count in storage
    this.adjustEventSpots(regDetails.eventId, regDetails.ticketCount || 1);
    return newReg;
  },

  /**
   * Cancel an existing registration
   */
  cancelRegistration(bookingId) {
    const registrations = this.getRegistrations();
    const targetIndex = registrations.findIndex(r => r.bookingId === bookingId);
    if (targetIndex !== -1) {
      const target = registrations[targetIndex];
      // Return spots back to the event
      this.adjustEventSpots(target.eventId, -(target.ticketCount || 1));
      registrations.splice(targetIndex, 1);
      try {
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
      } catch (e) {
        console.error("StorageManager.cancelRegistration error:", e);
      }
      return true;
    }
    return false;
  },

  /**
   * Get user favorites / bookmarked event IDs
   */
  getFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  /**
   * Toggle favorite state for an event
   */
  toggleFavorite(eventId) {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(eventId);
    let isNowFavorite = false;
    if (index === -1) {
      favorites.push(eventId);
      isNowFavorite = true;
    } else {
      favorites.splice(index, 1);
      isNowFavorite = false;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error("StorageManager.toggleFavorite error:", e);
    }
    return isNowFavorite;
  },

  isFavorite(eventId) {
    const favorites = this.getFavorites();
    return favorites.includes(eventId);
  },

  /**
   * Theme preferences
   */
  getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } catch (e) {
      return "dark";
    }
  },

  setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error("StorageManager.setTheme error:", e);
    }
  }
};
