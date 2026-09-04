'use client';

import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from 'flowbite-react';
import { useLocale, useTranslations } from 'next-intl';
import { config } from '@/config';
import { formatMonthYear } from '@/utils/date';

const HomepageTimeline = () => {
  const t = useTranslations('curriculum');
  const locale = useLocale();

  const freelanceDateRange = `${formatMonthYear(
    locale,
    new Date(2024, 2, 1),
  )} - ${formatMonthYear(locale, new Date())}`;

  const agencies = [...config.cvAgencies].reverse().map((name) => ({
    name,
    date: name === 'freelance' ? freelanceDateRange : t(`${name}.date`),
    job: t(`${name}.job`),
    description: t.rich(`${name}.description`, {
      ul: (children) => (
        <ul className='list-disc list-inside mb-2'>{children}</ul>
      ),
      innerul: (children) => (
        <ul className='list-[circle] list-inside ml-4 mt-1 text-[15px]'>
          {children}
        </ul>
      ),
      li: (children) => <li className='mb-2'>{children}</li>,
      strong: (children) => <strong>{children}</strong>,
      em: (children) => <em>{children}</em>,
    }),
  }));

  return (
    <Timeline
      theme={{
        root: {
          direction: {
            vertical: 'relative border-l border-gray-200 dark:border-gray-200',
          },
        },
      }}
    >
      {agencies.map((agency) => {
        const { name, date, job, description } = agency;
        return (
          <TimelineItem key={name}>
            <TimelinePoint
              theme={{
                marker: {
                  base: {
                    vertical:
                      'absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-white dark:bg-gray-200',
                  },
                },
              }}
            />
            <TimelineContent>
              <TimelineTime>
                <span className='text-gray-400 dark:text-gray-400!'>
                  {date}
                </span>
              </TimelineTime>
              <TimelineTitle className='text-white'>{job}</TimelineTitle>
              <TimelineBody className='text-gray-400'>
                {description}
              </TimelineBody>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default HomepageTimeline;
