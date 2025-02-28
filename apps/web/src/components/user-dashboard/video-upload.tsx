"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Video, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setUploadStatus("idle");
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("error");
      setUploadMessage("Please select a video file to upload");
      return;
    }

    setUploading(true);
    setUploadStatus("idle");

    try {
      // Generate a unique filename
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `videos/${fileName}`;

      // Upload the file to Supabase Storage
      const { error } = await supabase.storage
        .from("videos")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(filePath);

      // Here you would typically save the video metadata to your database
      // For now we're just showing a success message

      setUploadStatus("success");
      setUploadMessage("Video uploaded successfully! Processing will begin shortly.");
      setFile(null);

      // Reset the file input
      const fileInput = document.getElementById("video-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
      console.error("Error uploading video:", error);
      setUploadStatus("error");
      setUploadMessage(error.message || "Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="size-5" />
          Upload Video for Analysis
        </CardTitle>
        <CardDescription>
          Upload a screen recording of your workflow to generate automation scripts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="size-10 text-muted-foreground mb-2" />
              <p className="text-lg font-medium mb-1">
                {file ? file.name : "Drag & drop your video here or click to browse"}
              </p>
              <p className="text-sm text-muted-foreground">
                {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "MP4, MOV, or WEBM up to 500MB"}
              </p>
            </label>
          </div>

          {uploadStatus !== "idle" && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              uploadStatus === "success" 
                ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                : "bg-destructive/10 text-destructive"
            }`}>
              {uploadStatus === "success" ? (
                <Check className="size-5 mt-0.5" />
              ) : (
                <AlertCircle className="size-5 mt-0.5" />
              )}
              <p>{uploadMessage}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </Button>
      </CardFooter>
    </Card>
  );
} 