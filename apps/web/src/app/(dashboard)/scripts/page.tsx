import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabase } from "@/lib/db";
import { scriptApi } from "@/lib/db";
import { ScriptList } from "@/components/scripts/script-list";

export default async function ScriptsPage() {
  const cookieStore = cookies();
  
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/signin");
  }
  
  const userId = session.user.id;
  
  // Fetch user's scripts
  const scripts = await scriptApi.getUserScripts(userId);
  
  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Scripts</h1>
      </div>
      
      <ScriptList scripts={scripts} userId={userId} />
    </div>
  );
} 