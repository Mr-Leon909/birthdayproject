import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useAuth() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const login = async (name: string, birthdate: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('name', name)
        .eq('birthdate', birthdate)
        .single();

      if (error) {
        console.error('Login error:', error);
        return { data: null, error };
      }

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { data: null, error };
    }
  };

  const logout = () => {
    setProfile(null);
  };

  return {
    profile,
    login,
    logout
  };
}