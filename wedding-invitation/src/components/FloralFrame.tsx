"use client";

import React, { useEffect, useRef, memo } from "react";

interface FloralFrameProps {
  className?: string;
  isOpen?: boolean;
}

export default function FloralFrame({ className = "", isOpen = false }: FloralFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;
    let targetVelocity = 0;
    let currentVelocity = 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      const delta = newScrollY - lastScrollY;
      lastScrollY = newScrollY;
      targetVelocity = Math.max(-30, Math.min(30, delta));
    };

    // Single high-performance rAF loop — no React state updates
    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2); // normalize to ~60fps, cap at 2x
      lastTime = now;

      currentVelocity += (targetVelocity - currentVelocity) * 0.16 * dt;
      targetVelocity *= Math.pow(0.86, dt);

      const frame = frameRef.current;
      if (frame) {
        const currentY = window.scrollY;
        const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = currentY / docHeight;
        const clampedProgress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

        // Use sine approximation for ambient sway (cheaper than Date.now + Math.sin)
        const swayAngle = currentVelocity * 0.45 + Math.sin(now * 0.002) * 1.5;
        const frameFlex = Math.sin(currentY * 0.008) * 3 - Math.abs(currentVelocity) * 0.15;
        const shimmerPos = (clampedProgress * 100);

        // Batch all CSS custom property writes
        const style = frame.style;
        style.setProperty("--scroll-y", `${currentY}px`);
        style.setProperty("--scroll-progress", `${clampedProgress}`);
        style.setProperty("--sway-angle", `${swayAngle.toFixed(1)}deg`);
        style.setProperty("--sway-angle-neg", `${(-swayAngle).toFixed(1)}deg`);
        style.setProperty("--frame-flex", `${frameFlex.toFixed(1)}px`);
        style.setProperty("--shimmer-pos", `${shimmerPos.toFixed(0)}%`);
      }

      // Update petals parallax via direct DOM — zero re-renders
      if (petalsRef.current) {
        const pY = (window.scrollY * 0.05);
        petalsRef.current.style.transform = `translateY(${pY.toFixed(0)}px) translateZ(0)`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={`floral-frame-root ${isOpen ? "floral-frame-open" : ""} ${className}`}
      aria-hidden="true"
    >
      {/* ANIMATED PERIMETER BORDER FRAME */}
      <div className="floral-frame-container">
        <div className="floral-border-outer" />
        <div className="floral-border-inner" />
        <div className="floral-border-shimmer" />

        {/* Center Crests */}
        <div className="floral-crest floral-crest-top">
          <MemoFloralCrestSvg isTop={true} />
        </div>
        <div className="floral-crest floral-crest-bottom">
          <MemoFloralCrestSvg isTop={false} />
        </div>

        {/* 4 Corner Rosettes */}
        <div className="floral-rosette floral-rosette-tl"><MemoCornerRosetteSvg /></div>
        <div className="floral-rosette floral-rosette-tr"><MemoCornerRosetteSvg /></div>
        <div className="floral-rosette floral-rosette-bl"><MemoCornerRosetteSvg /></div>
        <div className="floral-rosette floral-rosette-br"><MemoCornerRosetteSvg /></div>
      </div>

      {/* CORNER BOTANICAL BOUQUETS */}
      <div className="floral-corner floral-top-left">
        <div className="floral-sway-inner floral-sway-tl">
          <MemoBotanicalCornerSvg position="top-left" />
        </div>
      </div>
      <div className="floral-corner floral-top-right">
        <div className="floral-sway-inner floral-sway-tr">
          <MemoBotanicalCornerSvg position="top-right" />
        </div>
      </div>
      <div className="floral-corner floral-bottom-left">
        <div className="floral-sway-inner floral-sway-bl">
          <MemoBotanicalCornerSvg position="bottom-left" />
        </div>
      </div>
      <div className="floral-corner floral-bottom-right">
        <div className="floral-sway-inner floral-sway-br">
          <MemoBotanicalCornerSvg position="bottom-right" />
        </div>
      </div>

      {/* SIDE VINES */}
      <div className="floral-side floral-side-left">
        <MemoSideVineSvg side="left" />
      </div>
      <div className="floral-side floral-side-right">
        <MemoSideVineSvg side="right" />
      </div>

      {/* FALLING LEAVES & PETALS */}
      <MemoFloatingPetals ref={petalsRef} />
    </div>
  );
}

/* ============================================================
   MEMOIZED SVG SUB-COMPONENTS — prevent re-renders on scroll
   ============================================================ */

const MemoFloralCrestSvg = memo(function FloralCrestSvg({ isTop }: { isTop: boolean }) {
  const suffix = isTop ? "t" : "b";
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="floral-crest-svg"
      style={{ transform: isTop ? "none" : "scaleY(-1)" }}
    >
      <defs>
        <linearGradient id={`crestGrad-${suffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#805b45" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#dfbe99" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#6e4a35" stopOpacity="1" />
          <stop offset="75%" stopColor="#dfbe99" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#805b45" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`crestLeafGrad-${suffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8f7e6d" />
          <stop offset="50%" stopColor="#55493b" />
          <stop offset="100%" stopColor="#322a21" />
        </linearGradient>
      </defs>

      <g stroke={`url(#crestGrad-${suffix})`} strokeWidth="1.3" strokeLinecap="round">
        <path d="M 80 20 C 65 18 50 12 35 15 C 22 18 12 25 2 24" />
        <path d="M 52 14 C 45 6 36 8 32 16" />
        <path d="M 35 15 C 28 8 20 12 18 20" />
        <path d="M 22 18 C 15 14 8 18 6 23" />
        <path d="M 80 20 C 95 18 110 12 125 15 C 138 18 148 25 158 24" />
        <path d="M 108 14 C 115 6 124 8 128 16" />
        <path d="M 125 15 C 132 8 140 12 142 20" />
        <path d="M 138 18 C 145 14 152 18 154 23" />
      </g>

      <g fill={`url(#crestLeafGrad-${suffix})`} stroke="#241e17" strokeWidth="0.8">
        <path d="M 48 13 C 40 7 35 11 38 18 C 44 19 48 16 48 13 Z" />
        <path d="M 28 15 C 22 10 17 14 20 20 C 25 21 28 18 28 15 Z" />
        <path d="M 112 13 C 120 7 125 11 122 18 C 116 19 112 16 112 13 Z" />
        <path d="M 132 15 C 138 10 143 14 140 20 C 135 21 132 18 132 15 Z" />
      </g>

      <circle cx="80" cy="20" r="10" fill="#fffaf5" stroke="#7a553f" strokeWidth="1.3" />
      <circle cx="80" cy="20" r="6.5" fill="#f5ebe1" stroke="#5a3d2c" strokeWidth="1.1" />
      <path
        d="M 77 18 C 79 15 83 16 84 19 C 85 22 81 24 78 23 C 76 21 78 19 80 20"
        fill="none" stroke="#7a553f" strokeWidth="1.3" strokeLinecap="round"
      />
      <circle cx="68" cy="20" r="2.4" fill="#dfbe99" stroke="#7a553f" strokeWidth="0.6" />
      <circle cx="92" cy="20" r="2.4" fill="#dfbe99" stroke="#7a553f" strokeWidth="0.6" />
    </svg>
  );
});

const MemoCornerRosetteSvg = memo(function CornerRosetteSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="floral-rosette-svg">
      <circle cx="12" cy="12" r="9" stroke="#805b45" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.85" />
      <circle cx="12" cy="12" r="5" fill="#fffaf5" stroke="#5a3d2c" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="#805b45" />
      <path d="M 12 3 L 12 21 M 3 12 L 21 12" stroke="#805b45" strokeWidth="0.9" opacity="0.75" />
    </svg>
  );
});

const MemoBotanicalCornerSvg = memo(function BotanicalCornerSvg({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="floral-corner-svg"
      style={{
        transform: `${isLeft ? "" : "scaleX(-1)"} ${isTop ? "" : "scaleY(-1)"}`,
      }}
    >
      <defs>
        <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dfbe99" />
          <stop offset="50%" stopColor="#a37d63" />
          <stop offset="100%" stopColor="#6e4a35" />
        </linearGradient>
        <linearGradient id={`petalGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="60%" stopColor="#f7ede4" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e5d0be" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id={`leafGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8d7d6b" />
          <stop offset="45%" stopColor="#55493b" />
          <stop offset="100%" stopColor="#2e251c" />
        </linearGradient>
        <radialGradient id={`glowGrad-${position}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#edd8c4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#edd8c4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill={`url(#glowGrad-${position})`} />

      <g stroke={`url(#goldGrad-${position})`} strokeWidth="1.3" strokeLinecap="round" opacity="0.9">
        <path d="M 12 110 L 12 28 C 12 19 19 12 28 12 L 110 12" />
        <path d="M 18 100 L 18 32 C 18 24 24 18 32 18 L 100 18" strokeDasharray="3 3" />
        <circle cx="12" cy="115" r="2.4" fill="#6e4a35" />
        <circle cx="115" cy="12" r="2.4" fill="#6e4a35" />
        <circle cx="28" cy="28" r="2" fill="#6e4a35" />
      </g>

      <g stroke="#7a553f" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
        <path d="M 28 28 C 65 42 110 70 145 125 C 160 150 178 190 195 210" fill="none" />
        <path d="M 65 42 C 95 38 140 50 175 78 C 195 95 215 130 220 155" fill="none" />
        <path d="M 145 125 C 165 110 172 85 160 70 C 150 58 135 72 145 88" fill="none" strokeWidth="0.9" />
        <path d="M 175 78 C 195 70 205 50 195 38 C 185 28 170 42 180 55" fill="none" strokeWidth="0.9" />
      </g>

      <g fill={`url(#leafGrad-${position})`} stroke="#231c15" strokeWidth="0.85">
        <path d="M 70 45 C 85 30 110 32 115 48 C 105 60 82 58 70 45 Z" />
        <path d="M 105 38 C 125 22 150 25 152 42 C 140 52 118 50 105 38 Z" />
        <path d="M 138 52 C 160 40 182 48 180 65 C 165 72 148 65 138 52 Z" />
        <path d="M 45 70 C 30 85 32 110 48 115 C 60 105 58 82 45 70 Z" />
        <path d="M 38 105 C 22 125 25 150 42 152 C 52 140 50 118 38 105 Z" />
        <path d="M 52 138 C 40 160 48 182 65 180 C 72 165 65 148 52 138 Z" />
        <path d="M 120 95 C 140 90 155 105 150 120 C 135 122 122 110 120 95 Z" />
        <path d="M 95 120 C 90 140 105 155 120 150 C 122 135 110 122 95 120 Z" />
        <path d="M 160 140 C 180 142 190 160 182 172 C 168 170 160 155 160 140 Z" />
      </g>

      <g stroke="#dfbe99" strokeWidth="0.6" strokeLinecap="round" opacity="0.65">
        <path d="M 75 48 C 90 40 105 42 112 47" />
        <path d="M 110 37 C 125 28 140 30 148 39" />
        <path d="M 48 75 C 40 90 42 105 47 112" />
        <path d="M 37 110 C 28 125 30 140 39 148" />
      </g>

      <g fill="#9e7354" stroke="#483323" strokeWidth="0.6">
        <circle cx="165" cy="62" r="3.4" />
        <circle cx="178" cy="52" r="2.6" />
        <circle cx="152" cy="74" r="3" />
        <circle cx="62" cy="165" r="3.4" />
        <circle cx="52" cy="178" r="2.6" />
        <circle cx="74" cy="152" r="3" />
        <circle cx="190" cy="115" r="2.8" />
        <circle cx="115" cy="190" r="2.8" />
      </g>

      <g className="floral-rose-head" transform="translate(48, 48)">
        <path
          d="M -15 -35 C 0 -45 25 -42 35 -25 C 45 -5 35 25 15 35 C -5 45 -35 32 -38 10 C -42 -10 -25 -25 -15 -35 Z"
          fill={`url(#petalGrad-${position})`}
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="1.3"
        />
        <path
          d="M -22 -18 C -12 -32 18 -32 26 -16 C 35 0 24 24 6 28 C -12 30 -28 15 -28 -2 Z"
          fill={`url(#petalGrad-${position})`}
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="1.2"
        />
        <path
          d="M -14 -12 C -6 -22 14 -20 20 -8 C 24 4 15 18 2 20 C -10 20 -20 8 -18 -4 Z"
          fill="#fcf7f1" stroke="#7a553f" strokeWidth="1.1"
        />
        <path
          d="M -5 -6 C 0 -12 10 -10 12 -4 C 14 4 7 10 0 11 C -6 11 -10 5 -8 0 C -6 -4 2 -6 6 -2"
          fill="none" stroke="#5a3d2c" strokeWidth="1.5" strokeLinecap="round"
        />
        <circle cx="-1" cy="2" r="1.6" fill="#805b45" />
        <circle cx="4" cy="-2" r="1.3" fill="#dfbe99" />
        <circle cx="2" cy="5" r="1.1" fill="#dfbe99" />
      </g>

      <g transform="translate(112, 68) scale(0.65)">
        <path
          d="M -15 -25 C -5 -35 20 -30 25 -15 C 30 2 18 22 2 24 C -12 25 -24 10 -22 -5 Z"
          fill={`url(#petalGrad-${position})`}
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="1.3"
        />
        <path
          d="M -6 -12 C 0 -18 12 -16 14 -8 C 16 2 9 10 2 11 C -5 11 -10 4 -8 0"
          fill="none" stroke="#5a3d2c" strokeWidth="1.4" strokeLinecap="round"
        />
      </g>

      <g transform="translate(68, 112) scale(0.65)">
        <path
          d="M -25 -15 C -35 -5 -30 20 -15 25 C 2 30 22 18 24 2 C 25 -12 10 -24 -5 -22 Z"
          fill={`url(#petalGrad-${position})`}
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="1.3"
        />
        <path
          d="M -12 -6 C -18 0 -16 12 -8 14 C 2 16 10 9 11 2 C 11 -5 4 -10 0 -8"
          fill="none" stroke="#5a3d2c" strokeWidth="1.4" strokeLinecap="round"
        />
      </g>
    </svg>
  );
});

const MemoSideVineSvg = memo(function SideVineSvg({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <svg
      viewBox="0 0 45 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="floral-side-svg"
      style={{ transform: isLeft ? "none" : "scaleX(-1)" }}
    >
      <defs>
        <linearGradient id={`sideGrad-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a553f" stopOpacity="0.1" />
          <stop offset="25%" stopColor="#7a553f" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#55493b" stopOpacity="1" />
          <stop offset="75%" stopColor="#7a553f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7a553f" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`sideLeafGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8d7d6b" />
          <stop offset="50%" stopColor="#55493b" />
          <stop offset="100%" stopColor="#2e251c" />
        </linearGradient>
      </defs>

      <path
        d="M 12 0 C 24 60 5 120 20 180 C 35 240 10 320 22 420"
        stroke={`url(#sideGrad-${side})`}
        strokeWidth="1.3" strokeLinecap="round"
      />

      <g fill={`url(#sideLeafGrad-${side})`} stroke="#231c15" strokeWidth="0.8">
        <path d="M 15 50 C 28 42 36 50 32 62 C 24 65 17 58 15 50 Z" />
        <path d="M 10 110 C 2 98 -4 105 2 118 C 8 122 12 118 10 110 Z" />
        <path d="M 18 165 C 32 155 40 162 36 175 C 27 180 20 172 18 165 Z" />
        <path d="M 22 230 C 10 220 5 228 11 240 C 18 245 23 238 22 230 Z" />
        <path d="M 16 300 C 30 292 38 300 34 312 C 25 316 18 308 16 300 Z" />
        <path d="M 18 365 C 8 355 4 362 10 374 C 16 378 20 372 18 365 Z" />
      </g>

      <circle cx="34" cy="64" r="2.4" fill="#805b45" />
      <circle cx="3" cy="120" r="2.2" fill="#dfbe99" />
      <circle cx="38" cy="176" r="2.4" fill="#805b45" />
      <circle cx="10" cy="242" r="2.2" fill="#dfbe99" />
      <circle cx="36" cy="314" r="2.4" fill="#805b45" />
    </svg>
  );
});

/* ============================================================
   FALLING PETALS — Pure CSS animation, zero scroll re-renders
   ============================================================ */

const FALLING_ITEMS = [
  { id: 1, type: "leaf" as const, left: "8%", size: 16, duration: 12, delay: -3 },
  { id: 2, type: "petal" as const, left: "22%", size: 14, duration: 10, delay: -7 },
  { id: 3, type: "leaf" as const, left: "38%", size: 17, duration: 14, delay: -1.5 },
  { id: 4, type: "petal" as const, left: "52%", size: 15, duration: 11, delay: -5 },
  { id: 5, type: "leaf" as const, left: "68%", size: 16, duration: 13, delay: -9 },
  { id: 6, type: "petal" as const, left: "82%", size: 14, duration: 10.5, delay: -2 },
  { id: 7, type: "leaf" as const, left: "92%", size: 15, duration: 15, delay: -6 },
] as const;

const MemoFloatingPetals = memo(
  React.forwardRef<HTMLDivElement>(function FloatingPetals(_props, ref) {
    return (
      <div ref={ref} className="floral-petals-container">
        {FALLING_ITEMS.map((item) => {
          const isLeaf = item.type === "leaf";
          const isAlt = item.id % 2 === 0;

          return (
            <div
              key={item.id}
              className={`continuous-falling-item ${isAlt ? "fall-alt" : "fall-std"}`}
              style={{
                left: item.left,
                width: `${item.size}px`,
                height: `${item.size * 1.35}px`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {isLeaf ? <MemoLeafSvg /> : <MemoPetalSvg />}
            </div>
          );
        })}
      </div>
    );
  })
);

/* Simplified SVGs — flat colors instead of per-element gradients for GPU efficiency */
const MemoLeafSvg = memo(function LeafSvg() {
  return (
    <svg viewBox="0 0 24 32" fill="none" className="floral-falling-svg">
      <path
        d="M 12 2 C 20 7 22 17 19 24 C 16 30 11 31 9 31 C 4 31 2 24 3 17 C 4 9 8 3 12 2 Z"
        fill="#55493b" stroke="#231c15" strokeWidth="0.85"
      />
      <path d="M 12 4 C 11 12 11 22 9 29" stroke="#dfbe99" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
});

const MemoPetalSvg = memo(function PetalSvg() {
  return (
    <svg viewBox="0 0 24 32" fill="none" className="floral-falling-svg">
      <path
        d="M 12 2 C 19 6 23 15 21 23 C 19 29 14 31 11 31 C 6 31 2 26 2 20 C 2 12 7 4 12 2 Z"
        fill="#f5ebe1" stroke="#7a553f" strokeWidth="0.6" opacity="0.85"
      />
      <path d="M 12 5 C 13 12 13 22 11 28" stroke="#c79c78" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
});

