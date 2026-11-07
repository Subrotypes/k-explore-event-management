import { EventItem, FilterState, ViewMode, TicketBooking, EventReview } from "./types";
import { INITIAL_EVENTS } from "./data/events";
import { StorageManager } from "./services/storage";
import { FormValidator } from "./services/validation";
import { TicketManager } from "./services/ticket";
import { CurrencyManager } from "./services/currency";
import { AudioManager } from "./services/audio";
import { AnimationOrchestrator } from "./animations/gsap-orchestrator";
import { CalendarViewComponent } from "./components/calendar";
import { TicketScannerComponent } from "./components/scanner";

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const AppState = {
    events: [] as EventItem[],
    filteredEvents: [] as EventItem[],
    filters: {
      category: "all",
      search: "",
      dateFilter: "all",
      priceFilter: "all",
      sortBy: "date-asc",
      selectedDate: null
    } as FilterState,
    viewMode: "grid" as ViewMode,
    selectedEvent: null as EventItem | null,
    currentTicketBooking: null as { booking: TicketBooking; event: EventItem } | null,
    countdownInterval: null as any
  };

  // DOM Elements Cache
  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById("theme-toggle-btn") as HTMLButtonElement,
    themeIconLight: document.getElementById("theme-icon-light") as HTMLElement,
    themeIconDark: document.getElementById("theme-icon-dark") as HTMLElement,
    audioToggleBtn: document.getElementById("audio-toggle-btn") as HTMLButtonElement | null,
    currencySelect: document.getElementById("currency-select") as HTMLSelectElement | null,

    // Navigation & Badges
    myBookingsBtn: document.getElementById("my-bookings-btn") as HTMLButtonElement,
    bookingsBadge: document.getElementById("bookings-count-badge") as HTMLElement,
    mobileMenuBtn: document.getElementById("mobile-menu-btn") as HTMLButtonElement | null,
    mobileMenuDrawer: document.getElementById("mobile-menu-drawer") as HTMLElement | null,
    hostEventBtn: document.getElementById("host-event-btn") as HTMLButtonElement | null,
    heroHostBtn: document.getElementById("hero-host-btn") as HTMLButtonElement | null,
    heroExploreBtn: document.getElementById("hero-explore-btn") as HTMLButtonElement | null,
    scannerModalBtn: document.getElementById("scanner-modal-btn") as HTMLButtonElement | null,

    // Hero Spotlight & Countdown
    spotlightTitle: document.getElementById("spotlight-title") as HTMLElement | null,
    spotlightCategory: document.getElementById("spotlight-category") as HTMLElement | null,
    spotlightDate: document.getElementById("spotlight-date") as HTMLElement | null,
    spotlightVenue: document.getElementById("spotlight-venue") as HTMLElement | null,
    spotlightPrice: document.getElementById("spotlight-price") as HTMLElement | null,
    spotlightRegisterBtn: document.getElementById("spotlight-register-btn") as HTMLButtonElement | null,
    spotlightDetailsBtn: document.getElementById("spotlight-details-btn") as HTMLButtonElement | null,
    spotlightImg: document.getElementById("spotlight-img") as HTMLImageElement | null,
    cdDays: document.getElementById("cd-days") as HTMLElement | null,
    cdHours: document.getElementById("cd-hours") as HTMLElement | null,
    cdMinutes: document.getElementById("cd-minutes") as HTMLElement | null,
    cdSeconds: document.getElementById("cd-seconds") as HTMLElement | null,

    // Search & Filter Controls
    searchInput: document.getElementById("search-input") as HTMLInputElement,
    searchClearBtn: document.getElementById("search-clear-btn") as HTMLButtonElement,
    categoryPillsContainer: document.getElementById("category-pills") as HTMLElement,
    dateFilterSelect: document.getElementById("date-filter") as HTMLSelectElement,
    priceFilterSelect: document.getElementById("price-filter") as HTMLSelectElement,
    sortSelect: document.getElementById("sort-select") as HTMLSelectElement,
    resetFiltersBtn: document.getElementById("reset-filters-btn") as HTMLButtonElement,
    viewGridBtn: document.getElementById("view-grid-btn") as HTMLButtonElement,
    viewListBtn: document.getElementById("view-list-btn") as HTMLButtonElement,
    viewCalendarBtn: document.getElementById("view-calendar-btn") as HTMLButtonElement | null,
    resultsCountText: document.getElementById("results-count-text") as HTMLElement,
    eventsContainer: document.getElementById("events-container") as HTMLElement,
    noResultsState: document.getElementById("no-results-state") as HTMLElement,

    // Modals
    eventDetailsModal: document.getElementById("event-details-modal") as HTMLElement,
    eventDetailsContent: document.getElementById("event-details-content") as HTMLElement,
    closeDetailsBtn: document.getElementById("close-details-btn") as HTMLButtonElement,

    registrationModal: document.getElementById("registration-modal") as HTMLElement,
    registrationForm: document.getElementById("registration-form") as HTMLFormElement,
    closeRegBtn: document.getElementById("close-reg-btn") as HTMLButtonElement,
    regEventSummary: document.getElementById("reg-event-summary") as HTMLElement,
    regSubmitBtn: document.getElementById("reg-submit-btn") as HTMLButtonElement,
    regTicketTier: document.getElementById("reg-ticket-tier") as HTMLSelectElement,
    regTicketCount: document.getElementById("reg-ticket-count") as HTMLInputElement,
    regPriceTotal: document.getElementById("reg-price-total") as HTMLElement,

    ticketModal: document.getElementById("ticket-modal") as HTMLElement,
    ticketContainer: document.getElementById("ticket-container") as HTMLElement,
    closeTicketBtn: document.getElementById("close-ticket-btn") as HTMLButtonElement,
    printTicketBtn: document.getElementById("print-ticket-btn") as HTMLButtonElement,
    downloadIcsBtn: document.getElementById("download-ics-btn") as HTMLButtonElement,
    viewBookingsFromTicketBtn: document.getElementById("view-bookings-from-ticket-btn") as HTMLButtonElement,

    bookingsDrawer: document.getElementById("bookings-drawer") as HTMLElement,
    bookingsList: document.getElementById("bookings-list") as HTMLElement,
    closeBookingsBtn: document.getElementById("close-bookings-btn") as HTMLButtonElement,
    emptyBookingsNotice: document.getElementById("empty-bookings-notice") as HTMLElement,
    exportJsonBtn: document.getElementById("export-bookings-json-btn") as HTMLButtonElement | null,
    exportCsvBtn: document.getElementById("export-bookings-csv-btn") as HTMLButtonElement | null,

    hostEventModal: document.getElementById("host-event-modal") as HTMLElement,
    hostEventForm: document.getElementById("host-event-form") as HTMLFormElement,
    closeHostBtn: document.getElementById("close-host-btn") as HTMLButtonElement,

    scannerModal: document.getElementById("scanner-modal") as HTMLElement | null,
    scannerForm: document.getElementById("scanner-form") as HTMLFormElement | null,
    scannerInput: document.getElementById("scanner-input") as HTMLInputElement | null,
    scannerResultContainer: document.getElementById("scanner-result-container") as HTMLElement | null,
    closeScannerBtn: document.getElementById("close-scanner-btn") as HTMLButtonElement | null,

    toastContainer: document.getElementById("toast-container") as HTMLElement
  };

  /**
   * Modern Floating Toast System
   */
  function showToast(message: string, type: "success" | "error" | "info" = "success", duration: number = 3200): void {
    if (!DOM.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-animate-in flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold border pointer-events-auto transition-all backdrop-blur-2xl ${
      type === "success"
        ? "bg-zinc-900/95 text-zinc-100 border-zinc-700 dark:bg-zinc-100/95 dark:text-zinc-900 dark:border-zinc-300 shadow-indigo-500/10"
        : type === "error"
        ? "bg-rose-950/95 text-rose-100 border-rose-800"
        : "bg-zinc-900/95 text-zinc-100 border-zinc-700 dark:bg-zinc-850 dark:text-zinc-100 dark:border-zinc-600"
    }`;

    const iconSvg =
      type === "success"
        ? `<svg class="w-5 h-5 text-emerald-400 dark:text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`
        : type === "error"
        ? `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>`
        : `<svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

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

  /**
   * Theme Switcher
   */
  function initTheme(): void {
    const savedTheme = StorageManager.getTheme();
    applyTheme(savedTheme);

    DOM.themeToggleBtn.addEventListener("click", () => {
      AudioManager.playClick();
      const isDark = DOM.html.classList.contains("dark");
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      StorageManager.setTheme(nextTheme);
      showToast(`${nextTheme === "dark" ? "Dark mode active 🌙" : "Light mode active ☀️"}`, "info", 1800);
    });
  }

  function applyTheme(theme: string): void {
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
   * Sound & Audio Controls
   */
  function initAudioToggle(): void {
    AudioManager.init();
    if (!DOM.audioToggleBtn) return;

    const updateAudioIcon = () => {
      const isMuted = AudioManager.getIsMuted();
      DOM.audioToggleBtn!.innerHTML = isMuted
        ? `<svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>`
        : `<svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`;
    };

    updateAudioIcon();

    DOM.audioToggleBtn.onclick = () => {
      const unmuted = AudioManager.toggleMute();
      updateAudioIcon();
      if (unmuted) AudioManager.playClick();
      showToast(unmuted ? "Audio effects active 🔊" : "Audio muted 🔇", "info", 1500);
    };
  }

  /**
   * Currency Selector
   */
  function initCurrency(): void {
    const currentCode = CurrencyManager.init();
    if (DOM.currencySelect) {
      DOM.currencySelect.value = currentCode;
      DOM.currencySelect.onchange = (e) => {
        AudioManager.playClick();
        const code = (e.target as HTMLSelectElement).value as any;
        CurrencyManager.setCurrency(code);
        setupSpotlightEvent();
        filterAndRenderEvents();
        updateRegistrationTotal();
        showToast(`Currency set to ${code}`, "info", 1500);
      };
    }
  }

  /**
   * Update Bookings Badge Counter
   */
  function updateBookingsCount(): void {
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

  /**
   * Setup Spotlight Banner & Countdown
   */
  function setupSpotlightEvent(): void {
    const featured = AppState.events.find(ev => ev.featured) || AppState.events[0];
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

  function startSpotlightCountdown(targetDateStr: string): void {
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
   * Filter, Search & Sort Logic
   */
  function filterAndRenderEvents(): void {
    let result = [...AppState.events];

    // Category
    if (AppState.filters.category !== "all") {
      result = result.filter(ev => 
        (ev.categoryKey && ev.categoryKey.toLowerCase() === AppState.filters.category.toLowerCase()) ||
        (ev.category && ev.category.toLowerCase().includes(AppState.filters.category.toLowerCase()))
      );
    }

    // Keyword Search
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

    // Price
    if (AppState.filters.priceFilter === "free") {
      result = result.filter(ev => ev.isFree);
    } else if (AppState.filters.priceFilter === "under50") {
      result = result.filter(ev => ev.isFree || ev.price <= 50);
    } else if (AppState.filters.priceFilter === "50plus") {
      result = result.filter(ev => !ev.isFree && ev.price > 50);
    }

    // Date
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

    // Calendar Specific Date Filter
    if (AppState.filters.selectedDate) {
      result = result.filter(ev => ev.date.startsWith(AppState.filters.selectedDate!));
    }

    // Sort
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

  /**
   * Render Event List/Grid/Calendar
   */
  function renderEventsList(): void {
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

    DOM.eventsContainer.innerHTML = AppState.filteredEvents
      .map((ev, index) => createEventCardHTML(ev, AppState.viewMode, index))
      .join("");

    attachCardListeners();
    attachTiltEffects();
    AnimationOrchestrator.animateCards(DOM.eventsContainer);
  }

  /**
   * Card HTML Markup
   */
  function createEventCardHTML(ev: EventItem, viewMode: ViewMode, index: number = 0): string {
    const isFav = StorageManager.isFavorite(ev.id);
    const spotsLeft = Math.max(0, ev.totalCapacity - (ev.bookedCount || 0));
    const isSoldOut = spotsLeft <= 0;
    const percentFilled = Math.min(100, Math.round(((ev.bookedCount || 0) / ev.totalCapacity) * 100));

    const badgeCategoryClass = `cat-pill cat-pill-${ev.categoryKey || "tech"}`;
    const priceDisplay = CurrencyManager.formatPrice(ev.price, ev.isFree);

    const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    if (viewMode === "list") {
      return `
        <div class="tilt-card-wrapper scroll-reveal stagger-${(index % 6) + 1}">
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
                    <span>${ev.displayDate} • ${ev.time}</span>
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

    // Grid Card Markup
    return `
      <div class="tilt-card-wrapper scroll-reveal stagger-${(index % 6) + 1}">
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

  /**
   * 3D Tilt Effect on Non-Touch Devices
   */
  function attachTiltEffects(): void {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.querySelectorAll<HTMLElement>(".tilt-card").forEach(card => {
      const glare = card.querySelector<HTMLElement>(".tilt-glare");

      card.onmousemove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

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

  /**
   * Bind Card Event Listeners
   */
  function attachCardListeners(): void {
    document.querySelectorAll<HTMLElement>(".view-details-btn").forEach(btn => {
      btn.onclick = () => {
        AudioManager.playClick();
        openEventDetailsModal(btn.dataset.id!);
      };
    });

    document.querySelectorAll<HTMLElement>(".quick-register-btn").forEach(btn => {
      btn.onclick = () => {
        AudioManager.playClick();
        openRegistrationModal(btn.dataset.id!);
      };
    });

    document.querySelectorAll<HTMLElement>(".favorite-toggle-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        AudioManager.playClick();
        const id = btn.dataset.id!;
        const isFav = StorageManager.toggleFavorite(id);
        const svg = btn.querySelector("svg");
        if (svg) {
          if (isFav) {
            svg.classList.add("fill-rose-500", "text-rose-500");
            svg.classList.remove("fill-none");
            showToast("Added to saved favorites ❤️", "success", 2000);
          } else {
            svg.classList.remove("fill-rose-500", "text-rose-500");
            svg.classList.add("fill-none");
            showToast("Removed from saved", "info", 2000);
          }
        }
      };
    });
  }

  /**
   * Event Details Modal with Community Reviews
   */
  function openEventDetailsModal(eventId: string): void {
    const event = StorageManager.getEventById(eventId);
    if (!event) return;

    AppState.selectedEvent = event;
    const spotsLeft = Math.max(0, event.totalCapacity - (event.bookedCount || 0));
    const isSoldOut = spotsLeft <= 0;
    const badgeCategoryClass = `cat-pill cat-pill-${event.categoryKey || "tech"}`;

    const formattedPrice = CurrencyManager.formatPrice(event.price, event.isFree);

    const speakersHTML = (event.speakers || []).map(sp => `
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
        <img src="${sp.avatar}" alt="${sp.name}" class="w-14 h-14 rounded-2xl object-cover shrink-0" />
        <div>
          <h5 class="text-base font-bold text-zinc-900 dark:text-zinc-100">${sp.name}</h5>
          <p class="text-xs text-zinc-400 font-medium">${sp.role}</p>
        </div>
      </div>
    `).join("");

    const agendaHTML = (event.agenda || []).map(item => `
      <div class="flex gap-4 items-start relative pl-6 pb-6 last:pb-0 border-l-2 border-indigo-500/40 ml-2">
        <span class="absolute -left-2 top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white dark:border-zinc-900"></span>
        <div>
          <span class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">${item.time}</span>
          <h5 class="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">${item.title}</h5>
        </div>
      </div>
    `).join("");

    const perksHTML = (event.perks || []).map(perk => `
      <li class="flex items-center gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-semibold">
        <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
        <span>${perk}</span>
      </li>
    `).join("");

    const reviews = event.reviews || [
      { id: "rev-1", author: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", rating: 5, comment: "Incredible lineup and seamless check-in last year. Definitely attending again!", date: "2 weeks ago" },
      { id: "rev-2", author: "Dr. Evelyn Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", rating: 5, comment: "Top-tier keynotes and valuable networking with industry peers.", date: "1 month ago" }
    ];

    const reviewsHTML = reviews.map(r => `
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
            ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
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
            <span>•</span>
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

        ${(event.speakers && event.speakers.length > 0) ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-4">Distinguished Speakers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${speakersHTML}
            </div>
          </div>
        ` : ""}

        ${(event.agenda && event.agenda.length > 0) ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mb-4">Event Schedule</h4>
            <div>${agendaHTML}</div>
          </div>
        ` : ""}

        ${(event.perks && event.perks.length > 0) ? `
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
              ★ 4.9 <span class="text-zinc-400 font-normal">(${reviews.length} reviews)</span>
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
            Contact Host →
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
          ${isSoldOut ? "Sold Out" : "Register Now →"}
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

  /**
   * Registration Modal & Live Validation Flow
   */
  function openRegistrationModal(eventId: string): void {
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
          <p class="text-xs text-zinc-400 mt-0.5 truncate">${event.displayDate} • ${event.venue}</p>
        </div>
      </div>
    `;

    DOM.registrationForm.reset();
    document.querySelectorAll(".form-error").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll<HTMLInputElement>("#registration-form input").forEach(input => {
      FormValidator.resetFieldStatus(input);
    });

    updateRegistrationTotal();
    AudioManager.playWhoosh();
    openModal(DOM.registrationModal);
  }

  function updateRegistrationTotal(): void {
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

  /**
   * Real-Time Form Validation & Booking Submission
   */
  function setupLiveFormValidation(): void {
    const nameInput = document.getElementById("reg-name") as HTMLInputElement;
    const nameError = document.getElementById("reg-name-error");
    const emailInput = document.getElementById("reg-email") as HTMLInputElement;
    const emailError = document.getElementById("reg-email-error");
    const phoneInput = document.getElementById("reg-phone") as HTMLInputElement;
    const phoneError = document.getElementById("reg-phone-error");
    const termsInput = document.getElementById("reg-terms") as HTMLInputElement;
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
        ticketTier: DOM.regTicketTier.value as any,
        terms: termsInput.checked,
        notes: (document.getElementById("reg-notes") as HTMLTextAreaElement)?.value || ""
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
          eventId: AppState.selectedEvent!.id,
          eventTitle: AppState.selectedEvent!.title,
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
        AppState.selectedEvent = StorageManager.getEventById(AppState.selectedEvent!.id)!;
        filterAndRenderEvents();
        updateBookingsCount();
        setupSpotlightEvent();

        DOM.regSubmitBtn.disabled = false;
        DOM.regSubmitBtn.innerHTML = originalText;

        closeModal(DOM.registrationModal);
        openTicketModal(newBooking, AppState.selectedEvent);

        showToast("🎉 Pass confirmed! Boarding pass generated.", "success", 3500);
      }, 650);
    });
  }

  /**
   * Digital Ticket Modal
   */
  function openTicketModal(booking: TicketBooking, event: EventItem): void {
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
      showToast("📅 Calendar pass downloaded (.ics)!", "success");
    }
  };
  DOM.viewBookingsFromTicketBtn.onclick = () => {
    AudioManager.playClick();
    closeModal(DOM.ticketModal);
    openBookingsDrawer();
  };

  /**
   * "My Passes" Slide-Over Drawer
   */
  function openBookingsDrawer(): void {
    AudioManager.playClick();
    renderBookingsList();
    DOM.bookingsDrawer.classList.remove("translate-x-full");
    document.body.classList.add("overflow-hidden");
  }

  function closeBookingsDrawer(): void {
    AudioManager.playClick();
    DOM.bookingsDrawer.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden");
  }

  function renderBookingsList(): void {
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
              <p class="text-xs text-zinc-400 mt-0.5">${ev.displayDate} • ${ev.venue}</p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${reg.checkedIn ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"} shrink-0">
              ${reg.checkedIn ? "Checked In" : "Confirmed"}
            </span>
          </div>

          <div class="text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-2.5 font-mono">
            <span>${reg.ticketTier} • ${reg.ticketCount} seat${reg.ticketCount > 1 ? "s" : ""}</span>
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

    DOM.bookingsList.querySelectorAll<HTMLElement>(".view-single-ticket-btn").forEach(btn => {
      btn.onclick = () => {
        AudioManager.playClick();
        const bookingId = btn.dataset.booking!;
        const booking = StorageManager.getRegistrations().find(b => b.bookingId === bookingId);
        if (booking) {
          const event = StorageManager.getEventById(booking.eventId);
          if (event) {
            closeBookingsDrawer();
            openTicketModal(booking, event);
          }
        }
      };
    });

    DOM.bookingsList.querySelectorAll<HTMLElement>(".cancel-booking-btn").forEach(btn => {
      btn.onclick = () => {
        AudioManager.playClick();
        const bookingId = btn.dataset.booking!;
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
      showToast("Exported passes to JSON file 📁", "success");
    };
  }
  if (DOM.exportCsvBtn) {
    DOM.exportCsvBtn.onclick = () => {
      AudioManager.playClick();
      StorageManager.exportBookingsCSV();
      showToast("Exported passes to CSV file 📊", "success");
    };
  }

  /**
   * Ticket Pass Verification & Scanner Component
   */
  function setupScannerModal(): void {
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
        showToast("✓ Pass verified and attendee checked in!", "success");
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

  /**
   * Host / Publish Event Workflow
   */
  function setupHostEventWorkflow(): void {
    const openHostModal = () => {
      AudioManager.playClick();
      openModal(DOM.hostEventModal);
    };
    if (DOM.hostEventBtn) DOM.hostEventBtn.onclick = openHostModal;
    if (DOM.heroHostBtn) DOM.heroHostBtn.onclick = openHostModal;

    DOM.hostEventForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = (document.getElementById("host-title") as HTMLInputElement).value.trim();
      const category = (document.getElementById("host-category") as HTMLSelectElement).value as any;
      const dateVal = (document.getElementById("host-date") as HTMLInputElement).value;
      const timeVal = (document.getElementById("host-time") as HTMLInputElement).value.trim();
      const venue = (document.getElementById("host-venue") as HTMLInputElement).value.trim();
      const city = (document.getElementById("host-city") as HTMLInputElement).value.trim();
      const price = parseFloat((document.getElementById("host-price") as HTMLInputElement).value) || 0;
      const capacity = parseInt((document.getElementById("host-capacity") as HTMLInputElement).value, 10) || 100;
      const image = (document.getElementById("host-image") as HTMLInputElement)?.value.trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";
      const shortDesc = (document.getElementById("host-short-desc") as HTMLTextAreaElement).value.trim();

      if (!title || !dateVal || !timeVal || !venue || !shortDesc) {
        showToast("Please fill in required fields.", "error");
        return;
      }

      const catKeyMap: Record<string, any> = {
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

      const newEvent: EventItem = {
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
      showToast("🚀 Event published to platform!", "success");
    });
  }

  /**
   * Modal Open/Close Controls
   */
  function openModal(modalEl: HTMLElement | null): void {
    if (!modalEl) return;
    modalEl.classList.remove("hidden");
    modalEl.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal(modalEl: HTMLElement | null): void {
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

  [DOM.eventDetailsModal, DOM.registrationModal, DOM.ticketModal, DOM.hostEventModal, DOM.scannerModal].forEach(modal => {
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) {
          AudioManager.playClick();
          closeModal(modal);
        }
      };
    }
  });

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal(DOM.eventDetailsModal);
      closeModal(DOM.registrationModal);
      closeModal(DOM.ticketModal);
      closeModal(DOM.hostEventModal);
      closeModal(DOM.scannerModal);
      closeBookingsDrawer();
    }
    if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes((document.activeElement as HTMLElement)?.tagName)) {
      e.preventDefault();
      DOM.searchInput.focus();
      DOM.searchInput.select();
    }
  });

  /**
   * Search, View Modes & Filter Controls
   */
  function setupSearchAndFilters(): void {
    let searchDebounceTimer: any;
    DOM.searchInput.addEventListener("input", (e: Event) => {
      clearTimeout(searchDebounceTimer);
      const val = (e.target as HTMLInputElement).value;
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

    // Category Segmented Control Pills
    const pills = DOM.categoryPillsContainer.querySelectorAll<HTMLButtonElement>("button");
    pills.forEach(pill => {
      pill.onclick = () => {
        AudioManager.playClick();
        pills.forEach(p => {
          p.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");
          p.classList.add("text-zinc-500", "dark:text-zinc-400");
        });
        pill.classList.remove("text-zinc-500", "dark:text-zinc-400");
        pill.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");

        AppState.filters.category = pill.dataset.category || "all";
        filterAndRenderEvents();
      };
    });

    // Quick Category Cards in Hero
    document.querySelectorAll<HTMLElement>(".quick-cat-card").forEach(card => {
      card.onclick = () => {
        AudioManager.playClick();
        const cat = card.dataset.category;
        const targetPill = Array.from(pills).find(p => p.dataset.category === cat);
        if (targetPill) targetPill.click();
        const exploreSection = document.getElementById("explore-section");
        if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
      };
    });

    DOM.dateFilterSelect.onchange = (e) => {
      AudioManager.playClick();
      AppState.filters.dateFilter = (e.target as HTMLSelectElement).value as any;
      filterAndRenderEvents();
    };

    DOM.priceFilterSelect.onchange = (e) => {
      AudioManager.playClick();
      AppState.filters.priceFilter = (e.target as HTMLSelectElement).value as any;
      filterAndRenderEvents();
    };

    DOM.sortSelect.onchange = (e) => {
      AudioManager.playClick();
      AppState.filters.sortBy = (e.target as HTMLSelectElement).value as any;
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

      pills.forEach(p => {
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

    // View Modes: Grid, List, Calendar
    const updateViewButtons = (mode: ViewMode) => {
      [DOM.viewGridBtn, DOM.viewListBtn, DOM.viewCalendarBtn].forEach(btn => {
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
        showToast(`Filtered events for ${selectedDateStr}`, "info", 2000);
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
        DOM.mobileMenuDrawer!.classList.toggle("hidden");
      };
      DOM.mobileMenuDrawer.querySelectorAll("a, button").forEach(item => {
        (item as HTMLElement).onclick = () => DOM.mobileMenuDrawer!.classList.add("hidden");
      });
    }

    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById("newsletter-email") as HTMLInputElement;
        if (input && FormValidator.validateEmail(input.value).valid) {
          AudioManager.playSuccess();
          AnimationOrchestrator.triggerConfetti();
          showToast("🎉 Subscribed to EventPulse community digest!", "success");
          input.value = "";
        } else {
          showToast("Please enter a valid email address.", "error");
        }
      };
    }
  }

  function init(): void {
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
