'use client'

import { useState } from 'react'

export default function ShareButton({ postId }) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/post/${postId}` 
    : ''

  const handleShare = (platform) => {
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out this post on Geolink! ${shareUrl}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this post on Geolink!')}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this post on Geolink!')}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      setShowMenu(false)

      // TODO: API call to increment share count
      console.log(`Shared post ${postId} on ${platform}`)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowMenu(false)
    }, 2000)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Geolink Post',
          text: 'Check out this post on Geolink!',
          url: shareUrl
        })
        setShowMenu(false)
        console.log(`Shared post ${postId} via native share`)
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    } else {
      setShowMenu(!showMenu)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="text-sm font-medium">Share</span>
      </button>

      {/* Share Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          ></div>

          {/* Menu */}
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50">
            <div className="p-2 space-y-1">
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-left"
              >
                <span className="text-2xl">💬</span>
                <span className="font-medium">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-left"
              >
                <span className="text-2xl">📘</span>
                <span className="font-medium">Facebook</span>
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-left"
              >
                <span className="text-2xl">🐦</span>
                <span className="font-medium">Twitter</span>
              </button>

              <button
                onClick={() => handleShare('telegram')}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-left"
              >
                <span className="text-2xl">✈️</span>
                <span className="font-medium">Telegram</span>
              </button>

              <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>

              <button
                onClick={copyLink}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-left"
              >
                <span className="text-2xl">{copied ? '✅' : '🔗'}</span>
                <span className="font-medium">
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
