import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import confetti from 'canvas-confetti';

export default function FinalCelebration({ onReplay }) {
  const config = birthdayConfig.final;

  // Trigger grand fireworks confetti on scroll into celebration
  const triggerGrandCelebration = () => {
    try {
      // Multiple bursts for a fireworks feel
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#e11d48', '#fbbf24']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#f43f5e', '#38bdf8']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      });
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    triggerGrandCelebration();
  }, []);

  return (
    <footer
      style={{
        padding: '80px 20px 120px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, transparent 0%, rgba(7, 11, 20, 0.95) 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <button
          onClick={triggerGrandCelebration}
          className="animate-float"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e11d48, #fbbf24)',
            color: '#fff',
            boxShadow: '0 0 35px rgba(225, 29, 72, 0.6)',
            marginBottom: '28px',
            cursor: 'pointer'
          }}
          aria-label="Trigger celebration fireworks"
        >
          <Sparkles size={32} />
        </button>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
            color: '#ffffff',
            marginBottom: '16px',
            lineHeight: 1.3
          }}
        >
          {config.celebrationText}
        </h3>

        <div style={{ fontSize: '2.5rem', marginBottom: '40px' }}>
          ❤️
        </div>

        <button
          onClick={onReplay}
          className="btn-glass"
          style={{
            padding: '14px 28px',
            fontSize: '1rem',
            gap: '10px',
            borderColor: 'rgba(255, 255, 255, 0.25)'
          }}
          aria-label="Replay the birthday experience"
        >
          <RotateCcw size={18} />
          <span>{config.replayButtonText}</span>
        </button>

        <div
          style={{
            marginTop: '50px',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.08em'
          }}
        >
          MADE WITH LOVE • HAPPY BIRTHDAY {birthdayConfig.name.toUpperCase()}
        </div>
      </motion.div>
    </footer>
  );
}

