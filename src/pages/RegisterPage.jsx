
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    UserPlus,
    User,
    Mail,
    Lock,
    ArrowRight,
    ShieldCheck,
    Building2,
    CalendarDays,
    Users,
    Star,
    Eye,
    EyeOff,
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

            setSuccess(
                "A new verification code has been requested. Check your email."
            );
        } catch (err) {
            setError(err.message || "Could not resend verification code.");
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

                    <div className="absolute inset-0 bg-gradient-to-br from-[#102820]/95 via-[#1B3F36]/75 to-[#102820]/45" />

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
                            YOUR NEXT SPACE STARTS HERE
                        </span>

                        <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Find your place.
                            <span className="mt-2 block text-[#D69A70]">
                                Make it yours.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-7 text-white/85 sm:text-lg">
                            Create your SpaceSync account and discover
                            inspiring places to study, work, connect,
                            and bring your ideas to life.
                        </p>

                        {/* Features */}
                        <div className="mt-10 flex flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
                                    <CalendarDays size={21} />
                                </div>
                                <span className="text-sm font-semibold">
                                    Easy booking
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
                                    <Users size={21} />
                                </div>
                                <span className="text-sm font-semibold">
                                    Great spaces
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
                                    <Star size={21} />
                                </div>
                                <span className="text-sm font-semibold">
                                    New experiences
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

                {/* RIGHT: REGISTRATION FORM */}
                <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20">

                    <div className="w-full max-w-md">

                        {/* Form heading */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B3F36] text-white shadow-lg shadow-[#1B3F36]/20">
                                {verificationStep ? (
                                    <ShieldCheck size={29} />
                                ) : (
                                    <UserPlus size={29} />
                                )}
                            </div>

                            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#1B3F36] dark:text-[#F5F1E6] sm:text-4xl">
                                {verificationStep
                                    ? "Verify your email"
                                    : "Create your account"}
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-[#59665F] dark:text-[#B9C5BE]">
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
                        >

                            {/* Error message */}
                            {error && (
                                <div
                                    role="alert"
                                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </div>
                            )}

                            {/* Success message */}
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
                                    {/* Full name */}
                                    <div className="mb-5">
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                                        >
                                            Full name
                                        </label>

                                        <div className="relative">
                                            <User
                                                size={19}
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
                                    <div className="mb-5">
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
                                                placeholder="At least 8 characters"
                                                autoComplete="new-password"
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
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B857F] hover:text-[#1B3F36]"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={19} />
                                                ) : (
                                                    <Eye size={19} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm password */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="mb-2 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
                                        >
                                            Confirm password
                                        </label>

                                        <div className="relative">
                                            <Lock
                                                size={19}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4A33]"
                                            />

                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Confirm your password"
                                                autoComplete="new-password"
                                                className={inputClass}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword((previous) => !previous)
                                                }
                                                aria-label={
                                                    showConfirmPassword
                                                        ? "Hide confirm password"
                                                        : "Show confirm password"
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B857F] hover:text-[#1B3F36]"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={19} />
                                                ) : (
                                                    <Eye size={19} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Email verification */
                                <div className="mb-6">
                                    <label
                                        htmlFor="otp"
                                        className="mb-3 block text-sm font-semibold text-[#1B3F36] dark:text-[#F5F1E6]"
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
                                        placeholder="000000"
                                        className="w-full rounded-xl border border-[#1B3F36]/15 bg-[#F5F1E6] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#1B3F36] outline-none transition focus:border-[#1B3F36] focus:ring-4 focus:ring-[#1B3F36]/10 dark:border-white/10 dark:bg-[#20332B] dark:text-[#F5F1E6]"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={loading}
                                        className="mt-4 text-sm font-bold text-[#8B4A33] transition hover:underline disabled:opacity-50"
                                    >
                                        Resend verification code
                                    </button>
                                </div>
                            )}

                            {/* Main action */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#1B3F36] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#1B3F36]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B4A33] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Please wait..."
                                    : verificationStep
                                        ? "Verify email"
                                        : "Create account"}

                                {!loading && (
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                )}
                            </button>

                            {/* Bottom navigation */}
                            <p className="mt-7 text-center text-sm text-[#59665F] dark:text-[#B9C5BE]">
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
                                            className="font-bold text-[#8B4A33] transition hover:underline"
                                        >
                                            Sign in
                                        </Link>
                                    </>
                                )}
                            </p>
                        </form>

                        <p className="mt-8 text-center text-xs leading-5 text-[#8A948D]">
                            By joining SpaceSync, you agree to use
                            the platform responsibly.
                        </p>

                        <p className="mt-5 text-center text-xs text-[#8A948D]">
                            © {new Date().getFullYear()} SpaceSync. All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default RegisterPage;
