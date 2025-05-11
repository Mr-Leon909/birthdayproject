import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type User = Database['public']['Tables']['users']['Row'];

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (name: string, birthdate: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('name', name)
        .eq('birthdate', birthdate)
        .single();

      if (error) {
        console.error('Login error:', error);
        return { data: null, error };
      }

      if (data) {
        setUser(data);
        return { data, error: null };
      }

      return { data: null, error: new Error('User not found') };
    } catch (error) {
      console.error('Login error:', error);
      return { data: null, error };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout
  };
}