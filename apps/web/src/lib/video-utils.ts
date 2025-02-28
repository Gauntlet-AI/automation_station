import { videoApi } from "./db";
import { supabase } from "./db";

/**
 * Upload a video file to Supabase storage
 */
export async function uploadVideo(
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
) {
  try {
    // Generate a unique file path using the user ID and current timestamp
    const timestamp = new Date().getTime();
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${timestamp}.${fileExt}`;
    
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);
    
    // Create the video record in the database
    const videoRecord = await videoApi.createVideo({
      user_id: userId,
      title: file.name.split('.')[0], // Use filename as initial title
      file_path: publicUrl,
      file_size: file.size,
      mime_type: file.type,
    });
    
    return videoRecord;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}

/**
 * Generate a thumbnail image from a video (client-side)
 */
export function generateVideoThumbnail(
  videoFile: File,
  timeInSeconds = 0
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create video element
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.playsInline = true;
    video.muted = true;
    
    // Create object URL
    const url = URL.createObjectURL(videoFile);
    video.src = url;
    
    video.onloadedmetadata = () => {
      // Set time to extract thumbnail
      video.currentTime = Math.min(timeInSeconds, video.duration / 2);
    };
    
    video.oncanplay = () => {
      // Create canvas and draw video frame
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      resolve(dataUrl);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load video'));
    };
  });
}

/**
 * Update a video's thumbnail URL in the database
 */
export async function updateVideoThumbnail(
  videoId: string,
  thumbnailDataUrl: string
) {
  try {
    // Convert data URL to Blob
    const response = await fetch(thumbnailDataUrl);
    const blob = await response.blob();
    
    // Get video to determine file path
    const video = await videoApi.getVideo(videoId);
    const userId = video.user_id;
    
    // Generate thumbnail path based on video ID
    const thumbnailPath = `${userId}/thumbnails/${videoId}.jpg`;
    
    // Upload thumbnail to Supabase storage
    const { error } = await supabase.storage
      .from('videos')
      .upload(thumbnailPath, blob, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: true,
      });
    
    if (error) throw error;
    
    // Get public URL for the thumbnail
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(thumbnailPath);
    
    // Update video record with thumbnail URL
    return await videoApi.updateVideo(videoId, {
      thumbnail_url: publicUrl
    });
  } catch (error) {
    console.error('Error updating video thumbnail:', error);
    throw error;
  }
}

/**
 * Get video duration in seconds
 */
export function getVideoDuration(videoFile: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Failed to load video metadata'));
    };
    
    video.src = URL.createObjectURL(videoFile);
  });
}

/**
 * Format seconds as HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [
    hours > 0 ? hours.toString().padStart(2, '0') : null,
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].filter(Boolean);
  
  return parts.join(':');
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 