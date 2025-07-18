"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box, CircularProgress, Typography } from "@mui/material";
import Card from "@/components/Card";
import { useQuoteManager } from "@/hooks/useQuoteManager";
import { getColorByHash } from "@/utils/colorUtils";

export default function Home() {
  const { currentQuotes, loading, error, handleWordClick } = useQuoteManager();

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
        {currentQuotes.map((quote, i) => (
          <Card
            key={`quote_${i}`}
            q={quote}
            onWordClick={handleWordClick}
            color={getColorByHash(quote.id)}
            i={i}
          />
        ))}
      </Box>
      <Footer />
    </Box>
  );
}
