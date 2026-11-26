
import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import HomePage from "./pages/HomePage";
import ResourceListPage from "./pages/ResourceListPage";
import ResourceDetailPage from "./pages/ResourceDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MyWaitlistPage from "./pages/MyWaitlistPage";

function PlaceholderPage({ title }) {
    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-20 lg:px-8">
            <h1 className="text-4xl font-bold text-text-primary">
                {title}
            </h1>

            <p className="mt-4 text-text-secondary">
                This section is coming soon.
            </p>
        </main>
    );
}

function AppLayout({ theme, onToggleTheme }) {
    const location = useLocation();

    const isAuthPage = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
    ].includes(location.pathname);

    return (
        <div className="flex min-h-screen flex-col bg-surface-canvas text-text-primary transition-colors duration-200">

            {!isAuthPage && (
                <Navbar
                    theme={theme}
                    onToggleTheme={onToggleTheme}
                />
            )}

            <div className="flex-1">
                <Routes>

                    {/* PUBLIC ROUTES */}

                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/explore"
                        element={<ResourceListPage />}
                    />

                    <Route
                        path="/resources/:id"
                        element={<ResourceDetailPage />}
                    />

                    {/* AUTHENTICATION ROUTES */}

                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />

                    <Route
                        path="/reset-password"
                        element={<ResetPasswordPage />}
                    />

                    {/* PROTECTED USER ROUTES */}

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />

                        <Route
                            path="/my-reservations"
                            element={
                                <PlaceholderPage title="My Reservations" />
                            }
                        />

                        <Route
                            path="/my-waitlist"
                            element={<MyWaitlistPage />}
                        />
                    </Route>

                    {/* ADMIN-ONLY ROUTE */}

                    <Route element={<AdminRoute />}>
                        <Route
                            path="/admin-preview"
                            element={<AdminDashboardPage />}
                        />
                    </Route>

                    {/* PAGE NOT FOUND */}

                    <Route
                        path="*"
                        element={
                            <PlaceholderPage title="Page Not Found" />
                        }
                    />

                </Routes>
            </div>

            {!isAuthPage && <Footer />}
        </div>
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
        <AuthProvider>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AppLayout
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
