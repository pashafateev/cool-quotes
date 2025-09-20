import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
    try {
        const { query, sourceQuote } = await request.json();

        if (!query || !sourceQuote) {
            return NextResponse.json({ error: 'Query and sourceQuote are required' }, { status: 400 });
        }

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

        // 2. Extract tags from the source quote
        const tags = sourceQuote.tags || [];

        // 3. Build filter for expanded search (exclude direct matches)
        const directIds = direct.hits.map(hit => hit.id);
        const filterParts = [];

        if (tags.length) filterParts.push(`tags IN [${tags.map((t: string) => `"${t}"`).join(',')}]`);

        // If no expansion criteria, return direct results
        if (filterParts.length === 0) {
            return NextResponse.json(direct.hits);
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
                attributesToSearchOn: ['tags'],
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

        return NextResponse.json(allResults);

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
} 