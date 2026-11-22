
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ResourceListPage from "./pages/ResourceListPage";

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
    <BrowserRouter>
      <div className="min-h-screen bg-surface-canvas text-text-primary transition-colors duration-200">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <Routes>
          <Route
            path="/"
            element={<ResourceListPage />}
          />

          <Route
            path="/my-reservations"
            element={<PlaceholderPage title="My Reservations" />}
          />

          <Route
            path="/admin"
            element={<PlaceholderPage title="Admin Dashboard" />}
          />

          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
