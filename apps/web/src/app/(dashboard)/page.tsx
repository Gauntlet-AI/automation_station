import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { VideoUpload } from "@/components/uploads/video-upload";
import { ScriptList } from "@/components/scripts/script-list";
import { videoApi, scriptApi, supabase } from "@/lib/db";

export default async function DashboardPage() {
  const cookieStore = cookies();
  
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/signin");
  }
  
  const userId = session.user.id;
  
  // Fetch user's videos and scripts
  const [videos, scripts] = await Promise.all([
    videoApi.getUserVideos(userId),
    scriptApi.getUserScripts(userId),
  ]);
  
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
        <ScriptList scripts={scripts} userId={userId} />
      </section>
    </div>
  );
} 