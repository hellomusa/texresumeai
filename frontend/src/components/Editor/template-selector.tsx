import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface TemplateSelectorProps {
  currentTemplate: { name: string, id: string }
  templates: Array<{ name: string, id: string }>
  onTemplateChange: (newTemplateId: string) => void
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ currentTemplate, templates, onTemplateChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full text-left text-sm text-primary-600 font-serif bg-primary-50 py-2 px-3 rounded-md flex items-center justify-between"
      >
        <span>Using the {currentTemplate.name} template</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-1 max-h-60 overflow-auto">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onTemplateChange(t.id)
                setIsDropdownOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${t.id === currentTemplate.id ? 'bg-primary-100 text-primary-800' : 'hover:bg-primary-50'}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}