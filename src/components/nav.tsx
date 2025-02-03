import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Github, Lightbulb } from "lucide-react";

const links: { href: string; label: string }[] = [
  // {
  //   href: "/",
  //   label: "Inspiration",
  // },
  // {
  //   href: "/about",
  //   label: "About",
  // },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span className="text-lg font-semibold">Hackathon Inspiration</span>
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <Button variant="ghost">{link.label}</Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/owengretzinger/hackathon-inspiration"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
