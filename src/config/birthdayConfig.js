/**
 * Birthday Personalization Configuration
 * Easily customize names, messages, audio paths, and interests here.
 */

export const birthdayConfig = {
  // Recipient Name & Photo
  name: "Shreya",
  nickname: "Hey you...",
  photo: "/images/shreya.jpg",
  
  // Intro screen lines & hanging polaroid fairy lights
  intro: {
    greeting: "Hey you...",
    subtitle: "I made something for you.",
    buttonText: "Open Your Birthday Surprise →",
    hangingPhotos: [
      {
        id: "sparkle",
        src: "/images/gallery/shreya-sparkle.jpg",
        caption: "Radiant Smile ✨",
        rotation: -2.5,
        swayDuration: 4.8,
        swayDelay: 0.2
      },
      {
        id: "maroon",
        src: "/images/gallery/shreya-maroon-sun.jpg",
        caption: "Golden Sunshine ☀️",
        rotation: 2.2,
        swayDuration: 5.2,
        swayDelay: 0.5
      },
      {
        id: "pearls",
        src: "/images/gallery/shreya-pearls.jpg",
        caption: "Effortless Elegance 💫",
        rotation: -2.0,
        swayDuration: 5.4,
        swayDelay: 0.8
      },
      {
        id: "candid",
        src: "/images/gallery/shreya-candid-laugh.jpg",
        caption: "Pure Laughter 😄",
        rotation: 2.5,
        swayDuration: 4.6,
        swayDelay: 0.3
      },
      {
        id: "skirt",
        src: "/images/gallery/shreya-skirt-style.jpg",
        caption: "Grace & Style 🕊️",
        rotation: -2.2,
        swayDuration: 5.0,
        swayDelay: 0.7
      },
      {
        id: "portrait",
        src: "/images/gallery/shreya-portrait.jpg",
        caption: "Warmest Eyes 🌟",
        rotation: 1.8,
        swayDuration: 4.3,
        swayDelay: 0.4
      },
      {
        id: "casual",
        src: "/images/gallery/shreya-casual.jpg",
        caption: "Pure Magic 🌸",
        rotation: -1.8,
        swayDuration: 5.1,
        swayDelay: 0.9
      }
    ]
  },

  // Birthday Reveal Section
  reveal: {
    title: "Happy Birthday, Shreya ❤️",
    subtitle: "Today isn't just another day.\nIt's the day the world got a little more interesting.",
    cta: "There's more..."
  },

  // Personality & Interests sections
  interests: {
    hiking: {
      enabled: true,
      tag: "ADVENTURE",
      title: "For all the trails you still haven't conquered...",
      subtitle: "Click each peak along the mountain trail to map our journey:",
      trailPoints: [
        { id: 1, title: "Basecamp Sunrise", desc: "Where every morning starts with wild coffee & wilder ideas." },
        { id: 2, title: "Pine Ridge Ridge", desc: "Breathtaking views, tired legs, but zero regrets." },
        { id: 3, title: "Eagle's Crest", desc: "Halfway up, complaining about the incline, smiling anyway." },
        { id: 4, title: "The Summit Peak", desc: "Standing at the top of the world. You belong at the highest peaks." }
      ],
      heartRevealedMsg: "❤️ Adventure Heart Discovered: For your unstoppable wanderer spirit!"
    },

    hairColors: {
      enabled: true,
      title: "Three colors. Three personalities. One absolutely unforgettable you.",
      subtitle: "Tap a shade to see how each color reflects a side of you:",
      colors: [
        {
          id: "blue",
          name: "Electric Blue",
          hex: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.4)",
          label: "🔵 Blue",
          photo: "/images/shreya-blue.jpg",
          description: "The adventurous version.",
          quote: "Bold, electric, fearless, and always ready to jump into the next wild ride."
        },
        {
          id: "red",
          name: "Crimson Blaze",
          hex: "#ef4444",
          glow: "rgba(239, 68, 68, 0.4)",
          label: "🔴 Red",
          photo: "/images/shreya-red.jpg",
          description: "The dangerous version.",
          quote: "Fierce, magnetic, stunningly stubborn, and capable of lighting up any room."
        },
        {
          id: "burgundy",
          name: "Royal Burgundy",
          hex: "#881337",
          glow: "rgba(136, 19, 55, 0.5)",
          label: "🍷 Burgundy",
          photo: "/images/shreya-burgundy.jpg",
          description: "The effortlessly gorgeous version.",
          quote: "Classy, warm, timeless, and with that mysterious smile that never fails."
        }
      ]
    },

    cricket: {
      enabled: true,
      tag: "TEST MATCH TRADITION",
      title: "Lord's, MCG & A True Test Match Heart",
      subtitle: "Inspired by crisp whites, the Long Room, and Indian Test match magic:",
      scoreboard: {
        match: "HER BIRTHDAY TEST MATCH",
        venue: "Lord's & Melbourne Cricket Ground",
        player: "Shreya",
        score: "∞",
        overs: "365 / ∞",
        strikeRate: "Flawless",
        status: "Still making life interesting."
      },
      quote: "Some people watch cricket for the score.\nYou somehow make every day feel like a five-day Test match worth staying for.",
      heartRevealedMsg: "❤️ Cricket Heart Discovered: A timeless innings of pure joy!"
    },

    tennis: {
      enabled: true,
      tag: "CENTRE COURT",
      title: "Wimbledon Grass & Roland-Garros Clay",
      subtitle: "Click the tennis ball to rally across Centre Court:",
      firstReveal: "Love means zero in tennis...",
      secondReveal: "But somehow you mean everything.",
      heartRevealedMsg: "❤️ Tennis Heart Discovered: Ace on every match point!"
    },

    naples: {
      enabled: true,
      tag: "MEDITERRANEAN DREAMS",
      title: "Next stop: Napoli? 🇮🇹",
      subtitle: "One day we'll find our way to Naples...",
      ticket: {
        destination: "NAPLES 🇮🇹",
        code: "NAP",
        from: "WHEREVER WE ARE",
        gate: "LOVE-01",
        seat: "1A (Window)",
        status: "Dreaming...",
        boarding: "Someday soon"
      },
      description: "Cobblestone alleys, scooters whizzing by, Mediterranean breezes, and discovering the best street pizza in the world together."
    },

    pizza: {
      enabled: true,
      tag: "ARTISAN NEAPOLITAN",
      title: "Build Her Perfect Neapolitan Pizza 🍕",
      subtitle: "Because life without great pizza is simply unfinished:",
      availableToppings: [
        { id: "basil", name: "Fresh Basil", icon: "🌿", color: "#22c55e" },
        { id: "mozzarella", name: "Bufala Mozzarella", icon: "🧀", color: "#fef08a" },
        { id: "salami", name: "Spicy Pepperoni", icon: "🥓", color: "#dc2626" },
        { id: "mushrooms", name: "Truffle Mushrooms", icon: "🍄", color: "#a8a29e" },
        { id: "olives", name: "Kalamata Olives", icon: "🫒", color: "#3f3f46" },
        { id: "chili", name: "Calabrian Chili Oil", icon: "🌶️", color: "#ef4444" }
      ],
      cheeseButtonText: "Add More Cheese 🧀🍕",
      concludingQuote: "Okay, maybe happiness really is just pizza."
    },

    santorini: {
      enabled: true,
      tag: "AEGEAN GOLDEN HOUR",
      title: "Santorini is waiting... 🇬🇷",
      lines: [
        "Blue skies, white houses, endless ocean...",
        "...and maybe someone who'd happily get lost there with you."
      ],
      heartRevealedMsg: "❤️ Travel Heart Discovered: Next destination, forever sunsets!"
    },

    chocolate: {
      enabled: true,
      tag: "LONDON SWEET TOOTH",
      title: "London Triple Chocolate 🍫",
      subtitle: "Tap through all three artisan layers:",
      layers: [
        { id: "dark", name: "70% Single-Origin Dark Chocolate", note: "Deep, rich, and sophisticated", color: "#2e1a12" },
        { id: "milk", name: "Creamy London Milk Chocolate", note: "Smooth, comforting, and melt-in-your-mouth", color: "#6b3e26" },
        { id: "white", name: "Madagascar Vanilla White Ganache", note: "Delicate, sweet, and pure luxury", color: "#d4b996" }
      ],
      firstReveal: "Three layers of chocolate.",
      secondReveal: "Still not as sweet as you.",
      heartRevealedMsg: "❤️ Chocolate Heart Discovered: Pure, melt-in-your-heart sweetness!"
    },

    bracelets: {
      enabled: true,
      tag: "HER PERSONAL WISHLIST JEWELRY BOX",
      title: "Try On Her Wishlist Bracelets ✨",
      subtitle: "The exact bracelets she shared — tap any piece to try it on her wrist in real-time:",
      handPhoto: "/images/shreya-hand-original.jpg",
      styles: [
        {
          id: "nail",
          name: "Zayden Diamond Nail",
          icon: "✨",
          metal: "18K Gold & Pavé Diamonds",
          brand: "SWASHAA",
          price: "Rs. 849",
          photo: "/images/shreya-hand-nail.jpg",
          catalogPhoto: "/images/wishlist/zayden-nail.jpg",
          tag: "Her Wishlist Pick",
          description: "An iconic 18K gold wrapped nail bangle set with sparkling pavé diamonds on the head and point.",
          note: "Bold, modern, and undeniably chic — just like the girl who chose it.",
          wishlistText: "Added to birthday wishlist: Zayden Diamond Nail Bangle!"
        },
        {
          id: "paperclip",
          name: "Virella Diamond Link",
          icon: "🔗",
          metal: "18K Gold Paperclip Links",
          brand: "SWASHAA",
          price: "Rs. 999",
          photo: "/images/shreya-hand-paperclip.jpg",
          catalogPhoto: "/images/wishlist/virella-link.jpg",
          tag: "Her Wishlist Pick",
          description: "Elongated 18K gold paperclip links alternating with brilliant-cut round solitaire diamonds.",
          note: "Delicate yet striking, catching the light whenever you talk with your hands.",
          wishlistText: "Added to birthday wishlist: Virella Diamond Link Bracelet!"
        },
        {
          id: "stacked",
          name: "The Glamour Stack Trio",
          icon: "💫",
          metal: "Triple Layered Diamonds",
          brand: "Wishlist Set",
          price: "Stacked Look",
          photo: "/images/shreya-hand-stacked.jpg",
          catalogPhoto: "/images/wishlist/stacked-rhinestone.jpg",
          tag: "Her Wishlist Pick",
          description: "The iconic layered trio: oval bezel diamond chain, classic tennis bracelet, and baguette channel.",
          note: "Why choose just one when all three together look this breathtaking on your wrist?",
          wishlistText: "Added to birthday wishlist: The Glamour Stack Trio!"
        },
        {
          id: "qanira",
          name: "Qanira Diamond Band",
          icon: "👑",
          metal: "18K Gold Geometric Cuff",
          brand: "SWASHAA",
          price: "Rs. 849",
          photo: "/images/shreya-hand-qanira.jpg",
          catalogPhoto: "/images/wishlist/qanira-band.jpg",
          tag: "Her Wishlist Pick",
          description: "Intricate openwork geometric square and circle lattice with a center row of bezel diamonds.",
          note: "Royal elegance with that effortless aesthetic you always carry so naturally.",
          wishlistText: "Added to birthday wishlist: Qanira Diamond Band Bracelet!"
        },
        {
          id: "oval",
          name: "Oval Crystal Tennis",
          icon: "💎",
          metal: "Gold Bezel Crystals",
          brand: "Wishlist Pick",
          price: "Sparkle Line",
          photo: "/images/shreya-hand-oval-tennis.jpg",
          catalogPhoto: "/images/wishlist/oval-rhinestone.jpg",
          tag: "Her Wishlist Pick",
          description: "A continuous single row of oval-cut bezel stones with radiant crystalline sparkle.",
          note: "Pure, glittering brightness that makes every little gesture look magical.",
          wishlistText: "Added to birthday wishlist: Oval Crystal Tennis Bracelet!"
        },
        {
          id: "original",
          name: "Her Original Silver Bangle",
          icon: "🌸",
          metal: "Sterling Silver Spiral",
          brand: "Her Keepsake",
          price: "Priceless",
          photo: "/images/shreya-hand-original.jpg",
          catalogPhoto: "/images/shreya-hand-original.jpg",
          tag: "The Authentic Keepsake",
          description: "Her signature spiral wire bangle from the day she held the white carnation.",
          note: "The original piece that was there on the day of this special memory.",
          wishlistText: "The original classic that started it all."
        }
      ],
      compliment: "Holding your hand with any of these bracelets will always be my favorite place to be."
    },

    cinema: {
      enabled: true,
      tag: "CRAFT & CINEMA",
      title: "Your Kind of Cinema ✨",
      subtitle: "A tribute to timeless on-screen elegance and magnetic charm:",
      cards: [
        {
          id: "classic",
          icon: "🎬",
          muse: "Inspired by Anne Hathaway",
          tag: "Classic Charm & Wit",
          desc: "Unapologetic brilliance, luminous smiles, infectious humor, and radiant grace.",
          quote: "The kind of presence that turns an ordinary room into a film still."
        },
        {
          id: "modern",
          icon: "🎞️",
          muse: "Inspired by Dakota Johnson",
          tag: "Modern Effortless Elegance",
          desc: "Understated cool, effortless beauty, wry humor, and irresistible allure.",
          quote: "Never trying too hard, yet impossible to look away from."
        }
      ]
    }
  },

  // 5 Hidden Hearts Quest
  quest: {
    title: "The Birthday Quest ❤️",
    subtitle: "Collect all 5 hidden hearts scattered throughout her world:",
    hearts: [
      { id: "adventure", name: "Adventure", icon: "🥾", description: "Found along the mountain summit trail" },
      { id: "cricket", name: "Cricket", icon: "🏏", description: "Found at the Lord's scoreboard" },
      { id: "tennis", name: "Tennis", icon: "🎾", description: "Found upon Centre Court match point" },
      { id: "travel", name: "Travel", icon: "✈️", description: "Found amid the Santorini sunset" },
      { id: "chocolate", name: "Chocolate", icon: "🍫", description: "Found inside the London triple chocolate layers" }
    ],
    completedTitle: "You found them all.",
    completedSubtitle: "But there was always one thing I was hoping you'd find...",
    jumpToFinale: "Read Your Letter →"
  },

  // Unexpected Surprise / Easter Egg
  surprise: {
    buttonLabel: "Whatever you do, don't click this.",
    revealedMessage: "Okay, maybe you were always going to click that... 😉",
    secretNote: "P.S. You're my favorite person in the entire universe. But you already knew that, didn't you?"
  },

  // Final Birthday Message
  final: {
    preTitle: "And now, the important part...",
    birthdayTitle: "Happy Birthday, Shreya ❤️",
    keepsakes: [
      {
        id: "maroon",
        src: "/images/gallery/shreya-maroon-sun.jpg",
        caption: "Golden Sunshine ☀️",
        tag: "Radiant Warmth"
      },
      {
        id: "candid",
        src: "/images/gallery/shreya-candid-laugh.jpg",
        caption: "Pure Joy & Laughter 😄",
        tag: "Infectious Smile"
      },
      {
        id: "skirt",
        src: "/images/gallery/shreya-skirt-style.jpg",
        caption: "Grace & Elegance 🕊️",
        tag: "Effortless Style"
      },
      {
        id: "sparkle",
        src: "/images/gallery/shreya-sparkle.jpg",
        caption: "Forever Radiant ✨",
        tag: "Classic Glow"
      },
      {
        id: "pearls",
        src: "/images/gallery/shreya-pearls.jpg",
        caption: "Effortless Charm 💫",
        tag: "Timeless Grace"
      },
      {
        id: "casual",
        src: "/images/gallery/shreya-casual.jpg",
        caption: "Pure Magic 🌸",
        tag: "One & Only"
      }
    ],
    letterParagraphs: [
      "I hope this year takes you to new places, new adventures, new dreams, and all the little moments that make you happiest.",
      "I know how hard you've been working lately — the quiet study hours, the discipline, and the sheer courage it takes to pursue a dream as big as UPSC. Watching your dedication, your brilliant mind, and how relentlessly you chase what you believe in inspires me more than words can say.",
      "With your exam coming up on the 19th, remember to take a breath and trust yourself. Walk into that room knowing how deeply capable, resilient, and unstoppable you are. You've put in the heart, you've put in the grit, and you were truly made to do extraordinary things.",
      "I hope this year gives you your mountains, your cricket matches, your tennis courts, your Naples pizza, your Santorini sunsets, your London chocolate, your sparkling bracelets...",
      "and maybe a few adventures with me along the way.",
      "No matter what test you face or what mountain you climb, remember you will always have someone in your corner cheering the loudest for you.",
      "Happy Birthday, Officer in the making ❤️"
    ],
    signoff: "Forever your biggest fan,",
    celebrationText: "Here's to another year of being wonderfully you.",
    replayButtonText: "Replay the Birthday Experience ✨"
  },

  // Audio settings
  audio: {
    src: "/audio/birthday-guitar.mp3",
    loop: true,
    volume: 0.75,
    title: "Acoustic Birthday Melody"
  }
};

