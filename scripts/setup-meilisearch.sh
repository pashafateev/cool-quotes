#!/bin/bash

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Run the setup script
node scripts/setup-meilisearch.js

# If setup succeeded, run the test to verify
if [ $? -eq 0 ]; then
  echo ""
  echo "========================================"
  echo "Running verification tests..."
  echo "========================================"
  echo ""
  node scripts/test-search.js
fi
