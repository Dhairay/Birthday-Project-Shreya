import React, { useState, useEffect } from 'react';
import { Compass, Trophy, Activity, MapPin, Coffee, Heart, Menu, X, Sparkles, Gem } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('reveal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'birthday-cake', label: 'Make a Wish', icon: <span>🎂</span> },
    { id: 'hiking', label: 'Adventure', icon: <Compass size={15} /> },
    { id: 'hair-colors', label: 'Colors', icon: <Sparkles size={15} /> },
    { id: 'cricket', label: 'Cricket', icon: <Trophy size={15} /> },
    { id: 'tennis', label: 'Tennis', icon: <Activity size={15} /> },
    { id: 'naples', label: 'Napoli', icon: <MapPin size={15} /> },
    { id: 'pizza', label: 'Pizza', icon: <span>🍕</span> },
    { id: 'bracelets', label: 'Bracelets', icon: <Gem size={15} /> },
    { id: 'santorini', label: 'Santorini', icon: <span>🇬🇷</span> },
    { id: 'chocolate', label: 'Chocolate', icon: <Coffee size={15} /> },
    { id: 'final-letter', label: 'Letter', icon: <Heart size={15} /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Section spy
      const sections = ['birthday-cake', 'hiking', 'hair-colors', 'cricket', 'tennis', 'naples', 'pizza', 'bracelets', 'santorini', 'chocolate', 'final-letter'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Floating Subtle Pill Navbar */}
      <nav
        aria-label="Main Navigation"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 45,
          display: 'none'
        }}
        className="desktop-navbar"
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                aria-label={`Jump to ${link.label} section`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: isActive ? '#ffffff' : '#9ca3af',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  boxShadow: isActive ? '0 0 14px var(--accent-glow)' : 'none',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Menu Button */}
      <div
        className="mobile-nav-btn"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 45,
          display: 'none'
        }}
      >
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Open chapter navigation menu"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
          }}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 44,
            background: 'rgba(7, 11, 20, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            <div style={{ textAlign: 'center', color: '#fef3c7', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '12px' }}>
              Her Journey Chapters ✦
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: activeSection === link.id ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.06)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-navbar { display: block !important; }
        }
        @media (max-width: 899px) {
          .mobile-nav-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

