
import {
    MapPin,
    Mail,
    Phone,
    ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#1B3F36] text-[#F5F1E6]">

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

                {/* BRAND */}
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Space<span className="text-[#C18A70]">Sync.</span>
                    </h2>

                    <p className="mt-5 max-w-xs text-sm leading-7 text-[#D1DDD6]">
                        Find, explore, and reserve the perfect spaces.
                        Making resource booking simpler, smarter,
                        and more accessible.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F1E6]">
                        Explore
                    </h3>

                    <ul className="mt-6 space-y-4 text-sm text-[#D1DDD6]">
                        <li>
                            <Link to="/" className="transition hover:text-[#C18A70]">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/explore" className="transition hover:text-[#C18A70]">
                                Explore Spaces
                            </Link>
                        </li>

                        <li>
                            <Link to="/my-reservations" className="transition hover:text-[#C18A70]">
                                My Reservations
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* SUPPORT */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F1E6]">
                        Support
                    </h3>

                    <ul className="mt-6 space-y-4 text-sm text-[#D1DDD6]">
                        <li>
                            <a href="#help" className="transition hover:text-[#C18A70]">
                                Help Center
                            </a>
                        </li>

                        <li>
                            <a href="#faqs" className="transition hover:text-[#C18A70]">
                                FAQs
                            </a>
                        </li>

                        <li>
                            <a href="#privacy" className="transition hover:text-[#C18A70]">
                                Privacy Policy
                            </a>
                        </li>

                        <li>
                            <a href="#terms" className="transition hover:text-[#C18A70]">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5F1E6]">
                        Get in Touch
                    </h3>

                    <ul className="mt-6 space-y-5 text-sm text-[#D1DDD6]">
                        <li className="flex items-center gap-3">
                            <Mail size={17} className="shrink-0 text-[#C18A70]" />
                            <span>support@spacesync.com</span>
                        </li>

                        <li className="flex items-center gap-3">
                            <Phone size={17} className="shrink-0 text-[#C18A70]" />
                            <span>Contact our support team</span>
                        </li>

                        <li className="flex items-center gap-3">
                            <MapPin size={17} className="shrink-0 text-[#C18A70]" />
                            <span>Rwanda</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM FOOTER */}
            <div className="border-t border-[#F5F1E6]/15">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row sm:px-8">

                    <p className="text-xs text-[#B9C5BE]">
                        © {new Date().getFullYear()} SpaceSync. All rights reserved.
                    </p>

                    <a
                        href="#top"
                        className="inline-flex items-center gap-2 text-xs text-[#D1DDD6] transition hover:text-[#C18A70]"
                    >
                        Back to top
                        <ArrowUpRight size={14} />
                    </a>

                </div>
            </div>

        </footer>
    );
}

export default Footer;
