'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SubscribeButton from './SubscribeButton'

export default function ChannelCard({ channel, layout = 'grid' }) {
  // layout can be 'grid' or 'list'
  
  if (layout === 'list') {
    return (
      <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition cursor-pointer">
        {/* Channel Avatar */}
        <Link href={`/channel/${channel.id}`}>
          <Image
            src={channel.avatar || '/images/default-avatar.png'}
            alt={channel.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full hover:opacity-80 transition"
          />
        </Link>

        {/* Channel Info */}
        <div className="flex-1 min-w-0">
          <Link href={`/channel/${channel.id}`}>
            <h3 className="font-bold text-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition truncate">
              {channel.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            @{channel.username}
          </p>
          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
            <span>{channel.subscribers?.toLocaleString() || 0} subscribers</span>
            <span>•</span>
            <span>{channel.videos || 0} videos</span>
          </div>
        </div>

        {/* Subscribe Button */}
        <SubscribeButton 
          channelId={channel.id}
          initialSubscribed={channel.isSubscribed || false}
        />
      </div>
    )
  }

  // Grid Layout (Default)
  return (
    <div className="card cursor-pointer hover:shadow-xl transition group">
      {/* Channel Banner */}
      <div className="relative h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl overflow-hidden mb-12">
        {channel.banner && (
          <Image
            src={channel.banner}
            alt={channel.name}
            fill
            className="object-cover"
          />
        )}
        
        {/* Channel Avatar (overlapping) */}
        <Link href={`/channel/${channel.id}`}>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-black overflow-hidden group-hover:border-indigo-600 dark:group-hover:border-indigo-600 transition">
              <Image
                src={channel.avatar || '/images/default-avatar.png'}
                alt={channel.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Channel Details */}
      <div className="text-center px-4 pb-4">
        <Link href={`/channel/${channel.id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition line-clamp-1">
            {channel.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          @{channel.username}
        </p>

        {/* Stats */}
        <div className="flex justify-center space-x-4 text-xs text-gray-500 mb-4">
          <span>{channel.subscribers?.toLocaleString() || 0} subscribers</span>
          <span>•</span>
          <span>{channel.videos || 0} videos</span>
        </div>

        {/* Description */}
        {channel.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {channel.description}
          </p>
        )}

        {/* Subscribe Button */}
        <SubscribeButton 
          channelId={channel.id}
          initialSubscribed={channel.isSubscribed || false}
        />
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-600 rounded-xl transition pointer-events-none"></div>
    </div>
  )
}
