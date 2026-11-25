
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "spacesync-auth-user";

export function AuthProvider({ children }) {
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

    // Demo login.
    async function login(email, password) {
        setLoading(true);

        try {
            if (!email?.trim() || !password) {
                throw new Error("Email and password are required.");
            }

            const normalizedEmail = email.trim().toLowerCase();

            const loggedInUser = {
                id: normalizedEmail,
                name: normalizedEmail.split("@")[0],
                email: normalizedEmail,
                role: "user",
            };

            setUser(loggedInUser);

            return loggedInUser;
        } finally {
            setLoading(false);
        }
    }

    // Demo registration.
    async function register(name, email, password) {
        setLoading(true);

        try {
            if (!name?.trim() || !email?.trim() || !password) {
                throw new Error("Please complete all required fields.");
            }

            if (password.length < 8) {
                throw new Error(
                    "Password must contain at least 8 characters."
                );
            }

            const newUser = {
                id: email.trim().toLowerCase(),
                name: name.trim(),
                email: email.trim().toLowerCase(),
                role: "user",
            };

            setUser(newUser);

            return newUser;
        } finally {
            setLoading(false);
        }
    }

    // Logout.
    function logout() {
        setUser(null);
    }

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
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
