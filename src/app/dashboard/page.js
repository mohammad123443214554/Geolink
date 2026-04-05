'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  const earnings = {
    totalEarnings: 5420,
    thisMonth: 1250,
    rewardPoints: 8450,
    subscribers: 5234,
    breakdown: {
      views: 5678,
      likes: 1234,
      comments: 234,
      shares: 123
    }
  }

  // MINIMUM WITHDRAWAL AMOUNT
  const MIN_WITHDRAWAL = 1000
  const canWithdraw = earnings.totalEarnings >= MIN_WITHDRAWAL

  const calculatePoints = () => {
    const viewPoints = Math.floor(earnings.breakdown.views / 2)
    const likePoints = Math.floor(earnings.breakdown.likes / 2)
    const commentPoints = earnings.breakdown.comments
    const sharePoints = Math.floor(earnings.breakdown.shares / 2)
    return viewPoints + likePoints + commentPoints + sharePoints
  }

  const totalPoints = calculatePoints()
  const pointsToRupees = (points) => (points / 1000) * 10

  const handleWithdraw = () => {
    if (canWithdraw) {
      // TODO: Open withdrawal form/modal
      alert('Withdrawal feature will be available soon!')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your earnings and channel performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">📊</span>
            This Month Breakdown
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
          </div>
        </div>

        {/* Withdraw Card with Limit */}
        <div className="space-y-6">
          <div className={`card ${
            canWithdraw 
              ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 border-indigo-200 dark:border-indigo-800' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700'
          }`}>
            <h3 className={`font-bold mb-4 ${canWithdraw ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-300'}`}>
              💸 Withdraw Earnings
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Available balance:
              </p>
              <p className="text-3xl font-bold">
                ₹{earnings.totalEarnings.toLocaleString()}
              </p>
            </div>

            {!canWithdraw && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  ⚠️ Minimum Required: ₹{MIN_WITHDRAWAL}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  You need ₹{MIN_WITHDRAWAL - earnings.totalEarnings} more to withdraw
                </p>
                <div className="mt-2 w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 dark:bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${(earnings.totalEarnings / MIN_WITHDRAWAL) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button 
              onClick={handleWithdraw}
              disabled={!canWithdraw}
              className="w-full btn-primary mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canWithdraw ? 'Withdraw to Bank Account' : '🔒 Withdraw Locked'}
            </button>
            
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              {canWithdraw 
                ? 'Processing time: 3-5 business days' 
                : `Minimum withdrawal amount: ₹${MIN_WITHDRAWAL}`
              }
            </p>
          </div>

          {/* Earning Formula */}
          <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold mb-3 text-yellow-900 dark:text-yellow-100 flex items-center">
              <span className="mr-2">💡</span>
              Earning Formula
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
                • <strong>5000 subscribers</strong> = ₹500/month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
