import { apiClient } from "./apiClient";

export function updateProfile(name, email) {
    return apiClient.put("/users/me", { name, email });
}

export function changePassword(userId, currentPassword, newPassword) {
    return apiClient.put(`/users/${userId}/password`, { currentPassword, newPassword });
}