"use client";

import { Activity, Calendar, Clock, Code, FileText, Lightbulb, Settings, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background text-foreground shadow-xl">
      {/* Dashboard Header */}
      <div className="border-b bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-blue-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">InnovateAI Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-primary/10 p-1.5 text-primary hover:bg-primary/20">
              <Settings className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 p-0.5">
              <div className="h-full w-full rounded-full bg-background">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-primary">UR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sidebar and Content */}
      <div className="flex h-[380px]">
        {/* Sidebar */}
        <div className="hidden w-48 border-r bg-card/30 p-3 md:block">
          <nav className="space-y-1">
            <NavItem icon={Sparkles} label="Overview" isActive={activeTab === "overview"} />
            <NavItem icon={TrendingUp} label="Insights" isActive={activeTab === "insights"} />
            <NavItem icon={Activity} label="Activities" isActive={activeTab === "activities"} />
            <NavItem icon={Zap} label="Automations" isActive={activeTab === "automations"} />
            <NavItem icon={Calendar} label="Schedule" isActive={activeTab === "schedule"} />
            <NavItem icon={FileText} label="Reports" isActive={activeTab === "reports"} />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5">
          <h2 className="mb-5 text-xl font-bold">Productivity Insights</h2>
          
          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            <StatCard 
              title="Time Saved" 
              value="12.5 hrs" 
              trend="+23%" 
              icon={Clock} 
              color="from-blue-600 to-cyan-500" 
            />
            <StatCard 
              title="Tasks Automated" 
              value="18" 
              trend="+5" 
              icon={Zap} 
              color="from-violet-600 to-purple-600" 
            />
            <StatCard 
              title="Efficiency Score" 
              value="84%" 
              trend="+12%" 
              icon={TrendingUp} 
              color="from-green-500 to-emerald-500" 
            />
          </div>

          {/* Top Automation Opportunities */}
          <div>
            <h3 className="mb-3 font-semibold text-sm text-muted-foreground">Top Automation Opportunities</h3>
            <div className="space-y-3">
              <OpportunityCard 
                title="Email Processing" 
                description="12 repetitive email sorting actions detected"
                icon={Code}
                timeSaved="1.8 hrs/week"
                difficulty="Easy"
              />
              <OpportunityCard 
                title="Data Entry" 
                description="Recurring spreadsheet updates every Monday"
                icon={FileText}
                timeSaved="3.2 hrs/week"
                difficulty="Medium"
              />
              <OpportunityCard 
                title="Meeting Scheduling" 
                description="Calendar coordination with multiple stakeholders"
                icon={Calendar}
                timeSaved="0.9 hrs/week"
                difficulty="Easy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, isActive }: { icon: any; label: string; isActive: boolean }) {
  return (
    <button
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
        isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-primary/5"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function StatCard({ 
  title, 
  value, 
  trend, 
  icon: Icon,
  color,
}: { 
  title: string; 
  value: string;
  trend: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl font-bold">{value}</p>
          <p className="mt-1 text-xs text-green-500">{trend}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${color} bg-opacity-15`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function OpportunityCard({ 
  title, 
  description,
  icon: Icon,
  timeSaved,
  difficulty,
}: { 
  title: string; 
  description: string;
  icon: any;
  timeSaved: string;
  difficulty: string;
}) {
  return (
    <div className="flex items-center rounded-lg border bg-card p-3 hover:bg-card/80">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="ml-3 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center">
            <span className="mr-2 text-xs font-medium text-amber-500">{difficulty}</span>
            <button className="flex h-6 items-center rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground">
              Automate
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          <span className="text-xs font-medium text-green-500">{timeSaved}</span>
        </div>
      </div>
    </div>
  );
}

// Make it the default export as well to work with dynamic imports
export default DashboardPreview; 