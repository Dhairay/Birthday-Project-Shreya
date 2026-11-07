import React from 'react';
import { Film, Clapperboard, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function CinemaSection() {
  const config = birthdayConfig.interests.cinema;

  return (
    <section id="cinema" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(168, 85, 247, 0.4)', background: 'rgba(168, 85, 247, 0.1)' }}>
          <Film size={14} color="#c084fc" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px'
        }}
      >
        {config.cards.map((card) => (
          <div
            key={card.id}
            className="glass-panel"
            style={{
              padding: '36px 28px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Cinematic Film-Strip Border Accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: 'repeating-linear-gradient(90deg, #d4af37, #d4af37 8px, transparent 8px, transparent 16px)',
                opacity: 0.6
              }}
            />

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}
              >
                <span style={{ fontSize: '2rem' }}>{card.icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#c084fc',
                    background: 'rgba(192, 132, 252, 0.12)',
                    padding: '4px 12px',
                    borderRadius: '99px',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                >
                  {card.muse}
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px' }}>
                {card.tag}
              </h3>

              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {card.desc}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '16px',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: '#fef3c7'
              }}
            >
              "{card.quote}"
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

