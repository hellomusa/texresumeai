import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ChevronRight, Star } from 'lucide-react'
import TemplateCard from '../components/Templates/template-card'
import TemplatePreviewModal from '../components/Templates/template-preview-modal'
import type { Template } from '../types/Template'
import { templates } from '../static/template-copy'
import { useState } from 'react'

export const Route = createFileRoute('/templates')({
  component: Templates,
})

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const bestTemplate = templates[0]

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
  }

  const handleClosePreview = () => {
    setSelectedTemplate(null)
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary-800 font-display">
            Resume Templates
          </h1>
          <Link
            to={`/editor/${bestTemplate.id}`}
            className="inline-flex items-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 px-6 rounded-full hover:from-primary-700 hover:to-secondary-700 transition duration-300 shadow-md hover:shadow-lg group"
          >
            <Star className="mr-2 h-5 w-5" />
            Try Our Best Template
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-primary-600 mb-12 font-serif"
        >
          Choose from our collection of professionally designed templates, optimized to help you land jobs at Fortune 500 companies and beyond.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TemplateCard
                template={template}
                handleTemplateClick={handleTemplateClick}
              />
            </motion.div>
          ))}
        </motion.div>

        <TemplatePreviewModal
          selectedTemplate={selectedTemplate}
          handleClosePreview={handleClosePreview}
        />

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-primary-600 mb-6 text-lg font-serif">
            Can't find what you're looking for?
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 px-6 rounded-full hover:from-primary-700 hover:to-secondary-700 transition duration-300 shadow-md hover:shadow-lg group"
          >
            Request a Custom Template
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Templates