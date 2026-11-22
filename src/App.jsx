
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  Clock3,
  Users,
} from "lucide-react";

import Navbar from "./components/Navbar";

function ResourceListPage() {
  const features = [
    {
      icon: Building2,
      title: "Discover spaces",
      description:
        "Explore study rooms, meeting spaces, restaurants and event venues in one place.",
    },
    {
      icon: CalendarCheck,
      title: "Book with ease",
      description:
        "Choose your preferred date and time and manage your reservations effortlessly.",
    },
    {
      icon: Clock3,
      title: "Stay informed",
      description:
        "Keep track of availability, booking updates and reservation changes.",
    },
  ];

  return (
    <main className="bg-surface-canvas text-text-primary">

      {/* HERO */}
      <section className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">

        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
              One platform. Every space.
            </span>
          </div>

          <h2 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            Find your space.
            <span className="block text-text-secondary">
              Make it yours.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
            A smarter way to discover, reserve and manage resources.
            From campus study rooms to professional meeting spaces,
            SpaceSync brings everything together.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-lg bg-brand-primary px-7 py-4 text-sm font-semibold text-white transition hover:bg-brand-hover dark:text-black"
            >
              Explore spaces
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg border border-border px-7 py-4 text-sm font-semibold text-text-primary transition hover:bg-surface-muted"
            >
              My reservations
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-10 border-t border-border pt-8">
            <div>
              <p className="text-3xl font-bold">06</p>
              <p className="mt-1 text-xs text-text-secondary">
                Industry categories
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="mt-1 text-xs text-text-secondary">
                Booking access
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">01</p>
              <p className="mt-1 text-xs text-text-secondary">
                Unified platform
              </p>
            </div>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="relative">
          <div className="rounded-2xl border border-border bg-surface-muted p-5 md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  YOUR SPACE, YOUR SCHEDULE
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  Booking overview
                </h3>
              </div>

              <div className="rounded-xl bg-brand-primary p-3 text-white dark:text-black">
                <CalendarCheck size={22} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-surface-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    NEXT RESERVATION
                  </span>
                  <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
                    Upcoming
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold">
                  Creative Study Room
                </h4>

                <p className="mt-2 text-sm text-text-secondary">
                  Monday · 10:00 AM – 12:00 PM
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-surface-card p-5">
                  <Users size={21} className="text-text-secondary" />
                  <p className="mt-4 text-2xl font-bold">06</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Space categories
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface-card p-5">
                  <Clock3 size={21} className="text-text-secondary" />
                  <p className="mt-4 text-2xl font-bold">Easy</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Time management
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 -top-4 rounded-xl border border-border bg-surface-card p-4 shadow-lg md:-right-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
              <span className="text-xs font-semibold">
                Simplify your bookings
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                Built for convenience
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need.
                <span className="block text-text-secondary">
                  All in one place.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-text-secondary">
              Spend less time coordinating resources and more time
              focusing on what matters.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-xl border border-border bg-surface-card p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-surface-muted p-3">
                      <Icon size={23} />
                    </div>

                    <span className="text-sm text-text-secondary">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">
                    {feature.description}
                  </p>

                  <ArrowUpRight
                    size={20}
                    className="mt-7 text-text-secondary transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

function PlaceholderPage({ title }) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-20 lg:px-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-text-secondary">
        This section is coming soon.
      </p>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("spacesync-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("spacesync-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-canvas text-text-primary transition-colors duration-200">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <Routes>
          <Route path="/" element={<ResourceListPage />} />

          <Route
            path="/my-reservations"
            element={<PlaceholderPage title="My Reservations" />}
          />

          <Route
            path="/admin"
            element={<PlaceholderPage title="Admin Dashboard" />}
          />

          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
