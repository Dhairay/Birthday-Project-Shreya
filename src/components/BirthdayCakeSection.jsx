import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, Camera, CameraOff, Wind, RotateCcw, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

// ─── Web Audio Sound Synthesizers (100% Offline / Zero Dependencies) ───
const playBlowPuffSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const bufferSize = ctx.sampleRate * 0.45; // 450ms breath puff
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Resonant lowpass filter to sound like soft wind gust
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.42);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.45, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.42);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {
    // Graceful fallback
  }
};

const playWishChimes = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    // Warm celestial pentatonic scale: C5, E5, G5, B5, C6, E6
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 1.45);
    });
  } catch (e) {
    // Graceful fallback
  }
};

export default function BirthdayCakeSection() {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [permissionState, setPermissionState] = useState('idle'); // 'idle' | 'requesting' | 'active' | 'denied'
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [blowIntensity, setBlowIntensity] = useState(0);
  const [showWishMessage, setShowWishMessage] = useState(false);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isBlownOutRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    isBlownOutRef.current = isBlownOut;
  }, [isBlownOut]);

  // Callback ref to bind video stream the exact instant the video node mounts
  const attachVideoNode = (node) => {
    videoRef.current = node;
    if (node && mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        if (node.srcObject !== mediaStreamRef.current) {
          node.srcObject = mediaStreamRef.current;
        }
        node.play().catch((err) => {
          console.log('Video play error on attach:', err);
        });
      }
    }
  };

  // Re-verify video stream on state changes
  useEffect(() => {
    if (permissionState === 'active' && hasCamera && videoRef.current && mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        if (videoRef.current.srcObject !== mediaStreamRef.current) {
          videoRef.current.srcObject = mediaStreamRef.current;
        }
        videoRef.current.play().catch((err) => {
          console.log('Video play error on effect:', err);
        });
      }
    }
  }, [permissionState, hasCamera, cameraActive]);

  // Clean up media streams and audio contexts on unmount
  useEffect(() => {
    return () => {
      stopMedia();
    };
  }, []);

  const stopMedia = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  const startMediaAndListening = async () => {
    setPermissionState('requesting');

    try {
      let stream;
      let camEnabled = false;

      // Attempt video + audio first
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } },
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
        });
        camEnabled = true;
      } catch (videoError) {
        // Fallback to audio only if webcam is unavailable or denied
        console.log('Video unavailable, trying audio-only:', videoError);
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
        });
        camEnabled = false;
      }

      mediaStreamRef.current = stream;
      setHasCamera(camEnabled);
      setCameraActive(camEnabled);

      // Connect video stream to video tag
      if (camEnabled && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      // Initialize Web Audio Analyzer for Blow Detection
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
      source.connect(analyser);
      analyserRef.current = analyser;

      setPermissionState('active');

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let sustainedBlowCount = 0;

      const checkBlowEnergy = () => {
        if (!analyserRef.current || isBlownOutRef.current) return;

        analyser.getByteFrequencyData(dataArray);

        // Blowing creates heavy turbulent energy in the 20Hz - 300Hz range (bins 1 to 7)
        let lowFrequencyEnergy = 0;
        for (let i = 1; i <= 7; i++) {
          lowFrequencyEnergy += dataArray[i];
        }
        lowFrequencyEnergy /= 7;

        // Overall energy across spectrum
        let totalEnergy = 0;
        for (let i = 0; i < dataArray.length; i++) {
          totalEnergy += dataArray[i];
        }
        totalEnergy /= dataArray.length;

        // Normalized intensity from 0 to 1
        const intensity = Math.min(1, Math.max(0, (lowFrequencyEnergy - 25) / 65));
        setBlowIntensity(intensity);

        // Blow detection threshold: heavy low-frequency rush or high overall energy
        if (lowFrequencyEnergy > 62 || totalEnergy > 46) {
          sustainedBlowCount++;
          // When blowing is sustained for ~200ms (7 animation frames)
          if (sustainedBlowCount >= 7) {
            triggerBlowOut();
            return;
          }
        } else {
          sustainedBlowCount = Math.max(0, sustainedBlowCount - 1);
        }

        animationFrameRef.current = requestAnimationFrame(checkBlowEnergy);
      };

      animationFrameRef.current = requestAnimationFrame(checkBlowEnergy);
    } catch (err) {
      console.warn('Microphone/Camera permission denied or unsupported:', err);
      setPermissionState('denied');
    }
  };

  const triggerBlowOut = () => {
    if (isBlownOutRef.current) return;
    setIsBlownOut(true);
    isBlownOutRef.current = true;
    setBlowIntensity(0);

    // Audio SFX: Breath whoosh
    playBlowPuffSound();

    // Trigger celebration fireworks & chimes
    setTimeout(() => {
      playWishChimes();
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f43f5e', '#e11d48', '#38bdf8', '#fef08a']
      });
      setShowWishMessage(true);
    }, 280);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleRelight = () => {
    setIsBlownOut(false);
    isBlownOutRef.current = false;
    setShowWishMessage(false);
    setBlowIntensity(0);

    // If media was already active, restart audio listening loop
    if (permissionState === 'active' && analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      let sustainedBlowCount = 0;

      const checkBlowEnergy = () => {
        if (!analyserRef.current || isBlownOutRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let lowFrequencyEnergy = 0;
        for (let i = 1; i <= 7; i++) {
          lowFrequencyEnergy += dataArray[i];
        }
        lowFrequencyEnergy /= 7;

        let totalEnergy = 0;
        for (let i = 0; i < dataArray.length; i++) {
          totalEnergy += dataArray[i];
        }
        totalEnergy /= dataArray.length;

        const intensity = Math.min(1, Math.max(0, (lowFrequencyEnergy - 25) / 65));
        setBlowIntensity(intensity);

        if (lowFrequencyEnergy > 62 || totalEnergy > 46) {
          sustainedBlowCount++;
          if (sustainedBlowCount >= 7) {
            triggerBlowOut();
            return;
          }
        } else {
          sustainedBlowCount = Math.max(0, sustainedBlowCount - 1);
        }

        animationFrameRef.current = requestAnimationFrame(checkBlowEnergy);
      };

      animationFrameRef.current = requestAnimationFrame(checkBlowEnergy);
    }
  };

  const toggleCameraStream = () => {
    if (mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks();
      videoTracks.forEach((t) => {
        t.enabled = !cameraActive;
      });
      setCameraActive(!cameraActive);
    }
  };

  return (
    <section
      id="birthday-cake"
      className="section-wrapper"
      style={{
        padding: '100px 20px 80px',
        scrollMarginTop: '90px',
        maxWidth: '820px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Ambient warm golden glow behind cake */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 92vw)',
          height: '350px',
          background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, rgba(225, 29, 72, 0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Header Tag Badge */}
        <span
          className="tag-badge"
          style={{
            borderColor: 'rgba(251, 191, 36, 0.45)',
            background: 'rgba(251, 191, 36, 0.1)',
            color: '#fbbf24',
            marginBottom: '20px'
          }}
        >
          <Sparkles size={14} />
          <span>MAKE A BIRTHDAY WISH</span>
        </span>

        {/* Section Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5.5vw, 3.6rem)',
            color: '#ffffff',
            marginBottom: '14px',
            lineHeight: 1.2
          }}
        >
          Blow Out Your Candles, Shreya 🎂
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '560px',
            margin: '0 auto 32px',
            lineHeight: 1.6
          }}
        >
          Close your eyes, make a secret wish for the year ahead, and blow to extinguish the flames! ✨
        </p>

        {/* ─── LIVE MAGIC WISH MIRROR (CAMERA FEED) ─── */}
        <AnimatePresence>
          {permissionState === 'active' && hasCamera && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                display: 'inline-block',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(180px, 42vw, 220px)',
                  height: 'clamp(180px, 42vw, 220px)',
                  borderRadius: '50%',
                  padding: '5px',
                  background: 'linear-gradient(135deg, #fbbf24, #f43f5e, #d4af37)',
                  boxShadow: '0 0 35px rgba(251, 191, 36, 0.4), 0 20px 40px rgba(0, 0, 0, 0.7)',
                  margin: '0 auto'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: '#070b14',
                    position: 'relative'
                  }}
                >
                  <video
                    ref={attachVideoNode}
                    autoPlay
                    playsInline
                    muted
                    onLoadedData={() => setIsVideoReady(true)}
                    onPlaying={() => setIsVideoReady(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scaleX(-1)', // Mirrored for authentic selfie reflection
                      filter: 'brightness(1.05) contrast(1.02) saturate(1.08)',
                      display: cameraActive ? 'block' : 'none',
                      opacity: isVideoReady ? 1 : 0,
                      transition: 'opacity 0.35s ease'
                    }}
                  />
                  {!isVideoReady && cameraActive && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        color: '#fbbf24',
                        background: '#070b14',
                        fontSize: '0.8rem'
                      }}
                    >
                      <Sparkles size={24} color="#fbbf24" style={{ animation: 'twinkle 1.5s ease-in-out infinite' }} />
                      <span>Starting Magic Mirror...</span>
                    </div>
                  )}
                  {!cameraActive && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        color: 'rgba(255,255,255,0.6)',
                        gap: '8px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <CameraOff size={28} />
                      <span>Mirror Paused</span>
                    </div>
                  )}
                </div>

                {/* Mirror Toggle Button */}
                <button
                  onClick={toggleCameraStream}
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    right: '6px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    zIndex: 10
                  }}
                  title={cameraActive ? 'Pause mirror' : 'Resume mirror'}
                  aria-label="Toggle wish mirror"
                >
                  {cameraActive ? <Camera size={15} /> : <CameraOff size={15} />}
                </button>
              </div>

              {/* Status Pill */}
              <div
                style={{
                  marginTop: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(251, 191, 36, 0.12)',
                  border: '1px solid rgba(251, 191, 36, 0.35)',
                  padding: '3px 12px',
                  borderRadius: '99px',
                  fontSize: '0.75rem',
                  color: '#fef08a',
                  fontWeight: 600
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e'
                  }}
                />
                <span>Magic Wish Mirror ✨</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── LIVE BREATH INTENSITY METER ─── */}
        <AnimatePresence>
          {permissionState === 'active' && !isBlownOut && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: blowIntensity > 0.4 ? '#fde047' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s ease'
                }}
              >
                <Wind
                  size={16}
                  style={{
                    transform: `translateX(${blowIntensity * 6}px)`,
                    color: blowIntensity > 0.4 ? '#fde047' : '#38bdf8'
                  }}
                />
                <span>
                  {blowIntensity > 0.5
                    ? '💨 Blowing detected! Keep blowing...'
                    : blowIntensity > 0.15
                    ? '🌬️ Breath felt! A little stronger...'
                    : '🌬️ Make your wish and blow towards the screen...'}
                </span>
              </div>

              {/* Intensity progress bar */}
              <div
                style={{
                  width: 'min(240px, 80vw)',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '99px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    width: `${Math.max(4, blowIntensity * 100)}%`,
                    background:
                      blowIntensity > 0.5
                        ? 'linear-gradient(90deg, #38bdf8, #fbbf24, #f43f5e)'
                        : 'linear-gradient(90deg, #38bdf8, #818cf8)',
                    borderRadius: '99px',
                    boxShadow: blowIntensity > 0.5 ? '0 0 12px #fbbf24' : 'none',
                    transition: 'width 0.1s ease'
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── THE ARTISAN BIRTHDAY CAKE & GLOWING CANDLES ─── */}
        <div
          onClick={!isBlownOut ? triggerBlowOut : undefined}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            margin: '0 auto 32px',
            cursor: !isBlownOut ? 'pointer' : 'default',
            userSelect: 'none'
          }}
          title={!isBlownOut ? 'Click to blow out candles! 💨' : ''}
        >
          {/* Ambient Candlelight Floor Glow on Cake */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '260px',
              height: '120px',
              background: !isBlownOut
                ? 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.35) 0%, transparent 70%)'
                : 'transparent',
              filter: 'blur(25px)',
              pointerEvents: 'none',
              transition: 'background 0.5s ease',
              zIndex: 2
            }}
          />

          <svg
            viewBox="0 0 400 360"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              overflow: 'visible'
            }}
          >
            <defs>
              {/* Flame Gradients */}
              <radialGradient id="flameOuter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#fde047" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#f97316" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="flameInner" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fef08a" />
                <stop offset="80%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Candle Gold Spiral Pattern */}
              <linearGradient id="goldCandle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="roseCandle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
              <linearGradient id="blueCandle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              {/* Cake Frosting Gradients */}
              <linearGradient id="cakeCreamTop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#ffe4e6" />
              </linearGradient>
              <linearGradient id="cakeChocBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4c1d24" />
                <stop offset="100%" stopColor="#2b0f14" />
              </linearGradient>
              <linearGradient id="strawberryGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="standPlatter" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="30%" stopColor="#f1f5f9" />
                <stop offset="60%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* ─── CAKE STAND (PEDESTAL & PLATTER) ─── */}
            <g id="cake-stand">
              {/* Stand base shadow */}
              <ellipse cx="200" cy="342" rx="140" ry="14" fill="rgba(0, 0, 0, 0.6)" filter="blur(8px)" />
              {/* Pedestal Foot */}
              <path d="M 170,315 L 160,336 L 240,336 L 230,315 Z" fill="url(#standPlatter)" opacity="0.9" />
              <ellipse cx="200" cy="336" rx="42" ry="5" fill="#64748b" />
              {/* Pedestal Stem */}
              <rect x="190" y="296" width="20" height="22" rx="2" fill="url(#standPlatter)" />
              {/* Main Circular Platter Rim */}
              <ellipse cx="200" cy="296" rx="170" ry="24" fill="url(#standPlatter)" />
              <ellipse cx="200" cy="293" rx="164" ry="20" fill="#e2e8f0" />
              <ellipse cx="200" cy="292" rx="160" ry="18" fill="#f8fafc" />
            </g>

            {/* ─── BOTTOM TIER: RICH VELVET CHOCOLATE ─── */}
            <g id="bottom-tier">
              {/* Cylinder body */}
              <path
                d="M 68,222 L 68,272 C 68,296 332,296 332,272 L 332,222 Z"
                fill="url(#cakeChocBottom)"
              />
              {/* Bottom tier top surface */}
              <ellipse cx="200" cy="222" rx="132" ry="22" fill="#581c24" />

              {/* Piped Buttercream Rosettes along bottom tier base */}
              {[78, 102, 128, 156, 184, 212, 240, 268, 294, 320].map((x, i) => {
                const t = (x - 200) / 132;
                const y = 276 + (1 - t * t) * 14;
                return (
                  <circle
                    key={`rosette-${i}`}
                    cx={x}
                    cy={y}
                    r="8.5"
                    fill="#ffe4e6"
                    stroke="#fbcfe8"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Dripping Chocolate Drops on Bottom Tier */}
              <path
                d="M 68,222 Q 95,248 115,226 Q 140,256 168,225 Q 200,260 230,225 Q 260,255 288,226 Q 312,246 332,222"
                fill="none"
                stroke="#3f131a"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>

            {/* ─── TOP TIER: STRAWBERRY BUTTERCREAM ─── */}
            <g id="top-tier">
              {/* Top cylinder body */}
              <path
                d="M 106,145 L 106,212 C 106,234 294,234 294,212 L 294,145 Z"
                fill="url(#cakeCreamTop)"
              />
              {/* Top tier top surface */}
              <ellipse cx="200" cy="145" rx="94" ry="18" fill="#ffe4e6" />

              {/* Luscious Pink Strawberry Drips */}
              <path
                d="M 106,145 
                   C 114,166 122,176 126,168
                   C 132,152 138,150 144,175
                   C 148,190 156,188 160,165
                   C 166,152 172,150 178,182
                   C 184,198 192,195 196,166
                   C 202,150 210,150 216,185
                   C 222,202 230,198 235,165
                   C 240,150 248,154 254,178
                   C 260,190 268,185 272,162
                   C 278,148 286,155 294,145"
                fill="url(#strawberryGlaze)"
                opacity="0.95"
              />

              {/* Decorative Sugar Pearls on Tier Rim */}
              {[118, 142, 168, 200, 232, 258, 282].map((x, i) => {
                const t = (x - 200) / 94;
                const y = 145 + (1 - t * t) * 12;
                return (
                  <circle
                    key={`pearl-${i}`}
                    cx={x}
                    cy={y}
                    r="3.2"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))"
                  />
                );
              })}

              {/* Fresh Strawberries on Top Cake Surface */}
              {[
                { x: 140, y: 138, s: 0.9, rot: -12 },
                { x: 175, y: 146, s: 0.95, rot: 8 },
                { x: 225, y: 146, s: 0.95, rot: -8 },
                { x: 260, y: 138, s: 0.9, rot: 15 }
              ].map((berry, i) => (
                <g
                  key={`berry-${i}`}
                  transform={`translate(${berry.x}, ${berry.y}) rotate(${berry.rot}) scale(${berry.s})`}
                >
                  {/* Strawberry Body */}
                  <path
                    d="M 0,-8 C 7,-8 11,-2 8,7 C 6,13 0,16 0,16 C 0,16 -6,13 -8,7 C -11,-2 -7,-8 0,-8 Z"
                    fill="#e11d48"
                    stroke="#be123c"
                    strokeWidth="0.6"
                  />
                  {/* Seeds */}
                  <circle cx="-3" cy="0" r="0.7" fill="#fef08a" />
                  <circle cx="3" cy="1" r="0.7" fill="#fef08a" />
                  <circle cx="0" cy="6" r="0.7" fill="#fef08a" />
                  {/* Green Leaf Crown */}
                  <path d="M 0,-8 L -4,-12 L -1,-8 L 0,-13 L 2,-8 L 5,-11 L 1,-7 Z" fill="#22c55e" />
                </g>
              ))}
            </g>

            {/* ─── 3 BIRTHDAY CANDLES & REALISTIC FLAMES ─── */}
            {[
              {
                id: 'candle-left',
                x: 160,
                y: 92,
                h: 46,
                grad: 'url(#roseCandle)',
                flameBend: -18 * blowIntensity,
                swayDelay: 0.1
              },
              {
                id: 'candle-center',
                x: 200,
                y: 84,
                h: 54,
                grad: 'url(#goldCandle)',
                flameBend: 8 * blowIntensity,
                swayDelay: 0.3
              },
              {
                id: 'candle-right',
                x: 240,
                y: 92,
                h: 46,
                grad: 'url(#blueCandle)',
                flameBend: 20 * blowIntensity,
                swayDelay: 0.5
              }
            ].map((candle, idx) => {
              const flameY = candle.y;
              const wickY = candle.y + 6;

              return (
                <g key={candle.id} id={candle.id}>
                  {/* Candle Pillar */}
                  <rect
                    x={candle.x - 5}
                    y={candle.y + 10}
                    width="10"
                    height={candle.h}
                    rx="3"
                    fill={candle.grad}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.8"
                    filter="drop-shadow(0 3px 6px rgba(0,0,0,0.5))"
                  />

                  {/* Candle Wick */}
                  <line
                    x1={candle.x}
                    y1={candle.y + 10}
                    x2={candle.x}
                    y2={wickY}
                    stroke="#1e293b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Glowing red wick tip */}
                  <circle
                    cx={candle.x}
                    cy={wickY}
                    r="1.2"
                    fill={isBlownOut ? '#64748b' : '#ef4444'}
                  />

                  {/* ACTIVE FLAME (when lit) */}
                  {!isBlownOut && (
                    <g
                      transform={`translate(${candle.x}, ${wickY - 2}) rotate(${candle.flameBend})`}
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      {/* Outer Glow Halo */}
                      <circle
                        cx="0"
                        cy="-14"
                        r={18 + blowIntensity * 6}
                        fill="rgba(251, 191, 36, 0.45)"
                        filter="blur(6px)"
                      />

                      {/* Main Teardrop Flame Body */}
                      <path
                        d="M 0,0 
                           C -8,-6 -9,-16 0,-26 
                           C 9,-16 8,-6 0,0 Z"
                        fill="url(#flameInner)"
                        filter="drop-shadow(0 0 8px #f59e0b)"
                        style={{
                          animation: `candleFlicker ${1.8 + idx * 0.4}s ease-in-out ${candle.swayDelay}s infinite alternate`
                        }}
                      />

                      {/* Hot White Inner Core */}
                      <ellipse
                        cx="0"
                        cy="-8"
                        rx="3"
                        ry="6"
                        fill="#ffffff"
                        opacity="0.9"
                      />

                      {/* Blue Combustion Base */}
                      <ellipse
                        cx="0"
                        cy="-1"
                        rx="3"
                        ry="2"
                        fill="#38bdf8"
                        opacity="0.85"
                      />
                    </g>
                  )}

                  {/* RISING SMOKE WISPS (when blown out) */}
                  {isBlownOut && (
                    <g transform={`translate(${candle.x}, ${wickY})`}>
                      <path
                        d="M 0,0 Q -6,-15 4,-30 T -3,-50 T 6,-70"
                        fill="none"
                        stroke="rgba(226, 232, 240, 0.65)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="4 2"
                        style={{
                          animation: `smokeDrift ${2.4 + idx * 0.5}s ease-out forwards`
                        }}
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ─── ACTION CONTROLS & WISH REVEAL ─── */}
        <div style={{ minHeight: '80px', marginTop: '10px' }}>
          {/* State 1: Candles are lit & not yet blown */}
          {!isBlownOut && permissionState !== 'active' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <button
                onClick={startMediaAndListening}
                className="btn-primary"
                disabled={permissionState === 'requesting'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 34px',
                  fontSize: 'clamp(1rem, 2.6vw, 1.12rem)',
                  boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)',
                  cursor: permissionState === 'requesting' ? 'wait' : 'pointer'
                }}
                aria-label="Click here to blow"
              >
                <Wind size={18} />
                <span>
                  {permissionState === 'requesting'
                    ? 'Making your wish...'
                    : 'Click here to blow 🎂💨'}
                </span>
                <Sparkles size={16} />
              </button>

              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.03em'
                }}
              >
                ✨ Make your wish and blow out the candles
              </div>
            </motion.div>
          )}

          {/* State 2: Active, waiting for blow or click */}
          {!isBlownOut && permissionState === 'active' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <button
                onClick={triggerBlowOut}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 34px',
                  fontSize: 'clamp(1rem, 2.6vw, 1.12rem)',
                  cursor: 'pointer',
                  boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)'
                }}
                aria-label="Click here to blow"
              >
                <Wind size={18} />
                <span>Click here to blow 🎂💨</span>
                <Sparkles size={16} />
              </button>
            </motion.div>
          )}

          {/* State 3: Candles Blown Out! Celebratory Wish Card */}
          <AnimatePresence>
            {isBlownOut && showWishMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel"
                style={{
                  maxWidth: '540px',
                  margin: '0 auto',
                  padding: '32px 28px',
                  background: 'linear-gradient(135deg, rgba(26, 18, 36, 0.95), rgba(15, 23, 42, 0.95))',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(251, 191, 36, 0.25)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(251, 191, 36, 0.15)',
                    color: '#fbbf24',
                    marginBottom: '16px',
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  <Heart size={24} fill="#fbbf24" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
                    color: '#ffffff',
                    marginBottom: '10px'
                  }}
                >
                  Your Wish is With the Universe ✨
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.05rem',
                    color: '#fef3c7',
                    lineHeight: 1.6,
                    marginBottom: '22px'
                  }}
                >
                  Happy Birthday, Shreya! Whatever you just wished for, I hope it comes true tenfold this year. May your hard work for UPSC shine, and may this year bring you all the love, happiness, and adventures you deserve. ❤️
                </p>

                <button
                  onClick={handleRelight}
                  className="btn-glass"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 22px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    color: '#fef08a',
                    borderColor: 'rgba(251, 191, 36, 0.4)'
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Relight Candles & Wish Again 🕯️</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

