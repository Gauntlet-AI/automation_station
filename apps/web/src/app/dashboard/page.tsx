"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VideoUpload } from "@/components/uploads/video-upload";
import { ScriptList } from "@/components/scripts/script-list";
import { videoApi, scriptApi } from "@/lib/db";
import { useAuth } from "@/lib/auth-context";
import { Database } from "@/types/supabase";

type Video = Database["public"]["Tables"]["videos"]["Row"];
type Script = Database["public"]["Tables"]["scripts"]["Row"];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
      return;
    }

    if (user) {
      const fetchData = async () => {
        try {
          setIsDataLoading(true);
          const [videosData, scriptsData] = await Promise.all([
            videoApi.getUserVideos(user.id),
            scriptApi.getUserScripts(user.id),
          ]);
          setVideos(videosData);
          setScripts(scriptsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsDataLoading(false);
        }
      };

      fetchData();
    }
  }, [user, isLoading, router]);

  // Show nothing while loading
  if (isLoading || !user) {
    return null;
  }
  
  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">
          Upload videos to generate AppleScripts for automation
        </p>
      </section>
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Upload Video</h2>
        </div>
        <VideoUpload />
      </section>
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Your Scripts</h2>
        </div>
        {isDataLoading ? (
          <div className="text-center py-8">Loading scripts...</div>
        ) : (
          <ScriptList scripts={scripts} userId={user.id} />
        )}
      </section>
    </div>
  );
} 