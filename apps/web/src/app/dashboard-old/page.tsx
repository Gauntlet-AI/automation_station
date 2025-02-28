"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UserDashboard } from "@/components/user-dashboard/dashboard";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to homepage if not logged in
      router.push("/");
    }
  }, [user, isLoading, router]);
  
  // Show loading or empty state while checking auth status
  if (isLoading || !user) {
    return null; // Will redirect in the useEffect
  }
  
  return <UserDashboard />;
} 