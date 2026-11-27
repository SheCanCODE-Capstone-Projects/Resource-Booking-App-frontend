
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
    Menu,
    X,
    Bell,
    UserRound,
    Sun,
    Moon,
    CheckCheck,
    CheckCircle2,
    CalendarDays,
    Info,
    Trash2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import {
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    subscribeToNotificationChanges,
} from "../data/notificationStorage";

const LOGO_SRC = "/images/logo.png";

function NotificationBell() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const dropdownRef = useRef(null);

    const refreshNotifications = () => {
        if (!isAuthenticated || !user?.id) {
            setNotifications([]);
            return;
        }

        setNotifications(getUserNotifications(user.id));
    };

    useEffect(() => {
        refreshNotifications();

        return subscribeToNotificationChanges(refreshNotifications);
    }, [user?.id, isAuthenticated]);

    // Close dropdown when clicking outside.
    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    function handleMarkAsRead(notificationId) {
        try {
            markNotificationAsRead(notificationId);
            refreshNotifications();
        } catch (error) {
            console.error("Could not mark notification as read:", error);
        }
    }

    function handleMarkAllAsRead() {
        if (!user?.id) return;

        try {
            markAllNotificationsAsRead(user.id);
            refreshNotifications();
        } catch (error) {
            console.error("Could not mark notifications as read:", error);
        }
    }

    function handleNotificationClick(notification) {
        if (!notification.read) {
            handleMarkAsRead(notification.id);
        }

        setIsOpen(false);

        if (notification.resourceId) {
            navigate(`/resources/${notification.resourceId}`);
        }
    }

    function formatNotificationTime(dateString) {
        if (!dateString) return "Recently";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Recently";
        }

        return date.toLocaleString(undefined, {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function getNotificationIcon(type) {
        switch (type) {
            case "booking":
                return CalendarDays;

            case "waitlist":
                return CheckCircle2;

            default:
                return Info;
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* NOTIFICATION BUTTON */}
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#1B3F36] transition hover:bg-[#1B3F36]/10 dark:text-[#F5F1E6] dark:hover:bg-white/10"
            >
                <Bell size={20} />

                {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8B4A33] px-1 text-[10px] font-bold text-white ring-2 ring-[#F5F1E6] dark:ring-[#111A17]">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* NOTIFICATION DROPDOWN */}
            {isOpen && (
                <div className="absolute right-0 top-full z-[100] mt-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#1B3F36]/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#1A2923]">

                    {/* HEADER */}
                    <div className="flex items-center justify-between border-b border-[#1B3F36]/10 px-5 py-4 dark:border-white/10">
                        <div>
                            <h2 className="text-base font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                Notifications
                            </h2>

                            <p className="mt-1 text-xs text-[#7B857F] dark:text-[#B9C5BE]">
                                {unreadCount === 0
                                    ? "You're all caught up"
                                    : `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleMarkAllAsRead}
                            disabled={unreadCount === 0}
                            className="flex items-center gap-1.5 text-xs font-semibold text-[#8B4A33] transition hover:text-[#1B3F36] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:text-[#F5F1E6]"
                        >
                            <CheckCheck size={15} />
                            Mark all read
                        </button>
                    </div>

                    {/* NOTIFICATION LIST */}
                    <div className="max-h-[380px] overflow-y-auto">
                        {!isAuthenticated ? (
                            <div className="px-6 py-10 text-center">
                                <Bell
                                    size={30}
                                    className="mx-auto text-[#8B4A33]"
                                />

                                <p className="mt-3 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]">
                                    Log in to view notifications
                                </p>

                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 inline-flex rounded-lg bg-[#1B3F36] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8B4A33]"
                                >
                                    Log in
                                </Link>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="px-6 py-10 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F1E6] dark:bg-[#20332B]">
                                    <Bell
                                        size={25}
                                        className="text-[#8B4A33]"
                                    />
                                </div>

                                <h3 className="mt-4 text-sm font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                    No notifications yet
                                </h3>

                                <p className="mt-2 text-xs leading-5 text-[#7B857F] dark:text-[#B9C5BE]">
                                    Updates about your reservations and waitlists will appear here.
                                </p>
                            </div>
                        ) : (
                            notifications.map((notification) => {
                                const NotificationIcon = getNotificationIcon(
                                    notification.type
                                );

                                return (
                                    <button
                                        key={notification.id}
                                        type="button"
                                        onClick={() =>
                                            handleNotificationClick(notification)
                                        }
                                        className={`flex w-full items-start gap-3 border-b border-[#1B3F36]/5 px-5 py-4 text-left transition hover:bg-[#F5F1E6]/70 dark:border-white/5 dark:hover:bg-[#20332B] ${!notification.read
                                                ? "bg-[#F5F1E6]/50 dark:bg-[#20332B]/50"
                                                : ""
                                            }`}
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F1E6] text-[#8B4A33] dark:bg-[#20332B]">
                                            <NotificationIcon size={19} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                                    {notification.title}
                                                </p>

                                                {!notification.read && (
                                                    <span
                                                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#8B4A33]"
                                                        aria-label="Unread"
                                                    />
                                                )}
                                            </div>

                                            <p className="mt-1 text-xs leading-5 text-[#59665F] dark:text-[#B9C5BE]">
                                                {notification.message}
                                            </p>

                                            <p className="mt-2 text-[10px] font-medium text-[#8B4A33]">
                                                {formatNotificationTime(
                                                    notification.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* FOOTER */}
                    {notifications.length > 0 && (
                        <div className="border-t border-[#1B3F36]/10 px-5 py-3 dark:border-white/10">
                            <p className="text-center text-[11px] text-[#7B857F] dark:text-[#B9C5BE]">
                                You're viewing your latest notifications.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Navbar({ theme, onToggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore Spaces", path: "/explore" },
        { name: "My Reservations", path: "/my-reservations" },
    ];

    const linkStyles = ({ isActive }) =>
        `relative text-sm font-semibold transition-colors duration-200 ${isActive
            ? "text-[#1B3F36] dark:text-[#F5F1E6]"
            : "text-text-secondary hover:text-[#8B4A33]"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-[#1B3F36]/10 bg-[#F5F1E6]/95 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#111A17]/95">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">

                {/* BRAND LOGO */}
                <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    aria-label="SpaceSync home"
                    className="flex shrink-0 items-center gap-3"
                >
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
                        <img
                            src={LOGO_SRC}
                            alt="SpaceSync logo"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6]">
                            SpaceSync
                        </h1>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B4A33]">
                            Resource booking
                        </p>
                    </div>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === "/"}
                            className={linkStyles}
                        >
                            {({ isActive }) => (
                                <span className="relative py-2">
                                    {link.name}

                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#8B4A33]" />
                                    )}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* DESKTOP ACTIONS */}
                <div className="hidden items-center gap-3 md:flex">

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-full border border-[#1B3F36]/20 p-2.5 text-[#1B3F36] transition hover:bg-[#1B3F36] hover:text-white dark:border-white/20 dark:text-[#F5F1E6] dark:hover:bg-[#F5F1E6] dark:hover:text-[#1B3F36]"
                    >
                        {theme === "light" ? (
                            <Moon size={19} />
                        ) : (
                            <Sun size={19} />
                        )}
                    </button>

                    <NotificationBell />

                    {/* LOGIN ICON */}
                    <Link
                        to="/login"
                        aria-label="Login"
                        title="Login"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B3F36]/20 bg-white text-[#1B3F36] transition hover:border-[#8B4A33] hover:bg-[#8B4A33] hover:text-white dark:border-white/20 dark:bg-[#1B3F36] dark:text-[#F5F1E6]"
                    >
                        <UserRound size={19} />
                    </Link>
                </div>

                {/* MOBILE ACTIONS */}
                <div className="flex items-center gap-2 md:hidden">

                    <NotificationBell />

                    {/* MOBILE LOGIN ICON */}
                    <Link
                        to="/login"
                        aria-label="Login"
                        title="Login"
                        onClick={() => setMenuOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B3F36]/20 bg-white text-[#1B3F36] transition hover:border-[#8B4A33] hover:bg-[#8B4A33] hover:text-white dark:border-white/20 dark:bg-[#1B3F36] dark:text-[#F5F1E6]"
                    >
                        <UserRound size={19} />
                    </Link>

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-lg p-2 text-[#1B3F36] transition hover:bg-[#1B3F36]/10 dark:text-[#F5F1E6] dark:hover:bg-white/10"
                    >
                        {theme === "light" ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </button>

                    <button
                        type="button"
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((current) => !current)}
                        className="rounded-lg p-2 text-[#1B3F36] transition hover:bg-[#1B3F36]/10 dark:text-[#F5F1E6] dark:hover:bg-white/10"
                    >
                        {menuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="border-t border-[#1B3F36]/10 bg-[#F5F1E6] px-5 py-5 dark:border-white/10 dark:bg-[#111A17] md:hidden">

                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className={linkStyles}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
