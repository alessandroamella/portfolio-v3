'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import GraphElem from './GraphElem';

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
        (_, i) => `${i + Math.random() * (animDuration / 10)}s`,
      ).filter((_e, i) => i % (animDuration / graphNum) === 0),
    );

    setTopValues(
      Array.from({ length: graphNum }).map(
        (_e, _i) => (Math.random() * (height || 800)) / 3 - topPadding,
      ),
    );
  }, [animDuration, width, height]);
  // console.log("topValues", topValues);

  return (
    <div className='falling-items-container'>
      {Array.from({ length: graphNum }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: decorative, fixed-length list whose per-item state is indexed by position
          key={i}
          className='absolute falling-items z-0'
          style={{
            top: topValues[i],
            animationDelay: randomAnimDelay[i],
          }}
        >
          <GraphElem />
        </div>
      ))}
    </div>
  );
};

export default BgGraph;
