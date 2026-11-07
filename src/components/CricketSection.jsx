import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { guitarSynth } from '../utils/guitarSynth';

export default function CricketSection({ onUnlockHeart, hasHeart }) {
  const config = birthdayConfig.interests.cricket;
  const [boundaryCheered, setBoundaryCheered] = useState(hasHeart);
  const [runs, setRuns] = useState(100);

  const handleCheerBoundary = () => {
    setRuns((r) => r + 4);
    guitarSynth.playFx('cheer');
    if (!boundaryCheered) {
      setBoundaryCheered(true);
      onUnlockHeart('cricket');
    }
  };

  return (
    <section id="cricket" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(34, 197, 94, 0.4)', background: 'rgba(34, 197, 94, 0.1)' }}>
          <Trophy size={14} color="#4ade80" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '36px 24px',
          background: 'linear-gradient(145deg, rgba(8, 30, 20, 0.85), rgba(10, 20, 35, 0.9))',
          border: '1px solid rgba(74, 222, 128, 0.25)',
          boxShadow: '0 20px 50px -15px rgba(22, 101, 52, 0.3)'
        }}
      >
        {/* Lord's / MCG Heritage Inspired Scoreboard */}
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto 32px',
            background: '#041d14',
            border: '2px solid #d4af37',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.7), 0 10px 30px rgba(0, 0, 0, 0.6)',
            position: 'relative'
          }}
        >
          {/* Top Brass Plaque */}
          <div
            style={{
              textAlign: 'center',
              borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
              paddingBottom: '12px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                color: '#d4af37',
                fontSize: '0.95rem',
                letterSpacing: '0.15em',
                fontWeight: 700
              }}
            >
              {config.scoreboard.match}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#86efac', letterSpacing: '0.05em' }}>
              {config.scoreboard.venue}
            </div>
          </div>

          {/* Scoreboard Matrix Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                background: '#02120b',
                padding: '12px 8px',
                borderRadius: '8px',
                border: '1px solid #1e3a2b'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '0.08em' }}>BATTER</div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.25rem' }}>
                {config.scoreboard.player}*
              </div>
            </div>

            <div
              style={{
                background: '#02120b',
                padding: '12px 8px',
                borderRadius: '8px',
                border: '1px solid #1e3a2b'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '0.08em' }}>RUNS</div>
              <div style={{ color: '#fbbf24', fontFamily: 'monospace', fontWeight: 700, fontSize: '1.4rem' }}>
                {config.scoreboard.score}
              </div>
            </div>

            <div
              style={{
                background: '#02120b',
                padding: '12px 8px',
                borderRadius: '8px',
                border: '1px solid #1e3a2b'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '0.08em' }}>OVERS</div>
              <div style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 700, fontSize: '1.2rem' }}>
                {config.scoreboard.overs}
              </div>
            </div>

            <div
              style={{
                background: '#02120b',
                padding: '12px 8px',
                borderRadius: '8px',
                border: '1px solid #1e3a2b'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '0.08em' }}>STRIKE RATE</div>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: '1.15rem' }}>
                {config.scoreboard.strikeRate}
              </div>
            </div>
          </div>

          {/* Status ticker */}
          <div
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              textAlign: 'center',
              color: '#fef08a',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            STATUS: <span style={{ color: '#fff', fontStyle: 'italic' }}>{config.scoreboard.status}</span>
          </div>
        </div>

        {/* Romantic Cricket Commentary Reveal */}
        <div style={{ maxWidth: '640px', margin: '0 auto 28px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#f3f4f6',
              lineHeight: 1.6,
              whiteSpace: 'pre-line'
            }}
          >
            "{config.quote}"
          </p>
        </div>

        {/* Interactive Cricket Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleCheerBoundary}
            className="btn-glass"
            style={{
              borderColor: '#4ade80',
              color: '#86efac',
              padding: '12px 24px',
              fontWeight: 600
            }}
            aria-label="Hit a boundary at Lord's"
          >
            <Sparkles size={16} />
            <span>Hit a Boundary for Four! 🏏 (Total: {runs})</span>
          </button>
        </div>

        {boundaryCheered && (
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

