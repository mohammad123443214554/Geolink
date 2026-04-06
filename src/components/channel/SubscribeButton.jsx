'use client'

import { useState } from 'react'

export default function SubscribeButton({ channelId, initialSubscribed = false }) {
  const [subscribed, setSubscribed] = useState(initialSubscribed)
  const [loading, setLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)

    try {
      // TODO: API call to backend
      await new Promise(resolve => setTimeout(resolve, 600)) // Simulate API call
      
      const newState = !subscribed
      setSubscribed(newState)
      
      // Show celebration animation on subscribe
      if (newState) {
        setShowAnimation(true)
        setTimeout(() => setShowAnimation(false), 2000)
      }
      
      console.log(`${newState ? 'Subscribed to' : 'Unsubscribed from'} channel ${channelId}`)
    } catch (error) {
      console.error('Failed to subscribe/unsubscribe:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`relative px-6 py-2.5 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
          subscribed
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            : 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {loading ? (
          <span className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          <span className="flex items-center space-x-2">
            {subscribed ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Subscribed</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <span>Subscribe</span>
              </>
            )}
          </span>
        )}
      </button>

      {/* Celebration Animation */}
      {showAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></div>
        </div>
      )}

      {/* Confetti Effect (Optional) */}
      {showAnimation && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${(i - 2) * 20}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
