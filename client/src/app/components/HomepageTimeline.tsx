"use client";

import { Timeline } from "flowbite-react";
import labels from "../labels";

const HomepageTimeline = () => {
    return (
        <Timeline>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time className="text-gray-400">
                        {labels.it.months.july} 2021
                    </Timeline.Time>
                    <Timeline.Title className="text-white">
                        {labels.it.curriculum.infolog.job}
                    </Timeline.Title>
                    <Timeline.Body className="text-gray-400">
                        <p>{labels.it.curriculum.infolog.description}</p>
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time className="text-gray-400">
                        {labels.it.months.september} 2021
                    </Timeline.Time>
                    <Timeline.Title className="text-white">
                        {labels.it.curriculum.seta.job}
                    </Timeline.Title>
                    <Timeline.Body className="text-gray-400">
                        <p>{labels.it.curriculum.seta.description}</p>
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                    <Timeline.Time className="text-gray-400">
                        {labels.it.months.march} 2023
                    </Timeline.Time>
                    <Timeline.Title className="text-white">
                        {labels.it.curriculum.fertec.job}
                    </Timeline.Title>
                    <Timeline.Body className="text-gray-400">
                        <p>{labels.it.curriculum.fertec.description}</p>
                    </Timeline.Body>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline>
    );
};

export default HomepageTimeline;
