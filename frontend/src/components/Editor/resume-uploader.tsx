import React, { useState, useRef, useEffect, type ChangeEvent } from 'react'
import { Upload, Check, AlertCircle, Loader2, FileText } from 'lucide-react'

interface ResumeUploaderProps {
  templateId: string;
  onUploadComplete: (pdfUrl: string, downloadUrl: string, taskId: string) => void;
}

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';

export default function ResumeUploader({ templateId, onUploadComplete }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [conversionStage, setConversionStage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [taskId, setTaskId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' && selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile)
        setFileError(null)
      } else {
        setFile(null)
        setFileError('Please upload a PDF file under 10MB.')
      }
    }
  }

  // useEffect(() => {
  //   return () => {
  //     if (pollIntervalRef.current) {
  //       clearInterval(pollIntervalRef.current)
  //     }
  //   }
  // }, [])

  useEffect(() => {
    if (taskId) {
      pollIntervalRef.current = setInterval(() => checkTaskStatus(taskId), 2000)
    }
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [taskId])

  const checkTaskStatus = async (taskId: string | null) => {
    console.log("Got here")
    console.log(taskId)
    if (taskId) {
      console.log("but not here")
      try {
        const response = await fetch(`${API_BASE_URL}/task-status/${taskId}`)
        const data = await response.json()
        console.log("status: ", data.status)
        switch (data.status) {
          case 'queued':
            setConversionStage('Waiting in Queue')
            setProgress(10)
            break
          case 'processing':
            setConversionStage('Processing')
            setProgress(50)
            break
          case 'completed':
            setIsUploading(false)
            setConversionStage('Complete')
            setProgress(100)
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current)
            }
            onUploadComplete(data.pdf_url, data.download_url, taskId)
            break
          case 'failed':
            setIsUploading(false)
            setFileError('PDF generation failed. Please try again.')
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current)
            }
            break
        }
      } catch (error) {
        console.error('Error checking task status:', error)
      }
    }
  }

  const handleUploadSubmit = async () => {
    if (!file) return

    setIsUploading(true)
    setConversionStage('Uploading')
    setProgress(0)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("templateId", templateId)

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("received task id from upload", result.task_id)
      setTaskId(result.task_id)
    } catch (error) {
      console.error("Upload failed:", error)
      setFileError("Upload failed. Please try again.")
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile.type === 'application/pdf' && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile)
      setFileError(null)
    } else {
      setFile(null)
      setFileError('Please upload a PDF file under 10MB.')
    }
  }

  return (
    <div className="space-y-6">
      <div
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-colors duration-300 ease-in-out hover:border-primary-500"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="resume-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>Upload your current resume</span>
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
      {file && (
        <div className="flex items-center text-sm text-green-600">
          <Check className="mr-2" size={16} />
          {file.name}
        </div>
      )}
      {fileError && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="mr-2" size={16} />
          {fileError}
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={handleUploadSubmit}
          disabled={!file || !!fileError || isUploading}
          className={`w-full flex items-center justify-center ${
            file && !fileError && !isUploading
              ? "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
              : "bg-gray-300 cursor-not-allowed"
          } text-white py-3 px-4 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          {isUploading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              {conversionStage}
            </span>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Convert and Apply Template
            </>
          )}
        </button>
      </div>
      {isUploading && (
        <div className="mt-2">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                  {conversionStage}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary-600">
                  {`${Math.round(progress)}%`}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
              <div 
                style={{ width: `${progress}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-300 ease-in-out"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}