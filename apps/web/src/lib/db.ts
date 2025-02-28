import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Initialize the Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Videos API
export const videoApi = {
  // Get videos for the current user
  getUserVideos: async (userId: string) => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  // Get a single video by ID
  getVideo: async (videoId: string) => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .eq("id", videoId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Create a new video record
  createVideo: async (video: {
    user_id: string;
    title?: string;
    description?: string;
    file_path: string;
    file_size?: number;
    mime_type?: string;
  }) => {
    const { data, error } = await supabase
      .from("videos")
      .insert(video)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Update a video record
  updateVideo: async (videoId: string, updates: Partial<Database["public"]["Tables"]["videos"]["Update"]>) => {
    const { data, error } = await supabase
      .from("videos")
      .update(updates)
      .eq("id", videoId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Delete a video record
  deleteVideo: async (videoId: string) => {
    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", videoId);
      
    if (error) throw error;
    return true;
  }
};

// Scripts API
export const scriptApi = {
  // Get scripts for the current user
  getUserScripts: async (userId: string) => {
    const { data, error } = await supabase
      .from("scripts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  // Get scripts for a specific video
  getVideoScripts: async (videoId: string) => {
    const { data, error } = await supabase
      .from("scripts")
      .select("*")
      .eq("video_id", videoId)
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  // Get a single script by ID
  getScript: async (scriptId: string) => {
    const { data, error } = await supabase
      .from("scripts")
      .select("*")
      .eq("id", scriptId)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Create a new script record
  createScript: async (script: {
    user_id: string;
    video_id?: string;
    title: string;
    description?: string;
    script: string;
    tags?: string[];
  }) => {
    const { data, error } = await supabase
      .from("scripts")
      .insert(script)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Create a script from a video using the stored procedure
  createScriptFromVideo: async (params: {
    videoId: string;
    title: string;
    script: string;
    description?: string;
    tags?: string[];
  }) => {
    const { data, error } = await supabase.rpc('create_script_from_video', {
      p_video_id: params.videoId,
      p_title: params.title,
      p_script: params.script,
      p_description: params.description || null,
      p_tags: params.tags || null
    });
    
    if (error) throw error;
    
    // The function returns the script ID, now fetch the entire script
    return await scriptApi.getScript(data);
  },
  
  // Clone a script using the stored procedure
  cloneScript: async (scriptId: string, newTitle?: string) => {
    const { data, error } = await supabase.rpc('clone_script', {
      p_script_id: scriptId,
      p_new_title: newTitle || null
    });
    
    if (error) throw error;
    
    // The function returns the new script ID, now fetch the entire script
    return await scriptApi.getScript(data);
  },
  
  // Update a script record
  updateScript: async (scriptId: string, updates: Partial<Database["public"]["Tables"]["scripts"]["Update"]>) => {
    const { data, error } = await supabase
      .from("scripts")
      .update(updates)
      .eq("id", scriptId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Toggle favorite status
  toggleFavorite: async (scriptId: string, isFavorite: boolean) => {
    const { data, error } = await supabase
      .from("scripts")
      .update({ is_favorite: isFavorite })
      .eq("id", scriptId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  // Increment execution count
  incrementExecutionCount: async (scriptId: string) => {
    const { data, error } = await supabase.rpc('increment_execution_count', {
      script_id: scriptId
    });
    
    if (error) throw error;
    return data;
  },
  
  // Delete a script record
  deleteScript: async (scriptId: string) => {
    const { error } = await supabase
      .from("scripts")
      .delete()
      .eq("id", scriptId);
      
    if (error) throw error;
    return true;
  }
}; 