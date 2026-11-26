
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    UserPlus,
    User,
    Mail,
    Lock,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
    const navigate = useNavigate();

    const {
        register,
        confirmEmail,
        requestVerification,
        loading,
    } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState("");
    const [verificationStep, setVerificationStep] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        setSuccess("");

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please complete all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register(
                formData.name,
                formData.email,
                formData.password
            );

            setVerificationStep(true);
            setSuccess(
                "Account created! Check your email for the six-digit verification code."
            );
        } catch (err) {
            setError(err.message || "Registration failed.");
        }
    }

    async function handleVerifyEmail(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!/^\d{6}$/.test(otp)) {
            setError("Please enter a valid six-digit OTP.");
            return;
        }

        try {
            await confirmEmail(
                formData.email.trim().toLowerCase(),
                otp
            );

            setSuccess("Email verified successfully! You can now sign in.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(err.message || "Email verification failed.");
        }
    }

    async function handleResendOtp() {
        setError("");
        setSuccess("");

        try {
            await requestVerification(
                formData.email.trim().toLowerCase()
            );

            setSuccess("A new verification code has been requested. Check your email.");
        } catch (err) {
            setError(err.message || "Could not resend verification code.");
        }
    }

    const inputClass =
        "w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] py-3 pl-11 pr-4 text-sm text-[#1B3F36] outline-none transition placeholder:text-[#7B857F] focus:border-[#1B3F36] focus:ring-2 focus:ring-[#1B3F36]/10 dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]";

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F5F1E6] px-5 py-12 dark:bg-[#111A17]">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B3F36] text-white">
                        {verificationStep ? (
                            <ShieldCheck size={27} />
                        ) : (
                            <UserPlus size={27} />
                        )}
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-[#1B3F36] dark:text-[#F5F1E6]">
                        {verificationStep
                            ? "Verify your email"
                            : "Create your account"}
                    </h1>

                    <p className="mt-2 text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        {verificationStep
                            ? `Enter the six-digit code sent to ${formData.email}.`
                            : "Join SpaceSync and discover spaces that work for you."}
                    </p>
                </div>

                <form
                    onSubmit={
                        verificationStep
                            ? handleVerifyEmail
                            : handleSubmit
                    }
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

                    {success && (
                        <div
                            role="status"
                            className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                        >
                            {success}
                        </div>
                    )}

                    {!verificationStep ? (
                        <>
                            <div className="mb-5">
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                                >
                                    Full name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4A33]"
                                    />

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        autoComplete="name"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

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

                            <div className="mb-5">
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
                                        placeholder="At least 8 characters"
                                        autoComplete="new-password"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4A33]"
                                    />

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mb-6">
                            <label
                                htmlFor="otp"
                                className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                            >
                                Six-digit verification code
                            </label>

                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                required
                                value={otp}
                                onChange={(event) => {
                                    setOtp(
                                        event.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    );
                                    setError("");
                                }}
                                placeholder="Enter your OTP"
                                className="w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#1B3F36] outline-none focus:border-[#1B3F36] dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]"
                            />

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading}
                                className="mt-4 text-sm font-bold text-[#8B4A33] hover:underline disabled:opacity-50"
                            >
                                Resend verification code
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#8B4A33] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Please wait..."
                            : verificationStep
                                ? "Verify email"
                                : "Create account"}

                        {!loading && <ArrowRight size={17} />}
                    </button>

                    <p className="mt-6 text-center text-sm text-[#59665F] dark:text-[#B9C5BE]">
                        {verificationStep ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setVerificationStep(false);
                                    setOtp("");
                                    setError("");
                                    setSuccess("");
                                }}
                                className="font-bold text-[#8B4A33] hover:underline"
                            >
                                Back to registration
                            </button>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-bold text-[#8B4A33] hover:underline"
                                >
                                    Sign in
                                </Link>
                            </>
                        )}
                    </p>
                </form>

                <p className="mt-6 text-center text-xs text-[#7B857F] dark:text-[#B9C5BE]">
                    By joining SpaceSync, you agree to use the platform responsibly.
                </p>
            </div>
        </main>
    );
}

export default RegisterPage;
