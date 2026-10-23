// ============================================================================
// SINGLE SOURCE OF TRUTH for all portfolio content.
// Edit this file to update the site — every section below reads from here.
// Nothing else in the codebase should hold hardcoded personal/project copy.
// ============================================================================

import type {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  NavItem,
  PersonalInfo,
  Project,
  SectionVisibility,
  SkillCategory,
} from './types';

// ----------------------------------------------------------------------------
// PERSONAL
// ----------------------------------------------------------------------------
export const personal: PersonalInfo = {
  name: 'Duppala Satwik',
  initials: 'DS',
  title: 'Full-Stack Developer',
  headlineLead: 'Building the future, one experience',
  headlineAccent: 'at a time.',
  subHeadline: "I design and ship full-stack products — from AI-powered retail tools to developer platforms.",
  intro:
    "I'm a full-stack developer and CS student who ships fast — three hackathon wins, a published paper, and a habit of turning rough ideas into software that works.",
  aboutCallouts: [
    {
      id: 'build',
      label: 'What I build',
      text: "End-to-end products — from an AI retail platform used by real shop owners to a routing engine that cut fuel use 14% across a 1,000-vehicle fleet.",
    },
    {
      id: 'focus',
      label: 'Where I focus',
      text: "Practical software and applied AI — a Gemini-powered retail assistant, and an audit engine that runs 70+ checks on how AI systems read a website.",
    },
    {
      id: 'drive',
      label: 'What drives me',
      text: 'Competing and placing: Top 8 of 80,000+ teams at Adobe’s University Hackathon, 2nd place among 1,500+ at AI for All — plus 300+ solved DSA problems along the way.',
    },
  ],
  profileImage: '/images/profile/satwik.webp',
  resumeUrl: undefined,
  email: 'satwikduppala18@gmail.com',
  location: 'Gwalior, India',
  availability: {
    status: 'available',
    label: 'Open to opportunities',
  },
  socials: [
    { label: 'GitHub', url: 'https://github.com/Satwik2529', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/satwik2529dsk', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:satwikduppala18@gmail.com', icon: 'mail' },
  ],
};

// ----------------------------------------------------------------------------
// NAVIGATION
// ----------------------------------------------------------------------------
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// ----------------------------------------------------------------------------
// SECTION VISIBILITY — flip to true once you add real content for a section.
// ----------------------------------------------------------------------------
export const sectionVisibility: SectionVisibility = {
  hero: true,
  about: true,
  skills: true,
  projects: true,
  experience: false,
  education: true,
  achievements: true,
  contact: true,
};

// ----------------------------------------------------------------------------
// PROJECTS — add an object here and its card appears automatically.
// Drop images at /public/images/projects/<slug>/<name>.webp and reference
// them as "/images/projects/<slug>/<name>.webp". Missing image/github/
// liveDemo fields are hidden gracefully rather than shown broken.
// `stats` (optional) renders as animated count-up chips on the card.
// ----------------------------------------------------------------------------
export const projects: Project[] = [
  {
    id: 'smart-kirana',
    title: 'Smart Kirana',
    subtitle: 'BizNova — AI-Integrated Retail Platform',
    description:
      'A full-stack MERN platform for small retailers to manage inventory, sales, expenses, and profit reports — with separate roles for retailers, customers, and wholesalers. Winner (2nd place) at AI for All Hackathon 2026, among 1,500+ teams.',
    highlights: [
      'Winner — 2nd place among 1,500+ teams at AI for All Hackathon 2026 (AI Impact Summit)',
      '20+ REST APIs with JWT auth, role-based access, rate limiting, and parallel queries',
      '13 MongoDB collections with 35+ compound and geospatial indexes, aggregation pipelines, and $near geo-queries',
      'Gemini 2.5 Flash-powered AI assistant and bill scanner that updates inventory from photos — plus voice and text commands in English, Hindi, and Telugu',
    ],
    stats: [
      { label: 'REST APIs', value: '20+', target: 20, suffix: '+' },
      { label: 'DB Collections', value: '13', target: 13 },
      { label: 'Indexes', value: '35+', target: 35, suffix: '+' },
    ],
    award: 'Winner — AI for All Hackathon 2026',
    awardBadge: 'Winner',
    role: 'Full-Stack Developer',
    image: '/images/projects/smart-kirana/hero.webp',
    gallery: [
      '/images/projects/smart-kirana/hero.webp',
      '/images/projects/smart-kirana/dashboard.webp',
      '/images/projects/smart-kirana/ai-assistant.webp',
      '/images/projects/smart-kirana/login.webp',
    ],
    demoVideo: 'https://drive.google.com/file/d/1bCG0lSsCXPHt8xEL76wy3rCVLkqEGiLq/view?usp=drivesdk',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API'],
    category: 'Full Stack',
    github: '',
    liveDemo: 'https://smart-kirana-beta.vercel.app/',
    featured: true,
    status: 'Completed',
    accent: 'violet',
    year: 'Oct 2025 – Apr 2026',
  },
  {
    id: 'codepulse',
    title: 'CodePulse',
    subtitle: 'Brand AI Readiness Audit — Adobe University Hackathon 2026',
    description:
      "A Python audit engine that scores how ready a website is for AI search visibility — crawl access, rendering, structured data, freshness, and engagement — then produces a prioritized, evidence-backed action plan. Grand Finalist at Adobe's University Hackathon 2026 — top 8 of 80,000+ teams nationwide.",
    highlights: [
      'Grand Finalist — top 8 of 80,000+ teams nationwide (top 0.01%) at Adobe University Hackathon 2026',
      '9 modular Agent Skills running 70+ checks across 5 categories, in a ~10K-line Python engine',
      'Read-only crawler that respects robots.txt, discovers pages from sitemaps and links, and diffs raw HTML against the browser-rendered version',
      'Severity scoring (impact × reach × certainty) ranks every finding into a step-by-step fix list, each one cited to a page URL',
      '635+ unit tests across 35 test websites, validated on live sites including adobe.com',
    ],
    stats: [
      { label: 'Automated Checks', value: '70+', target: 70, suffix: '+' },
      { label: 'Unit Tests', value: '635+', target: 635, suffix: '+' },
      { label: 'Teams Nationwide', value: '80K+', target: 80, suffix: 'K+' },
    ],
    award: 'Top 8 — Adobe University Hackathon 2026 (Grand Finalist, 80,000+ teams)',
    awardBadge: 'Top 8',
    role: 'Full-Stack Developer',
    image: '/images/projects/codepulse/hero.webp',
    gallery: [
      '/images/projects/codepulse/hero.webp',
      '/images/projects/codepulse/discovery-gates.webp',
      '/images/projects/codepulse/search-simulator.webp',
      '/images/projects/codepulse/action-bands.webp',
    ],
    demoVideo: 'https://drive.google.com/file/d/1Zd9TsB8PwBaSkVAr_2JGWYunaBqVW_bM/view?usp=drivesdk',
    technologies: ['Python', 'Playwright', 'Web Crawling', 'JSON-LD', 'Unit Testing'],
    category: 'AI / Hackathon',
    github: '',
    liveDemo: 'https://d2jyg5ufpeg9rh.cloudfront.net',
    featured: true,
    status: 'Completed',
    accent: 'cyan',
    year: 'Aug – Oct 2026',
  },
  {
    id: 'traffic-ai',
    title: 'Traffic AI',
    subtitle: 'Intelligent Multi-Depot Vehicle Routing (FleetMaster Pro)',
    description:
      "Reproduced an IEEE T-ITS 2025 routing model on 1,000 Beijing taxis' real GPS logs, then improved it — swapping greedy stop ordering for Ant Colony Optimization and adding time-dependent Dijkstra for live traffic — visualized in a real-time fleet dashboard (FleetMaster Pro).",
    highlights: [
      "Processed 1.3M+ GPS points and 18K+ trips from Microsoft's T-Drive Beijing taxi dataset",
      'Ant Colony Optimization cut route distance 13% and fuel use 14% across 1,000 vehicles vs. the greedy baseline',
      'Time-dependent Dijkstra using hourly traffic speeds cut travel time 18% vs. the base model',
    ],
    stats: [
      { label: 'Shorter Routes', value: '13%', target: 13, suffix: '%' },
      { label: 'Less Fuel Use', value: '14%', target: 14, suffix: '%' },
      { label: 'Faster Travel Time', value: '18%', target: 18, suffix: '%' },
    ],
    role: 'Full-Stack Developer',
    image: '/images/projects/fleetmaster/routing.webp',
    gallery: [
      '/images/projects/fleetmaster/routing.webp',
      '/images/projects/fleetmaster/map-overview.webp',
    ],
    demoVideo: 'https://drive.google.com/file/d/12ugDGdpYn19H6S_v6wBNHi9Q8BredmN2/view?usp=drivesdk',
    technologies: ['Python', 'Pandas', 'NumPy', 'Ant Colony Optimization', 'Dijkstra'],
    category: 'Traffic AI',
    github: '',
    liveDemo: 'https://fleetmaster-api.vercel.app/',
    featured: true,
    status: 'Completed',
    accent: 'coral',
    year: 'May – Jul 2026',
  },
];

// ----------------------------------------------------------------------------
// SKILLS — mirrors the Technical Skills section of the résumé exactly.
// ----------------------------------------------------------------------------
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['C++', 'C', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    accent: 'cyan',
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Prisma ORM'],
    accent: 'coral',
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL'],
    accent: 'lime',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['HTML5', 'CSS3', 'React.js', 'Next.js', 'Tailwind CSS', 'Vite'],
    accent: 'violet',
  },
  {
    id: 'ai-data',
    label: 'AI & Data',
    items: ['Machine Learning', 'Generative AI', 'Gemini API', 'Pandas', 'NumPy', 'Matplotlib'],
    accent: 'amber',
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'Playwright', 'CI/CD'],
    accent: 'cyan',
  },
];

// ----------------------------------------------------------------------------
// EXPERIENCE — leave empty and keep `sectionVisibility.experience: false`
// until you have real roles to list. Shape shown for when you do.
// ----------------------------------------------------------------------------
export const experience: ExperienceItem[] = [];

// ----------------------------------------------------------------------------
// EDUCATION
// ----------------------------------------------------------------------------
export const education: EducationItem[] = [
  {
    id: 'iiitm-gwalior',
    degree: 'Integrated B.Tech + M.Tech, Information Technology',
    institution: 'ABV–Indian Institute of Information Technology and Management (IIITM Gwalior)',
    period: 'Aug 2023 – May 2028',
    location: 'Gwalior, India',
    description:
      'Coursework: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering, Machine Learning, Compiler Design.',
    score: 'CGPA 8.17 / 10',
  },
];

// ----------------------------------------------------------------------------
// ACHIEVEMENTS / HACKATHONS / PUBLICATIONS / CODING PROFILES
// `url` left blank where the résumé only gave a link label (e.g.
// "[Certificate]", "[Profile]") without the underlying URL — add the real
// link here when available; the button hides itself until then.
// ----------------------------------------------------------------------------
export const achievements: AchievementItem[] = [
  {
    id: 'adobe-hackathon',
    title: 'Grand Finalist — Top 8 of 80,000+ teams nationwide (top 0.01%)',
    issuer: 'Adobe University Hackathon 2026',
    date: '2026',
    description: 'Brand AI Readiness Audit — scores websites for AI search visibility and generates prioritized fixes.',
    category: 'hackathon',
    url: 'https://drive.google.com/file/d/1dpaOpgwkXZeNkrlwUCKY5zFaKuWSa2Oy/view?usp=drivesdk',
    highlightValue: 'Top 8',
  },
  {
    id: 'ai-for-all',
    title: 'Winner — 2nd Place among 1,500+ teams',
    issuer: 'AI for All Hackathon 2026, AI Impact Summit',
    date: '2026',
    description: 'Upgraded BizNova, an AI-integrated retail platform for small shop owners.',
    category: 'hackathon',
    url: 'https://drive.google.com/file/d/13CNExGzjym1_aMmFVmFQVblSjdwc33BR/view?usp=drivesdk',
  },
  {
    id: 'hacksagon',
    title: 'Top Performer — 1st of 2,600+ teams',
    issuer: 'HACKSAGON 2026',
    date: '2026',
    description: 'Final BizNova release, featuring an AI bill scanner, voice commands in English/Hindi/Telugu, and nearby-wholesaler search.',
    category: 'hackathon',
    url: 'https://drive.google.com/file/d/1k17t6nJAtbrwRqxJK76x6_v5dvx6vp9F/view?usp=drivesdk',
  },
  {
    id: 'openai-nxtwave',
    title: 'Finalist',
    issuer: 'OpenAI x NxtWave Buildathon 2025',
    date: '2025',
    description: 'First prototype of BizNova, an AI-powered inventory and sales platform for small retailers.',
    category: 'hackathon',
    url: 'https://drive.google.com/file/d/1AbTWec79p1hDl8pGUi3lG-9ziW51uV7A/view?usp=drivesdk',
  },
  {
    id: 'pakdd',
    title: 'Co-authored "HiBias: A Nine-Faceted Bias Annotation Dataset for Media Bias Detection in Hindi"',
    issuer: 'PAKDD 2026',
    date: '2026',
    category: 'publication',
    url: 'https://openreview.net/forum?id=mpmGNudGa0',
  },
  {
    id: 'leetcode',
    title: 'LeetCode',
    issuer: '300+ DSA problems solved',
    description: 'Peak contest rating of 1500 across 10 rated contests.',
    category: 'coding-profile',
    url: 'https://leetcode.com/u/satwik2529/',
  },
  {
    id: 'codechef',
    title: 'CodeChef',
    issuer: '2-Star rating',
    description: 'Highest rating of 1431.',
    category: 'coding-profile',
    url: 'https://www.codechef.com/users/satwik2529',
  },
];
