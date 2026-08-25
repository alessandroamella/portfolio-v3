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
import { useTranslations } from 'next-intl';
import { config } from '@/config';

const HomepageTimeline = () => {
  const t = useTranslations('curriculum');

  const agencies = config.cvAgencies.map((name) => ({
    name,
    date: t(`${name}.date`),
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
    <Timeline>
      {agencies.map((agency) => {
        const { name, date, job, description } = agency;
        return (
          <TimelineItem key={name}>
            <TimelinePoint />
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
