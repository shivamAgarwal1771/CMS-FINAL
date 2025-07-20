import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import WebsitePreview from './pages/WebsitePreview'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preview/:websiteId" element={<WebsitePreview />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App 