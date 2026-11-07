/**
 * PulseEvent - Form Validation Engine
 * Provides live, real-time validation and submission verification
 */

const FormValidator = {
  // Regular expressions for strict validation
  patterns: {
    name: /^[a-zA-ZÀ-ÿ\s'.-]{3,60}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\+?[0-9]{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/
  },

  /**
   * Validate participant name
   */
  validateName(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) {
      return { valid: false, message: "Full name is required." };
    }
    if (trimmed.length < 3) {
      return { valid: false, message: "Name must be at least 3 characters long." };
    }
    if (trimmed.length > 60) {
      return { valid: false, message: "Name cannot exceed 60 characters." };
    }
    if (!this.patterns.name.test(trimmed)) {
      return { valid: false, message: "Name can only contain letters, spaces, and hyphens." };
    }
    return { valid: true, message: "" };
  },

  /**
   * Validate email address
   */
  validateEmail(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) {
      return { valid: false, message: "Email address is required." };
    }
    if (!this.patterns.email.test(trimmed)) {
      return { valid: false, message: "Please enter a valid email address (e.g. name@domain.com)." };
    }
    return { valid: true, message: "" };
  },

  /**
   * Validate phone number
   */
  validatePhone(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) {
      return { valid: false, message: "Phone number is required." };
    }
    // Extract raw digits
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return { valid: false, message: "Please enter a valid 10-digit phone number." };
    }
    if (!this.patterns.phone.test(trimmed)) {
      return { valid: false, message: "Phone number contains invalid format." };
    }
    return { valid: true, message: "" };
  },

  /**
   * Validate ticket quantity against available spots
   */
  validateTickets(count, maxAvailable) {
    const num = parseInt(count, 10);
    if (isNaN(num) || num < 1) {
      return { valid: false, message: "Please select at least 1 ticket." };
    }
    if (num > 5) {
      return { valid: false, message: "Maximum limit is 5 tickets per registration." };
    }
    if (maxAvailable !== undefined && num > maxAvailable) {
      return { valid: false, message: `Only ${maxAvailable} spot(s) remaining for this event.` };
    }
    return { valid: true, message: "" };
  },

  /**
   * Validate terms agreement
   */
  validateTerms(isChecked) {
    if (!isChecked) {
      return { valid: false, message: "You must accept the terms & conditions to proceed." };
    }
    return { valid: true, message: "" };
  },

  /**
   * Set UI error state on an input element and its sibling error text container
   */
  setFieldStatus(inputEl, errorEl, result) {
    if (!inputEl) return;
    
    if (result.valid) {
      inputEl.classList.remove("border-red-500", "focus:ring-red-500", "dark:border-red-500");
      inputEl.classList.add("border-emerald-500", "focus:ring-emerald-500", "dark:border-emerald-500");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.add("hidden");
      }
    } else {
      inputEl.classList.remove("border-emerald-500", "focus:ring-emerald-500", "dark:border-emerald-500");
      inputEl.classList.add("border-red-500", "focus:ring-red-500", "dark:border-red-500");
      if (errorEl) {
        errorEl.textContent = result.message;
        errorEl.classList.remove("hidden");
      }
    }
  },

  /**
   * Reset field state
   */
  resetFieldStatus(inputEl, errorEl) {
    if (!inputEl) return;
    inputEl.classList.remove(
      "border-red-500", "focus:ring-red-500", "dark:border-red-500",
      "border-emerald-500", "focus:ring-emerald-500", "dark:border-emerald-500"
    );
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
  },

  /**
   * Validate entire registration form payload
   */
  validateAll(formData, eventAvailableSpots) {
    const errors = {};

    const nameRes = this.validateName(formData.name);
    if (!nameRes.valid) errors.name = nameRes.message;

    const emailRes = this.validateEmail(formData.email);
    if (!emailRes.valid) errors.email = emailRes.message;

    const phoneRes = this.validatePhone(formData.phone);
    if (!phoneRes.valid) errors.phone = phoneRes.message;

    const ticketRes = this.validateTickets(formData.ticketCount, eventAvailableSpots);
    if (!ticketRes.valid) errors.ticketCount = ticketRes.message;

    const termsRes = this.validateTerms(formData.terms);
    if (!termsRes.valid) errors.terms = termsRes.message;

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};
