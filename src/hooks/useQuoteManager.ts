import { useState, useEffect, useRef } from "react";
import { Quote, getRandomQuote, searchQuotes } from "@/utils/searchUtils";
import { getRandomColorAvoiding } from "@/utils/colorUtils";
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

        // Get the last quote's color to avoid consecutive duplicates
        const lastColor = currentQuotes.length > 0 ? currentQuotes[currentQuotes.length - 1].color : undefined;
        const color = getRandomColorAvoiding(lastColor);

        const quoteWithColor: Quote = {
            ...quote,
            color
        };

        setCurrentQuotes((prev) => [...prev, quoteWithColor]);
        setCurrentQuoteIndex((prev) => prev + 1);
        setSeenQuotes((prev) => new Set(prev).add(quote.id));
    };

    const currentQuote = currentQuoteIndex >= 0 ? currentQuotes[currentQuoteIndex] : null;

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
                if (unseenQuote) {
                    addQuote(unseenQuote);
                } else {
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
    };
}
