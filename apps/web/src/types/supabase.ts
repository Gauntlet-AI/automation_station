export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string
          user_id: string
          title: string | null
          description: string | null
          file_path: string
          file_size: number | null
          mime_type: string | null
          duration: number | null
          thumbnail_url: string | null
          status: "pending" | "processing" | "completed" | "failed"
          processing_status: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          mime_type?: string | null
          duration?: number | null
          thumbnail_url?: string | null
          status?: "pending" | "processing" | "completed" | "failed"
          processing_status?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          mime_type?: string | null
          duration?: number | null
          thumbnail_url?: string | null
          status?: "pending" | "processing" | "completed" | "failed"
          processing_status?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      scripts: {
        Row: {
          id: string
          user_id: string
          video_id: string | null
          title: string
          description: string | null
          script: string
          status: "pending" | "draft" | "completed" | "failed"
          tags: string[] | null
          is_favorite: boolean
          execution_count: number
          last_executed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id?: string | null
          title: string
          description?: string | null
          script: string
          status?: "pending" | "draft" | "completed" | "failed"
          tags?: string[] | null
          is_favorite?: boolean
          execution_count?: number
          last_executed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string | null
          title?: string
          description?: string | null
          script?: string
          status?: "pending" | "draft" | "completed" | "failed"
          tags?: string[] | null
          is_favorite?: boolean
          execution_count?: number
          last_executed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scripts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scripts_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_execution_count: {
        Args: {
          script_id: string
        }
        Returns: void
      }
      create_script_from_video: {
        Args: {
          p_video_id: string
          p_title: string
          p_script: string
          p_description?: string | null
          p_tags?: string[] | null
        }
        Returns: string
      }
      clone_script: {
        Args: {
          p_script_id: string
          p_new_title?: string | null
        }
        Returns: string
      }
    }
    Enums: {
      video_status: "pending" | "processing" | "completed" | "failed"
      script_status: "pending" | "draft" | "completed" | "failed"
    }
  }
} 