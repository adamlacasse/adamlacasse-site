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
  headline: 'Senior Full-Stack Engineer & Tech Lead | Enterprise Platforms & Applied AI',
  positioning:
    'I take messy business problems and turn them into durable systems that real people rely on. I’m looking for user-centric engineering leadership work where I can shape architecture, lead end-to-end delivery, and apply AI where it creates real leverage.',
  signature: 'Experienced leadership. Reliable systems. Fortune 100 scale.',
  location: 'Southern NH / Greater Boston',
  phone: '(617) 407-3254',
  email: 'adamlacasse@outlook.com',
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

  summary: `Full-stack engineer focused on enterprise platforms, architecture, and end-to-end product delivery. Current work includes modernizing a risk management platform serving ~70K users and supporting ~$4B in annual premium, plus People & Talent tools used by 40,000+ multilingual employees at a Fortune 100 insurer. Before software, I spent nearly two decades running finance and operations teams, which means I'm the engineer who actually enjoys the stakeholder conversation: HR business partners, recruiters, ops leads, exec sponsors.<br><br>Stack: TypeScript, React, Node.js, Python, Java, PostgreSQL, AWS. M.S. in Computer Science with an Artificial Intelligence concentration (foundations of AI, deep learning, AI ethics). Looking for product-minded engineering leadership work where I can shape architecture, turn ambiguous business problems into durable systems, and apply AI where it creates real leverage.`,

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
        'LLM integration, prompt design, retrieval patterns, AI-assisted developer tooling. MSCS background in foundations of AI, deep learning, and AI ethics',
    },
  ] as ResumeSkill[],

  experience: [
    {
      title: 'Senior Software Engineer & Tech Lead',
      company: 'Liberty Mutual Insurance',
      subtitle: 'Portsmouth, NH (Hybrid)',
      dates: '2019 - Present',
      achievements: [
        '<strong>RMIS platform redesign (2025-Present):</strong> Tech Lead on a multi-year, ~$4M modernization of a risk management platform supporting ~$4B in annual premium and ~70K users (enterprises, brokers, auditors, internal teams) - replacing legacy mainframe workflows with cloud-native services on AWS, currently in the foundations phase building toward incremental cutover.',
        'Defined shared data contracts and migration patterns (dual-write, shadow read, expand-contract) across downstream consumers spanning reporting pipelines and customer-facing data flows - new services can stand up behind the live legacy app without disruption.',
        'Established service boundaries, rollout sequencing, and reference patterns the broader program builds against - downstream teams can move on the new architecture independently rather than waiting on a full ecosystem cutover.',
        `<strong>People & Talent platforms (2019-2025):</strong> Engineered several internal greenfield platforms from initial discovery through rollout - performance management, a people knowledge hub, compensation support, and more - consolidating a sprawl of third-party tools and spreadsheets in support of Liberty's "best place to work" strategic priority across ~40K multilingual employees. <strong>Promoted from Software Engineer to Senior in 2021</strong> mid-arc, through ownership of complex features and steady delivery on ambiguous technical problems.`,
        'Ran discovery, design, and rollout for each product in direct partnership with HR business partners, recruiters, analysts, and exec sponsors - turning loosely defined people-operations problems into systems each function actually adopted.',
        '<strong>Operating principles across both programs:</strong> boring tools, explicit boundaries, small reversible shipments - applied through engineer mentorship and design/review standards adjacent teams now follow.',
        'Brief rotation with the data and analytics engineering team - databases, warehousing, and BI pipeline work.',
      ],
      tech: 'TypeScript, JavaScript, Node.js, React, Java (Spring), Python, PostgreSQL, AWS',
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
        'Progressed from analyst → manager → director, including through the 2008 financial crisis and the years of operational discipline that followed.',
        'Achieved >15% profitability improvement through strategic financial modeling, operational analysis, and executive partnership.',
      ],
      tech: '',
    },
  ] as ResumeRole[],

  education: [
    {
      degree: 'M.S. Computer Science - Artificial Intelligence Concentration',
      school: 'Merrimack College',
      date: '2026',
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

  dailyTech: 'JS/TS, Python, Node, Java, SQL, AWS',
  projectTech: 'Go, Rust, Ruby, PHP...',
};
