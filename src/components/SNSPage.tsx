import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Timeline from './sns/Timeline';
import MyPosts from './sns/MyPosts';
import PostDetail from './sns/PostDetail';
import CreatePost from './sns/CreatePost';
import UserPosts from './sns/UserPosts';
import Login from './sns/Login';

export default function SNSPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/sns/top" replace />} />
        <Route path="/top" element={<Timeline />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/mypost/:id" element={<PostDetail />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/:userId/posts" element={<UserPosts />} />
        <Route path="/:userId/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}