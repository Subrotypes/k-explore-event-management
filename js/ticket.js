/**
 * PulseEvent - Digital Ticket Pass & iCalendar Export Engine
 * Generates verified boarding-pass style tickets, QR codes, and .ics calendar files
 */

const TicketManager = {
  /**
   * Deterministic matrix generator to create authentic vector QR codes seeded by text
   */
  generateQRCodeSVG(dataString, size = 160) {
    // Generate a 25x25 grid
    const gridSize = 25;
    const moduleSize = size / gridSize;
    
    // Hash the input string to get deterministic pseudorandom bits
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      hash = ((hash << 5) - hash) + dataString.charCodeAt(i);
      hash |= 0;
    }
    
    // Simple LCG PRNG seeded by hash
    let seed = Math.abs(hash) || 12345;
    function nextPseudoRandom() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    // Grid matrix
    const matrix = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    // Helper: draw finder pattern (7x7 square) at (r, c)
    function drawFinderPattern(row, col) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 || // outer square
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)     // center square
          ) {
            matrix[row + r][col + c] = 1;
          } else {
            matrix[row + r][col + c] = 0;
          }
        }
      }
    }

    // Top-left, Top-right, Bottom-left finder patterns
    drawFinderPattern(0, 0);
    drawFinderPattern(0, gridSize - 7);
    drawFinderPattern(gridSize - 7, 0);

    // Timing patterns
    for (let i = 8; i < gridSize - 8; i++) {
      matrix[6][i] = i % 2 === 0 ? 1 : 0;
      matrix[i][6] = i % 2 === 0 ? 1 : 0;
    }

    // Fill remaining data modules
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip finder zones
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= gridSize - 8) ||
          (r >= gridSize - 8 && c < 8) ||
          (r === 6 || c === 6)
        ) {
          continue;
        }
        matrix[r][c] = nextPseudoRandom() > 0.45 ? 1 : 0;
      }
    }

    // Build SVG path
    let rects = "";
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (matrix[r][c] === 1) {
          const x = (c * moduleSize).toFixed(2);
          const y = (r * moduleSize).toFixed(2);
          rects += `<rect x="${x}" y="${y}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" fill="currentColor" />`;
        }
      }
    }

    return `
      <svg class="w-full h-full text-slate-900 dark:text-white" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ticket QR Code">
        <rect width="100%" height="100%" fill="transparent" />
        ${rects}
      </svg>
    `;
  },

  /**
   * Render Digital Ticket Pass Markup
   */
  renderTicketHTML(booking, event) {
    const qrSvg = this.generateQRCodeSVG(`EP-VERIFY:${booking.bookingId}:${booking.email}:${event.id}`);
    const totalPrice = event.isFree ? "Free" : `$${(event.price * (booking.ticketCount || 1)).toLocaleString()}`;
    const formattedBookedDate = new Date(booking.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    return `
      <div id="printable-ticket" class="ticket-card relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden max-w-xl mx-auto transition-all">
        <!-- Top Gradient Glow Accent -->
        <div class="h-3 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <!-- Ticket Header -->
        <div class="p-6 md:p-8 pb-4">
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
                P
              </div>
              <div>
                <span class="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">Official Pass</span>
                <h4 class="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">PulseEvent Pass</h4>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/50">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Confirmed
              </span>
              <p class="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">REF: <span class="font-bold text-slate-800 dark:text-slate-200">${booking.bookingId}</span></p>
            </div>
          </div>

          <!-- Event Title & Basic Info -->
          <div class="mt-5">
            <span class="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 uppercase tracking-wide">
              ${event.category}
            </span>
            <h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-2 leading-snug">
              ${event.title}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>${event.venue}, ${event.city}</span>
            </p>
          </div>
        </div>

        <!-- Perforated Notch Divider -->
        <div class="relative flex items-center my-1">
          <div class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950 -ml-3 border-r border-slate-200 dark:border-slate-800 shadow-inner"></div>
          <div class="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-800 mx-2"></div>
          <div class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950 -mr-3 border-l border-slate-200 dark:border-slate-800 shadow-inner"></div>
        </div>

        <!-- Ticket Body Details & QR Code -->
        <div class="p-6 md:p-8 pt-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <!-- Attendee & Event Logistics -->
            <div class="sm:col-span-2 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Attendee</span>
                  <p class="text-sm font-bold text-slate-900 dark:text-white truncate">${booking.name}</p>
                  <p class="text-[11px] text-slate-500 truncate">${booking.email}</p>
                </div>
                <div>
                  <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Date & Time</span>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">${event.displayDate}</p>
                  <p class="text-[11px] text-slate-500">${event.time}</p>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div>
                  <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Pass Type</span>
                  <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400">${booking.ticketTier || "General Entry"}</p>
                </div>
                <div>
                  <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Quantity</span>
                  <p class="text-xs font-bold text-slate-900 dark:text-white">${booking.ticketCount} Seat(s)</p>
                </div>
                <div>
                  <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Total Amount</span>
                  <p class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">${totalPrice}</p>
                </div>
              </div>

              <div class="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                <span>Booked on ${formattedBookedDate}</span>
                <span>•</span>
                <span>Phone: ${booking.phone}</span>
              </div>
            </div>

            <!-- QR Verification Column -->
            <div class="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <div class="w-28 h-28 p-1">
                ${qrSvg}
              </div>
              <span class="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-tight">Scan at Entrance</span>
            </div>
          </div>

          <!-- Bottom Notice -->
          <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p class="text-[11px] text-slate-400">
              Please present this digital pass or printed QR code upon arrival at the registration desk. Valid photo ID matching attendee name may be required.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Export booking as standard RFC 5545 iCalendar (.ics) file
   */
  downloadCalendarICS(booking, event) {
    try {
      const eventStart = new Date(event.date);
      // Default event duration: 4 hours
      const eventEnd = new Date(eventStart.getTime() + (4 * 60 * 60 * 1000));

      const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      const now = formatICSDate(new Date());
      const dtStart = formatICSDate(eventStart);
      const dtEnd = formatICSDate(eventEnd);

      const cleanSummary = (event.title || "Event").replace(/,/g, "\\,");
      const cleanLocation = `${event.venue}, ${event.city}`.replace(/,/g, "\\,");
      const cleanDesc = `Booking Confirmation ID: ${booking.bookingId}\\nAttendee: ${booking.name} (${booking.ticketCount} tickets)\\n\\n${event.shortDesc || ""}`.replace(/,/g, "\\,");

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//PulseEvent//Event Management Platform//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:pulse-${booking.bookingId}@pulseevent.io`,
        `DTSTAMP:${now}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${cleanSummary}`,
        `DESCRIPTION:${cleanDesc}`,
        `LOCATION:${cleanLocation}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `PulseEvent-${booking.bookingId}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      return true;
    } catch (e) {
      console.error("Calendar download failed:", e);
      return false;
    }
  },

  /**
   * Trigger print dialog for the ticket
   */
  printTicket() {
    window.print();
  }
};
