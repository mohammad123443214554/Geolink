'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function CreateChannelPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    channelName: '',
    reason: '',
    agreeTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check if user has public account
  if (user?.accountType !== 'public') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Channel Creation Not Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need a <strong>Public Account</strong> to create a channel and earn money.
          </p>
          <button onClick={() => router.push('/settings')} className="btn-primary">
            Convert to Public Account
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.channelName || formData.channelName.length < 3) {
      setError('Channel name must be at least 3 characters')
      return
    }

    if (!formData.reason || formData.reason.length < 20) {
      setError('Please provide a detailed reason (minimum 20 characters)')
      return
    }

    if (!formData.agreeTerms) {
      setError('You must accept the terms and conditions')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      alert('🎉 Channel created successfully!')
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Channel</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start uploading content and earning money on Geolink!
        </p>
      </div>

      <div className="card">
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Channel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Tech With MK"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Choose a unique name that represents your content
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Why do you want to create a channel? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="input-field"
              rows="4"
              placeholder="Share your motivation, content plans, and goals..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.reason.length}/20 characters minimum
            </p>
          </div>

          {/* Rules & Guidelines */}
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="font-bold mb-3 flex items-center">
              ⚠️ Important Channel Rules
            </h3>
            <ul className="text-sm space-y-2 text-gray-800 dark:text-gray-200">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>No inappropriate content:</strong> Pornography, violence, hate speech strictly prohibited</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>No copyright violations:</strong> Only upload content you own or have rights to</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Follow community guidelines:</strong> Respect others, no spam or misleading content</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>Age restriction:</strong> You must be 18+ to create a monetized channel</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-red-600">⚠️</span>
                <span className="text-red-600 dark:text-red-400">
                  <strong>Violation consequences:</strong> Your channel can be banned permanently, and earnings forfeited
                </span>
              </li>
            </ul>
          </div>

          {/* Terms Acceptance */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-600"
                required
              />
              <span className="text-sm">
                I accept all <strong>Terms and Conditions</strong> and confirm that:
                <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• I am 18 years or older</li>
                  <li>• I will not upload any prohibited content</li>
                  <li>• I understand my channel can be banned for violations</li>
                  <li>• All uploaded content will be my own or properly licensed</li>
                </ul>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.agreeTerms || loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Channel...
              </span>
            ) : (
              '✓ Accept All Terms & Create Channel'
            )}
          </button>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Need help? Check our{' '}
        <a href="/about" className="text-indigo-600 hover:text-indigo-700 underline">
          Channel Guidelines
        </a>
      </div>
    </div>
  )
}
