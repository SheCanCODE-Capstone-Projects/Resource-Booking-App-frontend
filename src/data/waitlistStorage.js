
const STORAGE_KEY = "spacesync-waitlist";
const WAITLIST_EVENT = "spacesync-waitlist-updated";

export function getWaitlistEntries() {
    try {
        const savedEntries = localStorage.getItem(STORAGE_KEY);

        if (!savedEntries) {
            return [];
        }

        const entries = JSON.parse(savedEntries);

        if (!Array.isArray(entries)) {
            console.error("Invalid waitlist data.");
            return [];
        }

        return entries;
    } catch (error) {
        console.error("Could not load waitlist:", error);
        return [];
    }
}

export function saveWaitlistEntries(entries) {
    if (!Array.isArray(entries)) {
        throw new Error("Waitlist entries must be an array.");
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        window.dispatchEvent(new Event(WAITLIST_EVENT));
    } catch (error) {
        console.error("Could not save waitlist:", error);
        throw error;
    }
}

export function joinWaitlist(entry) {
    const entries = getWaitlistEntries();

    const alreadyJoined = entries.some(
        (item) =>
            item.resourceId === entry.resourceId &&
            item.userId === entry.userId &&
            item.date === entry.date &&
            item.startTime === entry.startTime &&
            item.endTime === entry.endTime &&
            item.status === "waitlisted"
    );

    if (alreadyJoined) {
        throw new Error("You have already joined this waitlist.");
    }

    const newEntry = {
        id: crypto.randomUUID(),
        ...entry,
        status: "waitlisted",
        createdAt: new Date().toISOString(),
    };

    saveWaitlistEntries([...entries, newEntry]);

    return newEntry;
}

export function leaveWaitlist(entryId) {
    const entries = getWaitlistEntries();

    const updatedEntries = entries.filter(
        (entry) => entry.id !== entryId
    );

    saveWaitlistEntries(updatedEntries);
}

export function getUserWaitlistEntries(userId) {
    return getWaitlistEntries().filter(
        (entry) => entry.userId === userId
    );
}

export function subscribeToWaitlistChanges(callback) {
    window.addEventListener(WAITLIST_EVENT, callback);
    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener(WAITLIST_EVENT, callback);
        window.removeEventListener("storage", callback);
    };
}
