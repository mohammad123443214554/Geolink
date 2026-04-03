'use client'

import { useState } from 'react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const tabs = ['all', 'videos', 'photos', 'profiles', 'channels']

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos, photos, profiles, channels..."
          className="input-field text-lg"
        />
      </div>
      
      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 capitalize ${activeTab === tab ? 'border-b-2 border-indigo-600 font-bold' : 'text-gray-600 dark:text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {query ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="card cursor-pointer hover:shadow-lg transition">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="font-medium line-clamp-2">
                Result {i + 1} for "{query}"
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                @username • 1.2K views
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 text-gray-500">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg">Search for videos, photos, profiles or channels</p>
          </div>
        )}
      </div>
    </div>
  )
}
