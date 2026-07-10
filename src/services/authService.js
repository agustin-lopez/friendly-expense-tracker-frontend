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

