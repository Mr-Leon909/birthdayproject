import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { MessageCircle, Heart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Comment {
  id: string;
  content: string;
  user: {
    name: string;
    avatar_url: string | null;
  };
  created_at: string;
}

interface Post {
  id: string;
  content: string;
  media_url: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  likes: number;
  comments: Comment[];
  user_has_liked: boolean;
}

export default function PostDetail() {
  const { id, userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data: post, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:user_id (
            id,
            name,
            avatar_url
          ),
          likes:likes (count),
          comments:comments (
            id,
            content,
            created_at,
            user:user_id (
              name,
              avatar_url
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Check if the current user has liked the post
      const { data: userLike } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', id)
        .eq('user_id', user?.id)
        .single();

      setPost({
        ...post,
        likes: post.likes[0]?.count || 0,
        user_has_liked: !!userLike,
      });
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;

    try {
      if (post.user_has_liked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user?.id);

        setPost({
          ...post,
          likes: post.likes - 1,
          user_has_liked: false,
        });
      } else {
        await supabase
          .from('likes')
          .insert({ post_id: post.id, user_id: user?.id });

        setPost({
          ...post,
          likes: post.likes + 1,
          user_has_liked: true,
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;

    try {
      const { data: comment, error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: user?.id,
          content: newComment.trim(),
        })
        .select(`
          id,
          content,
          created_at,
          user:user_id (
            name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      setPost({
        ...post,
        comments: [...post.comments, comment],
      });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-600">投稿が見つかりませんでした。</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        戻る
      </button>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <img
              src={post.user.avatar_url || 'https://via.placeholder.com/40'}
              alt={post.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Link
              to={`/sns/${post.user.id}/posts`}
              className="font-medium text-gray-800 hover:text-blue-500"
            >
              {post.user.name}
            </Link>
          </div>

          <img
            src={post.media_url}
            alt="Post"
            className="w-full rounded-lg mb-4"
          />

          <p className="text-gray-800 mb-4">{post.content}</p>

          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                post.user_has_liked ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-500`}
            >
              <Heart
                className={`w-5 h-5 ${post.user_has_liked ? 'fill-current' : ''}`}
              />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </div>
          </div>

          <form onSubmit={handleComment} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを追加..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                投稿
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.user.avatar_url || 'https://via.placeholder.com/32'}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800">{comment.user.name}</p>
                  <p className="text-gray-600">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleString('ja-JP')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}