"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg shadow-md">
                <Sparkles className="size-6 text-white" />
              </div>
              <span className="font-extrabold text-xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">InnovateAI</span>
            </Link>
          </div>
          <nav className="hidden space-x-6 md:flex">
            <Link
              href="#how-it-works"
              className="font-medium text-muted-foreground text-sm hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="font-medium text-muted-foreground text-sm hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="font-medium text-muted-foreground text-sm hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/signin" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                Log in
              </Link>
              <Link href="/signup" className={buttonVariants({ 
                size: "sm",
                className: "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white"
              })}>
                Sign up free
              </Link>
            </SignedOut>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[68px] bottom-0 bg-background/95 backdrop-blur-sm md:hidden",
          "border-t",
          isMenuOpen ? "block" : "hidden",
        )}
        id="mobile-menu"
        aria-labelledby="mobile-menu-button"
      >
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex flex-col space-y-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link 
                href="/signup" 
                className={buttonVariants({ 
                  size: "sm", 
                  className: "w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white"
                })}
              >
                Sign up free
              </Link>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm", className: "w-full" })}
              >
                Log in
              </Link>
            </SignedOut>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="#how-it-works"
              className="font-medium text-base text-muted-foreground hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="font-medium text-base text-muted-foreground hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="font-medium text-base text-muted-foreground hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
