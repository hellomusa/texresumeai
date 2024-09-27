import { Pencil } from 'lucide-react'

export const ManualEditSection: React.FC = () => (
  <div className="mt-6 p-4 bg-gray-100 rounded-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
      <Pencil className="inline-block mr-2" size={16} />
      Manual Edit
    </h3>
    <p className="text-sm text-gray-600 mb-2">
      Want to manually edit your resume information?
    </p>
    <button
      disabled
      className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
    >
      Edit Resume Info (Coming Soon)
    </button>
  </div>
)