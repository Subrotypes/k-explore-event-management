"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormValidator = void 0;
class FormValidator {
    static validateName(name) {
        const trimmed = (name || "").trim();
        if (!trimmed) {
            return { valid: false, message: "Full name is required." };
        }
        if (trimmed.length < 3) {
            return { valid: false, message: "Name must be at least 3 characters." };
        }
        const nameRegex = /^[a-zA-Z\s.'-]+$/;
        if (!nameRegex.test(trimmed)) {
            return { valid: false, message: "Name can only contain letters, spaces, and hyphens." };
        }
        return { valid: true, message: "" };
    }
    static validateEmail(email) {
        const trimmed = (email || "").trim();
        if (!trimmed) {
            return { valid: false, message: "Email address is required." };
        }
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        if (!emailRegex.test(trimmed)) {
            return { valid: false, message: "Please enter a valid email address (e.g., name@domain.com)." };
        }
        return { valid: true, message: "" };
    }
    static validatePhone(phone) {
        const trimmed = (phone || "").trim();
        if (!trimmed) {
            return { valid: false, message: "Phone number is required." };
        }
        const digitsOnly = trimmed.replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            return { valid: false, message: "Phone number must contain between 10 and 15 digits." };
        }
        return { valid: true, message: "" };
    }
    static validateTicketCount(count, spotsAvailable) {
        const num = Number(count);
        if (isNaN(num) || num < 1) {
            return { valid: false, message: "Please select at least 1 ticket." };
        }
        if (num > 5) {
            return { valid: false, message: "Maximum 5 tickets allowed per reservation." };
        }
        if (num > spotsAvailable) {
            return { valid: false, message: `Only ${spotsAvailable} spot(s) remaining for this event.` };
        }
        return { valid: true, message: "" };
    }
    static validateTerms(checked) {
        if (!checked) {
            return { valid: false, message: "You must agree to the Terms of Service & Privacy Policy." };
        }
        return { valid: true, message: "" };
    }
    static validateAll(formData, spotsAvailable) {
        const errors = {};
        const nameRes = this.validateName(formData.name);
        if (!nameRes.valid)
            errors.name = nameRes.message;
        const emailRes = this.validateEmail(formData.email);
        if (!emailRes.valid)
            errors.email = emailRes.message;
        const phoneRes = this.validatePhone(formData.phone);
        if (!phoneRes.valid)
            errors.phone = phoneRes.message;
        const countRes = this.validateTicketCount(formData.ticketCount, spotsAvailable);
        if (!countRes.valid)
            errors.ticketCount = countRes.message;
        const termsRes = this.validateTerms(formData.terms);
        if (!termsRes.valid)
            errors.terms = termsRes.message;
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
    static setFieldStatus(inputEl, errorEl, result) {
        if (result.valid) {
            inputEl.classList.remove("border-red-500", "focus:ring-red-500");
            inputEl.classList.add("border-zinc-200", "dark:border-zinc-700");
            if (errorEl) {
                errorEl.textContent = "";
                errorEl.classList.add("hidden");
            }
        }
        else {
            inputEl.classList.add("border-red-500", "focus:ring-red-500");
            inputEl.classList.remove("border-zinc-200", "dark:border-zinc-700");
            if (errorEl) {
                errorEl.textContent = result.message;
                errorEl.classList.remove("hidden");
            }
        }
    }
    static resetFieldStatus(inputEl, errorEl) {
        inputEl.classList.remove("border-red-500", "focus:ring-red-500");
        inputEl.classList.add("border-zinc-200", "dark:border-zinc-700");
        if (errorEl) {
            errorEl.textContent = "";
            errorEl.classList.add("hidden");
        }
    }
}
exports.FormValidator = FormValidator;
