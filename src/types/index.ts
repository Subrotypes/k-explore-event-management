/**
 * EventPulse TypeScript Definitions
 * High-precision typings for events, bookings, tickets, and UI state
 */

export type EventCategory = 
  | "Technology" 
  | "Music" 
  | "Design" 
  | "Business" 
  | "Sports" 
  | "Workshops";

export type CategoryKey = "tech" | "music" | "design" | "business" | "sports" | "workshop";

export type TicketTierType = "standard" | "vip" | "student" | "earlybird";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "CAD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Conversion rate relative to USD
}

export interface Speaker {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface Organizer {
  name: string;
  email: string;
  avatar: string;
}

export interface EventReview {
  id: string;
  author: string;
  avatar: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  categoryKey: CategoryKey;
  tag: string;
  featured: boolean;
  date: string; // ISO 8601 string
  displayDate: string;
  time: string;
  venue: string;
  city: string;
  price: number; // Base price in USD
  isFree: boolean;
  totalCapacity: number;
  bookedCount: number;
  image: string;
  shortDesc: string;
  description: string;
  organizer: Organizer;
  speakers: Speaker[];
  agenda: AgendaItem[];
  perks: string[];
  reviews?: EventReview[];
  rating?: number;
}

export interface TicketBooking {
  bookingId: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  ticketTier: string;
  tierKey?: TicketTierType;
  currency?: CurrencyCode;
  totalPrice?: number;
  notes?: string;
  timestamp: number;
  checkedIn?: boolean;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  ticketTier: TicketTierType;
  terms: boolean;
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface FormValidationSummary {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FilterState {
  category: string;
  search: string;
  dateFilter: "all" | "week" | "month" | "weekend";
  priceFilter: "all" | "free" | "under50" | "50plus";
  sortBy: "date-asc" | "price-asc" | "price-desc" | "popular";
  selectedDate?: string | null;
}

export type ViewMode = "grid" | "list" | "calendar";
