import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">アカウント作成</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
        >
          登録
        </button>
      </form>
    </div>
  );
}

function Timeline() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">タイムライン</h2>
      {/* タイムラインの投稿を表示 */}
    </div>
  );
}

function Profile() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold">ユーザー名</h2>
        <p className="text-gray-600">自己紹介文がここに表示されます</p>
        <button className="mt-4 px-4 py-2 bg-gray-100 rounded">
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