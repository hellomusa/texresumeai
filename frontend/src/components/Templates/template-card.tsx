import type React from 'react'
import { motion } from 'framer-motion'
import { Eye, Star, Download } from 'lucide-react'
import type { Template } from "../../types/Template"

interface TemplateCardProps {
  template: Template
  handleTemplateClick: (template: Template) => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, handleTemplateClick }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
      onClick={() => handleTemplateClick(template)}
    >
      <div className="relative aspect-[8.5/11] w-full">
        <img
          src={template.image}
          alt={template.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-semibold text-primary-600">
          {template.category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{template.name}</h3>
          <p className="text-xs text-white line-clamp-2 drop-shadow-md">{template.description}</p>
        </div>
      </div>
      <div className="p-3 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="text-yellow-400 w-4 h-4 mr-1" />
            <span className="text-xs font-semibold text-gray-700">{template.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            <span>{template.views}</span>
            <Download className="w-3 h-3 ml-2 mr-1" />
            <span>{template.downloads}</span>
          </div>
        </div>
        <motion.button
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-md hover:from-primary-700 hover:to-secondary-700 transition duration-300 font-semibold flex items-center justify-center text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            handleTemplateClick(template)
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview Template
        </motion.button>
      </div>
    </motion.div>
  )
}

export default TemplateCard