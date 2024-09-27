import { Download } from 'lucide-react'
import { motion } from 'framer-motion'

interface DownloadButtonProps {
  downloadUrl: string | null
  API_BASE_URL: string
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadUrl, API_BASE_URL }) => {
  const isDownloadable = !!downloadUrl

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href={isDownloadable ? `${API_BASE_URL}${downloadUrl}` : '#'}
        download
        onClick={(e) => !isDownloadable && e.preventDefault()}
        className={`flex items-center justify-center p-3 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
          isDownloadable
            ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        title={isDownloadable ? "Download Your New Resume" : "Resume not ready for download"}
      >
        <Download className={`h-6 w-6 ${isDownloadable ? 'text-white' : 'text-gray-600'}`} />
      </a>
    </motion.div>
  )
}