"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    // Check for theme in localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    // Set initial theme
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);

    // Make sure the HTML class matches
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle toggle action
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Update DOM
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preference
    localStorage.setItem("theme", newTheme);

    // Update state
    setTheme(newTheme);
  };

  // Don't render anything meaningful until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
