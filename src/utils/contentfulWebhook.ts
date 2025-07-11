import { Quote } from './searchUtils';

const MEILI_URL = process.env.NEXT_PUBLIC_MEILI_URL || 'https://cool-quotes.onrender.com';
const MEILI_API_KEY = process.env.MEILI_API_KEY || '';

interface WebhookResult {
    processed: number;
    errors: string[];
}

// Add these interfaces at the top after the existing WebhookResult interface
interface ContentfulRichTextNode {
    nodeType: string;
    value?: string;
    content?: ContentfulRichTextNode[];
}

interface ContentfulRichText {
    content: ContentfulRichTextNode[];
}

interface ContentfulEntry {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string;
        contentType?: { sys: { id: string } };
    };
    fields: {
        title?: { 'en-US': string };
        quote?: { 'en-US': ContentfulRichText };
        authors?: { 'en-US': string[] };
        reference?: { 'en-US': string[] };
        tags?: { 'en-US': string[] };
        likes?: { 'en-US': number };
    };
}

// Extract plain text from Contentful rich text
function extractTextFromRichText(richText: ContentfulRichText | null | undefined): string {
    if (!richText || !richText.content) return '';

    let text = '';

    function extractFromNode(node: ContentfulRichTextNode) {
        if (node.nodeType === 'text') {
            text += node.value || '';
        } else if (node.content && Array.isArray(node.content)) {
            node.content.forEach(extractFromNode);
        }
    }

    richText.content.forEach(extractFromNode);
    return text.trim();
}

// Convert Contentful entry to Meilisearch format
function convertToMeilisearchFormat(entry: ContentfulEntry): Quote {
    const fields = entry.fields || {};

    return {
        id: entry.sys.id,
        title: fields.title?.['en-US'] || `Quote ${entry.sys.id}`,
        quote: extractTextFromRichText(fields.quote?.['en-US']),
        authors: fields.authors?.['en-US'] || [],
        references: fields.reference?.['en-US'] || [],
        tags: fields.tags?.['en-US'] || [],
        likes: fields.likes?.['en-US'] || 0,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
        publishedAt: entry.sys.publishedAt || entry.sys.updatedAt
    };
}

// Add or update document in Meilisearch
async function upsertDocument(document: Quote): Promise<boolean> {
    try {
        const response = await fetch(`${MEILI_URL}/indexes/quotes/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
            body: JSON.stringify([document]),
        });

        if (!response.ok) {
            throw new Error(`Meilisearch error: ${response.status} ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('Error upserting document:', error);
        return false;
    }
}

// Delete document from Meilisearch
async function deleteDocument(id: string): Promise<boolean> {
    try {
        const response = await fetch(`${MEILI_URL}/indexes/quotes/documents/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${MEILI_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Meilisearch error: ${response.status} ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting document:', error);
        return false;
    }
}

export async function processContentfulWebhook(webhookBody: ContentfulEntry): Promise<WebhookResult> {
    const result: WebhookResult = {
        processed: 0,
        errors: []
    };

    try {
        console.log('Processing webhook payload:', JSON.stringify(webhookBody, null, 2));

        // Handle different webhook event types
        const eventType = webhookBody.sys?.type;
        const contentType = webhookBody.sys?.contentType?.sys?.id;

        // Only process quote content type
        if (contentType !== 'quote') {
            console.log(`Skipping non-quote content type: ${contentType}`);
            return result;
        }

        switch (eventType) {
            case 'Entry':
            case 'PublishedEntry':
                // Entry was created, updated, or published
                if (webhookBody.fields?.quote?.['en-US']) {
                    const document = convertToMeilisearchFormat(webhookBody);

                    // Only process if quote has content
                    if (document.quote && document.quote.length > 0) {
                        const success = await upsertDocument(document);
                        if (success) {
                            result.processed++;
                            console.log(`✅ Processed entry: ${document.id}`);
                        } else {
                            result.errors.push(`Failed to upsert entry: ${document.id}`);
                        }
                    } else {
                        console.log(`Skipping entry with empty quote: ${document.id}`);
                    }
                }
                break;

            case 'DeletedEntry':
            case 'UnpublishedEntry':
                // Entry was deleted or unpublished
                const deletedId = webhookBody.sys?.id;
                if (deletedId) {
                    const success = await deleteDocument(deletedId);
                    if (success) {
                        result.processed++;
                        console.log(`��️ Deleted entry: ${deletedId}`);
                    } else {
                        result.errors.push(`Failed to delete entry: ${deletedId}`);
                    }
                }
                break;

            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

    } catch (error) {
        console.error('Error processing webhook:', error);
        result.errors.push(`Processing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
}
