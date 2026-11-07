import { EventItem } from "../types";
import { CurrencyManager } from "../services/currency";

export class CalendarViewComponent {
  private static currentMonth: number = new Date().getMonth();
  private static currentYear: number = new Date().getFullYear();
  private static selectedDateStr: string | null = null;
  private static onSelectDateCallback: ((dateStr: string | null) => void) | null = null;

  public static init(onSelectDate: (dateStr: string | null) => void): void {
    this.onSelectDateCallback = onSelectDate;
  }

  public static nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
  }

  public static prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
  }

  public static render(events: EventItem[]): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Group events by date string: YYYY-MM-DD
    const eventDateMap: Record<string, EventItem[]> = {};
    events.forEach(ev => {
      const d = ev.date.split("T")[0];
      if (!eventDateMap[d]) eventDateMap[d] = [];
      eventDateMap[d].push(ev);
    });

    let daysHtml = "";
    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
      daysHtml += `<div class="h-24 sm:h-28 p-2 rounded-xl border border-transparent bg-zinc-50/40 dark:bg-zinc-900/30 opacity-40"></div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = eventDateMap[dateStr] || [];
      const isSelected = this.selectedDateStr === dateStr;
      const hasEvents = dayEvents.length > 0;

      const eventsPills = dayEvents.slice(0, 2).map(ev => `
        <div class="truncate text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/40 mt-1" title="${ev.title}">
          ${ev.title}
        </div>
      `).join("");

      const moreCount = dayEvents.length > 2 ? `<span class="text-[9px] font-bold text-zinc-400 block mt-0.5">+${dayEvents.length - 2} more</span>` : "";

      daysHtml += `
        <button 
          class="calendar-day-cell h-24 sm:h-28 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all ${
            isSelected 
              ? "ring-2 ring-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-500" 
              : hasEvents 
              ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-indigo-400" 
              : "bg-white/60 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50"
          }" 
          data-date="${dateStr}"
        >
          <div class="flex items-center justify-between w-full">
            <span class="text-xs sm:text-sm font-bold ${hasEvents ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}">${day}</span>
            ${hasEvents ? `<span class="w-2 h-2 rounded-full bg-indigo-600"></span>` : ""}
          </div>
          <div class="w-full min-w-0 mt-1 flex-1 overflow-hidden">
            ${eventsPills}
            ${moreCount}
          </div>
        </button>
      `;
    }

    return `
      <div class="calendar-container bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl">
        <!-- Calendar Header -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              ${monthNames[this.currentMonth]} ${this.currentYear}
            </h3>
            <p class="text-xs text-zinc-400 mt-0.5">Click any day to filter events scheduled on that date</p>
          </div>
          <div class="flex items-center gap-2">
            ${this.selectedDateStr ? `
              <button id="cal-clear-date-btn" class="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 transition-colors mr-2">
                Clear Selection
              </button>
            ` : ""}
            <button id="cal-prev-btn" class="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Previous Month">
              <svg class="w-4 h-4 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button id="cal-next-btn" class="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Next Month">
              <svg class="w-4 h-4 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        <!-- Days of Week Header -->
        <div class="grid grid-cols-7 gap-2 sm:gap-3 text-center py-3 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-2 sm:gap-3">
          ${daysHtml}
        </div>
      </div>
    `;
  }

  public static bindEvents(renderCallback: () => void): void {
    const prevBtn = document.getElementById("cal-prev-btn");
    const nextBtn = document.getElementById("cal-next-btn");
    const clearBtn = document.getElementById("cal-clear-date-btn");

    if (prevBtn) {
      prevBtn.onclick = () => {
        this.prevMonth();
        renderCallback();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        this.nextMonth();
        renderCallback();
      };
    }
    if (clearBtn) {
      clearBtn.onclick = () => {
        this.selectedDateStr = null;
        if (this.onSelectDateCallback) this.onSelectDateCallback(null);
        renderCallback();
      };
    }

    document.querySelectorAll<HTMLElement>(".calendar-day-cell").forEach(cell => {
      cell.onclick = () => {
        const d = cell.dataset.date || null;
        this.selectedDateStr = this.selectedDateStr === d ? null : d;
        if (this.onSelectDateCallback) this.onSelectDateCallback(this.selectedDateStr);
        renderCallback();
      };
    });
  }
}
