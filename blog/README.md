# Blog webpage with Astro

This project is a simple and basic blog where the blogposts or notes are handle with Astro. You can filter the posts throughout tags or search keywords. You can create, update, delete, and view blog posts directly from the web interface.

## Features

- Astro frontend for optimal performane and SEO.
- React components to manage dynamic features such as a CRUD for the blogposts.
- Supabase integration for database.
- Filter and search system based on tags or keywords.
- Markdown support to manage the format in the blogposts

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Home.astro
│   │   └── NoteCard.astro
│   │   └── NoteEditor.astro
│   │   └── NoteView.astro
│   ├── layouts
│   │   └── Layout.astro
│   ├── lib
│   │   └── supabaseClient.js
│   └── pages
│       ├── note
│       |   └── [id].astro
│       └── index.astro
└── package.json
```

## Tech Stack

- Frontend: Astro + React
- Database: Supabase
- Styling: Tailwind CSS
- Markdown Renderer: Marked
- Deployment: Adaptable to Netlify, Vercel, or any static host
