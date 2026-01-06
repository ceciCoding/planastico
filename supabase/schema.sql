-- Planástico Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.event_categories (
  event_id uuid NOT NULL,
  category_id integer NOT NULL,
  CONSTRAINT event_categories_pkey PRIMARY KEY (event_id, category_id),
  CONSTRAINT event_categories_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id),
  CONSTRAINT event_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.event_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  storage_path text NOT NULL,
  position integer NOT NULL CHECK ("position" >= 1 AND "position" <= 3),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT event_images_pkey PRIMARY KEY (id),
  CONSTRAINT event_images_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
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
