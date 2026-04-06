'use client'

import { useState, useEffect } from 'react'

export default function SubscriberCount({ subscribers, growth }) {
  const [animatedCount, setAnimatedCount] = useState(0)
  const MILESTONE = 5000 // ₹500/month milestone
  const progress = (subscribers / MILESTONE) * 100

  // Animate subscriber count
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = subscribers / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setAnimatedCount(Math.floor(increment * currentStep))
      } else {
        setAnimatedCount(subscribers)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [subscribers])

  const isEligibleForBonus = subscribers >= MILESTONE

  return (
    <div className={`card relative overflow-hidden ${
      isEligibleForBonus 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-800'
    } hover:shadow-xl transition-all`}>
      
      {/* Background Icon */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-10">
        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className={`text-lg font-bold ${
          isEligibleForBonus ? 'text-green-900 dark:text-green-100' : 'text-blue-900 dark:text-blue-100'
        }`}>
          👥 Subscribers
        </h3>
        {isEligibleForBonus && (
          <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full animate-pulse">
            EARNING!
          </span>
        )}
      </div>

      {/* Subscriber Count */}
      <div className="relative z-10 mb-4">
        <div className={`text-5xl font-bold mb-2 ${
          isEligibleForBonus ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
        }`}>
          {animatedCount.toLocaleString()}
        </div>

        {/* Growth Indicator */}
        {growth !== undefined && (
          <div className={`inline-flex items-center space-x-1 text-sm ${
            growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            <svg className={`w-4 h-4 ${growth >= 0 ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="font-medium">+{Math.abs(growth)}</span>
            <span className="text-gray-600 dark:text-gray-400">this month</span>
          </div>
        )}
      </div>

      {/* Milestone Progress */}
      <div className="relative z-10">
        {isEligibleForBonus ? (
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-300 dark:border-green-700">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-3xl">🎉</span>
              <div>
                <p className="font-bold text-green-900 dark:text-green-100">
                  Milestone Achieved!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You're earning <strong>₹500/month</strong>
                </p>
              </div>
            </div>
            <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full w-full"></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${
                isEligibleForBonus ? 'text-green-900 dark:text-green-100' : 'text-blue-900 dark:text-blue-100'
              }`}>
                Progress to ₹500/month ({MILESTONE.toLocaleString()} subs):
              </p>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {Math.min(progress, 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              {(MILESTONE - subscribers).toLocaleString()} more subscribers to unlock monthly bonus!
            </p>
          </div>
        )}
      </div>

      {/* Celebration Confetti (if milestone reached) */}
      {isEligibleForBonus && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '⭐', '✨', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
