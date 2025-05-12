import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';

interface UserPostsProps {
  userId?: string;
}

export default function UserPosts({ userId: propUserId }: UserPostsProps) {
  const { userId: paramUserId } = useParams();
  const { user } = useAuth();
  const userId = propUserId || paramUserId || user?.id;
  const { posts, loading, error } = usePosts({ userId });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        投稿の読み込み中にエラーが発生しました。
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center text-gray-600 py-8">
        まだ投稿がありません。
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-6">
          {post.media_url && (
            <div className="mb-4">
              <img
                src={post.media_url}
                alt="投稿画像"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          <div className="mt-4 text-sm text-gray-500">
            {new Date(post.created_at).toLocaleString('ja-JP')}
          </div>
        </div>
      ))}
    </div>
  );
}