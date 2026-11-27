import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { useAuth } from "../context/AuthContext";
import { addNotification } from "../data/notificationStorage";
import {
    ArrowLeft,
    ArrowUpRight,
    MapPin,
    Users,
    Tag,
    CalendarDays,
    CheckCircle2,
    XCircle,
    Clock,
    Building2,
    HelpCircle,
    Sparkles,
    X,
} from "lucide-react";

import {
    getResources,
    subscribeToResourceChanges,
} from "../data/resourceStorage";

import { joinWaitlist } from "../data/waitlistStorage";

function ResourceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [resources, setResources] = useState(getResources);
    const [imageError, setImageError] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);

    const [waitlistMessage, setWaitlistMessage] = useState("");
    const [waitlistMessageType, setWaitlistMessageType] = useState("");
    const [isJoiningWaitlist, setIsJoiningWaitlist] = useState(false);

    // Refresh resources whenever the catalogue changes.
    useEffect(() => {
        const refreshResources = () => {
            setResources(getResources());
            setImageError(false);
            setShowBookingForm(false);
        };

        return subscribeToResourceChanges(refreshResources);
    }, []);

    // Reset page states when switching resources.
    useEffect(() => {
        setShowBookingForm(false);
        setImageError(false);
        setWaitlistMessage("");
        setWaitlistMessageType("");
    }, [id]);

    // Close booking modal with Escape key.
    useEffect(() => {
        if (!showBookingForm) return;

        function handleEscape(event) {
            if (event.key === "Escape") {
                setShowBookingForm(false);
            }
        }

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [showBookingForm]);

    const resource = resources.find(
        (item) => String(item.id) === String(id)
    );

    // Join the waitlist.
    function handleJoinWaitlist() {
        if (!resource) return;

        setWaitlistMessage("");
        setWaitlistMessageType("");

        // Redirect users who are not logged in.
        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    from: {
                        pathname: `/resources/${resource.id}`,
                    },
                },
            });
            return;
        }

        // Check that the user has a valid account.
        if (!user?.id) {
            setWaitlistMessage("Please log in again to join the waitlist.");
            setWaitlistMessageType("error");
            return;
        }

        setIsJoiningWaitlist(true);

        try {
            // First, join the waitlist.
            joinWaitlist({
                resourceId: resource.id,
                resourceName: resource.name,
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
            });

            // Then, create a notification (failure here must not break the join).
            try {
                addNotification({
                    userId: user.id,
                    title: "You're on the waitlist!",
                    message: `You've joined the waitlist for ${resource.name}. We'll keep you updated.`,
                    type: "waitlist",
                    resourceId: resource.id,
                });
            } catch (notificationError) {
                console.error(
                    "Could not create notification:",
                    notificationError
                );
            }

            setWaitlistMessage(
                "You have successfully joined the waitlist for this resource."
            );
            setWaitlistMessageType("success");
        } catch (error) {
            setWaitlistMessage(
                error.message || "Could not join the waitlist. Please try again."
            );
            setWaitlistMessageType("error");
        } finally {
            setIsJoiningWaitlist(false);
        }
    }

    if (!resource) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E6] px-5 dark:bg-[#111A17]">
                <div className="max-w-md text-center">
                    <Building2
                        size={46}
                        className="mx-auto text-[#8B4A33]"
                    />

                    <h1 className="mt-5 text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                        Resource not found
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
                        Sorry, we couldn't find the space you're looking for.
                        It may have been removed or the link may be incorrect.
                    </p>

                    <Link
                        to="/explore"
                        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#1B3F36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B4A33]"
                    >
                        <ArrowLeft size={16} />
                        Back to Explore
                    </Link>
                </div>
            </main>
        );
    }

    // Resource availability.
    const status = resource.status?.trim().toLowerCase();

    const isAvailable = status === "available";

    const isUnavailable =
        status === "unavailable" ||
        status === "not available";

    // Resource amenities.
    const amenities = Array.isArray(resource.amenities)
        ? resource.amenities
        : [];

    // Resource price.
    const price =
        typeof resource.price === "number"
            ? `${resource.price.toLocaleString()} RWF`
            : resource.price || "Contact for pricing";

    // Resource location.
    const location = [
        resource.location,
        resource.district,
        resource.province,
    ]
        .filter(Boolean)
        .join(", ");

    // Availability badge styling.
    const statusStyles = isAvailable
        ? "bg-[#E6F0E9] text-[#1B3F36]"
        : isUnavailable
            ? "bg-[#F5E6DF] text-[#8B4A33]"
            : "bg-neutral-100 text-neutral-700";

    return (
        <>
            <main className="min-h-screen bg-[#F5F1E6] px-5 py-10 dark:bg-[#111A17] lg:px-8">
                <div className="mx-auto max-w-7xl">

                    {/* BACK NAVIGATION */}
                    <Link
                        to="/explore"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3F36] transition hover:text-[#8B4A33] dark:text-[#F5F1E6]"
                    >
                        <ArrowLeft size={17} />
                        Back to Explore Spaces
                    </Link>

                    {/* RESOURCE HEADING */}
                    <section className="mt-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-[#8B4A33]/30 bg-[#8B4A33]/5 px-4 py-1.5 text-xs font-semibold text-[#8B4A33]">
                                {resource.category || "Uncategorized"}
                            </span>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${statusStyles}`}
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

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6] md:text-5xl">
                            {resource.name}
                        </h1>

                        <p className="mt-4 flex items-center gap-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                            <MapPin
                                size={17}
                                className="shrink-0 text-[#8B4A33]"
                            />
                            {location || "Location not specified"}
                        </p>
                    </section>

                    {/* MAIN RESOURCE CONTENT */}
                    <section className="mt-9 grid items-start gap-8 lg:grid-cols-5">

                        {/* IMAGE AND ABOUT */}
                        <div className="lg:col-span-3">

                            {/* RESOURCE IMAGE */}
                            <div className="group relative overflow-hidden rounded-3xl bg-[#EAE3D3] shadow-lg dark:bg-[#20332B]">
                                {resource.image && !imageError ? (
                                    <img
                                        src={resource.image}
                                        alt={resource.name}
                                        onError={() => setImageError(true)}
                                        className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.02] sm:h-[480px]"
                                    />
                                ) : (
                                    <div className="flex h-[300px] items-center justify-center sm:h-[480px]">
                                        <Building2
                                            size={70}
                                            className="text-[#8B4A33]"
                                        />
                                    </div>
                                )}

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-6 pt-20">
                                    <p className="text-sm font-medium text-white/80">
                                        Discover your next space
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-white">
                                        {resource.name}
                                    </h2>
                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="mt-8 rounded-2xl border border-[#1B3F36]/10 bg-white p-6 dark:border-white/10 dark:bg-[#1A2923] sm:p-8">
                                <h2 className="text-xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                    About this space
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-[#59665F] dark:text-[#B9C5BE]">
                                    {resource.description ||
                                        "No description has been provided for this space yet."}
                                </p>

                                <Link
                                    to="/explore"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8B4A33] transition hover:text-[#1B3F36] dark:hover:text-[#F5F1E6]"
                                >
                                    Discover more spaces
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* SPACE OVERVIEW CARD */}
                        <aside className="lg:col-span-2">
                            <div className="overflow-hidden rounded-3xl border border-[#1B3F36]/10 bg-white shadow-lg dark:border-white/10 dark:bg-[#1A2923]">

                                {/* CARD HEADER */}
                                <div className="border-b border-[#1B3F36]/10 px-6 py-6 dark:border-white/10 sm:px-7">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B4A33]">
                                        SPACE DETAILS
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                        Space overview
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
                                        Everything you need to know before choosing this space.
                                    </p>
                                </div>

                                {/* RESOURCE DETAILS */}
                                <div className="space-y-0 px-6 sm:px-7">

                                    {/* LOCATION */}
                                    <div className="flex items-start gap-4 border-b border-[#1B3F36]/10 py-5 dark:border-white/10">
                                        <div className="rounded-xl bg-[#F5F1E6] p-3 dark:bg-[#20332B]">
                                            <MapPin
                                                size={20}
                                                className="text-[#8B4A33]"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-[#7B857F] dark:text-[#B9C5BE]">
                                                Location
                                            </p>

                                            <p className="mt-1 text-sm font-semibold leading-6 text-[#1B3F36] dark:text-[#F5F1E6]">
                                                {location || "Not specified"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CAPACITY */}
                                    {resource.capacity != null && (
                                        <div className="flex items-start gap-4 border-b border-[#1B3F36]/10 py-5 dark:border-white/10">
                                            <div className="rounded-xl bg-[#F5F1E6] p-3 dark:bg-[#20332B]">
                                                <Users
                                                    size={20}
                                                    className="text-[#8B4A33]"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-[#7B857F] dark:text-[#B9C5BE]">
                                                    Capacity
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]">
                                                    Up to {resource.capacity} people
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* CATEGORY */}
                                    <div className="flex items-start gap-4 border-b border-[#1B3F36]/10 py-5 dark:border-white/10">
                                        <div className="rounded-xl bg-[#F5F1E6] p-3 dark:bg-[#20332B]">
                                            <Tag
                                                size={20}
                                                className="text-[#8B4A33]"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-[#7B857F] dark:text-[#B9C5BE]">
                                                Category
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]">
                                                {resource.category || "Not specified"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* PRICING */}
                                    <div className="flex items-start gap-4 py-5">
                                        <div className="rounded-xl bg-[#F5F1E6] p-3 dark:bg-[#20332B]">
                                            <CalendarDays
                                                size={20}
                                                className="text-[#8B4A33]"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-[#7B857F] dark:text-[#B9C5BE]">
                                                Pricing
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                                {price}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* BOOKING AND WAITLIST PANEL */}
                                <div className="mx-5 mb-5 rounded-2xl bg-[#F5F1E6] p-5 dark:bg-[#20332B] sm:mx-6 sm:mb-6">

                                    <div className="flex items-center gap-2">
                                        {isAvailable ? (
                                            <CheckCircle2
                                                size={18}
                                                className="text-[#1B3F36]"
                                            />
                                        ) : isUnavailable ? (
                                            <XCircle
                                                size={18}
                                                className="text-[#8B4A33]"
                                            />
                                        ) : (
                                            <Clock
                                                size={18}
                                                className="text-[#8B4A33]"
                                            />
                                        )}

                                        <h3 className="text-sm font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                            {isAvailable
                                                ? "This space is available"
                                                : isUnavailable
                                                    ? "This space is unavailable"
                                                    : "Availability not confirmed"}
                                        </h3>
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-[#59665F] dark:text-[#B9C5BE]">
                                        {isAvailable
                                            ? "Choose your preferred date and time to reserve this space."
                                            : isUnavailable
                                                ? "Join the waitlist and we'll keep you informed when this space becomes available."
                                                : "Please check back later for availability information."}
                                    </p>

                                    {/* BOOKING BUTTON */}
                                    {isAvailable && (
                                        <button
                                            type="button"
                                            onClick={() => setShowBookingForm(true)}
                                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#8B4A33] focus:outline-none focus:ring-2 focus:ring-[#8B4A33] focus:ring-offset-2"
                                        >
                                            Book This Space
                                            <ArrowUpRight size={17} />
                                        </button>
                                    )}

                                    {/* JOIN WAITLIST BUTTON */}
                                    {isUnavailable && (
                                        <div className="mt-5 space-y-4">
                                            <button
                                                type="button"
                                                onClick={handleJoinWaitlist}
                                                disabled={isJoiningWaitlist}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B4A33] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#1B3F36] focus:outline-none focus:ring-2 focus:ring-[#8B4A33] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isJoiningWaitlist
                                                    ? "Joining..."
                                                    : "Join Waitlist"}

                                                <ArrowUpRight size={17} />
                                            </button>

                                            {/* WAITLIST FEEDBACK */}
                                            {waitlistMessage && (
                                                <div
                                                    role="alert"
                                                    className={`rounded-xl p-4 text-sm leading-6 ${waitlistMessageType === "success"
                                                        ? "bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                                                        : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                                                        }`}
                                                >
                                                    {waitlistMessage}

                                                    {/* DIRECT LINK TO MY WAITLIST */}
                                                    {waitlistMessageType === "success" && (
                                                        <Link
                                                            to="/my-waitlist"
                                                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B3F36] px-4 py-3 font-semibold text-white transition hover:bg-[#8B4A33]"
                                                        >
                                                            View My Waitlist
                                                            <ArrowUpRight size={17} />
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* UNKNOWN AVAILABILITY */}
                                    {!isAvailable && !isUnavailable && (
                                        <div className="mt-5 rounded-xl bg-white/70 p-4 text-center text-sm font-medium text-[#8B4A33] dark:bg-[#1A2923]">
                                            Booking is unavailable until this resource's availability is confirmed.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </aside>
                    </section>

                    {/* AMENITIES */}
                    <section className="mt-10 rounded-3xl border border-[#1B3F36]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1A2923] sm:p-8">

                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-[#F5F1E6] p-3 dark:bg-[#20332B]">
                                <Sparkles
                                    size={22}
                                    className="text-[#8B4A33]"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                    Amenities and facilities
                                </h2>

                                <p className="mt-1 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                    Facilities available at this space.
                                </p>
                            </div>
                        </div>

                        {amenities.length > 0 ? (
                            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {amenities.map((amenity, index) => (
                                    <div
                                        key={`${amenity}-${index}`}
                                        className="flex items-center gap-3 rounded-xl border border-[#1B3F36]/10 bg-[#F5F1E6]/70 px-4 py-4 text-sm font-medium text-[#1B3F36] dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]"
                                    >
                                        <CheckCircle2
                                            size={17}
                                            className="shrink-0 text-[#8B4A33]"
                                        />

                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-6 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                No amenities have been listed for this space yet.
                            </p>
                        )}
                    </section>
                </div>
            </main>

            {/* BOOKING MODAL */}
            {showBookingForm && isAvailable && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowBookingForm(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        className="relative my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#1B3F36]/10 bg-[#F5F1E6] shadow-2xl dark:border-white/10 dark:bg-[#1A2923]"
                    >
                        {/* MODAL HEADER */}
                        <div className="flex items-start justify-between border-b border-[#1B3F36]/10 px-6 py-6 dark:border-white/10 sm:px-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B4A33]">
                                    SPACESYNC RESERVATION
                                </p>

                                <h2
                                    id="booking-modal-title"
                                    className="mt-2 text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]"
                                >
                                    Book Your Space
                                </h2>

                                <p className="mt-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                    Complete the details below to request your reservation.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowBookingForm(false)}
                                aria-label="Close booking form"
                                className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1B3F36] transition hover:bg-[#8B4A33] hover:text-white dark:bg-[#20332B] dark:text-[#F5F1E6]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* MODAL BODY */}
                        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8">
                            <div className="mb-6 rounded-2xl border border-[#1B3F36]/10 bg-white p-4 dark:border-white/10 dark:bg-[#20332B]">
                                <p className="text-xs font-medium text-[#7B857F] dark:text-[#B9C5BE]">
                                    SELECTED RESOURCE
                                </p>

                                <h3 className="mt-1 text-lg font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                    {resource.name}
                                </h3>

                                <p className="mt-1 flex items-center gap-2 text-xs text-[#59665F] dark:text-[#B9C5BE]">
                                    <MapPin size={14} />
                                    {location || "Location not specified"}
                                </p>
                            </div>

                            <BookingForm resource={resource} />

                            <button
                                type="button"
                                onClick={() => setShowBookingForm(false)}
                                className="mt-4 w-full rounded-xl border border-[#1B3F36]/20 px-5 py-3 text-sm font-semibold text-[#1B3F36] transition hover:bg-white dark:border-white/20 dark:text-[#F5F1E6] dark:hover:bg-[#20332B]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ResourceDetailPage;