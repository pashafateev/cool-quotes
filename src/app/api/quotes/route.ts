import { NextResponse } from 'next/server';

const MEILI_URL = process.env.NEXT_PUBLIC_MEILI_URL || 'https://cool-quotes.onrender.com';
const MEILI_API_KEY = process.env.MEILI_API_KEY || '';

export async function GET() {
    try {
        const res = await fetch(`${MEILI_URL}/indexes/quotes/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify({
                q: '',
                limit: 1000 // Get all available quotes for randomization
            }),
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch quote: ${res.status}`);
        }

        const result = await res.json();

        if (result.hits.length === 0) {
            return NextResponse.json({ error: 'No quotes found' }, { status: 404 });
        }

        // Pick a random quote from the results
        const randomIndex = Math.floor(Math.random() * result.hits.length);
        return NextResponse.json(result.hits[randomIndex]);

    } catch (error) {
        console.error('Error fetching quote:', error);
        return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
    }
} 