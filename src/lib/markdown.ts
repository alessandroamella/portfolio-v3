// Markdown versions of the pages, for LLMs and AI agents. Rendered from the
// same messages and config as the HTML pages, so the two can't drift apart

import { differenceInYears } from 'date-fns';
import { createTranslator } from 'next-intl';
import { config } from '@/config';
import { projectsInfo } from '@/config/projects';
import { getI18nCountryName } from '@/utils/countries';
import { formatMonthYearRange } from '@/utils/date';
import {
  htmlPath,
  type MarkdownPage,
  markdownPages,
  markdownPath,
} from './markdown-paths';

type Translator = ReturnType<typeof createTranslator>;

const visibleLanguages = config.languages.filter((e) => !e.hidden);

async function getTranslator(locale: string): Promise<Translator> {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return createTranslator({ locale, messages });
}

const absolute = (path: string) => `${config.siteUrl}${path}`;

// Inline tags used across the messages
const inlineTags = {
  strong: (chunks: string) => `**${chunks}**`,
  em: (chunks: string) => `*${chunks}*`,
};

function header(t: Translator, locale: string, page: MarkdownPage) {
  const others = visibleLanguages
    .filter((e) => e.value !== locale)
    .map((e) => `[${e.label}](${absolute(markdownPath(e.value, page))})`)
    .join(', ');
  return [
    `> ${t('metadata.description')}`,
    '',
    `- ${t('markdown.htmlVersion')}: ${absolute(htmlPath(locale, page))}`,
    `- ${t('markdown.otherLanguages')}: ${others}`,
  ].join('\n');
}

function aboutSection(t: Translator, locale: string) {
  const description = t
    .markup('homepage.description', {
      ...inlineTags,
      p: (chunks) => `${chunks}\n\n`,
      br: () => '\n\n',
      // live weather widget, meaningless in a static document
      weather: () => '',
      years: differenceInYears(new Date(), config.birthday),
    })
    .replace(/ +,/g, ',')
    .trim();

  const education = (['Au', 'Unibo', 'But', 'Itis'] as const).map(
    (id) =>
      `- **${t(`homepage.education${id}`)}**, ${t(`homepage.education${id}Sub`)}`,
  );

  const interests = [
    'radio',
    'electronics',
    'transport',
    'aviation',
    'travel',
  ].map(
    (id) =>
      `- ${t.markup(`homepage.otherInterestsList.${id}`, {
        ham: (chunks) => `[${chunks}](${config.qrzUrl})`,
        countries: (chunks) =>
          `[${chunks}](${absolute(markdownPath(locale, 'countries'))})`,
        numCountries: config.visitedCountries.length.toString(),
      })}`,
  );

  return [
    `## ${t('homepage.about')}`,
    description,
    `### ${t('homepage.educationTitle')}`,
    education.join('\n'),
    `### ${t('homepage.languagesTitle')}`,
    [
      `- ${t('homepage.languageItalian')}: ${t('homepage.languageItalianSub')}`,
      `- ${t('homepage.languageEnglish')}: ${t('homepage.languageEnglishSub')}`,
    ].join('\n'),
    `### ${t('homepage.otherInterests')}`,
    interests.join('\n'),
  ].join('\n\n');
}

function experienceSection(t: Translator, locale: string) {
  const entries = [...config.cvAgencies]
    .reverse()
    .map(({ id, start, end, noteKey }) => {
      const range = formatMonthYearRange(
        locale,
        start,
        end === 'ongoing' ? new Date() : (end ?? start),
      );
      const date = noteKey
        ? `${range} · ${t(`curriculum.notes.${noteKey}`)}`
        : range;
      const description = t
        .markup(`curriculum.${id}.description`, {
          ...inlineTags,
          ul: (chunks) => chunks,
          innerul: (chunks) => chunks.replace(/^- /gm, '  - '),
          li: (chunks) => `- ${chunks}\n`,
        })
        .trim();
      return `### ${t(`curriculum.${id}.job`)}\n\n*${date}*\n\n${description}`;
    });

  return [`## ${t('markdown.experienceTitle')}`, ...entries].join('\n\n');
}

function projectsSection(t: Translator) {
  const entries = projectsInfo.map((project) => {
    const details = [
      `- ${t('markdown.status')}: ${t(`projectMeta.status.${project.status}`)}`,
      `- ${t('markdown.years')}: ${project.year}`,
      `- ${
        project.solo
          ? t('projectMeta.solo')
          : t(`projectMeta.roles.${project.roleKey}`)
      }`,
      `- ${t('homepage.builtWith')}: ${project.stack.join(', ')}`,
    ];
    if (project.url) {
      details.push(
        project.unavailable
          ? `- ${t('markdown.website')}: ${t('markdown.linkUnavailable')}`
          : `- ${t('markdown.website')}: ${project.url}`,
      );
    }
    if (project.github) {
      details.push(`- ${t('markdown.sourceCode')}: ${project.github}`);
    }
    if (project.paperUrl) {
      details.push(`- ${t('projectMeta.paper')}: ${project.paperUrl}`);
    }

    return [
      `### ${t(`projects.${project.id}.title`)}`,
      t.markup(`projects.${project.id}.description`, inlineTags),
      details.join('\n'),
    ].join('\n\n');
  });

  return [
    `## ${t('homepage.someProjects')}`,
    t('homepage.someProjectsDescription'),
    ...entries,
    `...${t('homepage.andManyOthers')}: ${config.githubUrl}`,
  ].join('\n\n');
}

function contactSection(t: Translator, locale: string) {
  const services = (
    ['studentJob', 'webDevelopment', 'consulting', 'other'] as const
  ).map(
    (id) => `- **${t(`homepage.${id}`)}**: ${t(`homepage.${id}Description`)}`,
  );

  return [
    `## ${t('homepage.letsKeepInTouch')}`,
    t('homepage.contactSubtitle'),
    `- ${t('markdown.contactForm')}: ${absolute(htmlPath(locale, 'home'))}#contact`,
    `### ${t('homepage.howCanIHelpYou')}`,
    services.join('\n'),
    `## ${t('markdown.linksTitle')}`,
    [
      `- GitHub: ${config.githubUrl}`,
      `- LinkedIn: ${config.linkedinUrl}`,
      `- Instagram: ${config.instagramUrl}`,
      `- QRZ.com (IU4QSG): ${config.qrzUrl}`,
      `- [${t.markup('footer.openSourceProject', { portfolioLink: (chunks) => chunks })}](https://github.com/alessandroamella/portfolio-v3)`,
    ].join('\n'),
  ].join('\n\n');
}

async function renderHome(locale: string) {
  const t = await getTranslator(locale);
  return [
    `# ${t('metadata.title')}`,
    header(t, locale, 'home'),
    aboutSection(t, locale),
    experienceSection(t, locale),
    projectsSection(t),
    contactSection(t, locale),
  ].join('\n\n');
}

async function renderCountries(locale: string) {
  const t = await getTranslator(locale);
  const countries = config.visitedCountries
    .map((name) => getI18nCountryName(name, locale))
    .sort((a, b) => a.localeCompare(b, locale))
    .map((name) => `- ${name}`);

  return [
    `# ${t('visitedCountries.title')}`,
    header(t, locale, 'countries'),
    t('visitedCountries.description', { x: config.visitedCountries.length }),
    `## ${t('markdown.visitedCountriesList')}`,
    countries.join('\n'),
  ].join('\n\n');
}

export async function renderPageMarkdown(
  locale: string,
  page: MarkdownPage,
): Promise<string> {
  const md =
    page === 'home' ? await renderHome(locale) : await renderCountries(locale);
  return `${md}\n`;
}

// Curated index, see https://llmstxt.org
export async function renderLlmsTxt(): Promise<string> {
  const t = await getTranslator('en');
  const pageLinks = visibleLanguages.flatMap((lang) =>
    markdownPages.map((page) => {
      const title =
        page === 'home'
          ? 'Home: about, experience, projects, contact'
          : t('visitedCountries.title');
      return `- [${title} (${lang.label})](${absolute(markdownPath(lang.value, page))})`;
    }),
  );

  return `${[
    '# Alessandro Amella',
    `> ${t('metadata.description')}`,
    'Personal portfolio of Alessandro Amella: background, education, work experience, selected software projects with their tech stacks, and how to get in touch. Every page is also available as Markdown by appending `.md` to its URL or by requesting it with `Accept: text/markdown`.',
    '## Pages',
    pageLinks.join('\n'),
    '## Profiles',
    [
      `- [GitHub](${config.githubUrl}): open source projects and code`,
      `- [LinkedIn](${config.linkedinUrl}): resume and work history`,
      '- [Source code of this site](https://github.com/alessandroamella/portfolio-v3)',
    ].join('\n'),
    '## Optional',
    `- [Full content in one file](${absolute('/llms-full.txt')}): all English pages concatenated`,
  ].join('\n\n')}\n`;
}

export async function renderLlmsFullTxt(): Promise<string> {
  const pages = await Promise.all(
    markdownPages.map((page) => renderPageMarkdown('en', page)),
  );
  return pages.join('\n---\n\n');
}
