import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { Heart, MessageCircle } from 'lucide-react';

export default function Timeline() {
  const navigate = useNavigate();
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        エラーが発生しました。もう一度お試しください。
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <div 
          key={post.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/sns/${post.user_id}/post/${post.id}`)}
        >
          {post.media_url && (
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.media_url}
                alt="投稿画像"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center mb-4">
              <img
                src={post.users?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                alt={post.users?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{post.users?.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>

            <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>

            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <Heart className="h-5 w-5" />
                <span className="text-sm">{post._count?.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{post._count?.comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {posts?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          まだ投稿がありません。
        </div>
      )}
    </div>
  );
}