import type { ComponentType } from 'react';
import {
  SiCplusplus,
  SiC,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiGooglegemini,
  SiPandas,
  SiNumpy,
  SiGit,
  SiGithub,
  SiPostman,
  SiLeetcode,
  SiCodechef,
  SiJson,
} from 'react-icons/si';
import {
  Database,
  Network,
  BrainCircuit,
  Sparkles,
  LineChart,
  FlaskConical,
  Workflow,
  Bot,
  Route,
  Radar,
  Code2,
} from 'lucide-react';

type IconComponent = ComponentType<{ size?: number; className?: string; color?: string }>;

interface TechIconEntry {
  Icon: IconComponent;
  color: string;
}

// Technology name (as written in data.ts) -> brand logo + its real brand
// color. Rendered on a light badge in TechBadge, so even near-black marks
// (Express, Next.js, GitHub) stay legible regardless of page theme.
// Anything without an official mark falls back to a neutral line icon
// rather than guessing a logo that doesn't exist.
export const techIconMap: Record<string, TechIconEntry> = {
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  C: { Icon: SiC, color: '#A8B9CC' },
  Python: { Icon: SiPython, color: '#3776AB' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  SQL: { Icon: Database, color: '#64748B' },
  'Node.js': { Icon: SiNodedotjs, color: '#339933' },
  'Express.js': { Icon: SiExpress, color: '#000000' },
  Express: { Icon: SiExpress, color: '#000000' },
  'REST APIs': { Icon: Network, color: '#64748B' },
  'JWT Authentication': { Icon: SiJsonwebtokens, color: '#FB015B' },
  'Prisma ORM': { Icon: SiPrisma, color: '#2D3748' },
  Prisma: { Icon: SiPrisma, color: '#2D3748' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  HTML5: { Icon: SiHtml5, color: '#E34F26' },
  CSS3: { Icon: SiCss, color: '#1572B6' },
  React: { Icon: SiReact, color: '#149ECA' },
  'React.js': { Icon: SiReact, color: '#149ECA' },
  'Next.js': { Icon: SiNextdotjs, color: '#000000' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  Vite: { Icon: SiVite, color: '#646CFF' },
  'Machine Learning': { Icon: BrainCircuit, color: '#64748B' },
  'Generative AI': { Icon: Sparkles, color: '#64748B' },
  'Gemini API': { Icon: SiGooglegemini, color: '#4285F4' },
  Pandas: { Icon: SiPandas, color: '#150458' },
  NumPy: { Icon: SiNumpy, color: '#4D77CF' },
  Matplotlib: { Icon: LineChart, color: '#64748B' },
  Git: { Icon: SiGit, color: '#F05032' },
  GitHub: { Icon: SiGithub, color: '#181717' },
  Postman: { Icon: SiPostman, color: '#FF6C37' },
  Playwright: { Icon: FlaskConical, color: '#64748B' },
  'CI/CD': { Icon: Workflow, color: '#64748B' },
  'Web Crawling': { Icon: Radar, color: '#64748B' },
  'JSON-LD': { Icon: SiJson, color: '#000000' },
  'JSON Schema': { Icon: SiJson, color: '#000000' },
  'Unit Testing': { Icon: FlaskConical, color: '#64748B' },
  'Agent Skills': { Icon: Bot, color: '#64748B' },
  'Ant Colony Optimization': { Icon: Route, color: '#64748B' },
  Dijkstra: { Icon: Route, color: '#64748B' },
  LeetCode: { Icon: SiLeetcode, color: '#FFA116' },
  CodeChef: { Icon: SiCodechef, color: '#5B4638' },
};

export function getTechIcon(name: string): TechIconEntry {
  return techIconMap[name] ?? { Icon: Code2, color: '#64748B' };
}
