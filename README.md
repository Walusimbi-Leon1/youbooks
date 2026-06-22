# 📚 YouBooks

A modern book discovery and reading platform built with TypeScript.

## Features

- **40+ Public Domain Books** — Pre-loaded from Project Gutenberg (Shakespeare, Austen, Dickens, etc.)
- **80+ Curated Authors** — From Open Library across all genres
- **Author Search** — Real-time search powered by Open Library API
- **Admin Panel** — Add books via URL with Firebase Auth protection
- **Clean Light Theme** — Modern, responsive design

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Firebase (Firestore + Auth)
- Open Library API
- Project Gutenberg (public domain books)

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Framework: Vite
4. Build command: `npm run build`
5. Output: `dist`

## Admin Access

1. Go to the website
2. Type `youbooks.sgss` in the search bar
3. Press Enter
4. Sign in with Firebase Auth credentials

## Environment Variables

None required — Firebase config is hardcoded (client-side key, safe to expose).
