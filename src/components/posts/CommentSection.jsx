'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        username: 'john_doe',
        avatar: '/images/default-avatar.png'
      },
      text: 'Amazing post! 🔥',
      timestamp: '2h ago',
      likes: 12
    },
    {
      id: 2,
      user: {
        username: 'jane_smith',
        avatar: '/images/default-avatar.png'
      },
      text: 'Love this content!',
      timestamp: '5h ago',
      likes: 8
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    // Add new comment (optimistic update)
    const newComment = {
      id: Date.now(),
      user: {
        username: 'mohammad_khan', // Current user
        avatar: '/images/default-avatar.png'
      },
      text: comment,
      timestamp: 'Just now',
      likes: 0
    }

    setComments([newComment, ...comments])
    setComment('')

    // TODO: API call to backend
    console.log(`Posted comment on ${postId}:`, comment)
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/default-avatar.png"
            alt="Your avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-3">
              <Image
                src={c.user.avatar}
                alt={c.user.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl px-4 py-2">
                  <p className="font-semibold text-sm">{c.user.username}</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{c.text}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 px-4">
                  <span className="text-xs text-gray-500">{c.timestamp}</span>
                  <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                    Like
                  </button>
                  <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                    Reply
                  </button>
                  {c.likes > 0 && (
                    <span className="text-xs text-gray-500">
                      {c.likes} {c.likes === 1 ? 'like' : 'likes'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Comments */}
      {comments.length > 0 && (
        <button className="w-full mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
          View more comments
        </button>
      )}
    </div>
  )
}
