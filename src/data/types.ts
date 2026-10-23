// Centralized type definitions for the portfolio content system.
// Edit content in `data.ts` — these types just keep it honest.

export type AccentKey = 'cyan' | 'violet' | 'coral' | 'lime' | 'amber';

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'external' | 'instagram' | 'leetcode';
}

export interface AboutCallout {
  id: string;
  label: string;
  text: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  // Split so the hero can keep the accent phrase glued together as one
  // unbreakable unit, instead of naively wrapping word-by-word (which
  // orphans short connector words like "a" at a line break).
  headlineLead: string;
  headlineAccent: string;
  subHeadline: string;
  intro: string;
  aboutCallouts: AboutCallout[];
  profileImage?: string;
  resumeUrl?: string;
  email: string;
  location?: string;
  availability?: {
    status: 'available' | 'open' | 'unavailable';
    label: string;
  };
  socials: SocialLink[];
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Prototype' | 'Archived';

export interface ProjectStat {
  label: string;
  value: string;
  // Numeric target for the count-up animation (e.g. 13 for "13%"); the
  // displayed `value` string carries the real formatting (%, +, x, etc).
  target: number;
  prefix?: string;
  suffix?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  stats?: ProjectStat[];
  role?: string;
  image?: string;
  gallery?: string[];
  technologies: string[];
  category: string;
  github?: string;
  liveDemo?: string;
  featured: boolean;
  status: ProjectStatus;
  accent: AccentKey;
  year?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
  accent: AccentKey;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  bullets?: string[];
  tech?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  description?: string;
  score?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
  url?: string;
  category: 'hackathon' | 'award' | 'certification' | 'coding-profile' | 'publication';
  // Short display value (e.g. "Top 8") for the large banner treatment
  // when this item is first in the achievements array.
  highlightValue?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  education: boolean;
  achievements: boolean;
  contact: boolean;
}
