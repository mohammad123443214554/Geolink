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
    subscribers: 1234
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">💰 Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-green-50 dark:bg-green-900">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Earnings</p>
          <h2 className="text-3xl font-bold text-green-600">₹{earnings.totalEarnings}</h2>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-300">This Month</p>
          <h2 className="text-3xl font-bold">₹{earnings.thisMonth}</h2>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-300">Reward Points</p>
          <h2 className="text-3xl font-bold text-indigo-600">{earnings.rewardPoints}</h2>
          <p className="text-xs text-gray-500 mt-1">1000 points = ₹10</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-300">Subscribers</p>
          <h2 className="text-3xl font-bold">{earnings.subscribers}</h2>
          <p className="text-xs text-green-600 mt-1">₹1000/month bonus</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">This Month Breakdown</h2>
        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span>❤️ Likes (1234 × ₹0.01)</span>
            <span className="font-bold text-green-600">₹12.34</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span>👁️ Views (5678 × ₹0.01)</span>
            <span className="font-bold text-green-600">₹56.78</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span>💬 Comments (234 × ₹0.01)</span>
            <span className="font-bold text-green-600">₹2.34</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span>🔄 Shares (123 × ₹0.01)</span>
            <span className="font-bold text-green-600">₹1.23</span>
          </div>
          <div className="flex justify-between p-3 bg-green-50 dark:bg-green-900 rounded border-2 border-green-200">
            <span className="font-bold">Subscriber Bonus (1000+)</span>
            <span className="font-bold text-green-600">₹1000</span>
          </div>
        </div>
      </div>

      <button className="btn-primary mt-6">Withdraw Earnings</button>
    </div>
  )
}
