"use client";

import { Timeline } from "flowbite-react";
import { FC } from "react";

interface HomepageTimelineProps {
    agencies: {
        name: string;
        date: string;
        job: string;
        description: string;
    }[];
}

const HomepageTimeline: FC<HomepageTimelineProps> = ({ agencies }) => {
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
                            <Timeline.Title className="text-white">
                                {job}
                            </Timeline.Title>
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
