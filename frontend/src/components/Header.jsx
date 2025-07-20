import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Github, Twitter } from 'lucide-react'

const Header = () => {
  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-md border-b border-secondary-200 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Dynamic CMS
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
            <a 
              href="#features" 
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              About
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header 