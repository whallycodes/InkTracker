# InkTracker

**A dog-walk logger for a retired racer who hates the rain. Built by a developer who just wanted a graph to prove it.**

---

## The Problem

My greyhound, Ink, is a retired racing dog. He's fast asleep 23 hours a day, but when he does want a walk, he has one iron rule: **if it's raining, he's not going.** After one particularly wet Austin spring, I started wondering: *just how many walks do we actually lose to weather?* And more importantly, *how far do we go when he does cooperate?* I needed data. So I built InkTracker.

---

## The Idea

A personal, single-user web app that logs dog walks, pulls live weather data, and visualizes the results in a clear, gentle dashboard. It's part utility, part data-journal, and entirely an excuse to tinker with new front-end tools.

---

## Core Features

- **Walk Logger** — Start/stop a walk, input distance (manual or GPS-approximated), add notes
- **Weather Integration** — Automatically fetch current conditions from OpenWeather API based on location
- **Rain Refusal Button** — A big, satisfying "Ink Said No" button for days when the walk never starts due to weather
- **Dashboard** — Weekly summary: total distance, walks completed, refusals, and charts comparing planned vs. actual walks
- **Streaks** — A lighthearted counter: "Days since Ink last refused a walk due to drizzle"
- **Export** — Download walk data as CSV for documentation purposes

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, Recharts |
| **Backend/API** | Next.js API routes |
| **Database** | PostgreSQL (Prisma ORM) |
| **Weather** | OpenWeatherMap API |
| **Auth** | Optional — Magic Link for future multi-user support |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL instance (local or cloud-hosted)
- OpenWeatherMap API key (free tier)

### Installation

```bash
git clone https://github.com/whallycodes/InkTracker.git
cd InkTracker
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/inktracker
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
InkTracker/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Dashboard
│   ├── api/
│   │   ├── walks/          # Walk CRUD endpoints
│   │   ├── weather/        # Weather API proxy
│   │   └── export/         # CSV export endpoint
│   └── components/
│       ├── WalkLogger.tsx    # Walk input form
│       ├── WeatherBanner.tsx # Live weather display
│       ├── Dashboard.tsx     # Main dashboard view
│       └── Chart.tsx         # Walk data visualization
├── lib/
│   ├── db.ts               # Prisma client
│   ├── weather.ts          # Weather API client
│   └── utils.ts            # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   └── icons/              # Paw prints, icons
├── styles/
│   └── globals.css         # Tailwind config
├── .env.local              # Environment variables (gitignored)
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Roadmap

### Phase 1: MVP (Current)
- [ ] Walk logger with manual distance input
- [ ] Weather banner with OpenWeather integration
- [ ] Basic dashboard with weekly summary
- [ ] CSV export

### Phase 2: Polish
- [ ] Photo log integration
- [ ] Streak counter
- [ ] Improved chart interactivity
- [ ] Mobile responsiveness

### Phase 3: Stretch Goals
- [ ] Push notifications
- [ ] Multi-dog support
- [ ] Public leaderboard (fun, non-competitive)
- [ ] GPS distance approximation

---

## Design Philosophy

- Warm, minimal, and friendly. Earth tones and soft greens.
- The **"Ink Said No" button** is prominent and guilt-inducing.
- Charts are playful with dog-bone markers and dry, conversational tooltips.

---

## Contributing

This is a personal project, but if you'd like to fork and build your own pet logger, go for it.

---

## License

MIT

---

**Built by Whally for Ink. Ink sleeps through every feature release.**
