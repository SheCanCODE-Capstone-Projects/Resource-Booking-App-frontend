
import initialResources from "./resources";

const STORAGE_KEY = "spacesync-admin-resources";
const RESOURCE_EVENT = "spacesync-resources-updated";

// Get all resources from localStorage.
export function getResources() {
    try {
        const savedResources = localStorage.getItem(STORAGE_KEY);

        if (!savedResources) {
            return initialResources;
        }

        const parsedResources = JSON.parse(savedResources);

        if (!Array.isArray(parsedResources)) {
            console.warn("Invalid resource data. Loading default resources.");
            return initialResources;
        }

        return parsedResources;

    } catch (error) {
        console.error("Could not load resources:", error);
        return initialResources;
    }
}

// Get one resource by ID.
export function getResourceById(id) {
    return getResources().find(
        (resource) => String(resource.id) === String(id)
    ) || null;
}

// Save resources locally.
export function saveResources(resources) {
    if (!Array.isArray(resources)) {
        throw new Error("Resources must be an array.");
    }

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(resources)
        );

        window.dispatchEvent(
            new Event(RESOURCE_EVENT)
        );

    } catch (error) {
        console.error("Could not save resources:", error);
        throw error;
    }
}

// Reset resources to the original catalogue.
export function resetResources() {
    try {
        localStorage.removeItem(STORAGE_KEY);

        window.dispatchEvent(
            new Event(RESOURCE_EVENT)
        );

    } catch (error) {
        console.error("Could not reset resources:", error);
        throw error;
    }
}

// Listen for resource changes.
export function subscribeToResourceChanges(callback) {
    window.addEventListener(RESOURCE_EVENT, callback);
    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener(RESOURCE_EVENT, callback);
        window.removeEventListener("storage", callback);
    };
}
