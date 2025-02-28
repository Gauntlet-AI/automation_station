"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { 
  LayoutDashboard, 
  Menu, 
  LogOut,
  User as UserIcon
} from "lucide-react";

interface SiteHeaderProps {
  user: User | null;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <LayoutDashboard className="size-5" />
            <span className="font-bold">InnovateAI</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => signOut()}
                title="Sign out"
              >
                <LogOut className="size-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 