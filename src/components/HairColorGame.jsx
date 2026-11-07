import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, RefreshCw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function HairColorGame() {
  const config = birthdayConfig.interests.hairColors;
  const [selectedColor, setSelectedColor] = useState('burgundy');
  const [showingOriginal, setShowingOriginal] = useState(false);

  // Update theme data-attribute on body to reflect the chosen color
  useEffect(() => {
    document.body.dataset.hairTheme = selectedColor;
  }, [selectedColor]);

  const activeColorData = config.colors.find((c) => c.id === selectedColor) || config.colors[0];

  const currentPhoto = showingOriginal
    ? birthdayConfig.photo
    : activeColorData.photo || birthdayConfig.photo;

  return (
    <section id="hair-colors" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge">
          <Palette size={14} color="#f43f5e" />
          <span>HAIRSTYLE CHRONICLES</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          boxShadow: `0 20px 50px -15px ${activeColorData.glow}`
        }}
      >
        {/* Interactive Color Selector Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}
        >
          {config.colors.map((color) => {
            const isSelected = selectedColor === color.id && !showingOriginal;
            return (
              <button
                key={color.id}
                onClick={() => {
                  setSelectedColor(color.id);
                  setShowingOriginal(false);
                }}
                aria-label={`Select ${color.name}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? `2px solid ${color.hex}` : '1px solid rgba(255, 255, 255, 0.12)',
                  color: isSelected ? '#ffffff' : '#d1d5db',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                  boxShadow: isSelected ? `0 0 25px ${color.glow}` : 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    boxShadow: `0 0 8px ${color.hex}`
                  }}
                />
                <span>{color.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Hair Transformation Studio Card */}
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '32px 24px',
            borderRadius: '24px',
            background: `linear-gradient(145deg, rgba(15, 23, 42, 0.9), ${activeColorData.glow})`,
            border: `1px solid ${activeColorData.hex}55`,
            position: 'relative',
            boxShadow: `0 20px 45px rgba(0, 0, 0, 0.5)`
          }}
        >
          {/* Actual Photo with naturally dyed hair */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
            {/* Ambient color halo */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '28px',
                background: `linear-gradient(135deg, ${activeColorData.hex}, #ffffff)`,
                filter: 'blur(20px)',
                opacity: 0.45,
                zIndex: 0
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '230px',
                height: '275px',
                borderRadius: '24px',
                overflow: 'hidden',
                margin: '0 auto',
                border: `3px solid ${activeColorData.hex}`,
                boxShadow: `0 0 35px ${activeColorData.glow}`,
                background: '#070b14',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhoto}
                  src={currentPhoto}
                  alt={`Shreya with ${showingOriginal ? 'natural' : activeColorData.name} hair`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    display: 'block'
                  }}
                />
              </AnimatePresence>

              {/* Floating label on portrait */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(7, 11, 20, 0.88)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${activeColorData.hex}`,
                  color: '#ffffff',
                  padding: '4px 14px',
                  borderRadius: '99px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
                }}
              >
                {showingOriginal ? 'Natural Hair ✨' : `${activeColorData.name} Hair`}
              </div>
            </div>

            {/* Quick compare toggle button */}
            <div style={{ marginTop: '12px' }}>
              <button
                onClick={() => setShowingOriginal((v) => !v)}
                className="btn-glass"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  color: '#fff',
                  gap: '6px'
                }}
              >
                <RefreshCw size={13} />
                <span>{showingOriginal ? `Switch to ${activeColorData.name} Hair` : 'View Original Hair'}</span>
              </button>
            </div>
          </div>

          {/* Personality Description and Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeColorData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: activeColorData.hex,
                  marginBottom: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                <Sparkles size={16} />
                <span>{activeColorData.name}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}
              >
                "{activeColorData.description}"
              </h3>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}
              >
                {activeColorData.quote}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
