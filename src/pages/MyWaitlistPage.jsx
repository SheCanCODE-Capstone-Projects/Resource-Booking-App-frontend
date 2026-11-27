
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    MapPin,
    Trash2,
    ArrowRight,
    ClipboardList,
    RefreshCw,
} from "lucide-react";

import {
    getMyWaitlistEntries,
    leaveWaitlist,
} from "../api/waitlistApi";

function MyWaitlistPage() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [leavingId, setLeavingId] = useState(null);

    const refreshEntries = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getMyWaitlistEntries();

            setEntries(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(
                err.message || "Could not load your waitlist entries."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshEntries();
    }, [refreshEntries]);

    async function handleLeaveWaitlist(entryId) {
        const confirmed = window.confirm(
            "Are you sure you want to leave this waitlist?"
        );

        if (!confirmed) return;

        setLeavingId(entryId);
        setError("");

        try {
            await leaveWaitlist(entryId);

            setEntries((previous) =>
                previous.filter((entry) => entry.id !== entryId)
            );
        } catch (err) {
            setError(
                err.message || "Could not leave the waitlist."
            );
        } finally {
            setLeavingId(null);
        }
    }

    function formatDate(dateString) {
        if (!dateString) return "Not specified";

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function getStatusStyle(status) {
        switch (status?.toUpperCase()) {
            case "WAITING":
                return "bg-[#F5E6DF] text-[#8B4A33]";

            case "PROMOTED":
                return "bg-[#E6F0E9] text-[#1B3F36]";

            case "CANCELLED":
            case "CANCELED":
                return "bg-gray-100 text-gray-600";

            default:
                return "bg-[#F5F1E6] text-[#59665F]";
        }
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

                {/* SUMMARY */}
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
                                Your waitlist entries
                            </p>

                            <p className="mt-1 text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                {entries.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <div
                        role="alert"
                        className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
                    >
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <p>{error}</p>

                            <button
                                type="button"
                                onClick={refreshEntries}
                                className="font-semibold underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                )}

                {/* WAITLIST ENTRIES */}
                <section className="mt-9">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                            Your waitlisted spaces
                        </h2>

                        <button
                            type="button"
                            onClick={refreshEntries}
                            disabled={loading}
                            aria-label="Refresh waitlist"
                            className="rounded-lg p-2 text-[#1B3F36] transition hover:bg-white disabled:opacity-50 dark:text-[#F5F1E6] dark:hover:bg-[#20332B]"
                        >
                            <RefreshCw
                                size={18}
                                className={loading ? "animate-spin" : ""}
                            />
                        </button>
                    </div>

                    {loading ? (
                        <div className="rounded-3xl bg-white px-6 py-16 text-center dark:bg-[#1A2923]">
                            <RefreshCw
                                size={30}
                                className="mx-auto animate-spin text-[#8B4A33]"
                            />
                            <p className="mt-4 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                Loading your waitlist...
                            </p>
                        </div>
                    ) : entries.length === 0 ? (
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

                                            <span
                                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(entry.status)}`}
                                            >
                                                <Clock size={13} />
                                                {entry.status || "WAITING"}
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-4 border-t border-[#1B3F36]/10 pt-5 dark:border-white/10">
                                            <div className="flex items-center gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                                <CalendarDays
                                                    size={17}
                                                    className="shrink-0 text-[#8B4A33]"
                                                />
                                                <span>
                                                    Queue date: {formatDate(entry.queuedAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-start gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                                <MapPin
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-[#8B4A33]"
                                                />
                                                <span className="break-all">
                                                    Resource ID: {entry.resourceId}
                                                </span>
                                            </div>

                                            <div className="flex items-start gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                                <Clock
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-[#8B4A33]"
                                                />
                                                <span>
                                                    Requested: {formatDate(entry.startTime)}
                                                    {" — "}
                                                    {formatDate(entry.endTime)}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={leavingId === entry.id}
                                            onClick={() => handleLeaveWaitlist(entry.id)}
                                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#8B4A33]/30 px-4 py-3 text-sm font-semibold text-[#8B4A33] transition hover:bg-[#8B4A33] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Trash2 size={16} />
                                            {leavingId === entry.id
                                                ? "Leaving..."
                                                : "Leave Waitlist"}
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
