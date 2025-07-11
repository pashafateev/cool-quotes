"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box, CircularProgress, Typography } from "@mui/material";
import Quote from "@/components/Quote";
import {
  getRandomQuote,
  semanticSearch,
  Quote as QuoteType,
} from "@/utils/searchUtils";
import { useState, useEffect } from "react";
import Author from "@/components/Author";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRandomQuote();
  }, []);

  const loadRandomQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const quote = await getRandomQuote();
      if (quote) {
        setCurrentQuote(quote);
      } else {
        setError("No quotes found");
      }
    } catch (err) {
      setError("Failed to load quote");
      console.error("Error loading quote:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWordClick = async (word: string) => {
    if (!currentQuote) return;

    try {
      setLoading(true);
      console.log("Searching for:", word);
      const results = await semanticSearch(word, currentQuote);
      console.log("Search results:", results);

      if (results && results.length > 0) {
        // Pick a random quote from the search results
        const randomIndex = Math.floor(Math.random() * results.length);
        setCurrentQuote(results[randomIndex]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search for quotes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
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
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
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
        {currentQuote && (
          <Quote quote={currentQuote} onWordClick={handleWordClick} />
        )}
        <Author quote={currentQuote} />
      </Box>
      <Footer />
    </Box>
  );
}
