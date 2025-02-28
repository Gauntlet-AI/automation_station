"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Code, Lightbulb, Search, Zap, Mail, Users, LucideShield } from "lucide-react";
import DashboardWrapper from "@/components/marketing/dashboard-wrapper";
import { useAuth } from "@/lib/auth-context";

export const dynamic = "force-dynamic";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to dashboard if logged in
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  // Don't render marketing page content if we're about to redirect
  if (isLoading || user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section id="hero" className="flex w-full flex-col items-center justify-center gap-4 p-6 pb-12 pt-20 md:pb-24 md:pt-32 lg:flex-row lg:gap-12 lg:mr-8">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Automate Your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Workflow</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            InnovateAI identifies repetitive tasks in your workflow and creates automation solutions to save you time.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="relative hidden w-full lg:block lg:w-1/2">
          <DashboardWrapper />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How InnovateAI Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI-powered system transforms how you work through a simple process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative">
              <div className="absolute -top-6 -left-6 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl p-4 shadow-lg">
                <Search className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3">1. Record & Analyze</h3>
              <p className="text-gray-600 dark:text-gray-400">
                InnovateAI records your screen activities and analyzes patterns to identify repetitive tasks and workflows.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative">
              <div className="absolute -top-6 -left-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-4 shadow-lg">
                <Clock className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3">2. Quantify Time Costs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI calculates exactly how much time you spend on repetitive tasks, helping you understand the impact.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative">
              <div className="absolute -top-6 -left-6 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-4 shadow-lg">
                <Zap className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3">3. Automate & Optimize</h3>
              <p className="text-gray-600 dark:text-gray-400">
                InnovateAI suggests and implements custom automation solutions, eliminating inefficiencies in your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              InnovateAI comes packed with everything you need to transform your productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Screen Recording",
                description: "Captures your workflow without impacting performance, analyzing in real-time.",
                icon: <Search className="size-5" />,
              },
              {
                title: "Intelligent Pattern Detection",
                description: "Advanced AI identifies repetitive actions and inefficient processes automatically.",
                icon: <Lightbulb className="size-5" />,
              },
              {
                title: "Time Cost Analysis",
                description: "Quantifies exactly how much time is spent on repetitive tasks across days and weeks.",
                icon: <Clock className="size-5" />,
              },
              {
                title: "Custom Automation Agents",
                description: "Creates personalized AI agents that can take over your repetitive tasks completely.",
                icon: <Code className="size-5" />,
              },
              {
                title: "Productivity Analytics",
                description: "Detailed reports showing productivity improvements and time saved over time.",
                icon: <Zap className="size-5" />,
              },
              {
                title: "Cross-platform Integration",
                description: "Works seamlessly across all your applications and devices for complete coverage.",
                icon: <ArrowRight className="size-5" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="rounded-full bg-gradient-to-r from-violet-600/20 to-blue-600/20 p-3 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600/10 via-purple-500/10 to-blue-600/10 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Beta Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Early access users are already seeing incredible results with InnovateAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "I've been testing InnovateAI for two weeks and it's already identified 8 hours of weekly tasks I can automate.",
                author: "Sarah J., Product Manager",
              },
              {
                quote: "The prototype I tested handled my email sorting perfectly. I can't wait for the full version!",
                author: "Michael T., Entrepreneur",
              },
              {
                quote: "As a beta tester, I was skeptical at first, but now I'm first in line for when this launches.",
                author: "Alex R., Software Developer",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <div className="mb-4 text-violet-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{testimonial.quote}</p>
                <p className="font-semibold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10"></div>
            <div className="relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Waitlist</h2>
                <p className="text-xl mb-8">
                  Be the first to experience InnovateAI when we launch. Limited spots available for early access.
                </p>
                
                {/* Email Signup Form */}
                <div className="flex flex-col md:flex-row gap-3 mb-8 max-w-md mx-auto">
                  <div className="flex-grow">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="w-full px-4 py-3 rounded-lg text-black dark:text-white bg-white dark:bg-gray-800 border border-transparent focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                  </div>
                  <Button className="bg-white text-violet-600 hover:bg-gray-100 dark:bg-violet-500 dark:text-white dark:hover:bg-violet-600 px-6 py-3 font-medium">
                    Reserve Spot
                  </Button>
                </div>
                
                {/* Waitlist Counter */}
                <div className="bg-white/20 rounded-xl p-4 mb-8 inline-block">
                  <p className="text-sm font-medium">
                    <Users className="inline-block mr-2 h-4 w-4" />
                    <span className="font-bold">1,293</span> people have already joined the waitlist
                  </p>
                </div>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white/20 p-2 mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Priority Access</h3>
                      <p className="text-white/80 text-sm">Get early access before our public launch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white/20 p-2 mt-1">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Founder's Plan</h3>
                      <p className="text-white/80 text-sm">Special pricing for our early supporters</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white/20 p-2 mt-1">
                      <LucideShield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Lifetime Benefits</h3>
                      <p className="text-white/80 text-sm">Exclusive rewards for waitlist members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
