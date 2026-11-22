
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-neutral-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* BRAND */}
                    <div>
                        <Link to="/" className="inline-block text-2xl font-bold tracking-tight">
                            SpaceSync<span className="text-neutral-500">.</span>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-neutral-400">
                            Find, explore and reserve the right spaces.
                            Making resource booking simpler, smarter and more convenient.
                        </p>

                        <Link
                            to="/explore"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-neutral-300"
                        >
                            Explore spaces
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            Quick links
                        </h3>

                        <ul className="mt-6 space-y-4 text-sm text-neutral-400">
                            <li>
                                <Link to="/" className="transition hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/explore" className="transition hover:text-white">
                                    Explore Spaces
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-reservations" className="transition hover:text-white">
                                    My Reservations
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="transition hover:text-white">
                                    My Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RESOURCES */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            Discover spaces
                        </h3>

                        <ul className="mt-6 space-y-4 text-sm text-neutral-400">
                            {[
                                "Study Rooms",
                                "Libraries",
                                "Meeting Spaces",
                                "Restaurants",
                                "Coworking Spaces",
                                "Event Gardens",
                            ].map((category) => (
                                <li key={category}>
                                    <Link
                                        to="/explore"
                                        className="transition hover:text-white"
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            Get started
                        </h3>

                        <p className="mt-6 text-sm leading-7 text-neutral-400">
                            Ready to find a space that works for you?
                            Start exploring with SpaceSync.
                        </p>

                        <Link
                            to="/explore"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-neutral-200"
                        >
                            Find a space
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* BOTTOM FOOTER */}
                <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800 pt-7 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} SpaceSync. All rights reserved.
                    </p>

                    <p>
                        Designed to make space booking simple.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
