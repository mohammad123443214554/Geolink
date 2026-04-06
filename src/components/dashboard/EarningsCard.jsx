'use client'

import { useState, useEffect } from 'react'

export default function EarningsCard({ amount, label, icon, color = 'indigo', percentage }) {
  const [animatedAmount, setAnimatedAmount] = useState(0)

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1500
    const steps = 50
    const increment = amount / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setAnimatedAmount(Math.floor(increment * currentStep))
      } else {
        setAnimatedAmount(amount)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [amount])

  const colorClasses = {
    green: {
      bg: 'from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-600 dark:text-green-400',
      label: 'text-green-800 dark:text-green-200'
    },
    blue: {
      bg: 'from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-600 dark:text-blue-400',
      label: 'text-blue-800 dark:text-blue-200'
    },
    purple: {
      bg: 'from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-600 dark:text-purple-400',
      label: 'text-purple-800 dark:text-purple-200'
    },
    orange: {
      bg: 'from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-600 dark:text-orange-400',
      label: 'text-orange-800 dark:text-orange-200'
    },
    indigo: {
      bg: 'from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900',
      border: 'border-indigo-200 dark:border-indigo-800',
      text: 'text-indigo-600 dark:text-indigo-400',
      label: 'text-indigo-800 dark:text-indigo-200'
    }
  }

  const colors = colorClasses[color] || colorClasses.indigo

  return (
    <div className={`relative overflow-hidden rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-6 hover:shadow-xl transition-all cursor-pointer group`}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="currentColor" className={colors.text} />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <p className={`text-sm font-medium ${colors.label}`}>{label}</p>
        <span className="text-3xl transform group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>

      {/* Amount */}
      <h2 className={`text-4xl font-bold mb-2 ${colors.text} relative z-10`}>
        ₹{animatedAmount.toLocaleString()}
      </h2>

      {/* Percentage Change */}
      {percentage !== undefined && (
        <div className="relative z-10">
          <div className={`inline-flex items-center space-x-1 text-sm ${percentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <svg className={`w-4 h-4 ${percentage >= 0 ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="font-medium">{Math.abs(percentage)}%</span>
            <span className="text-gray-600 dark:text-gray-400">from last month</span>
          </div>
        </div>
      )}

      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  )
}
