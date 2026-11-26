
import { apiRequest } from "./apiClient";

// Register a new user.
export function registerUser({ firstName, lastName, email, password }) {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            userName: email,
            password,
        }),
    });
}

// Login and receive the JWT token.
export function loginUser(email, password) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username: email,
            password,
        }),
    });
}

// Verify email using the six-digit OTP.
export function verifyEmail(email, otp) {
    return apiRequest("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
    });
}

// Request another verification OTP.
export function resendVerification(email) {
    return apiRequest("/auth/resend-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

// Request a password recovery OTP.
export function forgotPassword(email) {
    return apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

// Reset password using the recovery token.
export function resetPassword(email, token, newPassword) {
    return apiRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
            email,
            token,
            newPassword,
        }),
    });
}

// Change password for an authenticated user.
export function changePassword(currentPassword, newPassword) {
    return apiRequest("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
            currentPassword,
            newPassword,
        }),
    });
}
