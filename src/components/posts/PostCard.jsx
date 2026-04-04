'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LikeButton from './LikeButton'
import CommentSection from './CommentSection'
import ShareButton from './ShareButton'
import DownloadButton from './DownloadButton'

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="card fade-in">
      {/* User Info Header */}
      <div className="flex items-center justify-between mb-4">
        <Link 
          href={`/profile/${post.user.username}`}
          className="flex items-center space-x-3 hover:opacity-80 transition"
        >
          <Image
            src={post.user.avatar}
            alt={post.user.username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{post.user.username}</p>
            {post.user.channelName && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {post.user.channelName}
              </p>
            )}
          </div>
        </Link>
        <span className="text-xs text-gray-500">{post.timestamp}</span>
      </div>

      {/* Content */}
      {post.type === 'video' ? (
        <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-3">
          <Image
            src={post.content.thumbnail}
            alt={post.content.caption}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition shadow-lg">
              <svg className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
          {/* View Count Badge */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            👁️ {post.stats.views.toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-3">
          <Image
            src={post.content.url}
            alt={post.content.caption}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Caption */}
      {post.content.caption && (
        <p className="text-sm mb-3 text-gray-800 dark:text-gray-200">
          {post.content.caption}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3 pb-3 border-b border-gray-200 dark:border-gray-800">
        <span>{post.stats.likes.toLocaleString()} likes</span>
        <span>{post.stats.comments} comments</span>
        <span>{post.stats.shares} shares</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <LikeButton 
            postId={post.id} 
            initialLikes={post.stats.likes}
            initialLiked={false}
          />
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">Comment</span>
          </button>

          <ShareButton postId={post.id} />
        </div>

        <DownloadButton 
          url={post.type === 'video' ? post.content.url : post.content.url}
          filename={`geolink_${post.id}`}
        />
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentSection postId={post.id} />
      )}
    </div>
  )
}
