import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Code, Lightbulb, Search, Zap } from "lucide-react";
import Link from "next/link";
import DashboardWrapper from "@/components/marketing/dashboard-wrapper";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section with Gradient Background */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-blue-600/20 animate-gradient-slow">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-50"></div>
        </div>
        <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <h1 className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              InnovateAI
              <span className="block font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                Work Smarter, Not Harder
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              AI-driven productivity assistant that identifies repetitive tasks,
              quantifies time costs, and recommends automation solutions to
              eliminate inefficiencies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="#features">
                  Get Started <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 opacity-70 blur-lg"></div>
              <div className="relative rounded-xl bg-white/90 dark:bg-gray-900/90 shadow-xl overflow-hidden">
                <DashboardWrapper />
              </div>
            </div>
          </div>
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
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover how InnovateAI is transforming workflows for professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "InnovateAI saved my team over 20 hours per week by automating our data entry processes.",
                author: "Sarah J., Product Manager",
              },
              {
                quote: "The AI agents created by InnovateAI handle my email sorting perfectly. It's like having a personal assistant.",
                author: "Michael T., Entrepreneur",
              },
              {
                quote: "I was skeptical at first, but now I can't imagine working without InnovateAI's automation capabilities.",
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your productivity needs, with no hidden fees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for getting started</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                </div>
                <Button className="w-full mb-6">Start Free</Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic automation detection</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 5 automated tasks</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Single device support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="rounded-xl border-2 border-violet-600 bg-white dark:bg-gray-800 overflow-hidden transition-all hover:shadow-lg relative">
              <div className="absolute top-0 w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
              <div className="p-6 pt-9">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For professionals seeking productivity</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                </div>
                <Button className="w-full mb-6 bg-gradient-to-r from-violet-600 to-blue-600">
                  Get Started
                </Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced pattern recognition</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited automated tasks</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Multi-device sync</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium AI models</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For teams and organizations</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                </div>
                <Button variant="outline" className="w-full mb-6">Contact Sales</Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Team collaboration tools</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mt-12">
            <h3 className="text-xl font-semibold mb-4 text-center">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Can I upgrade or downgrade my plan?</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is there a free trial?</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Yes, all paid plans come with a 14-day free trial, no credit card required.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We accept all major credit cards, PayPal, and for Enterprise customers, we also support invoicing.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Do you offer refunds?</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">We offer a 30-day money-back guarantee for all plans if you're not satisfied with our service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
              <p className="text-xl mb-8 max-w-2xl">
                Join thousands of professionals who have reclaimed their time with InnovateAI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#features">Get Started Today</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
