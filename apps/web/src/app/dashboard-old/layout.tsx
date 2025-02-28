"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/nav";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useAuth } from "@/lib/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  
  // Navigation items for the dashboard
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "layout-dashboard",
    },
    {
      title: "Videos",
      href: "/dashboard/videos",
      icon: "video",
    },
    {
      title: "Scripts",
      href: "/dashboard/scripts",
      icon: "terminal",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav items={navItems} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden px-1 py-6">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
} 