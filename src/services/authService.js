import { apiClient } from "./apiClient";

export async function login(email, password) {
    const data = await apiClient.post("/auth/login", { email, password });
    return data.token;
}

export function register(name, email, password) {
    return apiClient.post("/auth/register", { name, email, passwordHash: password });
}

export function requestPasswordReset(email) {
    return apiClient.post("/auth/forgot-password", { email });
}

export function resetPassword(token, newPassword) {
    return apiClient.post("/auth/reset-password", { token, newPassword });
}

export function verifyEmail(token) {
    return apiClient.post("/auth/verify-email", { token });
}

export function resendVerification(email) {
    return apiClient.post("/auth/resend-verification", { email });
}

export function confirmPasswordChange(token) {
    return apiClient.post("/auth/confirm-password-change", { token });
}