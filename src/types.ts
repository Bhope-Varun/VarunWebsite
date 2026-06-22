export interface Project {
  title: string;
  category: 'Full-Stack' | 'AI / ML' | 'Creative';
  description: string;
  details: string[];
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  stats: string;
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SentMessage {
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  email: string;
  phone?: string;
  profilePictureUrl?: string;
  location: string;
  bio: string;
  yearsExperience: number;
  projectsCount: number;
  weeklyContributions: number;
  githubUrl: string;
  linkedinUrl: string;
  projects: Project[];
  timeline: TimelineItem[];
  skills: Array<{ category: string; skills: string[] }>;
}
