import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import { Link } from 'react-router-dom';
import { Camera, Heart, MessageCircle } from 'lucide-react';

export default function MyPosts() {
  const { user } = useAuth();
  const { posts, loading } = usePosts({ userId: user?.id });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 text-center">
          <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">まだ投稿がありません</h2>
          <p className="text-gray-500 mb-4">最初の思い出を共有しましょう！</p>
          <Link
            to="/sns/post"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            投稿を作成
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/sns/mypost/${post.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={post.media_url}
                  alt="投稿画像"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex items-center text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes_count || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments_count || 0}</span>
                </div>
                <span className="text-sm">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}