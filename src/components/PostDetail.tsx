import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Heart, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  user: {
    name: string;
    avatar_url: string | null;
  };
}

interface Post {
  id: string;
  content: string;
  media_url: string;
  created_at: string;
  user_id: string;
  user: {
    name: string;
    avatar_url: string | null;
  };
  likes: { id: string; user_id: string }[];
  comments: Comment[];
}

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(name, avatar_url),
          likes(id, user_id),
          comments(
            id,
            content,
            user_id,
            created_at,
            user:users(name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLike() {
    if (!user || !post) return;

    const hasLiked = post.likes.some(like => like.user_id === user.id);

    if (hasLiked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.id);

      if (error) {
        setError('いいねの削除に失敗しました');
        return;
      }

      setPost({
        ...post,
        likes: post.likes.filter(like => like.user_id !== user.id)
      });
    } else {
      const { error } = await supabase
        .from('likes')
        .insert({ post_id: post.id, user_id: user.id });

      if (error) {
        setError('いいねの追加に失敗しました');
        return;
      }

      setPost({
        ...post,
        likes: [...post.likes, { id: 'temp', user_id: user.id }]
      });
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !post || !newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: user.id,
          content: newComment.trim()
        })
        .select(`
          id,
          content,
          user_id,
          created_at,
          user:users(name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setPost({
        ...post,
        comments: [...post.comments, data]
      });
      setNewComment('');
    } catch (err) {
      setError('コメントの投稿に失敗しました');
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">投稿が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={post.user.avatar_url || 'https://via.placeholder.com/40'}
            alt={post.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('ja-JP')}
            </p>
          </div>
        </div>

        {post.media_url && (
          <img
            src={post.media_url}
            alt="投稿画像"
            className="w-full h-auto rounded-lg mb-4"
          />
        )}

        <p className="text-gray-800 mb-4">{post.content}</p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-purple-500"
          >
            <Heart
              className={`w-5 h-5 ${
                post.likes.some(like => like.user_id === user?.id)
                  ? 'fill-purple-500 text-purple-500'
                  : ''
              }`}
            />
            <span>{post.likes.length}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">コメント</h3>
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを追加..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                投稿
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.user.avatar_url || 'https://via.placeholder.com/32'}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{comment.user.name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}