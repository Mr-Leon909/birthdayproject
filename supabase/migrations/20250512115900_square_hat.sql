/*
  # Users table setup

  1. Tables
    - `users` table with basic user information
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `birthdate` (date, not null)
      - `avatar_url` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access

  3. Data
    - Insert test users if they don't exist
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

-- Drop existing policy if it exists and create new one
DO $$ 
BEGIN 
  DROP POLICY IF EXISTS "Users are viewable by everyone" ON users;
  
  CREATE POLICY "Users are viewable by everyone" 
    ON users 
    FOR SELECT 
    TO public 
    USING (true);
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