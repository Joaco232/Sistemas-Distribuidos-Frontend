
const BACK_URL = import.meta.env.VITE_API_BACK_URL  || "http://localhost:8080";

export async function registerUser(userData, timeout = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${BACK_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // asegura que el backend devuelva JSON
      },
      body: JSON.stringify(userData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Verificar si la respuesta es JSON
    const isJson = response.headers
      ?.get("content-type")
      ?.toLowerCase()
      ?.includes("application/json");

    // Si hubo error, intentar leer el JSON
    const errorData = !response.ok && isJson
      ? await response.json().catch(() => ({}))
      : {};

    if (!response.ok) {
      // Buscar el mensaje más claro posible
      const message =
        errorData?.message ||
        errorData?.detail ||
        errorData?.error ||
        errorData?.title ||
        "Error desconocido al registrar el usuario.";
      throw new Error(message);
    }

    // Si todo está bien, devolver el body (si es JSON)
    return isJson ? await response.json() : null;

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Tiempo de espera agotado. Intente nuevamente.");
    }

    // Propagar el error al componente
    throw error;
  }
}

/**
 * Inicia sesión con email y contraseña
 */
export async function loginUser(userLogin) {
  const response = await fetch(`${BACK_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(userLogin),
  });

  // Detectar si la respuesta es JSON
  const isJson = response.headers
    ?.get("content-type")
    ?.toLowerCase()
    ?.includes("application/json");

  const errorData = !response.ok && isJson
    ? await response.json().catch(() => ({}))
    : {};

  if (!response.ok) {
    const message =
      errorData?.message ||
      errorData?.detail ||
      errorData?.error ||
      errorData?.title ||
      "Error desconocido al iniciar sesión.";
    throw new Error(message);
  }

  return isJson ? await response.json() : null;
}

/**
 * Obtiene los datos del usuario autenticado
 */
export async function getCurrentUser(timeout = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token de autenticación disponible.");
  }

  try {
    const response = await fetch(`${BACK_URL}/user/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Verificar si la respuesta es JSON
    const isJson = response.headers
      ?.get("content-type")
      ?.toLowerCase()
      ?.includes("application/json");

    // Leer posibles errores
    const errorData = !response.ok && isJson
      ? await response.json().catch(() => ({}))
      : {};

    if (!response.ok) {
      const message =
        errorData?.message ||
        errorData?.detail ||
        errorData?.error ||
        errorData?.title ||
        "Error al obtener los datos del usuario.";
      throw new Error(message);
    }

    // Devolver el JSON del usuario
    return isJson ? await response.json() : null;

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Tiempo de espera agotado. Intente nuevamente.");
    }

    throw error;
  }
}