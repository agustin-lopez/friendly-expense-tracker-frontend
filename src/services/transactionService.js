import { apiClient } from "./apiClient";

export function getTransactions() { return apiClient.get("/transactions"); }

export function createTransaction(transaction) { return apiClient.post("/transactions", transaction); }

export function deleteTransaction(id) { return apiClient.delete(`/transactions/${id}`); }

export function updateTransaction(id, transaction) { return apiClient.put(`/transactions/${id}`, transaction); }

export function getSummary() { return apiClient.get("/transactions/summary"); }

export function getExpensesByCategory(type) {
    const typeParam = type ? `?type=${type}` : "";
    return apiClient.get(`/transactions/by-category${typeParam}`);
}

export function getGroupedTransactions(page, type, size = 2) {
    const typeParam = type && type !== "ALL" ? `&type=${type}` : "";
    return apiClient.get(`/transactions/grouped?page=${page}&size=${size}${typeParam}`);
}

export function searchTransactions(query, type) {
    const typeParam = type && type !== "ALL" ? `&type=${type}` : "";
    return apiClient.get(`/transactions/search?query=${encodeURIComponent(query)}${typeParam}`);
}