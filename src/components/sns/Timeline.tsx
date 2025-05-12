import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Heart, MessageCircle, Plus } from 'lucide-react';

export default function Timeline() {
  const { posts, loading, toggleLike } = usePosts();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">タイムライン</h1>
        <Link
          to="/sns/post"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          投稿する
        </Link>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src={post.media_url}
              alt=""
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center">
                <img
                  src={post.users.avatar_url || 'https://via.placeholder.com/40'}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {post.users.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(post.created_at), 'yyyy/MM/dd HH:mm')}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{post.content}</p>
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => user && toggleLike(post.id, user.id)}
                  className="flex items-center text-gray-500 hover:text-red-500"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      post.likes.some((like) => like.user_id === user?.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }`}
                  />
                  <span className="ml-1">{post.likes.length}</span>
                </button>
                <Link
                  to={`/sns/${post.user_id}/post/${post.id}`}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="ml-1">{post.comments.length}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}