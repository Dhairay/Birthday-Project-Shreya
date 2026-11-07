import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { birthdayConfig } from '../config/birthdayConfig';
import { guitarSynth } from '../utils/guitarSynth';

export const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(birthdayConfig.audio.volume || 0.7);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [usingSynth, setUsingSynth] = useState(false);

  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(birthdayConfig.audio.src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Handle error if custom MP3 file doesn't exist or can't load
    const handleError = () => {
      // Switch gracefully to high-quality Web Audio guitar synth
      setUsingSynth(true);
      if (isPlaying) {
        guitarSynth.start();
      }
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      guitarSynth.stop();
    };
  }, []);

  const play = useCallback(async () => {
    setHasInteracted(true);
    if (usingSynth) {
      guitarSynth.start();
      setIsPlaying(true);
      return;
    }

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // If MP3 fails or autoplay blocked, fallback to synth
        setUsingSynth(true);
        guitarSynth.start();
        setIsPlaying(true);
      }
    }
  }, [usingSynth]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    guitarSynth.stop();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    guitarSynth.toggleMute();
  }, [isMuted]);

  const setVolume = useCallback((newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);

    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    guitarSynth.setVolume(clamped);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        hasInteracted,
        usingSynth,
        play,
        pause,
        togglePlay,
        toggleMute,
        setVolume
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

