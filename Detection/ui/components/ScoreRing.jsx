'use client';

import { motion } from 'framer-motion';

export default function ScoreRing({ score = 0, isFake = false }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color = isFake ? '#ff8c9c' : '#74e3d2';

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background track */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="6"
          fill="transparent"
        />
        {/* Animated score ring */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      {/* Percentage Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          className="text-xl font-bold font-mono tracking-tighter"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {score}%
        </motion.span>
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Risk</span>
      </div>
    </div>
  );
}
