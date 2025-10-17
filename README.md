# Cool Quotes

A personal interactive quote discovery application that lets you explore quotes by clicking on words. Each word click searches for related quotes, creating a unique journey through wisdom and ideas.

## What It Does

Cool Quotes is an interactive web application where:
- You start with a random quote
- Click on any non-stop word (colored blue) in the quote to search for quotes containing that word
- Navigate back and forth through your quote discovery history
- Switch between dark and light themes
- Receive real-time quote updates via Contentful webhooks

The app filters out common stop words (like "the", "and", "is") so you can focus on meaningful words. If no quotes are found for a word, you can contribute new quotes through a Google Form.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **UI**: [Material-UI (MUI) v7](https://mui.com) with Emotion styling
- **Search**: [MeiliSearch](https://www.meilisearch.com/) for fast, typo-tolerant quote search
- **CMS**: [Contentful](https://www.contentful.com/) for content management
- **Language**: TypeScript
- **Styling**: Tailwind CSS + MUI

## Features

- 🔍 **Interactive Word Search**: Click words in quotes to discover related quotes
- ⬅️➡️ **Navigation**: Move back and forth through your quote history (keyboard arrows supported)
- 🌓 **Theme Toggle**: Switch between light and dark modes
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 🔄 **Real-time Updates**: Contentful webhooks automatically sync quotes to MeiliSearch
- ⚡ **Fast Search**: MeiliSearch provides instant, typo-tolerant search results
- 🎯 **Smart Filtering**: Automatically filters out common stop words

## Development

```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── quotes/          # Random quote endpoint
│   │   ├── search/          # Search endpoint
│   │   └── webhook/         # Contentful webhook handler
│   ├── page.tsx             # Main application page
│   ├── layout.tsx           # Root layout with theme
│   └── globals.css          # Global styles
├── components/
│   ├── Quote.tsx            # Interactive quote display
│   ├── Author.tsx           # Author display
│   ├── Header.tsx           # App header with logo
│   ├── Footer.tsx           # App footer
│   ├── NavigationArrow.tsx  # Back/forward navigation
│   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   └── NoResultsDialog.tsx  # No results modal
├── hooks/
│   └── useQuoteManager.ts   # Quote state management
├── utils/
│   ├── searchUtils.ts       # Search API utilities
│   ├── stopWords.ts         # Stop words list
│   ├── contentfulWebhook.ts # Webhook processing
│   └── debug.ts             # Debug logging
└── theme/
    └── ThemeRegistry.tsx    # MUI theme configuration
```

## How It Works

### Quote Navigation

1. **Initial Load**: Fetches a random quote from MeiliSearch
2. **Word Click**: When you click a word:
   - Searches for quotes containing that word
   - Filters out quotes you've already seen
   - Adds the new quote to your history
   - Clears forward history if you've navigated back
3. **Navigation**: Use arrow buttons or keyboard arrows to move through history
4. **No Results**: Shows a dialog with options to start over or contribute a quote

### Contentful Integration

The app includes a webhook endpoint (`/api/webhook/contentful`) that:
- Receives events when quotes are created, updated, or deleted in Contentful
- Converts Contentful rich text to plain text
- Syncs changes to MeiliSearch in real-time
- Supports entry creation, update, publish, unpublish, and delete events

### Search Implementation

- Uses MeiliSearch for fast, typo-tolerant full-text search
- Searches across quote text, authors, references, and tags
- Returns up to 200 results per search
- Automatically filters out common stop words

## Contributing Quotes

When no quotes are found for a search term, users can contribute new quotes via a Google Form. The link opens in a new tab for easy submission.

## Architecture

The app uses a three-tier architecture:
1. **Frontend**: Next.js with MUI for the interactive UI
2. **Search Layer**: MeiliSearch for fast full-text search
3. **Content Layer**: Contentful CMS with webhook integration

### Contentful Webhook Integration

The `/api/webhook/contentful` endpoint automatically syncs quotes from Contentful to MeiliSearch when:
- New quotes are published
- Existing quotes are updated
- Quotes are unpublished or deleted

## Acknowledgments

Built with Next.js 15, React 19, MeiliSearch, Contentful, and Material-UI.
