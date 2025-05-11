import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Post = Database['public']['Tables']['posts']['Row'] & {
  users: Database['public']['Tables']['users']['Row'];
  likes: Database['public']['Tables']['likes']['Row'][];
  comments: Database['public']['Tables']['comments']['Row'][];
};

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users (*),
          likes (*),
          comments (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    toggleLike,
    fetchPosts
  };
}