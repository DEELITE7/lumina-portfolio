# Lumina Portfolio

A modern developer portfolio with a built-in studio dashboard for managing projects, blog posts, testimonials, messages, media, and selected site settings.

## Live Demo

- Portfolio: `https://iseoluwae-portfolio.vercel.app/`
- Studio login: `/auth`

## Overview

Lumina Portfolio combines two experiences in one project:

1. **Public Portfolio**
   - A premium single-page portfolio with smooth animations, a polished UI, and responsive sections for showcasing your profile and work.

2. **Studio Dashboard**
   - A protected admin area where you can manage portfolio content such as featured projects, blog posts, testimonials, incoming messages, media, and site settings.

This project is ideal for developers who want a visually strong portfolio without building a separate CMS from scratch.

---

## Features.

### Public Portfolio
- Hero section
- About section
- Featured projects
- Skills & technologies
- Experience timeline
- Testimonials
- Blog preview
- Contact form
- Responsive navigation
- Scroll progress indicator
- Animated preloader
- Custom desktop cursor
- Command palette (`Ctrl/Cmd + K`)

### Studio Dashboard
- Email/password authentication
- Dashboard overview with content stats
- Project management
- Blog post management
- Testimonial management
- Message inbox
- Media upload screen
- Settings screen

### Backend / Content Layer
- Supabase authentication
- Supabase database
- Supabase storage integration
- Dynamic content fetching for projects, blog posts, testimonials, and messages

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Framer Motion
- Tailwind CSS
- Radix UI / shadcn-style component setup
- Lucide React icons
- TanStack React Query

### Backend / Services
- Supabase Auth
- Supabase Database
- Supabase Storage

### Tooling
- ESLint
- Vitest
- Playwright
- PostCSS

---

## Project Structure

```bash
.
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── studio/
│   │   ├── ui/
│   │   ├── AboutSection.tsx
│   │   ├── BlogPreviewSection.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── Preloader.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SkillsSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   ├── lib/
│   ├── pages/
│   │   ├── studio/
│   │   ├── Auth.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── supabase/
│   ├── migrations/
│   └── config.toml
├── package.json
└── README.md
