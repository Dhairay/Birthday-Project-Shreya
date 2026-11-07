import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import confetti from 'canvas-confetti';

export default function SurpriseEasterEgg() {
  const config = birthdayConfig.surprise;
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e) => {
    setClicked(true);
    setClickCount((c) => c + 1);

    // Fire explosive vibrant celebratory confetti burst!
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x, y },
        colors: ['#f43f5e', '#fbbf24', '#a855f7', '#38bdf8', '#ec4899']
      });
    } catch {
      // Graceful fallback
    }
  };

  return (
    <section className="section-wrapper" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <button
          onClick={handleClick}
          className="btn-glass"
          style={{
            borderColor: clicked ? 'rgba(244, 63, 94, 0.4)' : 'rgba(255, 255, 255, 0.2)',
            background: clicked ? 'rgba(244, 63, 94, 0.1)' : 'rgba(255, 255, 255, 0.04)',
            color: clicked ? '#fecdd3' : '#d1d5db',
            padding: '12px 28px',
            fontSize: '0.95rem',
            borderRadius: '9999px',
            transition: 'var(--transition-smooth)'
          }}
          aria-label="Playful mystery button"
        >
          <AlertCircle size={16} color={clicked ? '#fb7185' : '#9ca3af'} />
          <span>{clicked ? 'You actually clicked it! 😂' : config.buttonLabel}</span>
        </button>

        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                marginTop: '20px',
                padding: '20px',
                borderRadius: '16px',
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.25)'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  marginBottom: '8px'
                }}
              >
                {config.revealedMessage}
              </p>
              <p style={{ fontSize: '0.95rem', color: '#fbcfe8', fontStyle: 'italic' }}>
                {config.secretNote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

