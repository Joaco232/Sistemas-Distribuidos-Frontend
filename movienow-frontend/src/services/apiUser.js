
const BACK_URL = import.meta.env.VITE_API_BACK_URL  || "http://localhost:8080";

export async function registerUser(userData, timeout = 3000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${BACK_URL}/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData?.message || "Error desconocido al registrar el usuario.";
            throw new Error(message);
        }

        return await response.json();

    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Tiempo de espera agotado. Intente nuevamente.");
        }
        throw error;
    }
}


export async function loginUser(userLogin) {
    const response = await fetch(`${BACK_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin),
    });

    if (!response.ok) {

        const errorData = await response.json();

        const message = errorData?.message || "Error desconocido al registrar el usuario.";

        throw new Error(message);
    }

    return response.json();
}



