import { useEffect, useState } from 'react';

interface GrainOverlayProps {
  opacity?: number;
  speed?: number;
}

export function GrainOverlay({ opacity = 0.03, speed = 8 }: GrainOverlayProps) {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeed(Math.random() * 1000);
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997] opacity-30"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' seed='${seed}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}
    />
  );
}
