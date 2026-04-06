'use client'

import { useState } from 'react'

export default function AnalyticsChart({ data, type = 'views' }) {
  const [period, setPeriod] = useState('7days') // '7days', '30days', '90days'

  // Demo data (in production, this will come from backend)
  const chartData = data || {
    '7days': [120, 150, 180, 200, 170, 220, 250],
    '30days': Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 300) + 100),
    '90days': Array.from({ length: 90 }, (_, i) => Math.floor(Math.random() * 400) + 100)
  }

  const currentData = chartData[period] || chartData['7days']
  const maxValue = Math.max(...currentData)

  const labels = {
    '7days': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    '30days': Array.from({ length: 30 }, (_, i) => i + 1),
    '90days': Array.from({ length: 90 }, (_, i) => i + 1)
  }

  const getChartColor = () => {
    switch (type) {
      case 'views': return 'text-blue-600 dark:text-blue-400'
      case 'likes': return 'text-red-600 dark:text-red-400'
      case 'earnings': return 'text-green-600 dark:text-green-400'
      default: return 'text-indigo-600 dark:text-indigo-400'
    }
  }

  const getBarColor = () => {
    switch (type) {
      case 'views': return 'bg-blue-500'
      case 'likes': return 'bg-red-500'
      case 'earnings': return 'bg-green-500'
      default: return 'bg-indigo-500'
    }
  }

  const getGradientColor = () => {
    switch (type) {
      case 'views': return 'from-blue-500 to-cyan-500'
      case 'likes': return 'from-red-500 to-pink-500'
      case 'earnings': return 'from-green-500 to-emerald-500'
      default: return 'from-indigo-500 to-purple-500'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'views': return '👁️'
      case 'likes': return '❤️'
      case 'earnings': return '💰'
      default: return '📊'
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'views': return 'Views Analytics'
      case 'likes': return 'Likes Analytics'
      case 'earnings': return 'Earnings Analytics'
      default: return 'Analytics'
    }
  }

  return (
    <div className="card hover:shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center space-x-2">
          <span className="text-2xl">{getIcon()}</span>
          <span>{getTitle()}</span>
        </h3>

        {/* Period Selector */}
        <div className="flex space-x-2">
          <button
            onClick={() => setPeriod('7days')}
            className={`px-3 py-1 text-sm rounded-lg transition ${
              period === '7days'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod('30days')}
            className={`px-3 py-1 text-sm rounded-lg transition ${
              period === '30days'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setPeriod('90days')}
            className={`px-3 py-1 text-sm rounded-lg transition ${
              period === '90days'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-2xl font-bold">{currentData.reduce((a, b) => a + b, 0).toLocaleString()}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-2xl font-bold">{Math.floor(currentData.reduce((a, b) => a + b, 0) / currentData.length).toLocaleString()}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Average</p>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-2xl font-bold">{Math.max(...currentData).toLocaleString()}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Peak</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <div className="flex items-end justify-between h-full space-x-1">
          {currentData.map((value, index) => {
            const height = (value / maxValue) * 100
            const isToday = period === '7days' && index === currentData.length - 1

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group cursor-pointer"
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black text-xs px-2 py-1 rounded whitespace-nowrap">
                  {value.toLocaleString()}
                </div>

                {/* Bar */}
                <div
                  className={`w-full bg-gradient-to-t ${getGradientColor()} rounded-t transition-all duration-500 hover:opacity-80 ${
                    isToday ? 'ring-2 ring-offset-2 ring-indigo-600' : ''
                  }`}
                  style={{ height: `${height}%` }}
                ></div>

                {/* Label */}
                {period === '7days' && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {labels[period][index]}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
          <span>{maxValue.toLocaleString()}</span>
          <span>{Math.floor(maxValue / 2).toLocaleString()}</span>
          <span>0</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getGradientColor()}`}></div>
            <span>{getTitle()}</span>
          </div>
          <span className="text-xs">
            {period === '7days' ? 'Last 7 days' : period === '30days' ? 'Last 30 days' : 'Last 90 days'}
          </span>
        </div>
      </div>
    </div>
  )
}
