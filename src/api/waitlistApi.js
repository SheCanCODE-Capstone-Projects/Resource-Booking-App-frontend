
import { apiRequest } from "./apiClient";

// Get waitlist entries belonging to the logged-in user
export async function getMyWaitlistEntries() {
    return apiRequest("/waitlist/my");
}

// Leave a waitlist entry
export async function leaveWaitlist(entryId) {
    if (!entryId) {
        throw new Error("Waitlist entry ID is required.");
    }

    return apiRequest(`/waitlist/${entryId}`, {
        method: "DELETE",
    });
}

