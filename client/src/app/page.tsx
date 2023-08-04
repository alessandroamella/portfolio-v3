import Image from "next/image";
import { labels } from "./labels";
import Button from "./components/Button";
import Wave from "react-wavify";
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import Arrow from "./components/arrow.svg";

import { Dancing_Script } from "next/font/google";
import HomepageTimeline from "./components/HomepageTimeline";

import ProjectsViewer from "./components/ProjectsViewer";
import HomepageTypewriter from "./components/HomepageTypewriter";
import HomepageContact from "./components/HomepageContact";
import { config } from "./config";
import HowCanIHelpCard from "./components/HowCanIHelpCard";

import meDrawing from "../../public/img/me_drawing.png";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

function Home() {
    return (
        <main className="bg-[#f7f7f7] min-h-screen">
            <header className="flex justify-around p-4 md:px-0 items-center">
                <h3 className="select-none text-gray-700 font-bold tracking-tighter text-2xl uppercase">
                    Alessandro Amella
                </h3>
                <div className="hidden text-gray-600 lowercase md:flex items-center gap-4">
                    <a className="hover:text-gray-700" href="#about">
                        {labels.it.header.about}
                    </a>
                    <a className="hover:text-gray-700" href="#projects">
                        {labels.it.header.projects}
                    </a>
                    <a className="hover:text-gray-700" href="#contact">
                        {labels.it.header.contact}
                    </a>
                </div>
            </header>

            <section className="flex mt-12 md:mt-20 mb-0 pb-0 flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-8 px-8 md:px-16">
                    <div className="mx-auto">
                        <div className="relative">
                            <h1 className="invisible text-[2.5rem] font-bold leading-tight">
                                {labels.it.homepage.splash}
                            </h1>
                            <h1 className="absolute top-0 text-[2.5rem] font-bold leading-tight">
                                <HomepageTypewriter />
                            </h1>
                        </div>
                        <p className="mt-6 text-lg">
                            {labels.it.homepage.subtitle}
                        </p>

                        <div className="mt-16 flex items-center justify-center gap-6">
                            <Button
                                href={config.githubUrl}
                                className="flex items-center gap-2 rounded-2xl font-medium tracking-tight text-xl px-4 py-3"
                            >
                                <FaGithub />
                                {labels.it.homepage.github}
                            </Button>
                            <div className="relative">
                                <Button
                                    color="blue"
                                    href={config.linkedinUrl}
                                    className="flex items-center gap-2 rounded-2xl font-medium tracking-tight text-xl px-4 py-3"
                                >
                                    <FaLinkedin />
                                    {labels.it.homepage.linkedin}
                                </Button>
                                <div className="flex justify-end items-end absolute -bottom-16 md:-bottom-12 -right-16 md:-right-36">
                                    <Image
                                        src={Arrow}
                                        width={64}
                                        height={64}
                                        alt="Arrow pointing to LinkedIn"
                                    />
                                    <p
                                        className={`${dancingScript.className} text-xl`}
                                    >
                                        {labels.it.homepage.cv}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image
                        // src="/img/io.png"
                        src={meDrawing}
                        placeholder="blur"
                        // blurDataURL="/img/io_tn.jpg"
                        loading="lazy"
                        alt="Foto mia"
                        width={400}
                        height={400}
                        className="rounded mt-8 md:mt-4 mx-auto object-cover drop-shadow-xl hover:drop-shadow-2xl transition-all"
                    />
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
                />
            </section>
            <section
                id="about"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 -mt-8 px-8 md:px-16 pt-0 pb-6 z-0 bg-gray-700 text-white"
            >
                <div>
                    <h2 className="text-4xl font-bold text-center tracking-tight mb-8">
                        {labels.it.header.about}
                    </h2>

                    <p>{labels.it.homepage.description}</p>
                    <p className="mt-6">{labels.it.homepage.description2}</p>
                    <p className="mt-4">{labels.it.homepage.description3}</p>
                    <p className="mt-4">{labels.it.homepage.description4}</p>
                </div>

                <HomepageTimeline />
            </section>

            <section
                id="projects"
                className="md:gap-24 bg-white border-t-4 px-8 md:px-16 py-8 md:py-16"
            >
                <h2 className="text-4xl font-bold text-center tracking-tight">
                    {labels.it.homepage.someProjects}
                </h2>
                <ProjectsViewer />

                <div className="text-right md:-mt-16 hover:text-gray-600 transition-colors duration-75">
                    <a
                        href={config.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${dancingScript.className} text-4xl`}
                    >
                        ...{labels.it.homepage.andManyOthers}!
                    </a>
                </div>
            </section>

            <section id="contact" className="px-8 md:px-16 py-12">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        {labels.it.homepage.letsKeepInTouch}
                    </h2>
                    <p className="mb-8">{labels.it.homepage.contactSubtitle}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <HomepageContact />
                        <div>
                            <h2 className="text-3xl text-gray-800 font-bold tracking-tighter mb-8">
                                {labels.it.homepage.howCanIHelpYou}
                            </h2>

                            <HowCanIHelpCard
                                name={labels.it.homepage.webDevelopment}
                                description={
                                    labels.it.homepage.webDevelopmentDescription
                                }
                                hasHr
                            />
                            <HowCanIHelpCard
                                name={labels.it.homepage.consulting}
                                description={
                                    labels.it.homepage.consultingDescription
                                }
                                hasHr
                            />
                            <HowCanIHelpCard
                                name={labels.it.homepage.other}
                                description={
                                    labels.it.homepage.otherDescription
                                }
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

            <footer className="bg-gray-700 border-gray-200 border-t-4 text-white px-8 md:px-24 py-6 z-50 flex flex-col items-center md:flex-row justify-start md:justify-around">
                <h3 className="select-none tracking-tighter uppercase font-bold text-2xl">
                    Bitrey
                </h3>
                <p className="font-light">2023 &copy; Alessandro Amella</p>
                <a
                    href={`mailto:${config.email}`}
                    className="flex items-center rounded-xl px-4 tracking-tighter"
                >
                    <FaEnvelope />
                    <span className="ml-2">{config.email}</span>
                </a>
            </footer>
        </main>
    );
}

export default Home;
