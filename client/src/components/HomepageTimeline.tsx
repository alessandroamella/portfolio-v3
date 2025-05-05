"use client";

import { config } from "@/config";
import { Timeline } from "flowbite-react";
import { useTranslations } from "next-intl";

const HomepageTimeline = () => {
  const t = useTranslations("curriculum");

  const agencies = config.cvAgencies.map((name) => ({
    name,
    date: t(`${name}.date`),
    job: t(`${name}.job`),
    description: t(`${name}.description`),
  }));

  return (
    <Timeline>
      {agencies.map((agency) => {
        const { name, date, job, description } = agency;
        return (
          <Timeline.Item key={name}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>
                <span className="text-gray-400 dark:!text-gray-400">
                  {date}
                </span>
              </Timeline.Time>
              <Timeline.Title className="text-white">{job}</Timeline.Title>
              <Timeline.Body className="text-gray-400">
                <p>{description}</p>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export default HomepageTimeline;
