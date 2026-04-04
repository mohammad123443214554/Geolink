'use client'

import { useState } from 'react'

export default function LikeButton({ postId, initialLikes, initialLiked = false }) {
  const [liked, setLiked] = useState(initialLiked)
  const [likes, setLikes] = useState(initialLikes)
  const [animating, setAnimating] = useState(false)

  const handleLike = async () => {
    // Optimistic update
    if (liked) {
      setLiked(false)
      setLikes(likes - 1)
    } else {
      setLiked(true)
      setLikes(likes + 1)
      setAnimating(true)
      setTimeout(() => setAnimating(false), 600)
    }

    // TODO: API call to backend
    try {
      // await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
      console.log(`Liked post ${postId}`)
    } catch (error) {
      console.error('Failed to like post:', error)
      // Revert on error
      setLiked(!liked)
      setLikes(liked ? likes + 1 : likes - 1)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 transition ${
        liked 
          ? 'text-red-600 dark:text-red-500' 
          : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500'
      }`}
    >
      <svg 
        className={`w-6 h-6 transition-transform ${animating ? 'scale-125' : 'scale-100'}`}
        fill={liked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span className="text-sm font-medium">
        {likes.toLocaleString()}
      </span>
    </button>
  )
}
