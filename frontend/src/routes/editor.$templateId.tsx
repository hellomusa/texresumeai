import { useState } from 'react'
import { motion } from 'framer-motion'
import { createFileRoute, notFound, useLoaderData, useNavigate } from '@tanstack/react-router'
import { templates } from '../static/template-copy'
import NotFound from '../components/NotFound'
import ResumeUploader from '../components/Editor/resume-uploader'
import { TemplateSelector } from '../components/Editor/template-selector'
import { InfoTooltip } from '../components/Editor/info-tooltip'
import { ManualEditSection } from '../components/Editor/manual-edit-section'
import { ResumePreview } from '../components/Editor/resume-preview'
import { DownloadButton } from '../components/Editor/download-button'
import { ResumeData } from '../types/ResumeData'

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';

export const Route = createFileRoute('/editor/$templateId')({
  loader: async ({ params: { templateId } }) => {
    const template = templates.find(t => t.id == templateId)
    if (!template) throw notFound();
    return template
  },
  component: Editor,
  notFoundComponent: NotFound
})

function Editor() {
  const template = useLoaderData({ from: '/editor/$templateId' })
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const [resumeData, setResumeData] = useState<ResumeData>({
    full_name: '',
    contact_info: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      personal_website: '',
      other: '',
    },
    work_experience: [],
    education: [],
    skills: [],
  });
  
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const navigate = useNavigate()

  const handleTemplateChange = (newTemplateId: string) => {
    navigate({ to: '/editor/$templateId', params: { templateId: newTemplateId } })
  }
  const handleUploadComplete = (pdfUrl: string, downloadUrl: string, taskId: string) => {
    setGeneratedPdfUrl(pdfUrl);
    setDownloadUrl(downloadUrl);
    setCurrentTaskId(taskId);

    // Extract resume data
    fetch(`${API_BASE_URL}/extract-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResumeData({
          full_name: data.full_name || '',
          contact_info: {
            email: data.contact_info?.email || '',
            phone: data.contact_info?.phone || '',
            location: data.contact_info?.location || '',
            linkedin: data.contact_info?.linkedin || '',
            github: data.contact_info?.github || '',
            personal_website: data.contact_info?.personal_website || '',
            other: data.contact_info?.other || '',
          },
          work_experience: data.work_experience || [],
          education: data.education || [],
          skills: data.skills || [],
        });
      })
      .catch(error => console.error('Error extracting resume data:', error));
  };

  const handleSaveResumeData = (updatedData: ResumeData) => {
    setResumeData(updatedData);
    // Here you can also add logic to send the updated data to your backend if needed
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-secondary-50">
        <div className="text-2xl font-semibold text-primary-700">Loading...</div>
      </div>
    )
  }

  return (
    <div className="py-8 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-bold text-primary-800 font-display mr-2">Resume Converter</h2>
                  <InfoTooltip />
                </div>
                <TemplateSelector
                  currentTemplate={template}
                  templates={templates}
                  onTemplateChange={handleTemplateChange}
                />
                <ResumeUploader templateId={template.id} onUploadComplete={handleUploadComplete} />
                {resumeData && (
                  <ManualEditSection resumeData={resumeData} onSave={handleSaveResumeData} />
                )}
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-primary-800 font-display">Preview</h2>
                  <DownloadButton downloadUrl={downloadUrl} API_BASE_URL={API_BASE_URL} />
                </div>
                <ResumePreview
                  generatedPdfUrl={generatedPdfUrl}
                  templateImage={template.image}
                  templateName={template.name}
                  API_BASE_URL={API_BASE_URL}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Route