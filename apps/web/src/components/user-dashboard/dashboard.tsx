"use client";

import { VideoUpload } from "./video-upload";
import { ScriptsList } from "./scripts-list";
import { DashboardHeader } from "@/components/dashboard/header";
import { Shell } from "@/components/shells/shell";
import { useAuth } from "@/lib/auth-context";

export function UserDashboard() {
  const { user } = useAuth();
  
  return (
    <Shell>
      <DashboardHeader 
        heading="Dashboard"
        text={`Welcome${user?.email ? `, ${user.email.split('@')[0]}` : ''}! Upload videos and manage your automation scripts`}
      />
      
      <div className="grid gap-8">
        <section className="grid gap-4 md:gap-8">
          <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">Upload Video</h2>
            <p className="text-muted-foreground">
              Upload a screen recording of your workflow to generate automation scripts
            </p>
          </div>
          <VideoUpload />
        </section>
        
        <section className="grid gap-4 md:gap-8">
          <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">Your Automation Scripts</h2>
            <p className="text-muted-foreground">
              View and manage your generated AppleScripts
            </p>
          </div>
          <ScriptsList />
        </section>
      </div>
    </Shell>
  );
} 