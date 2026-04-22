import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme"; // "light" | "dark"

function getSystemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function readInitialTheme() {
  if (typeof window === "undefined") return { mode: "light", source: "default" };
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return { mode: stored, source: "storage" };
  return { mode: getSystemPrefersDark() ? "dark" : "light", source: "system" };
}

function applyThemeClass(mode) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", mode === "dark");
}

const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const initial = useMemo(() => readInitialTheme(), []);
  const [mode, setMode] = useState(initial.mode);
  const [source, setSource] = useState(initial.source); // "storage" | "system" | "default"

  useEffect(() => {
    applyThemeClass(mode);
  }, [mode]);

  // If user hasn't explicitly chosen, follow system changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (source === "storage") return;
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql?.addEventListener) return;

    const onChange = (e) => setMode(e.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [source]);

  const setDarkMode = (isDark) => {
    const nextMode = isDark ? "dark" : "light";
    setMode(nextMode);
    setSource("storage");
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, nextMode);
  };

  const toggle = () => setDarkMode(mode !== "dark");

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === "dark",
      toggle,
      setDarkMode,
      clearPreference: () => {
        if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
        setSource("system");
        setMode(getSystemPrefersDark() ? "dark" : "light");
      },
    }),
    [mode]
  );

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error("useDarkMode must be used within DarkModeProvider");
  return ctx;
}

