"use client";

import { Timeline } from "flowbite-react";
import labels from "../labels";

const HomepageTimeline = () => {
    return (
        <Timeline>
            {Object.entries(labels.it.curriculum).map(([key, value]) => (
                <Timeline.Item key={key}>
                    <Timeline.Point />
                    <Timeline.Content>
                        <Timeline.Time className="text-gray-400">{value.date}</Timeline.Time>
                        <Timeline.Title className="text-white">{value.job}</Timeline.Title>
                        <Timeline.Body className="text-gray-400">
                            <p>{value.description}</p>
                        </Timeline.Body>
                    </Timeline.Content>
                </Timeline.Item>
            ))}
        </Timeline>
    );
};

export default HomepageTimeline;
