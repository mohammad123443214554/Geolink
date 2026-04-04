'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  return (
    <div className="card cursor-pointer hover:shadow-lg transition group">
      {/* Video Thumbnail/Player */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
        {playing ? (
          <video
            ref={videoRef}
            src={video.url}
            className="w-full h-full object-cover"
            onClick={handlePlayPause}
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <>
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition shadow-lg transform group-hover:scale-110"
              >
                <svg className="w-6 h-6 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Duration Badge */}
        {video.duration && !playing && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="flex space-x-3">
        {/* Channel Avatar */}
        <Link href={`/channel/${video.channelId}`}>
          <Image
            src={video.channelAvatar}
            alt={video.channelName}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full hover:opacity-80 transition"
          />
        </Link>

        {/* Video Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/video/${video.id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              {video.title}
            </h3>
          </Link>

          <Link 
            href={`/channel/${video.channelId}`}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            {video.channelName}
          </Link>

          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
            <span>{video.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>

        {/* More Options Menu */}
        <button className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
