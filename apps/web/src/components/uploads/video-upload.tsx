"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { uploadVideo, generateVideoThumbnail, updateVideoThumbnail, getVideoDuration, formatDuration, formatFileSize } from "@/lib/video-utils";
import { useAuth } from "@/lib/auth-context";
import { AlertCircle, Upload, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { videoApi } from "@/lib/db";

export function VideoUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Reset states
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }
    
    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError('Video file size should be less than 100MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    // Reset states
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }
    
    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError('Video file size should be less than 100MB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Upload the video
      const videoRecord = await uploadVideo(selectedFile, user.id);
      
      // Generate thumbnail and update video record
      try {
        const thumbnailDataUrl = await generateVideoThumbnail(selectedFile);
        await updateVideoThumbnail(videoRecord.id, thumbnailDataUrl);
      } catch (thumbnailError) {
        console.error('Error generating thumbnail:', thumbnailError);
        // Continue even if thumbnail generation fails
      }
      
      // Get video duration and update record
      try {
        const duration = await getVideoDuration(selectedFile);
        await videoApi.updateVideo(videoRecord.id, {
          duration,
          status: 'completed'
        });
      } catch (durationError) {
        console.error('Error getting duration:', durationError);
        // Continue even if duration detection fails
      }
      
      setSuccess(true);
      setSelectedFile(null);
      
      // Redirect or update the UI after successful upload
      setTimeout(() => {
        router.push('/dashboard/videos');
        router.refresh();
      }, 1500);
      
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Upload Video</h2>
        <p className="text-muted-foreground">
          Upload a video to generate an AppleScript automation
        </p>
        
        {/* File Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            selectedFile ? 'border-primary' : 'border-muted-foreground'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!selectedFile ? (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Drag and drop your video file here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse (max 100MB)
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                    <video className="h-8 w-8 object-cover rounded" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={clearSelectedFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {/* Success Message */}
        {success && (
          <div className="flex items-center space-x-2 text-primary bg-primary/10 p-3 rounded-md">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">Video uploaded successfully!</p>
          </div>
        )}
        
        {/* Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        
        {/* Upload Button */}
        <div className="pt-2 flex justify-end">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full sm:w-auto"
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </Button>
        </div>
      </div>
    </Card>
  );
} 