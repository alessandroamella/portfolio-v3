import type { StaticImageData } from 'next/image';
import bamboosimImg from '@/assets/projects/bamboosim.webp';
import ceScioperoImg from '@/assets/projects/cesciopero.webp';
import ezaffittoImg from '@/assets/projects/ezaffitto.webp';
import ianusImg from '@/assets/projects/ianus.webp';
import iotImg from '@/assets/projects/iot.webp';
import qramiImg from '@/assets/projects/qrami.webp';
import vhfesuperioriImg from '@/assets/projects/vhfesuperiori.webp';

export type ProjectStatus = 'live' | 'inDevelopment' | 'archived';

export type Project = {
  id: string;
  status: ProjectStatus;
  // TODO: confirm the year ranges — these are estimates.
  year: string;
  solo: boolean;
  // i18n key under projectMeta.roles, only set when solo === false
  roleKey?: string;
  stack: string[];
  image: StaticImageData;
  url?: string;
  github?: string;
  // e.g. a thesis / paper PDF
  paperUrl?: string;
  // set when the live link is intentionally disabled (e.g. legal dispute)
  unavailable?: boolean;
};

export const projectsInfo: Project[] = [
  {
    id: 'sciopero',
    status: 'live',
    year: '2025–2026',
    solo: true,
    stack: [
      'NestJS',
      'Prisma + PostgreSQL',
      'RabbitMQ',
      'OpenAI SDK',
      'React Native',
    ],
    image: ceScioperoImg,
    unavailable: true,
    paperUrl: 'https://amslaurea.unibo.it/id/eprint/39074/1/tesi.pdf',
  },
  {
    id: 'bamboosim',
    status: 'live',
    year: '2024',
    solo: true,
    stack: [
      'NestJS',
      'PostgreSQL',
      'Google Cloud',
      'React',
      'Tailwind',
      'TypeScript',
    ],
    image: bamboosimImg,
    url: 'https://bamboosim.com',
  },
  {
    id: 'qrami',
    status: 'inDevelopment',
    year: '2026',
    solo: true,
    stack: [
      'NestJS',
      'PostgreSQL + PostGIS',
      'BullMQ',
      'Stripe Connect',
      'Digital signature',
    ],
    image: qramiImg,
  },
  {
    id: 'iotdashboard',
    status: 'live',
    year: '2024–2026',
    solo: false,
    roleKey: 'backendDataAi',
    stack: ['NestJS', 'TimescaleDB', 'Eclipse Kapua', 'Docker', 'Redis'],
    image: iotImg,
  },
  {
    id: 'ianus',
    status: 'inDevelopment',
    year: '2025–2026',
    solo: false,
    roleKey: 'backendDataAi',
    stack: ['NestJS', 'PostgreSQL', 'LLM / RAG', 'React'],
    image: ianusImg,
  },
  {
    id: 'vhfesuperiori',
    status: 'live',
    year: '2022–2026',
    solo: true,
    stack: ['AWS S3', 'MongoDB', 'Express', 'OpenAPI', 'React'],
    image: vhfesuperioriImg,
    url: 'https://www.vhfesuperiori.eu/',
    github: 'https://github.com/alessandroamella/vhf-e-superiori',
  },
  {
    id: 'ezaffitto',
    status: 'archived',
    year: '2023',
    solo: true,
    stack: ['Node.js', 'Python', 'OpenAI', 'Puppeteer', 'Docker', 'MongoDB'],
    image: ezaffittoImg,
    github: 'https://github.com/alessandroamella/ezaffitto',
  },
];
