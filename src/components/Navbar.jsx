
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    Menu,
    X,
    CalendarDays,
    Bell,
    UserRound,
    Sun,
    Moon,
} from "lucide-react";

function Navbar({ theme, onToggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore Spaces", path: "/explore" },
        { name: "My Reservations", path: "/my-reservations" },
    ];

    const linkStyles = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive
            ? "text-text-primary"
            : "text-text-secondary hover:text-text-primary"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-surface-card">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                {/* BRAND */}
                <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white dark:text-black">
                        <CalendarDays size={21} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-text-primary">
                            SpaceSync
                        </h1>

                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary">
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
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* DESKTOP ACTIONS */}
                <div className="hidden items-center gap-3 md:flex">

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-full border border-border p-2.5 text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
                    >
                        {theme === "light" ? (
                            <Moon size={19} />
                        ) : (
                            <Sun size={19} />
                        )}
                    </button>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="rounded-full p-2.5 text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
                    >
                        <Bell size={20} />
                    </button>

                    <button
                        type="button"
                        aria-label="User profile"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-muted text-text-primary"
                    >
                        <UserRound size={19} />
                    </button>

                </div>

                {/* MOBILE ACTIONS */}
                <div className="flex items-center gap-2 md:hidden">

                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-lg p-2 text-text-secondary hover:bg-surface-muted"
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
                        className="rounded-lg p-2 text-text-primary hover:bg-surface-muted"
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
                <div className="border-t border-border bg-surface-card px-5 py-5 md:hidden">

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

                    <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                        <Bell
                            size={19}
                            className="text-text-secondary"
                        />

                        <span className="text-sm text-text-secondary">
                            Notifications
                        </span>
                    </div>

                </div>
            )}

        </header>
    );
}

export default Navbar;
