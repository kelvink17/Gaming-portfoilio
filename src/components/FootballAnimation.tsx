'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface FootballAnimationProps {
  onGoal?: () => void
}

const FootballAnimation: React.FC<FootballAnimationProps> = ({ onGoal }) => {
  const [hasScored, setHasScored] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleGoal = () => {
    if (!hasScored) {
      setHasScored(true)
      onGoal?.()
      setTimeout(() => setHasScored(false), 3000)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 bg-gradient-to-b from-dark-secondary to-dark rounded-lg overflow-hidden
        border-2 border-neon-cyan/30 cursor-pointer group"
      onClick={handleGoal}
    >
      {/* Field Background */}
      <div className="absolute inset-0">
        {/* Field */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-green-950/30"></div>

        {/* Field Lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#00d4ff" strokeWidth="2" opacity="0.3" />
          <circle cx="50%" cy="50%" r="20%" stroke="#00d4ff" strokeWidth="2" fill="none" opacity="0.3" />
          <circle cx="50%" cy="50%" r="3%" fill="#00d4ff" opacity="0.5" />
        </svg>
      </div>

      {/* Goal Posts */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-32 border-4 border-neon-purple/50 rounded-lg"></div>

      {/* Player */}
      <motion.div
        className="absolute bottom-8 left-8 text-6xl"
        animate={{
          x: hasScored ? 300 : 0,
          rotate: hasScored ? 360 : 0,
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        ⚽
      </motion.div>

      {/* Ball Trajectory */}
      {hasScored && (
        <>
          <motion.div
            className="absolute bottom-20 left-24 text-4xl"
            animate={{
              x: 300,
              y: -100,
              opacity: 0,
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            ⚽
          </motion.div>

          {/* Goal Celebration */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center">
              <motion.h3
                className="text-4xl font-bold text-neon-green mb-4 font-mono"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                GOAL!!!
              </motion.h3>
              <motion.p
                className="text-neon-cyan text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Skills Unlocked
              </motion.p>
            </div>
          </motion.div>

          {/* Confetti */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                background: ['#00d4ff', '#b026ff', '#ff006e', '#39ff14'][i % 4],
              }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200 - 100,
                opacity: 0,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-neon-cyan/0 to-neon-cyan/10 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 flex items-center justify-center"
      >
        <p className="text-white font-mono text-sm text-center">[ CLICK TO SCORE ]</p>
      </motion.div>
    </div>
  )
}

export default FootballAnimation
