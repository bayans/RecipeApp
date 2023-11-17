const isPasswordValid = password => {
    // Check minimum length
    if (password.length < 8) {
        return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Check for at least one numeric digit
    if (!/[0-9]/.test(password)) {
        return false;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)) {
        return false;
    }

    // Check for common words, patterns, or your custom blacklist
    const commonPasswords = ["Password_123"]; // Example common passwords
    if (commonPasswords.includes(password.toLowerCase())) {
        return false;
    }

    return true;
}

export default isPasswordValid;