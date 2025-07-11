const MEILI_URL = process.env.NEXT_PUBLIC_MEILI_URL || 'https://cool-quotes.onrender.com';
const MEILI_API_KEY = process.env.MEILI_API_KEY || '';

interface Quote {
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
}

interface SearchResult {
    hits: Quote[];
    query: string;
    processingTimeMs: number;
    limit: number;
    offset: number;
    estimatedTotalHits: number;
}

export async function semanticSearch(query: string, sourceQuote: Quote): Promise<Quote[]> {
    try {
        // 1. Direct search for the query
        const directRes = await fetch(`${MEILI_URL}/indexes/quotes/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify({ q: query, limit: 200 }),
        });

        if (!directRes.ok) {
            throw new Error(`Direct search failed: ${directRes.status}`);
        }

        const direct: SearchResult = await directRes.json();

        // 2. Extract tags, authors, and references from the source quote
        const tags = sourceQuote.tags || [];
        const authors = sourceQuote.authors || [];
        const references = sourceQuote.references || [];

        // 3. Build filter for expanded search (exclude direct matches)
        const directIds = direct.hits.map(hit => hit.id);
        const filterParts = [];

        if (tags.length) filterParts.push(`tags IN [${tags.map(t => `"${t}"`).join(',')}]`);
        if (authors.length) filterParts.push(`authors IN [${authors.map(a => `"${a}"`).join(',')}]`);
        if (references.length) filterParts.push(`references IN [${references.map(r => `"${r}"`).join(',')}]`);

        // If no expansion criteria, return direct results
        if (filterParts.length === 0) {
            return direct.hits;
        }

        const filter = filterParts.join(' OR ');

        // 4. Expanded search (exclude direct matches)
        const expandedRes = await fetch(`${MEILI_URL}/indexes/quotes/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify({
                q: '',
                filter,
                limit: 200 // Get more expanded results
            }),
        });

        if (!expandedRes.ok) {
            throw new Error(`Expanded search failed: ${expandedRes.status}`);
        }

        const expanded: SearchResult = await expandedRes.json();

        // 5. Filter out direct matches from expanded results
        const expandedOnly = expanded.hits.filter(hit => !directIds.includes(hit.id));

        // 6. Combine results: direct matches first, then expanded matches
        const allResults = [...direct.hits, ...expandedOnly];

        return allResults;

    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}