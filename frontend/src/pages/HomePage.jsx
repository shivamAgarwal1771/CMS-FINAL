import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { 
  Sparkles, 
  Zap, 
  Globe, 
  Code, 
  Palette, 
  Smartphone,
  ArrowRight,
  Loader2
} from 'lucide-react'
import WebsiteGenerator from '../components/WebsiteGenerator'
import Features from '../components/Features'
import About from '../components/About'

const HomePage = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const navigate = useNavigate()

  const handleWebsiteGenerated = (websiteId) => {
    toast.success('Website generated successfully!')
    navigate(`/preview/${websiteId}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Generate Websites
              <br />
              <span className="text-secondary-800">with AI Prompts</span>
            </h1>
            
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Create beautiful, responsive websites instantly using natural language prompts. 
              Our AI-powered CMS generates complete websites with modern design and functionality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center space-x-2 text-secondary-600">
                <Zap className="w-5 h-5" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary-600">
                <Globe className="w-5 h-5" />
                <span>Responsive Design</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary-600">
                <Code className="w-5 h-5" />
                <span>Clean Code</span>
              </div>
            </div>
          </motion.div>

          {/* Website Generator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WebsiteGenerator 
              onWebsiteGenerated={handleWebsiteGenerated}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <About />
    </div>
  )
}

export default HomePage 