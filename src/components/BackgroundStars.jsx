import React, { useMemo } from 'react';

export default function BackgroundStars() {
  // Pure, clean, subtle starry sky with zero string lights or bulbs
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
}
