'use client'

import { useState } from 'react'

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('liked')

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Library</h1>
      
      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => setActiveTab('liked')} className={`pb-2 px-4 ${activeTab === 'liked' ? 'border-b-2 border-indigo-600 font-bold' : ''}`}>
          ❤️ Liked
        </button>
        <button onClick={() => setActiveTab('saved')} className={`pb-2 px-4 ${activeTab === 'saved' ? 'border-b-2 border-indigo-600 font-bold' : ''}`}>
          🔖 Saved
        </button>
        <button onClick={() => setActiveTab('folders')} className={`pb-2 px-4 ${activeTab === 'folders' ? 'border-b-2 border-indigo-600 font-bold' : ''}`}>
          📁 Folders
        </button>
      </div>
      
      {activeTab === 'folders' && (
        <button className="btn-primary mb-4">+ Create New Folder</button>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="card cursor-pointer hover:shadow-lg transition">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg mb-2"></div>
            <h3 className="font-medium">Video Title {i + 1}</h3>
            <p className="text-sm text-gray-600">@username • 1.2K views</p>
          </div>
        ))}
      </div>
    </div>
  )
}
