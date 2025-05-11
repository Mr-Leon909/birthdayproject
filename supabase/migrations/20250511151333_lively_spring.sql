/*
  # Update users table and policies

  1. Changes
    - Ensures users table exists with correct schema
    - Adds unique constraint on name and birthdate
    - Safely handles existing RLS policies
    - Adds test user data

  2. Security
    - Enables RLS on users table
    - Adds policy for public read access
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birthdate date NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, birthdate)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Safely create policy if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Users are viewable by everyone'
  ) THEN
    CREATE POLICY "Users are viewable by everyone" 
      ON users 
      FOR SELECT 
      TO public 
      USING (true);
  END IF;
END $$;

-- Insert test users if they don't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM users WHERE name = 'あすか' AND birthdate = '1995-05-18') THEN
    INSERT INTO users (name, birthdate) 
    VALUES ('あすか', '1995-05-18');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM users WHERE name = 'ひびき' AND birthdate = '1995-01-01') THEN
    INSERT INTO users (name, birthdate) 
    VALUES ('ひびき', '1995-01-01');
  END IF;
END $$;