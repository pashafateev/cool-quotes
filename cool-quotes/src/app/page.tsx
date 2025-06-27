'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getRandomBlockOfQuotes, Quote, searchQuotesByWord } from "@/lib/quote";
import QuoteComponent from "@/components/Quote";

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
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-2xl mb-8">
        <Image
          src="/fake-logo.png"
          alt="Quote background"
          width={600}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mt-4"></div>
            </div>
          ) : currentQuote && (
            <>
              <QuoteComponent 
                text={currentQuote.quote} 
                onWordClick={handleWordClick}
              />
              {currentQuote.author && (
                <p className="text-sm text-center mt-2 text-gray-600">
                  — {currentQuote.author}
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={loadRandomQuote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            New Quote
          </button>
        </div>

        {/* No Matches Popup */}
        {showNoMatches && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
            <p className="text-yellow-800 text-center">
              No matches found. Try another word!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
