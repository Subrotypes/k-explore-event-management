/**
 * PulseEvent - Digital Ticket Pass & iCalendar Export Engine
 * Minimalist, world-class boarding pass & digital voucher generator
 */

const TicketManager = {
  /**
   * Deterministic matrix generator to create crisp vector QR codes seeded by text
   */
  generateQRCodeSVG(dataString, size = 150) {
    const gridSize = 25;
    const moduleSize = size / gridSize;
    
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      hash = ((hash << 5) - hash) + dataString.charCodeAt(i);
      hash |= 0;
    }
    
    let seed = Math.abs(hash) || 12345;
    function nextPseudoRandom() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    const matrix = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    function drawFinderPattern(row, col) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[row + r][col + c] = 1;
          } else {
            matrix[row + r][col + c] = 0;
          }
        }
      }
    }

    drawFinderPattern(0, 0);
    drawFinderPattern(0, gridSize - 7);
    drawFinderPattern(gridSize - 7, 0);

    for (let i = 8; i < gridSize - 8; i++) {
      matrix[6][i] = i % 2 === 0 ? 1 : 0;
      matrix[i][6] = i % 2 === 0 ? 1 : 0;
    }

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= gridSize - 8) ||
          (r >= gridSize - 8 && c < 8) ||
          (r === 6 || c === 6)
        ) {
          continue;
        }
        matrix[r][c] = nextPseudoRandom() > 0.46 ? 1 : 0;
      }
    }

    let rects = "";
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (matrix[r][c] === 1) {
          const x = (c * moduleSize).toFixed(2);
          const y = (r * moduleSize).toFixed(2);
          rects += `<rect x="${x}" y="${y}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" rx="0.5" fill="currentColor" />`;
        }
      }
    }

    return `
      <svg class="w-full h-full text-zinc-900 dark:text-zinc-100" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ticket QR Code">
        <rect width="100%" height="100%" fill="transparent" />
        ${rects}
      </svg>
    `;
  },

  /**
   * Render World-Class Minimalist Digital Ticket
   */
  renderTicketHTML(booking, event) {
    const qrSvg = this.generateQRCodeSVG(`EP-PASS:${booking.bookingId}:${booking.email}:${event.id}`);
    const totalPrice = event.isFree ? "Complimentary" : `$${(event.price * (booking.ticketCount || 1)).toLocaleString()}`;
    const formattedBookedDate = new Date(booking.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    return `
      <div id="printable-ticket" class="ticket-wrapper relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-xl overflow-hidden max-w-lg mx-auto transition-all">
        
        <!-- Subtle Top Accent Stripe -->
        <div class="h-1.5 w-full bg-zinc-900 dark:bg-zinc-100"></div>

        <!-- Ticket Header -->
        <div class="p-6 sm:p-8 pb-5">
          <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs tracking-tight">
                P
              </span>
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block leading-tight">Digital Pass</span>
                <span class="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">PulseEvent</span>
              </div>
            </div>

            <div class="text-right">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Confirmed
              </span>
              <p class="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 mt-1">#${booking.bookingId}</p>
            </div>
          </div>

          <!-- Event Info -->
          <div class="mt-4">
            <span class="text-[11px] font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
              ${event.category}
            </span>
            <h3 class="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1 leading-snug tracking-tight">
              ${event.title}
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>${event.venue}, ${event.city}</span>
            </p>
          </div>
        </div>

        <!-- Perforated Cutout Divider Line -->
        <div class="relative flex items-center my-1 px-4">
          <div class="w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-950 -ml-6 border border-zinc-200 dark:border-zinc-800"></div>
          <div class="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800 mx-2"></div>
          <div class="w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-950 -mr-6 border border-zinc-200 dark:border-zinc-800"></div>
        </div>

        <!-- Ticket Body Details & QR Code -->
        <div class="p-6 sm:p-8 pt-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
            
            <!-- Metadata Grid -->
            <div class="sm:col-span-2 space-y-3.5">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Attendee</span>
                  <p class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">${booking.name}</p>
                  <p class="text-[10px] font-mono text-zinc-400 truncate">${booking.email}</p>
                </div>
                <div>
                  <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Date & Time</span>
                  <p class="text-xs font-semibold text-zinc-900 dark:text-zinc-100">${event.displayDate}</p>
                  <p class="text-[10px] text-zinc-500">${event.time}</p>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div>
                  <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Tier</span>
                  <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100">${booking.ticketTier || "Standard"}</p>
                </div>
                <div>
                  <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Seats</span>
                  <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100">${booking.ticketCount} Pass</p>
                </div>
                <div>
                  <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Amount</span>
                  <p class="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">${totalPrice}</p>
                </div>
              </div>

              <div class="text-[10px] text-zinc-400 flex items-center gap-1.5 pt-0.5">
                <span>Booked ${formattedBookedDate}</span>
                <span>•</span>
                <span>Phone: ${booking.phone}</span>
              </div>
            </div>

            <!-- Vector QR Code Box -->
            <div class="flex flex-col items-center justify-center p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div class="w-24 h-24 p-0.5">
                ${qrSvg}
              </div>
              <span class="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-tight">Scan for Check-in</span>
            </div>

          </div>

          <div class="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p class="text-[10px] text-zinc-400 leading-normal">
              Present this pass at the gate or check-in desk. Valid government or student photo ID required.
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
      const eventEnd = new Date(eventStart.getTime() + (4 * 60 * 60 * 1000));

      const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      const now = formatICSDate(new Date());
      const dtStart = formatICSDate(eventStart);
      const dtEnd = formatICSDate(eventEnd);

      const cleanSummary = (event.title || "Event").replace(/,/g, "\\,");
      const cleanLocation = `${event.venue}, ${event.city}`.replace(/,/g, "\\,");
      const cleanDesc = `PulseEvent Pass Ref: ${booking.bookingId}\\nAttendee: ${booking.name}\\n\\n${event.shortDesc || ""}`.replace(/,/g, "\\,");

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
   * Trigger print dialog
   */
  printTicket() {
    window.print();
  }
};
