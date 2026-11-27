
const API_BASE_URL = process.env.REACT_APP_API_URL;

console.log("Backend API URL:", API_BASE_URL);

export async function apiRequest(endpoint, options = {}) {
    if (!API_BASE_URL) {
        throw new Error("Backend API URL is not configured.");
    }

    const token = localStorage.getItem("spacesync-auth-token");

    // Prepare request headers
    const headers = {
        ...options.headers,
    };

    // Only send JSON Content-Type when the request has a body
    if (options.body) {
        headers["Content-Type"] = "application/json";
    }

    // Attach authentication token when available
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                ...options,
                headers,
            }
        );

        // Read the response
        const responseText = await response.text();

        let data = null;

        // Parse JSON responses
        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch {
                data = responseText;
            }
        }

        // Handle unsuccessful responses
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

    } catch (error) {
        console.error("API Request Error:", error.message);

        throw error;
    }
}
