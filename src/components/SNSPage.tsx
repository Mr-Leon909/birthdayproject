import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await login(name, birthdate);
    
    if (error) {
      console.error('Login error:', error);
      setError('ログインに失敗しました。名前と生年月日を確認してください。');
      return;
    }

    if (data) {
      navigate('/sns/timeline');
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
          />
        </div>
        <div>
          <label className="block mb-2 text-black">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-black"
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
  
  if (!user) {
    return <Navigate to="/sns" />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-black">タイムライン</h2>
      <p className="text-black">ようこそ、{user.name}さん</p>
    </div>
  );
}

function Profile() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/sns" />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-black">{user.name}</h2>
        <p className="text-gray-600">自己紹介文がここに表示されます</p>
        <button className="mt-4 px-4 py-2 bg-gray-100 rounded text-black">
          プロフィール編集
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {/* 投稿した写真一覧 */}
      </div>
    </div>
  );
}

export default function SNSPage() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}