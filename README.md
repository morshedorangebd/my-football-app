# My Football App

A modern football (soccer) application built with Next.js, featuring live matches, highlights, and team information.

## Features

- **Match Listings**: Browse upcoming and live matches with scores, teams, and league information
- **Video Highlights**: Watch match highlights with embedded YouTube videos
- **Team Information**: View team details, lineups, statistics, and standings
- **League Data**: Explore various football leagues worldwide
- **Responsive Design**: Mobile-friendly layout with dark mode support

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
│   ├── layout.tsx       # Root layout with navbar/footer
│   ├── page.tsx         # Home page (matches + highlights)
│   ├── matches/         # Match-related pages
│   ├── teams/           # Team pages
│   ├── players/         # Player pages
│   ├── leagues/         # League pages
│   ├── highlights/      # Highlight video gallery
│   └── api/             # API routes (mock data)
├── components/
│   ├── MatchCard.tsx    # Match card component
│   ├── HighlightCard.tsx # Highlight card component
│   ├── Navbar.tsx       # Navigation
│   ├── Footer.tsx       # Footer
│   └── EmptyState.tsx   # Empty state component
└── lib/
    └── real-data.ts     # Mock API data
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/matches` | Get matches with filtering (league, team, date) |
| `/api/highlights` | Get highlight videos |
| `/api/teams` | Get team information |
| `/api/players` | Get player data |
| `/api/leagues` | Get league information |
| `/api/standings` | Get league standings |
| `/api/statistics/[matchId]` | Get match statistics |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.