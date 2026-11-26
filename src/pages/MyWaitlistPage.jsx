
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    MapPin,
    Trash2,
    ArrowRight,
    ClipboardList,
    CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import {
    getUserWaitlistEntries,
    leaveWaitlist,
    subscribeToWaitlistChanges,
} from "../data/waitlistStorage";

function MyWaitlistPage() {
    const { user } = useAuth();
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState("");

    const refreshEntries = useCallback(() => {
        if (!user?.id) {
            setEntries([]);
            return;
        }

        setEntries(getUserWaitlistEntries(user.id));
    }, [user?.id]);

    useEffect(() => {
        refreshEntries();

        return subscribeToWaitlistChanges(refreshEntries);
    }, [refreshEntries]);

    function handleLeaveWaitlist(entryId) {
        const confirmed = window.confirm(
            "Are you sure you want to leave this waitlist?"
        );

        if (!confirmed) return;

        try {
            leaveWaitlist(entryId);
            setError("");
            refreshEntries();
        } catch (err) {
            setError(err.message || "Could not leave the waitlist.");
        }
    }

    function formatDate(dateString) {
        if (!dateString) return "Date not specified";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Date not available";
        }

        return date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    return (
        <main className="min-h-screen bg-[#F5F1E6] px-5 py-12 dark:bg-[#111A17] lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* PAGE HEADER */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B4A33]">
                            YOUR SPACESYNC ACCOUNT
                        </p>

                        <h1 className="mt-3 text-3xl font-bold text-[#1B3F36] dark:text-[#F5F1E6] md:text-4xl">
                            My Waitlist
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
                            Keep track of spaces you've joined the waitlist for.
                            You can leave a waitlist whenever you no longer need it.
                        </p>
                    </div>

                    <Link
                        to="/explore"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B4A33]"
                    >
                        Explore spaces
                        <ArrowRight size={17} />
                    </Link>
                </div>

                {/* WAITLIST SUMMARY */}
                <div className="mt-9 rounded-2xl border border-[#1B3F36]/10 bg-white p-6 dark:border-white/10 dark:bg-[#1A2923]">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-[#F5F1E6] p-3 dark:bg-[#20332B]">
                            <ClipboardList
                                size={23}
                                className="text-[#8B4A33]"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                Active waitlist entries
                            </p>

                            <p className="mt-1 text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                {entries.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                    <div
                        role="alert"
                        className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
                    >
                        {error}
                    </div>
                )}

                {/* WAITLIST ENTRIES */}
                <section className="mt-9">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                            Your waitlisted spaces
                        </h2>

                        <span className="rounded-full bg-[#E6F0E9] px-3 py-1 text-xs font-semibold text-[#1B3F36]">
                            {entries.length} {entries.length === 1 ? "entry" : "entries"}
                        </span>
                    </div>

                    {entries.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-[#1B3F36]/20 bg-white px-6 py-16 text-center dark:border-white/20 dark:bg-[#1A2923]">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F1E6] dark:bg-[#20332B]">
                                <ClipboardList
                                    size={30}
                                    className="text-[#8B4A33]"
                                />
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                Your waitlist is empty
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
                                You haven't joined any waitlists yet.
                                Explore spaces and join a waitlist when a resource is unavailable.
                            </p>

                            <Link
                                to="/explore"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1B3F36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B4A33]"
                            >
                                Find a space
                                <ArrowRight size={17} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2">
                            {entries.map((entry) => (
                                <article
                                    key={entry.id}
                                    className="overflow-hidden rounded-2xl border border-[#1B3F36]/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#1A2923]"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold uppercase tracking-wider text-[#8B4A33]">
                                                    Waitlist entry
                                                </p>

                                                <h3 className="mt-2 text-xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                                    {entry.resourceName || "Unnamed resource"}
                                                </h3>
                                            </div>

                                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F5E6DF] px-3 py-1.5 text-xs font-semibold capitalize text-[#8B4A33]">
                                                <Clock size={13} />
                                                {entry.status || "waitlisted"}
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-4 border-t border-[#1B3F36]/10 pt-5 dark:border-white/10">
                                            <div className="flex items-center gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                                <CalendarDays
                                                    size={17}
                                                    className="shrink-0 text-[#8B4A33]"
                                                />
                                                <span>
                                                    Joined: {formatDate(entry.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                                <MapPin
                                                    size={17}
                                                    className="shrink-0 text-[#8B4A33]"
                                                />
                                                <span>
                                                    Resource ID: {entry.resourceId}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 rounded-xl bg-[#F5F1E6] p-4 dark:bg-[#20332B]">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-[#8B4A33]"
                                                />

                                                <p className="text-xs leading-5 text-[#59665F] dark:text-[#B9C5BE]">
                                                    Your waitlist request is saved.
                                                    Availability updates and automatic promotion
                                                    will be connected to the backend.
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleLeaveWaitlist(entry.id)}
                                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#8B4A33]/30 px-4 py-3 text-sm font-semibold text-[#8B4A33] transition hover:bg-[#8B4A33] hover:text-white"
                                        >
                                            <Trash2 size={16} />
                                            Leave Waitlist
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default MyWaitlistPage;
