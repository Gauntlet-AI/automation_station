"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, StarOff, Play, Code, Copy, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { type Database } from "@/types/supabase";
import { scriptApi } from "@/lib/db";
import { useRouter } from "next/navigation";

type Script = Database['public']['Tables']['scripts']['Row'];

export function ScriptList({ scripts, userId }: { scripts: Script[], userId: string }) {
  const [activeScripts, setActiveScripts] = useState<Script[]>(scripts);
  const [activeTab, setActiveTab] = useState<string>("all");
  const router = useRouter();

  // Filter scripts based on active tab
  const filterScripts = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case "favorites":
        setActiveScripts(scripts.filter(script => script.is_favorite));
        break;
      case "recent":
        setActiveScripts([...scripts].sort((a, b) => {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }).slice(0, 5));
        break;
      case "completed":
        setActiveScripts(scripts.filter(script => script.status === "completed"));
        break;
      case "draft":
        setActiveScripts(scripts.filter(script => script.status === "draft"));
        break;
      default:
        setActiveScripts(scripts);
        break;
    }
  };

  const toggleFavorite = async (scriptId: string, isFavorite: boolean) => {
    try {
      await scriptApi.toggleFavorite(scriptId, !isFavorite);
      // Update local state
      setActiveScripts(activeScripts.map(script => 
        script.id === scriptId 
          ? { ...script, is_favorite: !isFavorite } 
          : script
      ));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const executeScript = async (scriptId: string) => {
    try {
      await scriptApi.incrementExecutionCount(scriptId);
      // In a real application, this would involve calling a native API to execute the AppleScript
      alert("Script execution would happen here via a native macOS integration");
      
      // Update local state to reflect execution count
      setActiveScripts(activeScripts.map(script => 
        script.id === scriptId 
          ? { 
              ...script, 
              execution_count: script.execution_count + 1,
              last_executed_at: new Date().toISOString()
            } 
          : script
      ));
    } catch (error) {
      console.error("Error executing script:", error);
    }
  };

  const cloneScript = async (scriptId: string, title: string) => {
    try {
      const newScript = await scriptApi.cloneScript(scriptId);
      // Add to local state
      setActiveScripts([newScript, ...activeScripts]);
    } catch (error) {
      console.error("Error cloning script:", error);
    }
  };

  const deleteScript = async (scriptId: string) => {
    if (window.confirm("Are you sure you want to delete this script?")) {
      try {
        await scriptApi.deleteScript(scriptId);
        // Remove from local state
        setActiveScripts(activeScripts.filter(script => script.id !== scriptId));
      } catch (error) {
        console.error("Error deleting script:", error);
      }
    }
  };

  const goToEditor = (scriptId: string) => {
    router.push(`/dashboard/scripts/${scriptId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full" onValueChange={filterScripts}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Scripts</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          <Button onClick={() => router.push("/dashboard/scripts/new")}>
            Create New Script
          </Button>
        </div>
        
        <TabsContent value={activeTab} className="mt-4">
          {activeScripts.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <Code className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No scripts found</h3>
              <p className="text-muted-foreground mt-1">
                {activeTab === "all" 
                  ? "You haven't created any scripts yet." 
                  : `You don't have any ${activeTab} scripts.`}
              </p>
              {activeTab === "all" && (
                <Button 
                  className="mt-4"
                  onClick={() => router.push("/dashboard/scripts/new")}
                >
                  Create Your First Script
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeScripts.map((script) => (
                <Card key={script.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className={getStatusColor(script.status)}>
                          {script.status.charAt(0).toUpperCase() + script.status.slice(1)}
                        </Badge>
                        <CardTitle className="mt-2 cursor-pointer hover:text-primary" onClick={() => goToEditor(script.id)}>
                          {script.title}
                        </CardTitle>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleFavorite(script.id, script.is_favorite)}
                      >
                        {script.is_favorite ? (
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {script.description && (
                      <p className="text-muted-foreground text-sm mt-1">
                        {script.description.length > 100 
                          ? script.description.substring(0, 100) + "..." 
                          : script.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="bg-muted p-2 rounded-md overflow-x-auto">
                      <pre className="text-xs">
                        <code>{script.script.length > 150 
                          ? script.script.substring(0, 150) + "..." 
                          : script.script}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {script.updated_at 
                          ? formatDistanceToNow(new Date(script.updated_at), { addSuffix: true }) 
                          : "Just now"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => executeScript(script.id)}
                        title="Run Script"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Run
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => cloneScript(script.id, script.title)}
                        title="Clone Script"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Clone
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteScript(script.id)}
                        title="Delete Script"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 