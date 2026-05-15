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

export interface ResumeMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ResumeProofPoint {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export const resumeData = {
  name: 'Adam LaCasse',
  headline: 'Senior Full-Stack Engineer | Enterprise Platforms & Applied AI',
  positioning:
    'I take ambiguous business problems and turn them into durable systems that real people rely on. I’m looking for user-centric engineering leadership work where I can shape architecture, lead end-to-end delivery, and apply AI where it creates real leverage.',
  signature: 'Reliable leadership. Reliable systems. Fortune 100 scale.',
  location: 'Southern NH / Greater Boston',
  phone: '(617) 407-3254',
  email: 'adam@adamlacasse.dev',
  website: 'adamlacasse.dev',
  github: 'https://github.com/adamlacasse',
  linkedin: 'https://www.linkedin.com/in/adamlacasse/',

  impactMetrics: [
    {
      value: '~70K',
      label: 'RMIS users',
      detail: 'Including large enterprises, auditors, brokers, and internal teams.',
    },
    {
      value: '~$4B',
      label: 'Annual premium supported',
      detail: 'On our mission-critical risk management information system (RMIS).',
    },

    {
      value: '~$4M',
      label: 'RMIS modernization',
      detail:
        'Cloud-native services, shared data contracts, delivery sequencing, and operational handoff.',
    },
    {
      value: '40K+',
      label: 'Global employees served',
      detail: 'People & Talent products for diverse, multilingual teams.',
    },
  ] as ResumeMetric[],

  proofPoints: [
    {
      title: 'Enterprise modernization lead',
      description:
        'Shape architecture and implementation plans across service boundaries, AWS services, platform data contracts, rollout sequencing, and support ownership.',
    },
    {
      title: 'Product-minded engineer',
      description:
        'Own discovery, build, rollout, and iteration with HR business partners, recruiters, analysts, and executive sponsors.',
    },
    {
      title: 'Business operator turned builder',
      description:
        'Nearly two decades leading finance and operations teams before engineering, including law-firm administration and FP&A leadership.',
    },
    {
      title: 'Applied AI with substance',
      description:
        'M.S. Computer Science work in AI foundations, deep learning, and AI ethics, plus hands-on LLM integration and retrieval patterns.',
    },
  ] as ResumeProofPoint[],

  portfolioProof: [
    {
      title: 'Freq Show!',
      description:
        'AI-powered music discovery app built around search paths, metadata relationships, discographies, and credit exploration.',
      href: 'https://freq-show.adamlacasse.dev',
      linkLabel: 'Live app',
    },
    {
      title: 'NorthFlow',
      description:
        'Small workflow product shaped around explicit domain modeling, durable constraints, and low-noise iteration.',
      href: 'https://northflow.adamlacasse.dev',
      linkLabel: 'Live app',
    },
    {
      title: 'Organizize',
      description:
        'Inventory platform with intake/outtake transactions, role-based access, and guardrails for operational consistency.',
      href: 'https://organizize.adamlacasse.dev',
      linkLabel: 'Live app',
    },
  ] as ResumeProofPoint[],

  summary: `Full-stack engineer focused on enterprise platforms, architecture, and end-to-end product delivery. Current work includes modernizing a risk management platform serving ~70K users and supporting ~$4B in annual premium, plus People & Talent tools used by 40,000+ multilingual employees at a Fortune 100 insurer. Before software, I spent nearly two decades running finance and operations teams, which means I'm the engineer who actually enjoys the stakeholder conversation: HR business partners, recruiters, ops leads, exec sponsors.<br><br>Stack: TypeScript, React, Node.js, Python, Java, PostgreSQL, AWS. One course away from an M.S. in Computer Science with an Artificial Intelligence concentration (foundations of AI, deep learning, AI ethics). Looking for product-minded engineering leadership work where I can shape architecture, turn ambiguous business problems into durable systems, and apply AI where it creates real leverage.`,

  skills: [
    {
      category: 'Languages & Frameworks',
      items: 'TypeScript, JavaScript, Node.js, React, Python, Java (Spring), SQL, HTML/CSS',
    },
    {
      category: 'Backend, Data & Cloud',
      items:
        'PostgreSQL, MySQL, REST/GraphQL APIs, microservices, AWS, CI/CD, containerization, observability',
    },
    {
      category: 'Applied AI',
      items:
        'LLM integration, prompt design, retrieval patterns, AI-assisted developer tooling. Recent MSCS coursework in foundations of AI, deep learning, and AI ethics',
    },
  ] as ResumeSkill[],

  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Liberty Mutual Insurance',
      subtitle: 'Portsmouth, NH (Hybrid)',
      dates: '2019 - Present',
      achievements: [
        '<strong>Senior Software Engineer (2021-Present)</strong>',
        '<strong>RMIS platform redesign (2026-Present):</strong> Lead role in modernizing the risk management platform (RMIS) - serving ~70K users (large enterprises, auditors, brokers, and internal teams) and supporting ~$4B in annual premium.',
        '$4M modernization effort: migrating core services to cloud-native microservices on AWS, standardizing cross-platform data contracts, and tightening the deployment loop for faster iteration.',
        'Shape architecture and implementation plans across service boundaries, data contracts, delivery sequencing, and operational handoff.',
        '<strong>People & Talent platforms (2021-2026):</strong> Lead engineer on Goals & Growth (performance), Concierge (people knowledge hub), and Merit (recognition) - used by 40,000+ multilingual employees worldwide.',
        'Owned product end-to-end: discovery with HR business partners and recruiters, system design, implementation, rollout, and iteration on usage data.',
        'Translated loosely defined people-operations problems into shipped product, working directly with HRBPs, recruiters, analysts, and executives.',
        'Throughout: mentor engineers and set system-design and code-review standards adopted across teams; advocate for boring tools, explicit boundaries, and small reversible shipments.',
        '<strong>Software Engineer (2019-2021)</strong>',
        'Joined the People & Talent team; earned rapid promotion to Senior through ownership of complex features and consistent resolution of ambiguous, high-risk technical problems.',
        'Rotation with data and analytics engineering - databases, warehousing, and BI pipeline ownership.',
      ],
      tech: 'TypeScript, JavaScript, React, Node.js, Java (Spring), PostgreSQL, AWS',
    },
    {
      title: 'Teaching Assistant',
      company: 'Trilogy Education',
      subtitle: 'Portsmouth, NH',
      dates: '2019',
      achievements: [
        'Guided students through full-stack MERN development, debugging, and the habits that separate working code from maintainable code.',
        'Sharpened the mentorship and technical-communication muscles I still use in engineering leadership contexts today.',
      ],
      tech: '',
    },
    {
      title: 'JavaScript / Web Engineer (Contract)',
      company: 'The ATOM Group',
      subtitle: '',
      dates: '2018 - 2019',
      achievements: [
        'Shipped performance, UX, and developer-experience improvements across client web platforms.',
        'Implemented end-to-end testing that surfaced production defects and performance bottlenecks before customers did.',
      ],
      tech: '',
    },
    {
      title: 'Director of Administration',
      company: 'Devine Millimet',
      subtitle: 'Prior leadership experience (pre-engineering)',
      dates: '2015 - 2018',
      achievements: [
        `Directed operations - IT, finance, HR, marketing, and facilities - for one of New Hampshire's largest law firms.`,
        'Delivered measurable operational efficiencies through process analysis, systems thinking, and steady cross-functional leadership.',
      ],
      tech: '',
    },
    {
      title: 'Director of Financial Planning & Analysis',
      company: 'Brown Rudnick',
      subtitle: 'Prior leadership experience (pre-engineering)',
      dates: '2005 - 2015',
      achievements: [
        'Progressed from analyst → manager → director while guiding the firm through the 2008 financial crisis.',
        'Achieved >15% profitability improvement through strategic financial modeling, operational analysis, and executive partnership.',
      ],
      tech: '',
    },
  ] as ResumeRole[],

  education: [
    {
      degree: 'M.S. Computer Science - Artificial Intelligence Concentration',
      school: 'Merrimack College',
      date: 'Expected 2026',
      note: 'Coursework: foundations of AI, deep learning, AI ethics, data modeling, and system design. The concentration is substance, not decoration - how modern AI actually works and where it earns its keep.',
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
    'End-to-end product engineering: discovery, ship, iterate',
    'Cross-functional collaboration with non-technical stakeholders (HR, recruiting, operations, executives)',
    'People & Talent domain depth (performance, knowledge, recognition, recruiting)',
    'Applied AI: LLM integration, prompt design, retrieval patterns',
    'Boring-tech bias, explicit boundaries, small reversible shipments',
    'Mentorship and standards-setting without over-engineering',
  ],

  dailyTech: 'JS/TS, React, Node, Java, SQL, AWS',
  projectTech: 'Python, Go, Rust',
};
