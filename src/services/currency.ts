import { CurrencyCode, CurrencyConfig } from "../types";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 1.0 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", rate: 0.79 },
  INR: { code: "INR", symbol: "₹", rate: 83.5 },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36 }
};

export class CurrencyManager {
  private static currentCode: CurrencyCode = "USD";

  public static init(): CurrencyCode {
    const saved = localStorage.getItem("pulse_currency") as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) {
      this.currentCode = saved;
    }
    return this.currentCode;
  }

  public static getCurrency(): CurrencyConfig {
    return CURRENCIES[this.currentCode] || CURRENCIES.USD;
  }

  public static setCurrency(code: CurrencyCode): CurrencyConfig {
    if (CURRENCIES[code]) {
      this.currentCode = code;
      localStorage.setItem("pulse_currency", code);
    }
    return this.getCurrency();
  }

  public static formatPrice(baseUsdPrice: number, isFree?: boolean): string {
    if (isFree || baseUsdPrice === 0) {
      return "Free";
    }
    const curr = this.getCurrency();
    const converted = Math.round(baseUsdPrice * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  }

  public static convertPrice(baseUsdPrice: number): number {
    const curr = this.getCurrency();
    return Math.round(baseUsdPrice * curr.rate);
  }
}
