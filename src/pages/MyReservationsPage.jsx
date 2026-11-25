
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  ClipboardList,
  UserRound,
  Phone,
  Mail,
  MapPin,
  Search,
  X,
} from "lucide-react";

function MyReservationsPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Backend reservation data will be connected here later.
  const confirmedReservations = [];
  const canceledReservations = [];
  const waitlistedReservations = [];

  const reservationGroups = [
    {
      title: "Confirmed",
      description: "Your approved resource bookings.",
      reservations: confirmedReservations,
      icon: CheckCircle2,
      color: "text-green-600",
      background: "bg-green-50",
      emptyMessage: "You don't have any confirmed reservations yet.",
    },
    {
      title: "Canceled",
      description: "Your canceled reservations.",
      reservations: canceledReservations,
      icon: XCircle,
      color: "text-red-600",
      background: "bg-red-50",
      emptyMessage: "You don't have any canceled reservations.",
    },
    {
      title: "Waitlisted",
      description: "Resources you are waiting to access.",
      reservations: waitlistedReservations,
      icon: Clock3,
      color: "text-amber-600",
      background: "bg-amber-50",
      emptyMessage: "You are not on any waiting lists.",
    },
  ];

  const totalReservations =
    confirmedReservations.length +
    canceledReservations.length +
    waitlistedReservations.length;

  // Search and filter reservations.
  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reservationGroups
      .filter((group) => {
        return (
          selectedStatus === "All" ||
          group.title === selectedStatus
        );
      })
      .map((group) => ({
        ...group,
        reservations: group.reservations.filter((reservation) => {
          const searchableText = [
            reservation.resourceName,
            reservation.customerName,
            reservation.customerEmail,
            reservation.customerPhone,
            reservation.location,
            reservation.date,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableText.includes(query);
        }),
      }));
  }, [search, selectedStatus]);

  const visibleReservations = filteredGroups.reduce(
    (total, group) => total + group.reservations.length,
    0
  );

  function clearSearch() {
    setSearch("");
    setSelectedStatus("All");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
            <CalendarDays size={18} />
            <span>Booking Management</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            My Reservations
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            View your bookings, customer information and reservation
            statuses in one place.
          </p>
        </div>

        {/* TOTAL RESERVATIONS */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <ClipboardList size={28} />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Reservations
              </p>

              <p className="text-3xl font-bold text-slate-900">
                {totalReservations}
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Find a Reservation
          </h2>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by resource, customer, email or phone..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500"
            >
              <option value="All">All Reservations</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Canceled">Canceled</option>
              <option value="Waitlisted">Waitlisted</option>
            </select>

            <button
              type="button"
              onClick={clearSearch}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear Filters
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Showing {visibleReservations} matching reservations.
          </p>
        </section>

        {/* RESERVATION GROUPS */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filteredGroups.map((group) => {
            const Icon = group.icon;

            return (
              <section
                key={group.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-100 p-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-3 ${group.background} ${group.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {group.title}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {group.reservations.length} reservations
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    {group.description}
                  </p>
                </div>

                <div className="p-6">
                  {group.reservations.length === 0 ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <CalendarDays size={26} />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        Nothing to show yet
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {search
                          ? "No reservations match your search."
                          : group.emptyMessage}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {group.reservations.map((reservation) => (
                        <article
                          key={reservation.id}
                          className="rounded-xl border border-slate-200 p-4"
                        >
                          {/* RESOURCE INFORMATION */}
                          <h3 className="text-lg font-bold text-slate-900">
                            {reservation.resourceName}
                          </h3>

                          <div className="mt-3 space-y-2 text-sm text-slate-600">
                            <p className="flex items-center gap-2">
                              <MapPin size={16} />
                              {reservation.location || "Location not provided"}
                            </p>

                            <p className="flex items-center gap-2">
                              <CalendarDays size={16} />
                              {reservation.date || "Date not provided"}
                            </p>

                            <p className="flex items-center gap-2">
                              <Clock3 size={16} />
                              {reservation.startTime || "--:--"} -{" "}
                              {reservation.endTime || "--:--"}
                            </p>
                          </div>

                          {/* CUSTOMER INFORMATION */}
                          <div className="mt-5 border-t border-slate-100 pt-4">
                            <h4 className="mb-3 font-semibold text-slate-800">
                              Customer Information
                            </h4>

                            <div className="space-y-3 text-sm text-slate-600">
                              <p className="flex items-center gap-2">
                                <UserRound size={16} />
                                {reservation.customerName || "Name not provided"}
                              </p>

                              <p className="flex items-center gap-2 break-all">
                                <Phone size={16} />
                                {reservation.customerPhone || "Phone not provided"}
                              </p>

                              <p className="flex items-center gap-2 break-all">
                                <Mail size={16} />
                                {reservation.customerEmail || "Email not provided"}
                              </p>
                            </div>
                          </div>

                          {/* RESERVATION STATUS */}
                          <div className="mt-5 border-t border-slate-100 pt-4">
                            <span className="text-sm font-medium text-slate-500">
                              Reservation Status
                            </span>

                            <p className="mt-1 font-semibold text-slate-800">
                              {reservation.status || group.title}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </main>
  );
}

export default MyReservationsPage;
