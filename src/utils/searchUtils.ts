export interface Quote {
    id: string;
    title: string;
    quote: string;
    authors: string[];
    references: string[];
    tags: string[];
    likes: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    color?: string; // Optional color property for UI styling
}

export async function searchQuotes(query: string, sourceQuote: Quote): Promise<Quote[]> {
    try {
        const res = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, sourceQuote }),
        });

        if (!res.ok) {
            throw new Error(`Search failed: ${res.status}`);
        }

        const result = await res.json();

        if (result.error) {
            throw new Error(result.error);
        }

        return result;

    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}

export async function getRandomQuote(): Promise<Quote | null> {
    try {
        const res = await fetch('/api/quotes');

        if (!res.ok) {
            throw new Error(`Failed to fetch quote: ${res.status}`);
        }

        const quote = await res.json();

        if (quote.error) {
            throw new Error(quote.error);
        }

        return quote;

    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
}