"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { ArrowRight, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error, data } = await signUp(email, password);
      
      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }
      
      // If it's email confirmation, show success message
      if (data?.user && !data?.session) {
        setEmailSent(true);
      } else if (data?.session) {
        // If session created immediately, redirect to dashboard with a slight delay
        setTimeout(() => {
          router.replace("/dashboard");
        }, 300);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-[calc(100vh-74px)] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-blue-600">
            <ArrowRight className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            We've sent a confirmation email to <span className="font-medium">{email}</span>.
            <br />
            Please check your inbox and click the verification link to complete your registration.
          </p>
          <div className="mt-8 text-center">
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="mx-auto"
            >
              Use a different email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-74px)] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-blue-600">
          <ArrowRight className="h-6 w-6 text-white" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-destructive/15 p-4">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 