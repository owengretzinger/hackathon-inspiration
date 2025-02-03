import {
  integer,
  json,
  pgTableCreator,
  text,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const winningProjects = createTable('winning_projects', {
  id: text('id').primaryKey(),
  index: integer('index').notNull().unique(),
  title: text('title').notNull(),
  tagline: text('tagline'),
  description: text('description'),
  devpostUrl: text('devpost_url').notNull().unique(),
  thumbnail: text('thumbnail_url'),
  technologies: json('technologies').$type<Array<{
    name: string;
    url?: string;
    isRecognized: boolean;
  }>>().notNull().default([]),
  awards: json('awards').$type<Array<{
    category: string;
    place: string;
    description: string | null;
    prize?: string;
  }>>().notNull().default([]),
  demoVideo: json('demo_video').$type<{
    url: string;
    type: 'youtube' | 'vimeo' | 'other';
    videoId?: string;
  } | null>(),
  galleryImages: json('gallery_images').$type<Array<{
    url: string;
    caption?: string;
  }>>().notNull().default([]),
  teamSize: integer('team_size'),
  githubUrl: text('github_url'),
  websiteUrl: text('website_url'),
  teamMembers: json('team_members').$type<Array<{
    name: string;
    profileUrl: string;
    avatarUrl?: string;
    role?: string;
  }>>().notNull().default([]),
  engagement: json('engagement').$type<{
    likes: number;
    comments: number;
  }>().notNull().default({ likes: 0, comments: 0 }),
  hackathonUrl: text('hackathon_url').notNull(),
  hackathonName: text('hackathon_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const newsletterSubscribers = createTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  isVerified: boolean('is_verified').notNull().default(false),
  verificationToken: text('verification_token'),
  verificationTokenExpiresAt: timestamp('verification_token_expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
