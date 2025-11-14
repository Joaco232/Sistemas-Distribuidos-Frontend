
const BACK_URL = import.meta.env.VITE_API_BACK_URL  || "http://localhost:8080";



export async function fetchMoviesByName(name, page = 1, language = "es-MX", includeAdult = false) {

    try {
        const params = new URLSearchParams({
            name,
            page,
            language,
            include_adult: includeAdult,
        });

        const response = await fetch(`${BACK_URL}/movie/name/search?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {

        console.error("Error fetching movies:", error);

        throw error;

    }
}