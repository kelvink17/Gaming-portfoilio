'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Mission {
  id: number
  name: string
  description: string
  tags: string[]
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'INSANE'
  link: string
  status: 'COMPLETE' | 'ACTIVE' | 'UPCOMING'
}

const ProjectsMission: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<number | null>(null)

  const missions: Mission[] = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce platform with real-time inventory management and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      difficulty: 'HARD',
      link: '#',
      status: 'COMPLETE',
    },
    {
      id: 2,
      name: 'Real-Time Chat App',
      description: 'WebSocket-powered chat application with user authentication and message persistence.',
      tags: ['React', 'Express', 'Socket.io', 'MongoDB'],
      difficulty: 'MEDIUM',
      link: '#',
      status: 'COMPLETE',
    },
    {
      id: 3,
      name: 'Video Upload Platform',
      description: 'Multer-integrated video upload system with compression and adaptive streaming.',
      tags: ['Multer', 'FFmpeg', 'React', 'Node.js'],
      difficulty: 'INSANE',
      link: '#',
      status: 'COMPLETE',
    },
    {
      id: 4,
      name: 'Football Analytics Dashboard',
      description: 'Interactive sports analytics dashboard with real-time data visualization.',
      tags: ['React', 'D3.js', 'Express', 'MongoDB'],
      difficulty: 'HARD',
      link: '#',
      status: 'ACTIVE',
    },
    {
      id: 5,
      name: 'AI-Powered Content Generator',
      description: 'Machine learning integration for automated content creation and optimization.',
      tags: ['Python', 'TensorFlow', 'React', 'Node.js'],
      difficulty: 'INSANE',
      link: '#',
      status: 'UPCOMING',
    },
    {
      id: 6,
      name: 'WebGL Game Engine',
      description: 'Custom game engine built with Three.js and GLSL shaders for high-performance gaming.',
      tags: ['Three.js', 'WebGL', 'React', 'Vite'],
      difficulty: 'INSANE',
      link: '#',
      status: 'UPCOMING',
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'text-neon-green border-neon-green'
      case 'MEDIUM':
        return 'text-neon-cyan border-neon-cyan'
      case 'HARD':
        return 'text-neon-purple border-neon-purple'
      case 'INSANE':
        return 'text-neon-pink border-neon-pink'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETE':
        return 'bg-neon-green/20 text-neon-green'
      case 'ACTIVE':
        return 'bg-neon-cyan/20 text-neon-cyan'
      case 'UPCOMING':
        return 'bg-neon-purple/20 text-neon-purple'
      default:
        return 'bg-gray-600/20'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text
          bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink mb-4">
          MISSION SELECT
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          [ SELECT A MISSION TO COMMENCE OPERATION ]
        </p>
      </motion.div>

      {/* Missions Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            variants={itemVariants}
            onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
            className="group cursor-pointer"
          >
            <motion.div
              className="glass-effect rounded-lg p-6 border-2 border-transparent
                transition-all duration-300 h-full flex flex-col"
              whileHover={{
                borderColor: '#00d4ff',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
              }}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex-1">{mission.name}</h3>
                  <motion.span
                    className={`px-3 py-1 rounded text-xs font-mono font-bold ${getStatusColor(mission.status)}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    {mission.status}
                  </motion.span>
                </div>

                {/* Difficulty */}
                <div className={`inline-block px-3 py-1 rounded border text-xs font-bold font-mono ${getDifficultyColor(mission.difficulty)}`}>
                  {mission.difficulty}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 flex-1">
                {mission.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                className="w-full py-2 px-4 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan
                  rounded font-mono text-sm font-bold uppercase tracking-wider
                  hover:bg-neon-cyan hover:text-dark transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {mission.status === 'UPCOMING' ? 'COMING SOON' : 'VIEW MISSION'}
              </motion.button>

              {/* Expanded Details */}
              <motion.div
                className="mt-4 pt-4 border-t border-neon-cyan/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: selectedMission === mission.id ? 1 : 0,
                  height: selectedMission === mission.id ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-gray-400 font-mono">
                  {'[ MISSION_ID: ' + mission.id + ' | STATUS: ' + mission.status + ' ]'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="mt-12 grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {[
          { label: 'Completed', value: '3/6' },
          { label: 'In Progress', value: '1' },
          { label: 'Success Rate', value: '100%' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-effect rounded-lg p-4 text-center border border-neon-cyan/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-xs font-mono">{stat.label}</p>
            <p className="text-2xl font-bold text-neon-cyan mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProjectsMission
