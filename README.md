# My Football App

A modern football (soccer) application built with Next.js, featuring live matches, highlights, team information, and a fully responsive design with dark/light mode support.

## Features

- **Match Listings**: Browse upcoming and live matches with scores, teams, and league information
- **Country Filtering**: Filter matches by country (England, Spain, Germany, Italy, France, Brazil)
- **Video Highlights**: Watch match highlights with embedded YouTube videos
- **Team Information**: View team details with responsive badge grid layout
- **League Data**: Explore various football leagues worldwide
- **Player Profiles**: Browse player cards with responsive grid layout
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Animated theme toggle with sun/moon transition and localStorage persistence
- **Mobile Navigation**: Hamburger menu for tablet and mobile views

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI**: Tailwind CSS v4, React 19
- **Icons**: lucide-react
- **Styling**: tailwind-merge, clsx

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with navbar/footer and theme provider
│   ├── page.tsx         # Home page (matches + highlights)
│   ├── globals.css      # Global styles with dark mode variables
│   ├── matches/         # Match-related pages
│   │   ├── page.tsx     # Matches list with country filtering
│   │   ├── [id]/        # Match detail page
│   │   ├── loading.tsx  # Skeleton loader for matches
│   │   └── error.tsx    # Error boundary
│   ├── teams/           # Team pages
│   ├── players/         # Player pages
│   ├── leagues/         # League pages
│   ├── highlights/      # Highlight video gallery
│   └── api/             # API routes (mock data)
├── components/
│   ├── MatchCard.tsx    # Client match card with client-side date formatting
│   ├── HighlightCard.tsx # Highlight card component
│   ├── TeamBadge.tsx    # Responsive team logo badge
│   ├── Navbar.tsx       # Responsive navigation with theme toggle
│   ├── Footer.tsx       # Footer
│   ├── EmptyState.tsx   # Empty state component
│   ├── ThemeToggle.tsx  # Animated sun/moon theme switcher
│   └── ThemeProvider.tsx # Theme context provider
└── lib/
    ├── utils.ts         # cn() utility for class merging
    └── real-data.ts     # Mock API data
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/matches` | Get matches with filtering (country, league, team, date) |
| `/api/matches/[id]` | Get match details |
| `/api/highlights` | Get highlight videos |
| `/api/teams` | Get team information |
| `/api/players` | Get player data |
| `/api/leagues` | Get league information |
| `/api/standings` | Get league standings |
| `/api/statistics/[matchId]` | Get match statistics |

## Recent Enhancements

- **Dark/Light Mode**: Animated theme toggle with smooth sun/moon transition, persists preference in localStorage
- **Fully Responsive Design**: Complete mobile, tablet, and desktop optimization across all pages
- **Country Filtering**: Working filter system on the matches page (England, Spain, Germany, Italy, France, Brazil)
- **Hydration Fixes**: Resolved React hydration mismatches in match cards and detail pages
- **Mobile Match Layout**: Fixed mobile layout to show Team A → Score/Status → Team B order
- **Empty Logo Handling**: Graceful placeholder when team logos are missing
- **Skeleton Loaders**: Responsive loading skeletons for all dynamic pages

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
