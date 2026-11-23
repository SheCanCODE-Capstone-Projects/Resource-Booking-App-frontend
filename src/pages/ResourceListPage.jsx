
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Building2, MapPin } from "lucide-react";

import resources from "../data/resources";
import ResourceCard from "../components/ResourceCard";
import FilterBar from "../components/FilterBar";

function ResourceListPage() {
    const navigate = useNavigate();

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All Categories");
    const [selectedProvince, setSelectedProvince] =
        useState("All Provinces");
    const [selectedDistrict, setSelectedDistrict] =
        useState("All Districts");
    const [selectedMinCapacity, setSelectedMinCapacity] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Filter resources based on all selected filters
    const filteredResources = useMemo(() => {
        return resources.filter((resource) => {
            const searchText = searchQuery.trim().toLowerCase();

            const searchableText = [
                resource.name,
                resource.description,
                resource.category,
                resource.location,
                resource.province,
                resource.district,
                ...(resource.amenities || []),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch = searchableText.includes(searchText);

            const matchesCategory =
                selectedCategory === "All Categories" ||
                resource.category === selectedCategory;

            const matchesProvince =
                selectedProvince === "All Provinces" ||
                resource.province === selectedProvince;

            const matchesDistrict =
                selectedDistrict === "All Districts" ||
                resource.district === selectedDistrict;

            const capacity = Number(selectedMinCapacity);

            const matchesCapacity =
                selectedMinCapacity === "" ||
                (
                    Number.isInteger(capacity) &&
                    capacity >= 1 &&
                    Number(resource.capacity) >= capacity
                );

            const resourceAmenities = resource.amenities || [];

            const matchesAmenities = selectedAmenities.every((amenity) =>
                resourceAmenities.includes(amenity)
            );

            return (
                matchesSearch &&
                matchesCategory &&
                matchesProvince &&
                matchesDistrict &&
                matchesCapacity &&
                matchesAmenities
            );
        });
    }, [
        searchQuery,
        selectedCategory,
        selectedProvince,
        selectedDistrict,
        selectedMinCapacity,
        selectedAmenities,
    ]);

    // Update province and reset district when province changes
    function handleProvinceChange(province) {
        setSelectedProvince(province);
        setSelectedDistrict("All Districts");
    }

    // Reset every filter
    function resetFilters() {
        setSearchQuery("");
        setSelectedCategory("All Categories");
        setSelectedProvince("All Provinces");
        setSelectedDistrict("All Districts");
        setSelectedMinCapacity("");
        setSelectedAmenities([]);
    }

    // Navigate to selected resource details
    function handleViewDetails(resource) {
        navigate(`/resources/${resource.id}`);
    }

    // Check whether any filter is active
    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedCategory !== "All Categories" ||
        selectedProvince !== "All Provinces" ||
        selectedDistrict !== "All Districts" ||
        selectedMinCapacity !== "" ||
        selectedAmenities.length > 0;

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 lg:px-8">

            {/* PAGE INTRODUCTION */}
            <section className="mb-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary">
                    <Building2 size={14} />
                    SPACE AND RESOURCE DISCOVERY
                </div>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
                    Find the right space
                    <span className="block text-text-secondary">
                        for what matters.
                    </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
                    Explore and discover study rooms, libraries, meeting spaces,
                    restaurants, coworking areas, and event gardens.
                    Find a space that works for you.
                </p>
            </section>

            {/* FILTERS */}
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedProvince={selectedProvince}
                onProvinceChange={handleProvinceChange}
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
                selectedMinCapacity={selectedMinCapacity}
                onMinCapacityChange={setSelectedMinCapacity}
                selectedAmenities={selectedAmenities}
                onAmenitiesChange={setSelectedAmenities}
                onReset={resetFilters}
            />

            {/* RESOURCE RESULTS */}
            <section className="mt-10">

                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                            Explore resources
                        </h2>

                        <p className="mt-2 text-sm text-text-secondary">
                            Discover spaces that match your needs.
                        </p>

                        {/* SELECTED LOCATION */}
                        {(selectedProvince !== "All Provinces" ||
                            selectedDistrict !== "All Districts") && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
                                    <MapPin size={15} />

                                    <span>
                                        {selectedProvince !== "All Provinces"
                                            ? selectedProvince
                                            : "All Provinces"}

                                        {selectedDistrict !== "All Districts" &&
                                            ` / ${selectedDistrict}`}
                                    </span>
                                </div>
                            )}
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-text-secondary">
                            {filteredResources.length}{" "}
                            {filteredResources.length === 1
                                ? "resource"
                                : "resources"}{" "}
                            found
                        </p>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="text-sm font-semibold text-text-primary underline underline-offset-4 hover:text-text-secondary"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>

                {/* RESOURCE GRID */}
                {filteredResources.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredResources.map((resource) => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    /* EMPTY STATE */
                    <div
                        role="status"
                        aria-live="polite"
                        className="rounded-2xl border border-border bg-surface-card px-6 py-16 text-center"
                    >
                        <Search
                            size={32}
                            className="mx-auto text-text-secondary"
                        />

                        <h3 className="mt-5 text-lg font-bold text-text-primary">
                            No resources found
                        </h3>

                        <p className="mt-2 text-sm text-text-secondary">
                            We couldn't find resources matching your selected
                            filters. Try changing your search, capacity,
                            amenities, or location.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-6 rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover dark:text-black"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}

export default ResourceListPage;
