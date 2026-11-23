
import { Search, MapPin, SlidersHorizontal, X, Users, Wifi } from "lucide-react";

const categories = [
    "All Categories",
    "Campus",
    "Library",
    "Restaurant",
    "Corporate Office",
    "Coworking",
    "Event Garden",
];

const amenities = [
    "Wi-Fi",
    "Whiteboard",
    "Power outlets",
    "Computers",
    "Projector",
    "Reading desks",
    "Air conditioning",
    "Printer",
    "Private seating",
    "Outdoor seating",
    "Garden view",
    "Family seating",
    "Outdoor access",
    "Conference screen",
    "Video conferencing",
    "Desk",
    "Sound system",
    "Shared desks",
    "Lounge seating",
    "Parking",
    "Lakeside view",
    "Event lighting",
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
    selectedMinCapacity,
    onMinCapacityChange,
    selectedAmenities,
    onAmenitiesChange,
    onReset,
}) {
    const districts =
        selectedProvince !== "All Provinces"
            ? provinces[selectedProvince] || []
            : [];

    const districtDisabled = selectedProvince === "All Provinces";

    function handleAmenityChange(amenity) {
        const isSelected = selectedAmenities.includes(amenity);

        if (isSelected) {
            onAmenitiesChange(
                selectedAmenities.filter((item) => item !== amenity)
            );
        } else {
            onAmenitiesChange([...selectedAmenities, amenity]);
        }
    }

    return (
        <section className="rounded-2xl border border-border bg-surface-card p-5 md:p-6">

            {/* FILTER HEADER */}
            <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal size={18} />

                <h2 className="text-sm font-bold text-text-primary">
                    Find your space
                </h2>
            </div>

            {/* BASIC FILTERS */}
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
                            disabled={districtDisabled}
                            className="w-full bg-transparent py-3 text-sm text-text-primary outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="All Districts">
                                {districtDisabled
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

            {/* ADVANCED FILTERS */}
            <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-2">

                {/* MINIMUM CAPACITY */}
                <div>
                    <label
                        htmlFor="minimum-capacity"
                        className="mb-2 flex items-center gap-2 text-xs font-semibold text-text-secondary"
                    >
                        <Users size={16} />
                        Minimum capacity
                    </label>

                    <input
                        id="minimum-capacity"
                        type="number"
                        min="1"
                        step="1"
                        value={selectedMinCapacity}
                        onChange={(event) =>
                            onMinCapacityChange(event.target.value)
                        }
                        placeholder="e.g. 10 people"
                        className="w-full rounded-lg border border-border bg-surface-canvas px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-text-primary"
                    />

                    <p className="mt-2 text-xs text-text-secondary">
                        Find spaces that can accommodate at least this many people.
                    </p>
                </div>

                {/* AMENITIES */}
                <fieldset className="min-w-0">
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <legend className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                            <Wifi size={17} />
                            Available amenities
                        </legend>

                        {selectedAmenities.length > 0 && (
                            <button
                                type="button"
                                onClick={() => onAmenitiesChange([])}
                                className="shrink-0 text-xs font-medium text-text-secondary transition hover:text-text-primary"
                            >
                                Clear selection
                            </button>
                        )}
                    </div>

                    <p className="mb-4 text-xs text-text-secondary">
                        Choose the facilities you need in your space.
                    </p>

                    {/* HORIZONTAL AMENITY CHIPS */}
                    <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-3">
                        {amenities.map((amenity) => {
                            const isSelected =
                                selectedAmenities.includes(amenity);

                            return (
                                <button
                                    key={amenity}
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() =>
                                        handleAmenityChange(amenity)
                                    }
                                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-200 ${isSelected
                                            ? "border-text-primary bg-brand-primary text-white dark:text-black"
                                            : "border-border bg-surface-canvas text-text-secondary hover:border-text-primary hover:text-text-primary"
                                        }`}
                                >
                                    {amenity}
                                </button>
                            );
                        })}
                    </div>

                    {selectedAmenities.length > 0 && (
                        <p className="mt-2 text-xs text-text-secondary">
                            {selectedAmenities.length}{" "}
                            {selectedAmenities.length === 1
                                ? "amenity"
                                : "amenities"}{" "}
                            selected
                        </p>
                    )}
                </fieldset>
            </div>

            {/* RESET FILTERS */}
            <div className="mt-6 flex justify-end border-t border-border pt-4">
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
