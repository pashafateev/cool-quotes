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
import { debugLog } from "@/utils/debug";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seenQuotes, setSeenQuotes] = useState<Set<string>>(new Set());

  // Helper function to display a quote and mark it as seen
  const displayQuote = (quote: QuoteType) => {
    setCurrentQuote(quote);
    setSeenQuotes((prev) => new Set(prev).add(quote.id));
  };

  useEffect(() => {
    loadRandomQuote();
  }, []);

  const loadRandomQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const quote = await getRandomQuote();
      if (quote) {
        displayQuote(quote);
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
      debugLog("Searching for:", word);
      const results = await semanticSearch(word, currentQuote);
      debugLog("Search results:", results);

      if (results && results.length > 0) {
        // Find the first quote that hasn't been seen yet
        const unseenQuote = results.find((quote) => !seenQuotes.has(quote.id));

        if (unseenQuote) {
          displayQuote(unseenQuote);
        } else {
          // If all results have been seen, just pick the first one
          displayQuote(results[0]);
        }
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
          minHeight: "calc(100vh - 200px)", // Ensure minimum height for scrolling
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
