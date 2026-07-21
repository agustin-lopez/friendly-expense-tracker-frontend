const API_BASE_URL = "http://localhost:8080/api";

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || `Error ${response.status}`);
    }

    if (response.status === 204) return null;

    return await response.json();
}

export const apiClient = {
    get: (endpoint) => request(endpoint, { method: "GET" }),
    post: (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};