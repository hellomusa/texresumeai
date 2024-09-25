import type React from 'react'
import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "@tanstack/react-router"
import { X } from 'lucide-react'
import type { Template } from "../../types/Template"

interface TemplatePreviewModalProps {
  selectedTemplate: Template | null
  handleClosePreview: () => void
  handleProceedToEdit: (templateId: string) => void
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  selectedTemplate,
  handleClosePreview,
  handleProceedToEdit,
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
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-primary-800 font-display">
              {selectedTemplate.name}
            </h2>
            <button
              onClick={handleClosePreview}
              className="text-gray-500 hover:text-gray-700 transition duration-300"
              aria-label="Close preview"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.name}
              className="w-full h-auto"
            />
          </div>
          <div className="p-4 border-t bg-gray-50">
            <p className="text-gray-600 mb-4 font-serif">{selectedTemplate.description}</p>
            <div className="flex space-x-4">
              <Link
                to={`/editor/${selectedTemplate.id}`}
                className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-md hover:from-primary-700 hover:to-secondary-700 transition duration-300 text-base font-semibold text-center"
              >
                Use This Template
              </Link>
              <button
                onClick={handleClosePreview}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 text-base font-semibold"
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