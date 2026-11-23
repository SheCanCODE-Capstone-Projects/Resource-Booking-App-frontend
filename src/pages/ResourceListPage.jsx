
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Building2, MapPin } from "lucide-react";

import {
    getResources,
    subscribeToResourceChanges,
} from "../data/resourceStorage";

import ResourceCard from "../components/ResourceCard";
import FilterBar from "../components/FilterBar";

function ResourceListPage() {
    const navigate = useNavigate();

    const [resources, setResources] = useState(getResources);
    const [isLoading, setIsLoading] = useState(true);

    // Load resources and subscribe to catalogue changes.
    useEffect(() => {
        function refreshResources() {
            setResources(getResources());
        }

        refreshResources();
        setIsLoading(false);

        const unsubscribe = subscribeToResourceChanges(
            refreshResources
        );

        return unsubscribe;
    }, []);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All Categories");
    const [selectedProvince, setSelectedProvince] =
        useState("All Provinces");
    const [selectedDistrict, setSelectedDistrict] =
        useState("All Districts");
    const [selectedMinCapacity, setSelectedMinCapacity] =
        useState("");
    const [selectedAmenities, setSelectedAmenities] =
        useState([]);

    // Filter the shared resource catalogue.
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
                ...(Array.isArray(resource.amenities)
                    ? resource.amenities
                    : []),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                searchableText.includes(searchText);

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

            const resourceAmenities = Array.isArray(resource.amenities)
                ? resource.amenities
                : [];

            const matchesAmenities = selectedAmenities.every(
                (amenity) => resourceAmenities.includes(amenity)
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
        resources,
        searchQuery,
        selectedCategory,
        selectedProvince,
        selectedDistrict,
        selectedMinCapacity,
        selectedAmenities,
    ]);

    function handleProvinceChange(province) {
        setSelectedProvince(province);
        setSelectedDistrict("All Districts");
    }

    function resetFilters() {
        setSearchQuery("");
        setSelectedCategory("All Categories");
        setSelectedProvince("All Provinces");
        setSelectedDistrict("All Districts");
        setSelectedMinCapacity("");
        setSelectedAmenities([]);
    }

    function handleViewDetails(resource) {
        navigate(`/resources/${resource.id}`);
    }

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedCategory !== "All Categories" ||
        selectedProvince !== "All Provinces" ||
        selectedDistrict !== "All Districts" ||
        selectedMinCapacity !== "" ||
        selectedAmenities.length > 0;

    return (
        <main className="min-h-screen bg-[#F5F1E6] px-5 py-10 transition-colors duration-200 dark:bg-[#111A17] lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* PAGE INTRODUCTION */}
                <section className="mb-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1B3F36]/20 bg-white/70 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#1B3F36] dark:border-[#F5F1E6]/20 dark:bg-[#1A2923] dark:text-[#F5F1E6]">
                        <Building2 size={14} className="text-[#8B4A33]" />
                        SPACE AND RESOURCE DISCOVERY
                    </div>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6]">
                        Find the right space
                        <span className="block text-[#8B4A33]">
                            for what matters.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-[#59665F] dark:text-[#B9C5BE]">
                        Explore and discover study rooms, libraries, meeting
                        spaces, restaurants, coworking areas, and event gardens.
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
                            <h2 className="text-2xl font-bold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6]">
                                Explore resources
                            </h2>

                            <p className="mt-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                Discover spaces that match your needs.
                            </p>

                            {(selectedProvince !== "All Provinces" ||
                                selectedDistrict !== "All Districts") && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-[#1B3F36] dark:text-[#F5F1E6]">
                                        <MapPin
                                            size={15}
                                            className="text-[#8B4A33]"
                                        />

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
                            <p className="text-sm font-medium text-[#59665F] dark:text-[#B9C5BE]">
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
                                    className="text-sm font-semibold text-[#8B4A33] underline underline-offset-4 transition hover:text-[#1B3F36] dark:hover:text-[#F5F1E6]"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* LOADING STATE */}
                    {isLoading ? (
                        <div
                            role="status"
                            aria-live="polite"
                            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="animate-pulse overflow-hidden rounded-2xl border border-[#1B3F36]/10 bg-white dark:border-[#F5F1E6]/10 dark:bg-[#1A2923]"
                                >
                                    <div className="h-52 bg-[#EAE3D3] dark:bg-[#20332B]" />

                                    <div className="space-y-3 p-5">
                                        <div className="h-4 w-2/3 rounded bg-[#EAE3D3] dark:bg-[#20332B]" />
                                        <div className="h-3 w-1/2 rounded bg-[#EAE3D3] dark:bg-[#20332B]" />
                                        <div className="h-10 rounded bg-[#EAE3D3] dark:bg-[#20332B]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredResources.length > 0 ? (

                        /* RESOURCE GRID */
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
                            className="rounded-2xl border border-[#1B3F36]/15 bg-white px-6 py-16 text-center dark:border-[#F5F1E6]/15 dark:bg-[#1A2923]"
                        >
                            <Search
                                size={32}
                                className="mx-auto text-[#8B4A33]"
                            />

                            <h3 className="mt-5 text-lg font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                No resources found
                            </h3>

                            <p className="mt-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                We couldn't find resources matching your
                                selected filters. Try changing your search,
                                capacity, amenities, or location.
                            </p>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-6 rounded-lg bg-[#1B3F36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#14302A]"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default ResourceListPage;
