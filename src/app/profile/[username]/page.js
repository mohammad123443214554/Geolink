'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function UserProfilePage({ params }) {
  const username = params.username
  const router = useRouter()
  const [following, setFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')

  const userStats = {
    posts: 89,
    followers: 4500,
    following: 320
  }

  const handleFollow = () => {
    setFollowing(!following)
    // Backend API call here
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Photo */}
      <div className="profile-header">
        <Image 
          src="/images/default-cover.jpg" 
          alt="Cover" 
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4">
        {/* Avatar */}
        <div className="profile-avatar">
          <Image 
            src="/images/default-avatar.png" 
            alt={username}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="mt-20 text-center">
          <h1 className="text-2xl font-bold capitalize">{username.replace('-', ' ')}</h1>
          <p className="text-gray-600 dark:text-gray-400">@{username}</p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.posts}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.followers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.following}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button 
              onClick={handleFollow}
              className={following ? 'btn-secondary' : 'btn-primary'}
            >
              {following ? 'Following' : 'Follow'}
            </button>
            <button className="btn-secondary">
              Message
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-8 mt-8 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'posts'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'videos'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'photos'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Photos
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-1 mt-4">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer hover:opacity-80 transition"
            >
              <Image 
                src="/images/placeholder.png"
                alt={`Post ${i + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* No Posts Message */}
        {activeTab === 'posts' && (
          <div className="text-center py-12 text-gray-500">
            No posts yet
          </div>
        )}
      </div>
    </div>
  )
}
