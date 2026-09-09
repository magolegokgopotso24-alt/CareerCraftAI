import type {
  ResumeData,
  JobAnalysis,
  ATSResult,
  SkillEntry,
} from '../types';

const SIMULATE_DELAY = 900;

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Demo AI: improves a professional summary.
 * Never invents facts — only rewrites the user's text for clarity, impact, and professionalism.
 */
export async function improveSummary(original: string): Promise<string> {
  await delay(SIMULATE_DELAY);
  const sentences = original
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean);

  const improved = sentences
    .map((s) => {
      const lower = s.toLowerCase();
      if (lower.includes('looking for') || lower.includes('seeking')) {
        return `${s.trim()} Eager to contribute technical skills and a strong work ethic to a dynamic team.`;
      }
      if (lower.includes('passion')) {
        return s
          .replace(/passion for/i, 'dedicated to')
          .replace(/passionate about/i, 'dedicated to');
      }
      if (lower.includes('helped') || lower.includes('help')) {
        return s.replace(/\bhelp(ed)?\b/gi, 'assisted');
      }
      return s.trim();
    })
    .join('. ');

  return `${improved}. Proven ability to learn quickly, collaborate effectively, and deliver reliable results in fast-paced environments.`;
}

/**
 * Demo AI: transforms basic experience descriptions into stronger bullet points.
 * Never invents statistics, achievements, or technologies.
 */
export async function improveExperience(
  original: string
): Promise<string> {
  await delay(SIMULATE_DELAY);

  const lines = original
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const improved = lines.map((line) => {
    let result = line;

    const replacements: [RegExp, string][] = [
      [/\bhelped customers\b/gi, 'Assisted customers by responding to enquiries and providing clear, timely support'],
      [/\bhelped\b/gi, 'Assisted'],
      [/\banswered questions\b/gi, 'addressed customer enquiries'],
      [/\bset up\b/gi, 'Configured and deployed'],
      [/\binstalled software\b/gi, 'installed and maintained software'],
      [/\bassisted with basic\b/gi, 'Provided foundational'],
      [/\btroubleshooting\b/gi, 'systematic troubleshooting'],
      [/\bmaintained\b/gi, 'Maintained and monitored'],
      [/\bmanaged\b/gi, 'Coordinated and managed'],
      [/\bcreated\b/gi, 'Developed and implemented'],
      [/\bbuilt\b/gi, 'Designed and built'],
      [/\bworked on\b/gi, 'Contributed to'],
      [/\bresponsible for\b/gi, 'Managed'],
    ];

    for (const [pattern, replacement] of replacements) {
      result = result.replace(pattern, replacement);
    }

    // Capitalize first letter
    result = result.charAt(0).toUpperCase() + result.slice(1);

    return `\u2022 ${result}`;
  });

  return improved.join('\n');
}

/**
 * Demo AI: suggests skills based ONLY on user's existing skills and/or job description.
 */
export async function suggestSkills(
  existingSkills: SkillEntry[],
  jobDescription: string
): Promise<{ technical: string[]; soft: string[] }> {
  await delay(SIMULATE_DELAY);

  const existingNames = existingSkills.map((s) => s.name.toLowerCase());

  const jd = jobDescription.toLowerCase();

  const technicalPool = [
    'Python', 'SQL', 'Git', 'Windows Server', 'Active Directory',
    'Networking', 'TCP/IP', 'Linux', 'Help Desk Software', 'Hardware Troubleshooting',
    'Data Entry', 'Customer Service', 'Office 365', 'Cloud Computing', 'Cybersecurity Basics',
  ];

  const softPool = [
    'Time Management', 'Adaptability', 'Attention to Detail', 'Critical Thinking',
    'Collaboration', 'Active Listening', 'Patience', 'Conflict Resolution',
  ];

  const technical = technicalPool.filter((s) => {
    if (existingNames.includes(s.toLowerCase())) return false;
    if (!jd) return false;
    return jd.includes(s.toLowerCase()) || jd.includes(s.toLowerCase().split(' ')[0]);
  }).slice(0, 6);

  const soft = softPool.filter((s) => {
    if (existingNames.includes(s.toLowerCase())) return false;
    if (!jd) return false;
    return jd.includes(s.toLowerCase());
  }).slice(0, 4);

  // If no JD, suggest a couple of generic ones based on existing skill patterns
  if (technical.length === 0 && soft.length === 0) {
    const hasIT = existingSkills.some((s) =>
      ['html', 'css', 'javascript', 'python', 'microsoft office'].includes(s.name.toLowerCase())
    );
    if (hasIT) {
      return {
        technical: ['SQL', 'Git'].filter((s) => !existingNames.includes(s.toLowerCase())),
        soft: ['Adaptability', 'Attention to Detail'].filter(
          (s) => !existingNames.includes(s.toLowerCase())
        ),
      };
    }
  }

  return { technical, soft };
}

/**
 * Demo AI: analyzes a job description.
 */
export async function analyzeJobDescription(
  jobDescription: string
): Promise<JobAnalysis> {
  await delay(SIMULATE_DELAY + 400);

  const text = jobDescription;
  const lower = text.toLowerCase();

  const keywordPool = [
    'support', 'troubleshooting', 'network', 'customer service', 'communication',
    'teamwork', 'hardware', 'software', 'maintenance', 'documentation',
    'deployment', 'security', 'database', 'cloud', 'collaboration',
  ];

  const skillPool = [
    'Windows', 'Office 365', 'Active Directory', 'Networking', 'TCP/IP',
    'SQL', 'Python', 'Help Desk', 'ITIL', 'VPN',
  ];

  const techPool = [
    'Windows Server', 'Linux', 'Cisco', 'Azure', 'AWS', 'VMware',
    'PowerShell', 'Bash', 'DNS', 'DHCP',
  ];

  const softPool = [
    'Communication', 'Teamwork', 'Problem Solving', 'Time Management',
    'Adaptability', 'Attention to Detail',
  ];

  const responsibilitiesPool = [
    'Provide technical support to end users',
    'Maintain and troubleshoot IT systems',
    'Configure and deploy hardware and software',
    'Document support processes and solutions',
    'Monitor system performance and security',
  ];

  const qualificationsPool = [
    'Degree in Information Technology or related field',
    'CompTIA A+ or equivalent certification',
    'Experience with help desk systems',
    'Knowledge of networking fundamentals',
  ];

  const filterByPresence = (pool: string[]) =>
    pool.filter((k) => lower.includes(k.toLowerCase().split(' ')[0]));

  return {
    keywords: filterByPresence(keywordPool).slice(0, 8),
    requiredSkills: filterByPresence(skillPool).slice(0, 6),
    responsibilities: filterByPresence(responsibilitiesPool).slice(0, 5),
    qualifications: filterByPresence(qualificationsPool).slice(0, 4),
    technologies: filterByPresence(techPool).slice(0, 5),
    softSkills: filterByPresence(softPool).slice(0, 4),
  };
}

/**
 * Demo AI: ATS optimization analysis.
 */
export async function optimizeATS(
  resume: ResumeData,
  jobDescription: string
): Promise<ATSResult> {
  await delay(SIMULATE_DELAY + 500);

  const resumeText = [
    resume.personal.fullName,
    resume.personal.professionalTitle,
    resume.summary,
    resume.experience.map((e) => `${e.jobTitle} ${e.company} ${e.responsibilities}`).join(' '),
    resume.education.map((e) => `${e.qualification} ${e.institution}`).join(' '),
    resume.skills.map((s) => s.name).join(' '),
  ].join(' ').toLowerCase();

  const jd = jobDescription.toLowerCase();

  const keywordPool = [
    'support', 'troubleshooting', 'network', 'customer service', 'communication',
    'teamwork', 'hardware', 'software', 'maintenance', 'documentation',
    'deployment', 'security', 'database', 'cloud', 'collaboration',
    'windows', 'office', 'active directory', 'sql', 'python', 'tcp/ip',
  ];

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of keywordPool) {
    if (jd.includes(kw)) {
      if (resumeText.includes(kw)) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    }
  }

  // If JD is empty, return a generic result
  if (!jobDescription.trim()) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      recommendations: ['Enter a target job description to get an ATS analysis.'],
    };
  }

  let score = 40;
  score += Math.min(matched.length * 8, 40);
  if (resume.summary.length > 80) score += 5;
  if (resume.experience.length > 0) score += 5;
  if (resume.skills.length >= 5) score += 5;
  if (resume.education.length > 0) score += 5;
  score = Math.min(score, 100);

  const recommendations: string[] = [];
  if (resume.summary.length < 80)
    recommendations.push('Strengthen the professional summary — aim for 3\u20134 impactful sentences.');
  if (missing.length > 0)
    recommendations.push(`Add relevant technical skills: ${missing.slice(0, 4).join(', ')}.`);
  if (resume.experience.some((e) => e.responsibilities.length < 50))
    recommendations.push('Make experience descriptions more specific with action verbs.');
  if (resume.skills.length < 8)
    recommendations.push('Expand your skills section to improve keyword alignment.');
  if (matched.length < 5)
    recommendations.push('Improve keyword alignment with the target job description.');
  if (recommendations.length === 0)
    recommendations.push('Your resume is well-aligned with this job description. Review for any final improvements.');

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    recommendations,
  };
}

/**
 * Demo AI: Career Assistant chatbot.
 * Provides general advice and distinguishes from user-specific facts.
 */
export async function careerAssistantReply(
  userMessage: string,
  resumeData: ResumeData
): Promise<string> {
  await delay(SIMULATE_DELAY + 200);

  const msg = userMessage.toLowerCase();

  if (msg.includes('ats') || msg.includes('applicant tracking')) {
    return `ATS stands for Applicant Tracking System — software employers use to collect, sort, and filter resumes before a human ever sees them. Most ATS systems scan for keywords from the job description, check formatting readability, and rank candidates.\n\nKey tips:\n\u2022 Use standard section headings (Experience, Education, Skills)\n\u2022 Mirror keywords from the job description naturally — don't stuff them\n\u2022 Avoid complex formatting (tables, columns, graphics) that ATS can't parse\n\u2022 Use a clean, single-column layout\n\nThe ATS score in CareerCraft AI is an estimate to help you improve alignment — it does not guarantee your resume will pass a specific employer's system.\n\nWould you like me to help you optimize your resume for a specific job description?`;
  }

  if (msg.includes('interview')) {
    return `Here are some strategies for interview preparation:\n\n1. **Research the company** — understand their mission, products, and recent news.\n2. **Review the job description** — prepare examples that match each requirement.\n3. **Practice common questions** — "Tell me about yourself," "Why this role?", "Strengths/weaknesses."\n4. **Use the STAR method** — Situation, Task, Action, Result — for behavioral questions.\n5. **Prepare your own questions** — shows genuine interest and engagement.\n6. **Dress appropriately** and arrive early (or test your tech for virtual interviews).\n\nWould you like me to help you prepare specific answers based on your resume?`;
  }

  if (msg.includes('improve') && (msg.includes('resume') || msg.includes('summary') || msg.includes('experience'))) {
    if (msg.includes('summary')) {
      return `To improve your professional summary:\n\n1. Keep it 3\u20134 sentences (50\u2013150 words)\n2. Lead with your professional identity and key strength\n3. Mention relevant skills and what you bring to an employer\n4. End with your career goal — aligned to the role you're applying for\n\nYour current summary: "${resumeData.summary.slice(0, 100)}..."\n\nYou can use the "Improve with AI" button in the Summary section of the Resume Builder to get a suggested improvement.\n\nWould you like more specific advice?`;
    }
    if (msg.includes('experience')) {
      return `To improve your experience descriptions:\n\n1. Start each bullet with a strong action verb (Managed, Developed, Coordinated, Delivered)\n2. Be specific — what did you do, how, and what was the result?\n3. Quantify where you genuinely can (numbers of users, tickets resolved, time saved)\n4. Focus on achievements, not just duties\n5. Keep each bullet to one line if possible\n\nImportant: Only include achievements that are factually true — never invent statistics or responsibilities.\n\nUse the "Improve with AI" button on each experience entry to get a suggested rewrite.`;
    }
    return `Here are the most impactful ways to improve your resume:\n\n1. **Tailor it** to each job — mirror keywords from the description\n2. **Strengthen your summary** — make it specific and impactful\n3. **Use action verbs** in experience bullets\n4. **Quantify achievements** where you genuinely can\n5. **Keep it clean** — consistent formatting, no errors\n6. **Check ATS alignment** using the ATS Optimizer\n\nWould you like me to dive deeper into any of these?`;
  }

  if (msg.includes('skill') && msg.includes('highlight')) {
    return `To decide which skills to highlight:\n\n1. **Match the job description** — prioritize skills the employer explicitly asks for\n2. **Be authentic** — only highlight skills you genuinely possess\n3. **Balance technical and soft skills** — employers value both\n4. **Order by relevance** — put the most relevant skills first\n5. **Use the Job Description Analysis** in the Resume Builder to see what the employer is looking for\n\nBased on your current skills: ${resumeData.skills.map((s) => s.name).join(', ')}\n\nWould you like me to suggest additional skills based on a target job description?`;
  }

  if (msg.includes('cover letter')) {
    return `Cover letter guidance:\n\n1. **Address a specific person** if you can find the hiring manager's name\n2. **Open strong** — mention the role and why you're excited about it\n3. **Connect your experience** to the job requirements — don't just repeat your resume\n4. **Show genuine interest** in the company specifically\n5. **Close with a call to action** — express enthusiasm for an interview\n6. **Keep it to one page** — 3\u20134 concise paragraphs\n\nImportant: Only reference experiences and skills that are genuinely yours. Never fabricate qualifications.`;
  }

  if (msg.includes('skill') && (msg.includes('suggest') || msg.includes('add'))) {
    return `I can suggest skills based on your target job description. Here's how:\n\n1. Go to the Resume Builder \u2192 Skills section\n2. Enter your target job description in the Job Target section\n3. Click "Suggest Skills with AI"\n4. Review each suggestion and click "Add" or "Reject"\n\nImportant: Only add skills you genuinely possess. The suggestions are based on the job description — they may not all apply to you.`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hello! I'm the CareerCraft Career Assistant. I can help you with:\n\n\u2022 Resume improvement tips\n\u2022 Interview preparation\n\u2022 Cover letter guidance\n\u2022 ATS questions\n\u2022 Job description analysis\n\u2022 Skill suggestions\n\u2022 Career advice\n\nWhat would you like help with today?`;
  }

  return `That's a great question. Here's my advice:\n\nWhen it comes to resumes and job applications, the most important principles are:\n\n1. **Be authentic** — only claim skills and experiences that are genuinely yours\n2. **Tailor your application** to each specific role\n3. **Use clear, professional language** with strong action verbs\n4. **Quantify your impact** where you honestly can\n5. **Review everything** before submitting\n\nCould you tell me more about what you're trying to accomplish? I can give you more specific guidance on resumes, interviews, cover letters, ATS optimization, or career strategy.`;
}

export { uid };
