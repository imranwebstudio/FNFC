# Bhat Ghor — Office Catering Platform

Next.js (T3-style) app for office lunch catering: Google login, one-click daily set meals, cash-on-delivery confirmation, and wallet deposits with due balances.

## Stack

- Next.js App Router + TypeScript + Tailwind + Framer Motion
- tRPC + TanStack Query
- Prisma + PostgreSQL (Neon)
- Auth.js (Google)
- Cloudinary (meal photos)
- Deploy: Vercel

## Setup

1. Copy `.env.example` → `.env` and fill values.
2. Create a [Google OAuth](https://console.cloud.google.com/) client (Web). Authorized redirect URI:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://YOUR_DOMAIN/api/auth/callback/google`
3. Point `DATABASE_URL` at Neon Postgres.
4. Set `SUPER_ADMIN_EMAIL` to the Google account that should become super admin on first login.
5. Optional Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

## Roles

| Role | Capabilities |
|------|----------------|
| USER | Profile, today's meal, one-click order, wallet history |
| ADMIN | Location menus, cutoff, order board, deposits, analytics |
| SUPER_ADMIN | Locations, roles, admin assignments, meal catalog |

## Deploy (Vercel)

1. Import the repo into Vercel.
2. Add env vars from `.env.example` (production Google redirect + Neon + Auth secret).
3. Build uses `prisma migrate deploy` then `next build` (see `vercel.json`).
4. Run seed once against production DB: `DATABASE_URL=... npm run db:seed`.

## Product rules

- One published set meal per location + date + lunch/dinner.
- Admin-configurable ordering cutoff (Asia/Dhaka).
- `CASH`: unpaid until admin confirms on delivery.
- `WALLET`: balance decremented on order; may go negative (due).
- Deposits recorded by admin (optional top-up / due payment).
