import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Sparkles, Flame, Scissors, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function PizzaGame() {
  const config = birthdayConfig.interests.pizza;
  const [selectedToppings, setSelectedToppings] = useState(['basil', 'mozzarella', 'salami']);
  const [cheeseLevel, setCheeseLevel] = useState(3);
  const [isBaked, setIsBaked] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const [activeSlice, setActiveSlice] = useState(null);
  const [cheeseSizzle, setCheeseSizzle] = useState(false);

  const toggleTopping = (id) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAddCheese = () => {
    setCheeseLevel((c) => Math.min(c + 1, 6));
    setCheeseSizzle(true);
    setTimeout(() => setCheeseSizzle(false), 800);
  };

  const handleBake = () => {
    setIsBaked(true);
    setCheeseSizzle(true);
    setTimeout(() => setCheeseSizzle(false), 1000);
  };

  const handleReset = () => {
    setSelectedToppings(['basil', 'mozzarella', 'salami']);
    setCheeseLevel(3);
    setIsBaked(false);
    setIsSliced(false);
    setActiveSlice(null);
  };

  // Fixed coordinates for toppings distributed across the 6 pizza sectors
  const pepperoniPositions = [
    { x: 38, y: 32, rot: 15 },
    { x: 62, y: 30, rot: -20 },
    { x: 70, y: 55, rot: 45 },
    { x: 50, y: 68, rot: 10 },
    { x: 30, y: 58, rot: -35 },
    { x: 48, y: 46, rot: 5 },
    { x: 32, y: 42, rot: 25 },
    { x: 65, y: 42, rot: -15 }
  ];

  const basilPositions = [
    { x: 44, y: 36, rot: -25, scale: 1 },
    { x: 58, y: 52, rot: 40, scale: 1.1 },
    { x: 36, y: 54, rot: 15, scale: 0.95 },
    { x: 55, y: 36, rot: -70, scale: 1.05 },
    { x: 46, y: 62, rot: 80, scale: 0.9 }
  ];

  const mushroomPositions = [
    { x: 40, y: 48, rot: 12 },
    { x: 60, y: 60, rot: -45 },
    { x: 35, y: 68, rot: 30 },
    { x: 64, y: 34, rot: 75 },
    { x: 48, y: 28, rot: -15 }
  ];

  const olivePositions = [
    { x: 46, y: 40 },
    { x: 58, y: 45 },
    { x: 38, y: 62 },
    { x: 62, y: 64 },
    { x: 30, y: 48 },
    { x: 68, y: 50 }
  ];

  return (
    <section id="pizza" className="section-wrapper">
      <div className="section-header">
        <span className="tag-badge" style={{ borderColor: 'rgba(234, 88, 12, 0.4)', background: 'rgba(234, 88, 12, 0.1)' }}>
          <Utensils size={14} color="#fb923c" />
          <span>{config.tag}</span>
        </span>
        <h2>{config.title}</h2>
        <p>{config.subtitle}</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '36px 20px',
          textAlign: 'center',
          background: 'linear-gradient(145deg, rgba(28, 18, 14, 0.85), rgba(15, 23, 42, 0.9))'
        }}
      >
        {/* Interactive Wood-Fired Pizza Canvas */}
        <div style={{ position: 'relative', maxWidth: '380px', margin: '0 auto 28px' }}>
          {/* Wood Cutting Board / Peel */}
          <div
            style={{
              width: 'min(350px, 86vw)',
              height: 'min(350px, 86vw)',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #452414 0%, #2e170c 70%, #1c0e07 100%)',
              padding: '12px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.8)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Pizza Disc SVG Container with Charred Cornicione & Textures */}
            <svg
              viewBox="0 0 300 300"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                filter: isBaked ? 'brightness(1.04) saturate(1.1)' : 'none',
                transition: 'filter 0.8s ease'
              }}
            >
              <defs>
                {/* Cornicione Wood-fired crust gradient */}
                <radialGradient id="crustGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="68%" stopColor="#ca7d32" />
                  <stop offset="78%" stopColor="#b4641c" />
                  <stop offset="88%" stopColor="#964b0f" />
                  <stop offset="96%" stopColor="#6e3108" />
                  <stop offset="100%" stopColor="#451a03" />
                </radialGradient>

                {/* Crushed San Marzano Tomato Sauce */}
                <radialGradient id="sauceGrad" cx="48%" cy="48%" r="48%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="50%" stopColor="#991b1b" />
                  <stop offset="85%" stopColor="#7f1d1d" />
                  <stop offset="100%" stopColor="#661414" />
                </radialGradient>

                {/* Fresh Buffalo Mozzarella Melt Gradient */}
                <radialGradient id="mozzGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#fef08a" />
                  <stop offset="85%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>

                {/* Spicy Pepperoni Meat Gradient */}
                <radialGradient id="pepGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="45%" stopColor="#b91c1c" />
                  <stop offset="80%" stopColor="#991b1b" />
                  <stop offset="100%" stopColor="#5b1111" />
                </radialGradient>
              </defs>

              {/* Pizza Crust Outer Dough Rim */}
              <circle cx="150" cy="150" r="142" fill="url(#crustGrad)" />

              {/* Charred Leopard-Spots (Wood-Fired Blisters) */}
              <circle cx="28" cy="140" r="4" fill="#200d02" opacity="0.8" />
              <circle cx="50" cy="50" r="6" fill="#1f0a00" opacity="0.75" />
              <circle cx="140" cy="16" r="5" fill="#271003" opacity="0.85" />
              <circle cx="230" cy="40" r="6" fill="#1b0800" opacity="0.8" />
              <circle cx="275" cy="120" r="4.5" fill="#200d02" opacity="0.85" />
              <circle cx="260" cy="220" r="6" fill="#240e02" opacity="0.75" />
              <circle cx="170" cy="282" r="5.5" fill="#1a0800" opacity="0.8" />
              <circle cx="70" cy="250" r="5" fill="#220e03" opacity="0.85" />
              <circle cx="100" cy="272" r="4" fill="#1d0a01" opacity="0.8" />

              {/* San Marzano Tomato Sauce Pool */}
              <circle cx="150" cy="150" r="118" fill="url(#sauceGrad)" />

              {/* Oregano and Olive Oil Gloss Specks */}
              <circle cx="130" cy="130" r="1.5" fill="#14532d" opacity="0.7" />
              <circle cx="170" cy="140" r="1.2" fill="#14532d" opacity="0.7" />
              <circle cx="145" cy="175" r="1.5" fill="#14532d" opacity="0.6" />
              <circle cx="110" cy="160" r="1.3" fill="#14532d" opacity="0.7" />
              <circle cx="185" cy="165" r="1.4" fill="#14532d" opacity="0.65" />
              <circle cx="155" cy="115" r="1.2" fill="#14532d" opacity="0.7" />

              {/* Melted Fresh Buffalo Mozzarella Pools (Scaling with cheeseLevel) */}
              {selectedToppings.includes('mozzarella') && (
                <g>
                  {/* Organic Mozzarella Islands */}
                  <ellipse cx="115" cy="110" rx={18 + cheeseLevel * 2} ry={15 + cheeseLevel * 2} fill="url(#mozzGrad)" opacity="0.95" />
                  <ellipse cx="185" cy="115" rx={19 + cheeseLevel * 2} ry={16 + cheeseLevel * 2} fill="url(#mozzGrad)" opacity="0.95" />
                  <ellipse cx="205" cy="165" rx={17 + cheeseLevel * 2} ry={15 + cheeseLevel * 2} fill="url(#mozzGrad)" opacity="0.95" />
                  <ellipse cx="145" cy="200" rx={20 + cheeseLevel * 2} ry={17 + cheeseLevel * 2} fill="url(#mozzGrad)" opacity="0.95" />
                  <ellipse cx="95" cy="165" rx={18 + cheeseLevel * 2} ry={16 + cheeseLevel * 2} fill="url(#mozzGrad)" opacity="0.95" />
                  <ellipse cx="150" cy="145" rx={22 + cheeseLevel * 2.5} ry={18 + cheeseLevel * 2.5} fill="url(#mozzGrad)" opacity="0.96" />

                  {/* Charred Mozzarella Bubble specks */}
                  <circle cx="118" cy="108" r="2" fill="#78350f" opacity="0.7" />
                  <circle cx="188" cy="118" r="2.2" fill="#78350f" opacity="0.65" />
                  <circle cx="148" cy="142" r="2.5" fill="#78350f" opacity="0.7" />
                </g>
              )}

              {/* Sautéed Portobello Mushrooms */}
              {selectedToppings.includes('mushrooms') &&
                mushroomPositions.map((m, idx) => (
                  <g key={`mush-${idx}`} transform={`translate(${m.x * 3}, ${m.y * 3}) rotate(${m.rot})`}>
                    {/* Mushroom cap */}
                    <path d="M-10,-2 Q0,-12 10,-2 Q0,2 -10,-2 Z" fill="#78716c" stroke="#44403c" strokeWidth="1" />
                    {/* Stem */}
                    <rect x="-3" y="-2" width="6" height="8" rx="2" fill="#a8a29e" />
                    <line x1="-7" y1="-2" x2="-2" y2="4" stroke="#57534e" strokeWidth="0.8" />
                    <line x1="2" y1="-2" x2="6" y2="4" stroke="#57534e" strokeWidth="0.8" />
                  </g>
                ))}

              {/* Spicy Pepperoni Slices (Rendered with charred curled edges) */}
              {selectedToppings.includes('salami') &&
                pepperoniPositions.map((p, idx) => (
                  <g key={`pep-${idx}`} transform={`translate(${p.x * 3}, ${p.y * 3}) rotate(${p.rot})`}>
                    {/* Charred rim */}
                    <circle cx="0" cy="0" r="16" fill="#450a0a" />
                    {/* Meat base */}
                    <circle cx="0" cy="0" r="14.5" fill="url(#pepGrad)" />
                    {/* Crispy cup depth shadow */}
                    <ellipse cx="-2" cy="-2" rx="9" ry="8" fill="#7f1d1d" opacity="0.6" />
                    {/* Spice flecks */}
                    <circle cx="-4" cy="3" r="1" fill="#fecaca" opacity="0.7" />
                    <circle cx="5" cy="-2" r="0.9" fill="#fecaca" opacity="0.7" />
                    <circle cx="1" cy="6" r="1.1" fill="#450a0a" opacity="0.8" />
                    <circle cx="-3" cy="-5" r="0.8" fill="#fef08a" opacity="0.8" />
                  </g>
                ))}

              {/* Kalamata Olive Rings */}
              {selectedToppings.includes('olives') &&
                olivePositions.map((o, idx) => (
                  <g key={`olive-${idx}`} transform={`translate(${o.x * 3}, ${o.y * 3})`}>
                    <circle cx="0" cy="0" r="8" fill="#2e1065" stroke="#1e1b4b" strokeWidth="2" />
                    <circle cx="0" cy="0" r="3.5" fill="#7f1d1d" />
                    <ellipse cx="-2" cy="-2" rx="2" ry="1.2" fill="#ffffff" opacity="0.4" />
                  </g>
                ))}

              {/* Fresh Botanic Basil Leaves (With Leaf Veins) */}
              {selectedToppings.includes('basil') &&
                basilPositions.map((b, idx) => (
                  <g
                    key={`basil-${idx}`}
                    transform={`translate(${b.x * 3}, ${b.y * 3}) rotate(${b.rot}) scale(${b.scale})`}
                  >
                    {/* Shadow */}
                    <path
                      d="M0,-14 C12,-10 14,8 0,16 C-14,8 -12,-10 0,-14 Z"
                      fill="#0f291e"
                      opacity="0.35"
                      transform="translate(1, 2)"
                    />
                    {/* Leaf Body */}
                    <path
                      d="M0,-14 C12,-10 14,8 0,16 C-14,8 -12,-10 0,-14 Z"
                      fill="url(#sauceGrad)"
                      style={{ fill: '#15803d' }}
                    />
                    {/* Glossy top */}
                    <path
                      d="M0,-14 C8,-10 9,6 0,14 C-4,6 -6,-6 0,-14 Z"
                      fill="#22c55e"
                      opacity="0.75"
                    />
                    {/* Leaf stem & veins */}
                    <line x1="0" y1="-12" x2="0" y2="15" stroke="#166534" strokeWidth="1" />
                    <line x1="0" y1="-4" x2="6" y2="-1" stroke="#166534" strokeWidth="0.8" />
                    <line x1="0" y1="2" x2="-6" y2="5" stroke="#166534" strokeWidth="0.8" />
                    <line x1="0" y1="8" x2="5" y2="11" stroke="#166534" strokeWidth="0.8" />
                  </g>
                ))}

              {/* Calabrian Chili Oil Drizzle */}
              {selectedToppings.includes('chili') && (
                <g>
                  <circle cx="125" cy="140" r="3" fill="#ef4444" opacity="0.8" />
                  <circle cx="165" cy="170" r="3.5" fill="#ef4444" opacity="0.8" />
                  <circle cx="175" cy="130" r="2.5" fill="#ef4444" opacity="0.8" />
                  <circle cx="135" cy="180" r="2.8" fill="#ef4444" opacity="0.8" />
                </g>
              )}

              {/* Pizza Slicing Cut Lines */}
              {isSliced && (
                <g stroke="#1a0b04" strokeWidth="2.5" strokeDasharray="3 2" opacity="0.85">
                  <line x1="150" y1="15" x2="150" y2="285" />
                  <line x1="33" y1="82" x2="267" y2="218" />
                  <line x1="33" y1="218" x2="267" y2="82" />
                </g>
              )}
            </svg>
          </div>

          {/* Sizzle & Smoke Particles */}
          <AnimatePresence>
            {cheeseSizzle && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -20, scale: 1.1 }}
                exit={{ opacity: 0, y: -40 }}
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '25%',
                  right: '25%',
                  background: 'rgba(234, 88, 12, 0.9)',
                  color: '#fff',
                  borderRadius: '99px',
                  padding: '6px 14px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 0 20px rgba(234, 88, 12, 0.8)',
                  pointerEvents: 'none',
                  zIndex: 20
                }}
              >
                🔥 Sizzling Hot & Cheesy!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Topping Selection Toggles */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '12px' }}>
            Tap to toss authentic Neapolitan ingredients:
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
            {config.availableToppings.map((top) => {
              const active = selectedToppings.includes(top.id);
              return (
                <button
                  key={top.id}
                  onClick={() => toggleTopping(top.id)}
                  aria-label={`Toggle topping: ${top.name}`}
                  className="btn-glass"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    background: active ? 'rgba(234, 88, 12, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    borderColor: active ? '#f97316' : 'rgba(255, 255, 255, 0.12)',
                    color: active ? '#fff' : '#9ca3af',
                    boxShadow: active ? '0 0 14px rgba(234, 88, 12, 0.3)' : 'none'
                  }}
                >
                  <span>{top.icon}</span>
                  <span>{top.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Chef Actions: More Cheese, Wood-Fired Bake & Pizza Cutter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {/* Add Cheese */}
          <button
            onClick={handleAddCheese}
            className="btn-primary"
            style={{
              padding: '12px 22px',
              fontSize: '0.92rem',
              background: 'linear-gradient(135deg, #d97706, #b45309)'
            }}
          >
            <Sparkles size={16} />
            <span>{config.cheeseButtonText} (x{cheeseLevel})</span>
          </button>

          {/* Bake in Oven */}
          <button
            onClick={handleBake}
            className="btn-glass"
            style={{
              padding: '12px 20px',
              fontSize: '0.92rem',
              color: isBaked ? '#fb923c' : '#ffffff',
              borderColor: isBaked ? '#f97316' : 'rgba(255,255,255,0.2)'
            }}
          >
            <Flame size={16} color={isBaked ? '#f97316' : '#fff'} />
            <span>{isBaked ? 'Wood-Fired Baked 🔥' : 'Bake in Oven'}</span>
          </button>

          {/* Pizza Cutter */}
          <button
            onClick={() => setIsSliced((s) => !s)}
            className="btn-glass"
            style={{
              padding: '12px 18px',
              fontSize: '0.92rem',
              color: isSliced ? '#fde047' : '#ffffff',
              borderColor: isSliced ? '#facc15' : 'rgba(255,255,255,0.2)'
            }}
          >
            <Scissors size={16} />
            <span>{isSliced ? '6 Slices Ready 🍕' : 'Slice Pizza'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="btn-glass"
            style={{ padding: '12px 16px', fontSize: '0.85rem' }}
            aria-label="Reset pizza"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>

        {/* Concluding Quote */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            color: '#fef3c7',
            fontStyle: 'italic'
          }}
        >
          "{config.concludingQuote}"
        </p>
      </div>
    </section>
  );
}
