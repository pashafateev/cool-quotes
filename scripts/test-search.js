#!/usr/bin/env node

/**
 * MeiliSearch Search Test Script
 *
 * This script tests whether the searchable attributes are properly configured
 * by searching for a word that appears in the Reference field but NOT in the quote text.
 *
 * From your screenshot, "Esoteric" appears in "An Esoteric Cosmology" (reference)
 * If settings are correct: searching "esoteric" should return NO results
 * If settings are wrong: searching "esoteric" WOULD return that quote
 */

const MEILI_URL = process.env.NEXT_PUBLIC_MEILI_URL;
const MEILI_API_KEY = process.env.MEILI_API_KEY;

if (!MEILI_URL) {
    console.error('Error: NEXT_PUBLIC_MEILI_URL environment variable is required');
    console.error('Please ensure your .env.local file is properly configured.');
    process.exit(1);
}

if (!MEILI_API_KEY) {
    console.error('Error: MEILI_API_KEY environment variable is required');
    console.error('Please ensure your .env.local file is properly configured.');
    process.exit(1);
}

async function testSearch() {
    console.log('Testing MeiliSearch configuration...\n');

    try {
        // Test 1: Search for a word that might be in a Reference field
        console.log('Test 1: Searching for "esoteric"');
        const test1Response = await fetch(`${MEILI_URL}/indexes/quotes/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify({
                q: 'esoteric',
                limit: 10,
            }),
        });

        if (test1Response.ok) {
            const test1Results = await test1Response.json();
            console.log(`  Results found: ${test1Results.hits.length}`);

            if (test1Results.hits.length > 0) {
                console.log('\n  Results:');
                test1Results.hits.forEach((hit, i) => {
                    console.log(`\n  Result ${i + 1}:`);
                    console.log('    Quote:', hit.quote.substring(0, 100) + '...');
                    console.log('    Reference:', hit.references);
                    console.log('    Authors:', hit.authors);

                    // Check if "esoteric" appears in the quote text
                    const inQuote = hit.quote?.toLowerCase().includes('esoteric') || false;
                    const inRef = hit.references?.some(r => r?.toLowerCase().includes('esoteric')) || false;
                    const inAuthor = hit.authors?.some(a => a?.toLowerCase().includes('esoteric')) || false;

                    console.log(`    "esoteric" found in:`);
                    if (inQuote) console.log('      ✓ Quote text');
                    if (inRef) console.log('      ⚠ Reference (should NOT match if settings correct)');
                    if (inAuthor) console.log('      ⚠ Author (should NOT match if settings correct)');

                    if (!inQuote && (inRef || inAuthor)) {
                        console.log('    ✗ PROBLEM: Match found in Reference/Author, not in quote text!');
                    }
                });
            } else {
                console.log('  No results found');
            }
        }

        // Test 2: Search for a common word that should be in quote text
        console.log('\nTest 2: Searching for "eye" (appears in quote text)');
        const test2Response = await fetch(`${MEILI_URL}/indexes/quotes/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify({
                q: 'eye',
                limit: 10,
            }),
        });

        if (test2Response.ok) {
            const test2Results = await test2Response.json();
            console.log(`  Results found: ${test2Results.hits.length}`);

            if (test2Results.hits.length > 0) {
                console.log('  ✓ Found results - correct! (word in quote text)');
                console.log('\n  Sample result:');
                console.log('    Quote:', test2Results.hits[0].quote.substring(0, 100) + '...');
            } else {
                console.log('  ✗ No results found - unexpected!');
            }
        }

        // Test 3: Check the settings directly
        console.log('\nTest 3: Checking index settings');
        const settingsResponse = await fetch(`${MEILI_URL}/indexes/quotes/settings`, {
            headers: {
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
        });

        if (settingsResponse.ok) {
            const settings = await settingsResponse.json();
            console.log('  Searchable attributes:', settings.searchableAttributes);

            if (settings.searchableAttributes.length === 1 && settings.searchableAttributes[0] === 'quote') {
                console.log('  ✓ Settings are correct: ["quote"]');
            } else {
                console.log('  ✗ Settings are incorrect - should be ["quote"]');
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('SUMMARY');
        console.log('='.repeat(60));
        console.log('If settings are properly applied:');
        console.log('  - Searches should ONLY match words in quote text');
        console.log('  - Words in Reference/Author should NOT cause matches');
        console.log('  - searchableAttributes should be ["quote"]');

    } catch (error) {
        console.error('\n✗ Test failed:', error.message);
        process.exit(1);
    }
}

testSearch();
