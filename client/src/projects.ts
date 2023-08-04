import vhfesuperioriImg from "../public/img/vhfesuperiori.png";
import tpldisplayImg from "../public/img/tpldisplay.png";
import wolfImg from "../public/img/wolf.png";
import occupaImg from "../public/img/occupa.png";
import dubitoImg from "../public/img/dubito.png";
import { StaticImageData } from "next/image";

export interface Project {
    name: string;
    description: string;
    image: StaticImageData;
    github?: string;
    url?: string;
}

export const projects: Project[] = [
    {
        name: "VHF e superiori",
        description:
            "Un gestore di eventi e social network per radioamatori a cura di volontari. Un posto dove condividere le proprie creazioni, collegamenti (QSO) e conoscere nuove persone.",
        image: vhfesuperioriImg,
        github: "https://github.com/Bitrey/vhf-e-superiori",
        url: "https://www.vhfesuperiori.eu/"
    },

    {
        name: "TPL Display",
        description:
            "Tabellone per le partenze autobus interfacciato con i dati del TPL di Bologna e Modena, con caching e aggiornamento automatico.",
        image: tpldisplayImg,
        github: "https://github.com/Bitrey/seta-display"
    },
    {
        name: "Wolf Survival",
        description:
            "Sito di una scuola di sopravvivenza usato per mostrare gli ultimi corsi, foto e video delle attività svolte.",
        image: wolfImg,
        url: "https://www.wolfsurvival.it/"
    },
    {
        name: "Occupa lo Studente",
        description:
            "Un sito web per la ricerca di lavoro che mette in contatto aziende e studenti dell'I.T.I.S. E. Fermi di Modena.",
        image: occupaImg,
        github: "https://github.com/Bitrey/occupa-lo-studente-fermi"
    },
    {
        name: "Dubito Online",
        description:
            "Un sito web per giocare a Dubito (un gioco di carte) con amici e giocatori online.",
        image: dubitoImg
    }
];
