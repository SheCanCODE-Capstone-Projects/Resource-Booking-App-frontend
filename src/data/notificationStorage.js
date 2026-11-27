
const STORAGE_KEY = "spacesync-notifications";
const NOTIFICATION_EVENT = "spacesync-notifications-updated";

export function getNotifications() {
    try {
        const savedNotifications = localStorage.getItem(STORAGE_KEY);

        if (!savedNotifications) {
            return [];
        }

        const notifications = JSON.parse(savedNotifications);

        if (!Array.isArray(notifications)) {
            console.error("Invalid notification data.");
            return [];
        }

        return notifications;
    } catch (error) {
        console.error("Could not load notifications:", error);
        return [];
    }
}

export function saveNotifications(notifications) {
    if (!Array.isArray(notifications)) {
        throw new Error("Notifications must be an array.");
    }

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(notifications)
        );

        window.dispatchEvent(new Event(NOTIFICATION_EVENT));
    } catch (error) {
        console.error("Could not save notifications:", error);
        throw error;
    }
}

export function addNotification(notification) {
    if (!notification.userId) {
        throw new Error("A user ID is required.");
    }

    const notifications = getNotifications();

    const newNotification = {
        id: crypto.randomUUID(),
        title: notification.title || "New notification",
        message: notification.message || "",
        type: notification.type || "general",
        userId: notification.userId,
        resourceId: notification.resourceId || null,
        read: false,
        createdAt: new Date().toISOString(),
    };

    saveNotifications([newNotification, ...notifications]);

    return newNotification;
}

export function getUserNotifications(userId) {
    if (!userId) return [];

    return getNotifications().filter(
        (notification) => notification.userId === userId
    );
}

export function markNotificationAsRead(notificationId) {
    const notifications = getNotifications();

    const updatedNotifications = notifications.map((notification) =>
        notification.id === notificationId
            ? { ...notification, read: true }
            : notification
    );

    saveNotifications(updatedNotifications);
}

export function markAllNotificationsAsRead(userId) {
    const notifications = getNotifications();

    const updatedNotifications = notifications.map((notification) =>
        notification.userId === userId
            ? { ...notification, read: true }
            : notification
    );

    saveNotifications(updatedNotifications);
}

export function subscribeToNotificationChanges(callback) {
    window.addEventListener(NOTIFICATION_EVENT, callback);
    window.addEventListener("storage", callback);

    return () => {
        window.removeEventListener(NOTIFICATION_EVENT, callback);
        window.removeEventListener("storage", callback);
    };
}
