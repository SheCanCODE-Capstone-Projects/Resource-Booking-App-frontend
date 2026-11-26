
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    UserRound,
    Mail,
    ShieldCheck,
    CalendarDays,
    LogOut,
    ArrowLeft,
} from "lucide-react";

function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U";

    return (
        <main className="min-h-screen bg-surface-canvas px-5 py-12 text-text-primary lg:px-8">
            <div className="mx-auto max-w-4xl">

                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary"
                >
                    <ArrowLeft size={17} />
                    Back to Home
                </Link>

                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rust">
                        Account settings
                    </p>

                    <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-text-secondary">
                        Manage your personal account information.
                    </p>
                </div>

                <section className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card shadow-sm">

                    <div className="bg-forest p-8 text-white md:p-10">
                        <div className="flex flex-col items-center gap-5 sm:flex-row">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-2xl font-bold text-forest">
                                {initials}
                            </div>

                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold">
                                    {user?.name || "SpaceSync User"}
                                </h2>

                                <p className="mt-1 text-sm text-white/75">
                                    {user?.email}
                                </p>

                                <span className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold capitalize">
                                    {user?.role || "user"} account
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 p-6 md:p-8">

                        <div>
                            <h3 className="mb-5 text-lg font-bold">
                                Personal Information
                            </h3>

                            <div className="grid gap-5 md:grid-cols-2">

                                <div className="rounded-xl border border-white/10 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-text-secondary">
                                        <UserRound size={18} />
                                        <span className="text-sm">
                                            Full Name
                                        </span>
                                    </div>

                                    <p className="font-semibold">
                                        {user?.name || "Not available"}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-text-secondary">
                                        <Mail size={18} />
                                        <span className="text-sm">
                                            Email Address
                                        </span>
                                    </div>

                                    <p className="break-all font-semibold">
                                        {user?.email || "Not available"}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-text-secondary">
                                        <ShieldCheck size={18} />
                                        <span className="text-sm">
                                            Account Role
                                        </span>
                                    </div>

                                    <p className="font-semibold capitalize">
                                        {user?.role || "User"}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 p-4">
                                    <div className="mb-3 flex items-center gap-2 text-text-secondary">
                                        <CalendarDays size={18} />
                                        <span className="text-sm">
                                            Account Status
                                        </span>
                                    </div>

                                    <p className="font-semibold">
                                        Active
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="mb-2 text-lg font-bold">
                                Account Actions
                            </h3>

                            <p className="mb-5 text-sm text-text-secondary">
                                Access your reservations or safely sign out.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/my-reservations"
                                    className="inline-flex items-center justify-center rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                                >
                                    View My Reservations
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-rust px-5 py-3 text-sm font-semibold text-rust transition hover:bg-rust hover:text-white"
                                >
                                    <LogOut size={17} />
                                    Log Out
                                </button>

                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </main>
    );
}

export default ProfilePage;
