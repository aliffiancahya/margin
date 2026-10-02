---
title: "A field guide to the Next.js App Router"
description: "Layouts, server components, and dynamic routes explained through the decisions that actually matter when you ship."
image: "/images/image-1.jpg"
date: "2026-08-19"
author: "margin. studio"
category: "Development"
tags: ["Next.js", "React", "App Router"]
featured: true
---

The App Router is easiest to understand when you stop thinking of it as a new way to name folders and start thinking of it as a way to compose experiences.

## Start with the page, not the directory

Every route needs a `page.jsx` or `page.tsx`. Folders become URL segments, and a folder named `[slug]` captures a dynamic segment. That's the basic vocabulary. The interesting part is what you can share between those pages.

A `layout.jsx` wraps its child pages, so the navigation, footer, or reading progress of a section can stay in one place. A nested layout adds another layer without duplicating the site shell.

```text
app/
  layout.jsx
  page.jsx
  blog/
    page.jsx
    [slug]/
      page.jsx
```

## Keep data fetching close to its destination

Server Components can read files or fetch data before HTML reaches the browser. That's a good fit for a journal: article content is ready when the page loads, without a client-side loading spinner.

Use Client Components for the parts that actually need browser state: a mobile menu, a search interaction, or a copy-link button. The goal isn't to avoid client-side JavaScript entirely. It's to send it where it earns its place.

## Treat loading and missing states as real pages

A thoughtful site handles the edges. Add `not-found.jsx` for missing articles and make sure an empty search explains what happened. Give dynamic pages unique titles and descriptions. Small details make navigation feel intentional.

## A useful rule of thumb

Choose the simplest route and data model that fit the project you have today. A local Markdown folder is enough for a personal journal; a content API makes sense when multiple people need an editor. Neither is inherently the more impressive choice.
