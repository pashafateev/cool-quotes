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
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // Direct search for the query
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

        return NextResponse.json(direct.hits);

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
} 