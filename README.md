# EthraTask - Project-Led Task Management platform

EthraTask is a modern, high-performance project management platform built for speed and visual excellence.

## Features
- **Project-Centric Architecture**: Organize work into projects with dedicated member roles.
- **JWT Authentication**: Secure, stateless auth with access/refresh token rotation.
- **Real-time Analytics**: Interactive charts powered by Recharts (Bar & Pie Charts).
- **Task Management**: Multi-state task statuses (Todo, In Progress, Completed) with priority levels.
- **Member Invitations**: Role-based project access management.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Recharts, Sonner (Toasts).
- **Backend**: Node.js, Express, PostgreSQL, JWT, Zod Validation.
- **Database**: PostgreSQL (Prisma-friendly schema).

## Getting Started

### Backend Setup
1. `cd backend`
2. `npm install`
3. Configure `.env` (DATABASE_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET).
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Seeding Demo Data
To populate the app with 20 demo users and 100 tasks:
`cd backend && npx ts-node scripts/seed.ts`
