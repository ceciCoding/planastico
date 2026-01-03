# Supabase Setup Guide

This guide will help you set up the Supabase backend for Planástico.

## 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in your project details:
   - **Name**: `planastico` (or any name you prefer)
   - **Database Password**: Choose a strong password (save it somewhere safe)
   - **Region**: Choose the closest to Granada/Spain (e.g., Europe West)
4. Click **"Create new project"**
5. Wait for the database to be provisioned (~2 minutes)

## 2. Set Up the Database Schema

1. In your Supabase Dashboard, navigate to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open the [`schema.sql`](./schema.sql) file from this folder
4. Copy the **entire contents** of the file
5. Paste it into the SQL Editor
6. Click **"Run"** or press `Cmd/Ctrl + Enter`

You should see a success message. This creates:
- ✅ All required tables (`events`, `categories`, `event_categories`, `event_images`)
- ✅ Default event categories (Music, Arts & Culture, Sports, etc.)
- ✅ Row Level Security (RLS) policies
- ✅ Public read access for all users

## 3. Set Up Storage Bucket

1. In your Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Configure the bucket:
   - **Name**: `event-images` (must be exactly this)
   - **Public bucket**: Toggle **ON** ✅
   - **File size limit**: 5 MB (optional but recommended)
   - **Allowed MIME types**: `image/png, image/jpeg, image/webp, image/avif` (optional)
4. Click **"Create bucket"**

## 4. Get Your API Credentials

1. Go to **Project Settings** (gear icon ⚙️ in the sidebar)
2. Click on **API** in the settings menu
3. You'll find two important values under "Project API keys":
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon public**: A long JWT token starting with `eyJ...`

**Important**: Use the **anon/public** key, NOT the service_role key!

## 5. Configure Your Environment Variables

1. In the Planástico project root, copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your credentials from step 4:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 6. Test Your Setup

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

If everything is configured correctly:
- ✅ The app starts without errors
- ✅ You can see the events page
- ✅ You can open the "Create Event" modal
- ✅ You can browse categories

## Database Schema Overview

### Tables

| Table | Description |
|-------|-------------|
| **events** | Main event data (title, description, dates, location, pricing) |
| **categories** | Event categories (Music, Sports, etc.) |
| **event_categories** | Many-to-many relationship between events and categories |
| **event_images** | Event photo URLs and metadata |

### Storage Buckets

| Bucket | Purpose |
|--------|---------|
| **event-images** | Stores event photos (automatically compressed to WebP format) |

## Troubleshooting

### ❌ "Failed to connect to Supabase"
- Double-check your `SUPABASE_URL` and `SUPABASE_KEY` in `.env`
- Make sure you're using the **anon/public** key, not the service_role key
- Verify your `.env` file is in the project root directory
- Restart your dev server after changing `.env`

### ❌ Database/SQL errors
- Make sure you ran the **entire** `schema.sql` file (not just parts of it)
- Check the SQL Editor for error messages in red
- Go to **Table Editor** and verify all 4 tables exist

### ❌ Image upload errors
- Confirm the `event-images` bucket exists in Storage
- Make sure it's set to **Public** (toggle should be ON)
- Check bucket name is exactly `event-images` (no typos)

### ❌ "Categories not loading"
- The `schema.sql` includes default categories
- Check Table Editor → `categories` table has data
- If empty, run just the INSERT statement from `schema.sql`

## Need Help?

If you encounter issues during setup:
1. Check the error message carefully
2. Review the steps above
3. Open an issue on GitHub with:
   - The step where you got stuck
   - The complete error message
   - Your Supabase project region

**DO NOT share your API keys or passwords publicly!**
