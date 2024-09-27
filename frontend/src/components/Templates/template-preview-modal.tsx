import type React from 'react'
import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@tanstack/react-router"
import { X, Download, Star, Eye } from 'lucide-react'
import type { Template } from "../../types/Template"

interface TemplatePreviewModalProps {
  selectedTemplate: Template | null
  handleClosePreview: () => void
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  selectedTemplate,
  handleClosePreview
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedTemplate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedTemplate])

  if (!selectedTemplate) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClosePreview}
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b bg-gray-50">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 font-display mb-1">
                {selectedTemplate.name}
              </h2>
              <p className="text-sm text-gray-600">{selectedTemplate.category}</p>
            </div>
            <button
              onClick={handleClosePreview}
              className="text-gray-500 hover:text-gray-700 transition duration-300 p-2 rounded-full hover:bg-gray-200"
              aria-label="Close preview"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={selectedTemplate.image}
                alt={selectedTemplate.name}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-5 h-5 mr-1" />
                  <span className="font-semibold">{selectedTemplate.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{selectedTemplate.views}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{selectedTemplate.downloads}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-6 font-serif leading-relaxed">{selectedTemplate.description}</p>
            <div className="flex space-x-4">
              <Link
                to={`/editor/${selectedTemplate.id}`}
                className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-full hover:from-primary-700 hover:to-secondary-700 transition duration-300 text-base font-semibold text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Use This Template
              </Link>
              <button
                onClick={handleClosePreview}
                className="flex-1 bg-white text-primary-600 border-2 border-primary-600 py-3 px-6 rounded-full hover:bg-primary-50 transition duration-300 text-base font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Back to Templates
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TemplatePreviewModal