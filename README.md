# 💙 A Special Birthday Journey for Shreya

A responsive, single-page interactive birthday experience crafted in **React** + **Vite** + **Framer Motion**.

---

## ✨ Features & Journey Chapters

1. **Cinematic Opening Screen (`IntroScreen.jsx`)**:
   - Soft starfield with glowing particles.
   - Paced narrative reveal: *"Hey you..."* → *"I made something for you."*
   - *"Open Your Birthday Surprise →"* unlocks the experience and begins the acoustic guitar background music safely per browser audio policies.

2. **Birthday Reveal (`BirthdayReveal.jsx`)**:
   - Regal serif typography celebrating Shreya.
   - *"Today isn't just another day. It's the day the world got a little more interesting."*
   - Smooth exploratory cues with subtle floating indicators.

3. **Background Music & Audio Engine (`AudioContext.jsx` & `MusicControl.jsx`)**:
   - Looks for your recording at `/public/audio/birthday-guitar.mp3`.
   - **Zero-Failure Web Audio Fallback**: If no MP3 is present or audio fails to load, a built-in acoustic guitar synthesizer instantly plays gentle fingerstyle arpeggios (C–G–Am–F).
   - Floating unobtrusive controls: Play / Pause, Mute / Unmute, Expandable Volume slider, and animated equalizer bars.

4. **The Birthday Quest ❤️ (`useBirthdayQuest.js` & `BirthdayQuestTracker.jsx`)**:
   - An intuitive 1–3 minute scavenger quest.
   - A persistent floating HUD tracks her collection of **5 Hidden Hearts**:
     - 🥾 **Adventure Heart**: Unlocked by hiking to the summit peak.
     - 🏏 **Cricket Heart**: Unlocked by hitting a boundary at the Lord's/MCG Test match.
     - 🎾 **Tennis Heart**: Unlocked by rallying the ball across Wimbledon grass and Roland-Garros clay.
     - ✈️ **Travel Heart**: Unlocked by switching the Santorini sky to Oia sunset or night.
     - 🍫 **Chocolate Heart**: Unlocked by tasting all 3 tiers of London triple chocolate.
   - Collecting all 5 triggers a celebratory modal with confetti and a transition to the finale.

5. **Her Personality & Interests**:
   - **Hiking Trail (`AdventureSection.jsx`)**: Mountain ridge with 4 interactive checkpoints (Basecamp, Pine Ridge, Eagle's Crest, Summit).
   - **Hairstyle Chronicles (`HairColorGame.jsx`)**: Interactive buttons for 🔵 Blue (*"The adventurous version"*), 🔴 Red (*"The dangerous version"*), and 🍷 Burgundy (*"The effortlessly gorgeous version"*). Dynamically changes the ambient accent glow of the entire application.
   - **Test Match Heritage (`CricketSection.jsx`)**: Scoreboard inspired by Lord's and MCG whites. Batter: Shreya | Score: ∞ | Overs: 365 / ∞. Includes interactive boundary celebration.
   - **Centre Court Tennis (`TennisSection.jsx`)**: Interactive grass & clay court with animated tennis ball. Clicking volleys the ball to reveal: *"Love means zero in tennis... But somehow you mean everything."*
   - **Next Stop: Napoli? (`NaplesSection.jsx`)**: Mediterranean-inspired boarding pass with interactive passport stamp effect.
   - **Wood-Fired Pizza Maker (`PizzaGame.jsx`)**: Interactive Neapolitan pizza board. Add fresh basil, mozzarella, salami, truffle mushrooms, olives, chili oil, and an *"Add More Cheese 🧀"* button with flying cheese animations.
   - **Santorini Aegean Golden Hour (`SantoriniSection.jsx`)**: Cycladic white houses and blue domes with an interactive sky toggle (Day, Sunset, Starlit Night).
   - **London Triple Chocolate (`ChocolateSection.jsx`)**: 3 decadent layers (Dark, Milk, White) revealing: *"Three layers of chocolate... Still not as sweet as you."*
   - **Cinema & Grace (`CinemaSection.jsx`)**: Stylish cinematic homage inspired by Anne Hathaway (Classic Charm & Wit) and Dakota Johnson (Modern Effortless Grace).

6. **Surprise Easter Egg (`SurpriseEasterEgg.jsx`)**:
   - *"Whatever you do, don't click this."* button triggering confetti bursts and a playful love note.

7. **Emotional Finale & Celebration (`FinalMessage.jsx` & `FinalCelebration.jsx`)**:
   - Intimate, distraction-free letter in starlight/candlelight.
   - Customizable heartfelt birthday wishes.
   - Grand fireworks celebration and *"Replay the Birthday Experience"* button.

---

## 🛠️ Personalization

All text, messages, names, and toggles are located in a single file:
👉 **`src/config/birthdayConfig.js`**

```javascript
export const birthdayConfig = {
  name: "Shreya",
  nickname: "Hey you...",
  // customize letter paragraphs, hair quotes, tickets, etc.
};
```

### Adding your own guitar recording:
Place your MP3 file in:
`public/audio/birthday-guitar.mp3`

---

## 🚀 Running Locally

1. **Development Mode**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser or phone on the same local network.

2. **Production Build**:
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist/` directory.

