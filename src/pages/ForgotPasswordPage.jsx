
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const { requestPasswordReset, loading } = useAuth();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            await requestPasswordReset(email.trim().toLowerCase());
            setSuccess(true);
        } catch (err) {
            setError(err.message || "Could not process your request.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F5F1E6] px-5 py-12 dark:bg-[#111A17]">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B3F36] text-white">
                        <KeyRound size={27} />
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                        Forgot password?
                    </h1>

                    <p className="mt-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        Enter your email address and we'll send you a password recovery code.
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

                    {success ? (
                        <div className="space-y-5">
                            <div
                                role="status"
                                className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700"
                            >
                                Your password recovery request has been processed. Check your email for the recovery code.
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/reset-password", {
                                    state: { email: email.trim().toLowerCase() },
                                })}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#8B4A33]"
                            >
                                Continue to reset password
                                <ArrowRight size={17} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
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
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setError("");
                                        }}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] py-3 pl-11 pr-4 text-sm text-[#1B3F36] outline-none transition placeholder:text-[#7B857F] focus:border-[#1B3F36] focus:ring-2 focus:ring-[#1B3F36]/10 dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#8B4A33] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Sending request..." : "Send recovery code"}
                                {!loading && <ArrowRight size={17} />}
                            </button>
                        </>
                    )}

                    <p className="mt-6 text-center text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 font-bold text-[#8B4A33] hover:underline"
                        >
                            <ArrowLeft size={15} />
                            Back to sign in
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default ForgotPasswordPage;
