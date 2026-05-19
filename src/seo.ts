import {
  AUTHOR,
  AUTHOR_FULL_NAME,
  AUTHOR_JOB_TITLE,
  AUTHOR_PROFILE_URLS,
  SITE_DESCRIPTION,
  SITE_URL,
} from './consts';

export const personEntity = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: AUTHOR,
  alternateName: [AUTHOR_FULL_NAME, 'adamlacasse'],
  url: SITE_URL,
  jobTitle: AUTHOR_JOB_TITLE,
  description: SITE_DESCRIPTION,
  sameAs: AUTHOR_PROFILE_URLS,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Atkinson',
    addressRegion: 'NH',
    addressCountry: 'US',
  },
  knowsAbout: [
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'PostgreSQL',
    'AWS',
    'Web Architecture',
    'API Design',
    'Software Engineering',
    'Full-Stack Development',
    'Product Engineering',
    'Enterprise Platforms',
    'Applied AI',
    'LLM Integration',
  ],
};

export const personStructuredData = {
  '@context': 'https://schema.org',
  ...personEntity,
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: AUTHOR,
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
};

export function profilePageStructuredData(pathname: string, description = SITE_DESCRIPTION) {
  const url = new URL(pathname, SITE_URL).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    name: AUTHOR,
    description,
    mainEntity: personEntity,
  };
}
