'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    contact: '', // Phone or Email
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.contact || !formData.password) {
      setError('Please enter both fields')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      login({
        username: 'mohammad_khan',
        email: formData.contact,
        accountType: 'public'
      })
      setLoading(false)
      router.push('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Image 
            src="/logo.png" 
            alt="Geolink" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Login to continue earning!
          </p>
        </div>

        {/* Card */}
        <div className="card">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number or Email
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your phone or email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your password"
                required
              />
              <Link 
                href="/forgot-password" 
                className="text-xs text-indigo-600 hover:text-indigo-700 mt-1 inline-block"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Signup Link */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
