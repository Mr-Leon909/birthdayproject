import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import { format } from 'date-fns';
import { Home, PlusSquare, User, Heart, MessageCircle } from 'lucide-react';

function Login() {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/sns/timeline', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !birthdate) {
      setError('名前と生年月日を入力してください。');
      return;
    }

    try {
      const { data, error } = await login(name, birthdate);
      
      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        navigate('/sns/timeline', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('ログインに失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">TSUTSUJI</h2>
          <p className="mt-2 text-gray-600">2人だけのSNS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              placeholder="名前を入力"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              生年月日
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

function Timeline() {
  const { user, logout } = useAuth();
  const { posts, loading, toggleLike } = usePosts();
  const navigate = useNavigate();
  
  if (!user) {
    return <Navigate to="/sns" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/sns', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">TSUTSUJI</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-16 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">まだ投稿がありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {post.users.avatar_url && (
                      <img
                        src={post.users.avatar_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium">{post.users.name}</span>
                </div>
                
                <div className="aspect-square bg-black">
                  <img
                    src={post.media_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleLike(post.id, user.id)}
                      className="text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${post.likes.some(like => like.user_id === user.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">いいね {post.likes.length}件</p>
                    <p>
                      <span className="font-medium">{post.users.name}</span>
                      <span className="ml-2">{post.content}</span>
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {format(new Date(post.created_at), 'yyyy年M月d日 HH:mm')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/sns/timeline" className="text-gray-700 hover:text-gray-900">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/sns/post" className="text-gray-700 hover:text-gray-900">
              <PlusSquare className="w-6 h-6" />
            </Link>
            <Link to="/sns/profile" className="text-gray-700 hover:text-gray-900">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Profile() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/sns" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold">プロフィール</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600 mt-2">
            誕生日: {format(new Date(user.birthdate), 'yyyy年M月d日')}
          </p>
        </div>
      </div>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/sns/timeline" className="text-gray-700 hover:text-gray-900">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/sns/post" className="text-gray-700 hover:text-gray-900">
              <PlusSquare className="w-6 h-6" />
            </Link>
            <Link to="/sns/profile" className="text-gray-700 hover:text-gray-900">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function SNSPage() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/timeline" element={
        isAuthenticated ? <Timeline /> : <Navigate to="/sns" replace />
      } />
      <Route path="/profile" element={
        isAuthenticated ? <Profile /> : <Navigate to="/sns" replace />
      } />
    </Routes>
  );
}