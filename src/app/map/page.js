'use client'

export default function MapPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🗺️ Map</h1>
      
      <div className="card">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">🗺️</p>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              Google Maps Integration
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Shows location of all users with public accounts
            </p>
            <p className="text-xs text-gray-400 mt-4">
              (Will be added in backend integration)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
