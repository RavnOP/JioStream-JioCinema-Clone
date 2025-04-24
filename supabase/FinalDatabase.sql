-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- User watchlist
CREATE TABLE IF NOT EXISTS watchlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('movie', 'tv')),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id, content_type)
);

-- Continue watching progress
CREATE TABLE IF NOT EXISTS continue_watching (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('movie', 'tv')),
  title TEXT NOT NULL,
  poster_path TEXT,
  progress_seconds INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  season_number INTEGER,
  episode_number INTEGER,
  last_watched TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id, content_type, season_number, episode_number)
);

-- User likes
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('movie', 'tv')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id, content_type)
);

-- Watch history
CREATE TABLE IF NOT EXISTS watch_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('movie', 'tv')),
  title TEXT NOT NULL,
  poster_path TEXT,
  watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id, content_type)
);

-- User comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('movie', 'tv')),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Function to update timestamp fields
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to profiles table
CREATE TRIGGER update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Apply to comments table
CREATE TRIGGER update_comments_timestamp
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE continue_watching ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Users can view only their own profile
CREATE POLICY "User profile select" ON profiles FOR SELECT
USING (auth.uid() = id);

-- Users can update only their own profile
CREATE POLICY "User profile update" ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Users can insert only their own profile
CREATE POLICY "User profile insert" ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Watchlist policies
CREATE POLICY "User watchlist access" ON watchlist
USING (auth.uid() = user_id);

-- Continue watching policies
CREATE POLICY "User continue watching access" ON continue_watching
USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "User likes access" ON likes
USING (auth.uid() = user_id);

-- Watch history policies
CREATE POLICY "User watch history access" ON watch_history
USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Public comment view" ON comments FOR SELECT
TO authenticated USING (true);

CREATE POLICY "User comment management" ON comments
USING (auth.uid() = user_id);

-- Create demo user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@gmail.com') THEN
    INSERT INTO auth.users (
      id, email, encrypted_password, email_confirmed_at,
      confirmation_sent_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data
    )
    VALUES (
      uuid_generate_v4(), 'admin@gmail.com',
      crypt('admin@123', gen_salt('bf')),
      NOW(), NOW(), NOW(), NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"username":"admin"}'
    );

    INSERT INTO profiles (id, username, full_name, created_at, updated_at)
    SELECT id, 'admin', 'Admin User', NOW(), NOW()
    FROM auth.users
    WHERE email = 'admin@gmail.com';
  END IF;
END $$;