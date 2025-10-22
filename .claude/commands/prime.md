---
description: Get acquainted with the Cool Quotes repository
---

# Cool Quotes Repository Overview

This is an interactive quote discovery application built with Next.js 15. Get familiar with the codebase by understanding these key aspects:

## What This App Does

Cool Quotes is an interactive web application where users:
- Start with a random quote
- Click on meaningful words (colored blue) to search for related quotes
- Navigate back/forward through their quote discovery history with arrow buttons or keyboard
- Switch between dark/light themes
- Receive real-time quote updates via Contentful webhooks

Common stop words are filtered out so users focus on meaningful words. If no quotes are found, users can contribute via a Google Form.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v7 with Emotion styling
- **Styling**: Tailwind CSS + MUI
- **Search Engine**: MeiliSearch for fast, typo-tolerant search
- **CMS**: Contentful for content management
- **Package Manager**: npm

## Architecture

Three-tier architecture:
1. **Frontend**: Next.js with MUI for interactive UI
2. **Search Layer**: MeiliSearch for full-text search
3. **Content Layer**: Contentful CMS with webhook integration

## Key Files & Directories

### Main Application
- `src/app/page.tsx` - Main application page with quote display logic
- `src/app/layout.tsx` - Root layout with theme configuration
- `src/hooks/useQuoteManager.ts` - Core state management for quotes, navigation, and search

### API Routes
- `src/app/api/quotes/route.ts` - Random quote endpoint
- `src/app/api/search/route.ts` - Search endpoint
- `src/app/api/webhook/contentful/route.ts` - Contentful webhook handler for real-time sync

### Components
- `src/components/Quote.tsx` - Interactive quote display with clickable words
- `src/components/Author.tsx` - Author display component
- `src/components/NavigationArrow.tsx` - Back/forward navigation arrows
- `src/components/Header.tsx` - App header with logo
- `src/components/ThemeToggle.tsx` - Dark/light mode toggle
- `src/components/NoResultsDialog.tsx` - Modal shown when no quotes found

### Utilities
- `src/utils/searchUtils.ts` - Search API utilities
- `src/utils/stopWords.ts` - List of filtered stop words
- `src/utils/contentfulWebhook.ts` - Webhook event processing
- `src/theme/ThemeRegistry.tsx` - MUI theme configuration

## How It Works

### Quote Navigation Flow
1. **Initial Load**: Fetches random quote from MeiliSearch
2. **Word Click**:
   - Searches for quotes containing that word
   - Filters out already-seen quotes
   - Adds to history stack
   - Clears forward history if navigated back
3. **Navigation**: Arrow buttons or keyboard arrows traverse history
4. **No Results**: Dialog with "Start Over" or "Contribute Quote" options

### Contentful Webhook Integration
The `/api/webhook/contentful` endpoint:
- Receives events when quotes are created/updated/deleted
- Converts Contentful rich text to plain text
- Syncs changes to MeiliSearch in real-time
- Supports create, update, publish, unpublish, and delete events

### Search Implementation
- MeiliSearch provides fast, typo-tolerant full-text search
- Searches across: quote text, authors, references, tags
- Returns up to 200 results per search
- Automatically filters common stop words

## Development Commands

```bash
npm run dev    # Start dev server with Turbopack
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Recent Changes

From git history:
- Simplified search logic and improved UX for no results
- Added arrow navigation (keyboard and UI)
- Removed color cards and unused packages
- Streamlined quote display

## Important Notes

- The app uses client-side state management via the `useQuoteManager` hook
- Stop words are filtered to make word clicking more meaningful
- MeiliSearch handles all search indexing and retrieval
- Contentful acts as the source of truth for quote content
- Real-time sync keeps MeiliSearch in sync with Contentful via webhooks

You should now be familiar with the Cool Quotes codebase structure, tech stack, and core functionality.
