import Image from "next/image";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { range } from "lodash";
import { differenceInYears, getYear } from "date-fns";
import type { Metadata } from "next";

import Button from "@/components/Button";
import Wave from "react-wavify";
import {
    FaEnvelope,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTelegram,
} from "react-icons/fa";
import Arrow from "@/components/arrow.svg?url";
import ArrowWhite from "@/components/arrow-white.svg?url";

import { Dancing_Script } from "next/font/google";
import HomepageTimeline from "@/components/HomepageTimeline";

import ProjectsViewer from "@/components/ProjectsViewer";
import HomepageContact from "@/components/HomepageContact";
import { config } from "@/config";
import HowCanIHelpCard from "@/components/HowCanIHelpCard";

import BgGraph from "@/components/BgGraph";
import WeatherInfo from "@/components/Weather";
import ChangeLanguageBtn from "@/components/ChangeLanguageBtn";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Alessandro Amella - Sviluppo e Soluzioni Informatiche",
    description:
        "bitrey.dev di Alessandro Amella - Sviluppo software, applicazioni web e software su misura per privati e aziende.",
};

function Home({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const t = useTranslations("common");

    const changeLanguageOptions = config.languages.map((e) => ({
        value: e,
        label: `${t(`languages.flag.${e}`)} ${t(`languages.full.${e}`)}`,
    }));

    const cvAgencies = config.cvAgencies.map((name) => ({
        name,
        date: t(`curriculum.${name}.date`),
        job: t(`curriculum.${name}.job`),
        description: t(`curriculum.${name}.description`),
    }));

    const projects = config.projects.map((id) => ({
        id,
        title: t(`projects.${id}.title`),
        description: t(`projects.${id}.description`),
    }));

    return (
        <main className="bg-[#f7f7f7] dark:bg-gray-900 min-h-screen">
            <link
                rel="icon"
                type="image/png"
                href="/favicon-96x96.png"
                sizes="96x96"
            />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <meta name="apple-mobile-web-app-title" content="bitrey.dev" />
            <link rel="manifest" href="/site.webmanifest" />

            <meta
                name="title"
                content="Alessandro Amella - Sviluppo siti web"
            />
            <meta
                name="description"
                content="Sviluppo siti web, software, app e altro"
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.bitrey.it/" />
            <meta
                property="og:title"
                content="Alessandro Amella - Sviluppo siti web"
            />
            <meta
                property="og:description"
                content="Sviluppo siti web, software, app e altro"
            />
            <meta
                property="og:image"
                content="https://www.bitrey.it/banner.jpg"
            />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.bitrey.it/" />
            <meta
                property="twitter:title"
                content="Alessandro Amella - Sviluppo siti web"
            />
            <meta
                property="twitter:description"
                content="Sviluppo siti web, software, app e altro"
            />
            <meta
                property="twitter:image"
                content="https://www.bitrey.it/banner.jpg"
            />
            <header className="bg-gray-100 dark:bg-gray-800/90 bg-opacity-50 flex justify-around p-4 md:px-0 items-center z-20 h-14 relative">
                <div className="flex text-gray-600 dark:text-gray-200 lowercase items-center gap-4">
                    <a className="hover:text-gray-700" href="#about">
                        {t("header.about")}
                    </a>
                    <a className="hover:text-gray-700" href="#projects">
                        {t("header.projects")}
                    </a>
                    <a className="hover:text-gray-700" href="#contact">
                        {t("header.contact")}
                    </a>
                    <ChangeLanguageBtn options={changeLanguageOptions} />
                </div>
            </header>

            <section className="dark:text-white relative flex mt-12 md:mt-14 mb-0 pb-0 flex-col items-center justify-center z-0">
                <div className="flex items-center md:gap-8 px-8 md:px-16 mb-6">
                    <div className="mx-auto">
                        <BgGraph />
                        <div className="relative text-center">
                            <div className="font-light text-lg text-gray-500 dark:text-gray-400 text-center md:text-left -mb-3 md:mb-0 w-full">
                                <span className="text-gray-950/95 dark:text-gray-100/95">
                                    bitrey.dev
                                </span>{" "}
                                {t("homepage.by")}
                            </div>
                            <h1 className="text-6xl font-bold leading-none z-20">
                                {t("homepage.splash")}
                            </h1>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-2 z-20 relative">
                            <Button
                                href={config.githubUrl}
                                className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
                            >
                                <FaGithub />
                                {t("homepage.github")}
                            </Button>
                            <div className="relative">
                                <Button
                                    color="blue"
                                    href={config.linkedinUrl}
                                    className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
                                >
                                    <FaLinkedin />
                                    {t("homepage.linkedin")}
                                </Button>
                                <div className="flex justify-end items-end absolute -bottom-16 -right-16 md:-right-32">
                                    <Image
                                        src={Arrow}
                                        width="0"
                                        height="0"
                                        style={{
                                            width: "4rem",
                                            height: "4rem",
                                        }}
                                        className="dark:hidden"
                                        alt="Arrow pointing to LinkedIn"
                                    />
                                    <Image
                                        src={ArrowWhite}
                                        width="0"
                                        height="0"
                                        style={{
                                            width: "4rem",
                                            height: "4rem",
                                        }}
                                        className="hidden dark:block"
                                        alt="Arrow pointing to LinkedIn"
                                    />
                                    <p
                                        className={`${dancingScript.className} text-xl`}
                                    >
                                        {t("homepage.cv")}
                                    </p>
                                </div>
                            </div>
                            <Button
                                // color="purple"
                                href={config.telegramUrl}
                                className="relative flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
                            >
                                <span className="invisible">A-</span>
                                <div className="absolute">
                                    <FaTelegram />
                                </div>
                            </Button>
                            <Button
                                // color="purple"
                                href={config.instagramUrl}
                                className="relative flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
                            >
                                <span className="invisible">A-</span>
                                <div className="absolute">
                                    <FaInstagram />
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>

                <Wave
                    fill="#374151"
                    paused={false}
                    options={{
                        height: 50,
                        amplitude: 20,
                        speed: 0.15,
                        points: 3,
                    }}
                    className="z-10"
                />
            </section>
            <section
                id="about"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 -mt-12 px-8 md:px-16 pt-0 pb-6 z-10 relative bg-gray-700 text-white"
            >
                <div>
                    <h2 className="text-4xl font-bold text-center tracking-tight mb-8 z-50 relative">
                        {t("homepage.about")}
                    </h2>

                    <p>
                        {t("homepage.mainDescription", {
                            years: differenceInYears(
                                new Date(),
                                config.birthday,
                            ),
                        })}{" "}
                        <WeatherInfo prefixStr={t("homepage.weather")} />
                    </p>
                    {range(config.descriptionNum)
                        .map((e) => t(`homepage.descriptions.${e}`))
                        .map((e, i) => (
                            <p key={i} className="mt-4">
                                {e}
                            </p>
                        ))}

                    <h3 className="text-2xl text-gray-100 font-semibold tracking-tighter mt-6">
                        {t("homepage.otherInterests")}
                    </h3>

                    <ul className="max-w-md mt-4 list-disc list-inside text-gray-300 mb-6">
                        <li>
                            {t("homepage.otherInterstsRadio.title")}
                            <a
                                href={t("homepage.otherInterstsRadio.url")}
                                className="text-blue-300 hover:text-blue-400 transition-colors duration-75"
                            >
                                {t("homepage.otherInterstsRadio.urlTitle")}
                            </a>
                        </li>

                        {range(config.otherInterestsNum)
                            .map((e) => t(`homepage.otherInterestsList.${e}`))
                            .map((e, i) => (
                                <li key={i} className="mt-4">
                                    {e}.
                                </li>
                            ))}
                    </ul>
                </div>

                <div>
                    <HomepageTimeline agencies={cvAgencies} />
                    <div className="flex mb-2 justify-center md:justify-start">
                        <Button
                            color="blue"
                            href={config.linkedinUrl}
                            className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
                        >
                            <FaLinkedin />
                            {t("homepage.linkedin")}
                        </Button>
                    </div>
                </div>
            </section>

            <section
                id="projects"
                className="md:gap-24 bg-white dark:bg-gray-900 dark:text-gray-200 border-t-4 px-8 md:px-16 py-8 md:py-16"
            >
                <h2 className="text-4xl font-bold text-center dark:text-white tracking-tight">
                    {t("homepage.someProjects")}
                </h2>
                <p className="my-2 text-lg dark:text-gray-400 text-center">
                    {t("homepage.someProjectsDescription")}
                </p>
                <ProjectsViewer
                    builtWithStr={t("homepage.builtWith")}
                    githubStr={t("homepage.github")}
                    openStr={t("homepage.open")}
                    projects={projects}
                />

                <div className="text-right mt-4 md:-mt-16 hover:text-gray-600 transition-colors duration-75">
                    <a
                        href={config.githubUrl}
                        className={`${dancingScript.className} text-4xl`}
                    >
                        ...{t("homepage.andManyOthers")}!
                    </a>
                </div>
            </section>

            <section
                id="contact"
                className="dark:text-white dark:bg-gray-800 px-8 md:px-16 py-12"
            >
                <div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        {t("homepage.letsKeepInTouch")}
                    </h2>
                    <p className="mb-8 dark:text-gray-200">
                        {t("homepage.contactSubtitle")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <HomepageContact
                            captchaErrorStr={t("contact.captchaError")}
                            messagePlaceholderStr={t(
                                "contact.messagePlaceholder",
                            )}
                            sendErrorStr={t("contact.sendError")}
                            sendStr={t("contact.send")}
                            successStr={t("contact.success")}
                            yourEmailStr={t("contact.yourEmail")}
                            yourMessageStr={t("contact.yourMessage")}
                            yourNameStr={t("contact.yourName")}
                        />
                        <div>
                            <h2 className="text-3xl text-gray-800 dark:text-white font-bold tracking-tighter mb-6">
                                {t("homepage.howCanIHelpYou")}
                            </h2>

                            <HowCanIHelpCard
                                name={t("homepage.webDevelopment")}
                                description={t(
                                    "homepage.webDevelopmentDescription",
                                )}
                                hasHr
                            />
                            <HowCanIHelpCard
                                name={t("homepage.consulting")}
                                description={t(
                                    "homepage.consultingDescription",
                                )}
                                hasHr
                            />
                            <HowCanIHelpCard
                                name={t("homepage.other")}
                                description={t("homepage.otherDescription")}
                            />

                            <div className="flex flex-col mt-16 gap-4">
                                <a
                                    href={`mailto:${config.email}`}
                                    className="hover:text-gray-700 transition-colors duration-75 flex items-center rounded-xl px-4 font-medium tracking-tighter"
                                >
                                    <FaEnvelope />
                                    <span className="ml-2">{config.email}</span>
                                </a>
                                <a
                                    href={config.telegramUrl}
                                    className="hover:text-gray-700 transition-colors duration-75 flex items-center rounded-xl px-4 font-medium tracking-tighter"
                                >
                                    <FaTelegram />
                                    <span className="ml-2">
                                        {config.telegramDisplayUrl}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-700 border-gray-200 border-t-4 text-white px-8 md:px-24 py-6 z-50 flex flex-col items-center md:flex-row justify-start gap-4 md:justify-around">
                <div className="flex flex-col">
                    <h3 className="select-none tracking-tighter lowercase font-bold text-2xl">
                        Bitrey
                        <span className="text-gray-400">.dev</span>
                    </h3>
                    <h4 className="select-none -mt-[2px] text-gray-400 tracking-tighter lowercase text-sm font-medium">
                        <span className="font-normal">&</span> Bitrey
                        <span>.it</span>
                    </h4>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="font-light text-center">
                        {getYear(new Date())} &copy; Alessandro Amella
                    </p>
                    <p className="font-light text-center">
                        <span className="text-gray-300">
                            {t("footer.vatNumber")}
                        </span>
                        : <span className="font-medium">04183560368</span>
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <a
                        href={`mailto:${config.email}`}
                        className="flex items-center rounded-xl px-4 tracking-tighter"
                    >
                        <FaEnvelope />
                        <span className="ml-2">{config.email}</span>
                    </a>
                    <a
                        href={config.instagramUrl}
                        className="flex items-center rounded-xl px-4 tracking-tighter font-light"
                    >
                        <FaInstagram />
                        <span className="ml-2">{config.instagramUsername}</span>
                    </a>
                </div>
            </footer>
        </main>
    );
}

export default Home;
