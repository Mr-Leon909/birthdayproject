import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Post, Profile, Like, Comment } from '../lib/supabase';

interface PostWithDetails extends Post {
  profiles: Profile;
  likes: Like[];
  comments: Comment[];
}

export function usePosts() {
  const [posts, setPosts] = useState<PostWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (*),
          likes (*),
          comments (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (userId: string, content: string, mediaUrl: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ user_id: userId, content, media_url: mediaUrl }])
        .select()
        .single();

      if (error) throw error;
      await fetchPosts();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const toggleLike = async (postId: string, userId: string) => {
    try {
      const { data: existingLike } = await supabase
        .from('likes')
        .select()
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (existingLike) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);
      } else {
        await supabase
          .from('likes')
          .insert([{ post_id: postId, user_id: userId }]);
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const addComment = async (postId: string, userId: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ post_id: postId, user_id: userId, content }])
        .select()
        .single();

      if (error) throw error;
      await fetchPosts();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    addComment
  };
}