'use client'

import { useState, useEffect } from 'react'
import PostCard from '@/components/posts/PostCard'
import Loading from '@/components/common/Loading'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/signup')
      return
    }
    loadPosts()
  }, [user])

  const loadPosts = async () => {
    setLoading(true)
    const demoData = [
      {
        id: 1,
        type: 'video',
        user: {
          username: 'mohammad_khan',
          avatar: '/images/default-avatar.png',
          channelName: 'Tech With MK'
        },
        content: {
          url: 'https://example.com/video1.mp4',
          thumbnail: '/images/placeholder.png',
          caption: 'Amazing sunset view! 🌅'
        },
        stats: {
          likes: 1234,
          comments: 45,
          shares: 23,
          views: 5678
        },
        timestamp: '2 hours ago'
      }
    ]
    setTimeout(() => {
      setPosts(demoData)
      setLoading(false)
    }, 1000)
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Home Feed</h1>
        <p className="text-gray-600 dark:text-gray-400">Latest posts from people you follow</p>
      </div>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Start following people!</p>
          </div>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
      {posts.length > 0 && (
        <div className="mt-8 text-center">
          <button onClick={loadPosts} className="btn-primary">Load More</button>
        </div>
      )}
    </div>
  )
}
