'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [fileType, setFileType] = useState('video')
  const [formData, setFormData] = useState({
    caption: '',
    folder: ''
  })

  const handleUpload = async () => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      alert('✅ Uploaded successfully!')
      router.push('/profile')
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📤 Upload Content</h1>
      
      <div className="card">
        {/* File Type Selection */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFileType('video')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              fileType === 'video' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            📹 Video
          </button>
          <button
            onClick={() => setFileType('photo')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              fileType === 'photo' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            📷 Photo
          </button>
        </div>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center mb-6 hover:border-indigo-500 dark:hover:border-indigo-500 transition cursor-pointer">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
            Drag and drop your {fileType} here
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <button className="btn-primary">
            Choose File
          </button>
          <p className="text-xs text-gray-500 mt-4">
            {fileType === 'video' ? 'Max size: 500MB • MP4, MOV, AVI' : 'Max size: 10MB • JPG, PNG, GIF'}
          </p>
        </div>
        
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Caption */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Caption <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder="Write a caption for your post..."
              value={formData.caption}
              onChange={(e) => setFormData({...formData, caption: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.caption.length}/500 characters
            </p>
          </div>
          
          {/* Save to Folder */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Save to Folder <span className="text-gray-500">(Optional)</span>
            </label>
            <select 
              className="input-field"
              value={formData.folder}
              onChange={(e) => setFormData({...formData, folder: e.target.value})}
            >
              <option value="">Don't save to folder</option>
              <option value="folder1">Folder 1</option>
              <option value="folder2">Folder 2</option>
              <option value="new">+ Create New Folder</option>
            </select>
          </div>
          
          {/* Upload Button */}
          <button 
            disabled={uploading} 
            onClick={handleUpload}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              '📤 Upload'
            )}
          </button>
        </div>
        
        {/* Upload Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>💡 Tip:</strong> High-quality content with engaging captions gets more likes and shares!
          </p>
        </div>
      </div>
    </div>
  )
}
