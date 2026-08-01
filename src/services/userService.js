import { apiClient } from "./apiClient";

export function updateProfile(name) {
    return apiClient.put("/users/me", { name });
}

export function changePassword(userId, currentPassword, newPassword) {
    return apiClient.put(`/users/${userId}/password`, { currentPassword, newPassword });
}