import ezaffittoImg from "../public/img/ezaffitto.png";
import vhfesuperioriImg from "../public/img/vhfesuperiori.png";
import tpldisplayImg from "../public/img/tpldisplay.png";
import wolfImg from "../public/img/wolf.png";
import occupaImg from "../public/img/occupa.png";
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
    ezaffitto: {
        stack: ["Node.js", "Python", "OpenAI", "Puppeteer", "Docker", "MongoDB"],
        image: ezaffittoImg,
        github: "https://github.com/Bitrey/ezaffitto"
    },
    vhfesuperiori: {
        stack: ["Node.js", "TypeScript", "MongoDB", "Express", "OpenAPI", "React"],
        image: vhfesuperioriImg,
        url: "https://www.vhfesuperiori.eu/",
        github: "https://github.com/Bitrey/vhf-e-superiori"
    },
    occupalostudente: {
        stack: ["Docker", "Node.js", "TypeScript", "MongoDB", "Express", "React"],
        image: occupaImg,
        github: "https://github.com/Bitrey/occupa-lo-studente-fermi"
    },
    tpldisplay: {
        stack: ["Docker", "Redis", "Node.js", "TypeScript", "Express"],
        image: tpldisplayImg,
        github: "https://github.com/Bitrey/seta-display"
    },
    wolfsurvival: {
        stack: ["Next.js", "TypeScript", "Express"],
        image: wolfImg,
        url: "https://www.wolfsurvival.it/"
    }
};
