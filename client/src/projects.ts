import ezaffittoImg from "../public/img/ezaffitto.png";
import vhfesuperioriImg from "../public/img/vhfesuperiori.png";
import tpldisplayImg from "../public/img/tpldisplay.png";
import wolfImg from "../public/img/wolf.png";
import occupaImg from "../public/img/occupa.png";
import dubitoImg from "../public/img/dubito.png";
import { StaticImageData } from "next/image";

export interface Project {
    name: string;
    description: string;
    stack: string[];
    image: StaticImageData;
    github?: string;
    url?: string;
}

export const projects: Project[] = [
    {
        name: "ezaffitto",
        description:
            "Raccoglitore completamente automatico di annunci di affitti provenienti da vari siti con parsing tramite AI (OpenAI) strutturato a microservizi.",
        stack: ["Node.js", "Python", "OpenAI", "Puppeteer", "Docker", "MongoDB"],
        image: ezaffittoImg,
        url: "https://www.ezaffitto.com/"
    },
    {
        name: "VHF e superiori",
        description:
            "Un gestore di eventi e social network per radioamatori a cura di volontari. Un posto dove condividere le proprie creazioni, collegamenti (QSO) e conoscere nuove persone.",
        stack: ["Node.js", "TypeScript", "MongoDB", "Express", "OpenAPI", "React"],
        image: vhfesuperioriImg,
        github: "https://github.com/Bitrey/vhf-e-superiori",
        url: "https://www.vhfesuperiori.eu/"
    },
    {
        name: "Occupa lo Studente",
        description:
            "Un'applicazione web per la ricerca di lavoro che mette in contatto aziende e studenti dell'I.T.I.S. E. Fermi di Modena. Login istituzionale tramite Google OAuth 2.0.",
        stack: ["Docker", "Node.js", "TypeScript", "MongoDB", "Express", "React"],
        image: occupaImg,
        github: "https://github.com/Bitrey/occupa-lo-studente-fermi"
    },
    {
        name: "TPL Display",
        description:
            "Tabellone per le partenze autobus real-time, dockerizzato, interfacciato con i dati del TPL di Bologna e Modena, con caching (Redis) e aggiornamento automatico.",
        stack: ["Docker", "Redis", "Node.js", "TypeScript", "Express"],
        image: tpldisplayImg,
        github: "https://github.com/Bitrey/seta-display"
    },
    {
        name: "Wolf Survival",
        description:
            "Sito di una scuola di sopravvivenza con frontend Next.js e backend connesso all'API di Meta (Facebook) per mostrare gli ultimi corsi, foto e video delle attività svolte.",
        stack: ["Next.js", "TypeScript", "Express"],
        image: wolfImg,
        url: "https://www.wolfsurvival.it/"
    },
    {
        name: "Dubito Online",
        description:
            "Un sito web per giocare a Dubito (un gioco di carte) con amici e giocatori online. Scambio dati in tempo reale con socket.io, autenticazione via Google OAuth 2.0.",
        stack: ["Node.js", "Socket.IO", "MongoDB", "Express", "Passport.js", "React"],
        image: dubitoImg
    }
];
