import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from './config/birthdayConfig';
import { useBirthdayQuest } from './hooks/useBirthdayQuest';
import BackgroundStars from './components/BackgroundStars';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import BirthdayReveal from './components/BirthdayReveal';
import AdventureSection from './components/AdventureSection';
import HairColorGame from './components/HairColorGame';
import CricketSection from './components/CricketSection';
import TennisSection from './components/TennisSection';
import NaplesSection from './components/NaplesSection';
import PizzaGame from './components/PizzaGame';
import BraceletSection from './components/BraceletSection';
import SantoriniSection from './components/SantoriniSection';
import ChocolateSection from './components/ChocolateSection';
import CinemaSection from './components/CinemaSection';
import SurpriseEasterEgg from './components/SurpriseEasterEgg';
import BirthdayQuestTracker from './components/BirthdayQuestTracker';
import FinalMessage from './components/FinalMessage';
import FinalCelebration from './components/FinalCelebration';
import MusicControl from './components/MusicControl';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const {
    discoveredHearts,
    totalHearts,
    isCompleted,
    showCelebrationModal,
    unlockHeart,
    resetQuest,
    closeCelebrationModal,
    hasHeart
  } = useBirthdayQuest();

  const handleOpenSurprise = () => {
    setShowIntro(false);
  };

  const handleExploreMore = () => {
    const el = document.getElementById('hiking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFinal = () => {
    const el = document.getElementById('final-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    resetQuest();
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Dynamic Starfield Background */}
      <BackgroundStars />

      {/* Screen Transitions: Mode="wait" guarantees Intro Screen finishes before Main Mounts */}
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro-screen" onOpenSurprise={handleOpenSurprise} />
        ) : (
          <motion.div
            key="main-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* Subtle Chapter Navigation */}
            <Navbar />

            {/* Floating Quest HUD */}
            <BirthdayQuestTracker
              discoveredHearts={discoveredHearts}
              totalHearts={totalHearts}
              isCompleted={isCompleted}
              showCelebrationModal={showCelebrationModal}
              onCloseCelebrationModal={closeCelebrationModal}
              onScrollToFinal={handleScrollToFinal}
            />

            {/* Main Storyline Sections */}
            <main style={{ position: 'relative', zIndex: 1 }}>
              {/* Section 1: Birthday Reveal (with Her Photo) */}
              <BirthdayReveal onExploreMore={handleExploreMore} />

              {/* Section 2: Hiking & Mountain Adventure */}
              {birthdayConfig.interests.hiking.enabled && (
                <AdventureSection
                  onUnlockHeart={unlockHeart}
                  hasHeart={hasHeart('adventure')}
                />
              )}

              {/* Section 3: Hair Color & Personalities */}
              {birthdayConfig.interests.hairColors.enabled && <HairColorGame />}

              {/* Section 4: Lord's & MCG Cricket Test Match */}
              {birthdayConfig.interests.cricket.enabled && (
                <CricketSection
                  onUnlockHeart={unlockHeart}
                  hasHeart={hasHeart('cricket')}
                />
              )}

              {/* Section 5: Wimbledon & French Open Tennis */}
              {birthdayConfig.interests.tennis.enabled && (
                <TennisSection
                  onUnlockHeart={unlockHeart}
                  hasHeart={hasHeart('tennis')}
                />
              )}

              {/* Section 6: Naples Italy Travel */}
              {birthdayConfig.interests.naples.enabled && <NaplesSection />}

              {/* Section 7: Artisan Pizza Crafting */}
              {birthdayConfig.interests.pizza.enabled && <PizzaGame />}

              {/* Section 8: Keepsake Charm Bracelet */}
              {birthdayConfig.interests.bracelets?.enabled && <BraceletSection />}

              {/* Section 9: Santorini Greece Aegean Sunset */}
              {birthdayConfig.interests.santorini.enabled && (
                <SantoriniSection
                  onUnlockHeart={unlockHeart}
                  hasHeart={hasHeart('travel')}
                />
              )}

              {/* Section 9: London Triple Chocolate */}
              {birthdayConfig.interests.chocolate.enabled && (
                <ChocolateSection
                  onUnlockHeart={unlockHeart}
                  hasHeart={hasHeart('chocolate')}
                />
              )}

              {/* Section 10: Cinema & Cinematic Style */}
              {birthdayConfig.interests.cinema.enabled && <CinemaSection />}

              {/* Surprise Easter Egg Button */}
              <SurpriseEasterEgg />

              {/* Section 11: Heartfelt Final Letter */}
              <FinalMessage />

              {/* Section 12: Grand Finale & Replay */}
              <FinalCelebration onReplay={handleReplay} />
            </main>

            {/* Floating Unobtrusive Music Player */}
            <MusicControl />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
