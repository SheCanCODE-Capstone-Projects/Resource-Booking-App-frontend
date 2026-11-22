
import {
    MapPin,
    Users,
    ArrowUpRight,
} from "lucide-react";

function ResourceCard({ resource, onViewDetails }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-surface-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* CARD HEADER */}
            <div className="flex items-start justify-between p-6">
                <div>
                    <span className="inline-flex rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold text-text-secondary">
                        {resource.category}
                    </span>

                    <h3 className="mt-4 text-xl font-bold tracking-tight text-text-primary">
                        {resource.name}
                    </h3>
                </div>

                <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${resource.status === "Available"
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                        }`}
                >
                    {resource.status}
                </span>
            </div>

            {/* CARD DESCRIPTION */}
            <div className="px-6">
                <p className="min-h-[72px] text-sm leading-6 text-text-secondary">
                    {resource.description}
                </p>
            </div>

            {/* RESOURCE DETAILS */}
            <div className="mx-6 mt-5 space-y-3 border-t border-border py-5">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin size={17} />
                    <span>{resource.location}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Users size={17} />
                    <span>Capacity: {resource.capacity} people</span>
                </div>
            </div>

            {/* CARD FOOTER */}
            <div className="flex items-center justify-between border-t border-border bg-surface-muted px-6 py-5">
                <div>
                    <p className="text-xs text-text-secondary">Pricing</p>
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
