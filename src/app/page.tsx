"use client";

import { useState, useEffect } from "react";
import { getRandomBlockOfQuotes, Quote, searchQuotesByWord } from "@/lib/quote";
import QuoteComponent from "@/components/Quote";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import { Box } from "@mui/material";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNoMatches, setShowNoMatches] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seenQuotes, setSeenQuotes] = useState<Set<string>>(new Set());

  // Use this everywhere to show a quote and mark it as seen
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function displayQuote(quote: Quote) {
    setCurrentQuote(quote);
    setSeenQuotes((prev) => new Set(prev).add(quote.id));
  }

  // Fetch a random quote from CMS, skipping seen ones
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadRandomQuote = async () => {
    setIsLoading(true);
    setShowNoMatches(false);
    const quotes = await getRandomBlockOfQuotes();
    const unseenQuotes = quotes.filter((q) => !seenQuotes.has(q.id));
    if (unseenQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * unseenQuotes.length);
      displayQuote(unseenQuotes[randomIndex]);
    } else {
      setShowNoMatches(true);
    }
    setIsLoading(false);
  };

  // Handle word clicks: always search CMS, skipping seen ones
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleWordClick = async (word: string) => {
    setShowNoMatches(false);
    setIsLoading(true);
    try {
      const results = await searchQuotesByWord(word);
      const filtered = results.filter((q) => !seenQuotes.has(q.id));
      if (filtered.length > 0) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        displayQuote(filtered[randomIndex]);
      } else {
        setShowNoMatches(true);
      }
    } catch (error) {
      console.error("Error searching quotes:", error);
      setShowNoMatches(true);
    }
    setIsLoading(false);
  };

  // Initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadRandomQuote();
  }, []);

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
        <ComingSoon />
      </Box>
      <Footer />
    </Box>
  );
}
