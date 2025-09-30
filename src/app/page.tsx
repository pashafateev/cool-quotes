"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuoteManager } from "@/hooks/useQuoteManager";
import { useEffect } from "react";
import Quote from "@/components/Quote";
import Author from "@/components/Author";
import NavigationArrow from "@/components/NavigationArrow";

function QuoteDisplay() {
  const {
    currentQuote,
    handleWordClick,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    startOver,
  } = useQuoteManager();

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && canGoBack) {
        goBack();
      } else if (event.key === "ArrowRight" && canGoForward) {
        goForward();
      } else if (event.key === "r" || event.key === "R") {
        // R key for "restart" or "reset"
        startOver();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoBack, canGoForward, goBack, goForward, startOver]);

  if (!currentQuote) {
    return null;
  }

  return (
    <>
      <NavigationArrow
        direction="left"
        onClick={goBack}
        disabled={!canGoBack}
      />
      <NavigationArrow
        direction="right"
        onClick={goForward}
        disabled={!canGoForward}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Quote quote={currentQuote} onWordClick={handleWordClick} />
          <Author quote={currentQuote} />
        </Box>
      </Box>
    </>
  );
}

export default function Home() {
  const { loading, error } = useQuoteManager();

  if (loading) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <QuoteDisplay />
      <Footer />
    </Box>
  );
}
