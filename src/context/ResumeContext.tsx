import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  ResumeData,
  PersonalDetails,
  ExperienceEntry,
  EducationEntry,
  CertificateEntry,
  ProjectEntry,
  SkillEntry,
  JobTarget,
  JobAnalysis,
  ATSResult,
  ResumeTemplate,
} from '../types';
import { loadResume, saveResume, resetResume, demoResumeData } from '../lib/storage';
import { uid } from '../lib/ai';

interface ResumeContextValue {
  data: ResumeData;
  updatePersonal: (personal: PersonalDetails) => void;
  updateSummary: (summary: string) => void;
  setImprovedSummary: (improved: string | null) => void;
  acceptSummaryAI: (accepted: boolean) => void;
  addExperience: (entry?: Partial<ExperienceEntry>) => void;
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  setImprovedExperience: (id: string, improved: string | null) => void;
  acceptExperienceAI: (id: string, accepted: boolean) => void;
  addEducation: (entry?: Partial<EducationEntry>) => void;
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;
  addCertificate: (entry?: Partial<CertificateEntry>) => void;
  updateCertificate: (id: string, patch: Partial<CertificateEntry>) => void;
  removeCertificate: (id: string) => void;
  addProject: (entry?: Partial<ProjectEntry>) => void;
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;
  addSkill: (skill: Omit<SkillEntry, 'id'>) => void;
  removeSkill: (id: string) => void;
  updateJobTarget: (target: JobTarget) => void;
  setJobAnalysis: (analysis: JobAnalysis | null) => void;
  setAtsResult: (result: ATSResult | null) => void;
  setTemplate: (template: ResumeTemplate) => void;
  toggleChecklist: (index: number) => void;
  resetAll: () => void;
  completionPercentage: number;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(() => loadResume());

  useEffect(() => {
    saveResume(data);
  }, [data]);

  const updatePersonal = useCallback((personal: PersonalDetails) => {
    setData((d) => ({ ...d, personal }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setData((d) => ({ ...d, summary }));
  }, []);

  const setImprovedSummary = useCallback((improved: string | null) => {
    setData((d) => ({ ...d, improvedSummary: improved }));
  }, []);

  const acceptSummaryAI = useCallback((accepted: boolean) => {
    setData((d) => ({ ...d, summaryAiAccepted: accepted }));
  }, []);

  const addExperience = useCallback((entry?: Partial<ExperienceEntry>) => {
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        {
          id: uid('exp'),
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          responsibilities: '',
          improvedResponsibilities: null,
          aiAccepted: false,
          ...entry,
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback((id: string, patch: Partial<ExperienceEntry>) => {
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      experience: d.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const setImprovedExperience = useCallback((id: string, improved: string | null) => {
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === id ? { ...e, improvedResponsibilities: improved } : e
      ),
    }));
  }, []);

  const acceptExperienceAI = useCallback((id: string, accepted: boolean) => {
    setData((d) => ({
      ...d,
      experience: d.experience.map((e) =>
        e.id === id ? { ...e, aiAccepted: accepted } : e
      ),
    }));
  }, []);

  const addEducation = useCallback((entry?: Partial<EducationEntry>) => {
    setData((d) => ({
      ...d,
      education: [
        ...d.education,
        {
          id: uid('edu'),
          qualification: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
          achievements: '',
          ...entry,
        },
      ],
    }));
  }, []);

  const updateEducation = useCallback((id: string, patch: Partial<EducationEntry>) => {
    setData((d) => ({
      ...d,
      education: d.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      education: d.education.filter((e) => e.id !== id),
    }));
  }, []);

  const addCertificate = useCallback((entry?: Partial<CertificateEntry>) => {
    setData((d) => ({
      ...d,
      certificates: [
        ...d.certificates,
        {
          id: uid('cert'),
          name: '',
          issuer: '',
          date: '',
          ...entry,
        },
      ],
    }));
  }, []);

  const updateCertificate = useCallback((id: string, patch: Partial<CertificateEntry>) => {
    setData((d) => ({
      ...d,
      certificates: d.certificates.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const removeCertificate = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      certificates: d.certificates.filter((c) => c.id !== id),
    }));
  }, []);

  const addProject = useCallback((entry?: Partial<ProjectEntry>) => {
    setData((d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: uid('proj'),
          name: '',
          description: '',
          technologies: '',
          ...entry,
        },
      ],
    }));
  }, []);

  const updateProject = useCallback((id: string, patch: Partial<ProjectEntry>) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      projects: d.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill: Omit<SkillEntry, 'id'>) => {
    setData((d) => {
      if (d.skills.some((s) => s.name.toLowerCase() === skill.name.toLowerCase())) {
        return d;
      }
      return { ...d, skills: [...d.skills, { ...skill, id: uid('sk') }] };
    });
  }, []);

  const removeSkill = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      skills: d.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const updateJobTarget = useCallback((target: JobTarget) => {
    setData((d) => ({ ...d, jobTarget: target }));
  }, []);

  const setJobAnalysis = useCallback((analysis: JobAnalysis | null) => {
    setData((d) => ({ ...d, jobAnalysis: analysis }));
  }, []);

  const setAtsResult = useCallback((result: ATSResult | null) => {
    setData((d) => ({ ...d, atsResult: result }));
  }, []);

  const setTemplate = useCallback((template: ResumeTemplate) => {
    setData((d) => ({ ...d, template }));
  }, []);

  const toggleChecklist = useCallback((index: number) => {
    setData((d) => ({
      ...d,
      checklist: d.checklist.map((c, i) => (i === index ? !c : c)),
    }));
  }, []);

  const resetAll = useCallback(() => {
    setData(resetResume());
  }, []);

  const completionPercentage = (() => {
    const checks = [
      data.personal.fullName.length > 0,
      data.personal.professionalTitle.length > 0,
      data.personal.email.length > 0,
      data.summary.length > 20,
      data.experience.length > 0,
      data.education.length > 0,
      data.skills.length >= 3,
      data.jobTarget.targetJobTitle.length > 0,
    ];
    const filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  })();

  const value: ResumeContextValue = {
    data,
    updatePersonal,
    updateSummary,
    setImprovedSummary,
    acceptSummaryAI,
    addExperience,
    updateExperience,
    removeExperience,
    setImprovedExperience,
    acceptExperienceAI,
    addEducation,
    updateEducation,
    removeEducation,
    addCertificate,
    updateCertificate,
    removeCertificate,
    addProject,
    updateProject,
    removeProject,
    addSkill,
    removeSkill,
    updateJobTarget,
    setJobAnalysis,
    setAtsResult,
    setTemplate,
    toggleChecklist,
    resetAll,
    completionPercentage,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}

export { demoResumeData };
