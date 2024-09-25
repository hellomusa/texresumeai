import React, { useState, useEffect } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Search, Filter } from 'lucide-react'
import TemplateCard from '../components/Templates/template-card'
import TemplatePreviewModal from '../components/Templates/template-preview-modal'
import type { Template } from '../types/Template'
import { templates } from '../static/template-copy'

export const Route = createFileRoute('/templates')({
  component: Templates,
})

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
  }

  const handleClosePreview = () => {
    setSelectedTemplate(null)
  }

  const handleProceedToEdit = (templateId: string) => {
    console.log(`Proceeding to edit with template: ${templateId}`)
    // Implement navigation logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-primary-800 mb-4 font-display">
            Choose Your Perfect Template
          </h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto font-serif">
            Select from our professionally designed templates to create a
            standout resume that showcases your unique skills and experience.
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TemplateCard
                  template={template}
                  handleTemplateClick={handleTemplateClick}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <TemplatePreviewModal
          selectedTemplate={selectedTemplate}
          handleClosePreview={handleClosePreview}
          handleProceedToEdit={handleProceedToEdit}
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