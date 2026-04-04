'use client'

import { useState } from 'react'

export default function FollowButton({ userId, initialFollowing = false }) {
  const [following, setFollowing] = useState(initialFollowing)
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFollow = async () => {
    setLoading(true)

    try {
      // TODO: API call to backend
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      
      setFollowing(!following)
      console.log(`${following ? 'Unfollowed' : 'Followed'} user ${userId}`)
    } catch (error) {
      console.error('Failed to follow/unfollow:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleFollow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={loading}
      className={`px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        following
          ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800 border border-gray-300 dark:border-gray-700'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
      }`}
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <span>
          {following 
            ? (isHovered ? 'Unfollow' : 'Following') 
            : 'Follow'
          }
        </span>
      )}
    </button>
  )
}
