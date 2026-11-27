
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    LogIn,
    ArrowRight,
    CalendarDays,
    Users,
    Star,
    Eye,
    EyeOff,
    Building2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;
    const BACKEND_URL = API_URL?.replace(/\/api\/?$/, "");

    function handleGoogleLogin() {
        if (!BACKEND_URL) {
            setError("Google login is not configured. Please try again later.");
            return;
        }

        window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!formData.email.trim() || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            await login(formData.email, formData.password);
            navigate("/profile");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    }

    const inputClass =
        "w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] py-3.5 pl-11 pr-12 text-sm text-[#1B3F36] outline-none transition-all duration-300 placeholder:text-[#7B857F] focus:border-[#1B3F36] focus:ring-4 focus:ring-[#1B3F36]/10 dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]";

    return (
        <main className="min-h-screen bg-[#F5F1E6] p-3 dark:bg-[#111A17] sm:p-5 lg:p-8">
            <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-[1500px] overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-[#1A2923] lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">

                {/* LEFT: STUDY SPACE IMAGE */}
                <section className="relative flex min-h-[350px] flex-col justify-between overflow-hidden bg-[#1B3F36] p-7 text-white sm:p-10 lg:min-h-[750px] lg:p-12">

                    <img
                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85"
                        alt="Students and professionals collaborating in a modern workspace"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#102820]/95 via-[#1B3F36]/75 to-[#102820]/45" />

                    {/* Decorative shapes */}
                    <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border border-white/10" />
                    <div className="absolute -right-12 top-36 h-52 w-52 rounded-full border border-white/10" />

                    {/* Branding */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                            <Building2 size={27} />
                        </div>

                        <span className="text-2xl font-extrabold tracking-tight">
                            Space<span className="text-[#D69A70]">Sync</span>
                        </span>
                    </div>

                    {/* Welcome content */}
                    <div className="relative z-10 my-12 max-w-xl">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#E8C5A8] backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-[#D69A70]" />
                            FIND YOUR PERFECT SPACE
                        </span>

                        <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Welcome back
                            <span className="mt-2 block text-[#D69A70]">
                                to SpaceSync.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-7 text-white/85 sm:text-lg">
                            Discover inspiring places to study, work,
                            collaborate, and create meaningful memories.
                        </p>

                        {/* Features */}
                        <div className="mt-10 flex flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
                                    <CalendarDays size={21} />
                                </div>
                                <span className="text-sm font-semibold">
                                    Book spaces
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
                                    <Users size={21} />
                                </div>
                                <span className="text-sm font-semibold">
                                    Connect
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
                                    <Star size={21} />
                                </div>
                                <span className="text-sm font-semibold">
                                    Create memories
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom tagline */}
                    <div className="relative z-10 border-t border-white/20 pt-6">
                        <p className="font-serif text-2xl italic text-[#E8C5A8] sm:text-3xl">
                            Your space. Your time.
                        </p>
                        <p className="mt-2 text-xs tracking-wide text-white/60">
                            SPACE TO CONNECT. ROOM TO GROW.
                        </p>
                    </div>
                </section>

                {/* RIGHT: LOGIN FORM */}
                <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20">

                    <div className="w-full max-w-md">

                        {/* Form heading */}
                        <div className="mb-9 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B3F36] text-white shadow-lg shadow-[#1B3F36]/20">
                                <LogIn size={29} />
                            </div>

                            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6] sm:text-4xl">
                                Welcome back
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
                                Sign in to continue exploring spaces
                                with SpaceSync.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Error message */}
                            {error && (
                                <div
                                    role="alert"
                                    className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                                >
                                    Email address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4A33]"
                                    />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4A33]"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className={inputClass}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((previous) => !previous)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B857F] transition hover:text-[#1B3F36]"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot password */}
                            <div className="mb-7 text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-semibold text-[#8B4A33] transition hover:text-[#1B3F36] hover:underline dark:hover:text-[#D69A70]"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign in */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#1B3F36]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B4A33] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}

                                {!loading && (
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                )}
                            </button>

                            {/* Divider */}
                            <div className="my-7 flex items-center gap-4">
                                <div className="h-px flex-1 bg-[#1B3F36]/15 dark:bg-white/10" />

                                <span className="text-xs font-semibold tracking-wide text-[#7B857F]">
                                    OR CONTINUE WITH
                                </span>

                                <div className="h-px flex-1 bg-[#1B3F36]/15 dark:bg-white/10" />
                            </div>

                            {/* Google login */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#1B3F36]/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#1B3F36] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B3F36]/40 hover:bg-[#F5F1E6] dark:border-white/15 dark:bg-[#20332B] dark:text-[#F5F1E6] dark:hover:bg-[#263C33]"
                            >
                                <span className="text-xl font-extrabold text-[#4285F4]">
                                    G
                                </span>

                                Continue with Google
                            </button>

                            {/* Register link */}
                            <p className="mt-8 text-center text-sm text-[#59665F] dark:text-[#B9C5BE]">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-bold text-[#8B4A33] transition hover:underline"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </form>

                        <p className="mt-10 text-center text-xs text-[#8A948D]">
                            © {new Date().getFullYear()} SpaceSync. All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default LoginPage;
