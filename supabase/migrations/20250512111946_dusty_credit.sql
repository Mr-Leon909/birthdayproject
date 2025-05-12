/*
  # Update users table and policies

  1. Tables
    - Ensures users table exists with required columns
    - Adds unique constraint on name and birthdate
  
  2. Security
    - Enables RLS on users table
    - Adds policy for public viewing if not exists
  
  3. Data
    - Inserts test users if they don't exist
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

-- Create policy if it doesn't exist
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

  IF NOT EXISTS (SELECT 1 FROM users WHERE name = 'ひびき' AND birthdate = '1996-11-13') THEN
    INSERT INTO users (name, birthdate) 
    VALUES ('ひびき', '1996-11-13');
  END IF;
END $$;