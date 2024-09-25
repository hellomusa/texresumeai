import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Pencil } from 'lucide-react'
import { createFileRoute, notFound, useLoaderData } from '@tanstack/react-router'
import ResumeUploadModal from '../components/Templates/resume-upload-modal'
import type { Template } from '../types/Template'
import { templates } from '../static/template-copy'
import NotFound from '../components/NotFound'

export const Route = createFileRoute('/editor/$templateId')({
  loader: async ({ params: { templateId } }) => {
    const template = templates.find(t => t.id == templateId)
    if (!template) throw notFound();
    return template
  },
  component: () => {
    const template = useLoaderData({ from: '/editor/$templateId' })
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)
    const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null)
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  
    const handleUploadClick = () => {
      setShowUploadModal(true)
    }

    const handleResumeGenerated = (pdfUrl: string, downloadUrl: string) => {
      setGeneratedPdfUrl(pdfUrl)
      setDownloadUrl(downloadUrl)
    }
  
    if (!template) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
          <div className="text-2xl font-semibold text-gray-700">Loading...</div>
        </div>
      )
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Customize Your Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Using the {template.name} template
            </p>
          </motion.div>
  
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              className="w-full lg:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Options</h2>
                <div className="space-y-4">
                  <button
                    onClick={handleUploadClick}
                    className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Your Resume
                  </button>
                  <button
                    disabled
                    className="w-full flex items-center justify-center bg-gray-200 text-gray-500 py-3 px-4 rounded-md cursor-not-allowed"
                  >
                    <Pencil className="mr-2 h-5 w-5" />
                    Enter Info Manually
                  </button>
                </div>
                {file && (
                  <div className="mt-6 p-4 bg-green-50 rounded-md">
                    <div className="flex items-center text-green-700">
                      <FileText className="mr-2 h-5 w-5" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                      Your resume has been uploaded successfully.
                    </p>
                  </div>
                )}
                {downloadUrl && (
                  <div className="mt-4">
                    <a
                      href={`http://localhost:5000${downloadUrl}`}
                      download
                      className="w-full flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Download Generated Resume
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
  
            <motion.div
              className="w-full lg:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
                <div className="aspect-[8.5/11] bg-gray-100 rounded-md overflow-hidden">
                  {generatedPdfUrl ? (
                    <iframe
                      src={`http://localhost:5000${generatedPdfUrl}`}
                      title="Generated Resume Preview"
                      className="w-full h-full"
                    />
                  ) : file ? (
                    <iframe
                      src={URL.createObjectURL(file)}
                      title="Uploaded Resume Preview"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={template.image}
                        alt={`${template.name} template`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
  
        <ResumeUploadModal
          showUploadModal={showUploadModal}
          setShowUploadModal={setShowUploadModal}
          uploadingTemplate={template.id}
          file={file}
          setFile={setFile}
          fileError={fileError}
          setFileError={setFileError}
          onResumeGenerated={handleResumeGenerated}
        />
      </div>
    )
  },
  notFoundComponent: NotFound
})