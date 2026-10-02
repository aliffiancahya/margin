# margin

A polished, responsive **Next.js 14 App Router** journal. It works out of the box with **local Markdown** and does **not** require Strapi, a database, API keys, or a paid service. The six included articles are **sample editorial content**.

## What’s included

- Editorial home page, journal archive, detailed article pages, about/case-study page, and contact page
- Local Markdown publishing with YAML frontmatter, date sorting, categories, tags, and reading-time estimates
- Server-rendered search, category filters, and pagination with shareable URLs and useful empty states
- Responsive navigation, keyboard-visible focus states, skip link, semantic landmarks, and mobile layouts
- Per-article metadata, Open Graph data, sitemap, robots rules, 404 page, and a public read-only JSON endpoint at `/api`
- Working copy-link buttons and a contact composer (opens an email app after an address is configured copies text in demo mode)
- Original design system using Tailwind CSS, warm neutrals, editorial type, and the starter's existing photography

## Start locally

Requirements: Node.js 18.17 or newer and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production check, run `npm run build` followed by `npm run start`. Run `npm test` for content and utility tests and `npm run lint` for the Next.js ESLint configuration.

**Offline environments:** npm dependencies must be installed once using an internet-connected terminal no remote service is necessary at runtime.

## Make article

Example article frontmatter:

```yaml
---
title: "A project I learned a lot from"
description: "A short description of the post"
image: "/images/my-cover.jpg"
date: "2026-08-01"
author: "Your name"
category: "Development"
tags: ["Next.js", "Case Study"]
featured: true
---
Your Markdown content starts here.
```

Choose two or three posts to set `featured: true` for the home page. New categories automatically appear in the blog filters. Missing article slugs show a real 404 page.

## API

`GET /api` lists public article metadata. Optional URL query parameters: `q` for case-insensitive keyword search, `category` for exact category matching, and `page` for pagination (four results per page). Raw post Markdown is not returned.

## Architecture

- `app/` - pages, routing, site metadata, sitemap, and read-only API
- `components/` - reusable cards, navigation, filters, pagination, copy/share actions, contact composer
- `content/blog/` - sample Markdown articles
- `lib/post.js` - local server-side article loading and Markdown rendering
- `lib/post-utils.mjs` - pure, independently tested search/pagination/date helpers
- `lib/site.js` - public site identity and optional contact/social configuration
- `tests/` - Node built-in test runner no added test dependencies

## Deployment

Deploy to any host that supports Next.js 14 (for example, Vercel or a Node server). Add the environment variables above in your host's settings. If you update content in your repository, redeploy to include the changes.
