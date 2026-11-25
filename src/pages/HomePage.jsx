
import { Link } from "react-router-dom";

import {
    ArrowRight,
    BookOpen,
    Building2,
    CalendarCheck,
    CheckCircle2,
    Coffee,
    Laptop,
    MapPin,
    Users,
    Bell,
    Search,
    CalendarDays,
    Clock3,
    Bookmark,
    Home,
    UserRound,
} from "lucide-react";

/* SPACESYNC BRAND IDENTITY */
const LOGO_SRC = "/images/logo.png";

const BRAND = {
    green: "#1B3F36",
    rust: "#8B4A33",
    cream: "#F5F1E6",
};

const resourceTypes = [
    {
        title: "Study Rooms",
        description: "Find quiet and collaborative spaces for focused learning.",
        icon: BookOpen,
        image: "/images/study.jpg",
    },
    {
        title: "Libraries",
        description: "Discover reading areas and research spaces.",
        icon: Building2,
        image: "/images/libraries.jpg",
    },
    {
        title: "Meeting Spaces",
        description: "Book professional spaces for meetings and discussions.",
        icon: Users,
        image: "/images/meeting.jpg",
    },
    {
        title: "Restaurants",
        description: "Find private dining spaces for your gatherings.",
        icon: Coffee,
        image: "/images/Restaurant.jpg",
    },
    {
        title: "Coworking Spaces",
        description: "Work, connect and collaborate in inspiring environments.",
        icon: Laptop,
        image: "/images/working.jpg",
    },
    {
        title: "Event Gardens",
        description: "Discover outdoor venues for memorable occasions.",
        icon: MapPin,
        image: "/images/event.jpg",
    },
];

const steps = [
    {
        number: "01",
        title: "Discover a space",
        description:
            "Explore different resources and find the space that suits your needs.",
        icon: Building2,
    },
    {
        number: "02",
        title: "Choose your time",
        description:
            "Check available time slots and select a suitable booking period.",
        icon: CalendarCheck,
    },
    {
        number: "03",
        title: "Confirm your booking",
        description:
            "Submit your reservation and manage it from your account.",
        icon: CheckCircle2,
    },
];

function HomePage() {
    return (
        <main className="overflow-hidden">

            {/* HERO SECTION */}
            <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:py-24 lg:grid-cols-2 lg:px-8">

                {/* HERO CONTENT */}
                <div>
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8B4A33]/40 px-4 py-2 text-xs font-semibold text-[#8B4A33]">
                        <span className="h-2 w-2 rounded-full bg-[#8B4A33]" />
                        YOUR SPACE. YOUR TIME.
                    </div>

                    <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl lg:text-7xl">
                        Find your space.
                        <span className="block text-[#8B4A33]">
                            Make it happen.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                        Discover and book the right spaces for studying,
                        working, meeting and creating memorable experiences.
                        Everything you need, in one place.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link
                            to="/explore"
                            className="inline-flex items-center gap-3 rounded-lg bg-[#1B3F36] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#14302A]"
                        >
                            Explore spaces
                            <ArrowRight size={18} />
                        </Link>

                        <a
                            href="#how-it-works"
                            className="inline-flex items-center rounded-lg border border-[#1B3F36] px-7 py-4 text-sm font-semibold text-[#1B3F36] transition hover:bg-[#F5F1E6] dark:border-[#F5F1E6] dark:text-[#F5F1E6] dark:hover:bg-white/10"
                        >
                            How it works
                        </a>
                    </div>

                    {/* PLATFORM HIGHLIGHTS */}
                    <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-7">
                        <div>
                            <p className="text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                6+
                            </p>
                            <p className="mt-1 text-xs text-text-secondary">
                                Resource categories
                            </p>
                        </div>

                        <div className="h-10 w-px bg-border" />

                        <div>
                            <p className="text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                One
                            </p>
                            <p className="mt-1 text-xs text-text-secondary">
                                Booking platform
                            </p>
                        </div>

                        <div className="h-10 w-px bg-border" />

                        <div>
                            <p className="text-2xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                                Your
                            </p>
                            <p className="mt-1 text-xs text-text-secondary">
                                Time and convenience
                            </p>
                        </div>
                    </div>
                </div>

                {/* HERO IMAGE */}
                <div className="relative">
                    <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border shadow-xl md:h-[540px]">
                        <img
                            src="/images/hero.jpg"
                            alt="Modern, bright collaborative workspace"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3F36]/85 via-black/10 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F1E6]/80">
                                Spaces made simple
                            </p>

                            <h2 className="mt-3 max-w-md text-3xl font-bold leading-tight md:text-4xl">
                                A better space for every idea.
                            </h2>

                            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                                Study, work, connect and create in spaces designed around you.
                            </p>

                            <Link
                                to="/explore"
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#F5F1E6] px-5 py-3 text-sm font-bold text-[#1B3F36] transition hover:bg-white"
                            >
                                Discover spaces
                                <ArrowRight size={17} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESOURCE CATEGORIES */}
            <section className="border-y border-border bg-surface-muted">
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#8B4A33]">
                            Explore possibilities
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                            One platform.
                            <span className="block text-[#8B4A33]">
                                Different spaces for every need.
                            </span>
                        </h2>

                        <p className="mt-4 leading-7 text-text-secondary">
                            From quiet study rooms to professional meeting spaces,
                            discover resources that fit your plans.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resourceTypes.map((resource) => {
                            const Icon = resource.icon;

                            return (
                                <Link
                                    key={resource.title}
                                    to="/explore"
                                    className="group overflow-hidden rounded-2xl border border-border bg-surface-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={resource.image}
                                            alt={resource.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B3F36]/70 to-transparent" />

                                        <div className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F1E6] text-[#1B3F36]">
                                            <Icon size={22} />
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-text-primary">
                                            {resource.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-text-secondary">
                                            {resource.description}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#8B4A33]">
                                            Explore category
                                            <ArrowRight
                                                size={16}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                id="how-it-works"
                className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
            >
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8B4A33]">
                        Simple process
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                        Booking made simple.
                    </h2>

                    <p className="mt-4 leading-7 text-text-secondary">
                        Finding and reserving the right space shouldn't be
                        complicated. SpaceSync makes it easier.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 md:grid-cols-3">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.number}>
                                <div className="flex items-center justify-between">
                                    <span className="text-4xl font-bold tracking-tight text-[#8B4A33] opacity-50">
                                        {step.number}
                                    </span>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B3F36] text-[#F5F1E6]">
                                        <Icon size={23} />
                                    </div>
                                </div>

                                <h3 className="mt-7 text-xl font-bold text-text-primary">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-text-secondary">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="mx-5 mb-16 overflow-hidden rounded-3xl bg-[#1B3F36] px-6 py-14 text-white md:mx-8 md:px-12 lg:px-16">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

                    {/* CTA CONTENT */}
                    <div className="max-w-xl">

                        {/* SMALL BRAND LOGO */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#F5F1E6] p-1">
                                <img
                                    src={LOGO_SRC}
                                    alt="SpaceSync logo"
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1E6]/80">
                                Your space is waiting
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                            Ready to find your space?
                        </h2>

                        <p className="mt-5 max-w-lg leading-7 text-[#F5F1E6]/75">
                            Discover amazing spaces, check availability and manage
                            your reservations — all from one simple platform.
                        </p>

                        <Link
                            to="/explore"
                            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#F5F1E6] px-7 py-4 text-sm font-bold text-[#1B3F36] transition hover:bg-white"
                        >
                            Explore spaces
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* PHONE MOCKUP */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-[270px] rotate-2 rounded-[2.8rem] border-[7px] border-black bg-neutral-950 p-2 shadow-2xl transition duration-500 hover:rotate-0">

                            <div className="overflow-hidden rounded-[2.2rem] bg-[#F5F1E6] text-neutral-900">

                                {/* STATUS BAR */}
                                <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-bold">
                                    <span>9:41</span>
                                    <div className="h-4 w-20 rounded-full bg-neutral-950" />
                                    <span>100%</span>
                                </div>

                                {/* DASHBOARD HEADER */}
                                <div className="px-4 pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={LOGO_SRC}
                                                alt="SpaceSync logo"
                                                className="h-10 w-10 object-contain"
                                            />

                                            <div>
                                                <p className="text-xs text-[#8B4A33]">
                                                    Welcome back
                                                </p>

                                                <h3 className="mt-0.5 text-lg font-bold text-[#1B3F36]">
                                                    Your bookings
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white">
                                            <Bell size={17} className="text-[#1B3F36]" />
                                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#8B4A33]" />
                                        </div>
                                    </div>

                                    {/* SEARCH */}
                                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-white px-3 py-3">
                                        <Search size={15} className="text-[#8B4A33]" />
                                        <span className="text-[10px] text-neutral-500">
                                            Search for a space...
                                        </span>
                                    </div>

                                    {/* UPCOMING BOOKING */}
                                    <div className="mt-5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold text-[#1B3F36]">
                                                Upcoming reservation
                                            </p>

                                            <span className="rounded-full bg-[#1B3F36] px-2 py-1 text-[9px] font-semibold text-[#F5F1E6]">
                                                Confirmed
                                            </span>
                                        </div>

                                        <div className="mt-3 overflow-hidden rounded-xl border border-[#8B4A33]/30 bg-white">
                                            <img
                                                src="/images/study.jpg"
                                                alt="Study room reservation"
                                                className="h-28 w-full object-cover"
                                            />

                                            <div className="p-3">
                                                <h4 className="text-sm font-bold text-[#1B3F36]">
                                                    Study Room A1
                                                </h4>

                                                <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-500">
                                                    <CalendarDays size={13} className="text-[#8B4A33]" />
                                                    <span>Today · 2:00 PM</span>
                                                </div>

                                                <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-500">
                                                    <Clock3 size={13} className="text-[#8B4A33]" />
                                                    <span>2 hours</span>
                                                </div>

                                                <div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-500">
                                                    <MapPin size={13} className="text-[#8B4A33]" />
                                                    <span>Kigali, Rwanda</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* QUICK ACTIONS */}
                                    <div className="mt-5">
                                        <p className="text-xs font-bold text-[#1B3F36]">
                                            Quick actions
                                        </p>

                                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                                            <div className="rounded-xl bg-[#1B3F36] p-3 text-[#F5F1E6]">
                                                <CalendarCheck size={18} className="mx-auto" />
                                                <p className="mt-2 text-[9px] font-semibold">
                                                    Book
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-white p-3 text-[#8B4A33]">
                                                <Bookmark size={18} className="mx-auto" />
                                                <p className="mt-2 text-[9px] font-semibold">
                                                    Saved
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-white p-3 text-[#8B4A33]">
                                                <UserRound size={18} className="mx-auto" />
                                                <p className="mt-2 text-[9px] font-semibold">
                                                    Profile
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* PHONE BOTTOM NAVIGATION */}
                                <div className="mt-6 flex justify-around border-t border-[#8B4A33]/20 px-3 py-4 text-[#1B3F36]">
                                    <Home size={17} />
                                    <Search size={17} className="text-[#8B4A33]" />
                                    <CalendarDays size={17} className="text-[#8B4A33]" />
                                    <UserRound size={17} className="text-[#8B4A33]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default HomePage;
