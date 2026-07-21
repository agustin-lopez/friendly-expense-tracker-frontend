import { apiClient } from "./apiClient";

export function getCategories() { return apiClient.get("/categories"); }

export function createCategory(category) { return apiClient.post("/categories", category); }