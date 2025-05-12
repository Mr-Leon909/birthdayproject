import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Heart, MessageCircle, Plus, Home, User } from 'lucide-react';

export default function Timeline() {
  const { posts, loading, toggleLike } = usePosts();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="TSUTSUJI" 
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-2xl mx-auto pb-16">
        {/* 投稿一覧 */}
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <article key={post.id} className="bg-white p-4">
              {/* ユーザー情報 */}
              <div className="flex items-center mb-3">
                <Link to={`/sns/${post.user_id}/posts`} className="flex items-center">
                  <img
                    src={post.users.avatar_url || 'https://via.placeholder.com/40'}
                    alt={post.users.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">{post.users.name}</span>
                    <p className="text-gray-500 text-sm">
                      {format(new Date(post.created_at), 'yyyy/MM/dd HH:mm')}
                    </p>
                  </div>
                </Link>
              </div>

              {/* 投稿内容 */}
              <Link to={`/sns/${post.user_id}/post/${post.id}`}>
                <img
                  src={post.media_url}
                  alt="投稿画像"
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                {post.content && (
                  <p className="text-gray-800 mb-3">{post.content}</p>
                )}
              </Link>

              {/* アクション */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => user && toggleLike(post.id, user.id)}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      post.likes.some((like) => like.user_id === user?.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }`}
                  />
                  <span>{post.likes.length}</span>
                </button>
                <Link
                  to={`/sns/${post.user_id}/post/${post.id}`}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>{post.comments.length}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ナビゲーションバー */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/sns/top" className="text-gray-500 hover:text-gray-900">
              <Home className="h-6 w-6" />
            </Link>
            <Link
              to="/sns/post"
              className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 -mt-8"
            >
              <Plus className="h-6 w-6" />
            </Link>
            <Link to="/sns/myposts" className="text-gray-500 hover:text-gray-900">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}