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
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
});

export interface QuoteState {
  currentBlock: Quote[];
  seenQuotes: Set<number>;  // Track indices of quotes we've shown
}

export function getNextQuote(state: QuoteState): { quote: Quote | null, newState: QuoteState } {
  // If we've shown all quotes in the current block, return null
  if (state.seenQuotes.size >= state.currentBlock.length) {
    return { quote: null, newState: state };
  }

  // Get array of unseen quote indices
  const unseenIndices = state.currentBlock
    .map((_, index) => index)
    .filter(index => !state.seenQuotes.has(index));

  // Pick a random unseen quote
  const randomIndex = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
  
  // Create new state with the selected quote marked as seen
  const newSeenQuotes = new Set(state.seenQuotes).add(randomIndex);
  
  return {
    quote: state.currentBlock[randomIndex],
    newState: {
      currentBlock: state.currentBlock,
      seenQuotes: newSeenQuotes
    }
  };
}

// Add at the top with other constants
const seenBlocks = new Set<number>();

export async function getRandomBlockOfQuotes(): Promise<Quote[]> {
  try {
    const totalEntries = await client.getEntries({
      content_type: 'quote',
      limit: 1,
    });

    const totalBlocks = Math.ceil(totalEntries.total / 100);
    
    // Get available blocks (not seen before)
    const availableBlocks = Array.from(
      { length: totalBlocks }, 
      (_, i) => i
    ).filter(block => !seenBlocks.has(block));

    // If all blocks have been seen, reset the tracking
    if (availableBlocks.length === 0) {
      seenBlocks.clear();
      return getRandomBlockOfQuotes();
    }

    // Pick a random block from available ones
    const randomBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
    seenBlocks.add(randomBlock);
    
    const skip = randomBlock * 100;
    const limit = randomBlock === totalBlocks - 1 
      ? totalEntries.total - skip 
      : 100;

    // Fetch the block of quotes
    const response = await client.getEntries({
      content_type: 'quote',
      limit,
      skip,
    });

    return response.items.map(item => {
      const fields = item.fields as any;
      const quoteText = fields.quote?.content?.[0]?.content?.[0]?.value || '';
      
      return {
        quote: quoteText,
        author: fields.author,
        reference: fields.reference,
        tags: fields.tags,
        likes: fields.likes,
      };
    });
  } catch (error) {
    console.error('Error fetching block of quotes:', error);
    throw new Error('Failed to fetch block of quotes');
  }
}

export async function searchQuotesByWord(word: string): Promise<Quote[]> {
  try {
    // Search for quotes containing the word
    const response = await client.getEntries({
      content_type: 'quote',
      'fields.quote[match]': word,
      limit: 10, // Limit to 10 results for now
    });

    return response.items.map(item => {
      const fields = item.fields as any;
      const quoteText = fields.quote?.content?.[0]?.content?.[0]?.value || '';
      
      return {
        quote: quoteText,
        author: fields.author,
        reference: fields.reference,
        tags: fields.tags,
        likes: fields.likes,
      };
    });
  } catch (error) {
    console.error('Error searching quotes:', error);
    throw new Error('Failed to search quotes');
  }
}