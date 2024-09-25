import type React from 'react'
import { motion } from 'framer-motion'
import type { Template } from "../../types/Template"

interface TemplateCardProps {
  template: Template
  handleTemplateClick: (template: Template) => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, handleTemplateClick }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
      whileHover={{ y: -5 }}
      onClick={() => handleTemplateClick(template)}
    >
      <div className="relative">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-128 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
          <p className="text-sm text-gray-200">{template.description}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <button
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-md hover:from-primary-700 hover:to-secondary-700 transition duration-300 font-semibold"
          onClick={(e) => {
            e.stopPropagation()
            handleTemplateClick(template)
          }}
        >
          Preview Template
        </button>
      </div>
    </motion.div>
  )
}

export default TemplateCard