import { Eye } from 'lucide-react'

interface ResumePreviewProps {
  generatedPdfUrl: string | null
  templateImage: string
  templateName: string
  API_BASE_URL: string
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ generatedPdfUrl, templateImage, templateName, API_BASE_URL }) => (
  <div className="flex-grow aspect-[8.5/11] bg-gray-100 rounded-md overflow-hidden shadow-inner">
    {generatedPdfUrl ? (
      <iframe
        src={`${API_BASE_URL}${generatedPdfUrl}`}
        title="Your New Resume Preview"
        className="w-full h-full"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={templateImage}
          alt={`${templateName} template preview`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    )}
    {generatedPdfUrl && (
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => window.open(`${API_BASE_URL}${generatedPdfUrl}`, '_blank')}
          className="flex items-center justify-center bg-primary-100 text-primary-700 py-2 px-4 rounded-full hover:bg-primary-200 transition duration-300"
        >
          <Eye className="mr-2 h-5 w-5" />
          Open Your New Resume
        </button>
      </div>
    )}
  </div>
)