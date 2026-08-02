const API_URL = "http://localhost:8080/api/auth"; //DEVELOPMENT ONLY

export async function register(name, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, passwordHash : password }),
    });

    if (!response.ok) throw new Error("Registration failed");

    return await response.json();
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Wrong email or password");


    const data = await response.json();
    return data.token;
}

export async function requestPasswordReset(email) {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error("The request couldn't be processed");
    return await response.json();
}

export async function resetPassword(token, newPassword) {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
    });
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "Password change failed");
    }
    return await response.json();
}

export async function verifyEmail(token) {
    const response = await fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "The email couldn't be verified");
    }
    return await response.json();
}

export async function resendVerification(email) {
    const response = await fetch(`${API_URL}/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error("The verification link couldn't be resent");
    return await response.json();
}

