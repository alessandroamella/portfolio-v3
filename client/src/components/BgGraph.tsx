"use client";

import React, { useEffect, useState } from "react";
import GraphElem from "./GraphElem";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{ width?: number; height?: number }>({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

const BgGraph = () => {
    const { width, height } = useWindowSize();

    // const graphNum = width && width < 768 ? 3 : 5;
    const graphNum = 5;
    // const topPadding = !height || height < 1024 ? 500 : 0;
    const topPadding = 350;

    const animDuration = !width || width < 768 ? 10 : width < 1024 ? 20 : 30;

    const [randomAnimDelay, setRandomAnimDelay] = useState<string[]>([]);
    const [topValues, setTopValues] = useState<number[]>([]);

    useEffect(() => {
        if (!width || !height) return;

        setRandomAnimDelay(
            Array.from(
                { length: animDuration },
                (_, i) => i + Math.random() * (animDuration / 10) + "s"
            ).filter((e, i) => i % (animDuration / graphNum) === 0)
        );

        setTopValues(
            Array.from({ length: graphNum }).map(
                (_e, i) => (Math.random() * (height || 800)) / 3 - topPadding
            )
        );
    }, [animDuration, graphNum, width, height]);
    // console.log("topValues", topValues);

    return (
        <div className="falling-items-container">
            {Array.from({ length: graphNum }).map((_e, i) => (
                <div
                    key={i}
                    className="absolute falling-items z-0"
                    style={{ top: topValues[i], animationDelay: randomAnimDelay[i] }}
                >
                    <GraphElem />
                </div>
            ))}
        </div>
    );
};

export default BgGraph;
