"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useQuoteManager } from "@/hooks/useQuoteManager";
import { useEffect } from "react";
import Quote from "@/components/Quote";
import Author from "@/components/Author";
import NavigationArrow from "@/components/NavigationArrow";
import { FormatQuote, RestartAlt } from "@mui/icons-material";

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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoBack, canGoForward, goBack, goForward]);

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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<RestartAlt />}
            onClick={startOver}
            sx={{
              "&:hover": {
                backgroundColor: "#A8E889", // Darker green on hover
                transform: "translateY(-2px)", // Lift effect
                boxShadow: "0 4px 12px rgba(168, 232, 137, 0.4)", // Glowing shadow
              },
              transition: "all 0.2s ease-in-out", // Smooth transition
            }}
          >
            Start Over
          </Button>
          <Button
            variant="contained"
            startIcon={<FormatQuote />}
            sx={{
              "&:hover": {
                backgroundColor: "#1C1E1F", // Darker on hover for primary button
                transform: "translateY(-2px)", // Lift effect
                boxShadow: "0 4px 12px rgba(28, 30, 31, 0.4)", // Glowing shadow
              },
              transition: "all 0.2s ease-in-out", // Smooth transition
            }}
          >
            Contribute
          </Button>
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
