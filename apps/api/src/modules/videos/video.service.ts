import { db, eq, type NewVideo, videos } from "@repo/db";
import { createClient } from "@supabase/supabase-js";
import { newId } from "@repo/id";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const videoService = {
  uploadVideo,
  getVideoMetadata,
  getUserVideos,
  getAllVideos,
};

/**
 * Upload a video file to Supabase Storage and save metadata to the database
 */
async function uploadVideo(file: {
  buffer: Buffer;
  filename: string;
  mimetype: string;
  size: number;
}, title: string, userId: string) {
  // Generate a unique ID for the video
  const id = newId("video");
  
  // Generate a safe filename
  const timestamp = new Date().getTime();
  const safeFileName = `${timestamp}-${file.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const filePath = `${userId}/${id}/${safeFileName}`;
  
  // Upload the file to Supabase Storage
  const { data: storageData, error: uploadError } = await supabase
    .storage
    .from('videos')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });
    
  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw new Error(`Failed to upload video: ${uploadError.message}`);
  }
  
  // Get the public URL
  const { data: publicURLData } = supabase
    .storage
    .from('videos')
    .getPublicUrl(filePath);
    
  const storageUrl = publicURLData.publicUrl;
  
  // Save the metadata to the database
  const videoData: NewVideo = {
    id,
    title,
    fileName: file.filename,
    fileSize: file.size.toString(),
    mimeType: file.mimetype,
    storageUrl,
    userId,
  };
  
  const newVideo = await db.insert(videos).values(videoData).returning();
  return newVideo[0];
}

/**
 * Get video metadata by ID
 */
async function getVideoMetadata(id: string) {
  const videoData = await db.select().from(videos).where(eq(videos.id, id));
  return videoData[0];
}

/**
 * Get all videos for a specific user
 */
async function getUserVideos(userId: string) {
  const userVideos = await db.select().from(videos).where(eq(videos.userId, userId));
  return userVideos;
}

/**
 * Get all videos
 */
async function getAllVideos() {
  const allVideos = await db.select().from(videos);
  return allVideos;
} 