import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { ResumeData } from '../../types/ResumeData';

interface ManualEditSectionProps {
  resumeData: ResumeData;
  onSave: (data: ResumeData) => void;
}

export const ManualEditSection: React.FC<ManualEditSectionProps> = ({ resumeData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ResumeData>(resumeData);

  useEffect(() => {
    setEditedData(resumeData);
  }, [resumeData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: keyof ResumeData,
    index?: number,
    field?: string
  ) => {
    const { value } = e.target;
    setEditedData(prevData => {
      if (Array.isArray(prevData[section]) && typeof index === 'number') {
        const newArray = [...prevData[section] as any[]];
        newArray[index] = { ...newArray[index], [field as string]: value };
        return { ...prevData, [section]: newArray };
      } else if (typeof prevData[section] === 'object' && field) {
        return { ...prevData, [section]: { ...prevData[section] as object, [field]: value } };
      } else if (section === 'skills') {
        return { ...prevData, [section]: value.split(',').map(skill => skill.trim()) };
      } else {
        return { ...prevData, [section]: value };
      }
    });
  };

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <Pencil className="inline-block mr-2" size={16} />
          Manual Edit
        </h3>
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Edit Resume Info
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Edit Resume Information</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={editedData.full_name}
            onChange={(e) => handleInputChange(e, 'full_name')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <h4 className="font-medium">Contact Info</h4>
          {Object.entries(editedData.contact_info).map(([key, value]) => (
            <div key={key} className="mt-2">
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, 'contact_info', undefined, key)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-medium">Work Experience</h4>
          {editedData.work_experience.map((exp, index) => (
            <div key={index} className="mt-2 p-2 border border-gray-200 rounded">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleInputChange(e, 'work_experience', index, 'company')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Company"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleInputChange(e, 'work_experience', index, 'position')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Position"
              />
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-medium">Education</h4>
          {editedData.education.map((edu, index) => (
            <div key={index} className="mt-2 p-2 border border-gray-200 rounded">
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleInputChange(e, 'education', index, 'school')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="School"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, 'education', index, 'degree')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Degree"
              />
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-medium">Skills</h4>
          <input
            type="text"
            value={editedData.skills ? editedData.skills.join(', ') : ''}
            onChange={(e) => handleInputChange(e, 'skills')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Comma-separated skills"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};