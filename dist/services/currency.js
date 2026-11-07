"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyManager = exports.CURRENCIES = void 0;
exports.CURRENCIES = {
    USD: { code: "USD", symbol: "$", rate: 1.0 },
    EUR: { code: "EUR", symbol: "€", rate: 0.92 },
    GBP: { code: "GBP", symbol: "£", rate: 0.79 },
    INR: { code: "INR", symbol: "₹", rate: 83.5 },
    CAD: { code: "CAD", symbol: "CA$", rate: 1.36 }
};
class CurrencyManager {
    static currentCode = "USD";
    static init() {
        const saved = localStorage.getItem("pulse_currency");
        if (saved && exports.CURRENCIES[saved]) {
            this.currentCode = saved;
        }
        return this.currentCode;
    }
    static getCurrency() {
        return exports.CURRENCIES[this.currentCode] || exports.CURRENCIES.USD;
    }
    static setCurrency(code) {
        if (exports.CURRENCIES[code]) {
            this.currentCode = code;
            localStorage.setItem("pulse_currency", code);
        }
        return this.getCurrency();
    }
    static formatPrice(baseUsdPrice, isFree) {
        if (isFree || baseUsdPrice === 0) {
            return "Free";
        }
        const curr = this.getCurrency();
        const converted = Math.round(baseUsdPrice * curr.rate);
        return `${curr.symbol}${converted.toLocaleString()}`;
    }
    static convertPrice(baseUsdPrice) {
        const curr = this.getCurrency();
        return Math.round(baseUsdPrice * curr.rate);
    }
}
exports.CurrencyManager = CurrencyManager;
