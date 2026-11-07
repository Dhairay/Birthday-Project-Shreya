import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { guitarSynth } from '../utils/guitarSynth';
import confetti from 'canvas-confetti';

export default function BraceletSection() {
  const config = birthdayConfig.interests.bracelets;
  const [selectedStyleId, setSelectedStyleId] = useState('nail');
  const [isZoomed, setIsZoomed] = useState(false);
  const [favorites, setFavorites] = useState(['nail', 'paperclip']);
  const [toastMessage, setToastMessage] = useState('');

  const activeStyle = config.styles.find((s) => s.id === selectedStyleId) || config.styles[0];

  const handleSelectStyle = (id) => {
    setSelectedStyleId(id);
    guitarSynth.playFx('volley');
  };

  const handleToggleFavorite = (style, e) => {
    e.stopPropagation();
    guitarSynth.playFx('cheer');

    if (favorites.includes(style.id)) {
      setFavorites(favorites.filter((f) => f !== style.id));
    } else {
      setFavorites([...favorites, style.id]);
      setToastMessage(style.wishlistText || `Saved to your wishlist! 🎁`);
      setTimeout(() => setToastMessage(''), 2800);

      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f43f5e', '#fbbf24', '#eab308', '#ffffff']
        });
      } catch (err) {
        // Safe fallback
      }
    }
  };

  const handleToggleOriginal = () => {
    if (selectedStyleId === 'original') {
      setSelectedStyleId('nail');
    } else {
      setSelectedStyleId('original');
    }
    guitarSynth.playFx('volley');
  };

  return (
    <section id="bracelets" className="section-wrapper">
      <div className="section-header">
        <span
          className="tag-badge"
          style={{
            borderColor: '#eab308',
            background: 'rgba(234, 179, 8, 0.08)',
            color: '#fbbf24'
          }}
        >
          <Sparkles size={14} />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: 'clamp(24px, 5vw, 42px) clamp(16px, 4vw, 28px)',
          textAlign: 'center',
          background: 'linear-gradient(145deg, rgba(16, 20, 32, 0.94), rgba(24, 18, 28, 0.9))',
          boxShadow: '0 25px 60px -15px rgba(234, 179, 8, 0.25)',
          maxWidth: '740px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Wishlist Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                top: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 30,
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                color: '#ffffff',
                padding: '8px 20px',
                borderRadius: '99px',
                fontSize: '0.84rem',
                fontWeight: 600,
                boxShadow: '0 10px 25px rgba(225, 29, 72, 0.5)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <Heart size={15} fill="#ffffff" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Hero Try-On Presentation Canvas ─── */}
        <div
          style={{
            position: 'relative',
            maxWidth: '480px',
            margin: '0 auto 22px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid rgba(234, 179, 8, 0.35)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(0, 0, 0, 0.4)',
            aspectRatio: '1 / 1',
            background: '#070b14'
          }}
        >
          {/* Main Hand Photo with Crossfade and Zoom Support */}
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStyle.id}
                src={activeStyle.photo}
                alt={`Shreya wearing ${activeStyle.name}`}
                initial={{ opacity: 0, scale: isZoomed ? 2.15 : 1.03 }}
                animate={{
                  opacity: 1,
                  scale: isZoomed ? 2.1 : 1,
                  originX: 0.18,
                  originY: 0.88
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                }}
                onClick={() => setIsZoomed((z) => !z)}
              />
            </AnimatePresence>

            {/* Photographic vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 65%, rgba(7, 11, 20, 0.65) 100%)',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Floating Controls Overlay (Top Bar) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            {/* Wrist Zoom Toggle */}
            <button
              onClick={() => setIsZoomed((z) => !z)}
              aria-label={isZoomed ? 'Reset zoom' : 'Zoom in on wrist detail'}
              style={{
                pointerEvents: 'auto',
                background: 'rgba(7, 11, 20, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: isZoomed ? '#fde047' : '#ffffff',
                padding: '6px 13px',
                borderRadius: '99px',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                transition: 'all 0.2s ease'
              }}
            >
              {isZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
              <span>{isZoomed ? 'Full View' : 'Inspect Wrist 🔍'}</span>
            </button>

            {/* Wishlist Heart on Photo */}
            <button
              onClick={(e) => handleToggleFavorite(activeStyle, e)}
              aria-label="Add this bracelet to wishlist"
              style={{
                pointerEvents: 'auto',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(7, 11, 20, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: favorites.includes(activeStyle.id)
                  ? '1px solid #e11d48'
                  : '1px solid rgba(255, 255, 255, 0.2)',
                color: favorites.includes(activeStyle.id) ? '#fb7185' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart
                size={16}
                fill={favorites.includes(activeStyle.id) ? '#fb7185' : 'transparent'}
              />
            </button>
          </div>

          {/* Active Bracelet Caption Badge (Bottom Center, never overflows) */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              padding: '0 12px',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <div
              style={{
                background: 'rgba(7, 11, 20, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '6px 14px',
                borderRadius: '99px',
                border: '1px solid rgba(234, 179, 8, 0.45)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{activeStyle.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)',
                  color: '#fef3c7',
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                {activeStyle.name}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', flexShrink: 0 }}>•</span>
              <span
                style={{
                  color: '#eab308',
                  fontSize: 'clamp(0.68rem, 2.2vw, 0.76rem)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                {activeStyle.metal}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Bracelet Selector Cards (Her exact wishlist pieces) ─── */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '0.82rem',
              color: '#9ca3af',
              marginBottom: '12px',
              letterSpacing: '0.02em'
            }}
          >
            Tap any piece from her wishlist to try it on:
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '9px'
            }}
          >
            {config.styles.map((style) => {
              const isSelected = selectedStyleId === style.id;
              const isFav = favorites.includes(style.id);

              return (
                <button
                  key={style.id}
                  onClick={() => handleSelectStyle(style.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '14px',
                    background: isSelected
                      ? 'linear-gradient(145deg, rgba(234, 179, 8, 0.18), rgba(225, 29, 72, 0.12))'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected
                      ? '2px solid #eab308'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: isSelected
                      ? '0 8px 25px -5px rgba(234, 179, 8, 0.35)'
                      : 'none',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem' }}>{style.icon}</span>
                    {isFav && (
                      <Heart size={13} fill="#fb7185" color="#fb7185" />
                    )}
                  </div>

                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      color: isSelected ? '#fde047' : '#f1f5f9',
                      marginTop: '3px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {style.name}
                  </div>

                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: isSelected ? '#fef3c7' : '#9ca3af',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {style.metal}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Before & After / Quick Original Compare Button ─── */}
        <div style={{ marginBottom: '22px' }}>
          <button
            onClick={handleToggleOriginal}
            className="btn-glass"
            style={{
              padding: '7px 16px',
              fontSize: '0.8rem',
              color: selectedStyleId === 'original' ? '#fde047' : '#ffffff',
              borderColor: selectedStyleId === 'original' ? '#eab308' : 'rgba(255,255,255,0.18)',
              gap: '7px'
            }}
          >
            <RefreshCw size={13} />
            <span>
              {selectedStyleId === 'original'
                ? 'Back to Zayden Nail Bangle ✨'
                : 'Compare with Her Original Silver Bangle 💫'}
            </span>
          </button>
        </div>

        {/* ─── Sentiment, Meaning & Styling Note ─── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            style={{
              maxWidth: '560px',
              margin: '0 auto 22px',
              padding: '18px 22px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.74rem',
                color: '#eab308',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}
            >
              <Sparkles size={12} />
              <span>{activeStyle.tag}</span>
              {activeStyle.brand && (
                <span
                  style={{
                    background: 'rgba(234, 179, 8, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '99px',
                    fontSize: '0.68rem',
                    color: '#fbbf24',
                    marginLeft: '4px'
                  }}
                >
                  {activeStyle.brand}
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: '0.86rem',
                color: '#cbd5e1',
                marginBottom: '10px',
                lineHeight: 1.55
              }}
            >
              {activeStyle.description}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.14rem',
                color: '#fef3c7',
                fontStyle: 'italic',
                lineHeight: 1.5,
                borderLeft: '2px solid rgba(234, 179, 8, 0.4)',
                paddingLeft: '12px'
              }}
            >
              "{activeStyle.note}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ─── Footer Compliment ─── */}
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '16px',
            color: '#cbd5e1',
            fontSize: '0.92rem',
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Heart size={16} fill="#fb7185" color="#fb7185" />
          <span>"{config.compliment}"</span>
        </div>
      </div>
    </section>
  );
}
