'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Don't show on login/signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null
  }

  const menuItems = [
    {
      section: 'Main',
      items: [
        { name: 'Home', href: '/', icon: '🏠' },
        { name: 'Search', href: '/search', icon: '🔍' },
        { name: 'Library', href: '/library', icon: '📚' },
        { name: 'Chat', href: '/chat', icon: '💬' }
      ]
    },
    {
      section: 'Content',
      items: [
        { name: 'Upload', href: '/upload', icon: '📤', showOnlyFor: 'public' },
        { name: 'My Channel', href: '/channel', icon: '📺', showOnlyFor: 'public' },
        { name: 'Dashboard', href: '/dashboard', icon: '💰', showOnlyFor: 'public' }
      ]
    },
    {
      section: 'Explore',
      items: [
        { name: 'Map', href: '/map', icon: '🗺️' },
        { name: 'About', href: '/about', icon: 'ℹ️' }
      ]
    },
    {
      section: 'Account',
      items: [
        { name: 'Profile', href: '/profile', icon: '👤' },
        { name: 'Settings', href: '/settings', icon: '⚙️' }
      ]
    }
  ]

  return (
    <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {menuItems.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                // Filter based on account type
                if (item.showOnlyFor && user?.accountType !== item.showOnlyFor) {
                  return null
                }

                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Account Type Badge */}
        {user && (
          <div className="mt-6 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{user.accountType === 'public' ? '🌍' : '🔒'}</span>
              <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                {user.accountType === 'public' ? 'Public Account' : 'Private Account'}
              </span>
            </div>
            {user.accountType === 'public' ? (
              <p className="text-xs text-indigo-700 dark:text-indigo-300">
                ✓ Earning enabled
              </p>
            ) : (
              <Link 
                href="/settings" 
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                → Convert to Public
              </Link>
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 px-3">
            © 2026 Geolink
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 px-3 mt-1">
            Made by Mohammad Khan
          </p>
        </div>
      </div>
    </aside>
  )
}
