
import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  ClipboardList,
  MapPin,
  Search,
  X,
  ArrowUpRight,
  CalendarCheck,
} from "lucide-react";

const reservationGroups = [
  {
    title: "Confirmed",
    description: "Your approved resource bookings.",
    status: "Confirmed",
    icon: CheckCircle2,
    color: "text-[#1B3F36]",
    background: "bg-[#E8F0EB]",
    emptyMessage: "You don't have any confirmed reservations yet.",
  },
  {
    title: "Canceled",
    description: "Reservations that have been canceled.",
    status: "Canceled",
    icon: XCircle,
    color: "text-[#8B4A33]",
    background: "bg-[#F5EAE5]",
    emptyMessage: "You don't have any canceled reservations.",
  },
  {
    title: "Waitlisted",
    description: "Bookings waiting for availability.",
    status: "Waitlisted",
    icon: Clock3,
    color: "text-[#75664B]",
    background: "bg-[#F2EEE4]",
    emptyMessage: "You are not on any waiting lists.",
  },
];

// Backend reservation data will be connected here.
const confirmedReservations = [];
const canceledReservations = [];
const waitlistedReservations = [];

function MyReservationsPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const totalReservations =
    confirmedReservations.length +
    canceledReservations.length +
    waitlistedReservations.length;

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reservationGroups
      .filter(
        (group) =>
          selectedStatus === "All" ||
          group.title === selectedStatus
      )
      .map((group) => {
        const reservations =
          group.title === "Confirmed"
            ? confirmedReservations
            : group.title === "Canceled"
              ? canceledReservations
              : waitlistedReservations;

        return {
          ...group,
          reservations: reservations.filter((reservation) => {
            const searchableText = [
              reservation.resourceName,
              reservation.location,
              reservation.date,
              reservation.status,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(query);
          }),
        };
      });
  }, [search, selectedStatus]);

  const visibleReservations = filteredGroups.reduce(
    (total, group) => total + group.reservations.length,
    0
  );

  function clearFilters() {
    setSearch("");
    setSelectedStatus("All");
  }

  return (
    <main className="min-h-screen bg-[#F5F1E6] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#8B4A33]">
            <CalendarDays size={18} />
            <span>YOUR BOOKING SPACE</span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1B3F36] sm:text-4xl">
                My Reservations
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64716A] sm:text-base">
                Keep track of your bookings, check reservation
                statuses, and manage your upcoming plans.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-[#1B3F36]">
              <CalendarCheck size={19} />
              <span>Your booking overview</span>
            </div>
          </div>
        </section>

        {/* RESERVATION SUMMARY */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-[#1B3F36] p-6 text-[#F5F1E6] shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[#C7D5CC]">
                Total Reservations
              </p>

              <p className="mt-2 text-4xl font-bold">
                {totalReservations}
              </p>

              <p className="mt-2 text-sm text-[#C7D5CC]">
                All your bookings in one place.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <ClipboardList size={32} />
            </div>
          </div>
        </section>

        {/* STATUS SUMMARY */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {reservationGroups.map((group) => {
            const Icon = group.icon;

            const count =
              group.title === "Confirmed"
                ? confirmedReservations.length
                : group.title === "Canceled"
                  ? canceledReservations.length
                  : waitlistedReservations.length;

            return (
              <button
                key={group.title}
                type="button"
                onClick={() =>
                  setSelectedStatus(
                    selectedStatus === group.title
                      ? "All"
                      : group.title
                  )
                }
                className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selectedStatus === group.title
                  ? "border-[#1B3F36] ring-2 ring-[#1B3F36]/10"
                  : "border-[#E4DED1]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${group.background} ${group.color}`}>
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight size={18} className="text-[#A3AAA4]" />
                </div>

                <p className="mt-4 text-2xl font-bold text-[#1B3F36]">
                  {count}
                </p>

                <p className="mt-1 font-semibold text-[#293A32]">
                  {group.title}
                </p>
              </button>
            );
          })}
        </section>

        {/* SEARCH AND FILTER */}
        <section className="mb-8 rounded-2xl border border-[#E4DED1] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#1B3F36]">
              Find a Reservation
            </h2>

            <p className="mt-1 text-sm text-[#77827B]">
              Search your bookings or filter them by status.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89938C]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by resource, location or date..."
                className="w-full rounded-xl border border-[#E4DED1] bg-[#FDFCFA] py-3 pl-10 pr-10 text-sm text-[#293A32] outline-none transition placeholder:text-[#A1AAA3] focus:border-[#1B3F36] focus:ring-2 focus:ring-[#1B3F36]/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89938C] hover:text-[#1B3F36]"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="rounded-xl border border-[#E4DED1] bg-[#FDFCFA] px-4 py-3 text-sm text-[#293A32] outline-none focus:border-[#1B3F36]"
            >
              <option value="All">All Reservations</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Canceled">Canceled</option>
              <option value="Waitlisted">Waitlisted</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-[#E4DED1] px-5 py-3 text-sm font-semibold text-[#1B3F36] transition hover:bg-[#F5F1E6]"
            >
              Clear Filters
            </button>
          </div>

          <p className="mt-4 text-sm text-[#77827B]">
            Showing{" "}
            <span className="font-semibold text-[#1B3F36]">
              {visibleReservations}
            </span>{" "}
            matching reservations.
          </p>
        </section>

        {/* RESERVATION GROUPS */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#1B3F36]">
              Your Bookings
            </h2>

            <p className="mt-1 text-sm text-[#77827B]">
              View the details and status of each reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {filteredGroups.map((group) => {
              const Icon = group.icon;

              return (
                <section
                  key={group.title}
                  className="overflow-hidden rounded-2xl border border-[#E4DED1] bg-white shadow-sm"
                >
                  {/* GROUP HEADER */}
                  <div className="border-b border-[#EEEAE1] p-5">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-3 ${group.background} ${group.color}`}>
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#1B3F36]">
                          {group.title}
                        </h3>

                        <p className="text-sm text-[#89938C]">
                          {group.reservations.length} reservations
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-5 text-[#77827B]">
                      {group.description}
                    </p>
                  </div>

                  {/* GROUP CONTENT */}
                  <div className="p-5">
                    {group.reservations.length === 0 ? (
                      <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F1E6] text-[#89938C]">
                          <CalendarDays size={25} />
                        </div>

                        <h4 className="font-semibold text-[#293A32]">
                          Nothing to show yet
                        </h4>

                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#89938C]">
                          {search
                            ? "No reservations match your search. Try another keyword."
                            : group.emptyMessage}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {group.reservations.map((reservation) => (
                          <article
                            key={reservation.id}
                            className="rounded-xl border border-[#E4DED1] p-4 transition hover:border-[#A8B8AC]"
                          >
                            <h4 className="font-bold text-[#1B3F36]">
                              {reservation.resourceName}
                            </h4>

                            <div className="mt-4 space-y-3 text-sm text-[#77827B]">
                              <p className="flex items-center gap-2">
                                <MapPin size={16} className="shrink-0" />
                                {reservation.location || "Location not provided"}
                              </p>

                              <p className="flex items-center gap-2">
                                <CalendarDays size={16} className="shrink-0" />
                                {reservation.date || "Date not provided"}
                              </p>

                              <p className="flex items-center gap-2">
                                <Clock3 size={16} className="shrink-0" />
                                {reservation.startTime || "--:--"} -{" "}
                                {reservation.endTime || "--:--"}
                              </p>
                            </div>

                            <div className="mt-5 border-t border-[#EEEAE1] pt-4">
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#89938C]">
                                Reservation Status
                              </span>

                              <p className="mt-2 font-semibold text-[#1B3F36]">
                                {reservation.status || group.status}
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
        </section>

      </div>
    </main>
  );
}

export default MyReservationsPage;
