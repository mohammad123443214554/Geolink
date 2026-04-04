'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProfilePicture({ avatarUrl, username, isEditable = false, onEdit }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex justify-center sm:justify-start">
      <div 
        className="relative"
        onMouseEnter={() => isEditable && setIsHovered(true)}
        onMouseLeave={() => isEditable && setIsHovered(false)}
      >
        {/* Profile Picture Container */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-black shadow-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
          {!imageError ? (
            <Image
              src={avatarUrl}
              alt={username}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
              {username?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}

          {/* Edit Overlay (Only for own profile) */}
          {isEditable && (
            <button
              onClick={onEdit}
              className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-white text-center">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium">Change</span>
              </div>
            </button>
          )}
        </div>

        {/* Online Status Badge (Optional) */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-black rounded-full"></div>

        {/* Verified Badge (if applicable) */}
        {/* Uncomment if user is verified */}
        {/* <div className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 border-4 border-white dark:border-black rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div> */}
      </div>
    </div>
  )
}
