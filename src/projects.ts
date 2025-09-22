import type { StaticImageData } from 'next/image';
import bamboosimImg from '../public/img/bamboosim.webp';
import ezaffittoImg from '../public/img/ezaffitto.webp';
import kinoCafeImg from '../public/img/kinocafe.webp';
import occupaImg from '../public/img/occupa.webp';
import omImg from '../public/img/om.webp';
import tpldisplayImg from '../public/img/tpldisplay.webp';
import vhfesuperioriImg from '../public/img/vhfesuperiori.webp';
import wolfImg from '../public/img/wolf.webp';

export type Project = {
  id: string;
  stack: string[];
  image: StaticImageData;
  url?: string;
  github?: string;
};

export const projectsInfo: Project[] = [
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
  {
    id: 'kinocafe',
    stack: ['AWS API', 'Supabase', 'React', 'Python', 'Arduino'],
    image: kinoCafeImg,
    url: 'http://cafe.kinocampus.it/',
    github: 'https://github.com/alessandroamella/kino-manager-fe',
  },
  {
    id: 'occupalostudente',
    stack: ['Docker', 'TypeScript', 'MongoDB', 'Express', 'React'],
    image: occupaImg,
    github: 'https://github.com/alessandroamella/occupa-lo-studente-fermi',
  },
  {
    id: 'tpldisplay',
    stack: ['Docker', 'Redis', 'TypeScript', 'Express'],
    image: tpldisplayImg,
    github: 'https://github.com/alessandroamella/seta-display',
  },
  {
    id: 'wolfsurvival',
    stack: ['Next.js', 'TypeScript', 'Express'],
    image: wolfImg,
    url: 'https://www.wolfsurvival.it/',
  },
  {
    id: 'om',
    stack: ['JavaScript DOM', 'Bulma', 'Express'],
    image: omImg,
    url: 'http://om.bitrey.it',
    github: 'https://github.com/alessandroamella/codice-q',
  },
];
