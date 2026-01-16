// Resume content data - single source of truth
// Import this in both resume.astro and resume/pdf.astro

export interface ResumeRole {
  title: string;
  company: string;
  subtitle: string;
  dates: string;
  achievements: string[];
  tech: string;
}

export interface ResumeEducation {
  degree: string;
  school: string;
  date?: string;
  note?: string;
}

export interface ResumeSkill {
  category: string;
  items: string;
}

export const resumeData = {
  name: 'Adam LaCasse',
  headline: 'Senior Software Engineer — Client Platforms & Web Architecture',
  location: 'Atkinson, NH (Remote, US)',
  phone: '617-407-3254',
  email: 'adamlacasse@outlook.com',
  website: 'adamlacasse.dev',
  github: 'https://github.com/adamlacasse',
  linkedin: 'https://www.linkedin.com/in/adamlacasse/',

  summary: `Senior software engineer with <strong>6+ years of experience</strong> building foundational web platforms, reusable UI architecture, and client/server APIs for large, globally distributed user bases. Strong technical judgment in ambiguous environments—balancing business needs, performance, and long-term maintainability while enabling product teams through <strong>ergonomic frameworks and stable contracts</strong>.`,

  skills: [
    {
      category: 'Client Architecture',
      items: 'TypeScript, React, component systems, state management',
    },
    {
      category: 'APIs',
      items: 'REST, GraphQL, client/server contracts',
    },
    {
      category: 'Platforms',
      items: 'Node.js, Java, AWS',
    },
    {
      category: 'Engineering',
      items: 'CI/CD, testing, performance, reliability, debugging',
    },
    {
      category: 'Collaboration',
      items: 'cross-team design, mentorship, stakeholder communication',
    },
  ] as ResumeSkill[],

  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Liberty Mutual Insurance',
      subtitle: 'Enterprise web applications for ~50,000 international users',
      dates: 'Jun 2019 – Present',
      achievements: [
        'Designed and maintained <strong>reusable client-side architecture</strong> (React, TypeScript, Redux) used across multiple internal applications.',
        'Built and evolved <strong>API contracts</strong> between web clients and backend services (Java Spring Boot, Node.js, PostgreSQL), emphasizing stability and ownership.',
        'Reduced coupling between UI and backend systems through shared patterns and platform improvements, enabling safer iteration and incremental delivery.',
        'Partnered with product and business stakeholders to evaluate <strong>architectural tradeoffs</strong> and deliver pragmatic, cost-effective solutions.',
        'Mentored engineers on system design reasoning, API ergonomics, and production readiness; improved code quality and team velocity.',
        'Supported production systems by debugging client/server issues and improving reliability within AWS-hosted environments.',
      ],
      tech: 'JavaScript, TypeScript, React, Node.js, Java (Spring), PostgreSQL, AWS',
    },
    {
      title: 'JavaScript / Web Engineer (Contract)',
      company: 'The ATOM Group',
      subtitle: 'Enterprise engagements: performance, DX, test coverage',
      dates: '2018 – 2019',
      achievements: [
        'Modernized large JavaScript codebases for enterprise clients, improving performance, developer experience, and test coverage.',
        'Identified bugs and bottlenecks through end-to-end testing, contributing to higher-quality production releases.',
      ],
      tech: '',
    },
    {
      title: 'Teaching Assistant',
      company: 'Trilogy Education',
      subtitle: 'MERN stack coaching; fundamentals + debugging',
      dates: '2019',
      achievements: [
        'Assisted students learning full-stack web development; reinforced component-based UI patterns, state management, and API integration.',
      ],
      tech: '',
    },
  ] as ResumeRole[],

  education: [
    {
      degree: 'M.S. Computer Science (AI Concentration)',
      school: 'Merrimack College',
      date: 'Expected 2026',
      note: 'Focus: data structures, algorithms, system architecture (Python)',
    },
    {
      degree: 'B.A. Management',
      school: 'Curry College',
    },
    {
      degree: 'Full-Stack Web Development Bootcamp',
      school: 'University of New Hampshire',
      date: '2018',
    },
  ] as ResumeEducation[],

  dailyTech: 'JS/TS, React, Node, Java, SQL, AWS',
  projectTech: 'Python, Go, Rust',
};
