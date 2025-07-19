"use client";

import * as React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "rgba(28, 30, 31, 1)" },
    secondary: { main: "rgba(61, 173, 255, 1)" },
    success: {
      main: "rgba(184, 255, 153, 1)",
      dark: "rgba(56, 128, 26, 1)",
    },
    background: {
      default: "rgba(250, 251, 252, 1)",
      paper: "rgba(255, 255, 255, 1)",
    },
    text: {
      primary: "rgba(28, 30, 31, 1)",
      secondary: "rgba(61, 173, 255, 1)",
    },
  },
  typography: {
    fontFamily: [
      "Arial Rounded MT Bold",
      "Plantagenet",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { margin: 0, padding: 0 },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { width: 42, height: 26, padding: 0 },
        switchBase: {
          padding: 1,
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "rgba(56, 128, 26, 1)",
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: { width: 24, height: 24, backgroundColor: "#fff" },
        track: {
          borderRadius: 13,
          border: "1px solid rgba(56, 128, 26, 1)",
          backgroundColor: "rgba(56, 128, 26, 1)",
          opacity: 1,
        },
      },
    },
  },
});

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "rgba(255, 255, 255, 1)" },
    secondary: { main: "rgba(61, 173, 255, 1)" },
    success: {
      main: "rgba(184, 255, 153, 1)",
      dark: "rgba(56, 128, 26, 1)",
    },
    background: {
      default: "rgba(18, 18, 18, 1)",
      paper: "rgba(30, 30, 30, 1)",
    },
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(61, 173, 255, 1)",
    },
  },
  typography: {
    fontFamily: [
      "Arial Rounded MT Bold",
      "Plantagenet",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { margin: 0, padding: 0 },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { width: 42, height: 26, padding: 0 },
        switchBase: {
          padding: 1,
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "rgba(61, 173, 255, 1)",
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: { width: 24, height: 24, backgroundColor: "#fff" },
        track: {
          borderRadius: 13,
          border: "1px solid rgba(61, 173, 255, 1)",
          backgroundColor: "rgba(61, 173, 255, 1)",
          opacity: 1,
        },
      },
    },
  },
});

// Theme context
type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    // Return a safe fallback instead of throwing an error
    return {
      mode: "system" as const,
      setMode: () => {}, // No-op function
      isDark: false,
    };
  }
  return context;
};

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<ThemeMode>("system");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Load theme preference from localStorage
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme-mode", mode);
    }
  }, [mode, mounted]);

  // Determine if we should use dark mode
  const isDark = React.useMemo(() => {
    if (!mounted) return false;

    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return mode === "dark";
  }, [mode, mounted]);

  // Listen for system theme changes
  React.useEffect(() => {
    if (mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        // Force re-render by updating state
        setMode("system");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [mode]);

  const theme = isDark ? darkTheme : lightTheme;

  const contextValue = React.useMemo(
    () => ({
      mode,
      setMode,
      isDark,
    }),
    [mode, isDark]
  );

  // Always render with light theme initially to prevent hydration mismatch
  if (!mounted) {
    return (
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
