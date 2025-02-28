"use client";

import { ReactNode, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";
import { Home, Video, Code, Settings } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);
  
  // Show nothing while loading or if no user
  if (isLoading || !user) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold">
              InnovateAI
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link 
                href="/dashboard" 
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link 
                href="/dashboard/videos" 
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Video className="h-4 w-4 mr-2" />
                Videos
              </Link>
              <Link 
                href="/dashboard/scripts" 
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Code className="h-4 w-4 mr-2" />
                Scripts
              </Link>
              <Link 
                href="/dashboard/settings" 
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <UserNav user={user} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
} 