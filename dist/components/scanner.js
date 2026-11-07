"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketScannerComponent = void 0;
const storage_1 = require("../services/storage");
const audio_1 = require("../services/audio");
const gsap_orchestrator_1 = require("../animations/gsap-orchestrator");
class TicketScannerComponent {
    static verifyPass(codeOrId) {
        let bookingId = codeOrId.trim();
        // Check if input is a JSON string from QR Code
        if (bookingId.startsWith("{") && bookingId.endsWith("}")) {
            try {
                const parsed = JSON.parse(bookingId);
                if (parsed.id)
                    bookingId = parsed.id;
            }
            catch {
                // Fall back to raw string
            }
        }
        // Strip leading hash if present
        if (bookingId.startsWith("#")) {
            bookingId = bookingId.substring(1);
        }
        const res = storage_1.StorageManager.checkInBooking(bookingId);
        if (res.success && res.booking) {
            audio_1.AudioManager.playSuccess();
            gsap_orchestrator_1.AnimationOrchestrator.triggerConfetti();
            const detailsHtml = `
        <div class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3 text-left">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">#${res.booking.bookingId}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">CHECKED IN</span>
          </div>
          <div>
            <h4 class="text-base font-bold text-zinc-900 dark:text-zinc-100">${res.booking.name}</h4>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 font-mono">${res.booking.email} • ${res.booking.phone}</p>
          </div>
          <div class="text-xs text-zinc-600 dark:text-zinc-300 border-t border-emerald-200/60 dark:border-emerald-800/60 pt-2 font-medium">
            <p><strong>Event:</strong> ${res.booking.eventTitle}</p>
            <p><strong>Tier:</strong> ${res.booking.ticketTier} (${res.booking.ticketCount} seat${res.booking.ticketCount > 1 ? "s" : ""})</p>
          </div>
        </div>
      `;
            return {
                success: true,
                message: "Pass verified successfully!",
                detailsHtml
            };
        }
        else {
            return {
                success: false,
                message: res.message
            };
        }
    }
}
exports.TicketScannerComponent = TicketScannerComponent;
