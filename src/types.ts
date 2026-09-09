export interface PersonalDetails {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
  improvedResponsibilities: string | null;
  aiAccepted: boolean;
}

export interface EducationEntry {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
}

export interface CertificateEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  category: 'technical' | 'soft';
  aiSuggested: boolean;
}

export interface JobTarget {
  targetJobTitle: string;
  targetCompany: string;
  jobDescription: string;
}

export interface JobAnalysis {
  keywords: string[];
  requiredSkills: string[];
  responsibilities: string[];
  qualifications: string[];
  technologies: string[];
  softSkills: string[];
}

export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
}

export interface ResumeData {
  personal: PersonalDetails;
  summary: string;
  improvedSummary: string | null;
  summaryAiAccepted: boolean;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certificates: CertificateEntry[];
  projects: ProjectEntry[];
  skills: SkillEntry[];
  jobTarget: JobTarget;
  jobAnalysis: JobAnalysis | null;
  atsResult: ATSResult | null;
  template: ResumeTemplate;
  checklist: boolean[];
}

export type ResumeTemplate = 'modern' | 'classic' | 'minimal';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type PageRoute =
  | 'home'
  | 'dashboard'
  | 'builder'
  | 'assistant'
  | 'ats'
  | 'templates'
  | 'prompt-strategy'
  | 'productivity'
  | 'responsible-ai'
  | 'about';
