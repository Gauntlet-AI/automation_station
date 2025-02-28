"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Terminal, Edit, Copy, Trash, Code, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Dummy data for AppleScripts
const dummyScripts = [
  {
    id: "script_1",
    title: "Automate Email Processing",
    script: 'tell application "Mail"\n  set unreadMessages to every message of inbox whose read status is false\n  repeat with theMessage in unreadMessages\n    set read status of theMessage to true\n  end repeat\nend tell',
    created_at: new Date(2023, 11, 15),
    updated_at: new Date(2023, 11, 20),
    status: "complete",
    description: "Automatically marks all unread emails as read"
  },
  {
    id: "script_2",
    title: "Daily Calendar Organizer",
    script: 'tell application "Calendar"\n  set theDate to current date\n  set theEvents to every event of calendar "Work" whose start date is greater than or equal to theDate and start date is less than or equal to (theDate + 1 * days)\n  repeat with anEvent in theEvents\n    display notification (summary of anEvent) with title "Upcoming Event"\n  end repeat\nend tell',
    created_at: new Date(2023, 10, 28),
    updated_at: new Date(2023, 11, 5),
    status: "complete",
    description: "Sends notifications for upcoming calendar events"
  },
  {
    id: "script_3",
    title: "File Organizer",
    script: 'tell application "Finder"\n  set theFolder to folder "~/Downloads"\n  set theFiles to every file of theFolder\n  repeat with aFile in theFiles\n    set fileExt to name extension of aFile\n    if fileExt is "pdf" then\n      move aFile to folder "~/Documents/PDFs"\n    else if fileExt is "jpg" or fileExt is "png" then\n      move aFile to folder "~/Pictures/Downloads"\n    end if\n  end repeat\nend tell',
    created_at: new Date(2023, 9, 10),
    updated_at: new Date(2023, 9, 10),
    status: "complete",
    description: "Organizes files in Downloads folder by type"
  },
  {
    id: "script_4",
    title: "Screenshot Workflow",
    script: 'do shell script "screencapture -i ~/Desktop/screenshot_$(date +%Y%m%d_%H%M%S).png"',
    created_at: new Date(2023, 11, 30),
    updated_at: new Date(2023, 11, 30),
    status: "in_progress",
    description: "Takes interactive screenshots and saves them with timestamps"
  },
  {
    id: "script_5",
    title: "Weekly Report Generator",
    script: 'tell application "Numbers"\n  tell document 1\n    tell sheet 1\n      set value of cell "B5" to (current date) - 7 * days\n      set value of cell "B6" to (current date)\n    end tell\n  end tell\nend tell',
    created_at: new Date(2024, 0, 2),
    updated_at: new Date(2024, 0, 10),
    status: "in_progress",
    description: "Updates date ranges in weekly report template"
  }
];

type Script = typeof dummyScripts[0];

export function ScriptsList() {
  const [scripts, setScripts] = useState<Script[]>(dummyScripts);
  
  const copyScript = (script: string) => {
    navigator.clipboard.writeText(script);
    // You could add a toast notification here
  };
  
  const deleteScript = (id: string) => {
    setScripts(scripts.filter(script => script.id !== id));
    // In a real app, you would also delete from the database
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="size-5" />
          Your Automation Scripts
        </CardTitle>
        <CardDescription>
          View and manage your generated AppleScripts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scripts.map((script) => (
                <TableRow key={script.id}>
                  <TableCell className="font-medium">{script.title}</TableCell>
                  <TableCell>{script.description}</TableCell>
                  <TableCell className="text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {formatDistanceToNow(script.created_at, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(script.updated_at, { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" title="Edit script">
                        <Edit className="size-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        title="Copy script" 
                        onClick={() => copyScript(script.script)}
                      >
                        <Copy className="size-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        title="Delete script" 
                        onClick={() => deleteScript(script.id)} 
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="View script"
                      >
                        <Code className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 