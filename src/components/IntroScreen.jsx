import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../context/AudioContext';

export default function IntroScreen({ onOpenSurprise }) {
  const [step, setStep] = useState(1);
  const [activePhoto, setActivePhoto] = useState(null);
  const { play } = useAudio();
  const hangingPhotos = birthdayConfig.intro.hangingPhotos || [];
  const tier1Photos = hangingPhotos.slice(0, 4); // 4 photos on upper garland
  const tier2Photos = hangingPhotos.slice(4, 7); // 3 photos on lower garland

  useEffect(() => {
    // Step 1: "Hey you..."
    // Step 2: "I made something for you." & CTA button
    const timer = setTimeout(() => {
      setStep(2);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    // Start guitar music safely inside user interaction handler
    play();
    onOpenSurprise();
  };

  const renderPolaroid = (photo, index) => {
    const isHovered = activePhoto === photo.id;
    const objPos = photo.id === 'skirt' ? 'center 15%' : photo.id === 'candid' ? 'center 25%' : photo.id === 'maroon' ? 'center 20%' : 'center 20%';

    return (
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, y: -20, rotate: photo.rotation }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: [photo.rotation - 1.8, photo.rotation + 1.8, photo.rotation - 1.8]
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.15 + index * 0.1 },
          y: { duration: 0.8, delay: 0.15 + index * 0.1 },
          rotate: {
            duration: photo.swayDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: photo.swayDelay
          }
        }}
        whileHover={{ scale: 1.15, zIndex: 30, rotate: 0 }}
        whileTap={{ scale: 1.08, zIndex: 30, rotate: 0 }}
        onClick={() => setActivePhoto(photo.id)}
        style={{
          transformOrigin: 'top center',
          cursor: 'pointer',
          position: 'relative',
          zIndex: isHovered ? 25 : 10,
          flex: '0 1 clamp(76px, 18vw, 138px)',
          minWidth: 'clamp(70px, 17vw, 105px)',
          maxWidth: 'clamp(88px, 21vw, 142px)'
        }}
        title="Click to view photo in full ✨"
      >
        {/* Golden Hanging String / Drop Link */}
        <div
          style={{
            width: '1.5px',
            height: '14px',
            margin: '0 auto',
            background: 'linear-gradient(to bottom, #ca8a04, #eab308)',
            boxShadow: '0 0 6px rgba(234, 179, 8, 0.45)'
          }}
        />

        {/* Wooden Clothespin / Golden Mini Peg */}
        <div
          style={{
            width: '10px',
            height: '18px',
            margin: '-4px auto 0',
            background: 'linear-gradient(135deg, #d4af37, #854d0e)',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
            position: 'relative',
            zIndex: 5
          }}
        >
          {/* Metal spring ring on clip */}
          <div
            style={{
              position: 'absolute',
              top: '7px',
              left: '-1px',
              right: '-1px',
              height: '2px',
              background: '#e2e8f0'
            }}
          />
        </div>

        {/* Polaroid Frame */}
        <div
          style={{
            marginTop: '-4px',
            background: '#ffffff',
            padding: 'clamp(4px, 1vw, 6px) clamp(4px, 1vw, 6px) clamp(8px, 2vw, 14px)',
            borderRadius: '4px',
            boxShadow: isHovered
              ? '0 22px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(251, 191, 36, 0.55)'
              : '0 12px 28px rgba(0, 0, 0, 0.65), 0 2px 10px rgba(0, 0, 0, 0.4)',
            transition: 'box-shadow 0.3s ease',
            textAlign: 'center'
          }}
        >
          {/* Photo Thumbnail */}
          <div
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              borderRadius: '2px',
              overflow: 'hidden',
              background: '#1e293b',
              marginBottom: '4px'
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: objPos,
                display: 'block'
              }}
            />
          </div>

          {/* Handwritten Caption at Polaroid Bottom */}
          <div
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(0.68rem, 1.8vw, 0.95rem)',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {photo.caption}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#070b14', // 100% solid, fully opaque
        backgroundImage: 'radial-gradient(ellipse at 50% 25%, #1f0d1b 0%, #0a0e1a 55%, #05070d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(12px, 2.5vh, 22px) clamp(12px, 3vw, 24px) clamp(20px, 3.5vh, 32px)',
        textAlign: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Ambient background glow behind the hanging string lights */}
      <div
        style={{
          position: 'absolute',
          top: '2%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 98vw)',
          height: '480px',
          background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.18) 0%, rgba(245, 158, 11, 0.06) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating golden fireflies / ambient fairy dust scattered across full page */}
      {[
        { x: '4%', y: '15%', size: 6, dur: 4.5, delay: 0 },
        { x: '8%', y: '45%', size: 7, dur: 5.2, delay: 1.2 },
        { x: '5%', y: '75%', size: 6, dur: 4.8, delay: 0.8 },
        { x: '92%', y: '20%', size: 6, dur: 4.6, delay: 1.0 },
        { x: '95%', y: '50%', size: 8, dur: 5.5, delay: 2.1 },
        { x: '91%', y: '80%', size: 6, dur: 4.2, delay: 1.5 },
        { x: '50%', y: '16%', size: 5, dur: 4.0, delay: 0.5 }
      ].map((dot, idx) => (
        <div
          key={`firefly-${idx}`}
          style={{
            position: 'absolute',
            left: dot.x,
            top: dot.y,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: '50%',
            background: '#fde047',
            boxShadow: '0 0 14px #fbbf24, 0 0 28px rgba(245, 158, 11, 0.7)',
            animation: `twinkle ${dot.dur}s ease-in-out ${dot.delay}s infinite alternate`,
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
      ))}

      {/* ─── LEFT MARGIN VERTICAL LIGHT STRAND ─── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 'clamp(10px, 3vw, 36px)',
          width: '24px',
          pointerEvents: 'none',
          zIndex: 4
        }}
      >
        <svg
          viewBox="0 0 30 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        >
          <path
            d="M 15,0 Q 22,250 12,500 Q 20,750 15,1000"
            fill="none"
            stroke="#5c4428"
            strokeWidth="1.6"
            strokeDasharray="4 2"
            opacity="0.8"
          />
          {[80, 200, 340, 480, 620, 760, 900].map((cy, idx) => (
            <g key={`intro-left-bulb-${idx}`}>
              <rect x="13.5" y={cy - 3} width="3" height="4" rx="1" fill="#1e293b" />
              <circle cx="15" cy={cy + 4} r="10" fill="rgba(251, 191, 36, 0.25)" filter="blur(3px)" />
              <circle
                cx="15"
                cy={cy + 4}
                r="4.2"
                fill="#fef08a"
                style={{
                  animation: `bulbGlow ${3.2 + (idx % 3) * 0.6}s ease-in-out ${(idx % 4) * 0.3}s infinite alternate`
                }}
              />
              <circle cx="14.2" cy={cy + 3.2} r="1.2" fill="#ffffff" />
            </g>
          ))}
        </svg>
      </div>

      {/* ─── RIGHT MARGIN VERTICAL LIGHT STRAND ─── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 'clamp(10px, 3vw, 36px)',
          width: '24px',
          pointerEvents: 'none',
          zIndex: 4
        }}
      >
        <svg
          viewBox="0 0 30 1000"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        >
          <path
            d="M 15,0 Q 8,250 18,500 Q 10,750 15,1000"
            fill="none"
            stroke="#5c4428"
            strokeWidth="1.6"
            strokeDasharray="4 2"
            opacity="0.8"
          />
          {[90, 220, 360, 500, 640, 780, 920].map((cy, idx) => (
            <g key={`intro-right-bulb-${idx}`}>
              <rect x="13.5" y={cy - 3} width="3" height="4" rx="1" fill="#1e293b" />
              <circle cx="15" cy={cy + 4} r="10" fill="rgba(251, 191, 36, 0.25)" filter="blur(3px)" />
              <circle
                cx="15"
                cy={cy + 4}
                r="4.2"
                fill="#fef08a"
                style={{
                  animation: `bulbGlow ${3 + (idx % 3) * 0.7}s ease-in-out ${(idx % 4) * 0.35}s infinite alternate`
                }}
              />
              <circle cx="14.2" cy={cy + 3.2} r="1.2" fill="#ffffff" />
            </g>
          ))}
        </svg>
      </div>

      {/* ─── SECTION 1: FAIRY LIGHT PHOTO WALL (2 DRAPED TIERS) ─── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
          paddingTop: '6px',
          zIndex: 5
        }}
      >
        {/* Helper subtle hint for tapping to enlarge */}
        <div
          style={{
            fontSize: '0.74rem',
            color: 'rgba(251, 191, 36, 0.75)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={12} color="#fbbf24" />
          <span>Fairy Light Memory Wall • Tap any photo to enlarge</span>
          <Sparkles size={12} color="#fbbf24" />
        </div>

        {/* ─── TIER 1: UPPER FAIRY LIGHT GARLAND (4 POLAROIDS) ─── */}
        <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
          {/* Tier 1 SVG Wire & Glowing Bulbs */}
          <div style={{ position: 'relative', width: '100%', height: '46px', overflow: 'visible' }}>
            <svg
              viewBox="0 0 1000 65"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
            >
              {/* Upper fine wire strand */}
              <path
                d="M 0,10 Q 250,26 500,16 Q 750,26 1000,10"
                fill="none"
                stroke="#5c4428"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                opacity="0.6"
              />
              {/* Primary Rustic Twined Wire Strand */}
              <path
                d="M 0,20 Q 250,56 500,32 Q 750,56 1000,20"
                fill="none"
                stroke="#52391e"
                strokeWidth="3.2"
                strokeDasharray="6 3"
                opacity="0.92"
              />
              <path
                d="M 0,20 Q 250,56 500,32 Q 750,56 1000,20"
                fill="none"
                stroke="#b45309"
                strokeWidth="1.4"
                opacity="0.85"
              />

              {/* Fairy Light Bulbs across Tier 1 */}
              {[45, 110, 180, 255, 330, 410, 490, 570, 650, 730, 810, 885, 955].map((cx, idx) => {
                const t = (cx - 500) / 500;
                const cy = 24 + (1 - t * t) * 24;
                return (
                  <g key={`tier1-bulb-${idx}`}>
                    <rect x={cx - 2} y={cy - 4} width="4.2" height="5.5" rx="1" fill="#1e293b" />
                    <circle cx={cx} cy={cy + 5} r="10" fill="rgba(251, 191, 36, 0.28)" filter="blur(3px)" />
                    <circle
                      cx={cx}
                      cy={cy + 5}
                      r={idx % 2 === 0 ? 4.2 : 3.4}
                      fill="#fef08a"
                      style={{
                        animation: `bulbGlow ${3 + (idx % 3) * 0.6}s ease-in-out ${(idx % 4) * 0.3}s infinite alternate`
                      }}
                    />
                    <circle cx={cx - 0.8} cy={cy + 4} r="1.3" fill="#ffffff" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 4 Polaroids suspended along Tier 1 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              gap: 'clamp(6px, 1.8vw, 18px)',
              marginTop: '-18px',
              padding: '0 4px',
              position: 'relative'
            }}
          >
            {tier1Photos.map((photo, index) => renderPolaroid(photo, index))}
          </div>
        </div>

        {/* ─── TIER 2: LOWER FAIRY LIGHT GARLAND (3 POLAROIDS STAGGERED) ─── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '740px',
            margin: 'clamp(12px, 2.2vh, 22px) auto 0'
          }}
        >
          {/* Tier 2 SVG Wire & Glowing Bulbs */}
          <div style={{ position: 'relative', width: '100%', height: '44px', overflow: 'visible' }}>
            <svg
              viewBox="0 0 1000 65"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
            >
              {/* Primary Rustic Twined Wire Strand with graceful dip */}
              <path
                d="M 0,18 Q 260,54 500,28 Q 740,54 1000,18"
                fill="none"
                stroke="#52391e"
                strokeWidth="3.2"
                strokeDasharray="6 3"
                opacity="0.92"
              />
              <path
                d="M 0,18 Q 260,54 500,28 Q 740,54 1000,18"
                fill="none"
                stroke="#b45309"
                strokeWidth="1.4"
                opacity="0.85"
              />

              {/* Fairy Light Bulbs across Tier 2 */}
              {[60, 150, 240, 340, 440, 530, 630, 720, 820, 930].map((cx, idx) => {
                const t = (cx - 500) / 500;
                const cy = 22 + (1 - t * t) * 24;
                return (
                  <g key={`tier2-bulb-${idx}`}>
                    <rect x={cx - 2} y={cy - 4} width="4.2" height="5.5" rx="1" fill="#1e293b" />
                    <circle cx={cx} cy={cy + 5} r="10" fill="rgba(251, 191, 36, 0.28)" filter="blur(3px)" />
                    <circle
                      cx={cx}
                      cy={cy + 5}
                      r={idx % 2 === 0 ? 4.2 : 3.4}
                      fill="#fef08a"
                      style={{
                        animation: `bulbGlow ${3.2 + (idx % 3) * 0.5}s ease-in-out ${(idx % 3) * 0.4}s infinite alternate`
                      }}
                    />
                    <circle cx={cx - 0.8} cy={cy + 4} r="1.3" fill="#ffffff" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 3 Polaroids suspended along Tier 2 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              gap: 'clamp(8px, 2.5vw, 24px)',
              marginTop: '-18px',
              padding: '0 clamp(8px, 2.5vw, 20px)',
              position: 'relative'
            }}
          >
            {tier2Photos.map((photo, index) => renderPolaroid(photo, index + 4))}
          </div>
        </div>
      </div>

      {/* ─── SECTION 2: WARM GREETING & BIRTHDAY SURPRISE CTA ─── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '560px',
          width: '100%',
          marginTop: 'clamp(20px, 3.5vh, 40px)',
          marginBottom: 'clamp(20px, 3vh, 36px)',
          padding: '0 8px'
        }}
      >
        {/* Pulsing heart badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{
            scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.8 }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(48px, 10vw, 58px)',
            height: 'clamp(48px, 10vw, 58px)',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fb7185',
            marginBottom: 'clamp(16px, 3vh, 24px)',
            boxShadow: '0 0 25px rgba(225, 29, 72, 0.35)'
          }}
        >
          <Heart size={26} fill="currentColor" opacity={0.95} />
        </motion.div>

        {/* Step 1: Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 6.5vw, 3.8rem)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            marginBottom: '12px',
            color: '#ffffff',
            lineHeight: 1.15
          }}
        >
          {birthdayConfig.intro.greeting}
        </motion.h1>

        {/* Step 2: "I made something for you." */}
        <div style={{ minHeight: '44px', marginBottom: '24px' }}>
          <AnimatePresence>
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.15rem, 3.4vw, 1.6rem)',
                  color: '#fef3c7',
                  lineHeight: 1.4
                }}
              >
                {birthdayConfig.intro.subtitle}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Step 2 CTA Button */}
        <div>
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <button
                  onClick={handleOpen}
                  className="btn-primary"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.08rem)',
                    padding: 'clamp(13px, 2.2vh, 16px) clamp(28px, 6vw, 38px)',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    boxShadow: '0 0 30px rgba(225, 29, 72, 0.45)'
                  }}
                  aria-label="Open birthday surprise and begin experience"
                >
                  <span>{birthdayConfig.intro.buttonText}</span>
                  <Sparkles size={18} />
                </button>

                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '14px',
                    letterSpacing: '0.03em'
                  }}
                >
                  🎧 Best experienced with sound on
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle bottom note */}
      <div
        style={{
          fontSize: '0.74rem',
          color: 'rgba(255, 255, 255, 0.28)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          zIndex: 5
        }}
      >
        A Special Interactive Journey for Shreya ✨
      </div>

      {/* ─── EXPANDED POLAROID LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'rgba(5, 7, 13, 0.88)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {(() => {
              const current = hangingPhotos.find(p => p.id === activePhoto);
              if (!current) return null;
              const modalObjPos = current.id === 'skirt' ? 'center 15%' : current.id === 'candid' ? 'center 25%' : current.id === 'maroon' ? 'center 20%' : 'center 20%';
              return (
                <motion.div
                  initial={{ scale: 0.88, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.88, y: 20, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: '#ffffff',
                    padding: 'clamp(14px, 3vw, 18px) clamp(14px, 3vw, 18px) clamp(22px, 4vw, 30px)',
                    borderRadius: '8px',
                    boxShadow: '0 30px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(251, 191, 36, 0.3)',
                    maxWidth: 'min(380px, 92vw)',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActivePhoto(null)}
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '-12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#0f172a',
                      border: '2px solid #ffffff',
                      color: '#ffffff',
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      zIndex: 10
                    }}
                    aria-label="Close photo preview"
                  >
                    ✕
                  </button>

                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 5',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      background: '#0f172a',
                      marginBottom: '14px',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    <img
                      src={current.src}
                      alt={current.caption}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: modalObjPos,
                        display: 'block'
                      }}
                    />
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: 'clamp(1.5rem, 5vw, 1.85rem)',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.2
                    }}
                  >
                    {current.caption}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748b',
                      marginTop: '6px',
                      letterSpacing: '0.03em'
                    }}
                  >
                    Tap anywhere to close ✨
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
