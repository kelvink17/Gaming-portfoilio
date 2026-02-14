'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SkillsSection from './SkillsSection'
import ProjectsMission from './ProjectsMission'
import ContactPage from './ContactPage'

type PageType = 'skills' | 'projects' | 'contact'

interface DashboardProps {
  transitionComplete: boolean
}

const Dashboard: React.FC<DashboardProps> = ({ transitionComplete }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('skills')

  const menuItems = [
    { id: 'skills', label: 'Skills & Stack', icon: '⚡' },
    { id: 'projects', label: 'Mission Select', icon: '🎮' },
    { id: 'contact', label: 'Protocol', icon: '📡' },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'skills':
        return <SkillsSection />
      case 'projects':
        return <ProjectsMission />
      case 'contact':
        return <ContactPage />
      default:
        return <SkillsSection />
    }
  }

  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="w-full h-screen bg-dark text-white overflow-hidden flex flex-col">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/20"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <motion.div
        className="fixed left-0 top-0 h-full w-full md:w-64 bg-dark-secondary border-r border-neon-cyan/20 z-40 
          flex flex-col p-6 gap-8 md:gap-12 overflow-y-auto"
        initial={{ x: -400 }}
        animate={transitionComplete && (sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) ? { x: 0 } : { x: -400 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-2xl font-bold font-mono text-neon-cyan">NEXUS</h2>
          <p className="text-xs text-gray-500 mt-1">v1.0.0</p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4 flex-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id as PageType)
                setSidebarOpen(false)
              }}
              className={`relative px-4 py-3 text-left font-mono text-sm uppercase tracking-wider transition-all duration-300 
                ${currentPage === item.id ? 'text-neon-cyan' : 'text-gray-400 hover:text-neon-cyan'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={transitionComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ x: 10 }}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
              {currentPage === item.id && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-neon-cyan"
                  layoutId="indicator"
                  transition={{ type: 'spring', bounce: 0.2 }}
                ></motion.div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="text-xs text-gray-600 text-center">
          <p>[ NEURAL LINK ACTIVE ]</p>
          <p className="mt-2">© 2024 - All Systems Go</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="w-full h-full md:ml-64 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={transitionComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-6 md:p-12 min-h-screen">
          {renderPage()}
        </div>
      </motion.div>

      {/* Scan Lines */}
      <div className="fixed inset-0 pointer-events-none z-20 scan-lines opacity-5"></div>

      {/* Status Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-10 bg-dark-secondary/80 border-t border-neon-cyan/20
          flex items-center justify-between px-6 text-xs font-mono text-gray-500 z-30"
        initial={{ y: 100 }}
        animate={transitionComplete ? { y: 0 } : { y: 100 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
            SYSTEM ONLINE
          </span>
        </div>
        <span>CPU: 24% | RAM: 42%</span>
      </motion.div>
    </div>
  )
}

export default Dashboard
