-- ============================================================================
-- HayotRitmi - Supabase Complete Postgres Database Schema
-- Paste this script into your Supabase SQL Editor (https://app.supabase.com)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan_tier TEXT DEFAULT 'free', -- 'free' | 'pro'
  telegram_id TEXT,
  streak_count INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DAILY LOGS TABLE (Water, Meds, Sleep, Exercise)
CREATE TABLE IF NOT EXISTS public.daily_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  log_date DATE DEFAULT CURRENT_DATE NOT NULL,
  water_ml INT DEFAULT 0,
  exercise_mins INT DEFAULT 0,
  sleep_hours NUMERIC(3,1) DEFAULT 0.0,
  medications_json JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, log_date)
);

-- 3. VITALITY TREE TABLE
CREATE TABLE IF NOT EXISTS public.vitality_tree (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stage TEXT DEFAULT 'urug', -- 'urug' | 'nihol' | 'kattalashgan' | 'gullagan'
  level INT DEFAULT 1,
  progress_percent INT DEFAULT 25,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SPORTS ORDERS TABLE (Sports Store Purchases)
CREATE TABLE IF NOT EXISTS public.sports_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cart_items JSONB NOT NULL,
  subtotal_uzs INT NOT NULL,
  discount_uzs INT DEFAULT 0,
  total_uzs INT NOT NULL,
  status TEXT DEFAULT 'completed', -- 'pending' | 'completed' | 'delivered'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitality_tree ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_orders ENABLE ROW LEVEL SECURITY;

-- Profiles Policy: Users can view and update their own profile
CREATE POLICY "Public profiles read policy" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Daily Logs Policy: Users read/write their own logs
CREATE POLICY "Users read own daily logs" ON public.daily_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own daily logs" ON public.daily_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own daily logs" ON public.daily_logs FOR UPDATE USING (auth.uid() = user_id);

-- Vitality Tree Policy: Users manage their tree
CREATE POLICY "Users read own tree" ON public.vitality_tree FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own tree" ON public.vitality_tree FOR ALL USING (auth.uid() = user_id);

-- Orders Policy: Users read their orders
CREATE POLICY "Users read own orders" ON public.sports_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert orders" ON public.sports_orders FOR INSERT WITH CHECK (true);

-- ============================================================================
-- Automatic Profile Creation Trigger on Auth Signup
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.vitality_tree (user_id)
  VALUES (new.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
