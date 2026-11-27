
import { apiRequest } from "./apiClient";

// GET: Fetch resources with optional filters.
export function getResources(filters = {}) {
    const queryParams = new URLSearchParams();

    if (filters.category) {
        queryParams.append("category", filters.category);
    }

    if (filters.location) {
        queryParams.append("location", filters.location);
    }

    if (filters.minCapacity !== undefined && filters.minCapacity !== "") {
        queryParams.append("minCapacity", filters.minCapacity);
    }

    if (filters.active !== undefined) {
        queryParams.append("active", filters.active);
    }

    const queryString = queryParams.toString();
    const endpoint = queryString
        ? `/api/resources?${queryString}`
        : "/api/resources";

    return apiRequest(endpoint);
}

// GET: Fetch one resource by ID.
export function getResourceById(id) {
    return apiRequest(`/api/resources/${id}`);
}

// POST: Create a resource.
export function createResource(resourceData) {
    return apiRequest("/api/resources", {
        method: "POST",
        body: JSON.stringify(resourceData),
    });
}

// PUT: Update a resource.
export function updateResource(id, resourceData) {
    return apiRequest(`/api/resources/${id}`, {
        method: "PUT",
        body: JSON.stringify(resourceData),
    });
}

// DELETE: Deactivate a resource.
export function deactivateResource(id) {
    return apiRequest(`/api/resources/${id}`, {
        method: "DELETE",
    });
}

// GET: Fetch resource availability for a specific date.
export function getResourceAvailability(id, date) {
    const queryParams = new URLSearchParams({ date });

    return apiRequest(
        `/resources/${id}/availability?${queryParams.toString()}`
    );
}
