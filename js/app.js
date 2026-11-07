/**
 * PulseEvent - Kinetic Orchestrator
 * Syne Typography, 3D Cursor Tilt, Continuous Ticker, Scroll Reveals & Counter Rollups
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
    
    // Navigation & Badges
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
   * Reading Scroll Progress Bar
   */
  function initScrollProgressBar() {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }, { passive: true });
  }

  /**
   * Scroll-Driven Reveal Observer
   */
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(el => observer.observe(el));
  }

  /**
   * Animated Counter Roll-up for Platform Metrics
   */
  function initStatsCounter() {
    const ribbon = document.getElementById("stats-ribbon");
    if (!ribbon) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          const counters = document.querySelectorAll(".stat-counter");
          counters.forEach(counter => {
            const target = parseFloat(counter.dataset.target);
            const suffix = counter.dataset.suffix || "";
            const isFormatCompact = counter.dataset.format === "compact";
            const duration = 1800;
            const start = performance.now();

            function updateCounter(now) {
              const progress = Math.min(1, (now - start) / duration);
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = target * ease;

              if (isFormatCompact) {
                counter.textContent = Math.round(current / 1000) + "k" + suffix;
              } else if (target % 1 !== 0) {
                counter.textContent = current.toFixed(1) + suffix;
              } else {
                counter.textContent = Math.round(current) + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                if (isFormatCompact) {
                  counter.textContent = Math.round(target / 1000) + "k" + suffix;
                } else if (target % 1 !== 0) {
                  counter.textContent = target.toFixed(1) + suffix;
                } else {
                  counter.textContent = target + suffix;
                }
              }
            }

            requestAnimationFrame(updateCounter);
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(ribbon);
  }

  /**
   * 3D Card Tilt with Dynamic Cursor Glare Tracking
   */
  function attachTiltEffects() {
    // Only apply on non-touch devices for silky smooth 60fps performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.querySelectorAll(".tilt-card").forEach(card => {
      const glare = card.querySelector(".tilt-glare");

      card.onmousemove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.22), transparent 60%)`;
        }
      };

      card.onmouseleave = () => {
        card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        if (glare) {
          glare.style.background = "transparent";
        }
      };
    });
  }

  /**
   * Audio chime synthesizer on registration confirmation
   */
  function playSuccessTone() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.07);
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime + index * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + index * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + index * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + index * 0.07);
        osc.stop(audioCtx.currentTime + index * 0.07 + 0.36);
      });
    } catch (e) {
      // AudioContext fallback
    }
  }

  /**
   * Modern Floating Toast System
   */
  function showToast(message, type = "success", duration = 3200) {
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

    toast.querySelector("button").onclick = () => toast.remove();
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
   * Theme Switcher (Dark / Light)
   */
  function initTheme() {
    const savedTheme = StorageManager.getTheme();
    applyTheme(savedTheme);

    DOM.themeToggleBtn.addEventListener("click", () => {
      const isDark = DOM.html.classList.contains("dark");
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      StorageManager.setTheme(nextTheme);
      showToast(`${nextTheme === "dark" ? "Dark mode active 🌙" : "Light mode active ☀️"}`, "info", 1800);
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
   * Update Bookings Badge Counter
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
   * Setup Spotlight Banner & Countdown
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
   * Filter, Search & Sort Logic
   */
  function filterAndRenderEvents() {
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

    // Sort
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
   * Render Event List/Grid
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
      DOM.eventsContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
    } else {
      DOM.eventsContainer.className = "flex flex-col gap-6";
    }

    DOM.eventsContainer.innerHTML = AppState.filteredEvents
      .map((ev, index) => createEventCardHTML(ev, AppState.viewMode, index))
      .join("");

    attachCardListeners();
    attachTiltEffects();
  }

  /**
   * 3D TILT READY, BOLD SYNE EVENT CARD MARKUP
   */
  function createEventCardHTML(ev, viewMode, index = 0) {
    const isFav = StorageManager.isFavorite(ev.id);
    const spotsLeft = Math.max(0, ev.totalCapacity - (ev.bookedCount || 0));
    const isSoldOut = spotsLeft <= 0;
    const percentFilled = Math.min(100, Math.round(((ev.bookedCount || 0) / ev.totalCapacity) * 100));

    const badgeCategoryClass = `cat-pill cat-pill-${ev.categoryKey || "tech"}`;
    const priceDisplay = ev.isFree ? "Free" : `$${ev.price}`;

    const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    if (viewMode === "list") {
      return `
        <div class="tilt-card-wrapper">
          <article class="tilt-card group relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-zinc-200/90 dark:border-zinc-800 p-6 flex flex-col md:flex-row gap-6 items-stretch shadow-xl">
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
                <div class="flex items-center justify-between gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-2 font-mono font-bold">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>${ev.displayDate} • ${ev.time}</span>
                  </div>
                  <span class="text-xl font-black font-syne text-zinc-900 dark:text-zinc-100">${priceDisplay}</span>
                </div>

                <h3 class="text-xl sm:text-2xl font-black font-syne text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug tracking-tight">
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
                  <div class="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-mono font-bold">
                    <span>${isSoldOut ? "Sold Out" : `${spotsLeft} spots left`}</span>
                    <span>${percentFilled}%</span>
                  </div>
                  <div class="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-300 ${percentFilled > 85 ? "bg-rose-500" : "bg-indigo-600 dark:bg-indigo-400"}" style="width: ${percentFilled}%"></div>
                  </div>
                </div>

                <div class="flex items-center gap-3 w-full sm:w-auto z-20">
                  <button class="view-details-btn px-5 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors" data-id="${ev.id}">
                    Details
                  </button>
                  <button class="quick-register-btn px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black font-syne uppercase tracking-wider transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed" data-id="${ev.id}" ${isSoldOut ? "disabled" : ""}>
                    ${isSoldOut ? "Sold Out" : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      `;
    }

    // Grid Card Markup with 3D Tilt and SYNE Typography
    return `
      <div class="tilt-card-wrapper">
        <article class="tilt-card group relative bg-white dark:bg-zinc-900 rounded-3xl border-2 border-zinc-200/90 dark:border-zinc-800 overflow-hidden flex flex-col justify-between shadow-xl">
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
                <span class="text-xs font-mono font-bold bg-zinc-900/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-sm">
                  <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  ${formattedDate}
                </span>
                <span class="text-sm font-black font-syne bg-indigo-600/95 backdrop-blur-md px-3.5 py-1 rounded-xl border border-indigo-400/40 shadow-sm">
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
              <p class="text-xs text-zinc-400 flex items-center gap-1.5 font-bold truncate mb-2">
                <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                <span class="truncate">${ev.venue}, ${ev.city}</span>
              </p>

              <h3 class="text-xl sm:text-2xl font-black font-syne text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight line-clamp-1 tracking-tight">
                ${ev.title}
              </h3>

              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                ${ev.shortDesc}
              </p>

              <!-- Progress Bar -->
              <div class="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div class="flex justify-between text-xs text-zinc-400 font-mono font-bold mb-1.5">
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
            <button class="view-details-btn flex-1 py-3 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors" data-id="${ev.id}">
              View Details
            </button>
            <button class="quick-register-btn flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black font-syne uppercase tracking-wider transition-all shadow-md shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed" data-id="${ev.id}" ${isSoldOut ? "disabled" : ""}>
              ${isSoldOut ? "Sold Out" : "Register"}
            </button>
          </div>
        </article>
      </div>
    `;
  }

  /**
   * Bind Card Event Listeners
   */
  function attachCardListeners() {
    document.querySelectorAll(".view-details-btn").forEach(btn => {
      btn.onclick = () => openEventDetailsModal(btn.dataset.id);
    });

    document.querySelectorAll(".quick-register-btn").forEach(btn => {
      btn.onclick = () => openRegistrationModal(btn.dataset.id);
    });

    document.querySelectorAll(".favorite-toggle-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const isFav = StorageManager.toggleFavorite(id);
        const svg = btn.querySelector("svg");
        if (isFav) {
          svg.classList.add("fill-rose-500", "text-rose-500");
          svg.classList.remove("fill-none");
          showToast("Added to saved favorites ❤️", "success", 2000);
        } else {
          svg.classList.remove("fill-rose-500", "text-rose-500");
          svg.classList.add("fill-none");
          showToast("Removed from saved", "info", 2000);
        }
      };
    });
  }

  /**
   * Event Details Modal
   */
  function openEventDetailsModal(eventId) {
    const event = StorageManager.getEventById(eventId);
    if (!event) return;

    AppState.selectedEvent = event;
    const spotsLeft = Math.max(0, event.totalCapacity - (event.bookedCount || 0));
    const isSoldOut = spotsLeft <= 0;
    const badgeCategoryClass = `cat-pill cat-pill-${event.categoryKey || "tech"}`;

    const speakersHTML = (event.speakers || []).map(sp => `
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border-2 border-zinc-200/80 dark:border-zinc-800">
        <img src="${sp.avatar}" alt="${sp.name}" class="w-14 h-14 rounded-2xl object-cover shrink-0" />
        <div>
          <h5 class="text-base font-black font-syne text-zinc-900 dark:text-zinc-100">${sp.name}</h5>
          <p class="text-xs text-zinc-400 font-medium">${sp.role}</p>
        </div>
      </div>
    `).join("");

    const agendaHTML = (event.agenda || []).map(item => `
      <div class="flex gap-4 items-start relative pl-6 pb-6 last:pb-0 border-l-2 border-indigo-500/40 ml-2">
        <span class="absolute -left-2 top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white dark:border-zinc-900"></span>
        <div>
          <span class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">${item.time}</span>
          <h5 class="text-base font-bold font-syne text-zinc-900 dark:text-zinc-100 mt-0.5">${item.title}</h5>
        </div>
      </div>
    `).join("");

    const perksHTML = (event.perks || []).map(perk => `
      <li class="flex items-center gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-semibold">
        <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
        <span>${perk}</span>
      </li>
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
          <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black font-syne leading-tight text-white tracking-tight">
            ${event.title}
          </h2>
        </div>
      </div>

      <div class="p-6 sm:p-10 space-y-8">
        <!-- Key Meta Metrics -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-2 border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm">
          <div>
            <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Pass Price</span>
            <p class="text-lg font-black font-syne text-zinc-900 dark:text-zinc-100 mt-0.5">${event.isFree ? "Free Entry" : `$${event.price}`}</p>
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
          <h4 class="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-2">Event Overview</h4>
          <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            ${event.description}
          </p>
        </div>

        ${(event.speakers && event.speakers.length > 0) ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-4">Distinguished Speakers</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${speakersHTML}
            </div>
          </div>
        ` : ""}

        ${(event.agenda && event.agenda.length > 0) ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-4">Event Schedule</h4>
            <div>${agendaHTML}</div>
          </div>
        ` : ""}

        ${(event.perks && event.perks.length > 0) ? `
          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold mb-3">Included with Your Pass</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${perksHTML}
            </ul>
          </div>
        ` : ""}

        <!-- Organizer -->
        <div class="flex items-center justify-between p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border-2 border-zinc-200/80 dark:border-zinc-800">
          <div class="flex items-center gap-3.5">
            <img src="${event.organizer.avatar}" alt="${event.organizer.name}" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Host & Organizer</span>
              <p class="text-base font-bold font-syne text-zinc-900 dark:text-zinc-100">${event.organizer.name}</p>
            </div>
          </div>
          <a href="mailto:${event.organizer.email}" class="text-xs font-black font-syne uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline">
            Contact Host →
          </a>
        </div>
      </div>

      <!-- Sticky Footer CTA -->
      <div class="sticky bottom-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-6 border-t-2 border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <span class="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block">Admission Pass</span>
          <span class="text-2xl font-black font-syne text-zinc-900 dark:text-zinc-100">${event.isFree ? "Free Entry" : `$${event.price}`}</span>
        </div>
        <button id="modal-register-cta-btn" class="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black font-syne uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-40" ${isSoldOut ? "disabled" : ""}>
          ${isSoldOut ? "Sold Out" : "Register Now →"}
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
      showToast("This event has sold out.", "error");
      return;
    }

    DOM.regEventSummary.innerHTML = `
      <div class="flex items-center gap-3.5 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/50">
        <img src="${event.image}" alt="${event.title}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
        <div class="flex-1 min-w-0">
          <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${event.category}</span>
          <h4 class="text-sm font-bold font-syne text-zinc-900 dark:text-zinc-100 truncate">${event.title}</h4>
          <p class="text-xs text-zinc-400 mt-0.5 truncate">${event.displayDate} • ${event.venue}</p>
        </div>
      </div>
    `;

    DOM.registrationForm.reset();
    document.querySelectorAll(".form-error").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll("#registration-form input").forEach(input => {
      FormValidator.resetFieldStatus(input);
    });

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
   * Real-Time Form Validation
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

      FormValidator.setFieldStatus(nameInput, nameError, FormValidator.validateName(formData.name));
      FormValidator.setFieldStatus(emailInput, emailError, FormValidator.validateEmail(formData.email));
      FormValidator.setFieldStatus(phoneInput, phoneError, FormValidator.validatePhone(formData.phone));
      if (!formData.terms) {
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
        const newBooking = StorageManager.saveRegistration({
          eventId: AppState.selectedEvent.id,
          eventTitle: AppState.selectedEvent.title,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          ticketCount: formData.ticketCount,
          ticketTier: formData.ticketTier === "vip" ? "VIP All-Access" : formData.ticketTier === "student" ? "Student Pass" : "Standard Pass",
          notes: formData.notes
        });

        playSuccessTone();

        AppState.events = StorageManager.getEvents();
        AppState.selectedEvent = StorageManager.getEventById(AppState.selectedEvent.id);
        filterAndRenderEvents();
        updateBookingsCount();
        setupSpotlightEvent();

        DOM.regSubmitBtn.disabled = false;
        DOM.regSubmitBtn.innerHTML = originalText;

        closeModal(DOM.registrationModal);
        openTicketModal(newBooking, AppState.selectedEvent);

        showToast("🎉 Pass confirmed! Boarding ticket generated.", "success", 3500);
      }, 650);
    });
  }

  /**
   * Digital Ticket Modal
   */
  function openTicketModal(booking, event) {
    AppState.currentTicketBooking = { booking, event };
    DOM.ticketContainer.innerHTML = TicketManager.renderTicketHTML(booking, event);
    openModal(DOM.ticketModal);
  }

  DOM.printTicketBtn.onclick = () => TicketManager.printTicket();
  DOM.downloadIcsBtn.onclick = () => {
    if (AppState.currentTicketBooking) {
      const { booking, event } = AppState.currentTicketBooking;
      TicketManager.downloadCalendarICS(booking, event);
      showToast("📅 Calendar pass downloaded (.ics)!", "success");
    }
  };
  DOM.viewBookingsFromTicketBtn.onclick = () => {
    closeModal(DOM.ticketModal);
    openBookingsDrawer();
  };

  /**
   * "My Passes" Slide-Over Drawer
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
              <h4 class="text-sm font-bold font-syne text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">${ev.title}</h4>
              <p class="text-xs text-zinc-400 mt-0.5">${ev.displayDate} • ${ev.venue}</p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
              Confirmed
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

  /**
   * Host / Publish Event Workflow
   */
  function setupHostEventWorkflow() {
    const openHostModal = () => openModal(DOM.hostEventModal);
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
      showToast("🚀 Event published to platform!", "success");
    });
  }

  /**
   * Modal Open/Close Controls
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

  [
    { btn: DOM.closeDetailsBtn, modal: DOM.eventDetailsModal },
    { btn: DOM.closeRegBtn, modal: DOM.registrationModal },
    { btn: DOM.closeTicketBtn, modal: DOM.ticketModal },
    { btn: DOM.closeHostBtn, modal: DOM.hostEventModal }
  ].forEach(({ btn, modal }) => {
    if (btn && modal) btn.onclick = () => closeModal(modal);
  });

  [DOM.eventDetailsModal, DOM.registrationModal, DOM.ticketModal, DOM.hostEventModal].forEach(modal => {
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) closeModal(modal);
      };
    }
  });

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(DOM.eventDetailsModal);
      closeModal(DOM.registrationModal);
      closeModal(DOM.ticketModal);
      closeModal(DOM.hostEventModal);
      closeBookingsDrawer();
    }
    if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      DOM.searchInput.focus();
      DOM.searchInput.select();
    }
  });

  /**
   * Search & Filter Controls
   */
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
      DOM.searchInput.value = "";
      DOM.searchClearBtn.classList.add("hidden");
      AppState.filters.search = "";
      filterAndRenderEvents();
      DOM.searchInput.focus();
    };

    // Category Segmented Control Pills
    const pills = DOM.categoryPillsContainer.querySelectorAll("button");
    pills.forEach(pill => {
      pill.onclick = () => {
        pills.forEach(p => {
          p.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");
          p.classList.add("text-zinc-500", "dark:text-zinc-400");
        });
        pill.classList.remove("text-zinc-500", "dark:text-zinc-400");
        pill.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900", "shadow-sm");

        AppState.filters.category = pill.dataset.category;
        filterAndRenderEvents();
      };
    });

    // Quick Category Cards in Hero
    document.querySelectorAll(".quick-cat-card").forEach(card => {
      card.onclick = () => {
        const cat = card.dataset.category;
        const targetPill = Array.from(pills).find(p => p.dataset.category === cat);
        if (targetPill) targetPill.click();
        const exploreSection = document.getElementById("explore-section");
        if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
      };
    });

    DOM.dateFilterSelect.onchange = (e) => {
      AppState.filters.dateFilter = e.target.value;
      filterAndRenderEvents();
    };

    DOM.priceFilterSelect.onchange = (e) => {
      AppState.filters.priceFilter = e.target.value;
      filterAndRenderEvents();
    };

    DOM.sortSelect.onchange = (e) => {
      AppState.filters.sortBy = e.target.value;
      filterAndRenderEvents();
    };

    DOM.resetFiltersBtn.onclick = () => {
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

    DOM.viewGridBtn.onclick = () => {
      AppState.viewMode = "grid";
      DOM.viewGridBtn.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
      DOM.viewGridBtn.classList.remove("text-zinc-400");
      DOM.viewListBtn.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
      DOM.viewListBtn.classList.add("text-zinc-400");
      renderEventsList();
    };

    DOM.viewListBtn.onclick = () => {
      AppState.viewMode = "list";
      DOM.viewListBtn.classList.add("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
      DOM.viewListBtn.classList.remove("text-zinc-400");
      DOM.viewGridBtn.classList.remove("bg-zinc-900", "dark:bg-zinc-100", "text-white", "dark:text-zinc-900");
      DOM.viewGridBtn.classList.add("text-zinc-400");
      renderEventsList();
    };

    if (DOM.heroExploreBtn) {
      DOM.heroExploreBtn.onclick = () => {
        const exploreSection = document.getElementById("explore-section");
        if (exploreSection) exploreSection.scrollIntoView({ behavior: "smooth" });
      };
    }

    if (DOM.mobileMenuBtn && DOM.mobileMenuDrawer) {
      DOM.mobileMenuBtn.onclick = () => {
        DOM.mobileMenuDrawer.classList.toggle("hidden");
      };
      DOM.mobileMenuDrawer.querySelectorAll("a, button").forEach(item => {
        item.onclick = () => DOM.mobileMenuDrawer.classList.add("hidden");
      });
    }

    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById("newsletter-email");
        if (input && FormValidator.validateEmail(input.value).valid) {
          showToast("🎉 Subscribed to EventPulse community digest!", "success");
          input.value = "";
        } else {
          showToast("Please enter a valid email address.", "error");
        }
      };
    }
  }

  function init() {
    initTheme();
    initScrollProgressBar();
    initScrollReveal();
    initStatsCounter();
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
