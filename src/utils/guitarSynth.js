/**
 * Web Audio API Acoustic Guitar Synthesizer
 * Plays a gentle, fingerpicked acoustic guitar arrangement of "Happy Birthday"
 * transitioning into ambient acoustic fingerstyle arpeggios (C - G - Am - F)
 * Realistic acoustic pluck physics with warm harmonics & string decay.
 */

class AcousticGuitarSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.55;
    this.masterGain = null;
    this.sequenceTimer = null;
    this.melodyStep = 0;

    // Frequencies (Hz) for standard acoustic guitar tuning
    this.notes = {
      C3: 130.81, D3: 146.83, E3: 164.81, F2: 87.31, F3: 174.61, G2: 98.00, G3: 196.00, A2: 110.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
    };

    // Fingerpicked "Happy Birthday" melody with warm bass note accompaniment
    // [melodyNote, bassNote, durationMs]
    const n = this.notes;
    this.birthdayMelody = [
      // "Hap-py Birth-day to you"
      { m: n.G3, b: n.C3, d: 360 },
      { m: n.G3, b: null, d: 360 },
      { m: n.A3, b: n.E3, d: 700 },
      { m: n.G3, b: null, d: 700 },
      { m: n.C4, b: n.G3, d: 700 },
      { m: n.B3, b: n.E3, d: 1300 },

      // "Hap-py Birth-day to you"
      { m: n.G3, b: n.G2, d: 360 },
      { m: n.G3, b: null, d: 360 },
      { m: n.A3, b: n.D3, d: 700 },
      { m: n.G3, b: null, d: 700 },
      { m: n.D4, b: n.G3, d: 700 },
      { m: n.C4, b: n.E3, d: 1300 },

      // "Hap-py Birth-day dear Shrey-a"
      { m: n.G3, b: n.C3, d: 360 },
      { m: n.G3, b: null, d: 360 },
      { m: n.G4, b: n.E3, d: 700 },
      { m: n.E4, b: n.G3, d: 700 },
      { m: n.C4, b: n.F3, d: 700 },
      { m: n.B3, b: n.A3, d: 700 },
      { m: n.A3, b: n.F2, d: 1300 },

      // "Hap-py Birth-day to you"
      { m: n.F4, b: n.D3, d: 360 },
      { m: n.F4, b: null, d: 360 },
      { m: n.E4, b: n.C3, d: 700 },
      { m: n.C4, b: n.G3, d: 700 },
      { m: n.D4, b: n.G2, d: 700 },
      { m: n.C4, b: n.C3, d: 1800 },

      // Gentle fingerpicked acoustic outro arpeggio in C Major & Am
      { m: n.E4, b: n.C3, d: 450 },
      { m: n.G4, b: n.G3, d: 450 },
      { m: n.C5, b: n.E4, d: 450 },
      { m: n.G4, b: null, d: 450 },

      { m: n.C4, b: n.A2, d: 450 },
      { m: n.E4, b: n.E3, d: 450 },
      { m: n.A4, b: n.C4, d: 450 },
      { m: n.E4, b: null, d: 450 },

      { m: n.C4, b: n.F2, d: 450 },
      { m: n.F4, b: n.C3, d: 450 },
      { m: n.A4, b: n.F3, d: 450 },
      { m: n.C4, b: null, d: 450 },

      { m: n.B3, b: n.G2, d: 450 },
      { m: n.D4, b: n.G3, d: 450 },
      { m: n.G4, b: n.B3, d: 450 },
      { m: n.C4, b: n.C3, d: 1600 }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

        // Warm acoustic guitar body filter
        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
        this.filter.Q.setValueAtTime(1.1, this.ctx.currentTime);

        this.masterGain.connect(this.filter);
        this.filter.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  pluckString(freq, time, isBass = false) {
    if (!this.ctx || this.isMuted || !freq) return;

    // Harmonic dual oscillator for warm acoustic nylon/steel string
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 2, time); // 2nd harmonic sparkle

    const decay = isBass ? 2.2 : 1.4;
    const peak = isBass ? 0.32 : 0.22;

    oscGain.gain.setValueAtTime(0.001, time);
    oscGain.gain.exponentialRampToValueAtTime(peak, time + 0.015);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + decay);
    osc2.stop(time + decay);
  }

  // Play a soft sound effect for tennis volley or boundary cheer
  playFx(type = 'volley') {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'volley') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'cheer') {
      // Gentle chord chime for boundary hit
      [this.notes.C4, this.notes.E4, this.notes.G4, this.notes.C5].forEach((f, i) => {
        this.pluckString(f, now + i * 0.06);
      });
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const current = this.birthdayMelody[this.melodyStep];
      const now = this.ctx.currentTime;

      if (current.m) {
        this.pluckString(current.m, now, false);
      }
      if (current.b) {
        this.pluckString(current.b, now, true);
      }

      this.melodyStep = (this.melodyStep + 1) % this.birthdayMelody.length;
      this.sequenceTimer = setTimeout(playStep, current.d);
    };

    playStep();
  }

  stop() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }
}

export const guitarSynth = new AcousticGuitarSynth();
