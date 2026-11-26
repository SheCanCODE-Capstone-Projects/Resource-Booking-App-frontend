const API_BASE_URL = process.env.REACT_APP_API_URL;

console.log("Backend API URL:", API_BASE_URL);

export async function apiRequest(endpoint, options = {}) {
    if (!API_BASE_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const token = localStorage.getItem("spacesync-auth-token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    const responseText = await response.text();

    let data = null;

    if (responseText) {
        try {
            data = JSON.parse(responseText);
        } catch {
            data = responseText;
        }
    }

    if (!response.ok) {
        const message =
            typeof data === "object" && data !== null
                ? data.message || data.error
                : data;

        throw new Error(
            message || `Request failed with status ${response.status}`
        );
    }

    return data;
}
