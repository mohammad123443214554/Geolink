'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  // UPDATED EARNING SYSTEM
  const earnings = {
    totalEarnings: 5420,
    thisMonth: 1250,
    rewardPoints: 8450,
    subscribers: 5234,
    breakdown: {
      views: 5678,      // 2 views = 1 point
      likes: 1234,      // 2 likes = 1 point
      comments: 234,    // 1 comment = 1 point
      shares: 123       // 2 shares = 1 point
    }
  }

  // Calculate points from engagement
  const calculatePoints = () => {
    const viewPoints = Math.floor(earnings.breakdown.views / 2)
    const likePoints = Math.floor(earnings.breakdown.likes / 2)
    const commentPoints = earnings.breakdown.comments
    const sharePoints = Math.floor(earnings.breakdown.shares / 2)
    return viewPoints + likePoints + commentPoints + sharePoints
  }

  const totalPoints = calculatePoints()
  const pointsToRupees = (points) => (points / 1000) * 10

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your earnings and channel performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Earnings */}
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Earnings</p>
            <span className="text-2xl">💵</span>
          </div>
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
            ₹{earnings.totalEarnings.toLocaleString()}
          </h2>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">All time</p>
        </div>

        {/* This Month */}
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">This Month</p>
            <span className="text-2xl">📈</span>
          </div>
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ₹{earnings.thisMonth.toLocaleString()}
          </h2>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">+23% from last month</p>
        </div>

        {/* Reward Points */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Reward Points</p>
            <span className="text-2xl">⭐</span>
          </div>
          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {totalPoints.toLocaleString()}
          </h2>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
            = ₹{pointsToRupees(totalPoints).toFixed(2)} (1000pts = ₹10)
          </p>
        </div>

        {/* Subscribers */}
        <div className="card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Subscribers</p>
            <span className="text-2xl">👥</span>
          </div>
          <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {earnings.subscribers.toLocaleString()}
          </h2>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
            {earnings.subscribers >= 5000 ? '✓ Earning ₹500/month!' : `${5000 - earnings.subscribers} more for bonus`}
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* This Month Breakdown */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">📊</span>
            This Month Breakdown (NEW System)
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👁️</span>
                <div>
                  <p className="font-medium">Views</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {earnings.breakdown.views.toLocaleString()} views ÷ 2 = {Math.floor(earnings.breakdown.views / 2)} points
                  </p>
                </div>
              </div>
              <span className="font-bold text-green-600">
                ₹{((Math.floor(earnings.breakdown.views / 2) / 1000) * 10).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="font-medium">Likes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {earnings.breakdown.likes.toLocaleString()} likes ÷ 2 = {Math.floor(earnings.breakdown.likes / 2)} points
                  </p>
                </div>
              </div>
              <span className="font-bold text-green-600">
                ₹{((Math.floor(earnings.breakdown.likes / 2) / 1000) * 10).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-medium">Comments</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {earnings.breakdown.comments.toLocaleString()} comments = {earnings.breakdown.comments} points
                  </p>
                </div>
              </div>
              <span className="font-bold text-green-600">
                ₹{((earnings.breakdown.comments / 1000) * 10).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-medium">Shares</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {earnings.breakdown.shares.toLocaleString()} shares ÷ 2 = {Math.floor(earnings.breakdown.shares / 2)} points
                  </p>
                </div>
              </div>
              <span className="font-bold text-green-600">
                ₹{((Math.floor(earnings.breakdown.shares / 2) / 1000) * 10).toFixed(2)}
              </span>
            </div>

            {earnings.subscribers >= 5000 && (
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900 rounded-lg border-2 border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="font-bold">Subscriber Bonus</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      5000+ subscribers milestone
                    </p>
                  </div>
                </div>
                <span className="font-bold text-green-600 text-lg">₹500.00</span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total This Month</span>
                <span className="font-bold text-2xl text-green-600">
                  ₹{earnings.thisMonth.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="space-y-6">
          {/* NEW Earning Formula Card */}
          <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold mb-3 text-yellow-900 dark:text-yellow-100 flex items-center">
              <span className="mr-2">💡</span>
              New Earning Formula
            </h3>
            <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
              <p>• <strong>2 views</strong> = 1 point</p>
              <p>• <strong>2 likes</strong> = 1 point</p>
              <p>• <strong>1 comment</strong> = 1 point</p>
              <p>• <strong>2 shares</strong> = 1 point</p>
              <p className="pt-2 border-t border-yellow-300 dark:border-yellow-700">
                • <strong>1000 points</strong> = ₹10
              </p>
              <p className="font-bold text-base">
                • <strong>5000 subscribers</strong> = ₹500/month bonus!
              </p>
            </div>
          </div>

          {/* Withdraw Card */}
          <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 border-indigo-200 dark:border-indigo-800">
            <h3 className="font-bold mb-4 text-indigo-900 dark:text-indigo-100">
              💸 Withdraw Earnings
            </h3>
            <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-4">
              Available balance: <strong className="text-lg">₹{earnings.totalEarnings.toLocaleString()}</strong>
            </p>
            <button className="w-full btn-primary mb-2">
              Withdraw to Bank Account
            </button>
            <p className="text-xs text-center text-indigo-700 dark:text-indigo-300">
              Minimum withdrawal: ₹500 • Processing time: 3-5 days
            </p>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="font-bold mb-4">📌 Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Views</span>
                <span className="font-bold">125.4K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Engagement Rate</span>
                <span className="font-bold text-green-600">8.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Best Performing Post</span>
                <span className="font-bold">12.3K views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
