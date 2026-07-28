# Avid Reader

> A place to capture what you read, share what it means, and discover what to read next.

Avid Reader is a social reading experience built for people who collect memorable passages, exchange ideas, and want their next great read to come from another curious mind—not an opaque recommendation engine.

Instead of treating quotes as disconnected posts, Avid Reader is growing toward a richer network of readers, books, authors, passages, reviews, and conversations.

## What you can do

- Create an account and sign in.
- Share quotes and excerpts as text or images.
- Browse a community feed.
- Bookmark passages for later.
- Explore reading-related content.
- View your reader profile.
- Access dedicated notifications and settings areas.
- Stay signed in across browser sessions with persisted application state.

## The experience

Avid Reader is designed around a simple loop:

```text
Read something meaningful
          ↓
Capture and share it
          ↓
Start a conversation
          ↓
Discover another perspective—or another book
```

The application uses a focused three-column reading layout: navigation on the left, the community feed at the center, and discovery content on the right.

## Technology

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 with the App Router |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4, Sass, MUI |
| State | Redux Toolkit, React Redux, Redux Persist |
| API client | Axios |
| Icons | Font Awesome |
| Backend | Separate Node.js and Express API |

## Project structure

```text
src/
├── app/
│   ├── (protected)/       # Authenticated routes and shared layout
│   ├── layout.tsx         # Root document, font and providers
│   ├── page.tsx           # Public landing and authentication page
│   └── providers.tsx      # Redux and persistence providers
├── components/            # Feed, forms, navigation and UI components
├── scss/                  # Existing component styles
├── shared/                # API constants
└── utils/
    ├── auth/              # Authentication actions and state
    ├── quotes/            # Quote actions and state
    └── store.ts           # Redux store
```

Current application routes:

```text
/
/dashboard
/explore
/bookmarks
/notifications
/profile
/settings
```

## Run locally

### Prerequisites

- Node.js compatible with the version required by Next.js
- pnpm
- The `avidreader-backend` API running locally

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure the API

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5050/api/v1
```

The value falls back to the same local URL when the variable is not defined.

### 3. Start the backend

Run the separate [`avidreader-backend`](https://github.com/ankitmahule/avidreader-backend) project on port `5050`.

The backend must allow credentialed requests from:

```text
http://localhost:3000
```

### 4. Start Avid Reader

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
pnpm dev       # Start the development server
pnpm lint      # Run ESLint
pnpm build     # Create a production build
pnpm start     # Run the production build
```

## Backend integration

The frontend currently communicates with endpoints for:

- Registration, login, and logout
- Profile retrieval
- Quote creation and image upload
- Quote feed retrieval
- Bookmark updates

The backend remains an independent service responsible for the database, authentication, authorization, uploads, and business logic.

## Roadmap

Avid Reader is actively evolving. The product direction includes:

- Structured book and author pages
- Reviews and ratings
- Quote attribution and source metadata
- Reader following and personalized feeds
- Reading progress and streaks
- Public and private reading circles
- Curated reading lists
- Search across books, authors, readers, and ideas
- SEO-friendly public content pages
- Secure server-validated cookie sessions

## Product principle

The goal is not to build another generic social feed with quotations pasted onto it. Every shared passage should lead somewhere: back to its book, toward its author, into a thoughtful discussion, or onward to a reader’s next discovery.

---

Built for readers who rarely finish a book without underlining something.
