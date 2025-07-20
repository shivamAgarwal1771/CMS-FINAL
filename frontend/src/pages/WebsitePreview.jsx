import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  Code, 
  Eye,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const WebsitePreview = () => {
  const { websiteId } = useParams()
  const [websiteData, setWebsiteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('desktop') // desktop, tablet, mobile

  useEffect(() => {
    fetchWebsiteData()
  }, [websiteId])

  const fetchWebsiteData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/website/${websiteId}`)
      setWebsiteData(response.data)
    } catch (error) {
      console.error('Error fetching website:', error)
      setError('Failed to load website')
      toast.error('Failed to load website')
    } finally {
      setLoading(false)
    }
  }

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-80 h-[600px]'
      case 'tablet':
        return 'w-96 h-[700px]'
      default:
        return 'w-full h-[800px]'
    }
  }

  const getViewportIcon = () => {
    switch (viewMode) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />
      case 'tablet':
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading website...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Generator</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <a
                  href={`/preview/${websiteId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full Screen</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Viewport Frame */}
          <div className={`${getViewportClass()} bg-white rounded-lg shadow-2xl border-8 border-secondary-200 overflow-hidden`}>
            {websiteData?.html ? (
              <iframe
                srcDoc={websiteData.html}
                className="w-full h-full border-0"
                title="Generated Website Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-secondary-500">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Website preview not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Website Info */}
          {websiteData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 card max-w-2xl"
            >
              <h3 className="text-xl font-semibold mb-4">Website Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-secondary-600">Website ID:</p>
                  <p className="font-mono text-secondary-800">{websiteId}</p>
                </div>
                <div>
                  <p className="text-secondary-600">Generated At:</p>
                  <p className="text-secondary-800">
                    {new Date(websiteData.generated_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-secondary-600">Status:</p>
                  <p className="text-secondary-800 capitalize">{websiteData.status}</p>
                </div>
                <div>
                  <p className="text-secondary-600">Files Generated:</p>
                  <p className="text-secondary-800">{websiteData.files_generated?.length || 0} files</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default WebsitePreview 