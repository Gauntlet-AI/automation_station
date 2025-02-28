"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Video,
  Terminal,
  Settings,
  Home
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: string;
  disabled?: boolean;
}

interface DashboardNavProps {
  items: NavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname();
  
  // Map string icon names to actual Lucide icon components
  const getIcon = (icon: string): LucideIcon | null => {
    switch(icon) {
      case "layout-dashboard":
        return LayoutDashboard;
      case "video":
        return Video;
      case "terminal":
        return Terminal;
      case "settings":
        return Settings;
      case "home":
        return Home;
      default:
        return null;
    }
  };

  return (
    <nav className="grid items-start gap-2 p-2">
      {items.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              item.disabled && "pointer-events-none opacity-50"
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
} 