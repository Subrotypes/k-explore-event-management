/**
 * PulseEvent - Main Application Orchestrator
 * Integrates search/filter, UI rendering, modals, registration workflow,
 * countdown timers, bookmarks, theme toggle, and audio chime
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const AppState = {
    events: [],
    filteredEvents: [],
    filters: {
      category: "all",
      search: "",
      dateFilter: "all",
      priceFilter: "all",
      sortBy: "date-asc"
    },
    viewMode: "grid", // 'grid' | 'list'
    selectedEvent: null,
    currentTicketBooking: null,
    countdownInterval: null
  };

  // DOM Elements Cache
  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById("theme-toggle-btn"),
    themeIconLight: document.getElementById("theme-icon-light"),
    themeIconDark: document.getElementById("theme-icon-dark"),
    
    // Navigation & Counters
    myBookingsBtn: document.getElementById("my-bookings-btn"),
    bookingsBadge: document.getElementById("bookings-count-badge"),
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    mobileMenuDrawer: document.getElementById("mobile-menu-drawer"),
    hostEventBtn: document.getElementById("host-event-btn"),
    heroHostBtn: document.getElementById("hero-host-btn"),
    heroExploreBtn: document.getElementById("hero-explore-btn"),

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
    resultsCountText: document.getElementById("results-count-text"),
    eventsContainer: document.getElementById("events-container"),
    noResultsState: document.getElementById("no-results-state"),

    // Modals & Drawers
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

    hostEventModal: document.getElementById("host-event-modal"),
    hostEventForm: document.getElementById("host-event-form"),
    closeHostBtn: document.getElementById("close-host-btn"),

    toastContainer: document.getElementById("toast-container")
  };

  /**
   * Sound effect synthesizer for celebratory confirmation using Web Audio API
   */
  function playSuccessTone() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + index * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + index * 0.08);
        osc.stop(audioCtx.currentTime + index * 0.08 + 0.36);
      });
    } catch (e) {
      // AudioContext muted or unsupported, continue silently
    }
  }

  /**
   * Toast notification system
   */
  function showToast(message, type = "success", duration = 3500) {
    if (!DOM.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-animate-in flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold border pointer-events-auto transition-all backdrop-blur-md ${
      type === "success"
        ? "bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/30"
        : type === "error"
        ? "bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-950/30"
        : "bg-slate-900/90 text-slate-100 border-slate-700 shadow-slate-950/30"
    }`;

    const iconSvg =
      type === "success"
        ? `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
        : type === "error"
        ? `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
        : `<svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span class="flex-1">${message}</span>
      <button class="text-slate-400 hover:text-white p-1 rounded-lg transition-colors ml-2" aria-label="Dismiss toast">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    `;

    toast.querySelector("button").addEventListener("click", () => {
      toast.remove();
    });

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px) scale(0.95)";
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  }

  /**
   * Theme Manager (Dark / Light)
   */
  function initTheme() {
    const savedTheme = StorageManager.getTheme();
    applyTheme(savedTheme);

    DOM.themeToggleBtn.addEventListener("click", () => {
      const isDark = DOM.html.classList.contains("dark");
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      StorageManager.setTheme(nextTheme);
      showToast(`Switched to ${nextTheme === "dark" ? "Dark Mode 🌙" : "Light Mode ☀️"}`, "info", 2000);
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

  /**
   * Update Bookings Badge Count in Header
   */
  function updateBookingsCount() {
    const bookings = StorageManager.getRegistrations();
    if (DOM.bookingsBadge) {
      DOM.bookingsBadge.textContent = bookings.length;
      if (bookings.length > 0) {
        DOM.bookingsBadge.classList.remove("opacity-0", "scale-75");
        DOM.bookingsBadge.classList.add("opacity-100", "scale-100");
      } else {
        DOM.bookingsBadge.classList.add("opacity-0", "scale-75");
      }
    }
  }

  /**
   * Setup Spotlight Featured Event & Live Countdown
   */
  function setupSpotlightEvent() {
    const featured = AppState.events.find(ev => ev.featured) || AppState.events[0];
    if (!featured) return;

    if (DOM.spotlightTitle) DOM.spotlightTitle.textContent = featured.title;
    if (DOM.spotlightCategory) DOM.spotlightCategory.textContent = featured.category;
    if (DOM.spotlightDate) DOM.spotlightDate.textContent = featured.displayDate;
    if (DOM.spotlightVenue) DOM.spotlightVenue.textContent = `${featured.venue}, ${featured.city}`;
    if (DOM.spotlightPrice) DOM.spotlightPrice.textContent = featured.isFree ? "Free Entry" : `$${featured.price}`;
    if (DOM.spotlightImg) DOM.spotlightImg.src = featured.image;

    DOM.spotlightRegisterBtn.onclick = () => openRegistrationModal(featured.id);
    DOM.spotlightDetailsBtn.onclick = () => openEventDetailsModal(featured.id);

    // Start Live Countdown
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

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (DOM.cdDays) DOM.cdDays.textContent = String(days).padStart(2, "0");
      if (DOM.cdHours) DOM.cdHours.textContent = String(hours).padStart(2, "0");
      if (DOM.cdMinutes) DOM.cdMinutes.textContent = String(minutes).padStart(2, "0");
      if (DOM.cdSeconds) DOM.cdSeconds.textContent = String(seconds).padStart(2, "0");
    }

    update();
    AppState.countdownInterval = setInterval(update, 1000);
  }

  /**
   * Filter, Search, and Sort Logic
   */
  function filterAndRenderEvents() {
    let result = [...AppState.events];

    // 1. Category Filter
    if (AppState.filters.category !== "all") {
      result = result.filter(ev => 
        (ev.categoryKey && ev.categoryKey.toLowerCase() === AppState.filters.category.toLowerCase()) ||
        (ev.category && ev.category.toLowerCase().includes(AppState.filters.category.toLowerCase()))
      );
    }

    // 2. Search Keyword Query
    if (AppState.filters.search) {
      const q = AppState.filters.search.toLowerCase().trim();
      result = result.filter(ev =>
        ev.title.toLowerCase().includes(q) ||
        ev.shortDesc.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.city.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q)
      );
    }

    // 3. Price Filter
    if (AppState.filters.priceFilter === "free") {
      result = result.filter(ev => ev.isFree);
    } else if (AppState.filters.priceFilter === "under50") {
      result = result.filter(ev => ev.isFree || ev.price <= 50);
    } else if (AppState.filters.priceFilter === "50plus") {
      result = result.filter(ev => !ev.isFree && ev.price > 50);
    }

    // 4. Date Range Filter
    const now = new Date();
    if (AppState.filters.dateFilter === "week") {
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      result = result.filter(ev => {
        const d = new Date(ev.date);
        return d >= now && d <= nextWeek;
      });
    } else if (AppState.filters.dateFilter === "month") {
      const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      result = result.filter(ev => {
        const d = new Date(ev.date);
        return d >= now && d <= nextMonth;
      });
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (AppState.filters.sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date);
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

  /**
   * Render Event Cards Grid / List
   */
  function renderEventsList() {
    DOM.resultsCountText.textContent = `Showing ${AppState.filteredEvents.length} of ${AppState.events.length} events`;

    if (AppState.filteredEvents.length === 0) {
      DOM.eventsContainer.innerHTML = "";
      DOM.noResultsState.classList.remove("hidden");
      return;
    }

    DOM.noResultsState.classList.add("hidden");

    if (AppState.viewMode === "grid") {
      DOM.eventsContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8";
    } else {
      DOM.eventsContainer.className = "flex flex-col gap-5";
    }

    DOM.eventsContainer.innerHTML = AppState.filteredEvents
      .map(ev => createEventCardHTML(ev, AppState.viewMode))
      .join("");

    // Attach event listeners to card buttons
    attachCardListeners();
  }

  /**
   * Build Event Card HTML
   */
  function createEventCardHTML(ev, viewMode) {
    const isFav = StorageManager.isFavorite(ev.id);
    const spotsLeft = Math.max(0, ev.totalCapacity - (ev.bookedCount || 0));
    const isSoldOut = spotsLeft <= 0;
    const percentFilled = Math.min(100, Math.round(((ev.bookedCount || 0) / ev.totalCapacity) * 100));

    // Badge styling
    const badgeCategoryClass = `cat-badge-${ev.categoryKey || "tech"}`;
    const priceDisplay = ev.isFree ? "Free" : `$${ev.price}`;

    const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    if (viewMode === "list") {
      return `
        <article class="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch">
          <!-- Thumbnail -->
          <div class="relative w-full md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0">
            <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${badgeCategoryClass}">
              ${ev.category}
            </span>
            <button class="favorite-toggle-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm" data-id="${ev.id}" aria-label="Save to favorites">
              <svg class="w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : "fill-none"}" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span>${ev.displayDate} • ${ev.time}</span>
                </div>
                <span class="text-base font-extrabold text-slate-900 dark:text-white">${priceDisplay}</span>
              </div>

              <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                ${ev.title}
              </h3>

              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                <span>${ev.venue}, ${ev.city}</span>
              </p>

              <p class="text-sm text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">
                ${ev.shortDesc}
              </p>
            </div>

            <!-- Footer & Actions -->
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div class="w-full sm:w-48">
                <div class="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <span>${isSoldOut ? "Sold Out" : `${spotsLeft} spots left`}</span>
                  <span>${percentFilled}% filled</span>
                </div>
                <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div class="h-full rounded-full ${percentFilled > 85 ? "bg-rose-500" : percentFilled > 60 ? "bg-amber-500" : "bg-emerald-500"}" style="width: ${percentFilled}%"></div>
                </div>
              </div>

              <div class="flex items-center gap-2.5 w-full sm:w-auto">
                <button class="view-details-btn px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-1 sm:flex-initial" data-id="${ev.id}">
                  Details
                </button>
                <button class="quick-register-btn px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial" data-id="${ev.id}" ${isSoldOut ? "disabled" : ""}>
                  ${isSoldOut ? "Sold Out" : "Register"}
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }

    // Grid Card Markup
    return `
      <article class="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between glow-card">
        <div>
          <!-- Thumbnail & Badges -->
          <div class="relative h-52 w-full overflow-hidden">
            <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

            <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${badgeCategoryClass}">
              ${ev.category}
            </span>

            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span class="text-xs font-bold bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                ${formattedDate}
              </span>
              <span class="text-sm font-extrabold bg-indigo-600/90 backdrop-blur-md px-3 py-1 rounded-lg border border-indigo-400/30">
                ${priceDisplay}
              </span>
            </div>

            <button class="favorite-toggle-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-sm" data-id="${ev.id}" aria-label="Save to favorites">
              <svg class="w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : "fill-none"}" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
              <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              <span class="truncate">${ev.venue}, ${ev.city}</span>
            </p>

            <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1">
              ${ev.title}
            </h3>

            <p class="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              ${ev.shortDesc}
            </p>

            <!-- Capacity Progress -->
            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div class="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <span>${isSoldOut ? "Sold Out" : `${spotsLeft} spots remaining`}</span>
                <span>${percentFilled}%</span>
              </div>
              <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500 ${percentFilled > 85 ? "bg-rose-500" : percentFilled > 60 ? "bg-amber-500" : "bg-emerald-500"}" style="width: ${percentFilled}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Action Buttons -->
        <div class="px-6 pb-6 pt-0 flex items-center gap-2.5">
          <button class="view-details-btn flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" data-id="${ev.id}">
            View Details
          </button>
          <button class="quick-register-btn flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed" data-id="${ev.id}" ${isSoldOut ? "disabled" : ""}>
            ${isSoldOut ? "Sold Out" : "Register"}
          </button>
        </div>
      </article>
    `;
  }

  /**
   * Bind Dynamic Event Listeners for Event Cards
   */
  function attachCardListeners() {
    // View Details Buttons
    document.querySelectorAll(".view-details-btn").forEach(btn => {
      btn.onclick = () => openEventDetailsModal(btn.dataset.id);
    });

    // Register Buttons
    document.querySelectorAll(".quick-register-btn").forEach(btn => {
      btn.onclick = () => openRegistrationModal(btn.dataset.id);
    });

    // Favorite Toggle Buttons
    document.querySelectorAll(".favorite-toggle-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const isFav = StorageManager.toggleFavorite(id);
        const svg = btn.querySelector("svg");
        if (isFav) {
          svg.classList.add("fill-rose-500", "text-rose-500");
          svg.classList.remove("fill-none");
          showToast("Saved to your favorites ❤️", "success", 2000);
        } else {
          svg.classList.remove("fill-rose-500", "text-rose-500");
          svg.classList.add("fill-none");
          showToast("Removed from favorites", "info", 2000);
        }
      };
    });
  }

  /**
   * Event Details Modal Logic
   */
  function openEventDetailsModal(eventId) {
    const event = StorageManager.getEventById(eventId);
    if (!event) return;

    AppState.selectedEvent = event;
    const spotsLeft = Math.max(0, event.totalCapacity - (event.bookedCount || 0));
    const isSoldOut = spotsLeft <= 0;
    const badgeCategoryClass = `cat-badge-${event.categoryKey || "tech"}`;

    // Speakers markup
    const speakersHTML = (event.speakers || []).map(sp => `
      <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
        <img src="${sp.avatar}" alt="${sp.name}" class="w-12 h-12 rounded-xl object-cover shrink-0" />
        <div>
          <h5 class="text-sm font-bold text-slate-900 dark:text-white">${sp.name}</h5>
          <p class="text-xs text-slate-500 dark:text-slate-400">${sp.role}</p>
        </div>
      </div>
    `).join("");

    // Agenda markup
    const agendaHTML = (event.agenda || []).map(item => `
      <div class="flex gap-4 items-start relative pl-6 pb-6 last:pb-0 border-l border-indigo-200 dark:border-indigo-900/60 ml-2">
        <span class="absolute -left-2 top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900"></span>
        <div>
          <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">${item.time}</span>
          <h5 class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${item.title}</h5>
        </div>
      </div>
    `).join("");

    // Perks markup
    const perksHTML = (event.perks || []).map(perk => `
      <li class="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
        <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span>${perk}</span>
      </li>
    `).join("");

    DOM.eventDetailsContent.innerHTML = `
      <!-- Modal Header Banner -->
      <div class="relative h-64 sm:h-80 w-full overflow-hidden">
        <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <span class="absolute top-6 left-6 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${badgeCategoryClass}">
          ${event.category}
        </span>

        <div class="absolute bottom-6 left-6 right-6 text-white">
          <div class="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>${event.displayDate} • ${event.time}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black leading-tight text-white">
            ${event.title}
          </h2>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6 sm:p-8 space-y-8">
        <!-- Logistics Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
          <div>
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Price</span>
            <p class="text-base font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">
              ${event.isFree ? "Free Entry" : `$${event.price}`}
            </p>
          </div>
          <div>
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Venue</span>
            <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">${event.venue}</p>
          </div>
          <div>
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Location</span>
            <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">${event.city}</p>
          </div>
          <div>
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Availability</span>
            <p class="text-xs font-bold ${isSoldOut ? "text-rose-500" : "text-emerald-500"} mt-0.5">
              ${isSoldOut ? "Sold Out" : `${spotsLeft} spots open`}
            </p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2">About This Event</h4>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ${event.description}
          </p>
        </div>

        <!-- Key Speakers -->
        ${(event.speakers && event.speakers.length > 0) ? `
          <div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white mb-3">Distinguished Speakers & Hosts</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${speakersHTML}
            </div>
          </div>
        ` : ""}

        <!-- Schedule / Agenda -->
        ${(event.agenda && event.agenda.length > 0) ? `
          <div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white mb-4">Event Schedule</h4>
            <div class="pt-2">
              ${agendaHTML}
            </div>
          </div>
        ` : ""}

        <!-- What's Included / Perks -->
        ${(event.perks && event.perks.length > 0) ? `
          <div>
            <h4 class="text-base font-bold text-slate-900 dark:text-white mb-3">What's Included</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${perksHTML}
            </ul>
          </div>
        ` : ""}

        <!-- Organizer Profile -->
        <div class="flex items-center justify-between p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
          <div class="flex items-center gap-3">
            <img src="${event.organizer.avatar}" alt="${event.organizer.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30" />
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Organized by</span>
              <p class="text-sm font-bold text-slate-900 dark:text-white">${event.organizer.name}</p>
            </div>
          </div>
          <a href="mailto:${event.organizer.email}" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact
          </a>
        </div>
      </div>

      <!-- Modal Footer CTA -->
      <div class="sticky bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span class="text-[11px] font-medium text-slate-400 block">Registration Fee</span>
          <span class="text-xl font-extrabold text-slate-900 dark:text-white">${event.isFree ? "Free Entry" : `$${event.price}`}</span>
        </div>
        <button id="modal-register-cta-btn" class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" ${isSoldOut ? "disabled" : ""}>
          <span>${isSoldOut ? "Sold Out" : "Register Now"}</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    `;

    document.getElementById("modal-register-cta-btn").onclick = () => {
      closeModal(DOM.eventDetailsModal);
      openRegistrationModal(event.id);
    };

    openModal(DOM.eventDetailsModal);
  }

  /**
   * Registration Modal & Live Validation Flow
   */
  function openRegistrationModal(eventId) {
    const event = StorageManager.getEventById(eventId);
    if (!event) return;

    AppState.selectedEvent = event;
    const spotsLeft = Math.max(0, event.totalCapacity - (event.bookedCount || 0));
    if (spotsLeft <= 0) {
      showToast("Sorry, this event is already fully booked!", "error");
      return;
    }

    // Populate event summary header in form
    DOM.regEventSummary.innerHTML = `
      <div class="flex items-center gap-3.5 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/50">
        <img src="${event.image}" alt="${event.title}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">${event.category}</span>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">${event.title}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">${event.displayDate} • ${event.venue}</p>
        </div>
      </div>
    `;

    // Reset Form
    DOM.registrationForm.reset();
    document.querySelectorAll(".form-error").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll("#registration-form input").forEach(input => {
      FormValidator.resetFieldStatus(input);
    });

    // Update initial price total calculation
    updateRegistrationTotal();

    openModal(DOM.registrationModal);
  }

  function updateRegistrationTotal() {
    if (!AppState.selectedEvent) return;
    const count = parseInt(DOM.regTicketCount.value, 10) || 1;
    const tier = DOM.regTicketTier.value;

    let multiplier = 1;
    if (tier === "vip") multiplier = 1.6;
    if (tier === "student") multiplier = 0.7;

    const basePrice = AppState.selectedEvent.isFree ? 0 : AppState.selectedEvent.price;
    const finalTotal = Math.round(basePrice * count * multiplier);

    DOM.regPriceTotal.textContent = basePrice === 0 ? "Free" : `$${finalTotal.toLocaleString()}`;
  }

  DOM.regTicketCount.addEventListener("change", updateRegistrationTotal);
  DOM.regTicketTier.addEventListener("change", updateRegistrationTotal);

  /**
   * Setup Live Validation Listeners on Registration Form Fields
   */
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
    nameInput.addEventListener("input", () => {
      if (nameInput.classList.contains("border-red-500")) {
        const res = FormValidator.validateName(nameInput.value);
        FormValidator.setFieldStatus(nameInput, nameError, res);
      }
    });

    emailInput.addEventListener("blur", () => {
      const res = FormValidator.validateEmail(emailInput.value);
      FormValidator.setFieldStatus(emailInput, emailError, res);
    });
    emailInput.addEventListener("input", () => {
      if (emailInput.classList.contains("border-red-500")) {
        const res = FormValidator.validateEmail(emailInput.value);
        FormValidator.setFieldStatus(emailInput, emailError, res);
      }
    });

    phoneInput.addEventListener("blur", () => {
      const res = FormValidator.validatePhone(phoneInput.value);
      FormValidator.setFieldStatus(phoneInput, phoneError, res);
    });
    phoneInput.addEventListener("input", () => {
      if (phoneInput.classList.contains("border-red-500")) {
        const res = FormValidator.validatePhone(phoneInput.value);
        FormValidator.setFieldStatus(phoneInput, phoneError, res);
      }
    });

    termsInput.addEventListener("change", () => {
      const res = FormValidator.validateTerms(termsInput.checked);
      if (res.valid) {
        termsError.classList.add("hidden");
      } else {
        termsError.textContent = res.message;
        termsError.classList.remove("hidden");
      }
    });

    // Form Submission Handler
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
        notes: (document.getElementById("reg-notes")?.value || "").trim()
      };

      const validation = FormValidator.validateAll(formData, spotsLeft);

      // Display errors on all invalid fields
      FormValidator.setFieldStatus(nameInput, nameError, FormValidator.validateName(formData.name));
      FormValidator.setFieldStatus(emailInput, emailError, FormValidator.validateEmail(formData.email));
      FormValidator.setFieldStatus(phoneInput, phoneError, FormValidator.validatePhone(formData.phone));
      if (!formData.terms) {
        termsError.textContent = "You must agree to the terms to complete registration.";
        termsError.classList.remove("hidden");
      }

      if (!validation.isValid) {
        showToast("Please check the form for errors.", "error");
        return;
      }

      // Show submitting state
      DOM.regSubmitBtn.disabled = true;
      const originalText = DOM.regSubmitBtn.innerHTML;
      DOM.regSubmitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Securing Your Pass...
      `;

      setTimeout(() => {
        // Complete registration in localStorage
        const newBooking = StorageManager.saveRegistration({
          eventId: AppState.selectedEvent.id,
          eventTitle: AppState.selectedEvent.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          ticketCount: formData.ticketCount,
          ticketTier: formData.ticketTier === "vip" ? "VIP All-Access" : formData.ticketTier === "student" ? "Student Pass" : "General Entry",
          notes: formData.notes
        });

        // Play happy synthesized chime
        playSuccessTone();

        // Refresh global events in state and re-render
        AppState.events = StorageManager.getEvents();
        AppState.selectedEvent = StorageManager.getEventById(AppState.selectedEvent.id);
        filterAndRenderEvents();
        updateBookingsCount();
        setupSpotlightEvent();

        // Reset button
        DOM.regSubmitBtn.disabled = false;
        DOM.regSubmitBtn.innerHTML = originalText;

        // Close registration modal & open ticket modal
        closeModal(DOM.registrationModal);
        openTicketModal(newBooking, AppState.selectedEvent);

        showToast("🎉 Registration confirmed! Your digital pass is ready.", "success", 4000);
      }, 750);
    });
  }

  /**
   * Digital Ticket Pass Modal
   */
  function openTicketModal(booking, event) {
    AppState.currentTicketBooking = { booking, event };
    DOM.ticketContainer.innerHTML = TicketManager.renderTicketHTML(booking, event);
    openModal(DOM.ticketModal);
  }

  DOM.printTicketBtn.addEventListener("click", () => {
    TicketManager.printTicket();
  });

  DOM.downloadIcsBtn.addEventListener("click", () => {
    if (AppState.currentTicketBooking) {
      const { booking, event } = AppState.currentTicketBooking;
      const ok = TicketManager.downloadCalendarICS(booking, event);
      if (ok) showToast("📅 Event added to calendar (.ics downloaded)!", "success");
    }
  });

  DOM.viewBookingsFromTicketBtn.addEventListener("click", () => {
    closeModal(DOM.ticketModal);
    openBookingsDrawer();
  });

  /**
   * "My Bookings" Drawer & Manager
   */
  function openBookingsDrawer() {
    renderBookingsList();
    DOM.bookingsDrawer.classList.remove("translate-x-full");
    document.body.classList.add("overflow-hidden");
  }

  function closeBookingsDrawer() {
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

    DOM.bookingsList.innerHTML = registrations.map(reg => {
      const ev = StorageManager.getEventById(reg.eventId) || {
        title: reg.eventTitle || "Event",
        displayDate: "Upcoming",
        venue: "Main Venue",
        city: "",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
      };

      const dateBookedStr = new Date(reg.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      return `
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                ${reg.bookingId}
              </span>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">${ev.title}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${ev.displayDate} • ${ev.venue}</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
              ${reg.status || "Confirmed"}
            </span>
          </div>

          <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5">
            <span>${reg.ticketTier} (${reg.ticketCount} seat${reg.ticketCount > 1 ? "s" : ""})</span>
            <span>Booked: ${dateBookedStr}</span>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <button class="view-single-ticket-btn flex-1 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold transition-colors" data-booking="${reg.bookingId}">
              View Pass
            </button>
            <button class="cancel-booking-btn py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-colors" data-booking="${reg.bookingId}">
              Cancel
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Attach listeners to booking list buttons
    DOM.bookingsList.querySelectorAll(".view-single-ticket-btn").forEach(btn => {
      btn.onclick = () => {
        const bookingId = btn.dataset.booking;
        const booking = StorageManager.getRegistrations().find(b => b.bookingId === bookingId);
        if (booking) {
          const event = StorageManager.getEventById(booking.eventId);
          closeBookingsDrawer();
          openTicketModal(booking, event);
        }
      };
    });

    DOM.bookingsList.querySelectorAll(".cancel-booking-btn").forEach(btn => {
      btn.onclick = () => {
        const bookingId = btn.dataset.booking;
        if (confirm("Are you sure you want to cancel this registration? Your spot will be released.")) {
          StorageManager.cancelRegistration(bookingId);
          AppState.events = StorageManager.getEvents();
          filterAndRenderEvents();
          renderBookingsList();
          setupSpotlightEvent();
          showToast("Registration cancelled. Your spot has been released.", "info");
        }
      };
    });
  }

  DOM.myBookingsBtn.addEventListener("click", openBookingsDrawer);
  DOM.closeBookingsBtn.addEventListener("click", closeBookingsDrawer);

  /**
   * "Host / Add Custom Event" Modal Workflow (Bonus Feature)
   */
  function setupHostEventWorkflow() {
    const openHostModal = () => openModal(DOM.hostEventModal);
    if (DOM.hostEventBtn) DOM.hostEventBtn.addEventListener("click", openHostModal);
    if (DOM.heroHostBtn) DOM.heroHostBtn.addEventListener("click", openHostModal);

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
      const image = document.getElementById("host-image").value.trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";
      const shortDesc = document.getElementById("host-short-desc").value.trim();
      const fullDesc = document.getElementById("host-full-desc").value.trim();

      if (!title || !dateVal || !timeVal || !venue || !shortDesc) {
        showToast("Please fill in all required event details.", "error");
        return;
      }

      // Map category key
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
        description: fullDesc || shortDesc,
        organizer: {
          name: "Community Organizer",
          email: "organizer@pulseevent.io",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        speakers: [
          { name: "Event Host", role: "Organizer & Facilitator", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
        ],
        agenda: [
          { time: "Start", title: "Welcome & Opening Session" },
          { time: "Main Session", title: "Main Event Activities & Networking" },
          { time: "Closing", title: "Wrap-up & Community Mixer" }
        ],
        perks: ["Admission to full event", "Community networking", "Event resource materials"]
      };

      StorageManager.addCustomEvent(newEvent);
      AppState.events = StorageManager.getEvents();
      filterAndRenderEvents();

      DOM.hostEventForm.reset();
      closeModal(DOM.hostEventModal);
      showToast("🚀 Event published successfully! It is now live on the platform.", "success", 4000);
    });
  }

  /**
   * Generic Modal Helpers
   */
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

  // Setup Close Handlers for Modals
  [
    { btn: DOM.closeDetailsBtn, modal: DOM.eventDetailsModal },
    { btn: DOM.closeRegBtn, modal: DOM.registrationModal },
    { btn: DOM.closeTicketBtn, modal: DOM.ticketModal },
    { btn: DOM.closeHostBtn, modal: DOM.hostEventModal }
  ].forEach(({ btn, modal }) => {
    if (btn && modal) {
      btn.addEventListener("click", () => closeModal(modal));
    }
  });

  // Close modals on clicking background backdrop
  [DOM.eventDetailsModal, DOM.registrationModal, DOM.ticketModal, DOM.hostEventModal].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Close modals with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(DOM.eventDetailsModal);
      closeModal(DOM.registrationModal);
      closeModal(DOM.ticketModal);
      closeModal(DOM.hostEventModal);
      closeBookingsDrawer();
    }
  });

  /**
   * Search, Filter, and View Mode Bindings
   */
  function setupSearchAndFilters() {
    // Search input with debounce
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
      }, 200);
    });

    DOM.searchClearBtn.addEventListener("click", () => {
      DOM.searchInput.value = "";
      DOM.searchClearBtn.classList.add("hidden");
      AppState.filters.search = "";
      filterAndRenderEvents();
    });

    // Category pills filter
    const pills = DOM.categoryPillsContainer.querySelectorAll("button");
    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        pills.forEach(p => {
          p.classList.remove("bg-indigo-600", "text-white", "shadow-md");
          p.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300");
        });
        pill.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300");
        pill.classList.add("bg-indigo-600", "text-white", "shadow-md");

        AppState.filters.category = pill.dataset.category;
        filterAndRenderEvents();
      });
    });

    // Quick Category Browse Cards in Hero section
    document.querySelectorAll(".quick-cat-card").forEach(card => {
      card.addEventListener("click", () => {
        const cat = card.dataset.category;
        const targetPill = Array.from(pills).find(p => p.dataset.category === cat);
        if (targetPill) targetPill.click();
        const exploreSection = document.getElementById("explore-section");
        if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Dropdown filters
    DOM.dateFilterSelect.addEventListener("change", (e) => {
      AppState.filters.dateFilter = e.target.value;
      filterAndRenderEvents();
    });

    DOM.priceFilterSelect.addEventListener("change", (e) => {
      AppState.filters.priceFilter = e.target.value;
      filterAndRenderEvents();
    });

    DOM.sortSelect.addEventListener("change", (e) => {
      AppState.filters.sortBy = e.target.value;
      filterAndRenderEvents();
    });

    // Reset Filters Button
    DOM.resetFiltersBtn.addEventListener("click", () => {
      AppState.filters = {
        category: "all",
        search: "",
        dateFilter: "all",
        priceFilter: "all",
        sortBy: "date-asc"
      };
      DOM.searchInput.value = "";
      DOM.searchClearBtn.classList.add("hidden");
      DOM.dateFilterSelect.value = "all";
      DOM.priceFilterSelect.value = "all";
      DOM.sortSelect.value = "date-asc";

      pills.forEach(p => {
        if (p.dataset.category === "all") {
          p.classList.add("bg-indigo-600", "text-white", "shadow-md");
          p.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300");
        } else {
          p.classList.remove("bg-indigo-600", "text-white", "shadow-md");
          p.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300");
        }
      });

      filterAndRenderEvents();
      showToast("Filters reset to default", "info", 1500);
    });

    // View Mode Toggle (Grid vs List)
    DOM.viewGridBtn.addEventListener("click", () => {
      AppState.viewMode = "grid";
      DOM.viewGridBtn.classList.add("bg-indigo-600", "text-white");
      DOM.viewGridBtn.classList.remove("text-slate-400");
      DOM.viewListBtn.classList.remove("bg-indigo-600", "text-white");
      DOM.viewListBtn.classList.add("text-slate-400");
      renderEventsList();
    });

    DOM.viewListBtn.addEventListener("click", () => {
      AppState.viewMode = "list";
      DOM.viewListBtn.classList.add("bg-indigo-600", "text-white");
      DOM.viewListBtn.classList.remove("text-slate-400");
      DOM.viewGridBtn.classList.remove("bg-indigo-600", "text-white");
      DOM.viewGridBtn.classList.add("text-slate-400");
      renderEventsList();
    });

    // Hero Explore CTA
    if (DOM.heroExploreBtn) {
      DOM.heroExploreBtn.addEventListener("click", () => {
        const exploreSection = document.getElementById("explore-section");
        if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Mobile Hamburger Menu
    if (DOM.mobileMenuBtn && DOM.mobileMenuDrawer) {
      DOM.mobileMenuBtn.addEventListener("click", () => {
        DOM.mobileMenuDrawer.classList.toggle("hidden");
      });
      // Close mobile menu when a link inside it is clicked
      DOM.mobileMenuDrawer.querySelectorAll("a, button").forEach(item => {
        item.addEventListener("click", () => {
          DOM.mobileMenuDrawer.classList.add("hidden");
        });
      });
    }

    // Newsletter subscription form mock
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("newsletter-email");
        if (input && FormValidator.validateEmail(input.value).valid) {
          showToast("🎉 Thank you for subscribing to EventPulse updates!", "success");
          input.value = "";
        } else {
          showToast("Please enter a valid email address.", "error");
        }
      });
    }
  }

  /**
   * Main Initialization
   */
  function init() {
    initTheme();
    AppState.events = StorageManager.getEvents();
    setupSpotlightEvent();
    setupSearchAndFilters();
    setupLiveFormValidation();
    setupHostEventWorkflow();
    filterAndRenderEvents();
    updateBookingsCount();
  }

  init();
});
