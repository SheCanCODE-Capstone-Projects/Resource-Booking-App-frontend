
import { useMemo, useState } from "react";
import { Search, Building2 } from "lucide-react";

import resources from "../data/resources";
import ResourceCard from "../components/ResourceCard";
import FilterBar from "../components/FilterBar";

function ResourceListPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("All Categories");
    const [selectedProvince, setSelectedProvince] =
        useState("All Provinces");
    const [selectedDistrict, setSelectedDistrict] =
        useState("All Districts");

    const filteredResources = useMemo(() => {
        return resources.filter((resource) => {
            const searchText = searchQuery.toLowerCase().trim();

            const searchableText = [
                resource.name,
                resource.description,
                resource.category,
                resource.location,
                resource.province,
                resource.district,
            ]
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

            return (
                matchesSearch &&
                matchesCategory &&
                matchesProvince &&
                matchesDistrict
            );
        });
    }, [
        searchQuery,
        selectedCategory,
        selectedProvince,
        selectedDistrict,
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
    }

    function handleViewDetails(resource) {
        alert(`You selected: ${resource.name}`);
    }

    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 lg:px-8">
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
                </p>
            </section>

            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedProvince={selectedProvince}
                onProvinceChange={handleProvinceChange}
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
                onReset={resetFilters}
            />

            <section className="mt-10">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                            Explore resources
                        </h2>

                        <p className="mt-2 text-sm text-text-secondary">
                            Discover spaces that match your needs.
                        </p>
                    </div>

                    <p className="text-sm font-medium text-text-secondary">
                        {filteredResources.length}{" "}
                        {filteredResources.length === 1 ? "resource" : "resources"} found
                    </p>
                </div>

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
                    <div className="rounded-2xl border border-border bg-surface-card px-6 py-16 text-center">
                        <Search
                            size={32}
                            className="mx-auto text-text-secondary"
                        />

                        <h3 className="mt-5 text-lg font-bold text-text-primary">
                            No resources found
                        </h3>

                        <p className="mt-2 text-sm text-text-secondary">
                            Try changing your search or adjusting your filters.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-6 rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white dark:text-black"
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
