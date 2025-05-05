import ArrowWhite from "@/components/arrow-white.svg?url";
import Arrow from "@/components/arrow.svg?url";
import BgGraph from "@/components/BgGraph";
import Button from "@/components/Button";
import HomepageContact from "@/components/HomepageContact";
import HomepageTimeline from "@/components/HomepageTimeline";
import HowCanIHelpCard from "@/components/HowCanIHelpCard";
import ProjectsViewer from "@/components/ProjectsViewer";
import WeatherInfo from "@/components/Weather";
import { config } from "@/config";
import { differenceInYears } from "date-fns";
import { range } from "lodash";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { use } from "react";
import {
  FaBlog,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Wave from "react-wavify";
import MainLayout from "./MainLayout";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alessandro Amella - Sviluppo e Soluzioni Informatiche - bitrey.dev",
  description:
    "bitrey.dev di Alessandro Amella - Sviluppo software, applicazioni web e software su misura per privati e aziende.",
};

function Home(props: { params: Promise<{ locale: string }> }) {
  const params = use(props.params);

  const { locale } = params;
  const t = useTranslations("homepage");

  return (
    <MainLayout>
      <section className="py-12 dark:text-white relative flex mt-0 flex-col items-center justify-center z-0">
        <div className="flex items-center md:gap-8 px-8 md:px-16 mb-6">
          <div className="mx-auto">
            <BgGraph />
            <div className="relative text-center">
              <div className="font-light text-lg text-gray-500 dark:text-gray-400 text-center md:text-left -mb-3 md:mb-0 w-full">
                <span className="text-gray-950/95 dark:text-gray-100/95">
                  bitrey.dev
                </span>{" "}
                {t("by")}
              </div>
              <h1 className="text-6xl font-bold leading-none z-20">
                {t("splash")}
              </h1>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 z-20 relative">
              <Button
                href={config.blogUrl}
                className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
              >
                <FaBlog />
                {t("blog")}
              </Button>
              <div className="relative">
                <Button
                  color="blue"
                  href={config.linkedinUrl}
                  className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
                >
                  <FaLinkedin />
                  {t("linkedin")}
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
                  <p className={`${dancingScript.className} text-xl`}>
                    {t("cv")}
                  </p>
                </div>
              </div>

              <Button
                href={`/${locale}/countries`}
                className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
              >
                <FaGlobe />
                <span>{t("travels")}</span>
              </Button>

              <Button
                href={config.githubUrl}
                className="relative flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
              >
                <span className="invisible">A-</span>
                <div className="absolute">
                  <FaGithub />
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
            {t("about")}
          </h2>

          <p>
            {t("mainDescription", {
              years: differenceInYears(new Date(), config.birthday),
            })}{" "}
            <WeatherInfo prefixStr={t("weather")} />
          </p>
          {range(config.descriptionNum)
            .map((e) => t(`descriptions.${e}`))
            .map((e, i) => (
              <p key={i} className="mt-4">
                {e}
              </p>
            ))}

          <h3 className="text-2xl text-gray-100 font-semibold tracking-tighter mt-6">
            {t("otherInterests")}
          </h3>

          <ul className="max-w-md mt-4 list-disc list-inside text-gray-300 mb-6">
            <li>
              {t("otherInterstsRadio.title")}
              <a
                href={t("otherInterstsRadio.url")}
                className="text-blue-300 hover:text-blue-400 transition-colors duration-75"
              >
                {t("otherInterstsRadio.urlTitle")}
              </a>
            </li>

            {range(config.otherInterestsNum)
              .map((e) => t(`otherInterestsList.${e}`))
              .map((e, i) => (
                <li key={i} className="mt-4">
                  {e}.
                </li>
              ))}
          </ul>
        </div>

        <div>
          <HomepageTimeline />
          <div className="flex mb-2 justify-center md:justify-start">
            <Button
              color="blue"
              href={config.linkedinUrl}
              className="flex items-center gap-2 rounded-lg font-medium tracking-tight text-xl px-4 py-3"
            >
              <FaLinkedin />
              {t("linkedin")}
            </Button>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="md:gap-24 bg-white dark:bg-gray-900 dark:text-gray-200 border-t-4 px-8 md:px-16 py-8 md:py-16"
      >
        <h2 className="text-4xl font-bold text-center dark:text-white tracking-tight">
          {t("someProjects")}
        </h2>
        <p className="my-2 text-lg dark:text-gray-400 text-center">
          {t("someProjectsDescription")}
        </p>
        <ProjectsViewer
          builtWithStr={t("builtWith")}
          githubStr={t("github")}
          openStr={t("open")}
        />

        <div className="text-right mt-4 md:-mt-16 hover:text-gray-600 transition-colors duration-75">
          <a
            href={config.githubUrl}
            className={`${dancingScript.className} text-4xl`}
          >
            ...{t("andManyOthers")}!
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="dark:text-white dark:bg-gray-800 px-8 md:px-16 py-12"
      >
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t("letsKeepInTouch")}
          </h2>
          <p className="mb-8 dark:text-gray-200">{t("contactSubtitle")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <HomepageContact />
            <div>
              <h2 className="text-3xl text-gray-800 dark:text-white font-bold tracking-tighter mb-6">
                {t("howCanIHelpYou")}
              </h2>

              <HowCanIHelpCard
                name={t("webDevelopment")}
                description={t("webDevelopmentDescription")}
                hasHr
              />
              <HowCanIHelpCard
                name={t("consulting")}
                description={t("consultingDescription")}
                hasHr
              />
              <HowCanIHelpCard
                name={t("other")}
                description={t("otherDescription")}
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Home;
