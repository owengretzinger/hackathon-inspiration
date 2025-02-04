import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Github } from "lucide-react";
import Image from "next/image";

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
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo_transparent.png"
              alt="Logo"
              width={24}
              height={24}
              className="hidden h-[24px] w-[24px] dark:block"
            />
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              className="block h-[24px] w-[24px] dark:hidden"
            />
            <span className="text-base font-semibold sm:text-lg">
              Hackathon Inspiration
            </span>
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
