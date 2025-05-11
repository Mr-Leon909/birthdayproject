import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

export function useAuth() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (name: string, birthdate: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('name', name)
        .eq('birthdate', birthdate)
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const logout = () => {
    setProfile(null);
  };

  return {
    profile,
    loading,
    login,
    logout
  };
}