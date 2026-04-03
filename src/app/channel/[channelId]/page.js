'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ChannelViewPage({ params }) {
  const channelId = params.channelId
  const [subscribed, setSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState('videos') // 'videos', 'about'

  const channelData = {
    name: 'Tech With MK',
    username: '@mohammad_khan',
    subscribers: 1234,
    totalVideos: 45,
    totalViews: 125000,
    description: 'Welcome to my channel! I create tech tutorials, reviews, and coding content.',
    joinedDate: 'January 2026'
  }

  const handleSubscribe = () => {
    setSubscribed(!subscribed)
    // Backend API call
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Channel Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl mb-6 overflow-hidden">
        <Image 
          src="/images/default-cover.jpg"
          alt="Channel Banner"
          fill
          className="object-cover opacity-50"
        />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        {/* Channel Avatar */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
          <Image 
            src="/images/default-avatar.png"
            alt={channelData.name}
            fill
            className="object-cover rounded-full border-4 border-white dark:border-black"
          />
        </div>

        {/* Channel Details */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{channelData.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{channelData.username}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{channelData.subscribers.toLocaleString()} subscribers</span>
            <span>•</span>
            <span>{channelData.totalVideos} videos</span>
            <span>•</span>
            <span>{channelData.totalViews.toLocaleString()} views</span>
          </div>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          className={`px-8 py-3 rounded-full font-medium transition ${
            subscribed
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {subscribed ? '✓ Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-4 px-2 font-medium border-b-2 transition ${
              activeTab === 'videos'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-4 px-2 font-medium border-b-2 transition ${
              activeTab === 'about'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            About
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'videos' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card cursor-pointer hover:shadow-lg transition">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden">
                <Image 
                  src="/images/placeholder.png"
                  alt={`Video ${i + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 10) + 5}:34
                </div>
              </div>

              {/* Video Info */}
              <div className="flex space-x-3">
                <Image 
                  src="/images/default-avatar.png"
                  alt="Channel"
                  width={36}
                  height={36}
                  className="rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-2 mb-1">
                    Amazing Tech Tutorial #{i + 1} - Must Watch!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.floor(Math.random() * 50) + 10}K views • {Math.floor(Math.random() * 7) + 1} days ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-3xl">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">About This Channel</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {channelData.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Joined</p>
                <p className="font-medium">{channelData.joinedDate}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Total Views</p>
                <p className="font-medium">{channelData.totalViews.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Total Videos</p>
                <p className="font-medium">{channelData.totalVideos}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Subscribers</p>
                <p className="font-medium">{channelData.subscribers.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
