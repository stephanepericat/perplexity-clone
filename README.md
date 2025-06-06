# Perplexity Clone

A Perplexity clone built with Next.js, ShadCN and Tailwind CSS.

## Getting Started

### Install Dependencies

```
pnpm install
```

### Edit the .env file

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"

SUPABASE_DB_PASSWORD=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

BRAVE_SEARCH_API_KEY=""

GEMINI_API_KEY=""

INNGEST_DOMAIN="http://127.0.0.1:8288"
INNGEST_SIGNING_KEY="local.dev"
```

## Run

### Start the app

```
pnpm dev
```

Visit http://localhost:3000/

### Run Inngest dev server

```
npx inngest-cli@latest dev
```

Visit http://localhost:8288/
