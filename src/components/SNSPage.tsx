import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

function LoginPage() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await login(name, birthdate);
    
    if (error) {
      setError('ログインに失敗しました。名前と生年月日を確認してください。');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">TSUTSUJIへログイン</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              生年月日
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

function TimelinePage() {
  return <div>This is the TSUTSUJI page.</div>;
}

function MyPostsPage() {
  return <div>My Posts</div>;
}

function CreatePostPage() {
  return <div>Create Post</div>;
}

function UserPostsPage() {
  return <div>User Posts</div>;
}

function PostDetailPage() {
  return <div>Post Detail</div>;
}

export default function SNSPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sns/top" replace />} />
      <Route path="/top" element={<TimelinePage />} />
      <Route path="/myposts" element={<MyPostsPage />} />
      <Route path="/post" element={<CreatePostPage />} />
      <Route path="/mypost/:id" element={<PostDetailPage />} />
      <Route path="/:userId/posts" element={<UserPostsPage />} />
      <Route path="/:userId/post/:id" element={<PostDetailPage />} />
    </Routes>
  );
}