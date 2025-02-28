import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabase } from "@/lib/db";
import { videoApi } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Video, Play, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { formatDuration, formatFileSize } from "@/lib/video-utils";

export default async function VideosPage() {
  const cookieStore = cookies();
  
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/login");
  }
  
  const userId = session.user.id;
  
  // Fetch user's videos
  const videos = await videoApi.getUserVideos(userId);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
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
    <div className="container max-w-7xl mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Videos</h1>
        <Link href="/dashboard" passHref>
          <Button>Upload New Video</Button>
        </Link>
      </div>
      
      {videos.length === 0 ? (
        <div className="text-center py-16 bg-muted rounded-lg">
          <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-medium">No videos found</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Upload your first video to generate AppleScript automations
          </p>
          <Link href="/dashboard" passHref>
            <Button>Upload Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div 
                className="aspect-video bg-muted relative"
                style={video.thumbnail_url ? { 
                  backgroundImage: `url(${video.thumbnail_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center' 
                } : undefined}
              >
                {!video.thumbnail_url && (
                  <Video className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                )}
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(video.status)}>
                    {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">
                  {video.title || 'Untitled Video'}
                </CardTitle>
                {video.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                )}
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {video.duration && (
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatDuration(video.duration)}
                    </div>
                  )}
                  {video.file_size && (
                    <div>
                      {formatFileSize(video.file_size)}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {formatDistanceToNow(new Date(video.created_at), { 
                        addSuffix: true 
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-2">
                <form action={`/api/videos/${video.id}/scripts/generate`} method="POST">
                  <Button 
                    type="submit"
                    variant="outline" 
                    size="sm"
                    disabled={video.status !== 'completed'}
                  >
                    <Play className="h-3.5 w-3.5 mr-1" />
                    Generate Script
                  </Button>
                </form>
                <Link href={`/dashboard/videos/${video.id}`} passHref>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </Link>
                <form action={`/api/videos/${video.id}/delete`} method="POST">
                  <Button 
                    type="submit"
                    variant="outline" 
                    size="sm"
                    className="text-destructive border-destructive hover:bg-destructive/5"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 