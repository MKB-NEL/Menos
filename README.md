# Menos

> Automate your social presence across Facebook and Instagram.

## Overview

Menos is a single-tenant SaaS tool that auto-posts user-uploaded media to Facebook and Instagram via a self-hosted [Postiz](https://postiz.com) API. The frontend is built with React (Vite) and the backend runs as Vercel Serverless Functions, with Supabase as the database.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, Framer Motion, React Router v6, Lucide React |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |
| External API | Postiz (self-hosted) |

---

## Project Structure

```
menos/
├── api/                    # Vercel Serverless Functions
│   ├── db.js               # Supabase client singleton
│   ├── connect.js          # GET  /api/connect
│   ├── integrations.js     # GET  /api/integrations
│   ├── post.js             # POST /api/post
│   └── history.js          # GET  /api/history
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Compose.jsx
│   │   ├── Connections.jsx
│   │   └── History.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase/
│   └── schema.sql          # Run once in Supabase SQL Editor
├── .env                    # Environment variables (never commit)
├── vercel.json
└── vite.config.js
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Edit `.env` and fill in real values:

```env
# Frontend
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Backend (Vercel)
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
POSTIZ_API_KEY=...
POSTIZ_API_URL=...
```

### 3. Create Supabase table

Open the Supabase SQL Editor for your project and run:

```
supabase/schema.sql
```

### 4. Run locally

```bash
npm run dev:api   # Start Vercel dev (API + frontend proxy)
# or
npm run dev       # Vite only (no API)
```

### 5. Deploy

```bash
vercel deploy
```

Set all environment variables in your Vercel project settings.

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/api/connect` | Returns the Postiz OAuth URL |
| GET | `/api/integrations` | Lists connected social accounts |
| POST | `/api/post` | Publishes a post to a connected account |
| GET | `/api/history` | Returns all logged posts from Supabase |

---

## Connecting Postiz

1. Set `POSTIZ_API_URL` to your self-hosted Postiz instance URL (e.g. `https://postiz.yourdomain.com`).
2. Set `POSTIZ_API_KEY` to your Postiz API key.
3. Use the **Connections** page in the dashboard to initiate the OAuth flow.
