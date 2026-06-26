import React from 'react';

interface CarnivoreLogoProps {
  className?: string;
}

export default function CarnivoreLogo({ className = "w-10 h-10" }: CarnivoreLogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ filter: "drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.18))" }}
    >
      <defs>
        {/* Shadow filters for individual ingredient layers to give depth */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodOpacity="0.45" floodColor="#000000" />
        </filter>
        <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.35" floodColor="#000000" />
        </filter>
        
        {/* Gourmet steak gradients */}
        <linearGradient id="steakBase" x1="50" y1="70" x2="450" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#250903" />
          <stop offset="25%" stopColor="#3a1107" />
          <stop offset="50%" stopColor="#4e160a" />
          <stop offset="75%" stopColor="#300d05" />
          <stop offset="100%" stopColor="#180401" />
        </linearGradient>

        <radialGradient id="rareMeat" cx="30%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#b91c1c" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
        </radialGradient>

        {/* Veggie & Herb frame gradient */}
        <linearGradient id="veggieBase" x1="50" y1="270" x2="450" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#063c1e" />
          <stop offset="35%" stopColor="#0d532a" />
          <stop offset="70%" stopColor="#126635" />
          <stop offset="100%" stopColor="#042713" />
        </linearGradient>

        {/* Ingredient gradients */}
        <linearGradient id="chiliGrad" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="40%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>

        <linearGradient id="pepperGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>

        <linearGradient id="garlicGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="60%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id="woodBowl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="70%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1c0a00" />
        </linearGradient>

        {/* Symmetrical clip path for Top Steak Frame */}
        <clipPath id="steakFrameClip">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M 90 70 L 410 70 A 40 40 0 0 1 450 110 L 450 190 A 40 40 0 0 1 410 230 L 90 230 A 40 40 0 0 1 50 190 L 50 110 A 40 40 0 0 1 90 70 Z M 110 115 A 15 15 0 0 0 95 130 L 95 170 A 15 15 0 0 0 110 185 L 390 185 A 15 15 0 0 0 405 170 L 405 130 A 15 15 0 0 0 390 115 Z" 
          />
        </clipPath>

        {/* Symmetrical clip path for Bottom Veggie Frame */}
        <clipPath id="veggieFrameClip">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M 90 270 L 410 270 A 40 40 0 0 1 450 310 L 450 390 A 40 40 0 0 1 410 430 L 90 430 A 40 40 0 0 1 50 390 L 50 310 A 40 40 0 0 1 90 270 Z M 110 315 A 15 15 0 0 0 95 330 L 95 370 A 15 15 0 0 0 110 385 L 390 385 A 15 15 0 0 0 405 370 L 405 330 A 15 15 0 0 0 390 315 Z" 
          />
        </clipPath>
      </defs>

      {/* ========================================================= */}
      {/* 1. TOP FRAME: PREMIUM GRILLED STEAK (Symmetrical & Aligned) */}
      {/* ========================================================= */}
      <g id="steak-frame">
        {/* Beautifully aligned base steak shape with uniform 45px thickness */}
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M 90 70 L 410 70 A 40 40 0 0 1 450 110 L 450 190 A 40 40 0 0 1 410 230 L 90 230 A 40 40 0 0 1 50 190 L 50 110 A 40 40 0 0 1 90 70 Z M 110 115 A 15 15 0 0 0 95 130 L 95 170 A 15 15 0 0 0 110 185 L 390 185 A 15 15 0 0 0 405 170 L 405 130 A 15 15 0 0 0 390 115 Z" 
          fill="url(#steakBase)"
        />

        {/* Textures and details clipped strictly inside the frame */}
        <g clipPath="url(#steakFrameClip)">
          {/* Sizzling Red Core zone */}
          <rect x="40" y="60" width="420" height="180" fill="url(#rareMeat)" />

          {/* Symmetrical meat marbling & fibers */}
          <path d="M 60 90 Q 120 85 180 95 T 300 85 T 440 95" stroke="#7f1d1d" strokeWidth="5" opacity="0.35" strokeLinecap="round" fill="none" />
          <path d="M 60 140 Q 140 135 220 145 T 360 135 T 440 140" stroke="#7f1d1d" strokeWidth="6" opacity="0.3" strokeLinecap="round" fill="none" />
          <path d="M 60 210 Q 130 195 200 215 T 340 200 T 440 210" stroke="#991b1b" strokeWidth="4" opacity="0.25" strokeLinecap="round" fill="none" />

          {/* Sizzling fat render lines */}
          <path d="M 70 115 Q 110 110 150 125 T 270 120 T 410 115" stroke="#b45309" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" fill="none" />
          <path d="M 80 180 Q 150 170 220 185 T 380 175" stroke="#d97706" strokeWidth="2" opacity="0.35" strokeLinecap="round" fill="none" />

          {/* Professional, Symmetrical Grill Marks */}
          <g stroke="#120401" strokeWidth="6" strokeLinecap="round" opacity="0.95">
            <line x1="10" y1="140" x2="110" y2="40" />
            <line x1="70" y1="180" x2="190" y2="60" />
            <line x1="130" y1="220" x2="270" y2="80" />
            <line x1="190" y1="260" x2="350" y2="100" />
            <line x1="250" y1="300" x2="430" y2="120" />
            <line x1="310" y1="340" x2="490" y2="160" />
          </g>

          {/* Red/Amber Seared Highlights adjacent to grill marks (sizzling heat) */}
          <g stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
            <line x1="12" y1="140" x2="112" y2="40" />
            <line x1="72" y1="180" x2="192" y2="60" />
            <line x1="132" y1="220" x2="272" y2="80" />
            <line x1="192" y1="260" x2="352" y2="100" />
            <line x1="252" y1="300" x2="432" y2="120" />
            <line x1="312" y1="340" x2="492" y2="160" />
          </g>

          {/* Sea Salt Crystals */}
          <g fill="#ffffff" opacity="0.92" filter="url(#shadow)">
            <rect x="75" y="95" width="6" height="6" rx="1.5" transform="rotate(15 75 95)" />
            <rect x="58" y="135" width="5" height="5" rx="1" transform="rotate(45 58 135)" />
            <rect x="95" y="200" width="7" height="4" rx="1" transform="rotate(-30 95 200)" />
            
            <rect x="415" y="100" width="6" height="6" rx="1.5" transform="rotate(35 415 100)" />
            <rect x="435" y="135" width="5" height="5" rx="1" transform="rotate(-15 435 135)" />
            <rect x="420" y="180" width="7" height="5" rx="1.5" transform="rotate(10 420 180)" />
            <rect x="385" y="210" width="5" height="5" rx="1" transform="rotate(60 385 210)" />
          </g>

          {/* Scattered Black Peppercorns */}
          <g filter="url(#shadow)">
            <circle cx="85" cy="165" r="4.5" fill="#1c1917" />
            <circle cx="83.5" cy="163.5" r="1.5" fill="#a8a29e" opacity="0.75" />

            <circle cx="115" cy="125" r="4" fill="#292524" />
            <circle cx="114" cy="124" r="1" fill="#e7e5e4" opacity="0.65" />

            <circle cx="405" cy="145" r="4.8" fill="#1c1917" />
            <circle cx="403.5" cy="143.5" r="1.5" fill="#ffffff" opacity="0.8" />

            <circle cx="390" cy="195" r="4" fill="#292524" />
          </g>
        </g>

        {/* 3D Sprig of Rosemary (Overlaps left edge with translated coordinates) */}
        <g id="rosemary-left" filter="url(#shadow)" transform="translate(0, 20)">
          <path d="M 32 165 C 45 135 68 115 95 105" stroke="#0f2f1d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 32 165 C 45 135 68 115 95 105" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Leaves along the stem */}
          <path d="M 40 152 Q 22 142 16 150" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 40 152 Q 52 140 50 130" fill="#15803d" stroke="#0f2f1d" strokeWidth="0.5" />
          <path d="M 48 140 Q 30 125 35 118" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 48 140 Q 64 125 66 115" fill="#15803d" stroke="#0f2f1d" strokeWidth="0.5" />
          <path d="M 58 130 Q 45 110 52 104" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 58 130 Q 75 115 78 106" fill="#15803d" stroke="#0f2f1d" strokeWidth="0.5" />
          <path d="M 72 118 Q 62 95 70 91" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 72 118 Q 88 105 92 98" fill="#22c55e" stroke="#15803d" strokeWidth="0.5" />
          <path d="M 85 110 Q 80 88 88 84" fill="#4ade80" stroke="#166534" strokeWidth="0.5" />
        </g>

        {/* 3D Toasted Garlic cloves (Overlaps right edge) */}
        <g id="toasted-garlic" filter="url(#shadow)">
          {/* Garlic Clove 1 */}
          <g transform="translate(425, 85) rotate(-20)">
            <path d="M 0 10 C -4 10 -10 6 -10 0 C -10 -10 0 -18 4 -22 C 5 -18 12 -10 12 0 C 12 6 6 10 0 10 Z" fill="url(#garlicGrad)" />
            <path d="M -6 -2 C -8 -4 -7 -8 -5 -10 C -4 -11 -3 -8 -4 -5 C -5 -2 -5 -2 -6 -2 Z" fill="#78350f" opacity="0.85" />
            <path d="M 4 2 C 5 4 4 6 2 7 C 0 8 1 5 2 3 C 3 1 3 1 4 2 Z" fill="#451a03" opacity="0.9" />
            <path d="M -2 -15 C 2 -10 2 -2 0 6" stroke="#d97706" strokeWidth="0.7" fill="none" opacity="0.6" />
          </g>

          {/* Garlic Clove 2 */}
          <g transform="translate(445, 115) rotate(15)">
            <path d="M 0 12 C -5 12 -12 8 -12 0 C -12 -12 0 -22 5 -26 C 6 -22 14 -12 14 0 C 14 8 7 12 0 12 Z" fill="url(#garlicGrad)" />
            <path d="M -5 2 C -7 0 -8 -5 -6 -8 C -5 -9 -4 -6 -5 -3 Z" fill="#451a03" opacity="0.9" />
            <path d="M 6 -3 C 8 -1 8 4 6 6" fill="#78350f" opacity="0.8" />
            <path d="M -2 -18 C 2 -12 2 -2 0 8" stroke="#d97706" strokeWidth="0.7" fill="none" opacity="0.6" />
          </g>
        </g>
      </g>

      {/* ========================================================= */}
      {/* 2. BOTTOM FRAME: VEGGIES, HERBS & ONIONS (Symmetrical)   */}
      {/* ========================================================= */}
      <g id="veggie-frame">
        {/* Symmetrical base green garden frame with 45px thickness */}
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M 90 270 L 410 270 A 40 40 0 0 1 450 310 L 450 390 A 40 40 0 0 1 410 430 L 90 430 A 40 40 0 0 1 50 390 L 50 310 A 40 40 0 0 1 90 270 Z M 110 315 A 15 15 0 0 0 95 330 L 95 370 A 15 15 0 0 0 110 385 L 390 385 A 15 15 0 0 0 405 370 L 405 330 A 15 15 0 0 0 390 315 Z" 
          fill="url(#veggieBase)"
        />

        {/* Veggie frame contents clipped to shape */}
        <g clipPath="url(#veggieFrameClip)">
          {/* Dense leafy undergrowth layer */}
          <g opacity="0.8">
            <path d="M 40 290 Q 90 275 140 295 T 240 280 T 340 295 T 440 280" stroke="#042713" strokeWidth="20" strokeLinecap="round" fill="none" />
            <path d="M 40 410 Q 90 425 140 405 T 240 420 T 340 405 T 440 425" stroke="#042713" strokeWidth="20" strokeLinecap="round" fill="none" />
            <path d="M 65 300 Q 40 350 65 400" stroke="#042713" strokeWidth="18" strokeLinecap="round" fill="none" />
            <path d="M 435 300 Q 460 350 435 400" stroke="#042713" strokeWidth="18" strokeLinecap="round" fill="none" />
          </g>

          {/* Leaf sprigs */}
          <g fill="#166534" opacity="0.9">
            <circle cx="70" cy="405" r="9" />
            <circle cx="82" cy="412" r="10" />
            <circle cx="165" cy="290" r="9" fill="#15803d" />
            <circle cx="245" cy="288" r="10" fill="#16a34a" />
            <circle cx="325" cy="290" r="9" fill="#15803d" />
          </g>

          {/* Concentric Purple Red Onion Rings (Aesthetic corner cluster) */}
          <g transform="translate(420, 385) rotate(-15)" filter="url(#shadow)">
            <ellipse cx="0" cy="0" rx="35" ry="25" fill="#fdf4ff" stroke="#c084fc" strokeWidth="5.5" />
            <ellipse cx="0" cy="0" rx="29" ry="20" fill="none" stroke="#d8b4fe" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="23" ry="16" fill="none" stroke="#c084fc" strokeWidth="4" />
            <ellipse cx="0" cy="0" rx="17" ry="11" fill="none" stroke="#e9d5ff" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="12" ry="8" fill="none" stroke="#a21caf" strokeWidth="3" />
            <ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#fdf4ff" stroke="#d8b4fe" strokeWidth="1" />
          </g>

          <g transform="translate(435, 335) rotate(20)" filter="url(#shadow)">
            <ellipse cx="0" cy="0" rx="24" ry="17" fill="#fdf4ff" stroke="#c084fc" strokeWidth="4.5" opacity="0.85" />
            <ellipse cx="0" cy="0" rx="18" ry="12" fill="none" stroke="#c084fc" strokeWidth="3.2" opacity="0.85" />
            <ellipse cx="0" cy="0" rx="10" ry="6.5" fill="none" stroke="#a21caf" strokeWidth="2" opacity="0.85" />
          </g>

          {/* Fresh Vine & Cherry Tomatoes */}
          <path d="M 390 265 C 400 285 415 310 400 340" stroke="#166534" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#shadow)" />
          
          {/* Tomato 1 (Top cluster) */}
          <g transform="translate(415, 285)" filter="url(#shadow)">
            <circle cx="0" cy="0" r="17" fill="url(#chiliGrad)" />
            <ellipse cx="-5" cy="-5" rx="4" ry="2" fill="#ffffff" transform="rotate(-30 -5 -5)" opacity="0.9" />
            <ellipse cx="-4" cy="-4" rx="1.5" ry="0.8" fill="#ffffff" transform="rotate(-30 -4 -4)" opacity="0.95" />
            <path d="M 0 0 L -4 -22 L 2 -18 L 8 -22 L 5 -15 L 12 -12 L 2 -14 Z" fill="#15803d" transform="translate(-1, 2) scale(0.55) rotate(-45)" />
          </g>

          {/* Tomato 2 (Lower cluster) */}
          <g transform="translate(390, 322)" filter="url(#shadow)">
            <circle cx="0" cy="0" r="15" fill="url(#chiliGrad)" />
            <ellipse cx="-4.5" cy="-4.5" rx="3.5" ry="1.8" fill="#ffffff" transform="rotate(-30 -4.5 -4.5)" opacity="0.85" />
            <path d="M 0 0 L -4 -22 L 2 -18 L 8 -22 L 5 -15 L 12 -12 L 2 -14 Z" fill="#16a34a" transform="translate(-1, 2) scale(0.48) rotate(15)" />
          </g>

          {/* Tomato 3 */}
          <g transform="translate(430, 320)" filter="url(#shadow)">
            <circle cx="0" cy="0" r="13" fill="url(#chiliGrad)" />
            <ellipse cx="-4" cy="-4" rx="3" ry="1.5" fill="#ffffff" transform="rotate(-30 -4 -4)" opacity="0.85" />
            <path d="M 0 0 L -4 -22 L 2 -18 L 8 -22 L 5 -15 L 12 -12 L 2 -14 Z" fill="#15803d" transform="translate(-1, 2) scale(0.4) rotate(-110)" />
          </g>

          {/* Vibrantly styled Red Chili Pepper (Lower Left corner) */}
          <g transform="translate(55, 370) rotate(30)" filter="url(#shadow)">
            <path d="M -16 -40 C -12 -38 -8 -45 -10 -52" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M -22 -38 C -15 -35 -5 -35 2 -38 C 0 -42 -10 -44 -22 -38 Z" fill="#15803d" />
            <path d="M -22 -38 C -15 -32 -2 -18 3 5 C 8 28 0 52 -15 65 C -12 48 -5 25 -3 5 C -1 -12 -12 -28 -22 -38 Z" fill="url(#chiliGrad)" />
            <path d="M -18 -32 C -11 -20 -1 5 1 22" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" fill="none" />
          </g>

          {/* Plump Orange Bell Pepper (Left mid-section) */}
          <g transform="translate(60, 315) rotate(-10)" filter="url(#shadow)">
            <path d="M 0 -18 C 3 -24 8 -24 8 -29" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M -15 -14 C -22 -14 -26 -2 -24 10 C -22 22 -10 26 -2 26 C 6 26 18 22 20 10 C 22 -2 18 -14 11 -14 C 7 -14 3 -8 -2 -8 C -7 -8 -11 -14 -15 -14 Z" fill="url(#pepperGrad)" />
            <path d="M -2 -8 C -2 5 -2 15 -2 26" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
            <ellipse cx="-13" cy="0" rx="3" ry="8" fill="#ffffff" opacity="0.38" transform="rotate(-15 -13 0)" />
          </g>

          {/* Wooden bowl containing Salt Crystals (Bottom center) */}
          <g transform="translate(340, 400)" filter="url(#shadow)">
            <circle cx="0" cy="0" r="28" fill="url(#woodBowl)" />
            <circle cx="0" cy="0" r="25" fill="#451a03" />
            <circle cx="0" cy="0" r="20" fill="#f8fafc" />
            <circle cx="0" cy="0" r="20" fill="url(#rareMeat)" opacity="0.1" />
            
            {/* Salt Crystals */}
            <g fill="#ffffff" opacity="0.95">
              <rect x="-12" y="-12" width="6" height="5" rx="1" />
              <rect x="2" y="-14" width="5" height="5" rx="0.8" transform="rotate(25 2 -14)" />
              <rect x="-10" y="2" width="5" height="4" rx="0.5" transform="rotate(-15 -10 2)" />
              <rect x="-2" y="-5" width="7" height="6" rx="1.5" transform="rotate(45 -2 -5)" />
              <rect x="5" y="-3" width="5" height="5" rx="0.5" transform="rotate(-35 5 -3)" />
              <rect x="-5" y="8" width="6" height="5" rx="1" transform="rotate(10 -5 8)" />
            </g>
          </g>

          {/* Wooden bowl containing Peppercorns (Top Left frame corner) */}
          <g transform="translate(160, 295)" filter="url(#shadow)">
            <circle cx="0" cy="0" r="22" fill="url(#woodBowl)" />
            <circle cx="0" cy="0" r="19" fill="#3c1e04" />
            <circle cx="0" cy="0" r="16" fill="#1c0a00" />
            <g>
              {/* Green, Black & Red Peppercorns */}
              <circle cx="-6" cy="-6" r="4" fill="#1c1917" />
              <circle cx="-7" cy="-7" r="1" fill="#ffffff" opacity="0.75" />

              <circle cx="4" cy="-8" r="3.5" fill="#292524" />
              <circle cx="3" cy="-9" r="0.8" fill="#a8a29e" opacity="0.65" />

              <circle cx="-10" cy="1" r="3.8" fill="#1c1917" />
              <circle cx="-2" cy="-1" r="4" fill="#dc2626" />
              <circle cx="-3" cy="-2" r="1" fill="#ffffff" opacity="0.85" />

              <circle cx="8" cy="-2" r="3.8" fill="#b91c1c" />
              <circle cx="-4" cy="7" r="3.5" fill="#15803d" />
              <circle cx="8" cy="5" r="3.4" fill="#166534" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
