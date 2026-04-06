'use client'

import { useState, useEffect } from 'react'

export default function RewardPoints({ points, breakdown }) {
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Calculate rupees from points (1000 points = ₹10)
  const pointsToRupees = (pts) => (pts / 1000) * 10

  // Animate total points
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = points / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setAnimatedPoints(Math.floor(increment * currentStep))
      } else {
        setAnimatedPoints(points)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [points])

  return (
    <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
          ⭐ Reward Points
        </h3>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100 font-medium"
        >
          {showBreakdown ? 'Hide' : 'Show'} Breakdown
        </button>
      </div>

      {/* Total Points Display */}
      <div className="mb-4">
        <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
          {animatedPoints.toLocaleString()}
        </div>
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          = <strong className="text-xl">₹{pointsToRupees(animatedPoints).toFixed(2)}</strong>
        </div>
        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
          (1000 points = ₹10)
        </p>
      </div>

      {/* Points Breakdown */}
      {showBreakdown && breakdown && (
        <div className="space-y-3 pt-4 border-t border-yellow-200 dark:border-yellow-800 animate-fade-in">
          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm mb-3">
            Points Breakdown:
          </h4>

          {/* Views */}
          {breakdown.views !== undefined && (
            <div className="flex items-center justify-between p-3 bg-white dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👁️</span>
                <div>
                  <p className="font-medium text-sm">Views</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {breakdown.views.toLocaleString()} views ÷ 2
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.floor(breakdown.views / 2).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          )}

          {/* Likes */}
          {breakdown.likes !== undefined && (
            <div className="flex items-center justify-between p-3 bg-white dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="font-medium text-sm">Likes</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {breakdown.likes.toLocaleString()} likes ÷ 2
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.floor(breakdown.likes / 2).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          )}

          {/* Comments */}
          {breakdown.comments !== undefined && (
            <div className="flex items-center justify-between p-3 bg-white dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-medium text-sm">Comments</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {breakdown.comments.toLocaleString()} comments
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600 dark:text-yellow-400">
                  {breakdown.comments.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          )}

          {/* Shares */}
          {breakdown.shares !== undefined && (
            <div className="flex items-center justify-between p-3 bg-white dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-medium text-sm">Shares</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {breakdown.shares.toLocaleString()} shares ÷ 2
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600 dark:text-yellow-400">
                  {Math.floor(breakdown.shares / 2).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress to Next Milestone */}
      <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
        <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">
          Progress to ₹100 (10,000 points):
        </p>
        <div className="relative w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((points / 10000) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
          {points >= 10000 ? '🎉 Milestone reached!' : `${(10000 - points).toLocaleString()} points to go`}
        </p>
      </div>
    </div>
  )
}
