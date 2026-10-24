import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(void 0);
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("light");
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }
      localStorage.setItem("degreefyd-theme", theme);
    } catch {
    }
  }, [theme]);
  const toggleTheme = () => {
    setThemeState((prev) => prev === "light" ? "dark" : "light");
  };
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };
  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>;
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
