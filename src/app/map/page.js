'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Import Leaflet dynamically (client-side only)
const Map = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading Map...</p>
      </div>
    </div>
  )
})

export default function MapPage() {
  const [mapMode, setMapMode] = useState('street') // 'street', 'satellite'
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [tracking, setTracking] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Location error:', error)
          // Default to India center
          setUserLocation({ lat: 20.5937, lng: 78.9629 })
        }
      )
    }

    // Load public account users (Demo data - will come from backend)
    loadUsers()
  }, [])

  const loadUsers = async () => {
    // TODO: API call to backend to get all public account users with locations
    // Demo data for now
    const demoUsers = [
      {
        id: 1,
        username: 'mohammad_khan',
        avatar: '/images/default-avatar.png',
        location: { lat: 22.7196, lng: 75.8577 }, // Indore
        lastActive: '2 min ago'
      },
      {
        id: 2,
        username: 'rahul_sharma',
        avatar: '/images/default-avatar.png',
        location: { lat: 28.7041, lng: 77.1025 }, // Delhi
        lastActive: '10 min ago'
      },
      {
        id: 3,
        username: 'priya_singh',
        avatar: '/images/default-avatar.png',
        location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
        lastActive: '1 hour ago'
      },
      {
        id: 4,
        username: 'amit_patel',
        avatar: '/images/default-avatar.png',
        location: { lat: 23.0225, lng: 72.5714 }, // Ahmedabad
        lastActive: '5 min ago'
      }
    ]

    setUsers(demoUsers)
  }

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  const handleTrack = (targetUser) => {
    if (userLocation && targetUser) {
      setTracking({
        from: userLocation,
        to: targetUser.location,
        user: targetUser
      })
    }
  }

  const clearTracking = () => {
    setTracking(null)
    setSelectedUser(null)
  }

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] space-y-3">
        {/* Mode Toggle */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 space-y-2">
          <button
            onClick={() => setMapMode('street')}
            className={`w-full px-4 py-2 rounded-lg font-medium transition ${
              mapMode === 'street'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            🗺️ Street View
          </button>
          <button
            onClick={() => setMapMode('satellite')}
            className={`w-full px-4 py-2 rounded-lg font-medium transition ${
              mapMode === 'satellite'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            🛰️ Satellite
          </button>
        </div>

        {/* User Count */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-bold text-lg">{users.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Users Online</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
          <h3 className="font-bold mb-2 text-sm">Legend</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-blue-600"></div>
              <span>Route</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Panel */}
      {selectedUser && (
        <div className="absolute top-4 right-4 z-[1000] w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={selectedUser.avatar} 
                alt={selectedUser.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-bold">@{selectedUser.username}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Active {selectedUser.lastActive}
                </p>
              </div>
            </div>
            <button
              onClick={clearTracking}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleTrack(selectedUser)}
              disabled={!userLocation}
              className="w-full btn-primary disabled:opacity-50"
            >
              📍 Track Route
            </button>
            <a
              href={`/profile/${selectedUser.username}`}
              className="block w-full text-center btn-secondary"
            >
              View Profile
            </a>
          </div>

          {tracking && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                🧭 Route Active
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Blue line shows the route from your location to @{selectedUser.username}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Map Component */}
      <Map 
        mode={mapMode}
        users={users}
        userLocation={userLocation}
        selectedUser={selectedUser}
        tracking={tracking}
        onUserClick={handleUserClick}
      />

      {/* Info Banner */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 py-3 max-w-md">
          <p className="text-sm text-center">
            <span className="font-bold">🌍 FREE OpenStreetMap</span> - No API costs!
          </p>
        </div>
      </div>
    </div>
  )
}
