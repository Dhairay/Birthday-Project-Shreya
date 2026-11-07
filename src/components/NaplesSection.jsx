import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Check, Stamp } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function NaplesSection() {
  const config = birthdayConfig.interests.naples;
  const [isStamped, setIsStamped] = useState(false);

  return (
    <section id="naples" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.1)' }}>
          <Plane size={14} color="#f87171" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '40px 24px',
          background: 'linear-gradient(145deg, rgba(30, 20, 15, 0.8), rgba(15, 23, 42, 0.85))'
        }}
      >
        {/* Interactive Boarding Pass / Ticket */}
        <div
          style={{
            maxWidth: '540px',
            width: '100%',
            margin: '0 auto 28px',
            background: '#fffdfa',
            color: '#1e293b',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
            border: '1px solid #e2e8f0',
            position: 'relative'
          }}
        >
          {/* Ticket Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #991b1b, #7f1d1d)',
              color: '#ffffff',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plane size={18} />
              <span style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem' }}>
                BOARDING PASS
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '99px' }}>
              SPECIAL PASSENGER
            </span>
          </div>

          {/* Ticket Main Body */}
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>ORIGIN</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{config.ticket.from}</div>
              </div>
              <div style={{ fontSize: '1.4rem', color: '#991b1b' }}>✈️</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>DESTINATION</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#991b1b' }}>{config.ticket.destination}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>GATE</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{config.ticket.gate}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>SEAT</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{config.ticket.seat}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>BOARDING</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#b91c1c' }}>{config.ticket.boarding}</div>
              </div>
            </div>

            {/* Stamp Overlay */}
            {isStamped && (
              <motion.div
                initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                style={{
                  position: 'absolute',
                  top: '40%',
                  right: '15%',
                  border: '3px solid #dc2626',
                  color: '#dc2626',
                  borderRadius: '12px',
                  padding: '6px 16px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  boxShadow: '0 0 10px rgba(220, 38, 38, 0.25)',
                  backgroundColor: 'rgba(254, 226, 226, 0.7)',
                  pointerEvents: 'none'
                }}
              >
                CONFIRMED ❤️
              </motion.div>
            )}
          </div>

          {/* Ticket Perforated Footer */}
          <div
            style={{
              background: '#f8fafc',
              borderTop: '2px dashed #cbd5e1',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.85rem'
            }}
          >
            <span style={{ color: '#475569' }}>
              Status: <strong>{isStamped ? 'Reserved in the Stars 🌟' : config.ticket.status}</strong>
            </span>
            <button
              onClick={() => setIsStamped(true)}
              className="btn-glass"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                background: isStamped ? '#15803d' : '#991b1b',
                color: '#fff',
                borderColor: 'transparent'
              }}
              disabled={isStamped}
            >
              {isStamped ? 'Stamped ✓' : 'Stamp Pass 🎟️'}
            </button>
          </div>
        </div>

        {/* Narrative Atmosphere Note */}
        <p
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '1.05rem',
            color: '#fde68a',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}
        >
          "{config.description}"
        </p>
      </div>
    </section>
  );
}

