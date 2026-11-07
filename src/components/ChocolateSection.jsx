import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, Sparkles, Check } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function ChocolateSection({ onUnlockHeart, hasHeart }) {
  const config = birthdayConfig.interests.chocolate;
  const [tastedLayers, setTastedLayers] = useState(['dark']);
  const [revealed, setRevealed] = useState(hasHeart);

  const handleTasteLayer = (id) => {
    setTastedLayers((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id];
      if (next.length === 3 && !revealed) {
        setRevealed(true);
        onUnlockHeart('chocolate');
      }
      return next;
    });
  };

  return (
    <section id="chocolate" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(217, 119, 6, 0.4)', background: 'rgba(217, 119, 6, 0.1)' }}>
          <Coffee size={14} color="#f59e0b" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div className="glass-panel" style={{ padding: '40px 24px', textAlign: 'center' }}>
        {/* Triple Chocolate Cake Interactive Stack */}
        <div style={{ maxWidth: '420px', margin: '0 auto 32px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              background: 'rgba(0,0,0,0.3)',
              padding: '16px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {config.layers.map((layer, index) => {
              const isTasted = tastedLayers.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  onClick={() => handleTasteLayer(layer.id)}
                  aria-label={`Taste layer: ${layer.name}`}
                  style={{
                    position: 'relative',
                    height: '68px',
                    borderRadius: '12px',
                    backgroundColor: layer.color,
                    border: isTasted ? '2px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    color: layer.id === 'white' ? '#2e1a12' : '#f8fafc',
                    boxShadow: isTasted ? '0 6px 18px rgba(0,0,0,0.5)' : 'none',
                    transform: isTasted ? 'scale(1.02)' : 'scale(1)',
                    transition: 'var(--transition-smooth)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{layer.name}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, fontStyle: 'italic' }}>
                      {layer.note}
                    </div>
                  </div>

                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isTasted ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                  >
                    {isTasted ? <Check size={14} /> : <span>{index + 1}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '12px' }}>
            Tap each artisan chocolate tier to taste (
            <span style={{ color: '#fbbf24', fontWeight: 600 }}>{tastedLayers.length}/3 tasted</span>)
          </p>
        </div>

        {/* Revealed Romantic Punchline */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{
                maxWidth: '520px',
                margin: '0 auto',
                padding: '24px',
                borderRadius: '16px',
                background: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.3)'
              }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '6px' }}>
                "{config.firstReveal}"
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3.8vw, 2rem)',
                  color: '#fbbf24',
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

