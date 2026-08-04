import { apiClient } from "./apiClient";

export function getCategories() { return apiClient.get("/categories"); }

export function createCategory(category) { return apiClient.post("/categories", category); }

export function updateCategory(id, category) { return apiClient.put(`/categories/${id}`, category); }

export function deleteCategory(id) { return apiClient.delete(`/categories/${id}`); }