
import {
    MapPin,
    Users,
    ArrowUpRight,
} from "lucide-react";

// Category images used when a local resource image is unavailable.
const fallbackImages = {
    Campus:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",

    Library:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85",

    Restaurant:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",

    "Corporate Office":
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",

    Coworking:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",

    "Event Garden":
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85",
};

function ResourceCard({ resource, onViewDetails }) {
    const fallbackImage =
        fallbackImages[resource.category] ||
        fallbackImages.Campus;

    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-surface-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* RESOURCE IMAGE */}
            <div className="relative h-56 overflow-hidden bg-surface-muted">
                <img
                    src={resource.image || fallbackImage}
                    alt={`${resource.name} - ${resource.category} resource`}
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackImage;
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black">
                    {resource.category}
                </span>

                <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${resource.status === "Available"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                >
                    {resource.status}
                </span>
            </div>

            {/* CARD HEADER */}
            <div className="p-6">
                <h3 className="text-xl font-bold tracking-tight text-text-primary">
                    {resource.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-text-secondary">
                    {resource.description}
                </p>

                {/* RESOURCE DETAILS */}
                <div className="mt-5 space-y-3 border-t border-border py-5">
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                        <MapPin size={17} className="shrink-0" />
                        <span>{resource.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                        <Users size={17} className="shrink-0" />
                        <span>Capacity: {resource.capacity} people</span>
                    </div>
                </div>
            </div>

            {/* CARD FOOTER */}
            <div className="flex items-center justify-between border-t border-border bg-surface-muted px-6 py-5">
                <div>
                    <p className="text-xs text-text-secondary">
                        Pricing
                    </p>

                    <p className="mt-1 text-sm font-bold text-text-primary">
                        {resource.price}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onViewDetails(resource)}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-3 text-xs font-semibold text-white transition hover:bg-brand-hover dark:text-black"
                >
                    View details
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </article>
    );
}

export default ResourceCard;
