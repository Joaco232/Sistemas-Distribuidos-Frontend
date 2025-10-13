
const BACK_URL = import.meta.env.VITE_API_BACK_URL  || "http://localhost:8080";

export async function registerUser(userData) {
    const response = await fetch(`${BACK_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Error al registrar el usuario.");
    }

    return response.json();
}