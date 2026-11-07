import { useState, useEffect, useCallback } from 'react';
import { birthdayConfig } from '../config/birthdayConfig';

const STORAGE_KEY = 'shreya_birthday_quest_v1';

export function useBirthdayQuest() {
  const [discoveredHearts, setDiscoveredHearts] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastDiscovered, setLastDiscovered] = useState(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const totalHearts = birthdayConfig.quest.hearts.length;
  const isCompleted = discoveredHearts.length >= totalHearts;

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(discoveredHearts));
    } catch {
      // Ignore sessionStorage errors
    }
  }, [discoveredHearts]);

  const unlockHeart = useCallback((heartId) => {
    setDiscoveredHearts((prev) => {
      if (prev.includes(heartId)) return prev;
      const next = [...prev, heartId];
      const heartInfo = birthdayConfig.quest.hearts.find(h => h.id === heartId);
      setLastDiscovered(heartInfo || { id: heartId, name: heartId });
      
      if (next.length === totalHearts) {
        // Trigger celebration after short delay
        setTimeout(() => {
          setShowCelebrationModal(true);
        }, 800);
      }
      return next;
    });
  }, [totalHearts]);

  const resetQuest = useCallback(() => {
    setDiscoveredHearts([]);
    setLastDiscovered(null);
    setShowCelebrationModal(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const closeCelebrationModal = useCallback(() => {
    setShowCelebrationModal(false);
  }, []);

  return {
    discoveredHearts,
    totalHearts,
    isCompleted,
    lastDiscovered,
    showCelebrationModal,
    unlockHeart,
    resetQuest,
    closeCelebrationModal,
    hasHeart: (id) => discoveredHearts.includes(id)
  };
}

