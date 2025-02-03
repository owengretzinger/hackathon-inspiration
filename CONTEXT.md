## Overview

Hackathon Inspiration is a website that scrapes winning hackathon projects from Devpost and displays them to users.

## Key Features

- **Project Inspiration:** See random real winning hackathon projects. Made possible by a web scraper I built that scrapes all information from winning projects for a given Devpost hackathon link.

## Instructions for LLMs

When helping with this project, please follow these guidelines:

- **UI Components:** Always prefer using shadcn components. Install them using `npx shadcn@latest add <component>` (NOT `npx shadcn-ui@latest add`)
- **Styling:** Use Tailwind CSS for styling. The project uses the New York style variant of shadcn
- **Type Safety:** Maintain strict TypeScript types and leverage tRPC's type safety features
- **Database:** Use Drizzle ORM for all database operations. Avoid raw SQL queries
- **API Routes:** All API endpoints should be created using tRPC routers, not Next.js API routes
- **Environment Variables:** New environment variables must be added to both `.env.example` and validated in `src/env.js`
- **Components:** Place reusable components in `src/components/` and page-specific components in their respective page directories
- **Imports:** Use the `~/*` alias for imports from the src directory (e.g., `~/components/ui/button`)

## Technologies Used

- **Frontend:**
  - Next.js (T3 Stack)
  - TypeScript
  - Shadcn UI
  - Tailwind CSS
  - Geist font family
  - Next-themes for dark/light mode support
  - React Query for data fetching
- **Backend**
  - tRPC (type-safe communication between frontend and backend)
  - Postgres Database (hosted on Neon)
  - Drizzle ORM with drizzle-kit for migrations
  - Vercel for deployment
- **Data Scraping:**
  - Puppeteer for web scraping

## Project Structure

- `/src`
  - `/app` - Next.js app router pages and layouts
  - `/components` - React components including Shadcn UI components
  - `/lib` - Utility functions and shared code
  - `/server` - Backend server code
    - `/api` - tRPC API routes and routers
    - `/db` - Database schema and configuration
  - `/scripts` - Utility scripts including the Devpost scraper
  - `/styles` - Global CSS and Tailwind configurations
  - `/trpc` - tRPC client configuration

## Development Setup

- Uses Node.js >= 20.0.0
- PostgreSQL database
- Environment variables managed through `.env` file
- Type checking with TypeScript
- Code formatting with Prettier
- Linting with ESLint including custom Drizzle rules

## Database

- Uses Drizzle ORM with PostgreSQL
- Schema migrations handled by drizzle-kit
- Production database hosted on Neon

## Configuration

- Tailwind configured with custom theme and animations
- TypeScript strict mode enabled with path aliases
- ESLint configured with TypeScript and Drizzle-specific rules
- Shadcn UI components with New York style variant
