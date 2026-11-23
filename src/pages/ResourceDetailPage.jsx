
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    Users,
    Tag,
    CalendarDays,
    CheckCircle2,
    XCircle,
    Clock,
    Building2,
    HelpCircle,
} from "lucide-react";

import resources from "../data/resources";

function ResourceDetailPage() {
    const { id } = useParams();

    // Find the selected resource
    const resource = resources.find(
        (item) => String(item.id) === id
    );

    // Handle invalid resource IDs
    if (!resource) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-5">
                <div className="max-w-md text-center">
                    <Building2
                        size={42}
                        className="mx-auto text-text-secondary"
                    />

                    <h1 className="mt-5 text-2xl font-bold text-text-primary">
                        Resource not found
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                        Sorry, we couldn't find the space you're looking for.
                        It may have been removed or the link may be incorrect.
                    </p>

                    <Link
                        to="/explore"
                        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover dark:text-black"
                    >
                        <ArrowLeft size={16} />
                        Back to Explore
                    </Link>
                </div>
            </main>
        );
    }

    // Determine resource availability
    const status = resource.status?.toLowerCase();

    const isAvailable = status === "available";
    const isUnavailable = status === "unavailable";

    const statusStyles = isAvailable
        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
        : isUnavailable
            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 lg:px-8">

            {/* BACK NAVIGATION */}
            <Link
                to="/explore"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-text-primary"
            >
                <ArrowLeft size={17} />
                Back to Explore Spaces
            </Link>

            {/* RESOURCE HEADER */}
            <section className="mt-8">
                <div className="flex flex-wrap items-center gap-3">

                    <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary">
                        {resource.category}
                    </span>

                    {/* AVAILABILITY BADGE */}
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles}`}
                    >
                        {isAvailable ? (
                            <CheckCircle2 size={14} />
                        ) : isUnavailable ? (
                            <XCircle size={14} />
                        ) : (
                            <HelpCircle size={14} />
                        )}

                        {resource.status || "Status unknown"}
                    </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
                    {resource.name}
                </h1>

                <p className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin size={17} />
                    {[resource.location, resource.district, resource.province]
                        .filter(Boolean)
                        .join(", ")}
                </p>
            </section>

            {/* RESOURCE IMAGE AND INFORMATION */}
            <section className="mt-10 grid gap-10 lg:grid-cols-5">

                {/* RESOURCE IMAGE */}
                <div className="lg:col-span-3">
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted">
                        {resource.image ? (
                            <img
                                src={resource.image}
                                alt={resource.name}
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                                className="h-[300px] w-full object-cover sm:h-[420px]"
                            />
                        ) : (
                            <div className="flex h-[300px] items-center justify-center text-text-secondary sm:h-[420px]">
                                <Building2 size={48} />
                            </div>
                        )}
                    </div>
                </div>

                {/* SPACE OVERVIEW */}
                <div className="flex flex-col rounded-2xl border border-border bg-surface-card p-6 lg:col-span-2">

                    <h2 className="text-xl font-bold text-text-primary">
                        Space overview
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-text-secondary">
                        {resource.description}
                    </p>

                    <div className="my-6 border-t border-border" />

                    <div className="space-y-5">

                        {/* LOCATION */}
                        <div className="flex items-start gap-3">
                            <MapPin size={19} className="mt-0.5 text-text-secondary" />

                            <div>
                                <p className="text-xs font-medium text-text-secondary">
                                    Location
                                </p>

                                <p className="mt-1 text-sm font-semibold text-text-primary">
                                    {[resource.location, resource.district, resource.province]
                                        .filter(Boolean)
                                        .join(", ") || "Not specified"}
                                </p>
                            </div>
                        </div>

                        {/* CAPACITY */}
                        {resource.capacity != null && (
                            <div className="flex items-start gap-3">
                                <Users size={19} className="mt-0.5 text-text-secondary" />

                                <div>
                                    <p className="text-xs font-medium text-text-secondary">
                                        Capacity
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-text-primary">
                                        {resource.capacity} people
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* CATEGORY */}
                        <div className="flex items-start gap-3">
                            <Tag size={19} className="mt-0.5 text-text-secondary" />

                            <div>
                                <p className="text-xs font-medium text-text-secondary">
                                    Category
                                </p>

                                <p className="mt-1 text-sm font-semibold text-text-primary">
                                    {resource.category}
                                </p>
                            </div>
                        </div>

                        {/* PRICE */}
                        {resource.price != null && (
                            <div className="flex items-start gap-3">
                                <CalendarDays size={19} className="mt-0.5 text-text-secondary" />

                                <div>
                                    <p className="text-xs font-medium text-text-secondary">
                                        Price
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-text-primary">
                                        {typeof resource.price === "number"
                                            ? `${resource.price.toLocaleString()} RWF`
                                            : resource.price}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AVAILABILITY MESSAGE AND ACTION */}
                    <div className="mt-auto pt-8">

                        {isAvailable && (
                            <div className="mb-4 flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-950 dark:text-green-400">
                                <CheckCircle2 size={19} className="mt-0.5 shrink-0" />

                                <p className="text-sm leading-6">
                                    This space is currently available. You can proceed to the booking stage.
                                </p>
                            </div>
                        )}

                        {isUnavailable && (
                            <div className="mb-4 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-400">
                                <XCircle size={19} className="mt-0.5 shrink-0" />

                                <p className="text-sm leading-6">
                                    This space is currently unavailable and cannot be booked.
                                </p>
                            </div>
                        )}

                        {!isAvailable && !isUnavailable && (
                            <div className="mb-4 flex items-start gap-3 rounded-lg bg-red-100 p-4 text-white-600 dark:bg-red-800 dark:text-red-300">
                                <Clock size={19} className="mt-0.5 shrink-0" />

                                <p className="text-sm leading-6">
                                    Availability has not been confirmed. Please check back later.
                                </p>
                            </div>
                        )}

                        <button
                            type="button"
                            disabled={!isAvailable}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-40 dark:text-black"
                        >
                            {isAvailable
                                ? "Booking feature coming next"
                                : "Currently unavailable"}
                        </button>
                    </div>
                </div>
            </section>

            {/* ABOUT THIS SPACE */}
            <section className="mt-12 rounded-2xl border border-border bg-surface-muted p-6 sm:p-8">
                <h2 className="text-xl font-bold text-text-primary">
                    About this space
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-text-secondary">
                    {resource.description}
                </p>

                <Link
                    to="/explore"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text-primary underline underline-offset-4 transition hover:text-text-secondary"
                >
                    Discover more spaces
                    <ArrowLeft className="rotate-180" size={16} />
                </Link>
            </section>
        </main>
    );
}

export default ResourceDetailPage;
