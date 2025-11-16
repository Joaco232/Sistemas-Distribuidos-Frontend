
const BACK_URL = import.meta.env.VITE_API_BACK_URL;

export async function registerUser(userData, timeout = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Public endpoint: POST /user
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

    throw error;
  }
}

/**
 * Inicia sesión con email y contraseña
 */
export async function loginUser(userLogin) {
  // Public endpoint: POST /auth/login
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






export async function changePassword(data) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch(`${BACK_URL}/user/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al cambiar la contraseña");
  }

  return await response.json();
}


export async function changeName(data) {

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await fetch(`${BACK_URL}/user/name`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al cambiar el nombre");
  }

  return await response.json();
}

export async function changeUserPlatforms(data) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch(`${BACK_URL}/user/platforms`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar las plataformas del usuario");
  }

  return await response.json();
}




export async function getAllDBPlatforms(token) {
  const controller = new AbortController();
  const headers = {
    "Accept": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BACK_URL}/provider/all`, {
    method: "GET",
    headers,
    signal: controller.signal,
  });

  if (!response.ok) {
    const message = `Error ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

