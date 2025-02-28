-- Function to create a new script from a video
CREATE OR REPLACE FUNCTION public.create_script_from_video(
  p_video_id UUID,
  p_title TEXT,
  p_script TEXT,
  p_description TEXT DEFAULT NULL,
  p_tags TEXT[] DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_script_id UUID;
BEGIN
  -- Get the user_id from the video
  SELECT user_id INTO v_user_id
  FROM public.videos
  WHERE id = p_video_id;
  
  -- Insert new script
  INSERT INTO public.scripts (
    user_id,
    video_id,
    title,
    description,
    script,
    tags,
    status,
    is_favorite,
    execution_count
  ) VALUES (
    v_user_id,
    p_video_id,
    p_title,
    p_description,
    p_script,
    p_tags,
    'completed',
    FALSE,
    0
  ) RETURNING id INTO v_script_id;
  
  RETURN v_script_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clone a script
CREATE OR REPLACE FUNCTION public.clone_script(
  p_script_id UUID,
  p_new_title TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_original public.scripts;
  v_new_id UUID;
  v_title TEXT;
BEGIN
  -- Get the original script
  SELECT * INTO v_original
  FROM public.scripts
  WHERE id = p_script_id;
  
  -- Default to "Copy of [original title]" if no title provided
  IF p_new_title IS NULL THEN
    v_title := 'Copy of ' || v_original.title;
  ELSE
    v_title := p_new_title;
  END IF;
  
  -- Create the clone
  INSERT INTO public.scripts (
    user_id,
    video_id,
    title,
    description,
    script,
    status,
    tags,
    is_favorite,
    execution_count
  ) VALUES (
    v_original.user_id,
    v_original.video_id,
    v_title,
    v_original.description,
    v_original.script,
    'draft',
    v_original.tags,
    FALSE,
    0
  ) RETURNING id INTO v_new_id;
  
  RETURN v_new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 