#!/usr/bin/env node

/**
 * MeiliSearch Index Setup Script
 *
 * This script configures the MeiliSearch index settings for the Cool Quotes application.
 * Run this script once when setting up the search index or after recreating the index.
 *
 * Usage:
 *   npm run setup-search
 *   OR with environment variables set directly:
 *   NEXT_PUBLIC_MEILI_URL=https://your-url.com MEILI_API_KEY=your_key node scripts/setup-meilisearch.js
 *
 * Environment variables required:
 *   - NEXT_PUBLIC_MEILI_URL: MeiliSearch server URL
 *   - MEILI_API_KEY: MeiliSearch API key for authentication
 */

const MEILI_URL = process.env.NEXT_PUBLIC_MEILI_URL;
const MEILI_API_KEY = process.env.MEILI_API_KEY;

if (!MEILI_URL) {
    console.error('Error: NEXT_PUBLIC_MEILI_URL environment variable is required');
    console.error('\nPlease set the MeiliSearch server URL:');
    console.error('  1. Add to .env.local file:');
    console.error('     NEXT_PUBLIC_MEILI_URL=https://your-meilisearch-url.com');
    console.error('\n  2. Or set directly when running:');
    console.error('     NEXT_PUBLIC_MEILI_URL=https://your-url.com npm run setup-search');
    process.exit(1);
}

if (!MEILI_API_KEY) {
    console.error('Error: MEILI_API_KEY environment variable is required');
    console.error('\nPlease set the MeiliSearch API key:');
    console.error('  1. Add to .env.local file:');
    console.error('     MEILI_API_KEY=your_api_key');
    console.error('\n  2. Or set directly when running:');
    console.error('     MEILI_API_KEY=your_key npm run setup-search');
    process.exit(1);
}

async function waitForTask(taskUid, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
        const taskResponse = await fetch(`${MEILI_URL}/tasks/${taskUid}`, {
            headers: {
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
        });

        if (taskResponse.ok) {
            const task = await taskResponse.json();
            if (task.status === 'succeeded') {
                return true;
            } else if (task.status === 'failed') {
                throw new Error(`Task failed: ${task.error}`);
            }
            // Status is 'enqueued' or 'processing', wait and try again with exponential backoff
            // Start at 200ms, double each time, cap at 2000ms
            const delay = Math.min(200 * Math.pow(2, i), 2000);
            await new Promise(resolve => setTimeout(resolve, delay));
        } else {
            throw new Error(`Failed to check task status: ${taskResponse.status}`);
        }
    }
    throw new Error('Task did not complete in time');
}

async function setupMeiliSearch() {
    console.log('Setting up MeiliSearch index...');
    console.log(`MeiliSearch URL: ${MEILI_URL}\n`);

    try {
        // Get current settings before making changes
        console.log('Current settings:');
        const currentResponse = await fetch(`${MEILI_URL}/indexes/quotes/settings`, {
            headers: {
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
        });

        if (currentResponse.ok) {
            const currentSettings = await currentResponse.json();
            console.log('  Searchable attributes:', currentSettings.searchableAttributes);
        }

        // Configure searchable attributes to only include the 'quote' field
        console.log('\nUpdating searchable attributes to ["quote"] only...');
        const response = await fetch(`${MEILI_URL}/indexes/quotes/settings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify({
                searchableAttributes: ['quote'],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update index settings: ${response.status} ${errorText}`);
        }

        const result = await response.json();
        console.log(`Task created: ${result.taskUid}`);

        // Wait for the task to complete
        console.log('Waiting for task to complete...');
        await waitForTask(result.taskUid);

        // Verify the settings were applied
        const verifyResponse = await fetch(`${MEILI_URL}/indexes/quotes/settings`, {
            headers: {
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
        });

        if (verifyResponse.ok) {
            const settings = await verifyResponse.json();
            console.log('\n✓ Settings updated successfully!');
            console.log('  New searchable attributes:', settings.searchableAttributes);

            if (settings.searchableAttributes.length === 1 && settings.searchableAttributes[0] === 'quote') {
                console.log('\n✓ Configuration complete! Searches will now only match text in the quote field.');
            } else {
                console.warn('\n⚠ Warning: Settings may not have been applied correctly.');
                console.warn('  Expected: ["quote"]');
                console.warn('  Got:', settings.searchableAttributes);
            }
        }

    } catch (error) {
        console.error('\n✗ Setup failed:', error.message);
        process.exit(1);
    }
}

setupMeiliSearch();
