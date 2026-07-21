import { apiClient } from "./apiClient";

export function getTransactions() { return apiClient.get("/transactions"); }

export function createTransaction(transaction) { return apiClient.post("/transactions", transaction); }

export function deleteTransaction(id) { return apiClient.delete(`/transactions/${id}`); }