<div align="center">
  <a href="https://hackathon-inspiration.owengretzinger.com">
    <img src="https://hackathon-inspiration.owengretzinger.com/favicon.ico" alt="HackMate Logo" width="80" height="80">
  </a>

<h3 align="center">Hackathon Inspiration</h3>
  <p align="center">
    Get inspired for your next hackathon by exploring real winning projects from Devpost hackathons
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#demo">Demo</a></li>
      </ul>
    </li>
    <li><a href="#architecture">Architecture</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Hackathon Inspiration is a tool that allows you to get inspired for your next hackathon by exploring real winning projects from Devpost hackathons.

![Screenshot](/public/screenshot.png)

It was originally built as part of [HackMate](https://github.com/owengretzinger/hackmate) for the GDG Mac-a-Thon 2025, which won 1st overall.

Made possible by a web scraper I built that scrapes all information from winning projects for a given Devpost hackathon link. There are currently hundreds of winning projects across many hackathons in the database.

### Demo

<div align="center">
  <a href="https://youtu.be/sD66NuLWxFw?si=YTVOI7qggv-7y0mL&t=23">
    <img src="https://github.com/user-attachments/assets/6153bf9a-325a-4df2-a8c7-3f9afab40a38" alt="HackMate Demo">
  </a>
  <p>
    Click the image to see a short demo (HackMate demo video)
  </p>
</div>

## Architecture

- **Frontend:**
  - Next.js (T3 Stack)
  - TypeScript
  - Shadcn UI
  - Tailwind CSS
  - Next-themes for dark/light mode support
  - React Query for data fetching
- **Backend**
  - tRPC (type-safe communication between frontend and backend)
  - Postgres Database (hosted on Neon)
  - Drizzle ORM with drizzle-kit for migrations
  - Vercel for deployment
- **Data Scraping:**
  - Puppeteer for web scraping

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/owengretzinger/hackathon-inspiration.git
   ```
2. Install packages
   ```sh
   npm install
   ```
3. Configure environment variables
   ```sh
   cp .env.example .env
   ```
4. Start the development server
   ```sh
   npm run dev
   ```

## Contact

Owen Gretzinger - owengretzinger@gmail.com
