
import initialResources from "./resources";

const STORAGE_KEY = "spacesync-admin-resources";

const RESOURCE_EVENT = "spacesync-resources-updated";

// Get the complete resource catalogue.
export function getResources() {
    try {
        const savedResources = localStorage.getItem(STORAGE_KEY);

        if (!savedResources) {
            return initialResources;
        }

        const parsedResources = JSON.parse(savedResources);

        if (!Array.isArray(parsedResources)) {
            console.error("Invalid resource catalogue format.");
            return initialResources;
        }

        return parsedResources;
    } catch (error) {
        console.error("Could not load resources:", error);
        return initialResources;
    }
}

// Save the catalogue and notify other pages.
export function saveResources(resources) {
    if (!Array.isArray(resources)) {
        throw new Error("Resources must be an array.");
    }

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(resources)
        );

        // Notify components in the same browser tab.
        window.dispatchEvent(new Event(RESOURCE_EVENT));
    } catch (error) {
        console.error("Could not save resources:", error);
        throw error;
    }
}

// Listen for catalogue changes.
export function subscribeToResourceChanges(callback) {
    window.addEventListener(RESOURCE_EVENT, callback);
    window.addEventListener("storage", callback);
    window.addEventListener("focus", callback);

    return () => {
        window.removeEventListener(RESOURCE_EVENT, callback);
        window.removeEventListener("storage", callback);
        window.removeEventListener("focus", callback);
    };
}
