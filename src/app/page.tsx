'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getRandomBlockOfQuotes, Quote, searchQuotesByWord } from "@/lib/quote";
import QuoteComponent from "@/components/Quote";
import Header from "@/components/Header";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoMatches, setShowNoMatches] = useState(false);
  const [seenQuotes, setSeenQuotes] = useState<Set<string>>(new Set());

  // Use this everywhere to show a quote and mark it as seen
  function displayQuote(quote: Quote) {
    setCurrentQuote(quote);
    setSeenQuotes(prev => new Set(prev).add(quote.id));
  }

  // Fetch a random quote from CMS, skipping seen ones
  const loadRandomQuote = async () => {
    setIsLoading(true);
    setShowNoMatches(false);
    const quotes = await getRandomBlockOfQuotes();
    const unseenQuotes = quotes.filter(q => !seenQuotes.has(q.id));
    if (unseenQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * unseenQuotes.length);
      displayQuote(unseenQuotes[randomIndex]);
    } else {
      setShowNoMatches(true);
    }
    setIsLoading(false);
  };

  // Handle word clicks: always search CMS, skipping seen ones
  const handleWordClick = async (word: string) => {
    setShowNoMatches(false);
    setIsLoading(true);
    try {
      const results = await searchQuotesByWord(word);
      const filtered = results.filter(q => !seenQuotes.has(q.id));
      if (filtered.length > 0) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        displayQuote(filtered[randomIndex]);
      } else {
        setShowNoMatches(true);
      }
    } catch (error) {
      console.error('Error searching quotes:', error);
      setShowNoMatches(true);
    }
    setIsLoading(false);
  };

  // Initial load
  useEffect(() => {
    loadRandomQuote();
  }, []);

  return (
    <main>
      <Header />
    </main>
  );
}
