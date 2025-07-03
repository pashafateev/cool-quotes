'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

const theme = createTheme({
  palette: {
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
    text: { primary: "rgba(28, 30, 31, 1)" },
  },
  typography: {
    fontFamily: [
      "Arial Rounded MT Bold",
      "Plantagenet",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    // You can add custom variants here, but see note above
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
  // Remove or fix shadows!
  // shadows: [ ...25 strings... ],
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
