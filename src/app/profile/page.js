'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('posts') // 'posts', 'videos', 'photos'

  const stats = {
    posts: 156,
    followers: 12500,
    following: 890
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
        <button className="absolute top-4 right-4 px-4 py-2 bg-white dark:bg-black rounded-lg text-sm font-medium">
          📷 Edit Cover
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4">
        {/* Avatar */}
        <div className="profile-avatar">
          <Image 
            src="/images/default-avatar.png" 
            alt="Profile" 
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="mt-20 text-center">
          <h1 className="text-2xl font-bold">{user?.username || 'Mohammad Khan'}</h1>
          <p className="text-gray-600 dark:text-gray-400">@mohammad_khan</p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.posts}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.followers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.following}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <Link href="/settings" className="btn-primary">
              Edit Profile
            </Link>
            {user?.accountType === 'public' && (
              <Link href="/channel" className="btn-secondary">
                View Channel
              </Link>
            )}
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
            <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
