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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">TSUTSUJI</h1>
        <Link
          to="/sns/post"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          投稿する
        </Link>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img
                  src={post.users.avatar_url || 'https://via.placeholder.com/40'}
                  alt={post.users.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <Link
                    to={`/sns/${post.users.id}/posts`}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    {post.users.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {format(new Date(post.created_at), 'yyyy/MM/dd HH:mm')}
                  </p>
                </div>
              </div>

              <Link to={`/sns/${post.users.id}/post/${post.id}`}>
                <img
                  src={post.media_url}
                  alt="投稿画像"
                  className="w-full h-96 object-cover mb-4"
                />
                {post.content && (
                  <p className="text-gray-800 mb-4">{post.content}</p>
                )}
              </Link>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => user && toggleLike(post.id, user.id)}
                  className="flex items-center text-gray-500 hover:text-red-500"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      post.likes.some((like) => like.user_id === user?.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }`}
                  />
                  <span className="ml-1">{post.likes.length}</span>
                </button>
                <Link
                  to={`/sns/${post.users.id}/post/${post.id}`}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <MessageCircle className="h-5 w-5" />
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