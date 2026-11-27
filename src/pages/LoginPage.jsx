
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    LogIn,
    ArrowRight,
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
        "w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] py-3 pl-11 pr-4 text-sm text-[#1B3F36] outline-none transition placeholder:text-[#7B857F] focus:border-[#1B3F36] focus:ring-2 focus:ring-[#1B3F36]/10 dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]";

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F5F1E6] px-5 py-12 dark:bg-[#111A17]">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B3F36] text-white">
                        <LogIn size={27} />
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        Sign in to continue exploring spaces with SpaceSync.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-[#1B3F36]/10 bg-white p-7 shadow-lg dark:border-white/10 dark:bg-[#1A2923] sm:p-9"
                >
                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            Email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
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

                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4A33]"
                            />

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="mb-6 text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm font-semibold text-[#8B4A33] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#8B4A33] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                        {!loading && <ArrowRight size={17} />}
                    </button>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-[#1B3F36]/15 dark:bg-white/10" />
                        <span className="text-xs font-medium text-[#7B857F]">
                            OR CONTINUE WITH
                        </span>
                        <div className="h-px flex-1 bg-[#1B3F36]/15 dark:bg-white/10" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#1B3F36]/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#1B3F36] transition hover:bg-[#F5F1E6] dark:border-white/15 dark:bg-[#20332B] dark:text-[#F5F1E6] dark:hover:bg-[#263C33]"
                    >
                        <span className="text-lg font-bold text-[#4285F4]">
                            G
                        </span>
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-bold text-[#8B4A33] hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default LoginPage;
