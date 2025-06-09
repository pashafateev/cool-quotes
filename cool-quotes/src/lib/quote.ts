import { createClient } from 'contentful';

// Define the Quote type
export interface Quote {
    quote: string;
    author?: string;
    reference?: string;
    tags?: string[];
    likes?: number;
}

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export async function getRandomQuote(): Promise<Quote> {
  try {
    // Get total number of entries
    const totalEntries = await client.getEntries({
      content_type: 'quote',
      limit: 1,
    });

    // Generate a random skip value
    const skip = Math.floor(Math.random() * totalEntries.total);

    // Fetch a random quote
    const response = await client.getEntries({
      content_type: 'quote',
      limit: 1,
      skip,
    });

    const quote = response.items[0];
    const fields = quote.fields as any;
    
    // Extract the text content from the rich text field
    const quoteText = fields.quote?.content?.[0]?.content?.[0]?.value || '';
    
    return {
      quote: quoteText,
      author: fields.author,
      reference: fields.reference,
      tags: fields.tags,
      likes: fields.likes,
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error('Failed to fetch quote');
  }
}
