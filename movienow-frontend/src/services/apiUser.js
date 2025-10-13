
const BACK_URL = import.meta.env.VITE_API_BACK_URL  || "http://localhost:8080";

export async function registerUser(userData) {
    const response = await fetch(`${BACK_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {

        const errorData = await response.json();

        const message = errorData?.message || "Error desconocido al registrar el usuario.";

        throw new Error(message);
    }

    return response.json();
}