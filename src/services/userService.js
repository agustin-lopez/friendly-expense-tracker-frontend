import { apiClient } from "./apiClient";

export function updateProfile(name, email) {
    return apiClient.put("/users/me", { name, email });
}

export function changePassword(userId, newPassword) {
    return apiClient.put(`/users/${userId}/password`, { newPassword });
}