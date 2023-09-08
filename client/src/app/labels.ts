import { config } from "./config";
import { differenceInYears } from "date-fns";

export const labels = {
    en: {
        header: {
            about: "About",
            projects: "Projects",
            contact: "Contact"
        },
        homepage: {
            splash: "Hi! I'm Alessandro, I can help you create your website.",
            subtitle:
                "I'm a Computer Science student at the University of Bologna and I build websites for individuals and companies.",
            projects: "Projects"
        },
        months: {
            january: "January",
            february: "February",
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            july: "July",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December"
        }
    },
    it: {
        header: {
            about: "Chi sono",
            projects: "Progetti",
            contact: "Contatti"
        },
        homepage: {
            splash: "Alessandro Amella",
            projects: "Progetti",
            mainDescription: `Studente di Informatica all'Università di Bologna, programmatore, ${differenceInYears(
                new Date(),
                config.birthday
            )} anni, vivo a Modena`,
            descriptions: [
                "Ho iniziato a programmare quando avevo 9 anni e da allora non ho più smesso di esplorare l'informatica in ogni suo ramo.",
                "Studiando prevelantemente da autodidatta, ho proseguito gli studi in informatica-telecomunicazioni presso l'ITIS di Modena, diplomandomi con 98/100.",
                "Attualmente studio all'Alma Mater, e punto ad un corso di laurea magistrale in ambito AI (da qualche parte)."
            ],
            otherInterests: "Altri miei interessi:",
            otherInterstsRadio: {
                title: "Radio e telecomunicazioni: diploma in telecom. e ",
                urlTitle: "radioamatore",
                url: "https://www.qrz.com/db/IU4QSG"
            },
            otherInterestsList: [
                "Elettronica e microcontrollori (Arduino, ESP8266, Raspberry Pi)",
                "Trasporti pubblici e pianificazione urbanistica",
                "Fotografia, video editing e mixing musicale (DJing)",
                "Videogiochi e game development"
            ],
            // "Negli anni ho acquisito esperienza in diversi linguaggi di programmazione e tecnologie web grazie alla scuola e alla mia passione per l'informatica.",
            // "Ho fatto diversi stage in aziende del settore informatico e ho lavorato come sviluppatore web freelance per aziende e associazioni. Nel 2022 ho conseguito la patente da radioamatore, ed iniziato a studiare Informatica all'Università di Bologna.",
            // "Ora mi occupo di sviluppo web, che bilancio con lo studio universitario.",
            // "Sono disponibile per progetti di sviluppo web, contattami per un preventivo gratuito!",
            someProjects: "Alcuni miei progetti",
            someProjectsDescription:
                "Questi sono solo alcuni dei progetti che ho realizzato, molti altri sono su GitHub.",
            github: "GitHub",
            githubUsername: "Bitrey",
            linkedin: "LinkedIn",
            instagram: "Instagram",
            cv: "Curriculum Vitae",
            open: "Apri",
            builtWith: "Realizzato con",
            andManyOthers: "e molti altri",
            letsKeepInTouch: "Contatti",
            contactSubtitle:
                "Per commissioni, collaborazioni o semplicemente per chiacchierare, puoi contattarmi tramite il seguente form (o i canali in fondo a destra).",
            otherChannels: "Mi trovi anche su",
            howCanIHelpYou: "Sono aperto a:",
            webDevelopment: "Sviluppo web, software e app",
            webDevelopmentDescription:
                "Sviluppo di siti web, applicazioni web e software su misura.",
            consulting: "Consulenza informatica",
            consultingDescription:
                "Consulenza su problemi informatici, scelta di tecnologie e soluzioni.",
            other: "Altro",
            otherDescription: "Qualsiasi altra informazione o richiesta."
        },
        contact: {
            yourEmail: "La tua email",
            yourName: "Il tuo nome",
            yourMessage: "Il tuo messaggio",
            messagePlaceholder: "Scrivi qui il tuo messaggio...",
            send: "Invia",
            telegram: "Telegram",
            email: "Email",
            captchaError: "Captcha non valido",
            success: "Messaggio inviato con successo, grazie",
            sendError: "Errore durante l'invio del messaggio :("
        },
        months: {
            january: "Gennaio",
            february: "Febbraio",
            march: "Marzo",
            april: "Aprile",
            may: "Maggio",
            june: "Giugno",
            july: "Luglio",
            august: "Agosto",
            september: "Settembre",
            october: "Ottobre",
            november: "Novembre",
            december: "Dicembre"
        },
        curriculum: {
            infolog: {
                date: "Luglio 2021",
                job: "Sistemista",
                description:
                    "Sistemista presso l'azienda Infolog S.r.l. di Modena, dove ho lavorato con il team di sviluppo per la realizzazione di un'applicazione web per la gestione di un magazzino."
            },
            seta: {
                date: "Settembre 2021",
                job: "Programmatore software",
                description:
                    "Stage presso l'azienda di trasporto pubblico di Modena SETA S.p.A., dove ho sviluppato il software per la generazione dei file audio per gli annunci a bordo dei bus. Ho inoltre eseguito un analisi dei dati per l'addestramento di un modello di machine learning per il conteggio dei passeggeri."
            },
            fertec: {
                date: "Marzo 2023",
                job: "Programmatore web",
                description:
                    "Progettazione e sviluppo di soluzioni software avanzate, tra cui sistemi a microservizi per IoT, software di analisi dei costi, applicazioni mobili e web."
            }
            // "?": {
            //     date: "≥ " + new Date().getFullYear(),
            //     job: "Boh",
            //     description: "Chi lo sa"
            // }
        }
    }
};

export default labels;
