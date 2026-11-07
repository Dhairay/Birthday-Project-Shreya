import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import confetti from 'canvas-confetti';

export default function BirthdayQuestTracker({
  discoveredHearts,
  totalHearts,
  isCompleted,
  showCelebrationModal,
  onCloseCelebrationModal,
  onScrollToFinal
}) {
  const questHearts = birthdayConfig.quest.hearts;

  // Trigger celebratory confetti when modal pops up
  React.useEffect(() => {
    if (showCelebrationModal) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#ffffff']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  }, [showCelebrationModal]);

  return (
    <>
      {/* Floating Quest Progress Pill in Top-Right or Bottom-Left */}
      <aside
        aria-label="Birthday Quest Progress"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 40
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
            fontSize: '0.88rem'
          }}
        >
          <span style={{ fontWeight: 600, color: '#fecdd3', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Heart size={15} fill="#f43f5e" color="#f43f5e" />
            <span className="quest-text-label">Quest:</span>
          </span>

          {/* Heart Slot Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {questHearts.map((heart) => {
              const collected = discoveredHearts.includes(heart.id);
              return (
                <span
                  key={heart.id}
                  title={`${heart.name}: ${collected ? 'Discovered' : 'Hidden in her world'}`}
                  style={{
                    fontSize: '14px',
                    filter: collected ? 'none' : 'grayscale(100%) opacity(30%)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  ❤️
                </span>
              );
            })}
          </div>

          <span style={{ color: '#9ca3af', fontWeight: 600, fontSize: '0.8rem' }}>
            {discoveredHearts.length}/{totalHearts}
          </span>
        </div>
      </aside>

      {/* Quest Completed Modal Overlay */}
      <AnimatePresence>
        {showCelebrationModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: 'rgba(7, 11, 20, 0.8)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                maxWidth: '480px',
                width: '100%',
                background: 'linear-gradient(145deg, #182236, #0e1626)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                borderRadius: '24px',
                padding: '36px 28px',
                textAlign: 'center',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 63, 94, 0.25)'
              }}
            >
              <button
                onClick={onCloseCelebrationModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  color: '#9ca3af',
                  padding: '6px'
                }}
                aria-label="Close quest completion dialog"
              >
                <X size={20} />
              </button>

              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f43f5e, #fbbf24)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 0 25px rgba(244, 63, 94, 0.6)'
                }}
              >
                <Sparkles size={32} color="#fff" />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  color: '#ffffff',
                  marginBottom: '10px'
                }}
              >
                {birthdayConfig.quest.completedTitle}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: '#fef3c7',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  marginBottom: '32px'
                }}
              >
                "{birthdayConfig.quest.completedSubtitle}"
              </p>

              <button
                onClick={() => {
                  onCloseCelebrationModal();
                  onScrollToFinal();
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '16px 24px', fontSize: '1.05rem' }}
              >
                <span>{birthdayConfig.quest.jumpToFinale}</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 480px) {
          .quest-text-label { display: none; }
        }
      `}</style>
    </>
  );
}

