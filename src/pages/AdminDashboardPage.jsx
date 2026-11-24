
import { useEffect, useMemo, useState } from "react";
import {
    LayoutDashboard,
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Building2,
    Users,
    CheckCircle2,
    Ban,
    MapPin,
} from "lucide-react";

import {
    getResources,
    saveResources,
} from "../data/resourceStorage";

const categories = [
    "Campus",
    "Library",
    "Restaurant",
    "Corporate Office",
    "Coworking",
    "Event Garden",
];

const emptyForm = {
    name: "",
    category: "Campus",
    location: "",
    province: "",
    district: "",
    capacity: "",
    amenities: "",
    status: "Available",
    price: "",
    description: "",
    image: "",
};

function AdminDashboardPage() {
    const [resources, setResources] = useState(getResources);

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    // Save catalogue changes through the shared storage utility.
    useEffect(() => {
        try {
            saveResources(resources);
        } catch {
            setError(
                "Unable to save resource changes. Please check your browser storage."
            );
        }
    }, [resources]);

    const availableCount = resources.filter(
        (resource) => resource.status === "Available"
    ).length;

    const unavailableCount = resources.length - availableCount;

    const filteredResources = useMemo(() => {
        const query = search.toLowerCase().trim();

        return resources.filter((resource) => {
            return (
                (resource.name || "").toLowerCase().includes(query) ||
                (resource.category || "").toLowerCase().includes(query) ||
                (resource.location || "").toLowerCase().includes(query)
            );
        });
    }, [resources, search]);

    function openAddForm() {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setShowForm(true);
    }

    function openEditForm(resource) {
        setEditingId(resource.id);

        setForm({
            ...resource,
            capacity: String(resource.capacity ?? ""),
            amenities: Array.isArray(resource.amenities)
                ? resource.amenities.join(", ")
                : "",
            image: resource.image || "",
        });

        setError("");
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !form.name.trim() ||
            !form.location.trim() ||
            !form.province.trim() ||
            !form.district.trim() ||
            !form.capacity ||
            !form.price.trim()
        ) {
            setError("Please complete all required fields.");
            return;
        }

        const capacity = Number(form.capacity);

        if (!Number.isInteger(capacity) || capacity < 1) {
            setError("Capacity must be a whole number greater than zero.");
            return;
        }

        const resourceData = {
            ...form,
            name: form.name.trim(),
            location: form.location.trim(),
            province: form.province.trim(),
            district: form.district.trim(),
            capacity,
            amenities: form.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            description: form.description.trim(),
            image: form.image.trim(),
        };

        if (editingId !== null) {
            setResources((current) =>
                current.map((resource) =>
                    resource.id === editingId
                        ? { ...resource, ...resourceData }
                        : resource
                )
            );
        } else {
            const newId =
                Math.max(
                    0,
                    ...resources.map((item) => Number(item.id) || 0)
                ) + 1;

            const newResource = {
                ...resourceData,
                id: newId,
            };

            setResources((current) => [...current, newResource]);
        }

        closeForm();
    }

    function deleteResource(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmed) return;

        setResources((current) =>
            current.filter((resource) => resource.id !== id)
        );
    }

    function toggleAvailability(resource) {
        setResources((current) =>
            current.map((item) =>
                item.id === resource.id
                    ? {
                        ...item,
                        status:
                            item.status === "Available"
                                ? "Not Available"
                                : "Available",
                    }
                    : item
            )
        );
    }

    return (
        <main className="min-h-screen bg-surface-canvas px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-primary">
                            <LayoutDashboard size={18} />
                            SPACESYNC ADMINISTRATION
                        </div>

                        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
                            Resource Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-text-secondary">
                            Manage your spaces, equipment and resource availability.
                        </p>
                    </div>

                    <button
                        onClick={openAddForm}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white transition hover:bg-brand-hover"
                    >
                        <Plus size={19} />
                        Add Resource
                    </button>
                </div>

                {/* STATISTICS */}
                <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Resources"
                        value={resources.length}
                        icon={<Building2 size={22} />}
                    />

                    <StatCard
                        title="Available"
                        value={availableCount}
                        icon={<CheckCircle2 size={22} />}
                    />

                    <StatCard
                        title="Not Available"
                        value={unavailableCount}
                        icon={<Ban size={22} />}
                    />

                    <StatCard
                        title="Total Capacity"
                        value={resources.reduce(
                            (total, item) =>
                                total + Number(item.capacity || 0),
                            0
                        )}
                        icon={<Users size={22} />}
                    />
                </section>

                {/* RESOURCE MANAGEMENT */}
                <section className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-sm">

                    <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-text-primary">
                                Resource Management
                            </h2>

                            <p className="mt-1 text-sm text-text-secondary">
                                View, update and manage your resource catalogue.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search resources..."
                                className="w-full rounded-xl border border-border bg-surface-canvas py-3 pl-10 pr-4 text-sm text-text-primary outline-none transition focus:border-brand-accent"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead className="bg-surface-muted text-xs uppercase tracking-wider text-text-secondary">
                                <tr>
                                    <th className="px-5 py-4">Resource</th>
                                    <th className="px-5 py-4">Category</th>
                                    <th className="px-5 py-4">Location</th>
                                    <th className="px-5 py-4">Capacity</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {filteredResources.map((resource) => (
                                    <tr
                                        key={resource.id}
                                        className="transition hover:bg-surface-muted/60"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-text-primary">
                                                {resource.name}
                                            </p>

                                            <p className="mt-1 text-xs text-text-secondary">
                                                {resource.price}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-text-secondary">
                                            {resource.category}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                                <MapPin
                                                    size={15}
                                                    className="text-brand-accent"
                                                />
                                                {resource.location}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-text-primary">
                                            {resource.capacity} people
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${resource.status === "Available"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-orange-100 text-orange-800"
                                                    }`}
                                            >
                                                {resource.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditForm(resource)}
                                                    title="Edit resource"
                                                    className="rounded-lg p-2 text-brand-primary transition hover:bg-surface-muted"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                <button
                                                    onClick={() => toggleAvailability(resource)}
                                                    title="Toggle availability"
                                                    className="rounded-lg p-2 text-brand-accent transition hover:bg-surface-muted"
                                                >
                                                    <CheckCircle2 size={17} />
                                                </button>

                                                <button
                                                    onClick={() => deleteResource(resource.id)}
                                                    title="Delete resource"
                                                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredResources.length === 0 && (
                            <div className="px-6 py-16 text-center">
                                <Building2
                                    size={36}
                                    className="mx-auto mb-3 text-text-secondary"
                                />

                                <h3 className="font-semibold text-text-primary">
                                    No resources found
                                </h3>

                                <p className="mt-1 text-sm text-text-secondary">
                                    Try another search or add a new resource.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                        Showing {filteredResources.length} of {resources.length} resources
                    </div>
                </section>
            </div>

            {/* ADD / EDIT MODAL */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
                    <div className="my-auto w-full max-w-2xl rounded-2xl bg-surface-card shadow-2xl">

                        <div className="flex items-center justify-between border-b border-border p-5">
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">
                                    {editingId !== null
                                        ? "Edit Resource"
                                        : "Add New Resource"}
                                </h2>

                                <p className="mt-1 text-sm text-text-secondary">
                                    Enter the resource information below.
                                </p>
                            </div>

                            <button
                                onClick={closeForm}
                                className="rounded-lg p-2 text-text-secondary transition hover:bg-surface-muted"
                                aria-label="Close form"
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-5">

                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </p>
                            )}

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    label="Resource Name *"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Innovation Study Room"
                                />

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-primary">
                                        Category *
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-border bg-surface-canvas px-4 py-3 text-text-primary outline-none focus:border-brand-accent"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <FormField
                                    label="Location *"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                />

                                <FormField
                                    label="Province *"
                                    name="province"
                                    value={form.province}
                                    onChange={handleChange}
                                    placeholder="Province"
                                />

                                <FormField
                                    label="District *"
                                    name="district"
                                    value={form.district}
                                    onChange={handleChange}
                                    placeholder="District"
                                />

                                <FormField
                                    label="Capacity *"
                                    name="capacity"
                                    type="number"
                                    value={form.capacity}
                                    onChange={handleChange}
                                    placeholder="Number of people"
                                />

                                <FormField
                                    label="Price *"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="e.g. Free or RWF 20,000/hour"
                                />

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-text-primary">
                                        Availability
                                    </label>

                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-border bg-surface-canvas px-4 py-3 text-text-primary outline-none focus:border-brand-accent"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Not Available">
                                            Not Available
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <FormField
                                label="Amenities"
                                name="amenities"
                                value={form.amenities}
                                onChange={handleChange}
                                placeholder="Wi-Fi, Projector, Whiteboard"
                            />

                            <FormField
                                label="Image Path"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="/images/resource-name.jpg"
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-text-primary">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Describe this resource..."
                                    className="w-full resize-none rounded-xl border border-border bg-surface-canvas px-4 py-3 text-text-primary outline-none focus:border-brand-accent"
                                />
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-xl border border-border px-5 py-3 font-semibold text-text-primary transition hover:bg-surface-muted"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition hover:bg-brand-hover"
                                >
                                    {editingId !== null
                                        ? "Save Changes"
                                        : "Add Resource"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="rounded-2xl border border-border bg-surface-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-text-secondary">
                    {title}
                </p>

                <span className="rounded-xl bg-surface-muted p-3 text-brand-primary">
                    {icon}
                </span>
            </div>

            <p className="text-3xl font-bold text-text-primary">
                {value}
            </p>
        </div>
    );
}

function FormField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-text-primary"
            >
                {label}
            </label>

            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={type === "number" ? "1" : undefined}
                className="w-full rounded-xl border border-border bg-surface-canvas px-4 py-3 text-text-primary outline-none transition focus:border-brand-accent"
            />
        </div>
    );
}

export default AdminDashboardPage;
