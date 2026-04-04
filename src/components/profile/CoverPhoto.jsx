'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function CoverPhoto({ coverUrl, isEditable = false, onEdit }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden"
      onMouseEnter={() => isEditable && setIsHovered(true)}
      onMouseLeave={() => isEditable && setIsHovered(false)}
    >
      {/* Cover Image */}
      <Image
        src={coverUrl}
        alt="Cover Photo"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Edit Button (Only for own profile) */}
      {isEditable && (
        <button
          onClick={onEdit}
          className={`absolute top-4 right-4 px-4 py-2 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm rounded-lg font-medium transition-all ${
            isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-100'
          } hover:bg-opacity-100 dark:hover:bg-opacity-100 shadow-lg`}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">Edit Cover</span>
          </div>
        </button>
      )}

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cover-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cover-pattern)" />
        </svg>
      </div>
    </div>
  )
}
