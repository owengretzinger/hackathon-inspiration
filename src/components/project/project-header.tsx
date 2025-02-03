import Link from "next/link";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Github, Heart, MessageCircle, Youtube } from "lucide-react";

interface ProjectHeaderProps {
  title: string;
  demoVideo?: { url: string } | null;
  devpostUrl: string;
  githubUrl?: string | null;
  websiteUrl?: string | null;
  engagement: {
    likes: number;
    comments: number;
  };
  teamMembers: Array<{
    name: string | null;
    profileUrl: string | null;
    avatarUrl: string | null;
  }>;
  tagline: string;
  awards: Array<{
    place: string;
    prize?: string | null;
  }>;
  hackathonUrl: string;
  hackathonName: string;
}

export function ProjectHeader({
  title,
  demoVideo,
  devpostUrl,
  githubUrl,
  websiteUrl,
  engagement,
  teamMembers,
  tagline,
  awards,
  hackathonUrl,
  hackathonName,
}: ProjectHeaderProps) {
  return (
    <CardHeader>
      <div className="w-full space-y-3">
        {/* Links and Engagement Stats - Above title on mobile */}
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            {demoVideo && (
              <Link href={demoVideo.url} target="_blank">
                <Button variant="outline" size="icon">
                  <Youtube className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Link href={devpostUrl} target="_blank">
              <Button variant="outline" size="icon">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
                </svg>
              </Button>
            </Link>
            {githubUrl && (
              <Link href={githubUrl} target="_blank">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {websiteUrl && (
              <Link href={websiteUrl} target="_blank">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </Button>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{engagement.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{engagement.comments}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="w-full">
          <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
        </div>

        {/* Team */}
        <div className="flex flex-wrap items-center gap-3">
          {teamMembers.map((member, i) => (
            <Link
              key={i}
              href={member.profileUrl ?? "#"}
              target="_blank"
              onClick={(e) => !member.profileUrl && e.preventDefault()}
              className={`group flex items-center gap-2 ${member.profileUrl ? "hover:opacity-80" : "cursor-default"}`}
            >
              {member.avatarUrl ? (
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={member.avatarUrl}
                    alt={member.name ?? "Team member"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted" />
              )}
              <span
                className={`text-xs ${member.profileUrl ? "group-hover:underline" : "text-muted-foreground"}`}
              >
                {member.name ?? "Anonymous"}
              </span>
            </Link>
          ))}
        </div>

        <CardDescription className="text-base">{tagline}</CardDescription>

        <div className="flex flex-wrap items-center gap-2">
          {awards.map((award, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="flex items-center gap-1"
            >
              🏆 {award.place}
              {award.prize && (
                <span className="text-muted-foreground">
                  {" "}
                  - {award.prize}
                </span>
              )}
            </Badge>
          ))}
          <Link
            href={hackathonUrl}
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            @ {hackathonName}
          </Link>
        </div>
      </div>
    </CardHeader>
  );
} 