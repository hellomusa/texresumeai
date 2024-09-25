import type React from 'react';
import { useState, useRef, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileUp, Check, AlertCircle } from 'lucide-react';

interface ResumeUploadModalProps {
  showUploadModal: boolean;
  setShowUploadModal: (show: boolean) => void;
  uploadingTemplate: string | null;
  file: File | null;
  setFile: (file: File | null) => void;
  fileError: string | null;
  setFileError: (fileError: string | null) => void;
  onResumeGenerated: (pdfUrl: string, downloadUrl: string) => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  showUploadModal,
  setShowUploadModal,
  uploadingTemplate,
  file,
  setFile,
  fileError,
  setFileError,
  onResumeGenerated
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadSubmit = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("templateId", uploadingTemplate || "");

    try {
        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Upload successful:", result);
        // Call the callback function with the PDF and download URLs
        onResumeGenerated(result.pdf_url, result.download_url);
        setShowUploadModal(false);
    } catch (error) {
        console.error("Upload failed:", error);
        setFileError("Upload failed. Please try again.");
    } finally {
        setIsUploading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' && selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
        setFileError(null);
      } else {
        setFile(null);
        setFileError('Please upload a PDF file under 10MB.');
      }
    }
  };
  
  return (
    <AnimatePresence>
      {showUploadModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg max-w-md w-full"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Upload Resume
                </h2>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition duration-300"
                  aria-label="Close upload modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="resume-upload"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select PDF file
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="resume-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="resume-upload"
                          name="resume-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  </div>
                </div>
              </div>
              {file && (
                <div className="flex items-center text-sm text-green-600 mb-4">
                  <Check className="mr-2" size={16} />
                  {file.name}
                </div>
              )}
              {fileError && (
                <div className="flex items-center text-sm text-red-600 mb-4">
                  <AlertCircle className="mr-2" size={16} />
                  {fileError}
                </div>
              )}
              <button
                type="button"
                className={`w-full ${
                  file && !fileError
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-2 px-4 rounded transition duration-300`}
                onClick={handleUploadSubmit}
                disabled={!file || !!fileError || isUploading}
              >
                {isUploading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeUploadModal;