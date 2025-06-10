'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRandomBlockOfQuotes, getNextQuote, Quote, QuoteState } from "@/lib/quote";

export default function Home() {
  const [quoteState, setQuoteState] = useState<QuoteState | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load a new block of quotes
  const loadNewBlock = async () => {
    setIsLoading(true);
    const newBlock = await getRandomBlockOfQuotes();
    const newState = {
      currentBlock: newBlock,
      seenQuotes: new Set<number>()
    };
    
    // Get the first quote immediately
    const { quote, newState: updatedState } = getNextQuote(newState);
    
    // Update both states at once
    setQuoteState(updatedState);
    setCurrentQuote(quote);
    setIsLoading(false);
  };

  // Function to get the next quote
  const getNextQuoteFromBlock = () => {
    if (!quoteState) return;

    const { quote, newState } = getNextQuote(quoteState);
    
    if (quote) {
      setCurrentQuote(quote);
      setQuoteState(newState);
    } else {
      // If we've shown all quotes, load a new block
      loadNewBlock();
    }
  };

  // Initial load
  useEffect(() => {
    loadNewBlock();
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

      <div className="w-full max-w-2xl flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mt-4"></div>
            </div>
          ) : currentQuote && (
            <>
              <p className="text-xl text-center italic">
                "{currentQuote.quote}"
              </p>
              {currentQuote.author && (
                <p className="text-sm text-center mt-2 text-gray-600">
                  — {currentQuote.author}
                </p>
              )}
            </>
          )}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight onClick={getNextQuoteFromBlock} className="w-8 h-8" />
        </button>
      </div>
    </main>
  );
}
