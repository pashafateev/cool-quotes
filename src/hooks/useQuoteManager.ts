import { useState, useEffect, useRef } from "react";
import { Quote, getRandomQuote, searchQuotes } from "@/utils/searchUtils";
import { debugLog } from "@/utils/debug";

export function useQuoteManager() {
    const [currentQuotes, setCurrentQuotes] = useState<Quote[]>([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [seenQuotes, setSeenQuotes] = useState<Set<string>>(new Set());
    const hasInitialized = useRef(false);

    const addQuote = (quote: Quote) => {
        debugLog("Adding quote:", quote.id, "Current quotes count:", currentQuotes.length);

        setCurrentQuotes((prev) => [...prev, quote]);
        setCurrentQuoteIndex((prev) => prev + 1);
        setSeenQuotes((prev) => new Set(prev).add(quote.id));
    };

    const currentQuote = currentQuoteIndex >= 0 ? currentQuotes[currentQuoteIndex] : null;

    // Navigation methods
    const canGoBack = currentQuoteIndex > 0;
    const canGoForward = currentQuoteIndex < currentQuotes.length - 1;

    const goBack = () => {
        if (canGoBack) {
            setCurrentQuoteIndex((prev) => prev - 1);
        }
    };

    const goForward = () => {
        if (canGoForward) {
            setCurrentQuoteIndex((prev) => prev + 1);
        }
    };

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
            const results = await searchQuotes(word, currentQuote);
            debugLog("Search results:", results);

            if (results && results.length > 0) {
                const unseenQuote = results.find((quote) => !seenQuotes.has(quote.id));
                const quoteToAdd = unseenQuote || results[0];

                // Check if we're not at the latest quote (i.e., there's forward history)
                const isAtLatestQuote = currentQuoteIndex === currentQuotes.length - 1;

                if (!isAtLatestQuote) {
                    // Clear forward history by keeping only quotes up to current index
                    setCurrentQuotes((prev) => prev.slice(0, currentQuoteIndex + 1));
                    debugLog("Cleared forward history, keeping quotes up to index:", currentQuoteIndex);
                }

                addQuote(quoteToAdd);
            }
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to search for quotes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasInitialized.current) {
            debugLog("useEffect running - loading random quote");
            hasInitialized.current = true;
            loadRandomQuote();
        }
    }, []);

    return {
        currentQuotes,
        currentQuote,
        loading,
        error,
        handleWordClick,
        canGoBack,
        canGoForward,
        goBack,
        goForward,
    };
}
