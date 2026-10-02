---
title: "A little publishing system, no CMS required"
description: "How local Markdown, frontmatter, and a few small helpers can power a complete editorial site."
image: "/images/image-3.jpg"
date: "2026-08-05"
author: "margin. studio"
category: "Development"
tags: ["Markdown", "Next.js", "Content"]
featured: true
---

Not every content-driven site needs a database, dashboard, and authentication system. For a small journal, files can be a feature rather than a compromise.

## Give each article a frontmatter contract

A Markdown file can begin with structured metadata. Title and description appear in cards and search results; date helps determine reading order; category and tags make an archive easier to browse.

```yaml
---
title: "Notes on building things"
date: "2026-08-05"
category: "Development"
tags: ["Next.js", "Writing"]
---
```

A single post-reading helper should parse that metadata and calculate values such as reading time. Reuse it everywhere rather than having each page interpret files differently.

## Turn a folder into an archive

Read the files on the server, parse their frontmatter, sort by date, and filter by category or search query. Pagination is just another operation on the resulting array. The same list can power a home page, archive, and related-articles section.

Keep the raw Markdown in the project so every change is reviewable in version control. This workflow works particularly well for a solo author who's comfortable with an editor.

## Know when to switch

If nontechnical editors need to publish, schedule, or collaborate, a headless CMS becomes valuable. Architecture should respond to a real constraint, not the feeling that a bigger stack must be more professional.

For a portfolio project, being able to explain *why* a simpler solution fits is part of the work.
