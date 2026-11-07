"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketManager = void 0;
const currency_1 = require("./currency");
class TicketManager {
    /**
     * Deterministic Vector QR Code SVG Generator
     */
    static generateQRCodeSVG(payload, size = 180) {
        let hash = 0;
        for (let i = 0; i < payload.length; i++) {
            hash = (hash << 5) - hash + payload.charCodeAt(i);
            hash |= 0;
        }
        const gridSize = 21;
        const cellSize = size / gridSize;
        let paths = "";
        function isFinder(r, c) {
            if (r < 7 && c < 7)
                return true;
            if (r < 7 && c >= gridSize - 7)
                return true;
            if (r >= gridSize - 7 && c < 7)
                return true;
            return false;
        }
        function isFinderDark(r, c) {
            const inBox1 = r < 7 && c < 7;
            const inBox2 = r < 7 && c >= gridSize - 7;
            const inBox3 = r >= gridSize - 7 && c < 7;
            let lr = r;
            let lc = c;
            if (inBox2)
                lc = c - (gridSize - 7);
            if (inBox3)
                lr = r - (gridSize - 7);
            if (inBox1 || inBox2 || inBox3) {
                if (lr === 0 || lr === 6 || lc === 0 || lc === 6)
                    return true;
                if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4)
                    return true;
                return false;
            }
            return false;
        }
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                let isDark = false;
                if (isFinder(r, c)) {
                    isDark = isFinderDark(r, c);
                }
                else {
                    const pseudoBit = ((hash ^ (r * 31 + c * 17)) & (1 << ((r + c) % 16))) !== 0;
                    isDark = pseudoBit;
                }
                if (isDark) {
                    const x = (c * cellSize).toFixed(2);
                    const y = (r * cellSize).toFixed(2);
                    const w = cellSize.toFixed(2);
                    paths += `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="currentColor" rx="1.5"/>`;
                }
            }
        }
        return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="w-full h-full text-zinc-950 dark:text-zinc-50">
        ${paths}
      </svg>
    `;
    }
    /**
     * RFC 5545 iCalendar (.ics) standard download
     */
    static downloadCalendarICS(booking, event) {
        const formatDate = (dateStr) => {
            const d = new Date(dateStr);
            return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        };
        const start = formatDate(event.date);
        const end = formatDate(new Date(new Date(event.date).getTime() + 3 * 60 * 60 * 1000).toISOString());
        const icsContent = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//EventPulse//Event Pass//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            `UID:${booking.bookingId}@pulseevent.io`,
            `DTSTAMP:${formatDate(new Date().toISOString())}`,
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.shortDesc} \\nPass Ref: ${booking.bookingId} \\nTier: ${booking.ticketTier}`,
            `LOCATION:${event.venue}, ${event.city}`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `pulse-pass-${booking.bookingId}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    /**
     * Print Ticket Formatting
     */
    static printTicket() {
        window.print();
    }
    /**
     * Render Digital Boarding Pass HTML
     */
    static renderTicketHTML(booking, event) {
        const qrPayload = JSON.stringify({
            id: booking.bookingId,
            event: event.title,
            name: booking.name,
            seats: booking.ticketCount,
            tier: booking.ticketTier
        });
        const qrSvg = this.generateQRCodeSVG(qrPayload, 170);
        const formattedPrice = currency_1.CurrencyManager.formatPrice(event.isFree ? 0 : event.price * booking.ticketCount, event.isFree);
        return `
      <div class="ticket-boarding-pass max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
        <div class="p-6 sm:p-8 border-b border-dashed border-zinc-200 dark:border-zinc-800 relative bg-zinc-50/60 dark:bg-zinc-850/60">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm">
                P
              </span>
              <div>
                <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block leading-tight">Official Boarding Pass</span>
                <span class="text-base font-bold text-zinc-900 dark:text-zinc-100">EventPulse</span>
              </div>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ${booking.checkedIn ? "Checked In" : "Confirmed"}
            </span>
          </div>

          <div class="mt-6">
            <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              ${event.category} • ${booking.ticketTier || "Standard"}
            </span>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">
              ${event.title}
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
              <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              <span>${event.venue}, ${event.city}</span>
            </p>
          </div>
        </div>

        <div class="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div class="sm:col-span-2 grid grid-cols-2 gap-4 text-left">
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Attendee</span>
              <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">${booking.name}</p>
              <p class="text-[11px] font-mono text-zinc-400 truncate">${booking.email}</p>
            </div>
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Date & Time</span>
              <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">${event.displayDate}</p>
              <p class="text-[11px] font-mono text-zinc-400">${event.time}</p>
            </div>
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Pass Ref</span>
              <p class="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">#${booking.bookingId}</p>
            </div>
            <div>
              <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">Reserved</span>
              <p class="text-xs font-bold text-zinc-900 dark:text-zinc-100">${booking.ticketCount} Pass (${formattedPrice})</p>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800">
            <div class="w-28 h-28 p-1 bg-white rounded-xl flex items-center justify-center shadow-inner">
              ${qrSvg}
            </div>
            <span class="text-[9px] font-mono text-zinc-400 mt-2 uppercase tracking-wider">Scan to Check-in</span>
          </div>
        </div>
      </div>
    `;
    }
}
exports.TicketManager = TicketManager;
