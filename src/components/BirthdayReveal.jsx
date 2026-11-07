import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function BirthdayReveal({ onExploreMore }) {
  return (
    <section
      id="reveal"
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: '80px 20px 60px',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '780px', width: '100%' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="tag-badge"
          style={{ borderColor: 'rgba(244, 63, 94, 0.4)', background: 'rgba(244, 63, 94, 0.1)', marginBottom: '28px' }}
        >
          <Sparkles size={14} color="#fb7185" />
          <span>CELEBRATING YOU TODAY</span>
        </motion.div>

        {/* Shreya's Photo: Elegant Framed Portrait */}
        {birthdayConfig.photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}
          >
            {/* Glowing ambient ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e11d48, #d4af37)',
                filter: 'blur(16px)',
                opacity: 0.6,
                zIndex: 0
              }}
            />

            {/* Circular Portrait Frame */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                padding: '4px',
                background: 'linear-gradient(135deg, #d4af37, #e11d48, #fbbf24)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
              }}
            >
              <img
                src={birthdayConfig.photo}
                alt={`${birthdayConfig.name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block'
                }}
              />
            </div>

            {/* Floating Sparkle Pin */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                zIndex: 2,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e11d48, #fb7185)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(225, 29, 72, 0.6)',
                border: '2px solid #fff'
              }}
            >
              <Heart size={18} fill="#fff" />
            </motion.div>
          </motion.div>
        )}

        {/* Birthday Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            marginBottom: '20px',
            color: '#ffffff'
          }}
        >
          Happy Birthday,{' '}
          <span className="romantic-gradient-text" style={{ fontStyle: 'italic' }}>
            {birthdayConfig.name}
          </span>{' '}
          ❤️
        </motion.h1>

        {/* Personalized Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.25rem, 3vw, 1.7rem)',
            color: '#fef3c7',
            lineHeight: 1.5,
            maxWidth: '620px',
            margin: '0 auto 40px',
            whiteSpace: 'pre-line',
            letterSpacing: '0.01em'
          }}
        >
          {birthdayConfig.reveal.subtitle}
        </motion.div>

        {/* There's more CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button
            onClick={onExploreMore}
            className="btn-glass"
            style={{
              padding: '14px 28px',
              fontSize: '1rem',
              color: '#f3f4f6',
              gap: '10px'
            }}
            aria-label="Scroll to discover more birthday surprises"
          >
            <span>{birthdayConfig.reveal.cta}</span>
            <ChevronDown size={18} className="animate-float" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
