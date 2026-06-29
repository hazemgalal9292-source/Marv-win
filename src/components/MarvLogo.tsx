import React from 'react';
import { Sparkles, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface MarvLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function MarvLogo({ className = '', size = 'md' }: MarvLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-44 h-44 text-8xl',
  };

  const ringSizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer Glowing Background Frame */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          borderColor: ['rgba(122,8,38,0.4)', 'rgba(255,255,255,0.8)', 'rgba(122,8,38,0.4)'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeClasses[size]} rounded-3xl bg-gradient-to-br from-[#5c0617] via-[#7a0826] to-[#a3153c] border-2 shadow-2xl flex items-center justify-center ${ringSizes[size]}`}
      >
        {/* Floating Money Elements background inside logo */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-30 pointer-events-none">
          <span className="absolute -top-1 -right-1 text-xs animate-bounce delay-100">💵</span>
          <span className="absolute bottom-2 left-1 text-xs animate-pulse delay-500">💰</span>
          <span className="absolute bottom-1 right-2 text-xs">💸</span>
          <span className="absolute top-4 left-2 text-xs animate-bounce delay-1000">💵</span>
        </div>

        {/* Shiny metal reflections */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-3xl" />

        {/* Core Letter M with bold design */}
        <span className="font-extrabold text-white tracking-tighter relative z-10 select-none flex items-center justify-center font-serif drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
          M
        </span>

        {/* Absolute Cash Badge */}
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-lg animate-pulse">
          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 font-black text-emerald-100" />
        </div>

        {/* Sparkle decorative element */}
        <div className="absolute -top-2 -left-2 text-amber-300 animate-spin" style={{ animationDuration: '6s' }}>
          <Sparkles className="w-5 h-5" />
        </div>
      </motion.div>
    </div>
  );
}
