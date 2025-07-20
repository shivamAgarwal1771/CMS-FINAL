import React from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Database, 
  Code, 
  Globe,
  Zap,
  Shield
} from 'lucide-react'

const About = () => {
  const technologies = [
    {
      icon: <Cpu className="w-6 h-6" />,
      name: "AI/ML",
      description: "OpenAI GPT-4 for intelligent prompt processing and JSON generation",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      name: "Backend",
      description: "FastAPI with Redis caching for high-performance API responses",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-6 h-6" />,
      name: "Frontend",
      description: "React with Vite for lightning-fast development and building",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      name: "Styling",
      description: "Tailwind CSS for responsive, utility-first styling system",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      name: "Performance",
      description: "Optimized build process with tree-shaking and lazy loading",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      name: "Security",
      description: "Input validation, CORS protection, and secure code generation",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section id="about" className="py-20 px-4 bg-secondary-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-secondary-800">
            Built with Modern Technology
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our platform leverages cutting-edge technologies to deliver fast, reliable, 
            and scalable website generation capabilities.
          </p>
        </motion.div>

        {/* Technology Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mb-4`}>
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-secondary-800">
                {tech.name}
              </h3>
              <p className="text-secondary-600 text-sm">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="card max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-secondary-800">
            Architecture Overview
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary-600">
                  AI/JSON Layer
                </h4>
                <ul className="space-y-2 text-sm text-secondary-600">
                  <li>• Python + FastAPI for API endpoints</li>
                  <li>• OpenAI GPT-4 for prompt processing</li>
                  <li>• HuggingFace Transformers for local AI</li>
                  <li>• Structured JSON schema generation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary-600">
                  Frontend Layer
                </h4>
                <ul className="space-y-2 text-sm text-secondary-600">
                  <li>• React + Vite for fast development</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Component library system</li>
                  <li>• Responsive design patterns</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary-600">
                  Backend Layer
                </h4>
                <ul className="space-y-2 text-sm text-secondary-600">
                  <li>• Node.js (Express) for server</li>
                  <li>• Firebase for user data</li>
                  <li>• API integrations</li>
                  <li>• Real-time updates</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-primary-600">
                  Optimization Layer
                </h4>
                <ul className="space-y-2 text-sm text-secondary-600">
                  <li>• Redis caching system</li>
                  <li>• Tree-shaking with esbuild</li>
                  <li>• Lazy loading components</li>
                  <li>• CDN optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-secondary-800">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">User Prompt</h4>
              <p className="text-sm text-secondary-600">
                Enter a natural language description of your desired website
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">AI Processing</h4>
              <p className="text-sm text-secondary-600">
                AI converts prompt into structured JSON schema
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Component Generation</h4>
              <p className="text-sm text-secondary-600">
                React components generated from JSON schema
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold mb-2">Website Ready</h4>
              <p className="text-sm text-secondary-600">
                Complete, responsive website ready for deployment
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 