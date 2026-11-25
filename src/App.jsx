
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ResourceDetailPage from "./pages/ResourceDetailPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ResourceListPage from "./pages/ResourceListPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Footer from "./components/Footer";
import MyReservationsPage from "./pages/MyReservationsPage";

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
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="flex min-h-screen flex-col bg-surface-canvas text-text-primary transition-colors duration-200">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/explore" element={<ResourceListPage />} />

            <Route
              path="/resources/:id"
              element={<ResourceDetailPage />}
            />

            <Route
              
  path="/my-reservations"
  element={<MyReservationsPage />}
/>

            <Route
              path="/login"
              element={<PlaceholderPage title="Login" />}
            />

            {/* TEMPORARY LOCAL TEST ROUTE */}
            <Route
              path="/admin-preview"
              element={<AdminDashboardPage />}
            />

            {/* /admin and unknown routes show Page Not Found */}
            <Route
              path="*"
              element={<PlaceholderPage title="Page Not Found" />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
