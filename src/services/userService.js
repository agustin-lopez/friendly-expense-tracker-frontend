import { apiClient } from "./apiClient";

export function updateProfile(name) {
    return apiClient.put("/users/me", { name });
}

export function requestPasswordChange(currentPassword, newPassword) {
    return apiClient.put("/users/me/password/request", { currentPassword, newPassword });
}