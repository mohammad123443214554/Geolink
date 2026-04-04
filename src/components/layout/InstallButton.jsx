'use client'

import { useState, useEffect } from 'react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default prompt
      e.preventDefault()
      // Store the event for later use
      setDeferredPrompt(e)
      // Show the install button
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowButton(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the deferredPrompt so it can only be used once
    setDeferredPrompt(null)
    setShowButton(false)
  }

  // Don't render if button shouldn't show
  if (!showButton) {
    return null
  }

  return (
    <button
      onClick={handleInstallClick}
      className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
      title="Install Geolink as an app"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
        />
      </svg>
      <span className="font-medium">Install</span>
    </button>
  )
}
