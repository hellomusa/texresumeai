import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Upload, Edit, Briefcase, Zap, Star, Download, ArrowRight, Wand2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const features = [
    {
      icon: <Zap className="h-12 w-12 text-primary-500" />,
      title: 'Zero LaTeX Knowledge Required',
      description: 'Our intelligent system handles all the complex LaTeX formatting, so you don\'t have to.',
    },
    {
      icon: <Star className="h-12 w-12 text-secondary-500" />,
      title: 'FAANG-Approved Templates',
      description: 'Stand out with designs that have landed jobs at Google, Apple, and other tech giants.',
    },
    {
      icon: <Upload className="h-12 w-12 text-primary-500" />,
      title: 'AI-Powered Transformation',
      description: 'Upload your existing resume and watch our AI transform it into a LaTeX masterpiece.',
    },
    {
      icon: <Edit className="h-12 w-12 text-secondary-500" />,
      title: 'Guided Resume Creation',
      description: 'Craft a winning resume from scratch with our step-by-step AI assistant.',
    },
    {
      icon: <Download className="h-12 w-12 text-primary-500" />,
      title: 'Instant Professional PDF',
      description: 'Download your polished LaTeX resume as a recruiter-ready PDF with one click.',
    },
    {
      icon: <Briefcase className="h-12 w-12 text-secondary-500" />,
      title: 'Career Acceleration',
      description: 'Boost your chances of landing interviews and offers at top companies.',
    },
  ]

  const steps = [
    {
      number: 1,
      title: "Choose Your Path",
      description: "Upload your existing resume or start fresh with AI guidance.",
      icon: <Upload className="w-8 h-8" />,
      points: [
        "Seamless upload process",
        "AI-powered content analysis",
        "Customizable starting points"
      ]
    },
    {
      number: 2,
      title: "LaTeX Magic",
      description: "Watch as we transform your content into a FAANG-worthy LaTeX resume.",
      icon: <Wand2 className="w-8 h-8" />,
      points: [
        "Automatic formatting",
        "Industry-specific optimizations",
        "Real-time preview and editing"
      ]
    },
    {
      number: 3,
      title: "Land Your Dream Job",
      description: "Download your polished PDF and start acing those interviews.",
      icon: <Briefcase className="w-8 h-8" />,
      points: [
        "ATS-friendly output",
        "Multiple file formats",
        "Interview preparation tips"
      ]
    }
  ]

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Software Engineer at Google',
      quote: 'This tool transformed my resume and landed me interviews at multiple FAANG companies. It\'s a game-changer!',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      name: 'Michael C.',
      role: 'Data Scientist at Amazon',
      quote: 'As a recent grad, the AI guidance was invaluable. It helped me create a resume that got me hired at Amazon!',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      name: 'Emily R.',
      role: 'Product Manager at Apple',
      quote: 'The FAANG-approved templates are incredible. I switched to one and immediately started getting calls from top tech firms.',
      image: '/placeholder.svg?height=80&width=80',
    },
  ]

  
  const companies = [
    { name: 'Google', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Apple', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Amazon', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Microsoft', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Facebook', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Uber', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Datadog', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Pinterest', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Shopify', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Netflix', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Adobe', logo: '/placeholder.svg?height=24&width=80' },
    { name: 'Twitter', logo: '/placeholder.svg?height=24&width=80' },
  ]

  return (
    <div className="py-20">
      <section className="text-center mb-20 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary-100 rounded-full filter blur-3xl opacity-50 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-primary-800 mb-6 font-display leading-tight">
            Land Your <span className="text-secondary-500">Dream Job</span> with <br />
            <span className="relative">
              LaTeX Resumes
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17C37.6667 6.33333 146.4 -8 355 17" stroke="#FFA500" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-primary-500"> Made Easy</span>
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-600 mb-8 font-serif max-w-3xl mx-auto">
            Create stunning, FAANG-approved LaTeX resumes in minutes. No coding skills required. 
            Boost your career prospects with AI-powered resume magic.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <Link
              to="/editor/$templateId"
              params={{ templateId: '1' }}
              className="bg-primary-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-primary-700 transition duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
            >
              Transform Your Resume Now
              <Upload className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition duration-300" />
            </Link>
            <Link
              to="/editor/$templateId"
              params={{ templateId: '1' }}
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-md text-lg font-semibold hover:bg-primary-50 transition duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
            >
              Create from Scratch with AI
              <Zap className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition duration-300" />
            </Link>
          </div>
        </div>
        <div className="mt-12 relative z-10 overflow-hidden">
          <p className="text-sm text-neutral-500 mb-4">Trusted by professionals from</p>
          <motion.div 
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <img 
                key={`${company.name}-${index}`}
                src={company.logo} 
                alt={company.name} 
                className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse"
                patternTransform="scale(2) rotate(0)">
                <path d="M25,17.3 L0,34.6 L0,8.7 L25,0 L50,8.7 L50,34.6 Z" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-4 font-display">
              Why TeXResume.ai is Your
            </h2>
            <div className="relative inline-block">
              <span className="text-4xl sm:text-5xl font-bold text-secondary-500 font-display">Career Secret Weapon</span>
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-secondary-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-white rounded-xl transform rotate-3 opacity-50"></div>
                <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-primary-500 group hover:-translate-y-2 transform">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary-100 rounded-bl-full opacity-50"></div>
                  <div className="mb-6 transform group-hover:scale-110 transition duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-primary-700 font-display">{feature.title}</h3>
                  <p className="text-neutral-600 text-lg">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      <section className="pt-32 pb-20 mb-20 bg-gradient-to-b from-white via-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-center mb-16 font-display text-primary-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Path to Success
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-lg shadow-xl p-8 border border-primary-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold font-display shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="text-center mt-8">
                  <div className="bg-primary-100 text-primary-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 font-display text-primary-800">{step.title}</h3>
                  <p className="text-lg mb-6 text-neutral-600">{step.description}</p>
                  <ul className="text-left text-lg space-y-3">
                    {step.points.map((point, pointIndex) => (
                      <motion.li 
                        key={pointIndex} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (pointIndex * 0.1) }}
                      >
                        <ArrowRight className="mr-2 h-5 w-5 text-secondary-500" />
                        <span className="text-neutral-700">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-primary-800 mb-12 font-display">
          Success Stories from TeXResume.ai Users
        </h2>
        <div className="px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-secondary-500"
            >
              <div className="flex items-center mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-xl text-primary-800 font-display">{testimonial.name}</div>
                  <div className="text-secondary-600">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-neutral-700 mb-6 text-lg italic font-serif">"{testimonial.quote}"</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-100 to-secondary-100 py-20 rounded-3xl shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6 font-display">
            Ready to Supercharge Your Career?
          </h2>
          <p className="text-2xl text-neutral-600 mb-10 font-serif max-w-3xl mx-auto">
            Join thousands who've landed their dream jobs with TeXResume.ai. Your perfect resume is just minutes away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to="/editor/$templateId"
              params={{ templateId: '1' }}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition duration-300 inline-flex items-center group shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Transform Your Resume Now
              <Upload className="ml-3 h-6 w-6 group-hover:translate-x-1 transition duration-300" />
            </Link>
            <Link
              to="/editor/$templateId"
              params={{ templateId: '1' }}
              className="bg-white text-primary-600 border-2 border-primary-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-primary-50 transition duration-300 inline-flex items-center group shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Create with AI Assistance
              <Zap className="ml-3 h-6 w-6 group-hover:translate-x-1 transition duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index