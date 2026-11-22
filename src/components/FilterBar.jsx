
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";

const categories = [
    "All Categories",
    "Campus",
    "Library",
    "Restaurant",
    "Corporate Office",
    "Coworking",
    "Event Garden",
];

const provinces = {
    "City of Kigali": [
        "Gasabo",
        "Kicukiro",
        "Nyarugenge",
    ],

    "Northern Province": [
        "Burera",
        "Gakenke",
        "Gicumbi",
        "Musanze",
        "Rulindo",
    ],

    "Southern Province": [
        "Gisagara",
        "Huye",
        "Kamonyi",
        "Muhanga",
        "Nyamagabe",
        "Nyanza",
        "Nyaruguru",
        "Ruhango",
    ],

    "Eastern Province": [
        "Bugesera",
        "Gatsibo",
        "Kayonza",
        "Kirehe",
        "Ngoma",
        "Nyagatare",
        "Rwamagana",
    ],

    "Western Province": [
        "Karongi",
        "Ngororero",
        "Nyabihu",
        "Nyamasheke",
        "Rubavu",
        "Rusizi",
        "Rutsiro",
    ],
};

function FilterBar({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    selectedProvince,
    onProvinceChange,
    selectedDistrict,
    onDistrictChange,
    onReset,
}) {
    const districts = selectedProvince
        ? provinces[selectedProvince] || []
        : [];

    return (
        <section className="rounded-2xl border border-border bg-surface-card p-5 md:p-6">

            {/* FILTER HEADER */}
            <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal size={18} />

                <h2 className="text-sm font-bold text-text-primary">
                    Find your space
                </h2>
            </div>

            {/* FILTER FIELDS */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                {/* SEARCH */}
                <div>
                    <label
                        htmlFor="resource-search"
                        className="mb-2 block text-xs font-semibold text-text-secondary"
                    >
                        Search resources
                    </label>

                    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-canvas px-4 py-3">
                        <Search
                            size={18}
                            className="shrink-0 text-text-secondary"
                        />

                        <input
                            id="resource-search"
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                onSearchChange(event.target.value)
                            }
                            placeholder="Search resources..."
                            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
                        />
                    </div>
                </div>

                {/* CATEGORY */}
                <div>
                    <label
                        htmlFor="resource-category"
                        className="mb-2 block text-xs font-semibold text-text-secondary"
                    >
                        Industry category
                    </label>

                    <select
                        id="resource-category"
                        value={selectedCategory}
                        onChange={(event) =>
                            onCategoryChange(event.target.value)
                        }
                        className="w-full rounded-lg border border-border bg-surface-canvas px-4 py-3 text-sm text-text-primary outline-none focus:border-text-primary"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* PROVINCE */}
                <div>
                    <label
                        htmlFor="resource-province"
                        className="mb-2 block text-xs font-semibold text-text-secondary"
                    >
                        Province
                    </label>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-canvas px-3">
                        <MapPin
                            size={17}
                            className="shrink-0 text-text-secondary"
                        />

                        <select
                            id="resource-province"
                            value={selectedProvince}
                            onChange={(event) =>
                                onProvinceChange(event.target.value)
                            }
                            className="w-full bg-transparent py-3 text-sm text-text-primary outline-none"
                        >
                            <option value="All Provinces">
                                All Provinces
                            </option>

                            {Object.keys(provinces).map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* DISTRICT */}
                <div>
                    <label
                        htmlFor="resource-district"
                        className="mb-2 block text-xs font-semibold text-text-secondary"
                    >
                        District
                    </label>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-canvas px-3">
                        <MapPin
                            size={17}
                            className="shrink-0 text-text-secondary"
                        />

                        <select
                            id="resource-district"
                            value={selectedDistrict}
                            onChange={(event) =>
                                onDistrictChange(event.target.value)
                            }
                            disabled={!selectedProvince || selectedProvince === "All Provinces"}
                            className="w-full bg-transparent py-3 text-sm text-text-primary outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="All Districts">
                                {selectedProvince === "All Provinces"
                                    ? "Select province first"
                                    : "All Districts"}
                            </option>

                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* RESET FILTERS */}
            <div className="mt-5 flex justify-end border-t border-border pt-4">
                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary transition hover:text-text-primary"
                >
                    <X size={15} />
                    Clear filters
                </button>
            </div>

        </section>
    );
}

export default FilterBar;
