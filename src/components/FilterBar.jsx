
import {
    Search,
    MapPin,
    SlidersHorizontal,
    X,
    Users,
    Wifi,
} from "lucide-react";

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

const fieldClass =
    "w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] px-4 py-3 text-sm text-[#1B3F36] outline-none transition placeholder:text-[#7B857F] focus:border-[#8B4A33] focus:ring-2 focus:ring-[#8B4A33]/10 dark:border-white/15 dark:bg-[#111A17] dark:text-[#F5F1E6]";

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
        <section className="overflow-hidden rounded-2xl border border-[#1B3F36]/15 bg-white shadow-sm dark:border-white/10 dark:bg-[#1A2923]">

            {/* FILTER HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3F36]/10 bg-[#1B3F36] px-5 py-5 text-[#F5F1E6] md:px-7">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5">
                        <SlidersHorizontal size={20} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold">
                            Find your space
                        </h2>
                        <p className="mt-1 text-xs text-[#D1DDD6]">
                            Refine your search to find the right resource.
                        </p>
                    </div>
                </div>

                <span className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#F5F1E6]">
                    Smart filters
                </span>
            </div>

            <div className="p-5 md:p-7">

                {/* BASIC FILTERS */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                    {/* SEARCH */}
                    <div>
                        <label
                            htmlFor="resource-search"
                            className="mb-2 block text-xs font-bold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            Search resources
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] px-4 transition focus-within:border-[#8B4A33] focus-within:ring-2 focus-within:ring-[#8B4A33]/10 dark:border-white/15 dark:bg-[#111A17]">
                            <Search
                                size={18}
                                className="shrink-0 text-[#8B4A33]"
                            />

                            <input
                                id="resource-search"
                                type="search"
                                value={searchQuery}
                                onChange={(event) =>
                                    onSearchChange(event.target.value)
                                }
                                placeholder="Search resources..."
                                className="w-full bg-transparent py-3 text-sm text-[#1B3F36] outline-none placeholder:text-[#7B857F] dark:text-[#F5F1E6]"
                            />
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label
                            htmlFor="resource-category"
                            className="mb-2 block text-xs font-bold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            Industry category
                        </label>

                        <select
                            id="resource-category"
                            value={selectedCategory}
                            onChange={(event) =>
                                onCategoryChange(event.target.value)
                            }
                            className={fieldClass}
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
                            className="mb-2 block text-xs font-bold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            Province
                        </label>

                        <div className="flex items-center gap-2 rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] px-3 transition focus-within:border-[#8B4A33] focus-within:ring-2 focus-within:ring-[#8B4A33]/10 dark:border-white/15 dark:bg-[#111A17]">
                            <MapPin
                                size={17}
                                className="shrink-0 text-[#8B4A33]"
                            />

                            <select
                                id="resource-province"
                                value={selectedProvince}
                                onChange={(event) =>
                                    onProvinceChange(event.target.value)
                                }
                                className="w-full bg-transparent py-3 text-sm text-[#1B3F36] outline-none dark:text-[#F5F1E6]"
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
                            className="mb-2 block text-xs font-bold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            District
                        </label>

                        <div className="flex items-center gap-2 rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] px-3 transition focus-within:border-[#8B4A33] focus-within:ring-2 focus-within:ring-[#8B4A33]/10 dark:border-white/15 dark:bg-[#111A17]">
                            <MapPin
                                size={17}
                                className="shrink-0 text-[#8B4A33]"
                            />

                            <select
                                id="resource-district"
                                value={selectedDistrict}
                                onChange={(event) =>
                                    onDistrictChange(event.target.value)
                                }
                                disabled={districtDisabled}
                                className="w-full bg-transparent py-3 text-sm text-[#1B3F36] outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#F5F1E6]"
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
                <div className="mt-7 grid gap-8 border-t border-[#1B3F36]/10 pt-7 dark:border-white/10 md:grid-cols-2">

                    {/* MINIMUM CAPACITY */}
                    <div>
                        <label
                            htmlFor="minimum-capacity"
                            className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            <Users size={17} className="text-[#8B4A33]" />
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
                            className={fieldClass}
                        />

                        <p className="mt-2 text-xs leading-5 text-[#7B857F] dark:text-[#B9C5BE]">
                            Find spaces that can accommodate at least this many people.
                        </p>
                    </div>

                    {/* AMENITIES */}
                    <fieldset className="min-w-0">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <legend className="flex items-center gap-2 text-sm font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                <Wifi size={17} className="text-[#8B4A33]" />
                                Available amenities
                            </legend>

                            {selectedAmenities.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => onAmenitiesChange([])}
                                    className="shrink-0 text-xs font-semibold text-[#8B4A33] transition hover:text-[#1B3F36] dark:hover:text-[#F5F1E6]"
                                >
                                    Clear selection
                                </button>
                            )}
                        </div>

                        <p className="mb-4 text-xs text-[#7B857F] dark:text-[#B9C5BE]">
                            Choose the facilities you need in your space.
                        </p>

                        {/* AMENITY CHIPS */}
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
                                        className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${isSelected
                                                ? "border-[#1B3F36] bg-[#1B3F36] text-white"
                                                : "border-[#1B3F36]/15 bg-[#F5F1E6] text-[#59665F] hover:border-[#8B4A33] hover:text-[#8B4A33] dark:border-white/15 dark:bg-[#111A17] dark:text-[#B9C5BE]"
                                            }`}
                                    >
                                        {amenity}
                                    </button>
                                );
                            })}
                        </div>

                        {selectedAmenities.length > 0 && (
                            <p className="mt-2 text-xs font-medium text-[#8B4A33]">
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
                <div className="mt-7 flex justify-end border-t border-[#1B3F36]/10 pt-5 dark:border-white/10">
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-[#8B4A33] transition hover:bg-[#F5F1E6] hover:text-[#1B3F36] dark:hover:bg-[#20332B] dark:hover:text-[#F5F1E6]"
                    >
                        <X size={15} />
                        Clear all filters
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FilterBar;
