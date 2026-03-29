-- Planástico Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

-- Extensions
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Generates a URL-safe slug from a plan name, appending a counter on collision
CREATE OR REPLACE FUNCTION generate_unique_slug(base_name text)
RETURNS text
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  base_slug text;
  candidate text;
  counter   int := 0;
BEGIN
  base_slug := lower(
    regexp_replace(
      regexp_replace(unaccent(base_name), '[^a-zA-Z0-9\s]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
  base_slug := trim(both '-' from base_slug);
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  IF base_slug = '' THEN base_slug := 'plan'; END IF;

  candidate := base_slug;
  WHILE EXISTS (SELECT 1 FROM plans WHERE slug = candidate) LOOP
    counter   := counter + 1;
    candidate := base_slug || '-' || counter;
  END LOOP;

  RETURN candidate;
END;
$$;

CREATE TABLE public.categories (
  id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.plan_categories (
  plan_id uuid NOT NULL,
  category_id integer NOT NULL,
  CONSTRAINT plan_categories_pkey PRIMARY KEY (plan_id, category_id),
  CONSTRAINT plan_categories_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id),
  CONSTRAINT plan_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.plan_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL,
  storage_path text NOT NULL,
  position integer NOT NULL CHECK ("position" >= 1 AND "position" <= 3),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT plan_images_pkey PRIMARY KEY (id),
  CONSTRAINT plan_images_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id)
);
CREATE TABLE public.plans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL CHECK (char_length(name) <= 70),
  description text NOT NULL CHECK (char_length(description) <= 3000),
  address text CHECK (char_length(address) <= 400),
  place text NOT NULL CHECK (place = ANY (ARRAY['in-person'::text, 'online'::text, 'hybrid'::text])),
  meeting_link text,
  frequency text NOT NULL CHECK (frequency = ANY (ARRAY['once'::text, 'recurring'::text])),
  start_date date NOT NULL,
  end_date date,
  start_time time without time zone,
  end_time time without time zone,
  cost text NOT NULL CHECK (cost = ANY (ARRAY['free'::text, 'pay-what-you-want'::text, 'fixed-price'::text])),
  price numeric,
  contact_email text,
  validation_email text,
  validation_code text,
  validated boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  extra_links jsonb DEFAULT '[]'::jsonb,
  recurrency ARRAY CHECK (recurrency IS NULL OR recurrency <@ ARRAY[0, 1, 2, 3, 4, 5, 6] AND array_length(recurrency, 1) > 0),
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.saved_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plan_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT saved_plans_pkey PRIMARY KEY (id),
  CONSTRAINT saved_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT saved_plans_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id),
  CONSTRAINT saved_plans_unique UNIQUE (user_id, plan_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- All tables have RLS enabled. Default deny — access only via explicit policies.
-- The create_plan_with_images RPC uses SECURITY DEFINER and bypasses RLS,
-- so INSERT policies on plans/plan_categories/plan_images are intentionally absent.

-- categories: public read only
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_read" ON public.categories
  FOR SELECT USING (true);

-- plans: public can read validated plans; authenticated owners can read/update/delete their own
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "plans_public_read" ON public.plans
  FOR SELECT USING (validated = true);

CREATE POLICY "plans_owner_read" ON public.plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "plans_owner_update" ON public.plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "plans_owner_delete" ON public.plans
  FOR DELETE USING (auth.uid() = user_id);

-- plan_categories: public read only (writes managed via RPC)
ALTER TABLE public.plan_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "plan_categories_public_read" ON public.plan_categories
  FOR SELECT USING (true);

-- plan_images: public read only (writes managed via RPC)
ALTER TABLE public.plan_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "plan_images_public_read" ON public.plan_images
  FOR SELECT USING (true);

-- saved_plans: users can only see and manage their own entries
ALTER TABLE public.saved_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saved_plans_owner_select" ON public.saved_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "saved_plans_owner_insert" ON public.saved_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_plans_owner_delete" ON public.saved_plans
  FOR DELETE USING (auth.uid() = user_id);
