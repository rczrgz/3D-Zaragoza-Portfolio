import { ExperienceItem, EducationItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Junior Web Developer',
    company: 'Bullseye Solutions Inc.',
    period: '2025-Present',
    location: 'Hybrid',
    type: 'Full-Time',
    description:
      'Designing and deploying custom e-commerce stores, custom WordPress systems, and bespoke web applications for global clients and organizations.',
    highlights: [
      'Engineered tailored WordPress solutions and custom WooCommerce plugins, boosting client sales conversion by 34%.',
      'Developed headless and Liquid-based Shopify themes with sub-second page loads and mobile-first responsiveness.',
      'Implemented Core Web Vitals optimization plans that raised client SEO performance scores to 95+ across Google PageSpeed.',
      'Managed end-to-end site migrations, security hardening, database cleanups, and automated backup routines.',
    ],
    technologies: ['WordPress', 'WooCommerce', 'Shopify', 'PHP', 'JavaScript', 'React', 'Tailwind CSS', 'MySQL'],
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer',
    company: 'PixilProfiles',
    period: 'May — Jul 2026',
    location: 'Remote',
    type: 'Project-Based',
    description:
      'Collaborated with cross-functional design and marketing teams to architect scalable client websites, API integrations, and internal portal systems.',
    highlights: [
      'Built custom Elementor widgets, Gutenberg blocks, and PHP hooks for high-traffic enterprise portals.',
      'Constructed RESTful API endpoints and external integrations with CRM, ERP, and payment processors.',
      'Authored clean, maintainable technical documentation and trained client teams on CMS content management.',
      'Integrated Git version control workflows and automated staging deployment pipelines.',
    ],
    technologies: ['PHP', 'WordPress', 'JavaScript', 'MySQL', 'Elementor', 'CSS3', 'REST APIs', 'Git'],
  },
  {
    id: 'exp-3',
    role: 'Software Engineer - Mobile Developer',
    company: 'Pragtechnologies',
    period: 'Mar — Jun2025',
    location: 'On-site',
    type: 'Internship',
    description:
      'Participated in mobile app prototyping, UI component development, and responsive website delivery for regional startups and SMEs.',
    highlights: [
      'Co-developed cross-platform mobile prototypes in Flutter/Dart with local SQLite persistence.',
      'Translated wireframes and Figma designs into pixel-perfect, accessible web layouts.',
      'Assisted in SEO keyword auditing, on-page metadata optimization, and web accessibility compliance.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Flutter', 'Dart', 'MySQL'],
  },
];

export const educationData: EducationItem = {
  degree: 'Bachelor of Science in Information Technology (BSIT)',
  institution: 'Polytechnic University of the Philippines (PUP)',
  period: 'Graduated',
  description:
    'Earned a Bachelor of Science in Information Technology from the Polytechnic University of the Philippines (PUP), focusing on modern web engineering, database architecture, network systems, and full-stack software development.',
  honors: 'PUP College of Computer and Information Sciences (CCIS)',
  highlights: [
    'Capstone Project: Real-time Emergency Response & Fleet Telemetry System (ER Mobile)',
    'Specialization in Web Engineering, Database Systems & Software Architecture',
    'Active participant in PUP collegiate hackathons, technology symposiums, and coding events',
    'Coursework: Full-Stack Web Development, Relational Databases, Data Structures, Mobile Computing',
  ],
};
