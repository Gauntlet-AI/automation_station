import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { supabase } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";
import { Home, Video, Code, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = cookies();
  
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/login");
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
            <UserNav user={session.user} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
} 