-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS public;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types for status fields
CREATE TYPE public.video_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE public.script_status AS ENUM ('pending', 'draft', 'completed', 'failed');

-- Videos Table
CREATE TABLE public.videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    description TEXT,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    duration DECIMAL,
    thumbnail_url TEXT,
    status video_status NOT NULL DEFAULT 'pending',
    processing_status TEXT DEFAULT 'awaiting',
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Scripts Table
CREATE TABLE public.scripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    video_id UUID REFERENCES public.videos(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    script TEXT NOT NULL,
    status script_status NOT NULL DEFAULT 'draft',
    tags TEXT[],
    is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
    execution_count INTEGER NOT NULL DEFAULT 0,
    last_executed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX videos_user_id_idx ON public.videos(user_id);
CREATE INDEX videos_created_at_idx ON public.videos(created_at);
CREATE INDEX scripts_user_id_idx ON public.scripts(user_id);
CREATE INDEX scripts_video_id_idx ON public.scripts(video_id);
CREATE INDEX scripts_created_at_idx ON public.scripts(created_at);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at
BEFORE UPDATE ON public.scripts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to increment execution count and update last_executed_at
CREATE OR REPLACE FUNCTION public.increment_execution_count(script_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.scripts
    SET 
        execution_count = execution_count + 1,
        last_executed_at = now()
    WHERE id = script_id;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security Policies
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

-- Videos RLS Policies
CREATE POLICY "Users can view their own videos"
ON public.videos FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own videos"
ON public.videos FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own videos"
ON public.videos FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own videos"
ON public.videos FOR DELETE
USING (auth.uid() = user_id);

-- Scripts RLS Policies
CREATE POLICY "Users can view their own scripts"
ON public.scripts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scripts"
ON public.scripts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scripts"
ON public.scripts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scripts"
ON public.scripts FOR DELETE
USING (auth.uid() = user_id); 