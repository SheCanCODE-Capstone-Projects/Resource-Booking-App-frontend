
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    Menu,
    X,
    Bell,
    UserRound,
    Sun,
    Moon,
} from "lucide-react";

const LOGO_SRC = "/images/logo.png";

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

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="rounded-full p-2.5 text-[#1B3F36] transition hover:bg-[#1B3F36]/10 dark:text-[#F5F1E6] dark:hover:bg-white/10"
                    >
                        <Bell size={20} />
                    </button>

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

                    <div className="mt-6 flex items-center gap-3 border-t border-[#1B3F36]/10 pt-5 dark:border-white/10">
                        <Bell size={19} className="text-[#8B4A33]" />

                        <span className="text-sm font-medium text-text-secondary">
                            Notifications
                        </span>
                    </div>

                </div>
            )}
        </header>
    );
}

export default Navbar;
