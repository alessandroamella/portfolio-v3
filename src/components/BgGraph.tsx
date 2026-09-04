'use client';

import { useEffect, useRef, useState } from 'react';
import GraphElem from './GraphElem';

const GRAPH_NUM = 5;
const TOP_PADDING = 350;

type FallingItem = { top: number; animationDelay: string };

/**
 * Spreads the items evenly across one animation cycle, with a bit of jitter.
 * The delays are negative so each item starts partway through the cycle and is
 * already in position on the first frame, instead of the last one only drifting
 * in a full cycle later. The durations must stay in sync with the
 * `.falling-items` media queries in globals.css.
 */
const buildItems = (): FallingItem[] => {
  const { innerWidth, innerHeight } = window;
  const duration = innerWidth < 768 ? 10 : innerWidth < 1024 ? 20 : 30;
  const step = duration / GRAPH_NUM;
  const jitter = duration / 10;

  return Array.from({ length: GRAPH_NUM }, (_, i) => ({
    top: (Math.random() * innerHeight) / 3 - TOP_PADDING,
    animationDelay: `-${i * step + Math.random() * jitter}s`,
  }));
};

const BgGraph = () => {
  // randomised on the client only, so SSR stays deterministic; nothing renders
  // until the values exist, which also avoids the items flashing stacked at 0
  const [items, setItems] = useState<FallingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setItems(buildItems()), []);

  // The nodes can't use :hover, because taking pointer events would steal the
  // hover from the hero content they drift over. So we hit-test the cursor
  // against them ourselves, which lets both light up at once.
  useEffect(() => {
    if (!items.length) return; // nothing rendered to hit-test yet
    const nodes =
      containerRef.current?.querySelectorAll<HTMLElement>('.graph-node');
    if (!nodes?.length) return;

    let frame = 0;
    let hovered: HTMLElement | null = null;

    const hitTest = (x: number, y: number) => {
      for (const node of nodes) {
        // rounded-full, and a rotated circle keeps its bounding box, so a
        // radius check against the centre is exact
        const { left, top, width } = node.getBoundingClientRect();
        const radius = width / 2;
        const dx = x - (left + radius);
        const dy = y - (top + radius);
        if (dx * dx + dy * dy <= radius * radius) return node;
      }
      return null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      if (frame) return; // already have a read queued for this frame
      const { clientX, clientY } = e;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const hit = hitTest(clientX, clientY);
        if (hit === hovered) return; // only touch the DOM on an actual change
        hovered?.removeAttribute('data-hovered');
        hit?.setAttribute('data-hovered', '');
        hovered = hit;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      hovered?.removeAttribute('data-hovered');
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      className='falling-items-container pointer-events-none'
      aria-hidden='true'
    >
      {items.map((item) => (
        <div
          key={item.animationDelay}
          className='absolute falling-items z-0'
          style={item}
        >
          <GraphElem />
        </div>
      ))}
    </div>
  );
};

export default BgGraph;
