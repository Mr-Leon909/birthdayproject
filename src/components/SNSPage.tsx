import { useState } from 'react';
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
  const { login, user } = useAuth();

  // If user is already logged in, redirect to timeline
  if (user) {
    return <Navigate to="/sns/timeline" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !birthdate) {
      setError('名前と生年月日を入力してください。');
      return;
    }

    try {
      const { data, error } = await login(name, birthdate);
      
      if (error) {
        console.error('Login error:', error);
        setError('ログインに失敗しました。名前と生年月日を確認してください。');
        return;
      }

      if (data) {
        navigate('/sns/timeline', { replace: true });
      } else {
        setError('ユーザーが見つかりません。');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('ログインに失敗しました。');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-black">ログイン</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-black">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-black"
            placeholder="名前を入力"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-black">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-black"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}

function Timeline() {
  const { user } = useAuth();
  const { posts, loading, toggleLike } = usePosts();
  
  if (!user) {
    return <Navigate to="/sns" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <img 
            src="/assets/tsutsuji-logo.png" 
            alt="TSUTSUJI" 
            className="h-8"
          />
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
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
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
                      <Heart className="w-6 h-6" />
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
            <Link to="/sns/myposts" className="text-gray-700 hover:text-gray-900">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function SNSPage() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  );
}