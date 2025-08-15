import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  reactjs,
  nodejs,
  vuethree,
  edgedb,
  redis,
  git,
  docker,
  aws,
  postgreSql,
  python,
  ai,
  teevision,
  opit,
  launchcode,
  evans,
  solvexdigital,
  freqtrade,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Full Stack Developer',
    icon: mobile,
  },
  {
    title: 'Frontend Developer',
    icon: web,
  },
  {
    title: 'Backend Automation & ERP',
    icon: backend,
  },
  {
    title: 'DevOps & Infrastructure',
    icon: creator,
  },
];

const technologies = [
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'Vue 3',
    icon: vuethree,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'Python',
    icon: python,
  },
  {
    name: 'PostgreSQL',
    icon: postgreSql,
  },
  {
    name: 'EdgeDB',
    icon: edgedb,
  },
  {
    name: 'Redis',
    icon: redis,
  },
  {
    name: 'Docker',
    icon: docker,
  },
  {
    name: 'AWS',
    icon: aws,
  },
  {
    name: 'Git',
    icon: git,
  },
];

const experiences = [
  {
    title: 'Full Stack Developer',
    company_name: 'Evans Consoles',
    icon: evans,
    iconBg: '#E6DEDD',
    date: 'January 2024 - Present',
    points: [
      'Developed 40+ custom KPI reports and 10 real-time dashboards, saving thousands of labor hours annually and resolving $2M+ in inventory discrepancies within finance',
      'Built full-stack Bill of Materials (BOM) platform translating complex 3D CAD outputs into actionable manufacturing instructions, dramatically improving shop floor accuracy',
      'Implemented dynamic budgeting system (P3) and automated ERP workflows using BullMQ, achieving 20x deployment speed improvement and migrating core systems from React to Vue',
      'Engineered real-time inventory tracking platform with interactive global mapping system, displaying live locations of products worldwide',
    ],
  },
  {
    title: 'Full Stack Engineer',
    company_name: 'One Piece IT',
    icon: opit,
    iconBg: '#383E56',
    date: 'May 2023 - December 2023',
    points: [
      'Built and optimized web and mobile applications, improving performance by 30% and boosting user satisfaction by 25%',
      'Led full development lifecycle of diverse applications, ensuring efficient deployment and robust performance across client projects',
      'Configured and managed network architectures and server setups, demonstrating proficiency in network engineering and reliable systems',
    ],
  },
  {
    title: 'Software Developer',
    company_name: 'Launchcode',
    icon: launchcode,
    iconBg: '#383E56',
    date: 'April 2022 - December 2022',
    points: [
      'Led development of a specialized quote-to-cash platform tailored for the Oil and Gas sector, demonstrating leadership and project management skills',
      'Employed React, TypeScript, Node.js, PostgreSQL, Git, Docker, and AWS showcasing technical versatility and full-stack proficiency',
      'Managed front-end and back-end development, client requirements gathering, and workflow design for complex business processes',
    ],
  },
];

const testimonials = [
  {
    testimonial:
      'I had the pleasure of working with Aiden on a complex web development project, and I was impressed with their ability to handle multiple tasks while maintaining the highest level of quality.',
    name: 'Ethan Nguyen',
    designation: 'Software Developer',
    company: 'SAIT',
    image: 'https://randomuser.me/api/portraits/men/90.jpg',
  },
  {
    testimonial:
      'Aiden is an exceptional developer and a joy to work with. His passion for programming and problem-solving is unmatched.',
    name: 'Nelson Torres',
    designation: 'Software Engineer',
    company: 'ByteForge',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    testimonial:
      'Aiden is a hardworking and detail-oriented software developer who consistently delivers high-quality work. His ability to collaborate effectively with team members and communicate technical concepts clearly is a valuable asset.',
    name: 'Adrian Rhodes',
    designation: 'Software Developer',
    company: 'SAIT',
    image: 'https://randomuser.me/api/portraits/men/18.jpg',
  },
];

const projects = [
  {
    name: 'Solvex Digital Agency Platform',
    description:
      'Founded and operated a digital agency delivering full-stack web applications, GPT-powered AI integrations, and SEO solutions. Led 8 client projects from planning to deployment, delivering production-ready platforms with modern technologies and achieving significant business growth for clients.',
    tags: [
      {
        name: 'Next,js',
        color: 'green-text-gradient',
      },
      {
        name: 'Node.js',
        color: 'blue-text-gradient',
      },
      {
        name: 'AI Integration',
        color: 'pink-text-gradient',
      },
      {
        name: 'EdgeDB',
        color: 'orange-text-gradient',
      },
    ],
    image: solvexdigital,
    source_code_link: 'https://solvexdigital.com',
  },
  {
    name: 'Teevision - 3D T-Shirt Customizer',
    description:
      'Design custom T-shirts in stunning 3D! Built with React, ThreeJS, TailwindCSS, Framer Motion, and DALLE AI. Features real-time 3D rendering, custom color palettes, logo uploads, and downloadable designs. Achieve a seamless user experience with responsive design and industry-standard best practices. Interactive 3D environment with smooth animations and modern UI.',
    tags: [
      {
        name: 'React',
        color: 'blue-text-gradient',
      },
      {
        name: 'ThreeJS',
        color: 'green-text-gradient',
      },
      {
        name: 'Framer Motion',
        color: 'pink-text-gradient',
      },
      {
        name: 'TailwindCSS',
        color: 'orange-text-gradient',
      },
    ],
    image: teevision,
    source_code_link:
      'https://github.com/Aidenkopec/project-3d-clothing-website',
  },
  {
    name: 'Cryptocurrency Trading Bot System',
    description:
      'Built a containerized cryptocurrency trading system using the Freqtrade framework with custom Python strategies. Implemented dual-asset selection algorithm, advanced technical indicators (RSI, MACD, Bollinger Bands), dynamic risk management, and comprehensive backtesting with performance analytics deployed via Docker on Kraken exchange.',
    tags: [
      {
        name: 'Python',
        color: 'blue-text-gradient',
      },
      {
        name: 'Docker',
        color: 'green-text-gradient',
      },
      {
        name: 'Trading Algorithms',
        color: 'pink-text-gradient',
      },
      {
        name: 'Technical Analysis',
        color: 'orange-text-gradient',
      },
    ],
    image: freqtrade, // Will need new image
    source_code_link: 'https://github.com', // Private repo
  },
];

export { services, technologies, experiences, testimonials, projects };
