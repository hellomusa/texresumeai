import { Info } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export const InfoTooltip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={tooltipRef}>
      <button
        onMouseEnter={() => setIsVisible(!isVisible)}
        onMouseLeave={() => setIsVisible(!isVisible)}
        className="text-primary-600 hover:text-primary-800 transition-colors"
      >
        <Info size={20} />
      </button>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-left text-white bg-primary-800 rounded-lg shadow-xl">
          <h3 className="font-bold mb-1">How it works:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Upload your current resume (PDF format)</li>
            <li>We'll extract your information automatically</li>
            <li>Your data is applied to the selected template</li>
            <li>Preview your new, professionally formatted resume</li>
            <li>Download your ready-to-use LaTeX resume</li>
          </ol>
        </div>
      )}
    </div>
  )
}