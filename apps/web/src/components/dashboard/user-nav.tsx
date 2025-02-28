"use client";

import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface UserNavProps {
  user: User;
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  
  // Function to get user initials
  const getUserInitials = (email: string | undefined): string => {
    if (!email) return "U";
    
    // If the email contains a name part (before @), use it
    const parts = email.split("@");
    const namePart = parts[0] || ""; // Default to empty string if undefined
    
    // If the name part has a dot or underscore, split and use first letters
    if (namePart.includes(".") || namePart.includes("_")) {
      const nameParts = namePart.split(/[._]/);
      return nameParts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join("");
    }
    
    // Otherwise just use the first letter
    return namePart.charAt(0).toUpperCase();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
            <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/videos")}>
            Videos
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/scripts")}>
            Scripts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 