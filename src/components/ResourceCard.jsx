
import {
    MapPin,
    Users,
    ArrowUpRight,
} from "lucide-react";

// Category images used when a resource image is unavailable.
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
        fallbackImages[resource.category] || fallbackImages.Campus;

    const image = resource.imageUrl || resource.image || fallbackImage;
    const isActive = resource.active !== false;

    return (
        <article className="group overflow-hidden rounded-2xl border border-[#1B3F36]/15 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#F5F1E6]/15 dark:bg-[#1A2923]">

            {/* RESOURCE IMAGE */}
            <div className="relative h-56 overflow-hidden bg-[#EAE3D3]">
                <img
                    src={image}
                    alt={`${resource.name} - ${resource.category} resource`}
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackImage;
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                {/* CATEGORY */}
                <span className="absolute bottom-4 left-4 rounded-full bg-[#F5F1E6] px-3 py-1.5 text-xs font-semibold text-[#1B3F36]">
                    {resource.category}
                </span>

                {/* RESOURCE STATUS */}
                <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${isActive
                            ? "bg-[#E6F0E9] text-[#1B3F36]"
                            : "bg-[#F5E6DF] text-[#8B4A33]"
                        }`}
                >
                    {isActive ? "Active" : "Inactive"}
                </span>
            </div>

            {/* CARD CONTENT */}
            <div className="p-6">
                <h3 className="text-xl font-bold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6]">
                    {resource.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
                    {resource.description || "No description available."}
                </p>

                {/* RESOURCE DETAILS */}
                <div className="mt-5 space-y-3 border-t border-[#1B3F36]/10 py-5 dark:border-[#F5F1E6]/15">
                    <div className="flex items-center gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        <MapPin
                            size={17}
                            className="shrink-0 text-[#8B4A33]"
                        />
                        <span>{resource.location || "Location not specified"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        <Users
                            size={17}
                            className="shrink-0 text-[#8B4A33]"
                        />
                        <span>Capacity: {resource.capacity} people</span>
                    </div>
                </div>
            </div>

            {/* CARD FOOTER */}
            <div className="flex items-center justify-between border-t border-[#1B3F36]/10 bg-[#F5F1E6] px-6 py-5 dark:border-[#F5F1E6]/15 dark:bg-[#20332B]">
                <div>
                    <p className="text-xs text-[#59665F] dark:text-[#B9C5BE]">
                        Pricing
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                        {resource.price || "Pricing not specified"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onViewDetails(resource)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1B3F36] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#8B4A33] focus:outline-none focus:ring-2 focus:ring-[#8B4A33] focus:ring-offset-2"
                >
                    View details
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </article>
    );
}

export default ResourceCard;
