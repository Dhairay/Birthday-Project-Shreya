import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function MusicControl() {
  const { isPlaying, isMuted, volume, togglePlay, toggleMute, setVolume, usingSynth } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <aside
      aria-label="Background Music Controls"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '20px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {/* Expandable volume slider panel */}
      {showVolumeSlider && (
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Music Volume"
            style={{
              width: '80px',
              accentColor: 'var(--accent-primary)',
              cursor: 'pointer'
            }}
          />
        </div>
      )}

      {/* Main floating pill */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '9999px',
          padding: '6px 14px 6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: isPlaying ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-smooth)',
            boxShadow: isPlaying ? '0 0 15px var(--accent-glow)' : 'none'
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Music label & Animated Equalizer bars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: '#f3f4f6',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px', width: '14px' }}>
            <span
              style={{
                width: '3px',
                height: isPlaying ? '100%' : '30%',
                background: 'var(--accent-secondary)',
                borderRadius: '1px',
                animation: isPlaying ? 'equalize1 0.8s ease-in-out infinite alternate' : 'none'
              }}
            />
            <span
              style={{
                width: '3px',
                height: isPlaying ? '60%' : '30%',
                background: 'var(--accent-secondary)',
                borderRadius: '1px',
                animation: isPlaying ? 'equalize2 0.7s ease-in-out 0.2s infinite alternate' : 'none'
              }}
            />
            <span
              style={{
                width: '3px',
                height: isPlaying ? '85%' : '30%',
                background: 'var(--accent-secondary)',
                borderRadius: '1px',
                animation: isPlaying ? 'equalize3 0.9s ease-in-out 0.4s infinite alternate' : 'none'
              }}
            />
          </div>

          <span style={{ fontWeight: 500, letterSpacing: '0.02em', display: 'none', minWidth: '90px' }} className="music-label-desktop">
            {usingSynth ? 'Guitar Melody' : 'Acoustic Guitar'}
          </span>
        </div>

        {/* Mute toggle button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          style={{
            color: isMuted ? '#f87171' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            transition: 'color 0.2s'
          }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Volume slider expand toggle */}
        <button
          onClick={() => setShowVolumeSlider((v) => !v)}
          aria-label="Adjust volume settings"
          style={{
            color: showVolumeSlider ? 'var(--text-gold)' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            transition: 'color 0.2s'
          }}
        >
          <Sliders size={15} />
        </button>
      </div>

      <style>{`
        @keyframes equalize1 { 0% { height: 25%; } 100% { height: 100%; } }
        @keyframes equalize2 { 0% { height: 40%; } 100% { height: 85%; } }
        @keyframes equalize3 { 0% { height: 20%; } 100% { height: 95%; } }
        @media (min-width: 640px) {
          .music-label-desktop { display: inline !important; }
        }
      `}</style>
    </aside>
  );
}

