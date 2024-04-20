import Image from "next/image";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import _ from "lodash";
import { differenceInYears } from "date-fns";

import Button from "@/components/Button";
import Wave from "react-wavify";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";
import Arrow from "@/components/arrow.svg";

import { Dancing_Script } from "next/font/google";
import HomepageTimeline from "@/components/HomepageTimeline";

import ProjectsViewer from "@/components/ProjectsViewer";
import HomepageContact from "@/components/HomepageContact";
import { config } from "@/config";
import HowCanIHelpCard from "@/components/HowCanIHelpCard";

import Head from "next/head";
import BgGraph from "@/components/BgGraph";
import WeatherInfo from "@/components/Weather";
import ChangeLanguageBtn from "@/components/ChangeLanguageBtn";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

function Home({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const t = useTranslations("common");

    const changeLanguageOptions = config.languages.map(e => ({
        value: e,
        label: `${t(`languages.flag.${e}`)} ${t(`languages.full.${e}`)}`
    }));

    const cvAgencies = config.cvAgencies.map(name => ({
        name,
        date: t(`curriculum.${name}.date`),
        job: t(`curriculum.${name}.job`),
        description: t(`curriculum.${name}.description`)
    }));

    const projects = config.projects.map(id => ({
        id,
        title: t(`projects.${id}.title`),
        description: t(`projects.${id}.description`)
    }));

    return (
        <main className="bg-[#f7f7f7] min-h-screen">
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3f83f8" />
                <meta name="msapplication-TileColor" content="#3f83f8" />
                <meta name="theme-color" content="#3f83f8" />

                <meta name="title" content="Alessandro Amella - Sviluppo siti web" />
                <meta name="description" content="Sviluppo siti web, software, app e altro" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.bitrey.it/" />
                <meta property="og:title" content="Alessandro Amella - Sviluppo siti web" />
                <meta
                    property="og:description"
                    content="Sviluppo siti web, software, app e altro"
                />
                <meta property="og:image" content="https://www.bitrey.it/banner.jpg" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.bitrey.it/" />
                <meta property="twitter:title" content="Alessandro Amella - Sviluppo siti web" />
                <meta
                    property="twitter:description"
                    content="Sviluppo siti web, software, app e altro"
                />
                <meta property="twitter:image" content="https://www.bitrey.it/banner.jpg" />
            </Head>
            <header className="bg-gray-100 bg-opacity-50 flex justify-around p-4 md:px-0 items-center z-20 h-14 relative">
                <div className="flex items-center gap-4">
                    {/* <Image
                        className="drop-shadow-lg shadow-white"
                        src={aaLogo}
                        width={34}
                        height={34}
                        alt="AA logo"
                    />
                    <h3 className="select-none text-gray-700 font-bold tracking-tighter text-2xl uppercase">
                        Alessandro Amella
                    </h3> */}
                </div>

                <div className="flex text-gray-600 lowercase items-center gap-4">
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

            <section className="relative flex mt-12 md:mt-14 mb-0 pb-0 flex-col items-center justify-center z-0">
                <div className="flex items-center md:gap-8 px-8 md:px-16 mb-6">
                    <div className="mx-auto">
                        <BgGraph />
                        <div className="relative text-center">
                            {/* <h1 className="invisible text-[2.5rem] font-bold leading-tight">
                                {t("homepage.splash")}
                            </h1> */}
                            {/* <h1 className="absolute top-0 text-[2.5rem] font-bold leading-tight">
                                <HomepageTypewriter />
                            </h1> */}
                            <h1 className="text-6xl font-bold leading-tight z-20">
                                {t("homepage.splash")}
                            </h1>
                        </div>
                        {/* <p className="mt-6 text-lg text-center">{t("homepage.subtitle")}</p> */}

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
                                        width={64}
                                        height={64}
                                        alt="Arrow pointing to LinkedIn"
                                    />
                                    <p className={`${dancingScript.className} text-xl`}>
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
                    {/* <Image
                        src={meDrawing}
                        placeholder="blur"
                        loading="lazy"
                        alt="Foto mia"
                        width={400}
                        height={400}
                        className="rounded mt-8 md:mt-4 mx-auto object-cover drop-shadow-xl hover:drop-shadow-2xl transition-all"
                    /> */}
                </div>

                <Wave
                    fill="#374151"
                    paused={false}
                    options={{
                        height: 50,
                        amplitude: 20,
                        speed: 0.15,
                        points: 3
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
                            years: differenceInYears(new Date(), config.birthday)
                        })}{" "}
                        <WeatherInfo prefixStr={t("homepage.weather")} />
                    </p>
                    {_.range(config.descriptionNum)
                        .map(e => t(`homepage.descriptions.${e}`))
                        .map((e, i) => (
                            <p key={i} className="mt-4">
                                {e}
                            </p>
                        ))}

                    <h3 className="text-2xl text-gray-100 font-semibold tracking-tighter mt-6">
                        {t("homepage.otherInterests")}
                    </h3>

                    <ul className="max-w-md mt-4 text-gray-200 list-disc list-inside dark:text-gray-400 mb-6">
                        <li>
                            {t("homepage.otherInterstsRadio.title")}
                            <a
                                href={t("homepage.otherInterstsRadio.url")}
                                className="text-blue-300 hover:text-blue-400 transition-colors duration-75"
                            >
                                {t("homepage.otherInterstsRadio.urlTitle")}
                            </a>
                        </li>

                        {_.range(config.otherInterestsNum)
                            .map(e => t(`homepage.otherInterestsList.${e}`))
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
                className="md:gap-24 bg-white border-t-4 px-8 md:px-16 py-8 md:py-16"
            >
                <h2 className="text-4xl font-bold text-center tracking-tight">
                    {t("homepage.someProjects")}
                </h2>
                <p className="my-2 text-lg text-center">{t("homepage.someProjectsDescription")}</p>
                <ProjectsViewer
                    builtWithStr={t("homepage.builtWith")}
                    githubStr={t("homepage.github")}
                    openStr={t("homepage.open")}
                    projects={projects}
                />

                <div className="text-right mt-4 md:-mt-16 hover:text-gray-600 transition-colors duration-75">
                    <a href={config.githubUrl} className={`${dancingScript.className} text-4xl`}>
                        ...{t("homepage.andManyOthers")}!
                    </a>
                </div>
            </section>

            <section id="contact" className="px-8 md:px-16 py-12">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        {t("homepage.letsKeepInTouch")}
                    </h2>
                    <p className="mb-8">{t("homepage.contactSubtitle")}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <HomepageContact
                            captchaErrorStr={t("contact.captchaError")}
                            messagePlaceholderStr={t("contact.messagePlaceholder")}
                            sendErrorStr={t("contact.sendError")}
                            sendStr={t("contact.send")}
                            successStr={t("contact.success")}
                            yourEmailStr={t("contact.yourEmail")}
                            yourMessageStr={t("contact.yourMessage")}
                            yourNameStr={t("contact.yourName")}
                        />
                        <div>
                            <h2 className="text-3xl text-gray-800 font-bold tracking-tighter mb-6">
                                {t("homepage.howCanIHelpYou")}
                            </h2>

                            <HowCanIHelpCard
                                name={t("homepage.webDevelopment")}
                                description={t("homepage.webDevelopmentDescription")}
                                hasHr
                            />
                            <HowCanIHelpCard
                                name={t("homepage.consulting")}
                                description={t("homepage.consultingDescription")}
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
                                    <span className="ml-2">{config.telegramDisplayUrl}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-700 border-gray-200 border-t-4 text-white px-8 md:px-24 py-6 z-50 flex flex-col items-center md:flex-row justify-start md:justify-around">
                <div className="flex justify-center items-center gap-2">
                    {/* <Image
                        className="drop-shadow-lg shadow-white"
                        src={aaLogoWhite}
                        width={32}
                        height={32}
                        alt="AA logo"
                    /> */}
                    <h3 className="select-none tracking-tighter lowercase font-bold text-2xl">
                        Bitrey
                        <span className="text-gray-400">.it</span>
                    </h3>
                </div>
                <p className="font-light">2024 &copy; Alessandro Amella</p>
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
