'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getRandomBlockOfQuotes, getUnseenQuote, Quote, QuoteState, searchQuotesByWord } from "@/lib/quote";
import QuoteComponent from "@/components/Quote";

export default function Home() {
  const [quoteState, setQuoteState] = useState<QuoteState | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoMatches, setShowNoMatches] = useState(false);

  // Function to load a new block of quotes
  const loadNewBlock = async () => {
    setIsLoading(true);
    const newBlock = await getRandomBlockOfQuotes();
    const newState = {
      currentBlock: newBlock,
      seenQuotes: new Set<number>()
    };
    
    // Get the first quote immediately
    const { quote, newState: updatedState } = getUnseenQuote(newState);
    
    // Update both states at once
    setQuoteState(updatedState);
    setCurrentQuote(quote);
    setIsLoading(false);
  };

  // Search through current block of quotes
  const searchCurrentBlock = (word: string): Quote[] => {
    if (!quoteState || !currentQuote) return [];
    
    return quoteState.currentBlock.filter(quote => 
      // Only include quotes that match the search AND are not the current quote
      quote.quote.toLowerCase().includes(word.toLowerCase()) && 
      quote.quote !== currentQuote.quote
    );
  };

  // Handle word clicks
  const handleWordClick = async (word: string) => {
    setIsSearching(true);
    setShowNoMatches(false);
    try {
      // First search through current block
      const currentBlockResults = searchCurrentBlock(word);
      
      if (currentBlockResults.length > 0) {
        // If we found matches in current block, randomly select one
        const randomIndex = Math.floor(Math.random() * currentBlockResults.length);
        setCurrentQuote(currentBlockResults[randomIndex]);
      } else {
        // Contentful search
        const contentfulResults = await searchQuotesByWord(word);
        
        if (contentfulResults.length > 0) {
          // Randomly select one from Contentful results
          const randomIndex = Math.floor(Math.random() * contentfulResults.length);
          const selectedQuote = contentfulResults[randomIndex];
          
          // Add all found quotes to the current block
          if (quoteState) {
            const updatedBlock = [...quoteState.currentBlock, ...contentfulResults];
            const updatedState = {
              ...quoteState,
              currentBlock: updatedBlock
            };
            setQuoteState(updatedState);
          }
          
          setCurrentQuote(selectedQuote);
        } else {
          // If no matches found, show no matches popup
          setShowNoMatches(true);
        }
      }
    } catch (error) {
      console.error('Error searching quotes:', error);
    } finally {
      setIsSearching(false);
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
            onClick={loadNewBlock}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            New Quote
          </button>
        </div>

        {/* No Matches Popup */}
        {showNoMatches && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
            <p className="text-yellow-800 text-center">
              No matches found in current quotes. Try another word!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
