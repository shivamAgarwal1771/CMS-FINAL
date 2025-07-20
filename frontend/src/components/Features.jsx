import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Palette, 
  Smartphone, 
  Code, 
  Globe, 
  Shield,
  Sparkles,
  Clock
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate complete websites in seconds with our optimized AI pipeline and caching system.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Design",
      description: "AI-generated designs that are modern, responsive, and follow current design trends.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "All generated websites are fully responsive and optimized for all devices.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Generate production-ready React components with semantic HTML and optimized CSS.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SEO Ready",
      description: "Built-in SEO optimization with proper meta tags, semantic structure, and performance.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with input validation and secure code generation.",
      color: "from-red-500 to-pink-500"
    }
  ]

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-secondary-800">
            Why Choose Dynamic CMS?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with user-friendly design 
            to deliver exceptional website generation experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-secondary-800">
                {feature.title}
              </h3>
              
              <p className="text-secondary-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div className="card">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              10s
            </div>
            <p className="text-secondary-600">Average Generation Time</p>
          </div>
          
          <div className="card">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              <Palette className="w-8 h-8 mx-auto mb-2" />
              50+
            </div>
            <p className="text-secondary-600">Component Templates</p>
          </div>
          
          <div className="card">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              <Smartphone className="w-8 h-8 mx-auto mb-2" />
              100%
            </div>
            <p className="text-secondary-600">Mobile Responsive</p>
          </div>
          
          <div className="card">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              24/7
            </div>
            <p className="text-secondary-600">Available</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features 