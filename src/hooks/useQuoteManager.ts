import { useState, useEffect, useRef } from "react";
import { Quote, getRandomQuote, searchQuotes } from "@/utils/searchUtils";
import { debugLog } from "@/utils/debug";

export function useQuoteManager() {
    const [currentQuotes, setCurrentQuotes] = useState<Quote[]>([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [seenQuotes, setSeenQuotes] = useState<Set<string>>(new Set());
    const [noResultsDialog, setNoResultsDialog] = useState<{ open: boolean, searchTerm: string }>({ open: false, searchTerm: '' });
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
            const results = await searchQuotes(word);
            debugLog("Search results:", results);

            if (results && results.length > 0) {
                const unseenQuote = results.find((quote) => !seenQuotes.has(quote.id));

                if (unseenQuote) {
                    // There's an unseen quote, add it
                    const quoteToAdd = unseenQuote;

                    // Check if we're not at the latest quote (i.e., there's forward history)
                    const isAtLatestQuote = currentQuoteIndex === currentQuotes.length - 1;

                    if (!isAtLatestQuote) {
                        // Clear forward history by keeping only quotes up to current index
                        const updatedQuotes = currentQuotes.slice(0, currentQuoteIndex + 1);
                        setCurrentQuotes(updatedQuotes);
                        debugLog("Cleared forward history, keeping quotes up to index:", currentQuoteIndex);

                        // Check against the updated array
                        if (!updatedQuotes.some(quote => quote.id === quoteToAdd.id)) {
                            addQuote(quoteToAdd);
                        }
                    } else {
                        // Check against current array
                        if (!currentQuotes.some(quote => quote.id === quoteToAdd.id)) {
                            addQuote(quoteToAdd);
                        }
                    }
                } else {
                    // All results have been seen before, show dialog
                    setNoResultsDialog({ open: true, searchTerm: word });
                }
            } else {
                // No results found at all, show dialog
                setNoResultsDialog({ open: true, searchTerm: word });
            }
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to search for quotes");
        } finally {
            setLoading(false);
        }
    };

    const startOver = async () => {
        try {
            debugLog("Starting over - resetting all state");
            setLoading(true);
            setError(null);

            // Reset all state
            setCurrentQuotes([]);
            setCurrentQuoteIndex(-1);
            setSeenQuotes(new Set());

            // Load a new random quote
            const quote = await getRandomQuote();
            debugLog("Got new quote for start over:", quote);
            if (quote) {
                addQuote(quote);
            } else {
                setError("No quotes found");
            }
        } catch (err) {
            setError("Failed to start over");
            console.error("Error starting over:", err);
        } finally {
            setLoading(false);
        }
    };

    const closeNoResultsDialog = () => {
        setNoResultsDialog({ open: false, searchTerm: '' });
    };

    const handleContribute = () => {
        window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSdrjwZVG1aCAqEU4mJwtqaEsjMB0yYu3c7QUVZHhsnD5FF-_w/viewform?vc=0&c=0&w=1&flr=0",
            "_blank"
        );
    };

    useEffect(() => {
        if (!hasInitialized.current) {
            debugLog("useEffect running - loading random quote");
            hasInitialized.current = true;
            loadRandomQuote();
        }
    }, [loadRandomQuote]);

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
        startOver,
        noResultsDialog,
        closeNoResultsDialog,
        handleContribute,
    };
}
