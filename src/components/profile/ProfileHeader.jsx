'use client'

import { useState } from 'react'
import Image from 'next/image'
import CoverPhoto from './CoverPhoto'
import ProfilePicture from './ProfilePicture'
import FollowButton from './FollowButton'

export default function ProfileHeader({ user, isOwnProfile = false, stats }) {
  const [showEditCover, setShowEditCover] = useState(false)
  const [showEditPicture, setShowEditPicture] = useState(false)

  return (
    <div className="relative">
      {/* Cover Photo */}
      <CoverPhoto 
        coverUrl={user?.coverPhoto || '/images/default-cover.jpg'}
        isEditable={isOwnProfile}
        onEdit={() => setShowEditCover(true)}
      />

      {/* Profile Info Section */}
      <div className="px-4 sm:px-6 pb-6">
        {/* Profile Picture */}
        <div className="relative -mt-16 mb-4">
          <ProfilePicture
            avatarUrl={user?.avatar || '/images/default-avatar.png'}
            username={user?.username || 'User'}
            isEditable={isOwnProfile}
            onEdit={() => setShowEditPicture(true)}
          />
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            {user?.fullName || user?.username || 'User'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            @{user?.username || 'username'}
          </p>

          {/* Bio */}
          {user?.bio && (
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex justify-center sm:justify-start space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {stats?.posts || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center cursor-pointer hover:opacity-80 transition">
              <div className="text-2xl font-bold">
                {stats?.followers?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center cursor-pointer hover:opacity-80 transition">
              <div className="text-2xl font-bold">
                {stats?.following?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center sm:justify-start space-x-3">
            {isOwnProfile ? (
              <>
                <button className="btn-primary">
                  Edit Profile
                </button>
                {user?.accountType === 'public' && (
                  <button className="btn-secondary">
                    View Channel
                  </button>
                )}
                <button className="btn-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <FollowButton userId={user?.id} initialFollowing={false} />
                <button className="btn-secondary">
                  Message
                </button>
                <button className="btn-secondary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Account Type Badge */}
          {user?.accountType && (
            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-full text-sm">
              <span className="text-lg">
                {user.accountType === 'public' ? '🌍' : '🔒'}
              </span>
              <span className="font-medium">
                {user.accountType === 'public' ? 'Public Account' : 'Private Account'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modals */}
      {showEditCover && (
        <div className="modal-overlay" onClick={() => setShowEditCover(false)}>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Change Cover Photo</h3>
            <input type="file" accept="image/*" className="w-full mb-4" />
            <div className="flex space-x-3">
              <button onClick={() => setShowEditCover(false)} className="flex-1 btn-secondary">
                Cancel
              </button>
              <button className="flex-1 btn-primary">Upload</button>
            </div>
          </div>
        </div>
      )}

      {showEditPicture && (
        <div className="modal-overlay" onClick={() => setShowEditPicture(false)}>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Change Profile Picture</h3>
            <input type="file" accept="image/*" className="w-full mb-4" />
            <div className="flex space-x-3">
              <button onClick={() => setShowEditPicture(false)} className="flex-1 btn-secondary">
                Cancel
              </button>
              <button className="flex-1 btn-primary">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
