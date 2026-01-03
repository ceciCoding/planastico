-- Planástico Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create categories table
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location_type TEXT CHECK (location_type IN ('in-person', 'online', 'hybrid')),
  location TEXT,
  online_url TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  start_date DATE,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  weekdays TEXT[], -- Array of weekdays for recurring events
  price_type TEXT CHECK (price_type IN ('free', 'pwyw', 'fixed')),
  price DECIMAL(10, 2),
  suggested_price DECIMAL(10, 2),
  contact_email TEXT,
  management_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_categories junction table (many-to-many relationship)
CREATE TABLE event_categories (
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, category_id)
);

-- Create event_images table
CREATE TABLE event_images (
  id BIGSERIAL PRIMARY KEY,
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name) VALUES
  ('Music'),
  ('Arts & Culture'),
  ('Sports'),
  ('Food & Drink'),
  ('Technology'),
  ('Education'),
  ('Nightlife'),
  ('Outdoor Activities'),
  ('Community'),
  ('Wellness');

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on event_categories"
  ON event_categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on event_images"
  ON event_images FOR SELECT
  USING (true);

-- Create policies for authenticated users to insert/update their own events
-- Adjust these based on your authentication needs
CREATE POLICY "Allow authenticated users to insert events"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own events"
  ON events FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert event_categories"
  ON event_categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert event_images"
  ON event_images FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
