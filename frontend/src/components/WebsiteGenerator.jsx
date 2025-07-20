import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Loader2, Settings, Palette, Layout } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const WebsiteGenerator = ({ onWebsiteGenerated, isGenerating, setIsGenerating }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    style_preference: 'modern',
    color_scheme: 'blue',
    layout_type: 'responsive'
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.prompt.trim()) {
      toast.error('Please enter a prompt to generate a website')
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await axios.post('/api/generate-website', formData)
      
      if (response.data.website_id) {
        onWebsiteGenerated(response.data.website_id)
      } else {
        toast.error('Failed to generate website')
      }
    } catch (error) {
      console.error('Error generating website:', error)
      toast.error(error.response?.data?.detail || 'Failed to generate website')
    } finally {
      setIsGenerating(false)
    }
  }

  const examplePrompts = [
    "Create a modern restaurant website with menu, contact form, and beautiful food photography",
    "Build a portfolio website for a graphic designer with project showcase and testimonials",
    "Generate an e-commerce site for handmade jewelry with product gallery and shopping cart",
    "Design a tech startup landing page with features, pricing, and contact information"
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Prompt Input */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-secondary-700 mb-2">
              Describe your website
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleInputChange}
              placeholder="Describe the website you want to create... (e.g., 'A modern restaurant website with menu, contact form, and beautiful food photography')"
              className="input-field h-32 resize-none"
              required
            />
          </div>

          {/* Example Prompts */}
          <div>
            <p className="text-sm text-secondary-600 mb-2">Try these examples:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, prompt }))}
                  className="text-left p-3 text-sm bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200 text-secondary-700"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Advanced Options</span>
            </button>
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary-50 rounded-lg"
            >
              {/* Style Preference */}
              <div>
                <label htmlFor="style_preference" className="block text-sm font-medium text-secondary-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Style
                </label>
                <select
                  id="style_preference"
                  name="style_preference"
                  value={formData.style_preference}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="classic">Classic</option>
                  <option value="bold">Bold</option>
                  <option value="elegant">Elegant</option>
                </select>
              </div>

              {/* Color Scheme */}
              <div>
                <label htmlFor="color_scheme" className="block text-sm font-medium text-secondary-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Color Scheme
                </label>
                <select
                  id="color_scheme"
                  name="color_scheme"
                  value={formData.color_scheme}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="red">Red</option>
                  <option value="gray">Gray</option>
                </select>
              </div>

              {/* Layout Type */}
              <div>
                <label htmlFor="layout_type" className="block text-sm font-medium text-secondary-700 mb-2">
                  <Layout className="w-4 h-4 inline mr-1" />
                  Layout
                </label>
                <select
                  id="layout_type"
                  name="layout_type"
                  value={formData.layout_type}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="responsive">Responsive</option>
                  <option value="fixed">Fixed Width</option>
                  <option value="fluid">Fluid</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isGenerating || !formData.prompt.trim()}
              className="btn-primary flex items-center space-x-2 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Website...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Website</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default WebsiteGenerator 