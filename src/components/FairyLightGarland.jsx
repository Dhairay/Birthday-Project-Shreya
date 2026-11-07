import React from 'react';

/**
 * FairyLightGarland: An elegant string of rustic draped rope with warm glowing amber fairy bulbs.
 */
export default function FairyLightGarland({
  bulbsCount = 12,
  curveDepth = 35,
  opacity = 0.9,
  style = {}
}) {
  const bulbs = Array.from({ length: bulbsCount }).map((_, i) => {
    const x = (i + 1) * (1000 / (bulbsCount + 1));
    const t = (x - 500) / 500;
    const y = 14 + (1 - t * t) * curveDepth;
    return { x, y, id: `g-bulb-${i}` };
  });

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '850px',
        margin: '0 auto',
        height: `${curveDepth + 28}px`,
        pointerEvents: 'none',
        overflow: 'visible',
        opacity,
        ...style
      }}
    >
      <svg
        viewBox="0 0 1000 70"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>

        {/* Draped rope curve */}
        <path
          d={`M 0,16 Q 500,${curveDepth + 16} 1000,16`}
          fill="none"
          stroke="url(#ropeGrad)"
          strokeWidth="2.5"
          strokeDasharray="5 2.5"
          opacity="0.85"
        />

        {/* Fairy light bulbs */}
        {bulbs.map((bulb, idx) => (
          <g key={bulb.id}>
            {/* Socket */}
            <rect x={bulb.x - 2} y={bulb.y - 3} width="4" height="4.5" rx="1" fill="#1e293b" />
            {/* Ambient bulb glow halo */}
            <circle
              cx={bulb.x}
              cy={bulb.y + 4}
              r={10}
              fill="rgba(251, 191, 36, 0.25)"
              filter="blur(3px)"
            />
            {/* Glowing warm bulb */}
            <circle
              cx={bulb.x}
              cy={bulb.y + 4}
              r={idx % 2 === 0 ? 4 : 3.2}
              fill="#fef08a"
              style={{
                animation: `bulbGlow ${3 + (idx % 3) * 0.7}s ease-in-out ${(idx % 4) * 0.3}s infinite alternate`
              }}
            />
            {/* Center filament */}
            <circle cx={bulb.x - 0.8} cy={bulb.y + 3.2} r="1.2" fill="#ffffff" />
          </g>
        ))}
      </svg>
    </div>
  );
}

