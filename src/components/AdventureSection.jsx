import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Mountain, CheckCircle2, Heart, Award } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function AdventureSection({ onUnlockHeart, hasHeart }) {
  const config = birthdayConfig.interests.hiking;
  const [activePoint, setActivePoint] = useState(1);
  const [summitReached, setSummitReached] = useState(hasHeart);

  const handleSelectPoint = (id) => {
    setActivePoint(id);
    if (id === 4 && !summitReached) {
      setSummitReached(true);
      onUnlockHeart('adventure');
    }
  };

  const currentPointData = config.trailPoints.find((p) => p.id === activePoint) || config.trailPoints[0];

  return (
    <section id="hiking" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge">
          <Compass size={14} color="#38bdf8" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div className="glass-panel glass-panel-glow" style={{ padding: '36px 28px', overflow: 'hidden' }}>
        {/* Stylized Mountain Ridge SVG with Interactive Trail */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '24px' }}>
          <svg
            viewBox="0 0 800 240"
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>

            {/* Silhouette mountains */}
            <path
              d="M0,220 L120,110 L250,180 L380,80 L520,150 L660,40 L800,200 L800,240 L0,240 Z"
              fill="url(#mountainGrad)"
            />

            {/* Trail line */}
            <path
              d="M100,195 Q220,160 300,140 T500,105 T660,50"
              fill="none"
              stroke="url(#trailGrad)"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Interactive Trail Checkpoints */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginTop: '-30px'
            }}
          >
            {config.trailPoints.map((point) => {
              const isSelected = activePoint === point.id;
              const isSummit = point.id === 4;

              return (
                <button
                  key={point.id}
                  onClick={() => handleSelectPoint(point.id)}
                  aria-label={`Select trail stop: ${point.title}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '14px 10px',
                    transition: 'var(--transition-smooth)',
                    boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.3)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: isSummit
                        ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                        : isSelected
                        ? '#38bdf8'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px',
                      boxShadow: isSelected ? '0 0 12px rgba(56, 189, 248, 0.6)' : 'none'
                    }}
                  >
                    {isSummit ? <Mountain size={18} /> : <span>{point.id}</span>}
                  </div>

                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: isSelected ? '#fff' : '#9ca3af',
                      lineHeight: 1.2
                    }}
                  >
                    {point.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Trail Point Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPointData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '16px',
              padding: '20px 24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase' }}>
                Elevation Marker 0{currentPointData.id}
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              {currentPointData.title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', fontStyle: 'italic' }}>
              "{currentPointData.desc}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Heart Unlock Notification Banner */}
        {summitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="quest-heart-badge"
            style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
          >
            <Heart size={16} fill="currentColor" />
            <span>{config.heartRevealedMsg}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

