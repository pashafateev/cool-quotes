---
description: Get acquainted with the Cool Quotes repository
---

# Prime Command: Repository Onboarding

Get familiar with the Cool Quotes codebase by exploring the following files and understanding their purpose. This is an interactive quote discovery application built with Next.js 15.

## Step 1: Understand the Project

**Read these files first to understand what this project does:**

1. `README.md` - Project overview, features, and architecture
2. `package.json` - Tech stack, dependencies, and available scripts

**Key questions to answer:**
- What is the core user interaction model?
- What technologies and external services are used (search, CMS)?
- What makes this app "interactive"?

## Step 2: Explore the Main Application Flow

**Read these files to understand how the app works:**

1. `src/app/page.tsx` - Main application entry point
2. `src/hooks/useQuoteManager.ts` - Core state management (quote history, navigation, search)
3. `src/components/Quote.tsx` - How quotes are displayed and made interactive

**Key questions to answer:**
- How does the user navigate through quotes?
- What happens when a user clicks on a word?
- How is the quote history managed?

## Step 3: Understand the API Layer

**Read these API routes to understand the backend:**

1. `src/app/api/quotes/route.ts` - How random quotes are fetched
2. `src/app/api/search/route.ts` - How search works
3. `src/app/api/webhook/contentful/route.ts` - Real-time content synchronization

**Key questions to answer:**
- Where do quotes come from?
- How does search filtering work?
- How are quotes kept in sync between Contentful and MeiliSearch?

## Step 4: Review Key Utilities

**Read these utility files to understand supporting functionality:**

1. `src/utils/stopWords.ts` - Word filtering logic
2. `src/utils/searchUtils.ts` - Search API utilities
3. `src/utils/contentfulWebhook.ts` - Webhook processing

**Key questions to answer:**
- Why are stop words filtered?
- How does the search utility interact with MeiliSearch?
- What events trigger webhook processing?

## Step 5: Explore the Component Architecture

**Browse the components directory to understand the UI structure:**

1. `src/components/NavigationArrow.tsx` - Back/forward navigation
2. `src/components/NoResultsDialog.tsx` - No results handling
3. `src/components/Header.tsx` and `src/components/ThemeToggle.tsx` - App chrome

## Architecture Summary to Validate

After exploring, you should understand this three-tier architecture:
1. **Frontend**: Next.js 15 + React 19 + MUI for interactive UI
2. **Search Layer**: MeiliSearch for fast, typo-tolerant search
3. **Content Layer**: Contentful CMS with real-time webhook sync

## Key Concepts to Grasp

- **Interactive word clicking**: Users click non-stop words to search for related quotes
- **History-based navigation**: Back/forward through quote discovery journey
- **Real-time sync**: Contentful webhooks keep MeiliSearch index updated
- **Smart filtering**: Stop words filtered, duplicate quotes avoided

Once you've completed this exploration, you'll be ready to work on this codebase effectively.
