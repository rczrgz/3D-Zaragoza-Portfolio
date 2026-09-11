import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'picpa-ireland',
    name: 'PICPA Ireland Membership System',
    subtitle: 'Enterprise Association Portal & Membership Directory',
    description:
      'Official portal for the Philippine Institute of Certified Public Accountants (PICPA) Ireland Chapter. Engineered a comprehensive membership management portal featuring secure member verification, automated dues renewals, CPD credit tracking, and custom plugin architectures.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Elementor Pro', 'Custom Plugins', 'Tailwind CSS'],
    role: 'Lead WordPress Developer',
    features: [
      'Custom member directory with role-based access control and member verification',
      'Automated annual dues renewal workflows and payment gateway integration',
      'CPD (Continuing Professional Development) credit tracking dashboard',
      'Custom WordPress plugin written from scratch for automated receipts and member certifications',
    ],
    liveUrl: 'https://picpaireland.ie/',
    category: 'WordPress',
    color: '#2563eb', // blue
    buildingPosition: [-3.4, 0, 2.4],
  },
  {
    id: 'lovetodream',
    name: 'Love To Dream',
    subtitle: 'Award-Winning Swaddles & Baby Sleepwear Official E-Commerce',
    description:
      'Official Philippine website and e-commerce store for Love To Dream™, the globally acclaimed swaddle and sleepwear brand. Developed on WordPress and WooCommerce with custom interactive sizing calculators, friction-free checkout, payment gateway integrations, and speed optimization.',
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'Elementor Pro', 'Custom CSS', 'Payment Gateways'],
    role: 'WordPress & WooCommerce Developer',
    features: [
      'Custom WooCommerce product pages featuring interactive swaddle sizing guides',
      'Frictionless checkout with Philippine payment gateway integrations (GCash, Maya, Cards)',
      'High-speed mobile optimization with stellar Core Web Vitals performance',
      'Automated order confirmation workflows and inventory tracking sync',
    ],
    liveUrl: 'https://lovetodream.ph/',
    category: 'WordPress',
    color: '#0284c7', // sky blue
    buildingPosition: [-3.2, 0, -2.8],
  },
  {
    id: 'kids-and-baby',
    name: 'Kids and Baby',
    subtitle: 'Premier Baby & Parenting Essentials E-Commerce Storefront',
    description:
      'A high-converting, modern Shopify storefront for Kids and Baby Group, providing parents with curated essentials and nursery gear. Crafted custom Shopify Liquid templates, advanced multi-attribute product filters, responsive cart drawer, and checkout optimization.',
    technologies: ['Shopify', 'Liquid', 'HTML5/SCSS', 'JavaScript', 'Shopify Storefront API', 'E-Commerce UX'],
    role: 'Shopify Developer',
    features: [
      'Bespoke Shopify Liquid theme architecture with modular section customization',
      'Dynamic AJAX cart drawer with intelligent free-shipping threshold triggers',
      'Multi-faceted product filtering by age, category, brand, and nursery needs',
      'Mobile-first performance audits maintaining sub-2-second page loads',
    ],
    liveUrl: 'https://kidsandbabygroup.myshopify.com/',
    category: 'Shopify',
    color: '#059669', // emerald
    buildingPosition: [3.2, 0, 2.4],
  },
  {
    id: 'mamas-and-papas',
    name: 'Mamas and Papas',
    subtitle: 'Luxury Nursery & Baby Lifestyle Official Philippine Store',
    description:
      'Official Philippine online boutique for Mamas & Papas, Britain’s favorite nursery and parenting brand. Engineered tailored Shopify theme sections, luxury lifestyle imagery galleries, gift registry integrations, localized payment gateways, and conversion funnels.',
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'Responsive UI', 'Cart Upsells', 'Technical SEO'],
    role: 'Shopify Developer',
    features: [
      'Luxury branded lifestyle UI/UX adhering to international brand guidelines',
      'Custom bundle builder and gift registry options for expecting parents',
      'Localized checkout flow with Philippine delivery and installment payment options',
      'Comprehensive SEO architecture and structured schema for product rich snippets',
    ],
    liveUrl: 'https://mamasandpapas.ph/',
    category: 'Shopify',
    color: '#ec4899', // pink/rose
    buildingPosition: [3.4, 0, -2.8],
  },
  {
    id: 'optisnap',
    name: 'OptiSnap',
    subtitle: 'High-Performance Image Optimization & Asset Pipeline Prototype',
    description:
      'A streamlined web application design and interactive prototype for media compression, image format conversion, and real-time visual fidelity comparisons.',
    technologies: ['Figma', 'UI/UX Design', 'Design Systems', 'Interactive Prototyping', 'Product Architecture'],
    role: 'Product & UI/UX Designer',
    features: [
      'Interactive high-fidelity design prototype built and validated in Figma',
      'Batch asset pipeline and compression ratio comparison flow',
      'Tailored dark/light mode desktop UI with granular quality tuning sliders',
      'Export and format workflow specifications for modern web developers',
    ],
    figmaUrl: 'https://www.figma.com/proto/MZqvDkSiYImGyrOfVJQlYb/DOS-Prototype?node-id=323-2&starting-point-node-id=323%3A2&t=tNmMQjgoi8YencGu-1',
    category: 'Frontend',
    color: '#a855f7', // purple / figma vibe
    buildingPosition: [-3.2, 0, -2.8],
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    subtitle: 'Interactive Geospatial Forecast & Climate Visualizer',
    description:
      'A responsive meteorology dashboard delivering real-time weather analytics, interactive weather radar overlays, and 7-day hourly forecasts with responsive animations.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API', 'Chart.js'],
    role: 'Frontend Developer',
    features: [
      'Geolocation-based weather detection with city search autocomplete',
      'Detailed UV index, humidity, wind velocity, and air quality metrics',
      'Dynamic weather animations reflecting current atmospheric conditions',
      'Offline caching layer for fast reload on poor mobile connectivity',
    ],
    category: 'Frontend',
    color: '#06b6d4', // cyan
    buildingPosition: [3.4, 0, -2.8],
  },
  {
    id: 'er-mobile',
    name: 'ER Mobile / Ambulance Project',
    subtitle: 'Emergency Dispatch & Paramedic Incident Response System',
    description:
      'A mission-critical mobile and dispatch application built to coordinate emergency ambulance fleet deployment, live triage data recording, and hospital route navigation.',
    technologies: ['Flutter', 'Dart', 'MySQL', 'REST API', 'Google Maps API'],
    role: 'Mobile & Full-Stack Developer',
    features: [
      'Real-time GPS ambulance telemetry and ETA calculations for trauma centers',
      'Paramedic digital patient report form (ePCR) with offline sync support',
      'Automated dispatch alerts and turn-by-turn routing optimization',
      'HIPAA/GDPR-compliant encrypted patient vital sign transmissions',
    ],
    category: 'Mobile',
    color: '#ef4444', // red
    buildingPosition: [0, 0, -3.8],
  },
];
