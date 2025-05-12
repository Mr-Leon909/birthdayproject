import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import Timeline from "./sns/Timeline";
import MyPosts from "./sns/MyPosts";
import PostDetail from "./sns/PostDetail";
import Login from "./sns/Login";

export default function SNSPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sns/top" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/top" element={<Timeline />} />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/mypost/:id" element={<PostDetail />} />
      <Route path="/:userId/post/:id" element={<PostDetail />} />
    </Routes>
  );
}