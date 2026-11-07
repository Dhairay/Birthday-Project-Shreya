import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Award, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function FinalMessage() {
  const config = birthdayConfig.final;
  const keepsakes = config.keepsakes || [
    {
      id: "maroon",
      src: "/images/gallery/shreya-maroon-sun.jpg",
      caption: "Golden Sunshine ☀️",
      tag: "Radiant Warmth"
    }
  ];
  const [photoIndex, setPhotoIndex] = useState(0);

  const currentPhoto = keepsakes[photoIndex] || keepsakes[0];

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % keepsakes.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + keepsakes.length) % keepsakes.length);
  };

  return (
    <section
      id="final-letter"
      className="section-wrapper"
      style={{
        padding: '90px 20px',
        maxWidth: '740px',
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="tag-badge"
          style={{
            borderColor: 'rgba(212, 175, 55, 0.4)',
            background: 'rgba(212, 175, 55, 0.08)',
            color: '#fbbf24'
          }}
        >
          <Sparkles size={14} />
          <span>{config.preTitle}</span>
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
            color: '#ffffff',
            marginBottom: '32px',
            lineHeight: 1.2
          }}
        >
          {config.birthdayTitle}
        </h2>

        {/* Interactive Keepsake Polaroid Showcase */}
        {keepsakes.length > 0 && (
          <div style={{ marginBottom: '38px', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'inline-block',
                position: 'relative',
                padding: 'clamp(10px, 2.5vw, 14px) clamp(10px, 2.5vw, 14px) clamp(16px, 3.5vw, 22px)',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.25)',
                maxWidth: 'min(280px, 85vw)',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={nextPhoto}
              title="Click for next memory ✨"
            >
              <div
                style={{
                  width: 'clamp(200px, 50vw, 240px)',
                  height: 'clamp(230px, 58vw, 280px)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#0f172a',
                  marginBottom: '12px',
                  position: 'relative'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhoto.id}
                    src={currentPhoto.src}
                    alt={currentPhoto.caption}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: currentPhoto.id === 'skirt' ? 'center 15%' : currentPhoto.id === 'candid' ? 'center 25%' : 'center 20%',
                      display: 'block'
                    }}
                  />
                </AnimatePresence>

                {/* Photo counter badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '99px',
                    letterSpacing: '0.04em',
                    fontWeight: 600
                  }}
                >
                  {photoIndex + 1} / {keepsakes.length}
                </div>
              </div>

              {/* Handwritten Caption */}
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  color: '#1e293b',
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)',
                  fontWeight: 700,
                  textAlign: 'center',
                  minHeight: '28px',
                  lineHeight: 1.2
                }}
              >
                {currentPhoto.caption}
              </div>
            </motion.div>

            {/* Quick switcher buttons / dots */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '14px'
              }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="btn-glass"
                style={{
                  padding: '6px',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={16} />
              </button>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {keepsakes.map((k, idx) => (
                  <button
                    key={k.id}
                    onClick={(e) => { e.stopPropagation(); setPhotoIndex(idx); }}
                    style={{
                      width: idx === photoIndex ? '20px' : '7px',
                      height: '7px',
                      borderRadius: '99px',
                      background: idx === photoIndex ? '#fbbf24' : 'rgba(255, 255, 255, 0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="btn-glass"
                style={{
                  padding: '6px',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div
              style={{
                fontSize: '0.74rem',
                color: 'rgba(255, 255, 255, 0.45)',
                marginTop: '6px',
                letterSpacing: '0.04em'
              }}
            >
              Tap polaroid to flip through keepsakes ✨
            </div>
          </div>
        )}

        {/* Intimate Letter Container */}
        <div
          className="glass-panel"
          style={{
            padding: '48px 36px',
            background: 'linear-gradient(145deg, rgba(20, 16, 26, 0.92), rgba(12, 16, 28, 0.96))',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            textAlign: 'left',
            position: 'relative'
          }}
        >
          {/* Subtle Decorative Golden Corner Accent */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(212, 175, 55, 0.5)',
              borderLeft: '2px solid rgba(212, 175, 55, 0.5)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid rgba(212, 175, 55, 0.5)',
              borderRight: '2px solid rgba(212, 175, 55, 0.5)'
            }}
          />

          {/* UPSC & Aspirant Motivation Ribbon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              color: '#fde047',
              borderRadius: '99px',
              padding: '6px 16px',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              marginBottom: '26px'
            }}
          >
            <Award size={15} />
            <span>NOVEMBER 19TH EXAM & UPSC JOURNEY ✨</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {config.letterParagraphs.map((para, i) => {
              const isLast = i === config.letterParagraphs.length - 1;
              const isExamHighlight = para.includes('19th') || para.includes('UPSC');

              return (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.15rem, 2.6vw, 1.4rem)',
                    lineHeight: 1.75,
                    color: isLast ? '#fb7185' : isExamHighlight ? '#fef3c7' : '#f1f5f9',
                    fontStyle: isLast ? 'italic' : 'normal',
                    fontWeight: isLast || isExamHighlight ? 600 : 400,
                    borderLeft: isExamHighlight ? '3px solid #fbbf24' : 'none',
                    paddingLeft: isExamHighlight ? '16px' : '0',
                    background: isExamHighlight ? 'rgba(251, 191, 36, 0.04)' : 'transparent',
                    borderRadius: isExamHighlight ? '0 8px 8px 0' : '0'
                  }}
                >
                  {para}
                </p>
              );
            })}
          </div>

          <div
            style={{
              marginTop: '36px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.8rem',
                color: '#fef08a'
              }}
            >
              {config.signoff}
            </span>
            <Heart size={22} fill="#e11d48" color="#e11d48" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
