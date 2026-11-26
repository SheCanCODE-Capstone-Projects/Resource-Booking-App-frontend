
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    registerUser,
    loginUser,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    changePassword,
} from "../api/authApi";

const AuthContext = createContext(null);

const STORAGE_KEY = "spacesync-auth-user";
const TOKEN_KEY = "spacesync-auth-token";

export function AuthProvider({ children }) {
    // Restore the saved user session.
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem(STORAGE_KEY);
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Could not restore user session:", error);
            return null;
        }
    });

    const [loading, setLoading] = useState(false);

    // Save the current user session.
    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(user)
                );
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error("Could not save user session:", error);
        }
    }, [user]);

    // Register a new account.
    async function register(name, email, password) {
        setLoading(true);

        try {
            if (!name?.trim() || !email?.trim() || !password) {
                throw new Error("Please complete all required fields.");
            }

            const nameParts = name.trim().split(/\s+/);
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ");

            const result = await registerUser({
                firstName,
                lastName,
                email: email.trim().toLowerCase(),
                password,
            });

            // Registration does not automatically log the user in.
            return result;
        } finally {
            setLoading(false);
        }
    }

    // Login using real backend credentials.
    async function login(email, password) {
        setLoading(true);

        try {
            if (!email?.trim() || !password) {
                throw new Error("Email and password are required.");
            }

            const normalizedEmail = email.trim().toLowerCase();

            const result = await loginUser(
                normalizedEmail,
                password
            );

            if (!result?.token || !result?.userId) {
                throw new Error(
                    "Login response did not contain the required user ID and token."
                );
            }

            const loggedInUser = {
                id: result.userId,
                name: normalizedEmail.split("@")[0],
                email: normalizedEmail,
                role: "user",
            };

            localStorage.setItem(TOKEN_KEY, result.token);
            setUser(loggedInUser);

            return loggedInUser;
        } finally {
            setLoading(false);
        }
    }

    // Verify a registered email.
    async function confirmEmail(email, otp) {
        return verifyEmail(email, otp);
    }

    // Request a new verification OTP.
    async function requestVerification(email) {
        return resendVerification(email);
    }

    // Request a password recovery OTP.
    async function requestPasswordReset(email) {
        return forgotPassword(email);
    }

    // Reset a forgotten password.
    async function completePasswordReset(email, token, newPassword) {
        return resetPassword(email, token, newPassword);
    }

    // Change the password of the authenticated user.
    async function updatePassword(currentPassword, newPassword) {
        return changePassword(currentPassword, newPassword);
    }

    // Logout.
    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    }

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        confirmEmail,
        requestVerification,
        requestPasswordReset,
        completePasswordReset,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Access authentication from any component.
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider."
        );
    }

    return context;
}

export default AuthContext;
