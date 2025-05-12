import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Timeline from './Timeline';
import UserPosts from './UserPosts';
import PostDetail from './PostDetail';
import CreatePost from './CreatePost';
import Login from './Login';

export default function SNSPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">This is the TSUTSUJI SNS page</h1>
            <p className="mt-1 text-lg text-gray-600">思い出を載せよう</p>
            <p className="mt-2 text-sm text-gray-500">Welcome, {user?.name}!</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/top" element={<Timeline />} />
          <Route path="/myposts" element={<UserPosts userId={user?.id} />} />
          <Route path="/mypost/:id" element={<PostDetail />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/:userId/posts" element={<UserPosts />} />
          <Route path="/:userId/post/:id" element={<PostDetail />} />
          <Route path="*" element={<Navigate to="/sns/top" replace />} />
        </Routes>
      </main>
    </div>
  );
}