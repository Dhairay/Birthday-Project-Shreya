import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { guitarSynth } from '../utils/guitarSynth';

export default function TennisSection({ onUnlockHeart, hasHeart }) {
  const config = birthdayConfig.interests.tennis;
  const [rallyCount, setRallyCount] = useState(0);
  const [ballPosition, setBallPosition] = useState('left'); // 'left' | 'right'
  const [revealed, setRevealed] = useState(hasHeart);

  const handleRally = () => {
    setBallPosition((prev) => (prev === 'left' ? 'right' : 'left'));
    setRallyCount((c) => c + 1);
    guitarSynth.playFx('volley');

    if (!revealed) {
      setRevealed(true);
      onUnlockHeart('tennis');
    }
  };

  return (
    <section id="tennis" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(234, 179, 8, 0.4)', background: 'rgba(234, 179, 8, 0.1)' }}>
          <Activity size={14} color="#facc15" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div className="glass-panel" style={{ padding: '36px 20px', textAlign: 'center' }}>
        {/* Tennis Court Representation (Dual grass Wimbledon / Roland Garros clay aesthetic) */}
        <div
          style={{
            maxWidth: '580px',
            width: '100%',
            height: '220px',
            margin: '0 auto 28px',
            background: 'linear-gradient(90deg, #164e32 0%, #15803d 49%, #b45309 51%, #c2410c 100%)',
            borderRadius: '16px',
            border: '4px solid #ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6), 0 16px 35px rgba(0,0,0,0.4)',
            cursor: 'pointer'
          }}
          onClick={handleRally}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRally();
            }
          }}
          aria-label="Tap tennis court to rally the tennis ball"
        >
          {/* Court lines */}
          <div style={{ position: 'absolute', inset: '16px', border: '2px solid rgba(255, 255, 255, 0.75)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '4px', background: '#ffffff', zIndex: 2 }}>
            {/* Net mesh illusion */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '-4px', width: '12px', background: 'repeating-linear-gradient(0deg, #fff, #fff 2px, transparent 2px, transparent 6px)', opacity: 0.8 }} />
          </div>

          {/* Court labels */}
          <div style={{ position: 'absolute', bottom: '22px', left: '26px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.08em' }}>
            WIMBLEDON GRASS
          </div>
          <div style={{ position: 'absolute', bottom: '22px', right: '26px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.08em' }}>
            ROLAND-GARROS CLAY
          </div>

          {/* Animated Tennis Ball */}
          <motion.div
            animate={{
              left: ballPosition === 'left' ? '22%' : '78%',
              top: ['50%', '25%', '50%'],
              rotate: ballPosition === 'left' ? [0, -360] : [0, 360]
            }}
            transition={{
              duration: 0.55,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#ccff00',
              boxShadow: '0 0 15px rgba(204, 255, 0, 0.8), inset -3px -3px 6px rgba(0,0,0,0.3)',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4d7c0f',
              fontSize: '10px',
              fontWeight: 700
            }}
          >
            🎾
          </motion.div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '24px' }}>
          Tap the court or ball to volley! Rally count:{' '}
          <span style={{ color: '#fef08a', fontWeight: 600 }}>{rallyCount}</span>
        </p>

        {/* Revealed Romantic Tennis Joke */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                maxWidth: '560px',
                margin: '0 auto',
                padding: '20px 24px',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '6px' }}>
                "{config.firstReveal}"
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                  color: '#fde047',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}
              >
                "{config.secondReveal}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
    </section>
  );
}

