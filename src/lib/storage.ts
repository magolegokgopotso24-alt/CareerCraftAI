import type { ResumeData } from './types';

const STORAGE_KEY = 'careercraft-resume-v1';

export const demoResumeData: ResumeData = {
  personal: {
    fullName: 'Alex Mokoena',
    professionalTitle: 'Junior IT Graduate',
    email: 'alex.mokoena@example.com',
    phone: '+27 71 234 5678',
    location: 'Johannesburg, South Africa',
    linkedin: 'linkedin.com/in/alexmokoena',
    portfolio: 'alexmokoena.dev',
  },
  summary:
    'Recent IT graduate with a passion for technology and problem solving. Looking for an opportunity to apply my skills in a professional environment and grow within a supportive team.',
  improvedSummary: null,
  summaryAiAccepted: false,
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'IT Support Intern',
      company: 'TechSolutions Pty Ltd',
      location: 'Johannesburg',
      startDate: '2024-01',
      endDate: '2024-06',
      current: false,
      responsibilities:
        'Helped customers and answered questions. Set up computers and installed software. Assisted with basic network troubleshooting.',
      improvedResponsibilities: null,
      aiAccepted: false,
    },
  ],
  education: [
    {
      id: 'edu-1',
      qualification: "Bachelor's Degree in Information Technology",
      institution: 'University of Johannesburg',
      location: 'Johannesburg',
      startDate: '2021-02',
      endDate: '2023-11',
      description: 'Specialisation in Software Development and Network Systems.',
      achievements: 'Dean\u2019s List (2022). Top 10% of graduating class.',
    },
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'CompTIA A+ Certification',
      issuer: 'CompTIA',
      date: '2023-09',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Campus Help Desk Portal',
      description:
        'Built a web-based ticketing system for campus IT support using HTML, CSS, and JavaScript.',
      technologies: 'HTML, CSS, JavaScript',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'HTML', category: 'technical', aiSuggested: false },
    { id: 'sk-2', name: 'CSS', category: 'technical', aiSuggested: false },
    { id: 'sk-3', name: 'JavaScript', category: 'technical', aiSuggested: false },
    { id: 'sk-4', name: 'Microsoft Office', category: 'technical', aiSuggested: false },
    { id: 'sk-5', name: 'Problem Solving', category: 'soft', aiSuggested: false },
    { id: 'sk-6', name: 'Communication', category: 'soft', aiSuggested: false },
    { id: 'sk-7', name: 'Teamwork', category: 'soft', aiSuggested: false },
  ],
  jobTarget: {
    targetJobTitle: 'Junior IT Support',
    targetCompany: '',
    jobDescription: '',
  },
  jobAnalysis: null,
  atsResult: null,
  template: 'modern',
  checklist: [false, false, false, false, false, false, false],
};

export function loadResume(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(demoResumeData);
    const parsed = JSON.parse(raw) as ResumeData;
    return { ...structuredClone(demoResumeData), ...parsed };
  } catch {
    return structuredClone(demoResumeData);
  }
}

export function saveResume(data: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function resetResume(): ResumeData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return structuredClone(demoResumeData);
}
