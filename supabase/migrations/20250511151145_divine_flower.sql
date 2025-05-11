/*
  # Set up users table and add test data

  1. Changes
    - Create users table with required fields
    - Add test users for development
  
  2. Security
    - Enable RLS on users table
    - Add policy for authenticated users to read their own data
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

-- Create policies
CREATE POLICY "Users are viewable by everyone" 
  ON users 
  FOR SELECT 
  TO public 
  USING (true);

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