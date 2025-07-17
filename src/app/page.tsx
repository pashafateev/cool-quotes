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
import { useState, useEffect, useRef } from "react";
import Author from "@/components/Author";
import { debugLog } from "@/utils/debug";
import React from "react";

export default function Home() {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seenQuotes, setSeenQuotes] = useState<Set<string>>(new Set());
  const hasInitialized = useRef(false);

  // Helper function to add a quote to the array and mark it as seen
  const addQuote = (quote: QuoteType) => {
    debugLog("Adding quote:", quote.id, "Current quotes count:", quotes.length);
    setQuotes((prev) => [...prev, quote]);
    setCurrentQuoteIndex((prev) => prev + 1);
    setSeenQuotes((prev) => new Set(prev).add(quote.id));
  };

  // Get the current quote from the array
  const currentQuote =
    currentQuoteIndex >= 0 ? quotes[currentQuoteIndex] : null;

  useEffect(() => {
    if (!hasInitialized.current) {
      debugLog("useEffect running - loading random quote");
      hasInitialized.current = true;
      loadRandomQuote();
    }
  }, []);

  const loadRandomQuote = async () => {
    try {
      debugLog("loadRandomQuote called");
      setLoading(true);
      setError(null);
      const quote = await getRandomQuote();
      debugLog("Got quote:", quote);
      if (quote) {
        addQuote(quote);
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
          addQuote(unseenQuote);
        } else {
          // TODO: Add a way to get a random quote that hasn't been seen yet
          // If all results have been seen, just pick the first one
          addQuote(results[0]);
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
        }}
      >
        {/* {currentQuote && (
          <Quote quote={currentQuote} onWordClick={handleWordClick} />
        )}
        <Author quote={currentQuote} /> */}
        {quotes.map((quote, i) => (
          <React.Fragment key={`quote_${i}`}>
            <Quote quote={quote} onWordClick={handleWordClick} />
            <Author quote={quote} />
          </React.Fragment>
        ))}
      </Box>
      <Footer />
    </Box>
  );
}
