import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function SantoriniSection({ onUnlockHeart, hasHeart }) {
  const config = birthdayConfig.interests.santorini;
  const [timeOfDay, setTimeOfDay] = useState('sunset'); // 'day' | 'sunset' | 'night'
  const [revealed, setRevealed] = useState(hasHeart);

  const handleTimeChange = (mode) => {
    setTimeOfDay(mode);
    if (!revealed) {
      setRevealed(true);
      onUnlockHeart('travel');
    }
  };

  const getSkyBackground = () => {
    switch (timeOfDay) {
      case 'day':
        return 'linear-gradient(180deg, #38bdf8 0%, #7dd3fc 45%, #0284c7 100%)';
      case 'night':
        return 'linear-gradient(180deg, #090d16 0%, #0f172a 50%, #1e3a8a 100%)';
      case 'sunset':
      default:
        return 'linear-gradient(180deg, #7c2d12 0%, #ea580c 30%, #f59e0b 60%, #0284c7 100%)';
    }
  };

  return (
    <section id="santorini" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', background: 'rgba(56, 189, 248, 0.1)' }}>
          <Sparkles size={14} color="#38bdf8" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '0',
          overflow: 'hidden',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(2, 132, 199, 0.3)'
        }}
      >
        {/* Dynamic Aegean Landscape Container */}
        <div
          style={{
            position: 'relative',
            height: '380px',
            background: getSkyBackground(),
            transition: 'background 1s ease-in-out',
            display: 'flex',
            alignItems: 'flex-end',
            overflow: 'hidden'
          }}
        >
          {/* Sun / Moon celestial body */}
          <motion.div
            animate={{
              y: timeOfDay === 'night' ? -40 : timeOfDay === 'sunset' ? 60 : -10,
              opacity: timeOfDay === 'night' ? 0.9 : 1
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '70px',
              right: '15%',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: timeOfDay === 'night' ? '#f8fafc' : '#fef08a',
              boxShadow:
                timeOfDay === 'night'
                  ? '0 0 40px rgba(248, 250, 252, 0.8)'
                  : '0 0 60px rgba(254, 240, 138, 0.9), 0 0 100px rgba(245, 158, 11, 0.5)'
            }}
          />

          {/* Cycladic White Cliffside Houses & Blue Domes Illustration (Custom SVG) */}
          <div style={{ width: '100%', position: 'relative', zIndex: 5 }}>
            <svg
              viewBox="0 0 800 280"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              preserveAspectRatio="none"
            >
              {/* Caldera Cliff Rocks */}
              <polygon points="0,280 800,280 800,160 550,140 380,180 200,130 0,170" fill="#1e293b" opacity="0.9" />

              {/* White Cycladic Cube Buildings */}
              <rect x="80" y="140" width="70" height="90" fill="#f8fafc" rx="4" />
              <rect x="140" y="120" width="80" height="110" fill="#e2e8f0" rx="4" />
              <rect x="210" y="150" width="60" height="80" fill="#ffffff" rx="4" />

              {/* Iconic Santorini Cobalt Blue Dome */}
              <path d="M145,120 Q180,75 215,120 Z" fill="#0284c7" />
              <rect x="177" y="68" width="6" height="10" fill="#f8fafc" />

              {/* Windows with warm evening glow */}
              <rect x="100" y="160" width="12" height="16" fill={timeOfDay === 'day' ? '#334155' : '#fef08a'} rx="2" />
              <rect x="160" y="145" width="14" height="20" fill={timeOfDay === 'day' ? '#334155' : '#fef08a'} rx="2" />
              <rect x="230" y="170" width="12" height="16" fill={timeOfDay === 'day' ? '#334155' : '#fef08a'} rx="2" />

              {/* Second Blue Dome Church in background */}
              <rect x="520" y="160" width="90" height="80" fill="#f8fafc" rx="4" />
              <path d="M535,160 Q565,120 595,160 Z" fill="#0284c7" />
              <rect x="562" y="112" width="6" height="10" fill="#f8fafc" />

              {/* Aegean Sea Waters at bottom */}
              <rect x="0" y="240" width="800" height="40" fill="#0369a1" opacity="0.9" />
              <path d="M0,245 Q200,240 400,245 T800,245 L800,280 L0,280 Z" fill="#075985" />
            </svg>
          </div>
        </div>

        {/* Interactive Lighting Controls */}
        <div style={{ padding: '28px 24px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <button
              onClick={() => handleTimeChange('day')}
              className="btn-glass"
              style={{
                padding: '8px 16px',
                borderColor: timeOfDay === 'day' ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                background: timeOfDay === 'day' ? 'rgba(56, 189, 248, 0.2)' : 'transparent'
              }}
            >
              <Sun size={15} color="#38bdf8" />
              <span>Aegean Blue Day</span>
            </button>

            <button
              onClick={() => handleTimeChange('sunset')}
              className="btn-glass"
              style={{
                padding: '8px 16px',
                borderColor: timeOfDay === 'sunset' ? '#f59e0b' : 'rgba(255,255,255,0.1)',
                background: timeOfDay === 'sunset' ? 'rgba(245, 158, 11, 0.2)' : 'transparent'
              }}
            >
              <span>🌅 Oia Sunset</span>
            </button>

            <button
              onClick={() => handleTimeChange('night')}
              className="btn-glass"
              style={{
                padding: '8px 16px',
                borderColor: timeOfDay === 'night' ? '#c084fc' : 'rgba(255,255,255,0.1)',
                background: timeOfDay === 'night' ? 'rgba(192, 132, 252, 0.2)' : 'transparent'
              }}
            >
              <Moon size={15} color="#c084fc" />
              <span>Starlit Night</span>
            </button>
          </div>

          {/* Poetic Lines */}
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                color: '#f8fafc',
                lineHeight: 1.6,
                marginBottom: '8px'
              }}
            >
              "{config.lines[0]}"
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 3.2vw, 1.7rem)',
                color: '#fef08a',
                fontStyle: 'italic',
                fontWeight: 600,
                lineHeight: 1.4
              }}
            >
              "{config.lines[1]}"
            </p>
          </div>

          {revealed && (
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
      </div>
    </section>
  );
}

