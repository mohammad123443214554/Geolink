'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Details, 2: OTP, 3: Account Type
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '', // Phone or Email
    password: '',
    contactType: 'phone', // 'phone' or 'email'
    otp: '',
    accountType: '' // 'private' or 'public'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Detect if input is phone or email
  const detectContactType = (value) => {
    const isPhone = /^\d+$/.test(value)
    setFormData({
      ...formData,
      contact: value,
      contactType: isPhone ? 'phone' : 'email'
    })
  }

  // Step 1: Submit basic details and send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name')
      return
    }

    if (!formData.contact) {
      setError('Please enter phone number or email')
      return
    }

    if (!formData.password || formData.password.length < 8) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number and special character')
      return
    }

    setLoading(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false)
      setStep(2)
      alert(`6-digit OTP sent to your ${formData.contactType === 'phone' ? 'phone' : 'email'}!`)
    }, 1500)
  }

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.otp.length !== 6) {
      setError('Please enter 6-digit OTP')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 1000)
  }

  // Step 3: Select account type and complete signup
  const handleCompleteSignup = async (accountType) => {
    setFormData({ ...formData, accountType })
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      alert('Account created successfully! 🎉')
      router.push('/')
    }, 1500)
  }

  // Generate strong password suggestion
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, password })
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
          <h1 className="text-3xl font-bold">Join Geolink</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create account and start earning!
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
              3
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="card">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Mohammad"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Khan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number or Email
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={(e) => detectContactType(e.target.value)}
                  className="input-field"
                  placeholder="1234567890 or email@example.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.contactType === 'phone' ? '📱 Phone number detected' : '📧 Email detected'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter strong password"
                  required
                />
                <button
                  type="button"
                  onClick={generateStrongPassword}
                  className="text-xs text-indigo-600 hover:text-indigo-700 mt-1"
                >
                  🔐 Generate strong password
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  6-digit code sent to your {formData.contactType === 'phone' ? 'phone' : 'email'}
                </p>
                <p className="font-medium mt-1">{formData.contact}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  className="input-field text-center text-2xl tracking-widest"
                  placeholder="000000"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full btn-secondary text-sm"
              >
                ← Back
              </button>
            </form>
          )}

          {/* STEP 3: Account Type Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center mb-6">
                Choose Account Type
              </h2>

              {/* Private Account */}
              <button
                onClick={() => handleCompleteSignup('private')}
                disabled={loading}
                className="w-full p-6 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:border-indigo-600 dark:hover:border-indigo-600 transition text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🔒</div>
                  <div>
                    <h3 className="font-bold text-lg">Private Account</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Use Geolink only for chatting with friends. No earning features.
                    </p>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                      <li>✓ Chat with friends</li>
                      <li>✓ View content</li>
                      <li>✗ Cannot create channel</li>
                      <li>✗ Cannot earn money</li>
                    </ul>
                  </div>
                </div>
              </button>

              {/* Public Account */}
              <button
                onClick={() => handleCompleteSignup('public')}
                disabled={loading}
                className="w-full p-6 border-2 border-indigo-600 dark:border-indigo-600 rounded-xl bg-indigo-50 dark:bg-indigo-950 transition text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">💰</div>
                  <div>
                    <h3 className="font-bold text-lg">Public Account</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Create channel, upload content and earn money from likes, views & subscribers!
                    </p>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                      <li>✓ All private features</li>
                      <li>✓ Create channel</li>
                      <li>✓ Upload videos/photos</li>
                      <li>✓ Earn from engagement</li>
                      <li>✓ Dashboard & analytics</li>
                    </ul>
                  </div>
                </div>
              </button>

              {loading && (
                <div className="text-center text-sm text-gray-500">
                  Creating your account...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
