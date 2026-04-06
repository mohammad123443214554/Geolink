'use client'

import { useState, useEffect } from 'react'

export default function ChannelStats({ channelId, stats }) {
  const [animatedStats, setAnimatedStats] = useState({
    subscribers: 0,
    videos: 0,
    views: 0,
    likes: 0
  })

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    const increment = {
      subscribers: (stats.subscribers || 0) / steps,
      videos: (stats.videos || 0) / steps,
      views: (stats.views || 0) / steps,
      likes: (stats.likes || 0) / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      
      if (currentStep <= steps) {
        setAnimatedStats({
          subscribers: Math.floor(increment.subscribers * currentStep),
          videos: Math.floor(increment.videos * currentStep),
          views: Math.floor(increment.views * currentStep),
          likes: Math.floor(increment.likes * currentStep)
        })
      } else {
        setAnimatedStats({
          subscribers: stats.subscribers || 0,
          videos: stats.videos || 0,
          views: stats.views || 0,
          likes: stats.likes || 0
        })
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [stats])

  const statItems = [
    {
      label: 'Subscribers',
      value: animatedStats.subscribers,
      icon: '👥',
      color: 'from-red-500 to-pink-500',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      label: 'Videos',
      value: animatedStats.videos,
      icon: '📹',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Total Views',
      value: animatedStats.views,
      icon: '👁️',
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Total Likes',
      value: animatedStats.likes,
      icon: '❤️',
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-600 dark:text-pink-400'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={item.label}
          className="card hover:shadow-xl transition-all cursor-pointer group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Icon with Gradient Background */}
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <span className="text-2xl">{item.icon}</span>
          </div>

          {/* Stat Value */}
          <div className={`text-3xl font-bold mb-1 ${item.textColor}`}>
            {item.value.toLocaleString()}
          </div>

          {/* Stat Label */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {item.label}
          </div>

          {/* Milestone Badge (if applicable) */}
          {item.label === 'Subscribers' && item.value >= 1000 && (
            <div className="mt-2 inline-flex items-center space-x-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded-full text-xs">
              <span>🏆</span>
              <span className="font-medium text-yellow-800 dark:text-yellow-200">
                {item.value >= 1000000 ? '1M+' : 
                 item.value >= 100000 ? '100K+' : 
                 item.value >= 10000 ? '10K+' : 
                 item.value >= 5000 ? '5K+' : '1K+'}
              </span>
            </div>
          )}

          {/* Earnings Indicator (Subscribers only) */}
          {item.label === 'Subscribers' && item.value >= 5000 && (
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              💰 Earning ₹500/month!
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
