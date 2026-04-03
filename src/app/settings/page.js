'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function SettingsPage() {
  const { user } = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>
      
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input type="text" className="input-field" defaultValue="Mohammad Khan" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email/Phone</label>
              <input type="text" className="input-field" defaultValue="mohammad@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <button className="btn-secondary">Change Password</button>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
        
        {/* Appearance Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Appearance</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <p className="font-medium">🌙 Dark Mode</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between light and dark theme
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={(e) => setDarkMode(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        
        {/* Privacy Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Privacy</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="font-medium">Account Type</span>
              <span className="font-bold text-indigo-600">
                {user?.accountType === 'public' ? '🌍 Public' : '🔒 Private'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <span className="font-medium">Show Location on Map</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Likes</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>Comments</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>New Subscribers</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
