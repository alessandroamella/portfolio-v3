import type { StaticImageData } from 'next/image';
import bamboosimImg from '@/assets/projects/bamboosim.webp';
import ceScioperoImg from '@/assets/projects/cesciopero.webp';
import ezaffittoImg from '@/assets/projects/ezaffitto.webp';
import ianusImg from '@/assets/projects/ianus.webp';
import iotImg from '@/assets/projects/iot.webp';
import vhfesuperioriImg from '@/assets/projects/vhfesuperiori.webp';

export type Project = {
  id: string;
  stack: string[];
  image: StaticImageData;
  url?: string;
  github?: string;
};

export const projectsInfo: Project[] = [
  {
    id: 'sciopero',
    stack: [
      'OpenAI SDK',
      'Puppeteer',
      'Prisma + PostgreSQL',
      'RabbitMQ',
      'React Native',
    ],
    image: ceScioperoImg,
    url: 'https://cesciopero.it',
  },
  {
    id: 'ianus',
    stack: ['NestJS', 'PostgreSQL', 'LLM / RAG', 'React'],
    image: ianusImg,
  },
  {
    id: 'iotdashboard',
    stack: ['NestJS', 'TimescaleDB', 'Eclipse Kapua', 'Docker', 'Redis'],
    image: iotImg,
  },
  {
    id: 'bamboosim',
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
    id: 'vhfesuperiori',
    stack: ['AWS', 'MongoDB', 'Express', 'OpenAPI', 'React'],
    image: vhfesuperioriImg,
    url: 'https://www.vhfesuperiori.eu/',
    github: 'https://github.com/alessandroamella/vhf-e-superiori',
  },
  {
    id: 'ezaffitto',
    stack: ['Node.js', 'Python', 'OpenAI', 'Puppeteer', 'Docker', 'MongoDB'],
    image: ezaffittoImg,
    github: 'https://github.com/alessandroamella/ezaffitto',
  },
];
