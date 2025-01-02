import bamboosimImg from "../public/img/bamboosim.png";
import ezaffittoImg from "../public/img/ezaffitto.png";
import vhfesuperioriImg from "../public/img/vhfesuperiori.png";
import tpldisplayImg from "../public/img/tpldisplay.png";
import wolfImg from "../public/img/wolf.png";
import occupaImg from "../public/img/occupa.png";
import omImg from "../public/img/om.png";
import { StaticImageData } from "next/image";
import { config } from "./config";

export type ProjectProp = {
    [key: (typeof config.projects)[number]]: {
        stack: string[];
        image: StaticImageData;
        url?: string;
        github?: string;
    };
};

export const projectsInfo: ProjectProp = {
    bamboosim: {
        stack: [
            "NestJS",
            "PostgreSQL",
            "Google Cloud",
            "React",
            "Tailwind",
            "TypeScript",
        ],
        image: bamboosimImg,
        url: "https://bamboosim.com",
    },
    ezaffitto: {
        stack: [
            "Node.js",
            "Python",
            "OpenAI",
            "Puppeteer",
            "Docker",
            "MongoDB",
        ],
        image: ezaffittoImg,
        github: "https://github.com/alessandroamella/ezaffitto",
    },
    vhfesuperiori: {
        stack: ["AWS", "Node.js", "MongoDB", "Express", "OpenAPI", "React"],
        image: vhfesuperioriImg,
        url: "https://www.vhfesuperiori.eu/",
        github: "https://github.com/alessandroamella/vhf-e-superiori",
    },
    occupalostudente: {
        stack: [
            "Docker",
            "Node.js",
            "TypeScript",
            "MongoDB",
            "Express",
            "React",
        ],
        image: occupaImg,
        github: "https://github.com/alessandroamella/occupa-lo-studente-fermi",
    },
    tpldisplay: {
        stack: ["Docker", "Redis", "Node.js", "TypeScript", "Express"],
        image: tpldisplayImg,
        github: "https://github.com/alessandroamella/seta-display",
    },
    wolfsurvival: {
        stack: ["Next.js", "TypeScript", "Express"],
        image: wolfImg,
        url: "https://www.wolfsurvival.it/",
    },
    om: {
        stack: ["JavaScript DOM", "Bulma", "Express"],
        image: omImg,
        url: "http://om.bitrey.it",
        github: "https://github.com/alessandroamella/codice-q",
    },
};
