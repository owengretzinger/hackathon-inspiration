import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { Nav } from "~/components/nav";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Hackathon Inspiration",
  description:
    "Get inspired for your next hackathon by exploring real winning projects from Devpost hackathons. Browse through curated hackathon projects with detailed information about technologies used and implementation details.",
  keywords: [
    "hackathon",
    "hackathon inspiration",
    "hackathon ideas",
    "devpost",
    "project ideas",
    "hackathon projects",
    "winning projects",
    "tech inspiration",
    "programming",
    "coding",
    "developer",
    "student projects",
  ],
  authors: [{ name: "Owen Gretzinger" }],
  openGraph: {
    title: "Hackathon Inspiration",
    description:
      "Get inspired for your next hackathon by exploring real winning projects from Devpost hackathons",
    type: "website",
    locale: "en_US",
    images: [{
      url: "/screenshot.png",
      width: 1920,
      height: 1080,
      alt: "Hackathon Inspiration website showing a project card with details about a winning hackathon project"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackathon Inspiration",
    description:
      "Get inspired for your next hackathon by exploring real winning projects from Devpost hackathons",
    images: [{
      url: "/screenshot.png",
      width: 1920,
      height: 1080,
      alt: "Hackathon Inspiration website showing a project card with details about a winning hackathon project"
    }],
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://hackathon-inspiration.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <div className="relative flex min-h-screen flex-col">
              <Nav />
              <main className="mx-auto w-full max-w-7xl flex-1">
                {children}
              </main>
              <Toaster />
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
