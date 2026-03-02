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
  headline: 'Principal-Track Software Engineer | Enterprise Systems | AI/ML-Enabled Platforms',
  location: 'Atkinson, NH',
  phone: '(617) 407-3254',
  email: 'adam@adamlacasse.dev',
  website: 'adamlacasse.dev',
  github: 'https://github.com/adamlacasse',
  linkedin: 'https://www.linkedin.com/in/adamlacasse/',

  summary: `Senior full-stack software engineer at a Fortune 100 insurer designing and delivering enterprise web platforms serving 40,000+ global users. Combines deep technical execution with prior director-level leadership in finance and operations to drive scalable systems, measurable efficiency gains, and cross-organizational alignment.<br><br>Experienced across modern TypeScript/JavaScript ecosystems, cloud-native architecture, and data-driven backend design, with growing specialization in AI/ML-enabled software systems. Currently completing an M.S. in Computer Science (AI concentration) focused on machine learning, large language models, and intelligent system design.<br><br>Seeking Staff / Principal Engineer roles where architectural leadership, system design, and cross-team technical influence can meaningfully shape enterprise platforms, AI-enabled products, or regulated-domain systems.`,

  skills: [
    {
      category: 'Languages & Frameworks',
      items: 'JavaScript, TypeScript, Node.js, React, Python, Java (Spring), SQL, HTML/CSS',
    },
    {
      category: 'Cloud, Data, & Architecture',
      items:
        'AWS, REST/GraphQL APIs, Microservices, CI/CD, Data pipelines & warehousing, Distributed system design, Observability & reliability patterns',
    },
    {
      category: 'AI / Intelligent Systems',
      items:
        'LLM integration, NLP fundamentals, Applied machine learning workflows, Prompt & retrieval design, AI-assisted developer tooling',
    },
  ] as ResumeSkill[],

  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Liberty Mutual Insurance',
      subtitle: 'Portsmouth, NH (Hybrid)',
      dates: '2019 – Present',
      achievements: [
        '<strong>Senior Software Engineer (2021–Present)</strong>',
        'Lead role in the architecture and development of enterprise platforms such as Goals & Growth, Concierge, and Merit, supporting 40K+ multilingual users worldwide with critical Talent operations.',
        'Lead role in the $4M redesign of the RMIS platform, migrating core services to cloud-native microservices and standardizing cross-platform data contracts to improve scalability, deployment consistency, and long-term platform maintainability.',
        'Translate complex business and regulatory requirements into scalable, cost-effective technical solutions, reducing ambiguity and accelerating delivery across collaborating teams.',
        'Mentor engineers and establish system design and quality standards adopted across teams, strengthening reliability, shared architecture patterns, and technical decision-making maturity.',
        'Partner with product, analytics, and senior leadership to align engineering execution with measurable organizational outcomes and long-term platform strategy.',
        '<strong>Software Engineer (2019–2021)</strong>',
        'Earned rapid promotion through ownership of complex features, cross-team collaboration, and consistent resolution of ambiguous or high-risk technical problems.',
        'Completed rotation with data and analytics engineering teams, expanding expertise in databases, warehousing, and business intelligence pipelines.',
      ],
      tech: 'JavaScript, TypeScript, React, Node.js, Java (Spring), PostgreSQL, AWS',
    },
    {
      title: 'Teaching Assistant',
      company: 'Trilogy Education',
      subtitle: 'Portsmouth, NH',
      dates: '2019',
      achievements: [
        'Guided students through full-stack MERN development, debugging strategies, and foundational software engineering practices.',
        'Strengthened mentorship and technical communication skills now applied in senior engineering leadership contexts.',
      ],
      tech: '',
    },
    {
      title: 'JavaScript / Web Engineer (Contract)',
      company: 'The ATOM Group',
      subtitle: '',
      dates: '2018 – 2019',
      achievements: [
        'Improved performance, UX, and developer experience across client web platforms.',
        'Implemented end-to-end testing that surfaced production defects and performance bottlenecks in critical systems.',
      ],
      tech: '',
    },
    {
      title: 'Director of Administration',
      company: 'Devine Millimet',
      subtitle: 'Prior Leadership Experience (Pre-Engineering)',
      dates: '2015 – 2018',
      achievements: [
        `Directed operations spanning IT, finance, HR, marketing, and facilities for one of New Hampshire's largest law firms.`,
        'Delivered measurable operational efficiencies through process analysis, systems thinking, and organizational leadership.',
      ],
      tech: '',
    },
    {
      title: 'Director of Financial Planning & Analysis',
      company: 'Brown Rudnick',
      subtitle: 'Prior Leadership Experience (Pre-Engineering)',
      dates: '2005 – 2015',
      achievements: [
        'Progressed from analyst → manager → director while guiding the firm through the 2008 financial crisis.',
        'Achieved >15% profitability improvement through strategic financial modeling, operational analysis, and executive partnership.',
        '<em>Foundational strengths: executive communication, systems thinking, and business-aligned decision making—now applied to software architecture and technical leadership.</em>',
      ],
      tech: '',
    },
  ] as ResumeRole[],

  education: [
    {
      degree: 'M.S. Computer Science — Artificial Intelligence Concentration',
      school: 'Merrimack College',
      date: 'Expected 2026',
      note: 'Focus: machine learning, deep learning, NLP, large language models, intelligent system design',
    },
    {
      degree: 'Full-Stack Web Development Bootcamp',
      school: 'University of New Hampshire',
      date: '2018',
    },
    {
      degree: 'B.A. Management',
      school: 'Curry College',
    },
    {
      degree: 'Additional study: Jazz Composition',
      school: 'Berklee College of Music',
    },
  ] as ResumeEducation[],

  leadershipThemes: [
    'Enterprise-scale system architecture and modernization',
    'Cross-functional technical leadership and influence',
    'Mentorship, standards setting, and engineer development',
    'Data-driven architectural decision making',
    'Business-aligned engineering strategy in complex organizations',
    'Continuous learning and applied AI evolution',
  ],

  dailyTech: 'JS/TS, React, Node, Java, SQL, AWS',
  projectTech: 'Python, Go, Rust',
};
